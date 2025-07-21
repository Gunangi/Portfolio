import React, { useContext } from 'react';
import { Award } from 'lucide-react';
import FirebaseContext from '../context/FirebaseContext';

const Certifications = ({ themeClasses, cardClasses, linkClasses }) => {
  const { isDarkMode } = useContext(FirebaseContext);

  // Dummy certification data
  const certifications = [
    {
      id: 1,
      title: 'Full-Stack Web Development',
      issuer: 'Online Bootcamp',
      year: '2023',
      link: '#',
    },
    {
      id: 2,
      title: 'AWS Certified Developer - Associate',
      issuer: 'Amazon Web Services',
      year: '2022',
      link: '#',
    },
    {
      id: 3,
      title: 'React - The Complete Guide',
      issuer: 'Udemy',
      year: '2023',
      link: '#',
    },
    {
      id: 4,
      title: 'Open Source Contributor',
      issuer: 'React Community',
      year: '2021',
      link: '#',
    },
  ];

  return (
    <section id="certifications" className="py-20 md:py-32 text-center">
      <h2 className="text-4xl md:text-5xl font-bold mb-4 text-green-400 animate-fade-in-up">./Certifications</h2>
      <p className={`text-lg md:text-xl mb-12 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'} animate-fade-in-up delay-100`}>
        A testament to my commitment to continuous learning and professional growth.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 animate-fade-in-up delay-200">
        {certifications.map(cert => (
          <div key={cert.id} className={`rounded-xl border-2 p-6 shadow-xl ${cardClasses} flex items-start space-x-4 transition-transform duration-300 hover:scale-105`}>
            <Award size={32} className="text-green-500 flex-shrink-0 mt-1" />
            <div>
              <h3 className="text-2xl font-semibold mb-1 text-green-400 text-left">{cert.title}</h3>
              <p className={`${isDarkMode ? 'text-gray-300' : 'text-gray-700'} text-lg mb-2 text-left`}>{cert.issuer} - {cert.year}</p>
              <a href={cert.link} target="_blank" rel="noopener noreferrer" className={`inline-flex items-center gap-1 font-medium ${linkClasses} hover:underline text-left`}>
                Verify <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-external-link"><path d="M15 3h6v6"/><path d="M10 14L21 3"/><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/></svg>
              </a>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Certifications;
