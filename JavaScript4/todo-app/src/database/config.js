// src/database/config.js
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB9lLvUcIwFAOHFbR7XHT2bkSOln2-nCcQ",
  authDomain: "todo-app-26e9f.firebaseapp.com",
  projectId: "todo-app-26e9f",
  storageBucket: "todo-app-26e9f.appspot.com",
  messagingSenderId: "437166599215",
  appId: "1:437166599215:web:a02734d066e8ce22eaeada",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);

// Initialize Cloud Firestore and get a reference to the service
export const db = getFirestore(app);
