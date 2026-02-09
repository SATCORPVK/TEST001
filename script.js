// Boot sequence
const bootSection = document.getElementById('boot-sequence');
const enterBtn = document.getElementById('enter-system');
const sections = [
  'operator-overview',
  'capability-matrix',
  'systems-pipeline',
  'selected-operations',
  'engagement-protocol',
  'contact-interface'
].map(id => document.getElementById(id));

enterBtn.addEventListener('click', () => {
  bootSection.classList.add('hidden');
  sections[0].classList.remove('hidden');
  gsap.from(sections[0], {opacity: 0, y: 50, duration: 1});
});

// Scroll reveal
window.addEventListener('scroll', () => {
  sections.forEach(section => {
    const rect = section.getBoundingClientRect();
    if(rect.top < window.innerHeight - 100 && section.classList.contains('hidden')) {
      section.classList.remove('hidden');
      gsap.from(section, {opacity: 0, y: 50, duration: 1});
    }
  });
});

// Vanta background for boot
VANTA.WAVES({
  el: "#boot-sequence",
  mouseControls: true,
  touchControls: true,
  minHeight: 200.00,
  minWidth: 200.00,
  scale: 1.0,
  scaleMobile: 1.0,
  color: 0x00bfff,
  shininess: 50,
  waveHeight: 15,
  waveSpeed: 1.0
});

// Contact form submit
const form = document.getElementById('contact-form');
form.addEventListener('submit', e => {
  e.preventDefault();
  alert('Transmission received. Operator will respond.');
  form.reset();
});
