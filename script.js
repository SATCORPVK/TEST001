document.addEventListener("DOMContentLoaded", () => {
  const yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  const canvas = document.getElementById("smokeCanvas");
  if (!canvas) return;

  const ctx = canvas.getContext("2d", { alpha: true });

  const prefersReduced =
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (prefersReduced) return;

  const mobile = /Mobi|Android/i.test(navigator.userAgent);
  const MAX = mobile ? 55 : 110; // dense, but stable

  let w = 0, h = 0, dpr = 1;
  const rand = (a,b)=>a+Math.random()*(b-a);

  // Multi-layer “puffs” = smoke texture
  const puffs = [];

  function resize(){
    dpr = Math.min(window.devicePixelRatio || 1, 2);
    w = window.innerWidth;
    h = window.innerHeight;

    canvas.width = Math.floor(w * dpr);
    canvas.height = Math.floor(h * dpr);
    ctx.setTransform(dpr,0,0,dpr,0,0);
  }

  function makePuff(){
    const big = Math.random() < 0.35;
    return {
      x: rand(-w*0.2, w*1.2),
      y: rand(h*0.65, h*1.25),
      r: big ? rand(220, 420) : rand(140, 300),
      vx: rand(-0.10, 0.10),
      vy: rand(-0.34, -0.10),
      a: big ? rand(0.06, 0.11) : rand(0.05, 0.10),
      life: rand(0.9, 1.6),
      wobble: rand(0, Math.PI*2),
      wobbleSpd: rand(0.003, 0.009)
    };
  }

  function init(){
    puffs.length = 0;
    for(let i=0;i<MAX;i++) puffs.push(makePuff());
  }

  function draw(){
    // Slight trail = smoother smoke
    ctx.globalCompositeOperation = "source-over";
    ctx.fillStyle = "rgba(0,0,0,0.08)";
    ctx.fillRect(0,0,w,h);

    for(const p of puffs){
      p.wobble += p.wobbleSpd;
      p.x += p.vx + Math.sin(p.wobble) * 0.08;
      p.y += p.vy + Math.cos(p.wobble*0.9) * 0.06;
      p.life -= 0.0012;

      if(p.y < -p.r || p.x < -w*0.35 || p.x > w*1.35 || p.life <= 0){
        Object.assign(p, makePuff());
      }

      const alpha = p.a * Math.max(0, Math.min(1, p.life));

      // White smoke gradient
      const g = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.r);
      g.addColorStop(0, `rgba(255,255,255,${alpha})`);
      g.addColorStop(0.35, `rgba(245,245,245,${alpha*0.75})`);
      g.addColorStop(0.7, `rgba(220,220,220,${alpha*0.28})`);
      g.addColorStop(1, "rgba(255,255,255,0)");

      // Soft additive layering
      ctx.globalCompositeOperation = "lighter";
      ctx.fillStyle = g;
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI*2);
      ctx.fill();
    }

    requestAnimationFrame(draw);
  }

  resize();
  init();
  // Start with a clear frame
  ctx.clearRect(0,0,w,h);
  draw();

  window.addEventListener("resize", () => {
    resize();
    init();
    ctx.clearRect(0,0,w,h);
  }, { passive:true });
});
