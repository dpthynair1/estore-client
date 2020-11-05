import firebase from 'firebase'
//require('firebase/auth')
//import * as firebase from "firebase";

  // Your web app's Firebase configuration
  const firebaseConfig = {
    apiKey: "AIzaSyCHNn8D1qrvH63tTK5tyK3zzwWzFX67NVM",
    authDomain: "estore-a7e65.firebaseapp.com",
    databaseURL: "https://estore-a7e65.firebaseio.com",
    projectId: "estore-a7e65",
    storageBucket: "estore-a7e65.appspot.com",
    messagingSenderId: "768200799405",
    appId: "1:768200799405:web:7bea1c75aa301e857d0224"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

export const auth = firebase.auth();
export const googleAuthProvider = new firebase.auth.GoogleAuthProvider();