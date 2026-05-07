import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyB2TxiqvvZqj8cZd-M_y4FJwMh3QZ1jyXU",
  authDomain: "smartparkingpro-91f77.firebaseapp.com",
  projectId: "smartparkingpro-91f77",
  storageBucket: "smartparkingpro-91f77.firebasestorage.app",
  messagingSenderId: "15905439452",
  appId: "1:15905439452:web:e7ab9b33d300cda03bfe19",
  measurementId: "G-890HRX4PL1"
};
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
