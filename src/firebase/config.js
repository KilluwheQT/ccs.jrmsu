import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyDIHLJ3Y-YJiAbRrbB3_KRhJ-_OJvIQIdM",
  authDomain: "jrmsu-ccs.firebaseapp.com",
  databaseURL: "https://jrmsu-ccs-default-rtdb.firebaseio.com",
  projectId: "jrmsu-ccs",
  storageBucket: "jrmsu-ccs.firebasestorage.app",
  messagingSenderId: "911734310883",
  appId: "1:911734310883:web:1a55de2a22db9b278dc2d6",
  measurementId: "G-G7KQKTYBSK"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase services
export const auth = getAuth(app);
export const db = getFirestore(app);
export const analytics = getAnalytics(app);

export default app;
