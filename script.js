// script.js
document.addEventListener('DOMContentLoaded', function() {
    // Boot sequence
    setTimeout(() => {
        const bootSequence = document.getElementById('bootSequence');
        const interface = document.getElementById('interface');
        
        bootSequence.style.opacity = '0';
        setTimeout(() => {
            bootSequence.classList.add('hidden');
            interface.classList.remove('hidden');
        }, 1000);
    }, 5000);

    // Real-time clock
    function updateClock() {
        const now = new Date();
        const timeString = now.toLocaleTimeString('en-US', { 
            hour12: false,
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit'
        });
        document.getElementById('timeDisplay').textContent = timeString;
    }
    
    setInterval(updateClock, 1000);
    updateClock();

    // Capability Matrix functionality
    const modules = document.querySelectorAll('.module');
    modules.forEach(module => {
        module.addEventListener('click', function() {
            this.classList.toggle('active');
        });
    });

    // Methodology Sequence functionality
    const steps = document.querySelectorAll('.step');
    steps.forEach(step => {
        step.addEventListener('click', function() {
            steps.forEach(s => s.classList.remove('active'));
            this.classList.add('active');
        });
    });

    // Contact Protocol functionality
    const messageInput = document.getElementById('messageInput');
    const consoleOutput = document.getElementById('consoleOutput');
    
    messageInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            const message = this.value.trim();
            if (message) {
                consoleOutput.innerHTML += `<div>> TRANSMISSION RECEIVED: "${message}"</div>`;
                consoleOutput.innerHTML += `<div>> SATCORP WILL EVALUATE COMPATIBILITY</div>`;
                consoleOutput.innerHTML += `<div>----------------------------</div>`;
                this.value = '';
                
                // Auto-scroll to bottom
                consoleOutput.scrollTop = consoleOutput.scrollHeight;
            }
        }
    });

    // Keyboard shortcuts
    document.addEventListener('keydown', function(e) {
        if (e.ctrlKey || e.metaKey) return;
        
        // Focus message input on '/' key
        if (e.key === '/' && e.target !== messageInput) {
            e.preventDefault();
            messageInput.focus();
        }
        
        // Escape to blur input
        if (e.key === 'Escape') {
            messageInput.blur();
        }
    });

    // Hover effects for all interactive elements
    const interactiveElements = document.querySelectorAll('.module-header, .node, .step');
    interactiveElements.forEach(el => {
        el.addEventListener('mouseenter', function() {
            this.style.transition = 'all 0.2s ease';
        });
    });
});
