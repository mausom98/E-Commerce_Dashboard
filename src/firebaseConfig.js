import firebase from 'firebase';
import 'firebase/storage';
const firebaseConfig = {
    apiKey: "AIzaSyB8qlalrjfLOgQHZrZ2FGDODQoUG2uXHUQ",
    authDomain: "storage-e5a5a.firebaseapp.com",
    databaseURL: "https://storage-e5a5a.firebaseio.com",
    projectId: "storage-e5a5a",
    storageBucket: "storage-e5a5a.appspot.com",
    messagingSenderId: "1092999515279",
    appId: "1:1092999515279:web:2b55feec8df8cc199cf4fa",
    measurementId: "G-71N1KBEM70"
};

firebase.initializeApp(firebaseConfig);
const storage = firebase.storage();

export { storage, firebase };

