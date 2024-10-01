// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyD3X3QKAccYRnCrnsTfxdTtwKwBqCIfxF4",
  authDomain: "ayumi-institute.firebaseapp.com",
  projectId: "ayumi-institute",
  storageBucket: "ayumi-institute.appspot.com",
  messagingSenderId: "506672797856",
  appId: "1:506672797856:web:52fa6399eff6e9d35c11c5"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);