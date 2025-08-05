import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-firestore.js";


const firebaseConfig = {
  apiKey: "AIzaSyDRWwyMnyF0Zh2cF7Rg7BiUjRXkEz44zSA",
  authDomain: "assignment-af0fa.firebaseapp.com",
  databaseURL: "https://assignment-af0fa-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "assignment-af0fa",
  storageBucket: "assignment-af0fa.firebasestorage.app",
  messagingSenderId: "596690939241",
  appId: "1:596690939241:web:e7b987215f2ef4ca62a1f8",
  measurementId: "G-QW346VKX3S"
};


const app = initializeApp(firebaseConfig);


export const auth = getAuth(app);
export const db = getFirestore(app);