/* script.js */
document.addEventListener('DOMContentLoaded', () => {

  /*=== GSAP & ScrollTrigger ===*/
  if (typeof gsap !== 'undefined' && typeof gsap.ScrollTrigger !== 'undefined') {
    gsap.registerPlugin(gsap.ScrollTrigger);

    /* hero text */
    gsap.from('#hero h1', { y:-50, opacity:0, duration:1.5, ease:'power3.out' });
    gsap.from('#hero p',  { y:30, opacity:0, duration:1.2, ease:'power3.out', delay:0.4 });

    /* section headings */
    document.querySelectorAll('.skill-section h2').forEach(el => {
      gsap.from(el, {
        y:50,
        opacity:0,
        duration:1,
        scrollTrigger: { trigger:el, start:'top 80%', toggleActions:'play none none none' }
      });
    });

    /* cards */
    document.querySelectorAll('.skill-card').forEach((el,i) => {
      gsap.from(el, {
        opacity:0,
        y:30,
        duration:0.8,
        delay:i*0.1,
        scrollTrigger:{trigger:el, start:'top 90%', toggleActions:'play none none none'}
      });
    });
  }

  /*=== Vanta.js Hero background ===*/
  if (typeof VANTA !== 'undefined' && VANTA.NET) {
    VANTA.NET({
      el:'#hero',
      mouseControls:true,
      touchControls:true,
      minHeight:500,
      minWidth:1000,
      scale:1,
      scaleMobile:1,
      color:0xffffff,
      backgroundColor:0x111111,
      points:8,
      maxDistance:20
    });
  }

  /*=== Dark mode toggle ===*/
  const darkToggle = document.getElementById('dark-mode-toggle');
  darkToggle.addEventListener('click', () => document.documentElement.classList.toggle('dark-mode'));

  /*=== Custom cursor ===*/
  const cursor = document.getElementById('cursor');
  let curX=0, curY=0, mouseX=0, mouseY=0;
  document.addEventListener('mousemove', e => { mouseX=e.clientX; mouseY=e.clientY; cursor.style.opacity=1; });
  const animateCursor = () => {
    curX += (mouseX - curX) * 0.15;
    curY += (mouseY - curY) * 0.15;
    cursor.style.transform = `translate3d(${curX}px,${curY}px,0)`;
    requestAnimationFrame(animateCursor);
  };
  animateCursor();

  /*=== Modal logic ===*/
  const modal = document.getElementById('modal');
  const modalTitle = document.getElementById('modal-title');
  const modalDesc = document.getElementById('modal-desc');
  const modalImg  = document.getElementById('modal-img');
  const closeBtn = modal.querySelector('.close-btn');

  document.querySelectorAll('.skill-card').forEach(card => {
    card.addEventListener('click', () => {
      modalTitle.textContent  = card.dataset.title;
      modalDesc.textContent   = card.dataset.desc;
      modalImg.src           = card.dataset.img;
      modal.style.display    = 'flex';
      modal.setAttribute('aria-hidden','false');
    });
  });

  closeBtn.addEventListener('click', () => modal.style.display='none');
  modal.addEventListener('click', ev => ev.target===modal && modal.style.display='none');

  /*=== Scroll progress ===*/
  const scrollInner = document.getElementById('scroll-indicator-inner');
  window.addEventListener('scroll', () => {
    const scrollTop = window.scrollY;
    const fullHeight = document.body.scrollHeight - window.innerHeight;
    const pct = (scrollTop / fullHeight) * 100;
    scrollInner.style.width = pct + '%';
  });

  /*=== Smooth scroll for nav ===*/
  document.querySelectorAll('#main-nav a').forEach(link => {
    link.addEventListener('click', e => {
      e.preventDefault();
      const target = document.querySelector(link.getAttribute('href'));
      target.scrollIntoView({behavior:'smooth', block:'start'});
    });
  });

});
