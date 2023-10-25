
import { initializeApp } from "firebase/app";
import { getAuth,GoogleAuthProvider } from "firebase/auth";


// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCYk6EmmzTHu5HGL32EkdGwmu7NcjyR9pA",
  authDomain: "store-cd66e.firebaseapp.com",
  projectId: "store-cd66e",
  storageBucket: "store-cd66e.appspot.com",
  messagingSenderId: "763203077211",
  appId: "1:763203077211:web:7d9c59b0ea136610896b7e",
  measurementId: "G-J4FDVE41M5"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();
export {auth,provider}


