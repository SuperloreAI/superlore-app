// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBX7iSSgfv7bEbsDUiRMiAAdzmurgNTGfo",
  authDomain: "superlore-dev.firebaseapp.com",
  projectId: "superlore-dev",
  storageBucket: "superlore-dev.appspot.com",
  messagingSenderId: "788655746592",
  appId: "1:788655746592:web:15a16d4e62c950b8f59645",
  measurementId: "G-QBD6Q2L47B",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
if (window) {
  const analytics = getAnalytics(app);
}

console.log("---- firebase app");
console.log(app);
