// src/firebase/config.js
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// Konfigurasi Firebase
// GANTI SEMUA VALUE DI BAWAH INI dengan konfigurasi dari Firebase Console Anda
const firebaseConfig = {
  apiKey: "AIzaSyDF2Wn4HR-fdz8tPL3GBWwTHq2Oh-ijv_w",
  authDomain: "aeml-website.firebaseapp.com",
  projectId: "aeml-website",
  storageBucket: "aeml-website.firebasestorage.app",
  messagingSenderId: "534506363081",
  appId: "1:534506363081:web:5d93eca9f95eebc4f65518",
  measurementId: "G-TCFN3HMQR4",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firestore
export const db = getFirestore(app);

// Export app jika diperlukan untuk service lain
export default app;
