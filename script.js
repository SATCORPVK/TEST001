// GSAP Boot Sequence Animation
window.addEventListener('DOMContentLoaded', () => {
  const bootText = document.querySelector('.boot-text');
  gsap.fromTo(bootText, {opacity:0, y:20}, {opacity:1, y:0, duration:2, ease:'power2.out'});

  // Auto-transition from BOOT SEQUENCE to Operator Overview
  setTimeout(() => {
    document.getElementById('boot-sequence').style.display = 'none';
    document.getElementById('operator-overview').scrollIntoView({behavior:'smooth'});
  }, 3500);

  // Hover Animations for Panels and Cards
  const panels = document.querySelectorAll('.panel, .pipeline-stage, .matrix-item, .operation-card');
  panels.forEach(el => {
    el.addEventListener('mouseenter', () => {
      gsap.to(el, {scale:1.05, duration:0.25, ease:'power1.out'});
    });
    el.addEventListener('mouseleave', () => {
      gsap.to(el, {scale:1, duration:0.25, ease:'power1.out'});
    });
  });

  // Contact Form Submission
  const form = document.getElementById('contact-form');
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    gsap.to(form, {opacity:0, duration:0.5, onComplete:()=>{
      form.innerHTML = '<p>Transmission received. SATCORP will respond promptly.</p>';
      gsap.to(form, {opacity:1, duration:0.5});
    }});
  });

  // Scroll Reveal Animation
  const sections = document.querySelectorAll('.section');
  sections.forEach(section => {
    gsap.from(section, {
      scrollTrigger: {
        trigger: section,
        start: 'top 80%'
      },
      opacity:0,
      y:50,
      duration:1,
      ease:'power2.out'
    });
  });
});
