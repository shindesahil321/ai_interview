// Import the functions you need from the SDKs you need
import { initializeApp, getApp, getApps } from "firebase/app";
import {getAuth} from 'firebase/auth';
import{getFirestore} from'firebase/firestore'
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDBCUNj_9Pc-mJDxmwHAOtLYy-J44QfaIw",
  authDomain: "prepwise-8bcb3.firebaseapp.com",
  projectId: "prepwise-8bcb3",
  storageBucket: "prepwise-8bcb3.firebasestorage.app",
  messagingSenderId: "1057056078248",
  appId: "1:1057056078248:web:86b3e033810ce1a854859d",
  measurementId: "G-TN31BSR2XP"
};

// Initialize Firebase
const app = !getApps().length ?  initializeApp(firebaseConfig) :getApp();

export const auth = getAuth(app);
export const db = getFirestore(app)
const analytics = getAnalytics(app);