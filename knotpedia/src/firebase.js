// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCte3-LWDvakC_0dGqxJIvKNqCjU6jHWhw",
  authDomain: "ccs8-knotpedia.firebaseapp.com",
  projectId: "ccs8-knotpedia",
  storageBucket: "ccs8-knotpedia.firebasestorage.app",
  messagingSenderId: "375524149796",
  appId: "1:375524149796:web:7a8a8d4fca3274d47f26b1",
  measurementId: "G-KLYLR89SYJ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);