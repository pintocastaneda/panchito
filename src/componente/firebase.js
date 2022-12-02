// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: 'AIzaSyDaUWFvE19yi6wFfIulgfkR9Houi1EC3SI',
    authDomain: 'fb-bdreact1-63c15.firebaseapp.com',
    projectId: 'fb-bdreact1-63c15',
    storageBucket: "fb-bdreact1-63c15.appspot.com",
};

const app = initializeApp(firebaseConfig);
export const db =getFirestore();
export default app;