import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCr-ur_STHwzIW4hJXd7U7k6riNjXNtKj8",
  authDomain: "social-media-73d08.firebaseapp.com",
  projectId: "social-media-73d08",
  storageBucket: "social-media-73d08.appspot.com",
  messagingSenderId: "899738030607",
  appId: "1:899738030607:web:878bd63cfb2ed7ddd5497a",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);

// Initialize Cloud Firestore and get a reference to the service
export const db = getFirestore(app);
