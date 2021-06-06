// Firebase App (the core Firebase SDK) is always required and
// must be listed before other Firebase SDKs
import firebase from "firebase/app";
import 'firebase/auth';

// Add the Firebase services that you want to use

// Your app's Firebase configuration
const firebaseConfig = firebase.initializeApp({
  apiKey: "AIzaSyDkIM4fkJauoBuipNT7qk_rBFbyDxSLeiI",
  authDomain: "book-app-7f51e.firebaseapp.com",
  projectId: "book-app-7f51e",
  storageBucket: "book-app-7f51e.appspot.com",
  messagingSenderId: "276286363904",
  appId: "1:276286363904:web:294656d53994d3fcdcbbe5",
  measurementId: "G-TZ8G9JT4Z7",
});
// Finally, export it to use it throughout your app
export default firebaseConfig;