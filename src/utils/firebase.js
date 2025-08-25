// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCzs6MXI7nnVd50n2APOXHQggy5vcq08IU",
  authDomain: "netflixgpt-c4c51.firebaseapp.com",
  projectId: "netflixgpt-c4c51",
  storageBucket: "netflixgpt-c4c51.firebasestorage.app",
  messagingSenderId: "553951504641",
  appId: "1:553951504641:web:aaef93d10494278bfa5300",
  measurementId: "G-CFPFQHXJZ9"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const auth = getAuth();