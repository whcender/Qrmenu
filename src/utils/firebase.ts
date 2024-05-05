// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: "ggapsuva-51387.firebaseapp.com",
  projectId: "ggapsuva-51387",
  storageBucket: "ggapsuva-51387.appspot.com",
  messagingSenderId: "1085596496217",
  appId: "1:1085596496217:web:f30cf77a19af8e8096dc48",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);