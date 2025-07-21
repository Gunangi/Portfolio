import React, { useState, useEffect } from 'react';
import { onAuthStateChanged } from 'firebase/auth'; // Only onAuthStateChanged is needed from firebase/auth here

import { db, auth, initializeAuth } from './firebase'; // Import from your new firebase.js
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
  const [userId, setUserId] = useState(null);
  const [isAuthReady, setIsAuthReady] = useState(false);

  // Initialize Firebase and set up auth listener
  useEffect(() => {
    // Perform initial authentication
    initializeAuth().then(() => {
      // Listen for auth state changes after initial auth attempt
      const unsubscribe = onAuthStateChanged(auth, (user) => {
        if (user) {
          setUserId(user.uid);
        } else {
          setUserId(null);
        }
        setIsAuthReady(true); // Set auth ready after the first auth state is determined
      });
      return () => unsubscribe(); // Cleanup auth listener on unmount
    }).catch(error => {
      console.error("Error during Firebase initialization or initial auth:", error);
      setIsAuthReady(true); // Ensure app can still render even if Firebase init fails
    });
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