import * as firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import "firebase/analytics";

const firebaseConfig = {
    apiKey: "AIzaSyDb1em5nwx5Vlnl89fKJudX1H38JDC_XZo",
    authDomain: "koinoengineering.firebaseapp.com",
    databaseURL: "https://koinoengineering.firebaseio.com",
    projectId: "koinoengineering",
    storageBucket: "koinoengineering.appspot.com",
    messagingSenderId: "483605328047",
    appId: "1:483605328047:web:4fd5ffd3b421e86021245a",
    measurementId: "G-G160ZQKHCR"
};
const firebaseApp = firebase.initializeApp(firebaseConfig);

export const firestore = firebaseApp.firestore();
export const auth = firebaseApp.auth();
export const Github = new firebase.auth.GithubAuthProvider();
export const analytics = firebaseApp.analytics();
export const authStateChangedMonitor = () => auth.onAuthStateChanged((user) => {
    if (user) {
        // logged in
    } else {
        // logged out
    }
});

export enum StorePath {
    ROOMS = "rooms"
}