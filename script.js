/* Base Reset */
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body#body {
  font-family: 'Orbitron', sans-serif;
  color: #fff;
  background-color: #000;
  overflow-x: hidden;
  position: relative;
}

/* Vanta Background */
#vanta-bg {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: -1;
  opacity: 0.2;
}

/* Navbar */
.navbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 2rem 4rem;
  position: sticky;
  top: 0;
  z-index: 100;
  backdrop-filter: blur(5px);
  background: rgba(0, 0, 0, 0.4);
}

.logo {
  height: 40px;
}

.nav-links {
  list-style: none;
  display: flex;
  gap: 2rem;
}
.nav-links a {
  text-decoration: none;
  color: #aaa;
  transition: color 0.3s ease;
}
.nav-links a:hover {
  color: #0ff;
}

/* Hero Section */
.hero {
  text-align: center;
  padding: 8rem 2rem;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.glitch-text {
  font-size: 6rem;
  letter-spacing: 0.3rem;
  position: relative;
  animation: glitch 3s infinite;
}
.glitch-text span {
  color: #f0f;
}
.subtext {
  margin-top: 1rem;
  font-size: 1.2rem;
  color: #ccc;
}
button {
  margin-top: 2rem;
  padding: 1rem 2rem;
  background: transparent;
  border: 2px solid #0ff;
  color: #0ff;
  cursor: pointer;
  font-family: inherit;
  font-weight: bold;
  transition: all 0.3s ease;
}
button:hover {
  background: rgba(0, 255, 255, 0.1);
  transform: translateY(-3px);
}

/* Capabilities Grid */
.capabilities-grid {
  padding: 5rem 2rem;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 2rem;
}
.capability-card {
  background: rgba(20, 20, 20, 0.7);
  border: 1px solid #0ff;
  padding: 1.5rem;
  border-radius: 4px;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}
.capability-card:hover {
  transform: scale(1.03);
  box-shadow: 0 0 10px #0ff;
}

/* Footer */
.footer {
  text-align: center;
  padding: 3rem 2rem;
  color: #666;
  font-size: 0.9rem;
}

/* Animations */
@keyframes glitch {
  0%, 100% { transform: translateX(0); }
  20% { transform: translateX(-2px); }
  40% { transform: translateX(2px); }
  60% { transform: translateX(-1px); }
  80% { transform: translateX(1px); }
}
