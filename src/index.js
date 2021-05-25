import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import firebase from 'firebase';
import 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyCJV6Nfpov1OJTcPw29nzywniM20CD9mVo",
  authDomain: "cart-be73d.firebaseapp.com",
  projectId: "cart-be73d",
  storageBucket: "cart-be73d.appspot.com",
  messagingSenderId: "751429195434",
  appId: "1:751429195434:web:587f15e790639efc9d22d3"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

//comment 1
