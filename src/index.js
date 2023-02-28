import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';

import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyD6VqUayTBNzGpnO3EIhkwrtQfnfTNUemw",
  authDomain: "cart-526d7.firebaseapp.com",
  projectId: "cart-526d7",
  storageBucket: "cart-526d7.appspot.com",
  messagingSenderId: "191650157892",
  appId: "1:191650157892:web:883cb5afee4661712ab311"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
