import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth'
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyA0V4fCMkTmjQQW-p9pJnPKFWy-ezIOj7E",
  authDomain: "girlsclub-ece39.firebaseapp.com",
  projectId: "girlsclub-ece39",
  storageBucket: "girlsclub-ece39.appspot.com",
  messagingSenderId: "827068557660",
  appId: "1:827068557660:web:909f98d776da2eeba03999",
  measurementId: "G-3RWXZ4GVP7"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)
export const db = getFirestore(app);
export const storage = getStorage(app);


