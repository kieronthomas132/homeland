import { initializeApp } from "firebase/app";
import {getAuth} from 'firebase/auth'
const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: "real-estate-b2a3c.firebaseapp.com",
  projectId: "real-estate-b2a3c",
  storageBucket: "real-estate-b2a3c.appspot.com",
  messagingSenderId: "769470851813",
  appId: "1:769470851813:web:024bc5d6863e41c3a9020c",
  measurementId: "G-1293GLJE9W"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)


console.log(process.env.REACT_APP_FIREBASE_STORAGE_BUCKET)