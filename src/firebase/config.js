import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

// Remplacez cet objet par la configuration de votre propre projet Firebase.
const firebaseConfig = {
 apiKey: "AIzaSyDgOo3E5gvVebVWIIt_NSqAHgnp5NNQtck",
  authDomain: "plateforme-journaliste.firebaseapp.com",
  projectId: "plateforme-journaliste",
  storageBucket: "plateforme-journaliste.firebasestorage.app",
  messagingSenderId: "1045276737469",
  appId: "1:1045276737469:web:56324f14020887cb8d5cd4",
  measurementId: "G-Z2Q0BBM9YE"
};

// Initialisation de Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db };
