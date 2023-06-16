import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAvZi_-JbrP1RtrXknOoyLPdqN2v2pO3zE",
  authDomain: "todo-list-f18ea.firebaseapp.com",
  projectId: "todo-list-f18ea",
  storageBucket: "todo-list-f18ea.appspot.com",
  messagingSenderId: "61891997950",
  appId: "1:61891997950:web:02230196844034d87e75af",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
