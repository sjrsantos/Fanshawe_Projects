// Firebase Config
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// import ReactNativeAsyncStorage from "@react-native-async-storage/async-storage";

// My web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyA_UAnPJDAWw0GUo_2YPNEDLe5MTOBzgbE",
  authDomain: "fir-auth-database-lab5.firebaseapp.com",
  projectId: "fir-auth-database-lab5",
  storageBucket: "fir-auth-database-lab5.appspot.com",
  messagingSenderId: "639488433315",
  appId: "1:639488433315:web:a990e3432179230fe1b316",
  measurementId: "G-RFBE3MVF68",
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);

export const signInWithEmail = (email, password) => {
  return signInWithEmailAndPassword(auth, email, password);
};

export const registerWithEmail = (email, password) => {
  return createUserWithEmailAndPassword(auth, email, password);
};

export const firestore = getFirestore(app);
