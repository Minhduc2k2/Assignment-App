import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";
import "firebase/storage";
const firebaseConfig = {
  apiKey: "AIzaSyCmIXqQqcrn1r36iR-4dUypUQFzKAF_NQU",
  authDomain: "the-dojo-site-71d6c.firebaseapp.com",
  projectId: "the-dojo-site-71d6c",
  storageBucket: "the-dojo-site-71d6c.appspot.com",
  messagingSenderId: "408651594601",
  appId: "1:408651594601:web:5a3db7aa9840afefc5dbf8",
};

firebase.initializeApp(firebaseConfig);

const projectFireStore = firebase.firestore();

const projectAuth = firebase.auth();

const projectStorage = firebase.storage();

const timestamp = firebase.firestore.Timestamp;

export { projectFireStore, projectAuth, projectStorage, timestamp };
