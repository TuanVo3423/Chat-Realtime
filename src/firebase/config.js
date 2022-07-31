import firebase from 'firebase/app';
import 'firebase/analytics';
import 'firebase/auth';
import 'firebase/firestore';

const firebaseConfig = {
    apiKey: 'AIzaSyCnjRSDHBt6RMdP_8NzW0-J_Pfz1--z1AI',
    authDomain: 'chat-realtime-f2ae6.firebaseapp.com',
    projectId: 'chat-realtime-f2ae6',
    storageBucket: 'chat-realtime-f2ae6.appspot.com',
    messagingSenderId: '545199505193',
    appId: '1:545199505193:web:3c3405cc168dbf14fdc138',
    measurementId: 'G-VSKDPGMBRZ',
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.analytics();
const auth = firebase.auth();
const db = firebase.firestore();
// firebase.database.enableLogging(true);

// auth.useEmulator('http://localhost:9099');
// if (window.location.hostname === 'localhost') {
//     db.useEmulator('localhost', '8080');
// }

export { db, auth };
export default firebase;
