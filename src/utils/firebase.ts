// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: "qrmenu-aa2e9.firebaseapp.com",
  projectId: "qrmenu-aa2e9",
  storageBucket: "qrmenu-aa2e9.appspot.com",
  messagingSenderId: "205192839120",
  appId: "1:205192839120:web:129d0e59dbfb45d010c3d5"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
