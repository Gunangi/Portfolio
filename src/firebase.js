import { initializeApp } from 'firebase/app';
import { getAuth, signInAnonymously, signInWithCustomToken } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

// Initialize Firebase
const firebaseConfig = typeof __firebase_config !== 'undefined' ? JSON.parse(__firebase_config) : {};
const app = initializeApp(firebaseConfig);

// Initialize Firebase services
const db = getFirestore(app);
const auth = getAuth(app);

// Function to handle initial authentication
const initializeAuth = async () => {
  const initialAuthToken = typeof __initial_auth_token !== 'undefined' ? __initial_auth_token : null;

  try {
    if (initialAuthToken) {
      await signInWithCustomToken(auth, initialAuthToken);
      console.log("Signed in with custom token.");
    } else {
      await signInAnonymously(auth);
      console.log("Signed in anonymously.");
    }
  } catch (error) {
    console.error("Error during Firebase authentication:", error);
    // Fallback to anonymous sign-in if custom token fails, or just log error
    if (initialAuthToken) { // If custom token failed, try anonymous
      try {
        await signInAnonymously(auth);
        console.log("Signed in anonymously (fallback after custom token failure).");
      } catch (anonError) {
        console.error("Error signing in anonymously (fallback):", anonError);
      }
    }
  }
};

export { db, auth, initializeAuth };