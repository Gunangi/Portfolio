import React, { useState, useContext } from 'react';
import FirebaseContext from '../context/FirebaseContext';

const Projects = ({ themeClasses, cardClasses, buttonClasses, linkClasses }) => {
  const [filter, setFilter] = useState('All');
  const { isDarkMode } = useContext(FirebaseContext);

  // Dummy project data
  const projects = [
    {
      id: 1,
      name: 'E-commerce Platform',
      description: 'A full-stack e-commerce website with features like product catalog, shopping cart, and user authentication.',
      technologies: ['Full-stack', 'React', 'Node.js', 'Express', 'MongoDB'],
      image: 'https://placehold.co/600x400/1e293b/a7f3d0?text=E-commerce',
    },
    {
      id: 2,
      name: 'Interactive Data Dashboard',
      description: 'A web application for visualizing complex datasets with interactive charts and filters.',
      technologies: ['Data Viz', 'React', 'D3.js', 'Python', 'Flask', 'PostgreSQL'],
      image: 'https://placehold.co/600x400/1e293b/a7f3d0?text=Dashboard',
    },
    {
      id: 3,
      name: 'Content Management System (CMS)',
      description: 'A headless CMS built with Next.js and Strapi to allow non-technical users to manage website content easily.',
      technologies: ['CMS', 'Next.js', 'React', 'Node.js'],
      image: 'https://placehold.co/600x400/1e293b/a7f3d0?text=CMS',
    },
    {
      id: 4,
      name: 'Real-time Chat Application',
      description: 'A real-time chat application using WebSockets for instant messaging and user presence.',
      technologies: ['WebSockets', 'Node.js', 'Express', 'React'],
      image: 'https://placehold.co/600x400/1e293b/a7f3d0?text=Chat+App',
    },
    {
      id: 5,
      name: 'Machine Learning API',
      description: 'A Python Flask API exposing machine learning models for various predictions.',
      technologies: ['Python', 'Flask', 'Data Viz'],
      image: 'https://placehold.co/600x400/1e293b/a7f3d0?text=ML+API',
    },
  ];

  const categories = ['All', 'Full-stack', 'React', 'Node.js', 'E-commerce', 'Data Viz', 'Python', 'Next.js', 'CMS', 'WebSockets'];

  const filteredProjects = projects.filter(project =>
    filter === 'All' || project.technologies.includes(filter)
  );

  return (
    <section id="projects" className="py-20 md:py-32 text-center">
      <h2 className="text-4xl md:text-5xl font-bold mb-4 text-green-400 animate-fade-in-up">./Featured-Projects</h2>
      <p className={`text-lg md:text-xl mb-12 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'} animate-fade-in-up delay-100`}>
        Here are some of the projects I'm most proud of. Use the filters to explore by technology.
      </p>

      <div className="flex flex-wrap justify-center gap-3 mb-12 animate-fade-in-up delay-200">
        {categories.map(cat => (
          <button
            key={cat}
            onClick={() => setFilter(cat)}
            className={`py-2 px-5 rounded-full text-lg font-medium transition-all duration-300
              ${filter === cat ? 'bg-green-500 text-white shadow-md' : `${isDarkMode ? 'bg-gray-700 text-gray-200 hover:bg-gray-600' : 'bg-gray-200 text-gray-800 hover:bg-gray-300'}`}
            `}
          >
            {cat}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 animate-fade-in-up delay-300">
        {filteredProjects.map(project => (
          <div key={project.id} className={`rounded-xl border-2 p-6 shadow-xl ${cardClasses} transition-transform duration-300 hover:scale-105`}>
            <img
              src={project.image}
              alt={project.name}
              className="w-full h-48 object-cover rounded-lg mb-4"
              onError={(e) => { e.target.onerror = null; e.target.src = `https://placehold.co/600x400/${isDarkMode ? '1e293b' : 'e5e7eb'}/${isDarkMode ? 'a7f3d0' : '4b5563'}?text=No+Image`; }}
            />
            <h3 className="text-2xl font-semibold mb-2 text-green-400">{project.name}</h3>
            <p className={`${isDarkMode ? 'text-gray-300' : 'text-gray-700'} mb-4`}>{project.description}</p>
            <div className="flex flex-wrap gap-2 mb-4">
              {project.technologies.map((tech, index) => (
                <span key={index} className={`text-sm py-1 px-3 rounded-full ${isDarkMode ? 'bg-gray-700 text-gray-200' : 'bg-gray-200 text-gray-800'}`}>
                  {tech}
                </span>
              ))}
            </div>
            <a href="#" className={`inline-flex items-center gap-1 font-medium ${linkClasses} hover:underline`}>
              View Project <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-external-link"><path d="M15 3h6v6"/><path d="M10 14L21 3"/><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/></svg>
            </a>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Projects;
