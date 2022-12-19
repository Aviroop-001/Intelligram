import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  initializeAuth,
  getReactNativePersistence
} from 'firebase/auth/react-native';

const firebaseConfig = {
    apiKey: "AIzaSyA5BZCXqug0Y7uKJNwoDaX5atZuhn1N1UM",
    authDomain: "socialmedia-app-e72ea.firebaseapp.com",
    projectId: "socialmedia-app-e72ea",
    storageBucket: "socialmedia-app-e72ea.appspot.com",
    messagingSenderId: "633548775875",
    appId: "1:633548775875:web:6b2c63a7504756c4e21d76"
  };
const app = initializeApp(firebaseConfig);

const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage)
});
const db = getFirestore(app);
const storage = getStorage(app);

export {auth, db, storage}

