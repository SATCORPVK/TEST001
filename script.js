// Planet 420 — Cosmic Neon (smoke background)
// Drop this in script.js and load it with: <script src="script.js" defer></script>

(() => {
  // Footer year (safe if element exists)
  const yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // Smoke canvas animation
  const canvas = document.getElementById("smokeCanvas");
  if (!canvas) return;

  const ctx = canvas.getContext("2d", { alpha: true });

  const prefersReduced =
    window.matchMedia &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  const isMobile = /Mobi|Android/i.test(navigator.userAgent);

  const MAX_CLOUDS = prefersReduced ? 0 : (isMobile ? 22 : 40);

  const clouds = [];
  const rand = (a, b) => a + Math.random() * (b - a);

  let w = 0;
  let h = 0;
  let dpr = 1;

  function resize() {
    dpr = Math.min(window.devicePixelRatio || 1, 2);

    // Use rendered size
    w = canvas.clientWidth || window.innerWidth;
    h = canvas.clientHeight || window.innerHeight;

    canvas.width = Math.floor(w * dpr);
    canvas.height = Math.floor(h * dpr);

    // Draw in CSS pixels
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  }

  function makeCloud() {
    const x = rand(-w * 0.1, w * 1.1);
    const y = rand(h * 0.65, h * 1.12);

    return {
      x,
      y,
      r: rand(90, 190),
      vx: rand(-0.18, 0.18),
      vy: rand(-0.42, -0.16),
      a: rand(0.04, 0.09),
      // blue/purple tint
      hue: Math.random() < 0.55 ? 205 : 265,
      life: rand(0.65, 1.2),
    };
  }

  function init() {
    clouds.length = 0;
    for (let i = 0; i < MAX_CLOUDS; i++) clouds.push(makeCloud());
  }

  function tintOverlay() {
    const g = ctx.createLinearGradient(0, 0, w, h);
    g.addColorStop(0, "rgba(31,182,255,0.06)");
    g.addColorStop(0.55, "rgba(124,77,255,0.05)");
    g.addColorStop(1, "rgba(45,255,154,0.02)");
    ctx.fillStyle = g;
    ctx.fillRect(0, 0, w, h);
  }

  function draw() {
    if (prefersReduced) return;

    ctx.clearRect(0, 0, w, h);

    // subtle tint
    tintOverlay();

    for (const c of clouds) {
      c.x += c.vx;
      c.y += c.vy;
      c.life -= 0.0016;

      // respawn if out of bounds or faded
      if (
        c.y < -c.r ||
        c.x < -w * 0.25 ||
        c.x > w * 1.25 ||
        c.life <= 0
      ) {
        const fresh = makeCloud();
        Object.assign(c, fresh, { y: rand(h * 0.85, h * 1.15) });
      }

      const alpha = c.a * Math.max(0, Math.min(1, c.life));

      const rg = ctx.createRadialGradient(c.x, c.y, 0, c.x, c.y, c.r);
      rg.addColorStop(0, `hsla(${c.hue}, 90%, 65%, ${alpha})`);
      rg.addColorStop(0.35, `hsla(${c.hue}, 90%, 60%, ${alpha * 0.55})`);
      rg.addColorStop(1, `hsla(${c.hue}, 80%, 55%, 0)`);

      // "screen" makes smoke glow against dark
      ctx.globalCompositeOperation = "screen";
      ctx.fillStyle = rg;
      ctx.beginPath();
      ctx.arc(c.x, c.y, c.r, 0, Math.PI * 2);
      ctx.fill();

      ctx.globalCompositeOperation = "source-over";
    }

    requestAnimationFrame(draw);
  }

  // Resize handling
  const onResize = () => {
    resize();
    init();
  };

  // If ResizeObserver exists, watch body for layout changes
  if ("ResizeObserver" in window) {
    const ro = new ResizeObserver(onResize);
    ro.observe(document.body);
  } else {
    window.addEventListener("resize", onResize, { passive: true });
  }

  // First run
  resize();
  init();
  draw();
})();
