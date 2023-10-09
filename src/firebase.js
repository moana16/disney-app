// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBUnW4YmiHIdBTnP9oLSVDNhnGNRsS7qUU",
  authDomain: "disney-aaffb.firebaseapp.com",
  projectId: "disney-aaffb",
  storageBucket: "disney-aaffb.appspot.com",
  messagingSenderId: "213046931139",
  appId: "1:213046931139:web:fa93b7a295cc31948f7c76",
  measurementId: "G-8YPDNH6F2Q"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export default app;