// Cognitive Interface Controller
class SATCORPInterface {
    constructor() {
        this.phase = 'initiation';
        this.userIntent = null;
        this.interactionHistory = [];
        this.idleTimer = null;
        this.currentField = null;
        
        this.initializeSystem();
    }
    
    initializeSystem() {
        this.executeInitiationSequence();
        this.setupProximityDetection();
        this.setupTemporalElements();
        this.setupIdleBehavior();
    }
    
    // Phase 1: System Awakening
    executeInitiationSequence() {
        const awakeningLines = document.querySelectorAll('.awakening-line');
        
        setTimeout(() => {
            this.revealField('#operational-field');
            
            // Gradually reveal identity core
            setTimeout(() => {
                this.analyzeUserBehavior();
            }, 6000);
        }, 4000);
    }
    
    // Phase 2: Behavioral Analysis
    analyzeUserBehavior() {
        // Track mouse movement patterns
        document.addEventListener('mousemove', (e) => {
            this.interactionHistory.push({
                type: 'movement',
                x: e.clientX,
                y: e.clientY,
                timestamp: Date.now()
            });
            
            this.detectAreaOfInterest(e.clientX, e.clientY);
            this.resetIdleTimer();
        });
        
        // Track scrolling intent
        document.addEventListener('wheel', (e) => {
            this.interactionHistory.push({
                type: 'scroll',
                delta: e.deltaY,
                timestamp: Date.now()
            });
            this.resetIdleTimer();
        });
    }
    
    // Proximity Intelligence
    setupProximityDetection() {
        const fields = ['#capability-field', '#network-field', '#sequence-field', '#contact-field'];
        
        // Position fields in different screen areas
        this.positionFieldsStrategically();
        
        document.addEventListener('mousemove', (e) => {
            fields.forEach((fieldId, index) => {
                const field = document.querySelector(fieldId);
                if (!field) return;
                
                const rect = field.getBoundingClientRect();
                const distance = this.calculateProximity(e.clientX, e.clientY, rect);
                
                if (distance < 300) { // Proximity threshold
                    this.activateField(fieldId);
                    this.currentField = fieldId;
                } else if (this.currentField === fieldId) {
                    this.deactivateField(fieldId);
                    this.currentField = null;
                }
            });
        });
    }
    
    calculateProximity(x, y, rect) {
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        return Math.sqrt(Math.pow(x - centerX, 2) + Math.pow(y - centerY, 2));
    }
    
    positionFieldsStrategically() {
        const fields = [
            { id: '#capability-field', top: '20%', left: '10%' },
            { id: '#network-field', top: '40%', right: '10%' },
            { id: '#sequence-field', bottom: '30%', left: '15%' },
            { id: '#contact-field', bottom: '20%', right: '15%' }
        ];
        
        fields.forEach(field => {
            const element = document.querySelector(field.id);
            if (element) {
                Object.keys(field).forEach(key => {
                    if (key !== 'id') element.style[key] = field[key];
                });
            }
        });
    }
    
    activateField(fieldId) {
        const field = document.querySelector(fieldId);
        if (field && field.classList.contains('hidden')) {
            field.classList.remove('hidden');
            field.style.opacity = '0';
            
            setTimeout(() => {
                field.style.transition = 'opacity 0.8s ease';
                field.style.opacity = '1';
            }, 100);
            
            // Pre-load field content
            this.preloadFieldContent(fieldId);
        }
    }
    
    deactivateField(fieldId) {
        const field = document.querySelector(fieldId);
        if (field && !field.classList.contains('hidden')) {
            field.style.opacity = '0';
            setTimeout(() => {
                field.classList.add('hidden');
            }, 800);
        }
    }
    
    preloadFieldContent(fieldId) {
        // Simulate intelligent pre-loading behavior
        setTimeout(() => {
            if (fieldId === '#contact-field') {
                this.prepareContactGate();
            }
        }, 300);
    }
    
    // Contact Gate Intelligence
    prepareContactGate() {
        const gateStatus = document.querySelector('#gate-status');
        const accessMessage = document.querySelector('#access-message');
        const gateInput = document.querySelector('#transmission-gate');
        
        const statuses = ['EVALUATING', 'ANALYZING', 'PROCESSING'];
        const messages = ['ACCESS UNCERTAIN', 'SIGNAL TOO VAGUE', 'CLARIFY INTENT', 'CHANNEL OPEN'];
        
        // Simulate evaluation process
        let step = 0;
        const evaluationInterval = setInterval(() => {
            gateStatus.textContent = statuses[step % statuses.length];
            accessMessage.textContent = messages[Math.min(step, messages.length - 1)];
            
            step++;
            
            if (step === 5) { // Evaluation complete
                clearInterval(evaluationInterval);
                gateStatus.textContent = 'READY';
                gateStatus.style.color = 'var(--signal-go)';
                accessMessage.textContent = 'CHANNEL OPEN';
                accessMessage.style.color = 'var(--signal-go)';
                
                // Enable input after delay
                setTimeout(() => {
                    gateInput.disabled = false;
                    gateInput.placeholder = "ENTER TRANSMISSION...";
                    this.initializeInputBehavior();
                }, 1000);
            }
        }, 800);
    }
    
    initializeInputBehavior() {
        const gateInput = document.querySelector('#transmission-gate');
        const receipt = document.querySelector('#transmission-receipt');
        
        gateInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter' && gateInput.value.trim()) {
                this.processTransmission(gateInput.value);
                gateInput.value = '';
                gateInput.disabled = true;
            }
        });
    }
    
    processTransmission(message) {
        const receipt = document.querySelector('#transmission-receipt');
        const receiptId = document.querySelector('#receipt-id');
        
        // Generate unique receipt ID
        const refId = 'REF: #' + Math.random().toString(36).substr(2, 9).toUpperCase();
        receiptId.textContent = refId;
        
        receipt.classList.remove('hidden');
        receipt.style.opacity = '0';
        
        setTimeout(() => {
            receipt.style.transition = 'opacity 0.5s ease';
            receipt.style.opacity = '1';
        }, 100);
        
        // Log transmission
        this.interactionHistory.push({
            type: 'transmission',
            message: message,
            timestamp: Date.now(),
            refId: refId
        });
    }
    
    // Temporal Intelligence
    setupTemporalElements() {
        // Update clock
        setInterval(() => {
            const now = new Date();
            const timeString = now.toTimeString().split(' ')[0];
            document.querySelector('#temporal-marker .cortex-data').textContent = timeString;
        }, 1000);
        
        // Dynamic entropy value
        setInterval(() => {
            const entropy = (Math.random() * 0.005 + 0.020).toFixed(3);
            document.querySelector('#entropy-value').textContent = entropy;
        }, 5000);
        
        // Occasional system recalibration
        setInterval(() => {
            this.recalibrateInterface();
        }, 30000);
    }
    
    recalibrateInterface() {
        // Subtle visual recalibration
        document.body.style.filter = 'brightness(1.02)';
        setTimeout(() => {
            document.body.style.filter = 'brightness(1)';
        }, 100);
        
        // Random field refresh
        const fields = ['#capability-field', '#network-field', '#sequence-field'];
        const randomField = fields[Math.floor(Math.random() * fields.length)];
        this.activateField(randomField);
    }
    
    // Idle Behavior
    setupIdleBehavior() {
        this.resetIdleTimer();
    }
    
    resetIdleTimer() {
        clearTimeout(this.idleTimer);
        this.idleTimer = setTimeout(() => {
            this.enterIdleState();
        }, 30000); // 30 seconds of inactivity
    }
    
    enterIdleState() {
        const idleState = document.querySelector('#idle-state');
        const operationalField = document.querySelector('#operational-field');
        
        operationalField.style.opacity = '0';
        setTimeout(() => {
            operationalField.classList.add('hidden');
            idleState.classList.remove('hidden');
            idleState.style.opacity = '0';
            
            setTimeout(() => {
                idleState.style.transition = 'opacity 1s ease';
                idleState.style.opacity = '1';
            }, 100);
        }, 1000);
        
        // Exit idle state on interaction
        const exitIdle = () => {
            idleState.style.opacity = '0';
            setTimeout(() => {
                idleState.classList.add('hidden');
                operationalField.classList.remove('hidden');
                operationalField.style.opacity = '1';
            }, 1000);
            
            document.removeEventListener('mousemove', exitIdle);
            document.removeEventListener('keypress', exitIdle);
            this.resetIdleTimer();
        };
        
        document.addEventListener('mousemove', exitIdle, { once: true });
        document.addEventListener('keypress', exitIdle, { once: true });
    }
    
    // Field Management
    revealField(selector) {
        const element = document.querySelector(selector);
        if (element) {
            element.classList.remove('hidden');
            element.style.opacity = '0';
            
            setTimeout(() => {
                element.style.transition = 'opacity 0.8s ease';
                element.style.opacity = '1';
            }, 100);
        }
    }
}

// Initialize Cognitive Interface
document.addEventListener('DOMContentLoaded', () => {
    // Add blinking caret to body for intelligence illusion
    const intelligentCaret = document.createElement('div');
    intelligentCaret.className = 'intelligent-caret';
    intelligentCaret.style.cssText = `
        position: fixed;
        width: 1px;
        height: 20px;
        background: var(--accent-primary);
        pointer-events: none;
        z-index: 1000;
        opacity: 0;
        animation: intelligentBlink 2s infinite;
    `;
    document.body.appendChild(intelligentCaret);
    
    // Move caret randomly
    setInterval(() => {
        if (Math.random() > 0.7) {
            intelligentCaret.style.opacity = '1';
            intelligentCaret.style.left = Math.random() * window.innerWidth + 'px';
            intelligentCaret.style.top = Math.random() * window.innerHeight + 'px';
            
            setTimeout(() => {
                intelligentCaret.style.opacity = '0';
            }, 500);
        }
    }, 3000);
    
    // Initialize main interface
    window.satcorpInterface = new SATCORPInterface();
});

// Additional intelligent behaviors
document.addEventListener('click', (e) => {
    // Micro-reflow on interaction
    if (Math.random() > 0.8) {
        document.body.style.fontFeatureSettings = '"salt" 1';
        setTimeout(() => {
            document.body.style.fontFeatureSettings = '"salt" 0';
        }, 50);
    }
});

// Prevent traditional scrolling behavior
document.addEventListener('wheel', (e) => {
    e.preventDefault();
    window.scrollBy(0, e.deltaY * 0.3); // Slow, intentional scrolling
}, { passive: false });
