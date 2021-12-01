
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyBsjMpqDZdXYDct_A_L_Ag5R-y7dhqe9dw",
    authDomain: "guitars-9d501.firebaseapp.com",
    projectId: "guitars-9d501",
    storageBucket: "guitars-9d501.appspot.com",
    messagingSenderId: "863415064941",
    appId: "1:863415064941:web:5af63fd8e8ae643072e264"
};


const app = initializeApp(firebaseConfig);
export const auth = getAuth()