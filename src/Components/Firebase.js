import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
const firebaseConfig = {
  apiKey: "AIzaSyBqSK6320htcgYPZn-6h2b5rtTycb4NKps",
  authDomain: "nowfloats-583b9.firebaseapp.com",
  projectId: "nowfloats-583b9",
  storageBucket: "nowfloats-583b9.appspot.com",
  messagingSenderId: "324819242203",
  appId: "1:324819242203:web:04dc9194266c3ac4d650fe",
  measurementId: "G-MY3L29TSWC",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);

export const db = getFirestore(app);

export const storage = getStorage();
