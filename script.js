document.addEventListener("DOMContentLoaded", () => {
  // Footer year
  const yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // Note:
  // Background smoke is now SVG turbulence (in index.html + styles.css),
  // so we intentionally removed the old canvas smoke engine.
});
