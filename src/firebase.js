// To initialize firebase
import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth'
import 'firebase/storage'

const firebaseConfig = {
    apiKey: "AIzaSyBDhQIlFPWF1FX6oQex27Lgypk2OWb6--I",
    authDomain: "fireship-project-1.firebaseapp.com",
    projectId: "fireship-project-1",
    storageBucket: "fireship-project-1.appspot.com",
    messagingSenderId: "1049508793149",
    appId: "1:1049508793149:web:84c0402e86dfb7c94f1354",
    measurementId: "G-8J7RPNBYKK"
}

firebase.initializeApp(firebaseConfig)

export const db = firebase.firestore(); //firestore sdk
export const auth = firebase.auth();
export const storage = firebase.storage();
