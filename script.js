// /script.js
let vantaEffect;

window.addEventListener('load', () => {
    // Vanta background
    if(!vantaEffect) {
        vantaEffect = VANTA.WAVES({
            el: document.body,
            mouseControls: true,
            touchControls: true,
            minHeight: 200.00,
            minWidth: 200.00,
            scale: 1.0,
            scaleMobile: 1.0,
            color: 0x4ac1ff,
            shininess: 50,
            waveHeight: 20,
            waveSpeed: 0.5
        });
    }

    // Boot sequence fade out
    const boot = document.getElementById('boot-sequence');
    setTimeout(() => {
        boot.style.transition = 'opacity 1.5s ease';
        boot.style.opacity = 0;
        setTimeout(() => boot.style.display = 'none', 1500);
    }, 3500);

    // GSAP animations for panels
    gsap.utils.toArray('.panel').forEach(panel => {
        gsap.from(panel, {
            y: 60,
            opacity: 0,
            duration: 1.2,
            scrollTrigger: {
                trigger: panel,
                start: 'top 80%',
            }
        });
    });

    // Contact form submission
    const form = document.getElementById('contact-form');
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        const name = form.name.value;
        const email = form.email.value;
        const message = form.message.value;
        console.log("Transmission:", {name, email, message});
        form.reset();
        alert("Transmission acknowledged.");
    });
});
