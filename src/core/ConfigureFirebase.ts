import * as firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import "firebase/analytics";

const firebaseConfig = {
    apiKey: "AIzaSyC1N0g7_OgXd8HzQZ_1HCjxYKj6H0qwx0Q",
    authDomain: "chatmarubatsu.firebaseapp.com",
    databaseURL: "https://chatmarubatsu.firebaseio.com",
    projectId: "chatmarubatsu",
    storageBucket: "chatmarubatsu.appspot.com",
    messagingSenderId: "912501704929",
    appId: "1:912501704929:web:b0cb1779fb83fc1a780fa0",
    measurementId: "G-94T60ZCLBK"
};
const firebaseApp = firebase.initializeApp(firebaseConfig);

export const firestore = firebaseApp.firestore();
export const auth = firebaseApp.auth();
export const analytics = firebaseApp.analytics();

export enum StorePath {
    ROOMS = "rooms"
}