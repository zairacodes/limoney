// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDPzyxYt8J-YyShQ1Lg8meTeB1IEQME2kE",
  authDomain: "limoney-8a1e8.firebaseapp.com",
  projectId: "limoney-8a1e8",
  storageBucket: "limoney-8a1e8.appspot.com",
  messagingSenderId: "106890729846",
  appId: "1:106890729846:web:a26ec9bde746a7339f0257",
  measurementId: "G-KKDTF1QS9S",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore();
// const analytics = getAnalytics(app);

// Original Above
// Backup Below

// // Import the functions you need from the SDKs you need
// import { initializeApp } from "firebase/app";
// import { getFirestore } from "firebase/firestore";
// // TODO: Add SDKs for Firebase products that you want to use
// // https://firebase.google.com/docs/web/setup#available-libraries

// // Your web app's Firebase configuration
// const firebaseConfig = {
//   apiKey: "AIzaSyBHF-hCoDW1BeU1NQQIdG2PpoWNJwK9ztw",
//   authDomain: "limoney-backup.firebaseapp.com",
//   projectId: "limoney-backup",
//   storageBucket: "limoney-backup.appspot.com",
//   messagingSenderId: "1016818489257",
//   appId: "1:1016818489257:web:05124e4a07df98c1e356b8",
// };

// // Initialize Firebase
// const app = initializeApp(firebaseConfig);
// export const db = getFirestore();
