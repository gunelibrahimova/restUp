import * as firebase from 'firebase/app'
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

var firebaseConfig = {
    apiKey: "AIzaSyBYxg5Noc_pHgMTWzutnWsYXxwqnIpRf_k",
     authDomain: "restup-c65a4.firebaseapp.com",
     projectId: "restup-c65a4",
     storageBucket: "restup-c65a4.appspot.com",
     messagingSenderId: "855533308147",
     appId: "1:855533308147:web:d84d86e5eb36f4c08b8f86",
     measurementId: "G-14NYM2W65H"
};
// Initialize Firebase
const firebaseApp = firebase.initializeApp(firebaseConfig);
export const db = getFirestore(firebaseApp);


const auth = getAuth()


export { auth };


// const firebaseConfig = {
//     apiKey: "AIzaSyBYxg5Noc_pHgMTWzutnWsYXxwqnIpRf_k",
//     authDomain: "restup-c65a4.firebaseapp.com",
//     projectId: "restup-c65a4",
//     storageBucket: "restup-c65a4.appspot.com",
//     messagingSenderId: "855533308147",
//     appId: "1:855533308147:web:d84d86e5eb36f4c08b8f86",
//     measurementId: "G-14NYM2W65H"
// };


// const firebaseApp = firebase.initializeApp(firebaseConfig);
// const auth = firebaseApp.auth();
// export {
//     auth
// };