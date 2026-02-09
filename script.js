/* ==========================================================
   SATCORP – interactive front‑end logic
   ========================================================== */

/* -----------------------------------------------------------------
   1️⃣  Global constants & helpers
   ----------------------------------------------------------------- */
const $ = selector => document.querySelector(selector);
const $$ = selector => Array.from(document.querySelectorAll(selector));

/* Sound utilities – tiny UI audio cues */
const sounds = {
  click: new Audio('assets/sounds/click.mp3'),
  hover: new Audio('assets/sounds/hover.mp3')
};
/* Keep sounds short & low‑volume */
sounds.click.volume = 0.2;
sounds.hover.volume = 0.15;

/* -----------------------------------------------------------------
   2️⃣  Loader – hide when everything is ready
   ----------------------------------------------------------------- */
window.addEventListener('load', () => {
  // Small artificial delay adds polish (remove if you don’t want it)
  setTimeout(() => {
    $('#loader').classList.add('hidden');
  }, 800);
});

/* -----------------------------------------------------------------
   3️⃣  Custom cursor logic
   ----------------------------------------------------------------- */
const cursor = $('#custom-cursor');

document.addEventListener('mousemove', e => {
  cursor.style.left = `${e.clientX}px`;
  cursor.style.top = `${e.clientY}px`;
});

/* Enlarge cursor on hoverable elements */
const interactiveEls = ['a', 'button', '.skill-card'];
interactiveEls.forEach(sel => {
  $$(sel).forEach(el => {
    el.addEventListener('mouseenter', () => {
      cursor.classList.add('grow');
      sounds.hover.currentTime = 0;
      sounds.hover.play();
    });
    el.addEventListener('mouseleave', () => cursor.classList.remove('grow'));
  });
});

/* -----------------------------------------------------------------
   4️⃣  Dark / Light theme toggle
   ----------------------------------------------------------------- */
const themeToggle = $('#theme-toggle');
themeToggle.addEventListener('click', () => {
  document.documentElement.classList.toggle('dark');
  // swap icons
  const icon = themeToggle.querySelector('i');
  if (document.documentElement.classList.contains('dark')) {
    icon.className = 'fas fa-sun';
  } else {
    icon.className = 'fas fa-moon';
  }
});

/* -----------------------------------------------------------------
   5️⃣  Vanta.js – ambient background for the hero
   ----------------------------------------------------------------- */
let vantaEffect;
function initVanta() {
  if (typeof VANTA === 'undefined') return;
  vantaEffect = VANTA.CLOUDS({
    el: '#hero',
    mouseControls: true,
    touchControls: true,
    minHeight: 200.00,
    minWidth: 200.00,
    skyColor: 0x0a0a0a,
    cloudColor: 0x333333,
    cloudShadowColor: 0x111111,
    sunColor: 0x00ffae,
    sunGlareColor: 0x00ffae,
    speed: 0.8,
    backgroundAlpha: 0.0
  });
}
initVanta();

/* -----------------------------------------------------------------
   6️⃣  Skill Deck data – edit / extend as needed
   ----------------------------------------------------------------- */
const skillDeck = [
  {
    title: 'Core Identity / Operator Value',
    icon: 'fa-solid fa-bolt',
    brief: 'Precision branding, messaging architecture, voice‑style systems.',
    details: `
      <strong>Deliverables:</strong> Brand charter, tone‑of‑voice matrix, UI‑kit conventions.<br>
      <strong>Tools:</strong> Figma, Notion, Adobe Illustrator.<br>
      <strong>Why it matters:</strong> The operating system of perception – every pixel and word obeys it.
    `
  },
  {
    title: 'Brand & Visual Systems',
    icon: 'fa-solid fa-palette',
    brief: 'Scalable visual identity, icon libraries, animation vocabularies.',
    details: `
      <strong>Deliverables:</strong> Full SVG asset pipeline, motion‑graphic templates, style‑guide portal.<br>
      <strong>Tools:</strong> After Effects, Lottie, Sketch.<br>
      <strong>Outcome:</strong> Consistency at 10 × speed across campaigns.
    `
  },
  {
    title: 'Web / UI Systems',
    icon: 'fa-solid fa-code',
    brief: 'Component‑first architecture, design‑system driven dev.',
    details: `
      <strong>Deliverables:</strong> React component library, Storybook docs, CI/CD pipeline.<br>
      <strong>Tools:</strong> React, Tailwind, Vite, GitHub Actions.<br>
      <strong>Result:</strong> Deployable UI in under 1 hour.
    `
  },
  {
    title: 'Systems Architecture',
    icon: 'fa-solid fa-network-wired',
    brief: 'Data flows, API orchestration, fault‑tolerant design.',
    details: `
      <strong>Deliverables:</strong> Architecture diagrams, API spec (OpenAPI), Terraform infra code.<br>
      <strong>Tools:</strong> AWS CDK, GraphQL, Docker, Kubernetes.<br>
      <strong>Impact:</strong> 99.99 % uptime guarantees.
    `
  },
  {
    title: 'Streaming / Broadcast Overlays',
    icon: 'fa-solid fa-video',
    brief: 'Live‑production graphics, OBS plugins, interactive widgets.',
    details: `
      <strong>Deliverables:</strong> 4K‑ready overlay packs, real‑time data sync, chat integration.<br>
      <strong>Tools:</strong> OBS Studio, Streamlabs, WebSockets.<br>
      <strong>Benefit:</strong> Viewer‑engagement lift up to 250 %.
    `
  },
  {
    title: 'AI‑Enhanced Workflows',
    icon: 'fa-solid fa-robot',
    brief: 'Prompt‑engineered pipelines, LLM‑infused automation.',
    details: `
      <strong>Deliverables:</strong> Custom GPT‑4 prompts, Zapier + OpenAI automation, AI‑generated copy.<br>
      <strong>Tools:</strong> OpenAI API, LangChain, Make.<br>
      <strong>Edge:</strong> 10× reduction in manual iteration.
    `
  },
  {
    title: 'Game‑Dev / World‑Building Design',
    icon: 'fa-solid fa-dice-d20',
    brief: 'Lore crafting, asset generation, systems design.',
    details: `
      <strong>Deliverables:</strong> Lore bible, modular environment packs, Unity scripts.<br>
      <strong>Tools:</strong> Unity, Blender, Substance Painter.<br>
      <strong>Result:</strong> Immersive worlds built in weeks, not months.
    `
  },
  {
    title: 'Client Experience & Concierge Skills',
    icon: 'fa-solid fa-user-tie',
    brief: “White‑glove” onboarding, SLA monitoring, proactive support.',
    details: `
      <strong>Deliverables:</strong> Dedicated portal, 24/7 ticketing, KPI dashboards.<br>
      <strong>Tools:</strong> Zendesk, Intercom, HubSpot.<br>
      <strong>Outcome:</strong> NPS > 95 % across all engagements.
    `
  },
  {
    title: 'Platforms / Marketplaces',
    icon: 'fa-solid fa-store',
    brief: 'Shopify, Stripe, PayPal, NFT marketplace integration.',
    details: `
      <strong>Deliverables:</strong> End‑to‑end checkout flow, smart‑contract deployment, analytics.<br>
      <strong>Tools:</strong> Shopify Hydrogen, Web3.js, Stripe Elements.<br>
      <strong>Impact:</strong> Revenue capture uplift.
    `
  },
  {
    title: 'Documentation / Knowledge Systems',
    icon: 'fa-solid fa-book',
    brief: 'Living docs, knowledge graphs, searchable SOPs.',
    details: `
      <strong>Deliverables:</strong> Confluence knowledge base, GraphQL API for docs, auto‑generated PDFs.<br>
      <strong>Tools:</strong> Notion, Docusaurus, Algolia.<br>
      <strong>Benefit:</strong> 80 % time‑to‑knowledge reduction.
    `
  },
  {
    title: 'Asset Packaging & Delivery',
    icon: 'fa-solid fa-box',
    brief: Automated pipelines for versioned assets, CDN deployment.',
    details: `
      <strong>Deliverables:</strong> Git LFS + S3 sync, checksum verification, global CDN edge.<br>
      <strong>Tools:</strong> GitHub Actions, S3, CloudFront, Azure Blob.<br>
      <strong>Result:</strong> Zero‑down assets with instant global reach.
    `
  },
  {
    title: 'Ideal Clients',
    icon: 'fa-solid fa-handshake',
    brief: “High‑growth tech, entertainment, NFT & Metaverse, premium brands.”,
    details: `
      <strong>Characteristics:</strong> Data‑driven, brand‑centric, seeking systematic scale.<br>
      <strong>Fit:</strong> Product‑first, budget ≥ $50k, partnership mindset.<br>
      <strong>Our promise:</strong> Turn complexity into a controllable, repeatable system.
    `
  }
];

/* -----------------------------------------------------------------
   7️⃣  Render the skill‑deck cards
   ----------------------------------------------------------------- */
function renderSkillCards() {
  const container = $('.skill-grid');

  skillDeck.forEach((skill, idx) => {
    const card = document.createElement('article');
    card.className = 'skill-card';
    card.dataset.idx = idx; // for later reference

    // Card inner structure
    card.innerHTML = `
      <div class="icon"><i class="${skill.icon}"></i></div>
      <h3>${skill.title}</h3>
      <p>${skill.brief}</p>
    `;

    // Click opens modal with details
    card.addEventListener('click', () => openModal(skill));

    container.appendChild(card);
  });
}

/* -----------------------------------------------------------------
   8️⃣  GSAP – scroll‑trigger animation for all cards
   ----------------------------------------------------------------- */
function initScrollAnimations() {
  gsap.registerPlugin(ScrollTrigger);
  const cards = $$('.skill-card');

  cards.forEach((card, i) => {
    gsap.fromTo(card,
      { y: 30, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.7,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: card,
          start: 'top 85%',
          // once per card
          toggleActions: 'play none none none'
        },
        delay: i * 0.08 // subtle stagger
      });
  });
}

/* -----------------------------------------------------------------
   9️⃣  Modal handling (deep dive on a skill)
   ----------------------------------------------------------------- */
function openModal(skill) {
  // Prevent repeated clicks before modal ready
  if ($('.modal')?.classList.contains('active')) return;

  // Play UI click sound
  sounds.click.currentTime = 0;
  sounds.click.play();

  // Build modal DOM
  const overlay = document.createElement('div');
  overlay.className = 'modal active';

  overlay.innerHTML = `
    <div class="modal-content">
      <button class="close" aria-label="Close modal"><i class="fas fa-times"></i></button>
      <div class="icon"><i class="${skill.icon}"></i></div>
      <h2>${skill.title}</h2>
      <p>${skill.brief}</p>
      <div class="details">${skill.details}</div>
    </div>
  `;

  // Close logic
  overlay.querySelector('.close').addEventListener('click', () => {
    overlay.classList.remove('active');
    // Allow CSS transition to finish, then remove element
    setTimeout(() => overlay.remove(), 300);
  });
  // Click outside content also closes
  overlay.addEventListener('click', e => {
    if (e.target === overlay) {
      overlay.querySelector('.close').click();
    }
  });

  document.body.appendChild(overlay);
}

/* -----------------------------------------------------------------
   10️⃣  Footer year auto‑update
   ----------------------------------------------------------------- */
$('#year').textContent = new Date().getFullYear();

/* -----------------------------------------------------------------
   11️⃣  Initialise everything once DOM is ready
   ----------------------------------------------------------------- */
document.addEventListener('DOMContentLoaded', () => {
  renderSkillCards();
  initScrollAnimations();
});
