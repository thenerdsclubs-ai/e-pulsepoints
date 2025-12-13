import { initializeApp, getApps } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';
import { getStorage } from 'firebase/storage';
import { getAnalytics, isSupported } from 'firebase/analytics';

const firebaseConfig = {
  apiKey: "AIzaSyAfJqvLiGDD0fh6a_OMgvksJgx3x0nHtPM",
  authDomain: "epulsepoints-website.firebaseapp.com",
  projectId: "epulsepoints-website",
  storageBucket: "epulsepoints-website.firebasestorage.app",
  messagingSenderId: "62943682240",
  appId: "1:62943682240:web:80c73a4d310036a2d09725",
  measurementId: "G-3G8P117R88"
};

// Initialize Firebase
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];
const db = getFirestore(app);
const auth = getAuth(app);
const storage = getStorage(app);

// Initialize Analytics only on client-side
let analytics;
if (typeof window !== 'undefined') {
  isSupported().then((supported) => {
    if (supported) {
      analytics = getAnalytics(app);
    }
  });
}

// Google Auth Provider
const googleProvider = new GoogleAuthProvider();
googleProvider.setCustomParameters({
  prompt: 'select_account'
});

export { app, db, auth, storage, analytics, googleProvider };
