// Initialize Vanta.js animated background
VANTA.NET({
  el: "#hero",
  mouseControls: true,
  touchControls: true,
  minHeight: 200.00,
  minWidth: 200.00,
  scale: 1.0,
  scaleMobile: 1.0,
  color: 0x9b5de5,
  backgroundColor: 0x121212,
  points: 12.0,
  maxDistance: 25.0,
  spacing: 18.0
});

// GSAP Scroll Animations
gsap.utils.toArray('.skill').forEach(section => {
  gsap.from(section.querySelectorAll('.card'), {
    scrollTrigger: {
      trigger: section,
      start: "top 80%",
      toggleActions: "play none none none"
    },
    y: 50,
    opacity: 0,
    stagger: 0.2,
    duration: 0.8,
    ease: "power2.out"
  });
});

// Smooth Scroll for HUD Navigation
document.querySelectorAll('.hud nav a').forEach(anchor => {
  anchor.addEventListener('click', e => {
    e.preventDefault();
    const target = document.querySelector(anchor.getAttribute('href'));
    target.scrollIntoView({ behavior: 'smooth' });
  });
});

// Dark/Light Mode Toggle
const darkToggle = document.getElementById('darkModeToggle');
darkToggle.addEventListener('click', () => {
  document.body.classList.toggle('light-mode');
});

// CTA Button Animation
const cta = document.getElementById('cta-explore');
cta.addEventListener('mouseenter', () => {
  gsap.to(cta, { scale: 1.1, duration: 0.3 });
});
cta.addEventListener('mouseleave', () => {
  gsap.to(cta, { scale: 1.0, duration: 0.3 });
});
