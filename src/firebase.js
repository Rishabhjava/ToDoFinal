// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
// Your web app's Firebase configuration

const firebaseConfig = {
    apiKey: "AIzaSyBZiuByOVtsxq9febT8hAKnq8Rcwt4Kzj8",
    authDomain: "rishabhodo.firebaseapp.com",
    projectId: "rishabhodo",
    storageBucket: "rishabhodo.appspot.com",
    messagingSenderId: "358858035851",
    appId: "1:358858035851:web:c5a06f2a62c8b08e8afa8e"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);


// Initialize Firebase Authentication and get a reference to the service
export default app;
export const auth = getAuth(app);
export const database = getDatabase(app);
