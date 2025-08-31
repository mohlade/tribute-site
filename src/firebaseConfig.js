import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore"; // <-- This is the new import for the database

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDrUWHjcVn_yTU7z9rm6oj-uZZbf3c43Vs",
  authDomain: "tribute-89e47.firebaseapp.com",
  projectId: "tribute-89e47",
  storageBucket: "tribute-89e47.firebasestorage.app",
  messagingSenderId: "791421870087",
  appId: "1:791421870087:web:d59d7da2cc8613e11f0aa2",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firestore
const db = getFirestore(app);

export { db };