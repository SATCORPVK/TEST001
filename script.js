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
  const MAX = mobile ? 40 : 85; // MUCH denser

  let w = 0, h = 0, dpr = 1;
  const clouds = [];
  const rand = (a,b)=>a+Math.random()*(b-a);

  function resize(){
    dpr = Math.min(window.devicePixelRatio || 1, 2);
    w = window.innerWidth;
    h = window.innerHeight;
    canvas.width = Math.floor(w * dpr);
    canvas.height = Math.floor(h * dpr);
    ctx.setTransform(dpr,0,0,dpr,0,0);
  }

  function makeCloud(){
    return {
      x: rand(-w*0.2, w*1.2),
      y: rand(h*0.7, h*1.25),
      r: rand(160, 340),              // BIG smoke plumes
      vx: rand(-0.08, 0.08),
      vy: rand(-0.25, -0.08),         // slow rise
      a: rand(0.06, 0.12),             // thicker opacity
      life: rand(0.9, 1.6)
    };
  }

  function init(){
    clouds.length = 0;
    for(let i=0;i<MAX;i++) clouds.push(makeCloud());
  }

  function draw(){
    ctx.clearRect(0,0,w,h);

    for(const c of clouds){
      c.x += c.vx;
      c.y += c.vy;
      c.life -= 0.001;

      if(c.y < -c.r || c.x < -w*0.3 || c.x > w*1.3 || c.life <= 0){
        Object.assign(c, makeCloud());
      }

      const alpha = c.a * Math.max(0, Math.min(1, c.life));

      const g = ctx.createRadialGradient(c.x,c.y,0,c.x,c.y,c.r);
      g.addColorStop(0, `rgba(255,255,255,${alpha})`);
      g.addColorStop(0.25, `rgba(245,245,245,${alpha*0.85})`);
      g.addColorStop(0.55, `rgba(230,230,230,${alpha*0.45})`);
      g.addColorStop(1, "rgba(255,255,255,0)");

      ctx.globalCompositeOperation = "lighter"; // dense layering
      ctx.fillStyle = g;
      ctx.beginPath();
      ctx.arc(c.x,c.y,c.r,0,Math.PI*2);
      ctx.fill();
    }

    ctx.globalCompositeOperation = "source-over";
    requestAnimationFrame(draw);
  }

  resize();
  init();
  draw();

  window.addEventListener("resize", () => {
    resize();
    init();
  }, { passive:true });
});
