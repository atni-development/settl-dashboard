import { initializeApp, getApps } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

import { getAnalytics } from "firebase/analytics";
const firebaseConfig = {
    //apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
    //authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
    //projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
    //storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
    //messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
    //appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
    //measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID,
    apiKey: "AIzaSyA7Lv97vkHvHjFhVS8XIhZEXN6tltL3dsg",
    authDomain: "settl-project.firebaseapp.com",
    projectId: "settl-project",
    storageBucket: "settl-project.appspot.com",
    messagingSenderId: "201168589754",
    appId: "1:201168589754:web:324d0b0170eeb0f392c383",
    measurementId: "G-7N47BCYNMG"
};

// Initialize Firebase
let firebase_app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];
export const auth = getAuth(firebase_app);

auth.languageCode = 'it';


export default firebase_app;