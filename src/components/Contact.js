import React, { useContext } from 'react';
import { Github, Linkedin, Twitter, Mail as MailIcon } from 'lucide-react';
import FirebaseContext from '../context/FirebaseContext';

const Contact = ({ themeClasses, buttonClasses, linkClasses }) => {
  const { isDarkMode } = useContext(FirebaseContext);

  return (
    <section id="contact" className="py-20 md:py-32 text-center">
      <h2 className="text-4xl md:text-5xl font-bold mb-4 text-green-400 animate-fade-in-up">./Get-In-Touch</h2>
      <p className={`text-lg md:text-xl mb-12 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'} animate-fade-in-up delay-100`}>
        I'm currently open to new opportunities. Feel free to reach out or check out my profiles. Let's
        build something amazing together!
      </p>

      <div className="mb-12 animate-fade-in-up delay-200">
        <a href="#" download="Your_Resume.pdf" className={`py-3 px-8 rounded-lg font-semibold shadow-lg transition-all duration-300 ${buttonClasses} inline-flex items-center gap-2 transform hover:-translate-y-1`}>
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-download"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" x2="12" y1="15" y2="3"/></svg>
          Download Resume
        </a>
      </div>

      <div className="flex justify-center space-x-6 animate-fade-in-up delay-300">
        <a href="https://github.com/yourusername" target="_blank" rel="noopener noreferrer" className={`${linkClasses} hover:scale-110 transition-transform duration-200`}>
          <Github size={36} />
        </a>
        <a href="https://linkedin.com/in/yourusername" target="_blank" rel="noopener noreferrer" className={`${linkClasses} hover:scale-110 transition-transform duration-200`}>
          <Linkedin size={36} />
        </a>
        <a href="https://twitter.com/yourusername" target="_blank" rel="noopener noreferrer" className={`${linkClasses} hover:scale-110 transition-transform duration-200`}>
          <Twitter size={36} />
        </a>
        <a href="mailto:your.email@example.com" className={`${linkClasses} hover:scale-110 transition-transform duration-200`}>
          <MailIcon size={36} />
        </a>
      </div>
    </section>
  );
};

export default Contact;
