// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCmSvu55wHDxlUbKZJpMIbhm6XB1VuCu5A",
  authDomain: "easyrentify.firebaseapp.com",
  projectId: "easyrentify",
  storageBucket: "easyrentify.appspot.com",
  messagingSenderId: "309525884031",
  appId: "1:309525884031:web:8777538ffac52d242ce34a",
  measurementId: "G-87ZR9FNMQF"
};
// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);