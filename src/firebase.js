// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { getStorage } from 'firebase/storage';
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBuUjjJURCqSqttHIThVFLz-IRqXVSzJDg",
  authDomain: "pupillometrygui.firebaseapp.com",
  databaseURL: "https://pupillometrygui-default-rtdb.firebaseio.com",
  projectId: "pupillometrygui",
  storageBucket: "pupillometrygui.appspot.com",
  messagingSenderId: "762469522615",
  appId: "1:762469522615:web:75d21b8cb0d8e253b64132"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);