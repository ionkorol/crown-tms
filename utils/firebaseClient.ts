import firebase from "firebase/app";
import "firebase/auth";
import "firebase/storage";

if (!firebase.apps.length) {
  firebase.initializeApp({
    apiKey: "AIzaSyBQd-XuywZj1BUpz0ABpWHXZKSscGfa5eI",
    authDomain: "crown-tms.firebaseapp.com",
    projectId: "crown-tms",
    storageBucket: "crown-tms.appspot.com",
    messagingSenderId: "637126030031",
    appId: "1:637126030031:web:3841778f25e9e351483dba",
  });
}

export const { auth, storage } = firebase;
