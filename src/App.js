import React, { useState, useEffect } from 'react';
import { getAuth, signInAnonymously, signInWithCustomToken, onAuthStateChanged } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { initializeApp } from 'firebase/app';

import FirebaseContext from './context/FirebaseContext';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Projects from './components/Projects';
import Certifications from './components/Certifications';
import Contact from './components/Contact';

// Main App Component
function App() {
  const [activeSection, setActiveSection] = useState('home');
  const [isDarkMode, setIsDarkMode] = useState(true); // Default to dark mode as per images
  const [db, setDb] = useState(null);
  const [auth, setAuth] = useState(null);
  const [userId, setUserId] = useState(null);
  const [isAuthReady, setIsAuthReady] = useState(false);

  // Initialize Firebase and set up auth listener
  useEffect(() => {
    try {
      // Firebase configuration from global variable
      const firebaseConfig = typeof __firebase_config !== 'undefined' ? JSON.parse(__firebase_config) : {};
      const app = initializeApp(firebaseConfig);
      const firestoreDb = getFirestore(app);
      const firebaseAuth = getAuth(app);

      setDb(firestoreDb);
      setAuth(firebaseAuth);

      // Sign in with custom token if available, otherwise anonymously
      const initialAuthToken = typeof __initial_auth_token !== 'undefined' ? __initial_auth_token : null;

      if (initialAuthToken) {
        signInWithCustomToken(firebaseAuth, initialAuthToken)
          .then((userCredential) => {
            setUserId(userCredential.user.uid);
            setIsAuthReady(true);
            console.log("Signed in with custom token:", userCredential.user.uid);
          })
          .catch((error) => {
            console.error("Error signing in with custom token:", error);
            signInAnonymously(firebaseAuth)
              .then((userCredential) => {
                setUserId(userCredential.user.uid);
                setIsAuthReady(true);
                console.log("Signed in anonymously (fallback):", userCredential.user.uid);
              })
              .catch((anonError) => {
                console.error("Error signing in anonymously:", anonError);
                setIsAuthReady(true); // Still set ready even if auth fails
              });
          });
      } else {
        signInAnonymously(firebaseAuth)
          .then((userCredential) => {
            setUserId(userCredential.user.uid);
            setIsAuthReady(true);
            console.log("Signed in anonymously:", userCredential.user.uid);
          })
          .catch((error) => {
            console.error("Error signing in anonymously:", error);
            setIsAuthReady(true); // Still set ready even if auth fails
          });
      }

      // Listen for auth state changes
      const unsubscribe = onAuthStateChanged(firebaseAuth, (user) => {
        if (user) {
          setUserId(user.uid);
        } else {
          setUserId(null);
        }
        setIsAuthReady(true);
      });

      return () => unsubscribe(); // Cleanup auth listener on unmount

    } catch (error) {
      console.error("Failed to initialize Firebase:", error);
      setIsAuthReady(true); // Ensure app can still render even if Firebase init fails
    }
  }, []); // Empty dependency array ensures this runs once on mount

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  // Define base styles for dark and light mode
  const themeClasses = isDarkMode ? 'bg-gray-950 text-green-400' : 'bg-gray-100 text-gray-800';
  const headerClasses = isDarkMode ? 'bg-gray-900 text-green-400' : 'bg-white text-gray-900';
  const cardClasses = isDarkMode ? 'bg-gray-800 border-green-700' : 'bg-white border-gray-300';
  const buttonClasses = isDarkMode ? 'bg-green-600 hover:bg-green-700 text-white' : 'bg-blue-600 hover:bg-blue-700 text-white';
  const linkClasses = isDarkMode ? 'text-green-400 hover:text-green-300' : 'text-blue-600 hover:text-blue-500';

  return (
    <FirebaseContext.Provider value={{ db, auth, userId, isAuthReady, isDarkMode }}>
      <div className={`min-h-screen font-inter ${themeClasses} transition-colors duration-300`}>
        <Navbar setActiveSection={setActiveSection} toggleDarkMode={toggleDarkMode} isDarkMode={isDarkMode} headerClasses={headerClasses} linkClasses={linkClasses} />

        <main className="container mx-auto px-4 py-8 dark-mode-scrollbar overflow-y-auto">
          {activeSection === 'home' && <Hero themeClasses={themeClasses} cardClasses={cardClasses} buttonClasses={buttonClasses} linkClasses={linkClasses} />}
          {activeSection === 'projects' && <Projects themeClasses={themeClasses} cardClasses={cardClasses} buttonClasses={buttonClasses} linkClasses={linkClasses} />}
          {activeSection === 'certifications' && <Certifications themeClasses={themeClasses} cardClasses={cardClasses} linkClasses={linkClasses} />}
          {activeSection === 'contact' && <Contact themeClasses={themeClasses} buttonClasses={buttonClasses} linkClasses={linkClasses} />}
        </main>
      </div>
    </FirebaseContext.Provider>
  );
}

export default App;
