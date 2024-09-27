// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore';
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDOf6XuMm3zunGJRZtUmez3OBKzK5dJurA",
  authDomain: "malhitest-34cac.firebaseapp.com",
  projectId: "malhitest-34cac",
  storageBucket: "malhitest-34cac.appspot.com",
  messagingSenderId: "700054414602",
  appId: "1:700054414602:web:d5a3784d3e1cf8694046f3",
  measurementId: "G-NG55WXPCN6"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const analytics = getAnalytics(app);
export { db };