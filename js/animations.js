// ===================================
// Advanced Animations & Effects
// ===================================

class AnimationController {
    constructor() {
        this.observers = new Map();
        this.isMatrixActive = false;
        this.matrixInterval = null;
        this.init();
    }

    init() {
        this.setupScrollAnimations();
        this.setupMatrixBackground();
        this.setupParallaxEffects();
        this.setupTiltEffects();
        this.setupGlowEffects();
    }

    // ===================================
    // Scroll-based Animations
    // ===================================
    
    setupScrollAnimations() {
        const revealElements = document.querySelectorAll('.reveal, .fade-in, .slide-up');
        
        const revealObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('active');
                    this.animateSkillBars(entry.target);
                    this.animateCounters(entry.target);
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        });

        revealElements.forEach(el => revealObserver.observe(el));
        this.observers.set('reveal', revealObserver);
    }

    animateSkillBars(container) {
        const skillBars = container.querySelectorAll('.skill-progress');
        skillBars.forEach((bar, index) => {
            setTimeout(() => {
                const progress = bar.getAttribute('data-progress');
                bar.style.width = progress + '%';
                
                // Add pulse effect
                setTimeout(() => {
                    bar.style.animation = 'pulse 0.5s ease';
                }, 800);
            }, index * 100);
        });
    }

    animateCounters(container) {
        const counters = container.querySelectorAll('[data-count]');
        counters.forEach(counter => {
            const target = parseInt(counter.getAttribute('data-count'));
            const duration = 2000;
            const increment = target / (duration / 16);
            let current = 0;

            const updateCounter = () => {
                current += increment;
                if (current < target) {
                    counter.textContent = Math.floor(current);
                    requestAnimationFrame(updateCounter);
                } else {
                    counter.textContent = target;
                }
            };

            updateCounter();
        });
    }

    // ===================================
    // Matrix Background Effect
    // ===================================
    
    setupMatrixBackground() {
        const matrixBg = document.getElementById('matrix-bg');
        if (!matrixBg) return;

        const chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
        
        this.startMatrixRain = () => {
            if (this.isMatrixActive) return;
            this.isMatrixActive = true;

            this.matrixInterval = setInterval(() => {
                if (Math.random() < 0.1) {
                    this.createMatrixChar(matrixBg, chars);
                }
            }, 50);
        };

        this.stopMatrixRain = () => {
            this.isMatrixActive = false;
            if (this.matrixInterval) {
                clearInterval(this.matrixInterval);
                this.matrixInterval = null;
            }
        };

        // Start matrix effect on page load
        setTimeout(() => this.startMatrixRain(), 3000);
    }

    createMatrixChar(container, chars) {
        const char = document.createElement('div');
        char.className = 'matrix-char';
        char.textContent = chars[Math.floor(Math.random() * chars.length)];
        char.style.left = Math.random() * 100 + '%';
        char.style.animationDuration = (Math.random() * 3 + 2) + 's';
        char.style.opacity = Math.random() * 0.5 + 0.1;
        
        container.appendChild(char);
        
        // Remove char after animation
        setTimeout(() => {
            if (char.parentNode) {
                char.parentNode.removeChild(char);
            }
        }, 5000);
    }

    // ===================================
    // Parallax Effects
    // ===================================
    
    setupParallaxEffects() {
        const parallaxElements = document.querySelectorAll('.parallax');
        
        if (parallaxElements.length === 0) return;

        const handleParallax = () => {
            const scrolled = window.pageYOffset;
            const rate = scrolled * -0.5;

            parallaxElements.forEach(element => {
                element.style.transform = `translateY(${rate}px)`;
            });
        };

        window.addEventListener('scroll', this.throttle(handleParallax, 16));
    }

    // ===================================
    // 3D Tilt Effects
    // ===================================
    
    setupTiltEffects() {
        const tiltElements = document.querySelectorAll('.project-card, .skill-category, .cert-card');
        
        tiltElements.forEach(element => {
            element.addEventListener('mousemove', this.handleTilt.bind(this));
            element.addEventListener('mouseleave', this.resetTilt.bind(this));
        });
    }

    handleTilt(e) {
        const element = e.currentTarget;
        const rect = element.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        const rotateX = (y - centerY) / centerY * -10;
        const rotateY = (x - centerX) / centerX * 10;
        
        element.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(10px)`;
        element.style.transition = 'transform 0.1s ease';
    }

    resetTilt(e) {
        const element = e.currentTarget;
        element.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateZ(0px)';
        element.style.transition = 'transform 0.3s ease';
    }

    // ===================================
    // Glow Effects
    // ===================================
    
    setupGlowEffects() {
        const glowElements = document.querySelectorAll('.tech-item, .filter-btn, .cta-button');
        
        glowElements.forEach(element => {
            element.addEventListener('mouseenter', this.addGlow.bind(this));
            element.addEventListener('mouseleave', this.removeGlow.bind(this));
        });
    }

    addGlow(e) {
        const element = e.currentTarget;
        element.style.boxShadow = '0 0 20px rgba(57, 255, 20, 0.5)';
        element.style.transition = 'box-shadow 0.3s ease';
    }

    removeGlow(e) {
        const element = e.currentTarget;
        element.style.boxShadow = '';
        element.style.transition = 'box-shadow 0.3s ease';
    }

    // ===================================
    // Utility Functions
    // ===================================
    
    throttle(func, limit) {
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

    // ===================================
    // Page Transition Effects
    // ===================================
    
    pageTransition() {
        const main = document.querySelector('.main');
        main.style.opacity = '0';
        main.style.transform = 'translateY(20px)';
        
        setTimeout(() => {
            main.style.transition = 'all 0.5s ease';
            main.style.opacity = '1';
            main.style.transform = 'translateY(0)';
        }, 100);
    }

    // ===================================
    // Terminal Cursor Animation
    // ===================================
    
    animateTerminalCursor() {
        const cursors = document.querySelectorAll('.cursor');
        cursors.forEach(cursor => {
            setInterval(() => {
                cursor.style.opacity = cursor.style.opacity === '0' ? '1' : '0';
            }, 500);
        });
    }

    // ===================================
    // Floating Animation
    // ===================================
    
    addFloatingAnimation(element, duration = 6000) {
        const startY = 0;
        const amplitude = 20;
        let startTime = null;

        const animate = (currentTime) => {
            if (startTime === null) startTime = currentTime;
            const elapsed = currentTime - startTime;
            const progress = (elapsed % duration) / duration;
            const y = startY + Math.sin(progress * Math.PI * 2) * amplitude;
            
            element.style.transform = `translateY(${y}px)`;
            requestAnimationFrame(animate);
        };

        requestAnimationFrame(animate);
    }

    // ===================================
    // Ripple Effect
    // ===================================
    
    createRipple(event) {
        const button = event.currentTarget;
        const rect = button.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = event.clientX - rect.left - size / 2;
        const y = event.clientY - rect.top - size / 2;
        
        const ripple = document.createElement('span');
        ripple.style.width = ripple.style.height = size + 'px';
        ripple.style.left = x + 'px';
        ripple.style.top = y + 'px';
        ripple.classList.add('ripple');
        
        button.appendChild(ripple);
        
        setTimeout(() => {
            ripple.remove();
        }, 600);
    }

    // ===================================
    // Stagger Animation
    // ===================================
    
    staggerAnimation(elements, delay = 100) {
        elements.forEach((element, index) => {
            setTimeout(() => {
                element.classList.add('animate-in');
            }, index * delay);
        });
    }

    // ===================================
    // Cleanup
    // ===================================
    
    destroy() {
        this.stopMatrixRain();
        this.observers.forEach(observer => observer.disconnect());
        this.observers.clear();
    }
}

// ===================================
// Loading Animations
// ===================================

class LoadingAnimations {
    static showLoading(element) {
        element.innerHTML = `
            <div class="loading-spinner">
                <div class="spinner"></div>
                <p>Loading...</p>
            </div>
        `;
    }

    static hideLoading(element, content) {
        element.style.opacity = '0';
        setTimeout(() => {
            element.innerHTML = content;
            element.style.opacity = '1';
        }, 300);
    }

    static typewriterEffect(element, text, speed = 50) {
        element.innerHTML = '';
        let i = 0;
        
        const type = () => {
            if (i < text.length) {
                element.innerHTML += text.charAt(i);
                i++;
                setTimeout(type, speed);
            }
        };
        
        type();
    }
}

// ===================================
// Initialize Animations
// ===================================

let animationController;

document.addEventListener('DOMContentLoaded', () => {
    animationController = new AnimationController();
    
    // Add ripple effect to buttons
    const buttons = document.querySelectorAll('.cta-button, .filter-btn, .project-link');
    buttons.forEach(button => {
        button.addEventListener('click', animationController.createRipple);
    });
    
    // Animate page transition
    animationController.pageTransition();
    
    // Start terminal cursor animation
    animationController.animateTerminalCursor();
    
    // Add floating animation to floating elements
    const floatingElements = document.querySelectorAll('.floating');
    floatingElements.forEach(element => {
        animationController.addFloatingAnimation(element);
    });
});

// ===================================
// Performance Optimizations
// ===================================

// Reduce animations on low-end devices
if (navigator.hardwareConcurrency && navigator.hardwareConcurrency < 4) {
    document.documentElement.style.setProperty('--animation-duration', '0.1s');
}

// Respect user's motion preferences
if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    document.documentElement.style.setProperty('--animation-duration', '0.01ms');
    document.documentElement.style.setProperty('--transition-duration', '0.01ms');
}

// Export for use in other modules
window.AnimationController = AnimationController;
window.LoadingAnimations = LoadingAnimations;