import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getDatabase } from "firebase/database";
const firebaseConfig = {
    apiKey: "AIzaSyBnjK_Lbj7TG7VC5Bcq88rkuHCcBtf_T0E",
    authDomain: "hackfit2.firebaseapp.com",
    databaseURL: "https://hackfit2-default-rtdb.firebaseio.com",
    projectId: "hackfit2",
    storageBucket: "hackfit2.appspot.com",
    messagingSenderId: "179553716573",
    appId: "1:179553716573:web:d62b332b71d3e64646c0b4",
    measurementId: "G-NF2CY20H95"
};

const app = initializeApp(firebaseConfig);
const providor = new GoogleAuthProvider();
const auth = getAuth();
const db = getDatabase();
export { app, providor, auth, db }