// Import the functions you need from the SDKs you need
import { getApp, initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { get, getDatabase } from "firebase/database";
import { getFirestore } from "firebase/firestore";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCgTtqau7-eNh9jtIc-wW1zc-P9ohEn4ks",
  authDomain: "section2-test1.firebaseapp.com",
  projectId: "section2-test1",
  storageBucket: "section2-test1.appspot.com",
  messagingSenderId: "445527011655",
  appId: "1:445527011655:web:f00b58aaa39eb233bd5c62",
  measurementId: "G-JSP2584SVD",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

// if (!getApps.length()) {
//   app = initializeApp(firebaseConfig);
// } else {
//   const APPS = getApps();
//   app = APPS[0];
// }

export const db = getDatabase(app);
export const auth = getAuth(app);
export const firestore = getFirestore(app);
