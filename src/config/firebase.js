import { getFirestore } from "firebase/firestore";
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { GoogleAuthProvider } from "firebase/auth";
import { getStorage, ref } from "firebase/storage";

const firebaseConfig = {
    apiKey: "AIzaSyChDgpbSTczcSQZ-pjqlVxgatiAFwiCq1w",
    authDomain: "note-taking-app-4f268.firebaseapp.com",
  projectId: "note-taking-app-4f268",
  storageBucket: "note-taking-app-4f268.appspot.com",
  messagingSenderId: "633694707562",
  appId: "1:633694707562:web:ad1ee22dd3558eb1780f13"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)
export const googleProvider = new GoogleAuthProvider();
export const db = getFirestore(app)
export const storage = getStorage(app)