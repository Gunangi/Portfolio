// ===================================
// Main Portfolio JavaScript - Multi-Page Version
// ===================================

// Global state and configuration
const PortfolioApp = {
    isLoaded: false,
    currentPage: '',
    techStack: [
        'JavaScript', 'TypeScript', 'React', 'Node.js', 'Express',
        'MongoDB', 'PostgreSQL', 'Python', 'Django', 'Next.js',
        'Tailwind CSS', 'Git', 'Docker', 'AWS'
    ],
    projects: [],
    skills: [],
    certifications: []
};

// ===================================
// Utility Functions
// ===================================

function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    }
}

// Page navigation function
function navigateToPage(page) {
    // Add loading animation
    const body = document.body;
    body.style.opacity = '0.8';
    body.style.transition = 'opacity 0.3s ease';
    
    setTimeout(() => {
        window.location.href = page;
    }, 150);
}

function downloadResume() {
    // Create a temporary link element
    const link = document.createElement('a');
    link.href = '#'; // Replace with actual resume URL
    link.download = 'Gunangi_Bhagat_Resume.pdf';
    link.target = '_blank';
    
    // Simulate file download (replace with actual file)
    console.log('Resume download initiated...');
    alert('Resume download would start here. Please add your actual resume file.');
}

// ===================================
// DOM Manipulation
// ===================================

function updateLastUpdated() {
    const lastUpdatedElement = document.getElementById('last-updated');
    if (lastUpdatedElement) {
        const now = new Date();
        lastUpdatedElement.textContent = now.toLocaleDateString();
    }
}

function populateTechStack() {
    const techStackGrid = document.getElementById('tech-stack');
    if (!techStackGrid) return;
    
    techStackGrid.innerHTML = PortfolioApp.techStack.map(tech => `
        <div class="tech-item" data-tech="${tech.toLowerCase()}">
            <span class="tech-name">${tech}</span>
        </div>
    `).join('');
}

function getCurrentPage() {
    const path = window.location.pathname;
    const page = path.split('/').pop() || 'index.html';
    return page.replace('.html', '') || 'index';
}

// ===================================
// Data Loading Functions
// ===================================

async function loadProjects() {
    try {
        // Fallback data if JSON file doesn't exist
        const fallbackProjects = [
            {
                id: 1,
                title: "E-Commerce Platform",
                description: "A full-stack e-commerce solution built with React, Node.js, and MongoDB. Features include user authentication, payment processing, and admin dashboard.",
                technologies: ["React", "Node.js", "MongoDB", "Express", "Stripe"],
                categories: ["full-stack", "react", "node"],
                github: "https://github.com/username/ecommerce-platform",
                demo: "https://ecommerce-demo.com",
                featured: true
            },
            {
                id: 2,
                title: "Task Management App",
                description: "A collaborative task management application with real-time updates, drag-and-drop functionality, and team collaboration features.",
                technologies: ["Next.js", "TypeScript", "PostgreSQL", "Socket.io"],
                categories: ["full-stack", "nextjs", "react"],
                github: "https://github.com/username/task-manager",
                demo: "https://taskmanager-demo.com",
                featured: true
            },
            {
                id: 3,
                title: "Weather Dashboard",
                description: "A beautiful weather dashboard with location-based forecasts, interactive maps, and weather alerts.",
                technologies: ["React", "API Integration", "Chart.js", "CSS3"],
                categories: ["react", "frontend"],
                github: "https://github.com/username/weather-dashboard",
                demo: "https://weather-demo.com",
                featured: true
            },
            {
                id: 4,
                title: "Portfolio Website",
                description: "This very portfolio website! Built with vanilla JavaScript, featuring terminal-inspired design and smooth animations.",
                technologies: ["HTML5", "CSS3", "JavaScript", "Responsive Design"],
                categories: ["frontend", "vanilla-js"],
                github: "https://github.com/username/portfolio",
                demo: "#",
                featured: true
            }
        ];

        // Try to load from JSON file, fall back to hardcoded data
        try {
            const response = await fetch('./data/projects.json');
            if (response.ok) {
                PortfolioApp.projects = await response.json();
            } else {
                throw new Error('Projects file not found');
            }
        } catch (error) {
            console.log('Using fallback projects data');
            PortfolioApp.projects = fallbackProjects;
        }
        
        renderProjects();
    } catch (error) {
        console.error('Error loading projects:', error);
    }
}

async function loadSkills() {
    try {
        const fallbackSkills = [
            {
                category: "Frontend Development",
                icon: "🎨",
                skills: [
                    { name: "HTML5/CSS3", level: "Advanced", progress: 95 },
                    { name: "JavaScript (ES6+)", level: "Advanced", progress: 90 },
                    { name: "React.js", level: "Advanced", progress: 85 },
                    { name: "Next.js", level: "Intermediate", progress: 80 },
                    { name: "TypeScript", level: "Intermediate", progress: 75 },
                    { name: "Tailwind CSS", level: "Advanced", progress: 90 }
                ]
            },
            {
                category: "Backend Development",
                icon: "⚙️",
                skills: [
                    { name: "Node.js", level: "Advanced", progress: 85 },
                    { name: "Express.js", level: "Advanced", progress: 80 },
                    { name: "Python", level: "Intermediate", progress: 75 },
                    { name: "Django", level: "Intermediate", progress: 70 },
                    { name: "RESTful APIs", level: "Advanced", progress: 90 },
                    { name: "GraphQL", level: "Beginner", progress: 50 }
                ]
            },
            {
                category: "Database & Tools",
                icon: "🗄️",
                skills: [
                    { name: "MongoDB", level: "Advanced", progress: 85 },
                    { name: "PostgreSQL", level: "Intermediate", progress: 75 },
                    { name: "Git/GitHub", level: "Advanced", progress: 90 },
                    { name: "Docker", level: "Intermediate", progress: 65 },
                    { name: "AWS", level: "Beginner", progress: 55 },
                    { name: "Firebase", level: "Intermediate", progress: 70 }
                ]
            }
        ];

        try {
            const response = await fetch('./data/skills.json');
            if (response.ok) {
                PortfolioApp.skills = await response.json();
            } else {
                throw new Error('Skills file not found');
            }
        } catch (error) {
            console.log('Using fallback skills data');
            PortfolioApp.skills = fallbackSkills;
        }
        
        renderSkills();
    } catch (error) {
        console.error('Error loading skills:', error);
    }
}

async function loadCertifications() {
    try {
        const fallbackCertifications = [
            {
                id: 1,
                title: "Full Stack Web Development",
                issuer: "FreeCodeCamp",
                date: "2023",
                icon: "🏆",
                description: "Comprehensive certification covering HTML, CSS, JavaScript, React, Node.js, and database management.",
                verifyUrl: "https://freecodecamp.org/certification/username/full-stack"
            },
            {
                id: 2,
                title: "JavaScript Algorithms and Data Structures",
                issuer: "FreeCodeCamp",
                date: "2023",
                icon: "🧮",
                description: "Advanced JavaScript concepts including algorithms, data structures, and problem-solving techniques.",
                verifyUrl: "https://freecodecamp.org/certification/username/javascript"
            },
            {
                id: 3,
                title: "React Developer Certification",
                issuer: "Meta",
                date: "2023",
                icon: "⚛️",
                description: "Professional certification in React development, covering hooks, state management, and best practices.",
                verifyUrl: "https://coursera.org/verify/certificate-id"
            }
        ];

        try {
            const response = await fetch('./data/certifications.json');
            if (response.ok) {
                PortfolioApp.certifications = await response.json();
            } else {
                throw new Error('Certifications file not found');
            }
        } catch (error) {
            console.log('Using fallback certifications data');
            PortfolioApp.certifications = fallbackCertifications;
        }
        
        renderCertifications();
    } catch (error) {
        console.error('Error loading certifications:', error);
    }
}

// ===================================
// Rendering Functions
// ===================================

function renderProjects(filterCategory = 'all') {
    const projectsGrid = document.getElementById('projects-grid');
    if (!projectsGrid) return;
    
    const filteredProjects = filterCategory === 'all' 
        ? PortfolioApp.projects 
        : PortfolioApp.projects.filter(project => 
            project.categories.includes(filterCategory)
          );
    
    projectsGrid.innerHTML = filteredProjects.map(project => `
        <div class="project-card" data-category="${project.categories.join(' ')}">
            <div class="project-placeholder">
                <span class="project-dimensions">640x400</span>
            </div>
            <h3 class="project-title">${project.title}</h3>
            <p class="project-description">${project.description}</p>
            <div class="project-tech">
                ${project.technologies.map(tech => `
                    <span class="tech-tag">${tech}</span>
                `).join('')}
            </div>
            <div class="project-links">
                <a href="${project.github}" target="_blank" class="project-link">
                    View Code
                </a>
                <a href="${project.demo}" target="_blank" class="project-link">
                    Live Demo
                </a>
            </div>
        </div>
    `).join('');
}

function renderSkills() {
    const skillsContainer = document.getElementById('skills-container');
    if (!skillsContainer) return;
    
    skillsContainer.innerHTML = PortfolioApp.skills.map(category => `
        <div class="skill-category">
            <h3 class="skill-category-title">
                <span class="skill-category-icon">${category.icon}</span>
                ${category.category}
            </h3>
            <ul class="skill-list">
                ${category.skills.map(skill => `
                    <li class="skill-item">
                        <div class="skill-name">
                            <span>${skill.name}</span>
                            <span class="skill-level">${skill.level}</span>
                        </div>
                        <div class="skill-bar">
                            <div class="skill-progress" data-progress="${skill.progress}"></div>
                        </div>
                    </li>
                `).join('')}
            </ul>
        </div>
    `).join('');
    
    // Animate skill bars
    setTimeout(() => {
        const progressBars = document.querySelectorAll('.skill-progress');
        progressBars.forEach(bar => {
            const progress = bar.getAttribute('data-progress');
            bar.style.width = progress + '%';
        });
    }, 500);
}

function renderCertifications() {
    const certificationsGrid = document.getElementById('certifications-grid');
    if (!certificationsGrid) return;
    
    certificationsGrid.innerHTML = PortfolioApp.certifications.map(cert => `
        <div class="cert-card">
            <div class="cert-header">
                <div class="cert-info">
                    <h3 class="cert-title">${cert.title}</h3>
                    <p class="cert-issuer">${cert.issuer}</p>
                </div>
                <div class="cert-meta">
                    <span class="cert-icon">${cert.icon}</span>
                    <span class="cert-date">${cert.date}</span>
                </div>
            </div>
            <p class="cert-description">${cert.description}</p>
            <a href="${cert.verifyUrl}" target="_blank" class="cert-verify">
                Verify Certificate →
            </a>
        </div>
    `).join('');
}

// ===================================
// Event Handlers
// ===================================

function setupProjectFilters() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Remove active class from all buttons
            filterButtons.forEach(btn => btn.classList.remove('active'));
            // Add active class to clicked button
            button.classList.add('active');
            
            // Filter projects
            const filterValue = button.getAttribute('data-filter');
            renderProjects(filterValue);
        });
    });
}

function setupNavigation() {
    const navLinks = document.querySelectorAll('.nav-link');
    const navToggle = document.getElementById('nav-toggle');
    const navMenu = document.getElementById('nav-menu');
    
    // Mobile menu toggle
    if (navToggle && navMenu) {
        navToggle.addEventListener('click', () => {
            navMenu.classList.toggle('active');
            navToggle.classList.toggle('active');
        });
    }
    
    // Navigation link handlers - Updated for multi-page
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            const href = link.getAttribute('href');
            
            // If it's a same-page anchor, prevent default and scroll
            if (href.startsWith('#')) {
                e.preventDefault();
                const targetId = href.substring(1);
                scrollToSection(targetId);
            } else {
                // For other pages, add transition effect
                e.preventDefault();
                
                // Close mobile menu
                if (navMenu) navMenu.classList.remove('active');
                if (navToggle) navToggle.classList.remove('active');
                
                // Navigate to page with transition
                navigateToPage(href);
            }
        });
    });
}

function setupThemeToggle() {
    const themeToggle = document.getElementById('theme-toggle');
    if (!themeToggle) return;
    
    themeToggle.addEventListener('click', () => {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'light' ? 'dark' : 'light';
        
        document.documentElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('portfolio-theme', newTheme);
        
        // Update toggle icon
        const icon = themeToggle.querySelector('.theme-icon');
        if (icon) {
            icon.textContent = newTheme === 'light' ? '☀' : '◐';
        }
    });
    
    // Load saved theme
    const savedTheme = localStorage.getItem('portfolio-theme') || 'dark';
    document.documentElement.setAttribute('data-theme', savedTheme);
    
    const icon = themeToggle.querySelector('.theme-icon');
    if (icon) {
        icon.textContent = savedTheme === 'light' ? '☀' : '◐';
    }
}

function setupHeaderHide() {
    const header = document.getElementById('header');
    if (!header) return;
    
    let lastScrollY = window.scrollY;
    
    const handleScroll = throttle(() => {
        const currentScrollY = window.scrollY;
        
        if (currentScrollY > 100) {
            if (currentScrollY > lastScrollY) {
                header.classList.add('hidden');
            } else {
                header.classList.remove('hidden');
            }
        } else {
            header.classList.remove('hidden');
        }
        
        lastScrollY = currentScrollY;
    }, 100);
    
    window.addEventListener('scroll', handleScroll);
}

// ===================================
// Contact Form Functions
// ===================================

function sendMessage() {
    const name = document.getElementById('contact-name')?.value;
    const email = document.getElementById('contact-email')?.value;
    const subject = document.getElementById('contact-subject')?.value;
    const message = document.getElementById('contact-message')?.value;
    
    if (!name || !email || !message) {
        alert('Please fill in all required fields.');
        return;
    }
    
    // Here you would typically send the form data to your backend
    // For now, we'll just show a success message
    console.log('Form data:', { name, email, subject, message });
    alert('Message sent successfully! I\'ll get back to you soon.');
    
    clearForm();
}

function clearForm() {
    const inputs = ['contact-name', 'contact-email', 'contact-subject', 'contact-message'];
    inputs.forEach(id => {
        const element = document.getElementById(id);
        if (element) element.value = '';
    });
}

// ===================================
// Animation Functions
// ===================================

function animateCounters() {
    const counters = document.querySelectorAll('.stat-value[data-count]');
    
    counters.forEach(counter => {
        const target = parseInt(counter.getAttribute('data-count'));
        const duration = 2000; // 2 seconds
        const step = target / (duration / 16); // 60fps
        let current = 0;
        
        const timer = setInterval(() => {
            current += step;
            if (current >= target) {
                counter.textContent = target;
                clearInterval(timer);
            } else {
                counter.textContent = Math.floor(current);
            }
        }, 16);
    });
}

// ===================================
// Loading Screen
// ===================================

function hideLoadingScreen() {
    const loader = document.getElementById('terminal-loader');
    if (loader) {
        setTimeout(() => {
            loader.classList.add('hidden');
            setTimeout(() => {
                loader.style.display = 'none';
            }, 500);
        }, 2000);
    }
}

// ===================================
// Page-Specific Initialization
// ===================================

function initializeHomePage() {
    populateTechStack();
    // Add any home-specific initializations here
}

function initializeProjectsPage() {
    loadProjects();
    setupProjectFilters();
}

function initializeSkillsPage() {
    loadSkills();
}

function initializeCertificationsPage() {
    loadCertifications();
}

function initializeContactPage() {
    animateCounters();
    // Add any contact-specific initializations here
}

// ===================================
// Main Initialization
// ===================================

async function initializeApp() {
    try {
        console.log('🚀 Initializing Portfolio App...');
        
        // Update last updated date
        updateLastUpdated();
        
        // Get current page
        PortfolioApp.currentPage = getCurrentPage();
        console.log('Current page:', PortfolioApp.currentPage);
        
        // Setup common event handlers
        setupNavigation();
        setupThemeToggle();
        setupHeaderHide();
        
        // Page-specific initialization
        switch (PortfolioApp.currentPage) {
            case 'index':
                initializeHomePage();
                break;
            case 'projects':
                initializeProjectsPage();
                break;
            case 'skills':
                initializeSkillsPage();
                break;
            case 'certifications':
                initializeCertificationsPage();
                break;
            case 'contact':
                initializeContactPage();
                break;
            default:
                console.log('Unknown page, using default initialization');
                break;
        }
        
        // Hide loading screen (only for home page or if present)
        hideLoadingScreen();
        
        PortfolioApp.isLoaded = true;
        console.log('✅ Portfolio App initialized successfully!');
        
    } catch (error) {
        console.error('❌ Error initializing app:', error);
    }
}

// ===================================
// Global Functions (for HTML onclick)
// ===================================

// Make functions globally available
window.navigateToPage = navigateToPage;
window.downloadResume = downloadResume;
window.sendMessage = sendMessage;
window.clearForm = clearForm;

// ===================================
// App Start
// ===================================

// Initialize when DOM is loaded
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeApp);
} else {
    initializeApp();
}