document.addEventListener('DOMContentLoaded', function() {
    // Vanta Background
    if (typeof VANTA !== 'undefined') {
        VANTA.NET({
            el: "#vanta-bg",
            mouseControls: true,
            touchControls: true,
            gyroControls: false,
            minHeight: 200.00,
            minWidth: 200.00,
            scale: 1.00,
            scaleMobile: 1.00,
            color: 0x7c3aed,
            backgroundColor: 0x0b0d12,
            points: 10.00,
            maxDistance: 20.00,
            spacing: 15.00
        });
    }

    // Theme Toggle
    const themeToggle = document.getElementById('theme-toggle');
    const currentTheme = localStorage.getItem('theme') || 'dark';
    
    document.documentElement.setAttribute('data-theme', currentTheme);
    themeToggle.textContent = currentTheme === 'dark' ? '☀︎' : '☾';
    
    themeToggle.addEventListener('click', function() {
        const newTheme = document.documentElement.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
        document.documentElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        this.textContent = newTheme === 'dark' ? '☀︎' : '☾';
    });

    // Custom Cursor
    const cursor = document.getElementById('custom-cursor');
    if (cursor) {
        document.addEventListener('mousemove', (e) => {
            cursor.style.left = e.clientX + 'px';
            cursor.style.top = e.clientY + 'px';
        });
        
        document.addEventListener('mouseenter', (e) => {
            if (e.target.closest('a, button')) {
                cursor.style.transform = 'translate(-50%, -50%) scale(1.5)';
                cursor.style.borderColor = '#2DD4FF';
            }
        });
        
        document.addEventListener('mouseleave', (e) => {
            if (e.target.closest('a, button')) {
                cursor.style.transform = 'translate(-50%, -50%) scale(1)';
                cursor.style.borderColor = '#7C3AED';
            }
        });
    }

    // Smooth Scrolling
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // GSAP Animations
    if (typeof gsap !== 'undefined') {
        // Hero animations
        gsap.from('.hero h1', {
            opacity: 0,
            y: 30,
            duration: 1,
            delay: 0.5
        });
        
        gsap.from('.hero p', {
            opacity: 0,
            y: 20,
            duration: 1,
            delay: 0.8
        });
        
        gsap.from('.cta-button', {
            opacity: 0,
            y: 20,
            duration: 1,
            delay: 1.1
        });

        // Skill cards fade in
        gsap.utils.toArray('.skill-card').forEach((card, i) => {
            gsap.from(card, {
                opacity: 0,
                y: 30,
                duration: 0.8,
                scrollTrigger: {
                    trigger: card,
                    start: 'top 80%'
                },
                delay: i * 0.1
            });
        });
    }

    // Form Submission
    const form = document.getElementById('contact-form');
    if (form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // In a real implementation, you would send the form data
            // For now, just show a success message
            const formData = new FormData(form);
            console.log('Form submitted:', Object.fromEntries(formData));
            
            // Reset form
            form.reset();
            
            // Show success message (you could create a proper notification)
            alert('Thank you for your inquiry! We will respond shortly.');
        });
    }

    // Skill Card Interaction
    document.querySelectorAll('.view-detail').forEach(button => {
        button.addEventListener('click', function() {
            const skill = this.closest('.skill-card').dataset.skill;
            console.log(`Viewing details for: ${skill}`);
            // In a full implementation, this would open a modal
            // with detailed information about the skill
        });
    });
});
