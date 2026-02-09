const enterButton = document.getElementById('enter');
const boot = document.getElementById('boot');
const system = document.getElementById('system');

enterButton.addEventListener('click', () => {
  boot.style.opacity = '0';
  boot.style.transition = 'opacity 0.6s ease';
  setTimeout(() => {
    boot.style.display = 'none';
    system.classList.remove('hidden');
  }, 600);
});
