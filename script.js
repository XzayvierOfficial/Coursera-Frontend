'use strict';

const body = document.body;
const menuButton = document.querySelector('#menu-toggle');
const navLinks = document.querySelector('#nav-links');
const themeButton = document.querySelector('#theme-toggle');
const filterButtons = document.querySelectorAll('[data-filter]');
const projectCards = document.querySelectorAll('[data-category]');
const profileButton = document.querySelector('#copy-profile');
const statusText = document.querySelector('#copy-status');
const yearNode = document.querySelector('#year');

if (menuButton && navLinks) {
  menuButton.addEventListener('click', () => {
    const isOpen = navLinks.classList.toggle('open');
    menuButton.setAttribute('aria-expanded', String(isOpen));
    menuButton.setAttribute('aria-label', isOpen ? 'Close navigation' : 'Open navigation');
  });

  navLinks.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('open');
      menuButton.setAttribute('aria-expanded', 'false');
      menuButton.setAttribute('aria-label', 'Open navigation');
    });
  });
}

function applyTheme(light) {
  if (!body) return;
  body.classList.toggle('light', light);
  if (themeButton) {
    themeButton.textContent = light ? '☾' : '☀';
    themeButton.setAttribute('aria-label', light ? 'Switch to dark theme' : 'Switch to light theme');
  }
}

if (themeButton) {
  let storedTheme = null;
  try {
    storedTheme = localStorage.getItem('portfolio-theme');
  } catch (_) {
    // Gracefully ignore storage failures.
  }

  applyTheme(storedTheme === 'light');
  themeButton.addEventListener('click', () => {
    const light = !body.classList.contains('light');
    applyTheme(light);
    try {
      localStorage.setItem('portfolio-theme', light ? 'light' : 'dark');
    } catch (_) {
      // Optional persistence is not required.
    }
  });
}

if (filterButtons.length && projectCards.length) {
  filterButtons.forEach((button) => {
    button.addEventListener('click', () => {
      const selected = button.dataset.filter;

      filterButtons.forEach((item) => {
        const active = item === button;
        item.classList.toggle('active', active);
        item.setAttribute('aria-pressed', String(active));
      });

      projectCards.forEach((card) => {
        const matches = selected === 'all' || card.dataset.category === selected;
        card.hidden = !matches;
      });
    });
  });
}

if (profileButton && statusText) {
  const profileUrl = 'https://github.com/XzayvierOfficial';
  profileButton.addEventListener('click', async () => {
    try {
      await navigator.clipboard.writeText(profileUrl);
      statusText.textContent = 'GitHub link copied!';
    } catch (_) {
      statusText.textContent = 'Copy this link: ' + profileUrl;
    }
  });
}

if (yearNode) {
  yearNode.textContent = String(new Date().getFullYear());
}
