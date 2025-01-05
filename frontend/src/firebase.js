// Import the functions you need from the SDKs you need
import { getAnalytics } from "firebase/analytics";
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';
import { getDatabase, onValue } from "firebase/database";
import { ref, push } from "firebase/database";
import { ref as sRef } from 'firebase/storage';

// require("dotenv").config();


// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
// console.log('hello',process.env.REACT_APP_FIREBASE_API_KEY);
const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID,
  measurementId: process.env.REACT_APP_FIREBASE_MEASUREMENT_ID
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const database = getDatabase(app);
// const analytics = getAnalytics(app);
// export const auth = getAuth(app);
// export const db = getFirestore(app);
// export const storage = getStorage(app);

// Function to save user input to Firebase
export const saveUserInput = async (inputValue) => {
  const dbRef = ref(database, "inputs");
  try {
    await push(dbRef, { value: inputValue, timestamp: Date.now() });
    console.log("Data saved successfully!");
  } catch (error) {
    console.error("Error saving data to Firebase:", error);
  }
};

// Function to listen for new data
export const listenForUpdates = (callback) => {
  const dbRef = ref(database, "inputs");
  onValue(dbRef, (snapshot) => {
    const data = snapshot.val();
    if (data) {
      const lastInput = Object.values(data).pop().value; // Get the last input
      callback(lastInput);
    }
  });
};

export default app;
