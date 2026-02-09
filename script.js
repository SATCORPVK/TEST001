// Boot sequence animation
window.addEventListener('load', () => {
    const boot = document.getElementById('boot-sequence');
    const panels = document.querySelectorAll('.panel');

    setTimeout(() => {
        gsap.to(boot, {opacity: 0, duration: 1, onComplete: () => boot.style.display = 'none'});
        panels.forEach((panel, i) => {
            gsap.to(panel, {opacity:1, y:0, duration:1, delay:i*0.3, onStart: () => panel.classList.remove('hidden')});
        });
    }, 3000);
});

// VANTA background
VANTA.NET({
    el: "body",
    mouseControls: true,
    touchControls: true,
    minHeight: 200.00,
    minWidth: 200.00,
    scale: 1.00,
    scaleMobile: 1.00,
    color: 0x2af0ff,
    backgroundColor: 0x0a0a0a,
    points: 12.00,
    maxDistance: 20.00,
    spacing: 15.00
});

// Contact form submission
const form = document.getElementById('contact-form');
form.addEventListener('submit', e => {
    e.preventDefault();
    const objective = document.getElementById('objective').value;
    const contact = document.getElementById('contact').value;
    const details = document.getElementById('details').value;
    console.log("Operation Transmitted:", {objective, contact, details});
    form.reset();
    alert('Transmission complete. Operator acknowledged.');
});
