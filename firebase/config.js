
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import {getAuth} from 'firebase/auth';
// import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyD22F603139z0JFibQ0czAT2R5jS9qSyoY",
  authDomain: "taskmanager-67802.firebaseapp.com",
  projectId: "taskmanager-67802",
  storageBucket: "taskmanager-67802.firebasestorage.app",
  messagingSenderId: "855372062902",
  appId: "1:855372062902:web:24089e89a7840ee0a0c617",
  measurementId: "G-L4Z1YCE71H"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);


export const auth=getAuth(app);
export const db=getFirestore(app);
// const analytics = getAnalytics(app);

