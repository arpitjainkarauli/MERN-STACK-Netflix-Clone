import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyB2FfyjkKlWRZXmrrs8rtxLRBD9rDFLbM8",
  authDomain: "react-netflix-clone-d465b.firebaseapp.com",
  projectId: "react-netflix-clone-d465b",
  storageBucket: "react-netflix-clone-d465b.appspot.com",
  messagingSenderId: "736157078043",
  appId: "1:736157078043:web:fbd1351d743dc630f15ebe",
  measurementId: "G-Y9K2L0E7ZJ"
};

const app = initializeApp(firebaseConfig);

export const firebaseAuth = getAuth(app);