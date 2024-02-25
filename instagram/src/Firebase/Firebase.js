// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getStorage} from 'firebase/storage'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAiQi0V7Ld-RiI-wskea6kf7c5pBXg9QJY",
  authDomain: "instagram-clone-ccaa3.firebaseapp.com",
  projectId: "instagram-clone-ccaa3",
  storageBucket: "instagram-clone-ccaa3.appspot.com",
  messagingSenderId: "207185967315",
  appId: "1:207185967315:web:ecfa2ff3be92e1536d3c26"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage = getStorage(app)