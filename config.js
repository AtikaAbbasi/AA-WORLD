//  fairbase initiazetio....
import { initializeApp } from 'https://www.gstatic.com/firebasejs/11.4.0/firebase-app.js'

//  fairbase auth initiazetio....
import { getAuth,
    createUserWithEmailAndPassword , 
    signInWithEmailAndPassword , 
    signOut , 
    onAuthStateChanged,
    updatePassword, 
    sendEmailVerification,
    sendPasswordResetEmail,
    GoogleAuthProvider,    
    signInWithPopup,


 } from 'https://www.gstatic.com/firebasejs/11.4.0/firebase-auth.js'


 import { getFirestore,
  doc, setDoc,
getDoc,
addDoc,
getDocs,
collection,
serverTimestamp,
updateDoc,
deleteDoc ,
onSnapshot,
query,
where,




  } from 'https://www.gstatic.com/firebasejs/11.4.0/firebase-firestore.js'

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDrgK-AqpmniEM-fdZ-xwWcJrGECIGk8w8",
  authDomain: "blog-app-2d3a1.firebaseapp.com",
  projectId: "blog-app-2d3a1",
  storageBucket: "blog-app-2d3a1.firebasestorage.app",
  messagingSenderId: "1018831587538",
  appId: "1:1018831587538:web:4bba0c8b01255d7f2c050b"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

let auth = getAuth(app)
// firebasestore
const db = getFirestore(app);



export{
    auth,
    createUserWithEmailAndPassword , 
    signInWithEmailAndPassword , 
    signOut , 
    onAuthStateChanged,
    updatePassword,
    sendEmailVerification,
    sendPasswordResetEmail,
    GoogleAuthProvider,
     signInWithPopup,
     //firebasestore
     db,
     doc, setDoc,
     getDoc,
     addDoc,
     getDocs,
collection,
serverTimestamp,
updateDoc,
deleteDoc ,
onSnapshot,
where,
query,


}