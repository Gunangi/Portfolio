import React from 'react';
import { Home, FolderKanban, Award, Mail, Sun, Moon } from 'lucide-react';

const Navbar = ({ setActiveSection, toggleDarkMode, isDarkMode, headerClasses, linkClasses }) => {
  return (
    <nav className={`p-4 shadow-lg ${headerClasses} sticky top-0 z-50`}>
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <span className="text-2xl font-bold">&lt;Dynamic Dimensions /&gt;</span>
        </div>
        <div className="flex items-center space-x-6">
          <button onClick={() => setActiveSection('home')} className={`text-lg font-medium ${linkClasses} flex items-center gap-1 rounded-md px-3 py-2 transition-colors duration-200`}>
            <Home size={18} /> Home
          </button>
          <button onClick={() => setActiveSection('projects')} className={`text-lg font-medium ${linkClasses} flex items-center gap-1 rounded-md px-3 py-2 transition-colors duration-200`}>
            <FolderKanban size={18} /> Projects
          </button>
          <button onClick={() => setActiveSection('certifications')} className={`text-lg font-medium ${linkClasses} flex items-center gap-1 rounded-md px-3 py-2 transition-colors duration-200`}>
            <Award size={18} /> Certifications
          </button>
          <button onClick={() => setActiveSection('contact')} className={`text-lg font-medium ${linkClasses} flex items-center gap-1 rounded-md px-3 py-2 transition-colors duration-200`}>
            <Mail size={18} /> Contact
          </button>
          <button
            onClick={toggleDarkMode}
            className={`p-2 rounded-full transition-colors duration-300 ${isDarkMode ? 'bg-gray-700 text-yellow-400' : 'bg-gray-200 text-gray-700'} focus:outline-none focus:ring-2 focus:ring-offset-2 ${isDarkMode ? 'focus:ring-green-500' : 'focus:ring-blue-500'}`}
            aria-label="Toggle dark mode"
          >
            {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
