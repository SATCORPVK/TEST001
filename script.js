// Background Canvas Animation
class BackgroundAnimation {
    constructor() {
        this.canvas = document.getElementById('bgCanvas');
        this.ctx = this.canvas.getContext('2d');
        this.particles = [];
        this.connections = [];
        this.mousePosition = { x: 0, y: 0 };
        
        this.init();
        this.animate();
        this.setupEventListeners();
    }
    
    init() {
        this.resize();
        this.createParticles();
    }
    
    resize() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
    }
    
    createParticles() {
        const particleCount = Math.floor((this.canvas.width * this.canvas.height) / 15000);
        
        for (let i = 0; i < particleCount; i++) {
            this.particles.push({
                x: Math.random() * this.canvas.width,
                y: Math.random() * this.canvas.height,
                vx: (Math.random() - 0.5) * 0.5,
                vy: (Math.random() - 0.5) * 0.5,
                size: Math.random() * 2 + 1,
                opacity: Math.random() * 0.5 + 0.2
            });
        }
    }
    
    setupEventListeners() {
        window.addEventListener('resize', () => this.resize());
        window.addEventListener('mousemove', (e) => {
            this.mousePosition.x = e.clientX;
            this.mousePosition.y = e.clientY;
        });
    }
    
    animate() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        
        // Update and draw particles
        this.particles.forEach((particle, index) => {
            // Update position
            particle.x += particle.vx;
            particle.y += particle.vy;
            
            // Bounce off edges
            if (particle.x < 0 || particle.x > this.canvas.width) particle.vx *= -1;
            if (particle.y < 0 || particle.y > this.canvas.height) particle.vy *= -1;
            
            // Draw particle
            this.ctx.beginPath();
            this.ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
            this.ctx.fillStyle = `rgba(124, 58, 237, ${particle.opacity})`;
            this.ctx.fill();
            
            // Check connections
            for (let j = index + 1; j < this.particles.length; j++) {
                const other = this.particles[j];
                const distance = Math.hypot(particle.x - other.x, particle.y - other.y);
                
                if (distance < 150) {
                    const opacity = (1 - distance / 150) * 0.3;
                    this.ctx.beginPath();
                    this.ctx.moveTo(particle.x, particle.y);
                    this.ctx.lineTo(other.x, other.y);
                    this.ctx.strokeStyle = `rgba(124, 58, 237, ${opacity})`;
                    this.ctx.lineWidth = 0.5;
                    this.ctx.stroke();
                }
            }
            
            // Mouse interaction
            const mouseDistance = Math.hypot(
                particle.x - this.mousePosition.x,
                particle.y - this.mousePosition.y
            );
            
            if (mouseDistance < 100) {
                const force = (1 - mouseDistance / 100) * 0.1;
                const angle = Math.atan2(
                    particle.y - this.mousePosition.y,
                    particle.x - this.mousePosition.x
                );
                particle.vx += Math.cos(angle) * force;
                particle.vy += Math.sin(angle) * force;
                
                // Limit velocity
                const speed = Math.hypot(particle.vx, particle.vy);
                if (speed > 2) {
                    particle.vx = (particle.vx / speed) * 2;
                    particle.vy = (particle.vy / speed) * 2;
                }
            }
        });
        
        requestAnimationFrame(() => this.animate());
    }
}

// Boot Sequence Controller
class BootSequence {
    constructor() {
        this.bootElement = document.getElementById('bootSequence');
        this.mainContent = document.querySelector('.main-container');
        this.navTerminal = document.querySelector('.nav-terminal');
        
        this.init();
    }
    
    init() {
        setTimeout(() => {
            this.completeBoot();
        }, 3500);
    }
    
    completeBoot() {
        gsap.to(this.bootElement, {
            opacity: 0,
            duration: 1,
            onComplete: () => {
                this.bootElement.style.display = 'none';
                this.animateEntry();
            }
        });
    }
    
    animateEntry() {
        gsap.from(this.navTerminal, {
            y: -100,
            opacity: 0,
            duration: 1,
            ease: 'power3.out'
        });
        
        // Animate sections on scroll
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -100px 0px'
        };
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    gsap.from(entry.target.querySelectorAll('.panel, .cap-module, .stage, .op-card, .protocol-phase'), {
                        y: 30,
                        opacity: 0,
                        duration: 0.8,
                        stagger: 0.1,
                        ease: 'power2.out'
                    });
                }
            });
        }, observerOptions);
        
        document.querySelectorAll('.section').forEach(section => {
            observer.observe(section);
        });
    }
}

// Navigation Controller
class NavigationController {
    constructor() {
        this.navItems = document.querySelectorAll('.nav-item');
        this.sections = document.querySelectorAll('.section');
        
        this.init();
    }
    
    init() {
        this.navItems.forEach(item => {
            item.addEventListener('click', (e) => {
                const targetSection = item.dataset.section;
                const section = document.getElementById(targetSection);
                
                if (section) {
                    section.scrollIntoView({ behavior: 'smooth' });
                    this.updateActiveNav(item);
                }
            });
        });
        
        // Update active nav on scroll
        window.addEventListener('scroll', () => {
            this.updateActiveOnScroll();
        });
    }
    
    updateActiveNav(activeItem) {
        this.navItems.forEach(item => item.classList.remove('active'));
        activeItem.classList.add('active');
    }
    
    updateActiveOnScroll() {
        const scrollPosition = window.scrollY + 150;
        
        this.sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.id;
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                const correspondingNavItem = document.querySelector(`[data-section="${sectionId}"]`);
                if (correspondingNavItem) {
                    this.updateActiveNav(correspondingNavItem);
                }
            }
        });
    }
}

// Form Handler
class FormHandler {
    constructor() {
        this.form = document.getElementById('contactForm');
        this.submitBtn = this.form.querySelector('.submit-btn');
        
        this.init();
    }
    
    init() {
        this.form.addEventListener('submit', (e) => {
            e.preventDefault();
            this.handleSubmit();
        });
        
        // Add input animations
        this.form.querySelectorAll('input, textarea, select').forEach(input => {
            input.addEventListener('focus', () => {
                input.parentElement.classList.add('focused');
            });
            
            input.addEventListener('blur', () => {
                if (!input.value) {
                    input.parentElement.classList.remove('focused');
                }
            });
        });
    }
    
    handleSubmit() {
        const formData = new FormData(this.form);
        const data = Object.fromEntries(formData);
        
        // Simulate transmission
        this.submitBtn.disabled = true;
        this.submitBtn.innerHTML = '<span class="btn-text">TRANSMITTING...</span><span class="btn-indicator"></span>';
        
        gsap.to(this.submitBtn, {
            scale: 0.95,
            duration: 0.1,
            yoyo: true,
            repeat: 5,
            ease: 'power2.inOut',
            onComplete: () => {
                gsap.to(this.submitBtn, {
                    scale: 1,
                    duration: 0.2
                });
                
                // Show success
                this.submitBtn.innerHTML = '<span class="btn-text">TRANSMISSION COMPLETE</span><span class="btn-indicator">✓</span>';
                this.submitBtn.style.background = 'linear-gradient(135deg, #22c55e, #16a34a)';
                
                // Reset after delay
                setTimeout(() => {
                    this.form.reset();
                    this.submitBtn.disabled = false;
                    this.submitBtn.innerHTML = '<span class="btn-text">TRANSMISSION</span><span class="btn-indicator"></span>';
                    this.submitBtn.style.background = '';
                }, 3000);
            }
        });
        
        console.log('Form submission data:', data);
    }
}

// Panel Interactions
class PanelInteractions {
    constructor() {
        this.panels = document.querySelectorAll('.panel');
        this.capModules = document.querySelectorAll('.cap-module');
        this.opCards = document.querySelectorAll('.op-card');
        
        this.init();
    }
    
    init() {
        // Panel hover effects
        this.panels.forEach(panel => {
            panel.addEventListener('mouseenter', () => {
                gsap.to(panel, {
                    y: -4,
                    duration: 0.3,
                    ease: 'power2.out'
                });
            });
            
            panel.addEventListener('mouseleave', () => {
                gsap.to(panel, {
                    y: 0,
                    duration: 0.3,
                    ease: 'power2.out'
                });
            });
        });
        
        // Capability module interactions
        this.capModules.forEach(module => {
            module.addEventListener('click', () => {
                const cap = module.dataset.cap;
                this.showCapabilityDetails(cap);
            });
        });
        
        // Operation card interactions
        this.opCards.forEach(card => {
            card.addEventListener('click', () => {
                this.expandOperationDetails(card);
            });
        });
    }
    
    showCapabilityDetails(cap) {
        // Create detail overlay or modal
        console.log(`Showing details for capability: ${cap}`);
        // Implementation for capability detail modal
    }
    
    expandOperationDetails(card) {
        const isExpanded = card.classList.contains('expanded');
        
        if (!isExpanded) {
            gsap.to(card, {
                scale: 1.02,
                duration: 0.3,
                ease: 'power2.out'
            });
            card.classList.add('expanded');
        } else {
            gsap.to(card, {
                scale: 1,
                duration: 0.3,
                ease: 'power2.out'
            });
            card.classList.remove('expanded');
        }
    }
}

// Initialize everything when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    // Start background animation
    new BackgroundAnimation();
    
    // Handle boot sequence
    new BootSequence();
    
    // Initialize navigation
    new NavigationController();
    
    // Handle form submissions
    new FormHandler();
    
    // Setup panel interactions
    new PanelInteractions();
    
    // Add smooth parallax effect to section titles
    document.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const parallaxElements = document.querySelectorAll('.section-title');
        
        parallaxElements.forEach(element => {
            const rect = element.getBoundingClientRect();
            const speed = 0.5;
            const yPos = -(scrolled * speed);
            
            if (rect.top < window.innerHeight && rect.bottom > 0) {
                gsap.to(element, {
                    y: yPos * 0.1,
                    duration: 0.5,
                    ease: 'power2.out'
                });
            }
        });
    });
    
    // Add mouse glow effect
    document.addEventListener('mousemove', (e) => {
        const glow = document.createElement('div');
        glow.className = 'mouse-glow';
        glow.style.cssText = `
            position: fixed;
            width: 20px;
            height: 20px;
            background: radial-gradient(circle, rgba(124, 58, 237, 0.1), transparent);
            border-radius: 50%;
            pointer-events: none;
            transform: translate(-50%, -50%);
            left: ${e.clientX}px;
            top: ${e.clientY}px;
            z-index: 9999;
            animation: fadeOut 1s forwards;
        `;
        
        document.body.appendChild(glow);
        
        setTimeout(() => {
            glow.remove();
        }, 1000);
    });
});

// Add fadeOut animation for mouse glow
const style = document.createElement('style');
style.textContent = `
    @keyframes fadeOut {
        to {
            opacity: 0;
            transform: translate(-50%, -50%) scale(3);
        }
    }
`;
document.head.appendChild(style);
