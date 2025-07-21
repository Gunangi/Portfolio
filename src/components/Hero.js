import React, { useContext } from 'react';
import FirebaseContext from '../context/FirebaseContext';

const Hero = ({ themeClasses, cardClasses, buttonClasses, linkClasses }) => {
  const { isDarkMode } = useContext(FirebaseContext);

  return (
    <section id="home" className="py-20 md:py-32 flex flex-col md:flex-row items-center justify-between gap-12">
      <div className="md:w-3/5 text-center md:text-left">
        <h1 className="text-5xl md:text-6xl font-bold leading-tight mb-6 animate-fade-in-up">
          <span className="text-green-400">&gt;</span> Hey, I'm a Full-Stack Web Developer.
        </h1>
        <p className={`text-lg md:text-xl mb-8 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'} animate-fade-in-up delay-100`}>
          I'm passionate about building beautiful, functional, and user-friendly web applications. With a strong
          foundation in modern frontend and backend technologies, I thrive on bringing ideas to life on
          the web.
        </p>
        <div className="mb-8 text-left animate-fade-in-up delay-200">
          <h2 className="text-2xl font-semibold mb-4 text-green-400">Current Goals:</h2>
          <ul className="list-disc list-inside space-y-2 text-lg">
            <li>Mastering advanced Next.js and server components.</li>
            <li>Contributing to open-source UI libraries.</li>
            <li>Exploring the intersection of AI and user experience.</li>
          </ul>
        </div>
        <div className="flex items-center justify-center md:justify-start gap-4 animate-fade-in-up delay-300">
          <button className={`py-3 px-6 rounded-lg font-semibold shadow-lg transition-all duration-300 ${buttonClasses} flex items-center gap-2`}>
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-message-square-text"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/><path d="M13 8H7"/><path d="M17 12H7"/></svg>
            Recruiter? Get AI-Suggested Questions
          </button>
        </div>
      </div>

      <div className={`md:w-2/5 p-8 rounded-xl border-2 ${cardClasses} shadow-xl animate-fade-in-right`}>
        <h2 className="text-2xl font-semibold mb-6 text-green-400">My Tech Stack</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 text-lg">
          {['JavaScript (ES6+)', 'TypeScript', 'HTML5', 'CSS3', 'Python', 'React', 'Next.js', 'Node.js', 'Express', 'Flask', 'PostgreSQL', 'MongoDB', 'Redis', 'Git', 'Docker', 'Webpack', 'Figma', 'Vercel'].map((tech, index) => (
            <span key={index} className={`py-1 px-3 rounded-md text-center ${isDarkMode ? 'bg-gray-700 text-gray-200' : 'bg-gray-200 text-gray-800'} transition-colors duration-300`}>
              {tech}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Hero;
