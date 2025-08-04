// ===================================
// Terminal Functionality & Effects
// ===================================

class TerminalController {
    constructor() {
        this.history = [];
        this.historyIndex = -1;
        this.currentDirectory = '/home/developer/portfolio';
        this.isProcessing = false;
        this.fileSystem = this.createFileSystem();
        this.init();
    }

    init() {
        this.setupTerminalControls();
        this.setupInteractiveTerminal();
        this.setupCommandHistory();
        this.createTerminalSession();
    }

    // ===================================
    // File System Simulation
    // ===================================

    createFileSystem() {
        return {
            '/home/developer/portfolio': {
                type: 'directory',
                contents: {
                    'projects': { type: 'directory', contents: {} },
                    'skills': { type: 'directory', contents: {} },
                    'certifications': { type: 'directory', contents: {} },
                    'resume.pdf': { type: 'file', size: '2.1MB', modified: '2024-01-15' },
                    'README.md': { type: 'file', size: '4.2KB', modified: '2024-01-20' },
                    'package.json': { type: 'file', size: '1.8KB', modified: '2024-01-18' },
                    'index.html': { type: 'file', size: '12.5KB', modified: '2024-01-20' }
                }
            },
            '/home/developer/portfolio/projects': {
                type: 'directory',
                contents: {
                    'ecommerce-platform': { type: 'directory', contents: {} },
                    'task-manager': { type: 'directory', contents: {} },
                    'weather-dashboard': { type: 'directory', contents: {} },
                    'chat-application': { type: 'directory', contents: {} }
                }
            },
            '/home/developer/portfolio/skills': {
                type: 'directory',
                contents: {
                    'frontend.json': { type: 'file', size: '3.2KB', modified: '2024-01-15' },
                    'backend.json': { type: 'file', size: '2.8KB', modified: '2024-01-15' },
                    'database.json': { type: 'file', size: '1.9KB', modified: '2024-01-15' },
                    'tools.json': { type: 'file', size: '2.1KB', modified: '2024-01-15' }
                }
            }
        };
    }

    // ===================================
    // Terminal Commands
    // ===================================

    commands = {
        help: {
            description: 'Show available commands',
            usage: 'help [command]',
            execute: (args) => {
                if (args.length > 0) {
                    const cmd = this.commands[args[0]];
                    if (cmd) {
                        return `${args[0]}: ${cmd.description}\nUsage: ${cmd.usage}`;
                    } else {
                        return `Command '${args[0]}' not found.`;
                    }
                }
                
                const commandList = Object.keys(this.commands).map(cmd => {
                    return `  ${cmd.padEnd(12)} - ${this.commands[cmd].description}`;
                }).join('\n');
                
                return `Available commands:\n${commandList}\n\nType 'help [command]' for more info about a specific command.`;
            }
        },

        ls: {
            description: 'List directory contents',
            usage: 'ls [-la] [directory]',
            execute: (args) => {
                const showHidden = args.includes('-a');
                const showDetails = args.includes('-l');
                const path = args.find(arg => !arg.startsWith('-')) || this.currentDirectory;
                
                const dir = this.fileSystem[path];
                if (!dir || dir.type !== 'directory') {
                    return `ls: cannot access '${path}': No such file or directory`;
                }
                
                const contents = Object.entries(dir.contents);
                if (contents.length === 0) {
                    return 'Directory is empty';
                }
                
                if (showDetails) {
                    const items = contents.map(([name, item]) => {
                        const type = item.type === 'directory' ? 'd' : '-';
                        const permissions = item.type === 'directory' ? 'rwxr-xr-x' : 'rw-r--r--';
                        const size = item.size || '4.0K';
                        const modified = item.modified || '2024-01-15';
                        const displayName = item.type === 'directory' ? `${name}/` : name;
                        
                        return `${type}${permissions}  1 developer developer  ${size.padStart(8)} ${modified} ${displayName}`;
                    });
                    
                    return `total ${contents.length}\n${items.join('\n')}`;
                } else {
                    return contents.map(([name, item]) => {
                        return item.type === 'directory' ? `${name}/` : name;
                    }).join('  ');
                }
            }
        },

        pwd: {
            description: 'Print working directory',
            usage: 'pwd',
            execute: () => this.currentDirectory
        },

        cd: {
            description: 'Change directory',
            usage: 'cd [directory]',
            execute: (args) => {
                if (args.length === 0) {
                    this.currentDirectory = '/home/developer';
                    return '';
                }
                
                const path = args[0];
                const fullPath = path.startsWith('/') ? path : `${this.currentDirectory}/${path}`;
                
                if (this.fileSystem[fullPath] && this.fileSystem[fullPath].type === 'directory') {
                    this.currentDirectory = fullPath;
                    return '';
                } else {
                    return `cd: no such file or directory: ${path}`;
                }
            }
        },

        cat: {
            description: 'Display file contents',
            usage: 'cat [file]',
            execute: (args) => {
                if (args.length === 0) {
                    return 'cat: missing file operand';
                }
                
                const fileName = args[0];
                const specialFiles = {
                    'README.md': `# Gunangi Bhagat's Portfolio

🖥️ Dynamic CLI-Themed Portfolio

A modern, responsive portfolio website built with vanilla JavaScript
featuring a terminal-inspired design and smooth animations.

## Features
- CLI-inspired user interface
- Responsive design
- Smooth animations
- Project showcase
- Skills visualization
- Contact information

## Tech Stack
- HTML5, CSS3, JavaScript
- CSS Grid & Flexbox
- Custom animations
- Progressive Web App features

Built with ❤️ and lots of ☕`,

                    'package.json': `{
  "name": "portfolio",
  "version": "1.0.0",
  "description": "Personal portfolio website",
  "main": "index.html",
  "scripts": {
    "start": "serve .",
    "build": "npm run minify",
    "deploy": "gh-pages -d ."
  },
  "keywords": ["portfolio", "web-developer", "javascript"],
  "author": "Gunangi Bhagat",
  "license": "MIT"
}`,

                    'skills.json': JSON.stringify({
                        frontend: ['JavaScript', 'React', 'CSS3', 'HTML5'],
                        backend: ['Node.js', 'Express', 'Python', 'Django'],
                        database: ['MongoDB', 'PostgreSQL', 'Redis'],
                        tools: ['Git', 'Docker', 'AWS', 'Vercel']
                    }, null, 2)
                };
                
                if (specialFiles[fileName]) {
                    return specialFiles[fileName];
                } else {
                    return `cat: ${fileName}: No such file or directory`;
                }
            }
        },

        whoami: {
            description: 'Display current user',
            usage: 'whoami',
            execute: () => 'developer'
        },

        date: {
            description: 'Display current date and time',
            usage: 'date',
            execute: () => new Date().toString()
        },

        echo: {
            description: 'Display text',
            usage: 'echo [text]',
            execute: (args) => args.join(' ')
        },

        clear: {
            description: 'Clear terminal screen',
            usage: 'clear',
            execute: () => '__CLEAR__'
        },

        history: {
            description: 'Show command history',
            usage: 'history',
            execute: () => {
                return this.history.map((cmd, index) => {
                    return `${(index + 1).toString().padStart(4)} ${cmd}`;
                }).join('\n');
            }
        },

        about: {
            description: 'About the developer',
            usage: 'about',
            execute: () => `👨‍💻 Gunangi Bhagat - Full-Stack Web Developer

I'm passionate about creating beautiful, functional, and user-friendly 
web applications. With expertise in modern frontend and backend 
technologies, I love bringing ideas to life on the web.

Current focus:
• Advanced React patterns and Next.js
• Building scalable backend systems
• Contributing to open-source projects
• Exploring AI/ML integration in web apps

📧 Contact: your.email@example.com
🔗 GitHub: github.com/Gunangi
💼 LinkedIn: linkedin.com/in/yourprofile`
        },

        projects: {
            description: 'List featured projects',
            usage: 'projects',
            execute: () => `📂 Featured Projects:

1. E-Commerce Platform
   Technologies: React, Node.js, MongoDB
   Status: Completed ✅
   
2. Task Management App  
   Technologies: Next.js, TypeScript, PostgreSQL
   Status: Completed ✅
   
3. Weather Dashboard
   Technologies: React, Chart.js, APIs
   Status: Completed ✅
   
4. Real-time Chat App
   Technologies: React, Socket.io, Node.js
   Status: Completed ✅

Type 'cd projects' to explore project directories.`
        },

        skills: {
            description: 'Display technical skills',
            usage: 'skills',
            execute: () => `🛠️ Technical Skills:

Frontend Development:
▓▓▓▓▓▓▓▓▓░ JavaScript (ES6+)
▓▓▓▓▓▓▓▓▓░ React.js
▓▓▓▓▓▓▓▓░░ Next.js
▓▓▓▓▓▓▓▓▓▓ HTML5/CSS3

Backend Development:
▓▓▓▓▓▓▓▓░░ Node.js
▓▓▓▓▓▓▓▓░░ Express.js
▓▓▓▓▓▓▓░░░ Python
▓▓▓▓▓▓▓░░░ Django

Database & Tools:
▓▓▓▓▓▓▓▓░░ MongoDB
▓▓▓▓▓▓▓░░░ PostgreSQL
▓▓▓▓▓▓▓▓▓░ Git/GitHub
▓▓▓▓▓▓░░░░ Docker`
        },

        contact: {
            description: 'Contact information',
            usage: 'contact',
            execute: () => `📞 Contact Information:

📧 Email: your.email@example.com
🌐 Website: https://yourportfolio.com
🔗 GitHub: https://github.com/Gunangi
💼 LinkedIn: https://linkedin.com/in/yourprofile
🐦 Twitter: https://twitter.com/yourusername

📍 Location: Your City, Country
🟢 Status: Available for opportunities

Feel free to reach out for collaborations, job opportunities,
or just to say hello! 👋`
        },

        resume: {
            description: 'Download resume',
            usage: 'resume',
            execute: () => {
                this.downloadResume();
                return '📄 Resume download initiated...\nOpening resume in new tab...';
            }
        }
    };

    // ===================================
    // Terminal Setup
    // ===================================

    setupTerminalControls() {
        const controls = document.querySelectorAll('.terminal-controls .control');
        
        controls.forEach(control => {
            control.addEventListener('click', (e) => {
                e.stopPropagation();
                
                if (control.classList.contains('close')) {
                    this.simulateClose();
                } else if (control.classList.contains('minimize')) {
                    this.simulateMinimize();
                } else if (control.classList.contains('maximize')) {
                    this.simulateMaximize();
                }
            });
        });
    }

    setupInteractiveTerminal() {
        // Create interactive terminal in contact section
        this.createInteractiveTerminal();
    }

    createInteractiveTerminal() {
        const contactTerminal = document.querySelector('.contact-terminal .terminal-body');
        if (!contactTerminal) return;

        // Add interactive terminal section
        const interactiveSection = document.createElement('div');
        interactiveSection.className = 'interactive-terminal';
        interactiveSection.innerHTML = `
            <div class="command-line">
                <span class="prompt">$ </span>
                <span class="command">help</span>
            </div>
            <div class="terminal-output">
                <div class="help-text">Welcome to the interactive terminal! Type commands to explore.</div>
            </div>
            <div class="terminal-input-container">
                <span class="prompt">$ </span>
                <input type="text" class="terminal-input" placeholder="Enter command..." autocomplete="off">
            </div>
        `;

        contactTerminal.appendChild(interactiveSection);

        const input = interactiveSection.querySelector('.terminal-input');
        const output = interactiveSection.querySelector('.terminal-output');

        input.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                this.executeCommand(input.value.trim(), output, input);
            }
        });

        input.addEventListener('keydown', (e) => {
            this.handleKeyNavigation(e, input);
        });

        // Focus on input
        input.focus();
    }

    // ===================================
    // Command Execution
    // ===================================

    async executeCommand(commandString, outputContainer, inputElement) {
        if (this.isProcessing) return;
        
        this.isProcessing = true;
        
        // Add command to history
        if (commandString && !this.history.includes(commandString)) {
            this.history.push(commandString);
            this.historyIndex = this.history.length;
        }

        // Display command
        const commandDisplay = document.createElement('div');
        commandDisplay.className = 'command-display';
        commandDisplay.innerHTML = `<span class="prompt">$ </span><span class="command-text">${commandString}</span>`;
        outputContainer.appendChild(commandDisplay);

        // Clear input
        inputElement.value = '';

        // Parse command
        const [command, ...args] = commandString.split(' ');
        
        if (!command) {
            this.isProcessing = false;
            return;
        }

        // Execute command
        const cmd = this.commands[command.toLowerCase()];
        let result;

        if (cmd) {
            try {
                result = await cmd.execute(args);
            } catch (error) {
                result = `Error executing command: ${error.message}`;
            }
        } else {
            result = `Command not found: ${command}. Type 'help' for available commands.`;
        }

        // Handle special commands
        if (result === '__CLEAR__') {
            outputContainer.innerHTML = '<div class="help-text">Terminal cleared.</div>';
        } else if (result) {
            // Display result with typewriter effect
            const resultDiv = document.createElement('div');
            resultDiv.className = 'command-result';
            outputContainer.appendChild(resultDiv);
            
            await this.typeText(resultDiv, result, 20);
        }

        // Scroll to bottom
        outputContainer.scrollTop = outputContainer.scrollHeight;
        
        // Focus back on input
        inputElement.focus();
        
        this.isProcessing = false;
    }

    // ===================================
    // Command History Navigation
    // ===================================

    handleKeyNavigation(e, inputElement) {
        if (e.key === 'ArrowUp') {
            e.preventDefault();
            if (this.historyIndex > 0) {
                this.historyIndex--;
                inputElement.value = this.history[this.historyIndex];
            }
        } else if (e.key === 'ArrowDown') {
            e.preventDefault();
            if (this.historyIndex < this.history.length - 1) {
                this.historyIndex++;
                inputElement.value = this.history[this.historyIndex];
            } else {
                this.historyIndex = this.history.length;
                inputElement.value = '';
            }
        } else if (e.key === 'Tab') {
            e.preventDefault();
            this.autoComplete(inputElement);
        }
    }

    autoComplete(inputElement) {
        const input = inputElement.value.toLowerCase();
        const matches = Object.keys(this.commands).filter(cmd => cmd.startsWith(input));
        
        if (matches.length === 1) {
            inputElement.value = matches[0];
        } else if (matches.length > 1) {
            // Show available options
            const outputContainer = inputElement.closest('.interactive-terminal').querySelector('.terminal-output');
            const optionsDiv = document.createElement('div');
            optionsDiv.className = 'autocomplete-options';
            optionsDiv.textContent = matches.join('  ');
            outputContainer.appendChild(optionsDiv);
            outputContainer.scrollTop = outputContainer.scrollHeight;
        }
    }

    setupCommandHistory() {
        // Pre-populate with some example commands
        this.history = ['help', 'about', 'skills', 'projects', 'ls', 'pwd'];
        this.historyIndex = this.history.length;
    }

    // ===================================
    // Terminal Control Actions
    // ===================================

    simulateClose() {
        const terminals = document.querySelectorAll('.terminal-window');
        terminals.forEach(terminal => {
            terminal.style.animation = 'fadeOut 0.5s ease';
            setTimeout(() => {
                terminal.style.display = 'none';
            }, 500);
        });
        
        setTimeout(() => {
            terminals.forEach(terminal => {
                terminal.style.display = 'block';
                terminal.style.animation = 'fadeIn 0.5s ease';
            });
        }, 2000);
    }

    simulateMinimize() {
        const terminals = document.querySelectorAll('.terminal-window');
        terminals.forEach(terminal => {
            terminal.style.transform = 'scale(0.1)';
            terminal.style.opacity = '0';
            terminal.style.transition = 'all 0.5s ease';
        });
        
        setTimeout(() => {
            terminals.forEach(terminal => {
                terminal.style.transform = 'scale(1)';
                terminal.style.opacity = '1';
            });
        }, 1500);
    }

    simulateMaximize() {
        const terminals = document.querySelectorAll('.terminal-window');
        terminals.forEach(terminal => {
            terminal.style.transform = 'scale(1.05)';
            terminal.style.transition = 'transform 0.3s ease';
        });
        
        setTimeout(() => {
            terminals.forEach(terminal => {
                terminal.style.transform = 'scale(1)';
            });
        }, 300);
    }

    // ===================================
    // Terminal Session Creation
    // ===================================

    createTerminalSession() {
        // Add matrix effect to terminal backgrounds
        this.addMatrixEffect();
        
        // Setup terminal window dragging
        this.setupDraggableTerminals();
        
        // Add terminal sound effects
        this.setupSoundEffects();
    }

    addMatrixEffect() {
        const terminals = document.querySelectorAll('.terminal-window');
        terminals.forEach(terminal => {
            terminal.addEventListener('mouseenter', () => {
                this.startMatrixEffect(terminal);
            });
            
            terminal.addEventListener('mouseleave', () => {
                this.stopMatrixEffect(terminal);
            });
        });
    }

    startMatrixEffect(terminal) {
        if (terminal.matrixInterval) return;
        
        const chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
        
        terminal.matrixInterval = setInterval(() => {
            if (Math.random() < 0.1) {
                const char = document.createElement('span');
                char.className = 'matrix-char';
                char.textContent = chars[Math.floor(Math.random() * chars.length)];
                char.style.position = 'absolute';
                char.style.left = Math.random() * 100 + '%';
                char.style.top = '0';
                char.style.color = 'rgba(57, 255, 20, 0.3)';
                char.style.fontSize = '12px';
                char.style.animation = 'matrixFall 2s linear forwards';
                
                terminal.style.position = 'relative';
                terminal.appendChild(char);
                
                setTimeout(() => {
                    if (char.parentNode) {
                        char.parentNode.removeChild(char);
                    }
                }, 2000);
            }
        }, 100);
    }

    stopMatrixEffect(terminal) {
        if (terminal.matrixInterval) {
            clearInterval(terminal.matrixInterval);
            terminal.matrixInterval = null;
        }
    }

    setupDraggableTerminals() {
        const terminals = document.querySelectorAll('.terminal-window');
        
        terminals.forEach(terminal => {
            const header = terminal.querySelector('.terminal-header');
            if (!header) return;
            
            let isDragging = false;
            let currentX, currentY, initialX, initialY;
            
            header.addEventListener('mousedown', (e) => {
                isDragging = true;
                initialX = e.clientX - (terminal.offsetLeft || 0);
                initialY = e.clientY - (terminal.offsetTop || 0);
                
                terminal.style.position = 'relative';
                terminal.style.zIndex = '1000';
                header.style.cursor = 'grabbing';
            });
            
            document.addEventListener('mousemove', (e) => {
                if (!isDragging) return;
                
                currentX = e.clientX - initialX;
                currentY = e.clientY - initialY;
                
                terminal.style.transform = `translate(${currentX}px, ${currentY}px)`;
            });
            
            document.addEventListener('mouseup', () => {
                if (isDragging) {
                    isDragging = false;
                    header.style.cursor = 'grab';
                    
                    // Animate back to original position
                    setTimeout(() => {
                        terminal.style.transform = 'translate(0, 0)';
                        terminal.style.transition = 'transform 0.5s ease';
                        
                        setTimeout(() => {
                            terminal.style.transition = '';
                            terminal.style.zIndex = '';
                        }, 500);
                    }, 1000);
                }
            });
        });
    }

    setupSoundEffects() {
        // Create audio context for terminal sounds
        this.audioContext = null;
        
        try {
            this.audioContext = new (window.AudioContext || window.webkitAudioContext)();
        } catch (e) {
            console.log('Web Audio API not supported');
        }
    }

    playKeySound() {
        if (!this.audioContext) return;
        
        const oscillator = this.audioContext.createOscillator();
        const gainNode = this.audioContext.createGain();
        
        oscillator.connect(gainNode);
        gainNode.connect(this.audioContext.destination);
        
        oscillator.frequency.value = 800;
        oscillator.type = 'square';
        
        gainNode.gain.setValueAtTime(0, this.audioContext.currentTime);
        gainNode.gain.linearRampToValueAtTime(0.1, this.audioContext.currentTime + 0.01);
        gainNode.gain.exponentialRampToValueAtTime(0.001, this.audioContext.currentTime + 0.1);
        
        oscillator.start(this.audioContext.currentTime);
        oscillator.stop(this.audioContext.currentTime + 0.1);
    }

    // ===================================
    // Utility Functions
    // ===================================

    async typeText(element, text, speed = 50) {
        element.textContent = '';
        
        for (let i = 0; i < text.length; i++) {
            await this.delay(speed);
            element.textContent += text[i];
            
            // Play key sound occasionally
            if (Math.random() < 0.1) {
                this.playKeySound();
            }
        }
    }

    delay(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    downloadResume() {
        // Create a temporary link for resume download
        const link = document.createElement('a');
        link.href = '#'; // Replace with actual resume URL
        link.download = 'Gunangi_Bhagat_Resume.pdf';
        link.target = '_blank';
        
        // Simulate download
        console.log('Resume download initiated...');
        
        // In a real implementation, you would have an actual file
        // For demo purposes, we'll just show an alert
        setTimeout(() => {
            alert('Resume download would start here. Please add your actual resume file.');
        }, 500);
    }

    formatFileSize(bytes) {
        const sizes = ['B', 'KB', 'MB', 'GB'];
        if (bytes === 0) return '0 B';
        const i = Math.floor(Math.log(bytes) / Math.log(1024));
        return Math.round(bytes / Math.pow(1024, i) * 100) / 100 + ' ' + sizes[i];
    }

    formatDate(date) {
        return new Date(date).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: '2-digit'
        });
    }

    // ===================================
    // ASCII Art Generator
    // ===================================

    generateASCII(text) {
        const ascii = {
            'PORTFOLIO': `
 ____   ___  ____ _____ _____ ___  _     ___ ___  
|  _ \\ / _ \\|  _ \\_   _|  ___/ _ \\| |   |_ _/ _ \\ 
| |_) | | | | |_) || | | |_ | | | | |    | | | | |
|  __/| |_| |  _ < | | |  _|| |_| | |___ | | |_| |
|_|    \\___/|_| \\_\\|_| |_|   \\___/|_____|___\\___/ 
            `,
            'WELCOME': `
__        _______ _     ____ ___  __  __ _____ 
\\ \\      / / ____| |   / ___/ _ \\|  \\/  | ____|
 \\ \\ /\\ / /|  _| | |  | |  | | | | |\\/| |  _|  
  \\ V  V / | |___| |__| |__| |_| | |  | | |___ 
   \\_/\\_/  |_____|_____\\____\\___/|_|  |_|_____|
            `
        };
        
        return ascii[text.toUpperCase()] || text;
    }

    // ===================================
    // Terminal Themes
    // ===================================

    setTerminalTheme(theme) {
        const themes = {
            matrix: {
                bg: '#0a0e1a',
                text: '#39ff14',
                accent: '#00ff41'
            },
            retro: {
                bg: '#001100',
                text: '#00ff00',
                accent: '#ffff00'
            },
            cyberpunk: {
                bg: '#0f0f23',
                text: '#ff00ff',
                accent: '#00ffff'
            }
        };
        
        const selectedTheme = themes[theme] || themes.matrix;
        
        document.documentElement.style.setProperty('--primary-bg', selectedTheme.bg);
        document.documentElement.style.setProperty('--text-primary', selectedTheme.text);
        document.documentElement.style.setProperty('--accent-green', selectedTheme.accent);
    }

    // ===================================
    // Cleanup
    // ===================================

    destroy() {
        // Clean up intervals and event listeners
        const terminals = document.querySelectorAll('.terminal-window');
        terminals.forEach(terminal => {
            if (terminal.matrixInterval) {
                clearInterval(terminal.matrixInterval);
            }
        });
        
        if (this.audioContext) {
            this.audioContext.close();
        }
    }
}

// ===================================
// Initialize Terminal Controller
// ===================================

let terminalController;

document.addEventListener('DOMContentLoaded', () => {
    terminalController = new TerminalController();
    
    // Make available globally
    window.TerminalController = TerminalController;
    window.terminalController = terminalController;
    
    // Add CSS animations for matrix effect
    if (!document.getElementById('matrix-animations')) {
        const style = document.createElement('style');
        style.id = 'matrix-animations';
        style.textContent = `
            @keyframes matrixFall {
                from {
                    transform: translateY(-100px);
                    opacity: 1;
                }
                to {
                    transform: translateY(200px);
                    opacity: 0;
                }
            }
            
            @keyframes fadeOut {
                from { opacity: 1; transform: scale(1); }
                to { opacity: 0; transform: scale(0.8); }
            }
            
            @keyframes fadeIn {
                from { opacity: 0; transform: scale(0.8); }
                to { opacity: 1; transform: scale(1); }
            }
            
            .terminal-input {
                background: transparent;
                border: none;
                color: var(--text-primary);
                font-family: var(--font-mono);
                font-size: 1rem;
                outline: none;
                flex: 1;
                caret-color: var(--accent-green);
            }
            
            .command-result {
                white-space: pre-wrap;
                margin: 0.5rem 0;
                color: var(--text-secondary);
                line-height: 1.4;
            }
            
            .autocomplete-options {
                color: var(--text-muted);
                margin: 0.25rem 0;
                font-style: italic;
            }
            
            .interactive-terminal {
                margin-top: 1rem;
                border-top: 1px solid var(--border-color);
                padding-top: 1rem;
            }
            
            .terminal-input-container {
                display: flex;
                align-items: center;
                margin-top: 1rem;
            }
        `;
        document.head.appendChild(style);
    }
});

// ===================================
// Export for modules
// ===================================

if (typeof module !== 'undefined' && module.exports) {
    module.exports = TerminalController;
}