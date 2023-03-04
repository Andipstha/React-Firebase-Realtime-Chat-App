// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import { getAuth, GoogleAuthProvider} from "firebase/auth";
import { getFirestore } from "firebase/firestore"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyARjBnHRz38kC381h4bcuq2wPHHz4tXTFA",
  authDomain: "chatapp-22ef8.firebaseapp.com",
  projectId: "chatapp-22ef8",
  storageBucket: "chatapp-22ef8.appspot.com",
  messagingSenderId: "71116688964",
  appId: "1:71116688964:web:48424aa1230406c946b611",
  measurementId: "G-5SQCXWR21B"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);

export const auth = getAuth(app)
export const provider = new GoogleAuthProvider();
export const db = getFirestore(app)