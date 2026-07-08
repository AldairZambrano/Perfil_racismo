import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDrFXB11itIsH7029kQpdhj4rUkqcHosSs",
  authDomain: "perfiles-8ffc6.firebaseapp.com",
  projectId: "perfiles-8ffc6",
  storageBucket: "perfiles-8ffc6.firebasestorage.app",
  messagingSenderId: "50472263091",
  appId: "1:50472263091:web:d56c9154e0c0e5cc22bfc6",
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
export default app;