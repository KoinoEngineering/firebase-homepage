import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import "firebase/analytics";

const firebaseConfig = {
    apiKey: "AIzaSyDb1em5nwx5Vlnl89fKJudX1H38JDC_XZo",
    appId: "1:483605328047:web:4fd5ffd3b421e86021245a",
    authDomain: "koinoengineering.firebaseapp.com",
    databaseURL: "https://koinoengineering.firebaseio.com",
    measurementId: "G-G160ZQKHCR",
    messagingSenderId: "483605328047",
    projectId: "koinoengineering",
    storageBucket: "koinoengineering.appspot.com",
};
const firebaseApp = firebase.initializeApp(firebaseConfig);

export const firestore = firebaseApp.firestore();
export const auth = firebaseApp.auth();
export const analytics = firebaseApp.analytics();
