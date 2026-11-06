'use strict';
const menuButton = document.querySelector('#menu-toggle');
const navLinks = document.querySelector('#nav-links');
const themeButton = document.querySelector('#theme-toggle');
const filterButtons = document.querySelectorAll('[data-filter]');
const projectCards = document.querySelectorAll('[data-category]');

menuButton.addEventListener('click', () => {
  const open = navLinks.classList.toggle('open');
  menuButton.setAttribute('aria-expanded', String(open));
  menuButton.setAttribute('aria-label', open ? 'Close navigation' : 'Open navigation');
});
navLinks.querySelectorAll('a').forEach(link => link.addEventListener('click', () => {
  navLinks.classList.remove('open');
  menuButton.setAttribute('aria-expanded', 'false');
  menuButton.setAttribute('aria-label', 'Open navigation');
}));

function applyTheme(light) {
  document.body.classList.toggle('light', light);
  themeButton.textContent = light ? '☾' : '☀';
  themeButton.setAttribute('aria-label', light ? 'Switch to dark theme' : 'Switch to light theme');
}
let storedTheme = null;
try { storedTheme = localStorage.getItem('portfolio-theme'); } catch (_) { /* works with storage disabled */ }
applyTheme(storedTheme === 'light');
themeButton.addEventListener('click', () => {
  const light = !document.body.classList.contains('light');
  applyTheme(light);
  try { localStorage.setItem('portfolio-theme', light ? 'light' : 'dark'); } catch (_) { /* optional persistence */ }
});

filterButtons.forEach(button => button.addEventListener('click', () => {
  const selected = button.dataset.filter;
  filterButtons.forEach(item => {
    const active = item === button;
    item.classList.toggle('active', active);
    item.setAttribute('aria-pressed', String(active));
  });
  projectCards.forEach(card => { card.hidden = selected !== 'all' && card.dataset.category !== selected; });
}));

const profileUrl = 'https://github.com/XzayvierOfficial';
document.querySelector('#copy-profile').addEventListener('click', async () => {
  const status = document.querySelector('#copy-status');
  try {
    await navigator.clipboard.writeText(profileUrl);
    status.textContent = 'GitHub link copied!';
  } catch (_) {
    status.textContent = 'Copy this link: ' + profileUrl;
  }
});
document.querySelector('#year').textContent = String(new Date().getFullYear());
