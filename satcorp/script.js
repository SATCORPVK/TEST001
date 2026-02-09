// Initialize Vanta.js Net Effect
document.addEventListener("DOMContentLoaded", function () {
  if (typeof VANTA !== "undefined") {
    VANTA.NET({
      el: "#vanta-bg",
      mouseControls: true,
      touchControls: true,
      gyroControls: false,
      minHeight: 200.0,
      minWidth: 200.0,
      scale: 1.0,
      scaleMobile: 1.0,
      color: 0x00ffff,
      backgroundColor: 0x000000,
      points: 15.0,
      maxDistance: 20.0,
      spacing: 20.0
    });
  }

  // Scroll Animation Triggers
  gsap.from(".glitch-text", {
    duration: 1.5,
    y: -50,
    opacity: 0,
    ease: "power3.out"
  });

  gsap.utils.toArray(".capability-card").forEach(card => {
    gsap.from(card, {
      scrollTrigger: card,
      duration: 0.8,
      y: 50,
      opacity: 0,
      stagger: 0.1
    });
  });
});

// Scroll Helper Function
function scrollToSection(id) {
  document.getElementById(id).scrollIntoView({ behavior: "smooth" });
}
