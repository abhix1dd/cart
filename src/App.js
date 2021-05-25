import React from 'react';
import Cart from './Cart';
import Navbar from './Navbar';
import firebase from 'firebase';

class App extends React.Component {
  constructor(){
    super();
    this.state={ 
        products:[],
        loading:true
    }


    this.db=firebase.firestore();


}

componentDidMount(){
 
  this.db
   .collection('products')
   .orderBy('price')
   .onSnapshot((snapshot)=>{
    console.log(snapshot);
    snapshot.docs.map((doc)=>{
      console.log(doc.data())
    });

    const products=snapshot.docs.map((doc)=>{
      const data=doc.data();
      data['id']=doc.id; 
      return data;
    })

    this.setState({
      products,
      loading:false
    })

  })
}

handleIncreaseQuantity=(product)=>{
   

    const {products}=this.state;
    const index=products.indexOf(product);

    //products[index].Qty+=1;
    //this.setState({
      //  products
   // })

   const docRef=this.db.collection('products').doc(products[index].id);
   docRef
    .update({
      Qty:products[index].Qty+1
    })
    .then(()=>{
      console.log('Update Succesfully');
    })
    .catch((err)=>{
      console.log('Error:',err);
    })

}

handleDecreaseQuantity=(product)=>{
    console.log('Hey Plz inc qty of',product);

    const {products}=this.state;
    const index=products.indexOf(product);

    if(products[index].Qty===0){
    return;
    }

    /*products[index].Qty-=1;
    this.setState({
        products
    })*/
    const docRef=this.db.collection('products').doc(products[index].id);
   docRef
    .update({
      Qty:products[index].Qty-1
    })
    .then(()=>{
      console.log('Update Succesfully');
    })
    .catch((err)=>{
      console.log('Error:',err);
    })


}

handleDeleteProduct=(product)=>{

    const{products}=this.state;
    //const items=products.filter((item)=>item!==id);
   // this.setState({
   //     products:items
   // })
   const index=products.indexOf(product);
  const docRef=this.db.collection('products').doc(products[index].id);

    docRef
     .delete()
     .then(()=>{
       console.log("Deleted successfully");
     })
     .catch((error)=>{
       console.log('Error: ',error);
     })
}

getCartCount=()=>{

  const {products}=this.state;
  let count=0;

  products.forEach((products)=>{
    count+=products.Qty;
  })

  return count;

}
getCartTotal=()=>{
 
const {products}=this.state;

let cartTotal=0;
products.map((product)=>{
  cartTotal+=(product.Qty*product.price)
  return '';
})
return cartTotal;
}

addProduct=()=>{

  this.db
    .collection('products')
    .add({
      img:'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ2RJz7xRFDSrgXwREExOMo2VJ_ZrsiIHfI-w&usqp=CAU',
      price: 50000,
      Qty: 1,
      title: 'Laptop'
    })
    .then((docRef)=>{
      console.log('Product has been added',docRef);
    })

    .catch((err)=>{
      console.log('Error: ',err);
    })

}

render(){
  const {products,loading}=this.state;
  return (
    <div className="App">
      <Navbar count={this.getCartCount()}/>
    {/* <button onClick={this.addProduct} style={{padding:20, fontSize:20}}>Add a Product</button>*/}
      <Cart
        products={products}
        onIncQty={this.handleIncreaseQuantity}
        onDecQty={this.handleDecreaseQuantity}
        onDelPro={this.handleDeleteProduct}
       />
       {loading && <h1>Loading Products..</h1>}
       <div style={{padding: 10, fontSize:20}}>
                Total Rs: {this.getCartTotal()}
          </div>
    </div>
  );
}
}

export default App;
