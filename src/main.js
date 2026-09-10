/**
 * AOBA Entry Point
 */

import './styles/main.css';
import { initAmbientCanvas } from './scripts/particles.js';
import { AobaStore } from './scripts/store.js';
import { initScrollEngine } from './scripts/scroll-engine.js';

window.addEventListener('DOMContentLoaded', () => {
  // 1. Initialize canvas particles
  initAmbientCanvas('ambient-canvas');

  // 2. Initialize Store (Cart, Quick View, Audio)
  const store = new AobaStore();
  window.aobaStore = store;

  // 3. Initialize GSAP + Lenis Scroll Animation Engine
  initScrollEngine();

  // 4. Mobile Menu toggle
  const mobileBtn = document.getElementById('mobile-menu-btn');
  const navLinks = document.querySelector('.nav-links');
  if (mobileBtn && navLinks) {
    mobileBtn.addEventListener('click', () => {
      const isOpen = navLinks.classList.contains('mobile-active');
      if (isOpen) {
        navLinks.classList.remove('mobile-active');
        navLinks.removeAttribute('style');
      } else {
        navLinks.classList.add('mobile-active');
        navLinks.style.cssText = `
          display: flex;
          position: fixed;
          top: 70px;
          left: 20px;
          right: 20px;
          flex-direction: column;
          gap: 20px;
          background: #0d2217;
          border: 1px solid rgba(203, 162, 88, 0.3);
          border-radius: 20px;
          padding: 30px 24px;
          box-shadow: 0 25px 60px rgba(0,0,0,0.5);
          z-index: 999;
        `;
      }
    });

    navLinks.querySelectorAll('a').forEach(a => {
      a.addEventListener('click', () => {
        navLinks.classList.remove('mobile-active');
        navLinks.removeAttribute('style');
      });
    });
  }

  console.log('🌿 AOBA Brand Experience Loaded Successfully.');
});
