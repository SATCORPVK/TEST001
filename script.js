/*-----------------------------------------------
  1. Theme toggle + persistence
-----------------------------------------------*/
document.addEventListener('DOMContentLoaded', () => {
  const body = document.body;
  const darkToggle = document.getElementById('dark-mode-toggle');

  const applyTheme = () => {
    const saved = localStorage.getItem('theme');
    if (saved === 'light') {
      body.classList.add('light-mode');
    } else if (saved === 'dark') {
      body.classList.remove('light-mode');
    } else { // fallback to system
      if (window.matchMedia('(prefers-color-scheme: light)').matches) {
        body.classList.add('light-mode');
      }
    }
    darkToggle.checked = body.classList.contains('light-mode');
  };

  darkToggle.addEventListener('change', () => {
    if (darkToggle.checked) {
      body.classList.add('light-mode');
      localStorage.setItem('theme', 'light');
    } else {
      body.classList.remove('light-mode');
      localStorage.setItem('theme', 'dark');
    }
  });

  applyTheme();

  /*-----------------------------------------------
    2. Loader hide on full window load
  -----------------------------------------------*/
  const loader = document.getElementById('loader');
  window.addEventListener('load', () => {
    loader.style.transition = 'opacity .5s';
    loader.style.opacity = 0;
    setTimeout(() => loader.style.display = 'none', 500);
  });

  /*-----------------------------------------------
    3. Vanta background
  -----------------------------------------------*/
  VANTA.NET({
    el: "#vanta-bg",
    color: 0x00ffff,
    background: 0x0c0c0c,
    points: 12,
    maxDistance: 15,
    spacing: 20
  });

  /*-----------------------------------------------
    4. GSAP scroll trigger
  -----------------------------------------------*/
  gsap.registerPlugin(ScrollTrigger);

  /*-----------------------------------------------
    5. Hero title animation
  -----------------------------------------------*/
  const heroTitle = document.getElementById('hero-title');
  const heroText = 'SATCORP';
  heroText.split('').forEach(char => {
    const span = document.createElement('span');
    span.textContent = char;
    span.style.opacity = 0;
    span.style.display = 'inline-block';
    heroTitle.appendChild(span);
  });

  gsap.fromTo(
    heroTitle.querySelectorAll('span'),
    { y: 50, opacity: 0 },
    { y: 0, opacity: 1, duration: 0.6, ease: 'power2.out', stagger: 0.07, delay: 0.5 }
  );

  /*-----------------------------------------------
    6. Skill deck data
  -----------------------------------------------*/
  const skillDeck = [
    {
      title: 'Core Identity / Operator Value',
      short: 'Foundational principles that define our systems.',
      details: 'Every project starts with a clear operator vision – human‑centre logic that drives performance, sustainability, and security.'
    },
    {
      title: 'Brand & Visual Systems',
      short: 'Modular, scalable branding architecture.',
      details: 'From a core palette to evolving UI kits, we build brand language that evolves while preserving root identity.'
    },
    {
      title: 'Web/UI Systems',
      short: 'High‑fidelity, responsive digital platforms.',
      details: 'We turn veneers into work‑flows with accelerated release cycles, accessibility, and stand‑alone component libraries.'
    },
    {
      title: 'Systems Architecture',
      short: 'Robust, modular infrastructure.',
      details: 'Micro‑service patterns, API gateways, and container orchestration provide the scaffolding for red‑shift‑grade performance.'
    },
    {
      title: 'Streaming/Broadcast Overlays',
      short: 'Interactive, data‑driven overlays.',
      details: 'Live content is enriched by real‑time analytics, context‑aware prompts, and visual narratives that keep the viewer glued.'
    },
    {
      title: 'AI‑Enhanced Workflows',
      short: 'Intelligent automation for creative teams.',
      details: 'From auto‑tagging to generative designers, we democratise AI to accelerate ideation and reduce friction.'
    },
    {
      title: 'Game‑Dev / World‑Building Design',
      short: 'Procedural content for immersive worlds.',
      details: 'We craft multi‑layer assets that loop, adapt, and scale while remaining under-arc‑directed logic.'
    },
    {
      title: 'Client Experience & Concierge Skills',
      short: 'Premium, personalised service.',
      details: 'Hands‑on support, dedicated project leads and knowledge transfer becomes a concierge experience.'
    },
    {
      title: 'Platforms/Marketplaces',
      short: 'Integrated distribution networks.',
      details: 'Released assets go on AWS, Content‑delivery, & SaaS marketplaces, enabling a unified monetisation channel.'
    },
    {
      title: 'Documentation/Knowledge Systems',
      short: 'Living documentation hub.',
      details: 'Central knowledge base, SOPs, and version control keeps teams aligned across time zones.'
    },
    {
      title: 'Asset Packaging & Delivery',
      short: 'Meticulous asset pipelines.',
      details: 'From build, lint, asset hashing to CDN deployment – 100‑percent fidelity across the stack.'
    },
    {
      title: 'Ideal Clients',
      short: 'Strategic, mission‑critical partners.',
      details: 'We partner with enterprises that demand scale, excellence, and a systems‑first mindset above aesthetics.'
    }
  ];

  /*-----------------------------------------------
    7. Render skill deck
  -----------------------------------------------*/
  const skillsSection = document.getElementById('skills');

  skillDeck.forEach((skill, i) => {
    const card = document.createElement('div');
    card.className = 'skill-card';
    card.dataset.index = i;

    const title = document.createElement('h3');
    title.className = 'skill-title';
    title.textContent = skill.title;

    const short = document.createElement('p');
    short.className = 'skill-short';
    short.textContent = skill.short;

    const detail = document.createElement('div');
    detail.className = 'skill-detail';
    detail.textContent = skill.details;

    card.appendChild(title);
    card.appendChild(short);
    card.appendChild(detail);
    skillsSection.appendChild(card);

    /* Scroll‑trigger animation */
    gsap.fromTo(card,
      { autoAlpha: 0, y: 60 },
      {
        autoAlpha: 1,
        y: 0,
        duration: 0.7,
        ease: 'power1.out',
        scrollTrigger: {
          trigger: card,
          start: 'top 80%',
          toggleActions: 'play none none none'
        }
      }
    );

    /* Click to modal */
    card.addEventListener('click', () => openModal(skill));
  });

  /*-----------------------------------------------
    8. Modal logic
  -----------------------------------------------*/
  const modal = document.getElementById('modal');
  const modalTitle = document.getElementById('modal-title');
  const modalBody = document.getElementById('modal-body');
  const modalClose = document.getElementById('modal-close');

  const openModal = (skill) => {
    modalTitle.textContent = skill.title;
    modalBody.textContent = skill.details;
    modal.style.display = 'flex';
    gsap.fromTo(modal,
      { scale: .8, autoAlpha: 0 },
      { scale: 1, autoAlpha: 1, duration: 0.5, ease: 'back.out(1.7)' }
    );
  };

  const closeModal = () => {
    gsap.to(modal,
      { scale: .8, autoAlpha: 0, duration: .3, ease: 'back.in(1.7)',
        onComplete: () => { modal.style.display = 'none'; } }
    );
  };

  modalClose.addEventListener('click', closeModal);
  modal.addEventListener('click', e => {
    if (e.target === modal) closeModal();
  });

  /*-----------------------------------------------
    9. Navigation smooth scroll
  -----------------------------------------------*/
  document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', e => {
      e.preventDefault();
      const target = document.querySelector(link.getAttribute('href'));
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  });

  /*-----------------------------------------------
    10. Micro‑hover visual on cards
  -----------------------------------------------*/
  document.querySelectorAll('.skill-card').forEach(card => {
    const originalBg = getComputedStyle(card).backgroundColor;
    card.addEventListener('mouseenter', () => {
      gsap.to(card, { backgroundColor: '#222', duration: 0.2, ease: 'power1.out' });
    });
    card.addEventListener('mouseleave', () => {
      gsap.to(card, { backgroundColor: originalBg, duration: 0.2, ease: 'power1.in' });
    });
  });
});
