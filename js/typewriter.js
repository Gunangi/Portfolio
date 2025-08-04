// ===================================
// Typewriter Effect Implementation
// ===================================

class TypewriterEffect {
    constructor() {
        this.isActive = false;
        this.queue = [];
        this.currentCommand = null;
        this.init();
    }

    init() {
        // Start typewriter effect after loading screen
        setTimeout(() => {
            this.startWhoAmICommand();
        }, 2500);
    }

    // ===================================
    // Main Typewriter Functions
    // ===================================

    async typeText(element, text, speed = 50, cursor = true) {
        if (!element) return;
        
        this.isActive = true;
        element.innerHTML = '';
        
        // Add cursor if needed
        if (cursor) {
            const cursorElement = document.createElement('span');
            cursorElement.className = 'terminal-cursor';
            cursorElement.textContent = '|';
            element.appendChild(cursorElement);
        }
        
        for (let i = 0; i < text.length; i++) {
            await this.delay(speed);
            
            if (cursor) {
                // Insert character before cursor
                const cursorEl = element.querySelector('.terminal-cursor');
                if (cursorEl) {
                    cursorEl.insertAdjacentText('beforebegin', text[i]);
                }
            } else {
                element.textContent += text[i];
            }
        }
        
        this.isActive = false;
        
        // Remove cursor after typing is complete
        if (cursor) {
            setTimeout(() => {
                const cursorEl = element.querySelector('.terminal-cursor');
                if (cursorEl) cursorEl.remove();
            }, 500);
        }
    }

    async deleteText(element, speed = 30) {
        if (!element) return;
        
        const text = element.textContent;
        
        for (let i = text.length; i >= 0; i--) {
            await this.delay(speed);
            element.textContent = text.substring(0, i);
        }
    }

    async typeCommand(element, command, speed = 100) {
        if (!element) return;
        
        // Clear existing content
        element.innerHTML = '';
        
        // Add prompt
        const prompt = document.createElement('span');
        prompt.className = 'prompt';
        prompt.textContent = '$ ';
        element.appendChild(prompt);
        
        // Add command container
        const commandSpan = document.createElement('span');
        commandSpan.className = 'command';
        element.appendChild(commandSpan);
        
        // Add cursor
        const cursor = document.createElement('span');
        cursor.className = 'cursor';
        cursor.textContent = '|';
        element.appendChild(cursor);
        
        // Type command
        for (let i = 0; i < command.length; i++) {
            await this.delay(speed);
            commandSpan.textContent += command[i];
        }
        
        // Blink cursor for a moment
        await this.delay(500);
        
        // Remove cursor
        cursor.remove();
        
        return commandSpan;
    }

    // ===================================
    // Specific Command Animations
    // ===================================

    async startWhoAmICommand() {
        const commandElement = document.getElementById('typing-command');
        const outputElement = document.getElementById('whoami-output');
        
        if (!commandElement || !outputElement) return;
        
        // Initially hide output
        outputElement.style.opacity = '0';
        
        // Type the command
        await this.typeText(commandElement, 'whoami', 80, false);
        
        // Show cursor blinking
        await this.delay(800);
        
        // Press enter effect
        await this.delay(200);
        
        // Show output with fade-in
        outputElement.style.transition = 'opacity 0.8s ease';
        outputElement.style.opacity = '1';
        
        // Start title animation
        this.animateHeroTitle();
        
        // Start tech stack animation
        setTimeout(() => {
            this.animateTechStack();
        }, 2000);
    }

    animateHeroTitle() {
        const titleLines = document.querySelectorAll('.title-line');
        
        titleLines.forEach((line, index) => {
            setTimeout(() => {
                line.style.opacity = '0';
                line.style.transform = 'translateY(20px)';
                line.style.transition = 'all 0.8s ease';
                
                // Trigger animation
                setTimeout(() => {
                    line.style.opacity = '1';
                    line.style.transform = 'translateY(0)';
                }, 50);
                
                // Add typewriter effect to highlight line
                if (line.classList.contains('highlight')) {
                    setTimeout(() => {
                        this.addGlowEffect(line);
                    }, 800);
                }
            }, index * 300);
        });
    }

    animateTechStack() {
        const techItems = document.querySelectorAll('.tech-item');
        
        techItems.forEach((item, index) => {
            setTimeout(() => {
                item.style.opacity = '0';
                item.style.transform = 'translateY(20px) scale(0.9)';
                item.style.transition = 'all 0.5s ease';
                
                // Trigger animation
                setTimeout(() => {
                    item.style.opacity = '1';
                    item.style.transform = 'translateY(0) scale(1)';
                }, 50);
                
                // Add pulse effect
                setTimeout(() => {
                    item.style.animation = 'pulse 0.5s ease';
                }, 500);
                
            }, index * 80);
        });
    }

    // ===================================
    // Terminal Command Simulations
    // ===================================

    async simulateTerminalSession(commands, outputContainer) {
        if (!outputContainer) return;
        
        for (const cmd of commands) {
            await this.executeCommand(cmd, outputContainer);
            await this.delay(cmd.delay || 1000);
        }
    }

    async executeCommand(commandObj, container) {
        const { command, output, type = 'text', speed = 50 } = commandObj;
        
        // Create command line
        const commandLine = document.createElement('div');
        commandLine.className = 'command-line';
        
        const prompt = document.createElement('span');
        prompt.className = 'prompt';
        prompt.textContent = '$ ';
        
        const commandSpan = document.createElement('span');
        commandSpan.className = 'command';
        
        commandLine.appendChild(prompt);
        commandLine.appendChild(commandSpan);
        container.appendChild(commandLine);
        
        // Type command
        await this.typeText(commandSpan, command, speed, false);
        await this.delay(300);
        
        // Add output
        if (output) {
            const outputDiv = document.createElement('div');
            outputDiv.className = 'command-output';
            
            if (type === 'html') {
                outputDiv.innerHTML = output;
            } else {
                await this.typeText(outputDiv, output, speed / 2, false);
            }
            
            container.appendChild(outputDiv);
        }
    }

    // ===================================
    // Interactive Terminal
    // ===================================

    createInteractiveTerminal(containerId) {
        const container = document.getElementById(containerId);
        if (!container) return;
        
        const commands = {
            'help': 'Available commands: about, skills, projects, contact, clear',
            'about': 'I am a Full-Stack Web Developer passionate about creating amazing web experiences.',
            'skills': 'JavaScript, React, Node.js, Python, MongoDB, PostgreSQL, and more...',
            'projects': 'Check out my featured projects in the projects section above.',
            'contact': 'Email: your.email@example.com | GitHub: github.com/yourusername',
            'clear': '__CLEAR__',
            'whoami': 'Full-Stack Web Developer',
            'pwd': '/home/developer/portfolio',
            'ls': 'projects/ skills/ certifications/ contact/ resume.pdf'
        };
        
        this.setupTerminalInput(container, commands);
    }

    setupTerminalInput(container, commands) {
        const inputLine = document.createElement('div');
        inputLine.className = 'terminal-input-line';
        inputLine.innerHTML = `
            <span class="prompt">$ </span>
            <input type="text" class="terminal-input" placeholder="Type 'help' for available commands">
        `;
        
        container.appendChild(inputLine);
        
        const input = inputLine.querySelector('.terminal-input');
        
        input.addEventListener('keypress', async (e) => {
            if (e.key === 'Enter') {
                const command = input.value.trim().toLowerCase();
                input.value = '';
                
                // Display command
                const commandDisplay = document.createElement('div');
                commandDisplay.className = 'command-display';
                commandDisplay.innerHTML = `<span class="prompt">$ </span><span>${command}</span>`;
                container.insertBefore(commandDisplay, inputLine);
                
                // Execute command
                if (commands[command]) {
                    if (commands[command] === '__CLEAR__') {
                        container.innerHTML = '';
                        container.appendChild(inputLine);
                    } else {
                        const output = document.createElement('div');
                        output.className = 'command-output';
                        await this.typeText(output, commands[command], 30, false);
                        container.insertBefore(output, inputLine);
                    }
                } else if (command) {
                    const output = document.createElement('div');
                    output.className = 'command-output error';
                    output.textContent = `Command not found: ${command}. Type 'help' for available commands.`;
                    container.insertBefore(output, inputLine);
                }
                
                // Scroll to bottom
                container.scrollTop = container.scrollHeight;
            }
        });
    }

    // ===================================
    // Effect Utilities
    // ===================================

    addGlowEffect(element) {
        element.style.textShadow = '0 0 10px var(--accent-green)';
        element.style.animation = 'neonGlow 2s ease-in-out infinite alternate';
    }

    addTypingCursor(element) {
        const cursor = document.createElement('span');
        cursor.className = 'typing-cursor';
        cursor.textContent = '|';
        cursor.style.animation = 'blink 1s infinite';
        element.appendChild(cursor);
        return cursor;
    }

    removeCursor(element) {
        const cursor = element.querySelector('.typing-cursor, .terminal-cursor');
        if (cursor) cursor.remove();
    }

    // ===================================
    // Utility Functions
    // ===================================

    delay(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    getRandomSpeed(min = 50, max = 150) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    // ===================================
    // Terminal Loading Sequences
    // ===================================

    async simulateLoading(element, messages) {
        for (const message of messages) {
            const line = document.createElement('div');
            line.className = 'loader-line';
            
            await this.typeText(line, message.text, 30, false);
            element.appendChild(line);
            
            if (message.success) {
                line.classList.add('success');
                line.innerHTML = '✓ ' + line.textContent;
            }
            
            await this.delay(message.delay || 500);
        }
    }

    // ===================================
    // Matrix Code Effect
    // ===================================

    createMatrixCode(element, duration = 5000) {
        const chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
        const text = element.textContent;
        let iterations = 0;
        
        const interval = setInterval(() => {
            element.textContent = text
                .split('')
                .map((letter, index) => {
                    if (index < iterations) {
                        return text[index];
                    }
                    return chars[Math.floor(Math.random() * chars.length)];
                })
                .join('');
            
            if (iterations >= text.length) {
                clearInterval(interval);
            }
            
            iterations += 1 / 3;
        }, 30);
    }
}

// ===================================
// Initialize Typewriter
// ===================================

let typewriterEffect;

document.addEventListener('DOMContentLoaded', () => {
    typewriterEffect = new TypewriterEffect();
    
    // Make available globally
    window.TypewriterEffect = TypewriterEffect;
    window.typewriterEffect = typewriterEffect;
});

// ===================================
// Export for modules
// ===================================

if (typeof module !== 'undefined' && module.exports) {
    module.exports = TypewriterEffect;
}