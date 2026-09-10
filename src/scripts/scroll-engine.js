/**
 * AOBA Scroll & Cinematic Animation Engine
 * Coordinates Lenis Smooth Scrolling with GSAP ScrollTrigger
 * Apple-style 3-phase pinned product experience: Black Pepper -> Turmeric -> Cashew
 */

import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export function initScrollEngine() {
  // 1. Initialize Lenis Smooth Scroll
  const lenis = new Lenis({
    duration: 1.2,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    orientation: 'vertical',
    gestureOrientation: 'vertical',
    smoothWheel: true,
    touchMultiplier: 1.5,
  });

  lenis.on('scroll', ScrollTrigger.update);

  gsap.ticker.add((time) => {
    lenis.raf(time * 1000);
  });
  gsap.ticker.lagSmoothing(0);

  // 2. Navigation bar scroll styling
  const header = document.querySelector('.site-header');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      header?.classList.add('scrolled');
    } else {
      header?.classList.remove('scrolled');
    }
  }, { passive: true });

  // 3. Hero Initial Entrance Animation
  const heroTl = gsap.timeline({ defaults: { ease: 'power3.out' } });
  
  heroTl
    .fromTo('.hero-logo-wrap', 
      { opacity: 0, scale: 0.88, y: 35 }, 
      { opacity: 1, scale: 1, y: 0, duration: 1.4, delay: 0.2 }
    )
    .fromTo('.hero-tagline', 
      { opacity: 0, y: 25 }, 
      { opacity: 1, y: 0, duration: 1 }, 
      '-=0.7'
    )
    .fromTo('.hero-subtext', 
      { opacity: 0, y: 20 }, 
      { opacity: 1, y: 0, duration: 0.9 }, 
      '-=0.6'
    )
    .fromTo('.hero-cta-group', 
      { opacity: 0, y: 20 }, 
      { opacity: 1, y: 0, duration: 0.8 }, 
      '-=0.5'
    )
    .fromTo('.hero-scroll-cue', 
      { opacity: 0 }, 
      { opacity: 0.8, duration: 0.8 }, 
      '-=0.3'
    );

  // 4. Hero on-scroll scale down & transition
  gsap.to('.hero-logo-img', {
    scrollTrigger: {
      trigger: '.hero-section',
      start: 'top top',
      end: 'bottom top',
      scrub: true
    },
    scale: 0.72,
    y: 80,
    opacity: 0.3
  });

  gsap.to('.hero-content', {
    scrollTrigger: {
      trigger: '.hero-section',
      start: 'top top',
      end: '80% top',
      scrub: true
    },
    y: -60,
    opacity: 0
  });

  // 5. PINNED APPLE-STYLE PRODUCT SHOWCASE TIMELINE
  const stage = document.querySelector('.experience-pinned-section');
  if (stage) {
    const backdrop = document.querySelector('.stage-backdrop');
    const auraGlow = document.querySelector('.product-aura-glow');
    const copyPepper = document.getElementById('copy-pepper');
    const copyTurmeric = document.getElementById('copy-turmeric');
    const copyCashew = document.getElementById('copy-cashew');

    const pouchPepper = document.getElementById('pouch-pepper');
    const pouchTurmeric = document.getElementById('pouch-turmeric');
    const pouchCashew = document.getElementById('pouch-cashew');

    const dots = document.querySelectorAll('.stage-step-dot');

    function setActiveProductState(index) {
      // 0: Pepper, 1: Turmeric, 2: Cashew
      dots.forEach((dot, i) => {
        dot.classList.toggle('active', i === index);
      });

      copyPepper?.classList.toggle('active', index === 0);
      copyTurmeric?.classList.toggle('active', index === 1);
      copyCashew?.classList.toggle('active', index === 2);

      if (backdrop) {
        backdrop.className = 'stage-backdrop ' + 
          (index === 0 ? 'pepper-mode' : index === 1 ? 'turmeric-mode' : 'cashew-mode');
      }

      if (auraGlow) {
        auraGlow.className = 'product-aura-glow ' + 
          (index === 0 ? 'aura-pepper' : index === 1 ? 'aura-turmeric' : 'aura-cashew');
      }
    }

    // Set initial states of packages
    gsap.set(pouchPepper, {
      xPercent: 110,
      yPercent: 15,
      rotation: 12,
      scale: 0.85,
      opacity: 0
    });

    gsap.set(pouchTurmeric, {
      xPercent: 0,
      yPercent: 120,
      rotation: -8,
      scale: 0.8,
      opacity: 0
    });

    gsap.set(pouchCashew, {
      xPercent: -120,
      yPercent: 10,
      rotation: -10,
      scale: 0.85,
      opacity: 0
    });

    // Create Master Pinned Timeline
    const masterTimeline = gsap.timeline({
      scrollTrigger: {
        trigger: '.experience-pinned-section',
        start: 'top top',
        end: '+=350%', // Extended scroll track for deep Apple-like dwell time
        pin: true,
        scrub: 1,
        anticipatePin: 1,
        onUpdate: (self) => {
          const progress = self.progress;
          if (progress < 0.35) {
            setActiveProductState(0);
          } else if (progress < 0.7) {
            setActiveProductState(1);
          } else {
            setActiveProductState(2);
          }
        }
      }
    });

    // PHASE 1: BLACK PEPPER REVEAL & DWELL
    masterTimeline
      // Black Pepper enters from right, rotates to center, scales up
      .to(pouchPepper, {
        xPercent: 0,
        yPercent: 0,
        rotation: 0,
        scale: 1,
        opacity: 1,
        duration: 2,
        ease: 'power2.out'
      })
      // Dwell period for reading
      .to(pouchPepper, {
        scale: 1.04,
        yPercent: -2,
        duration: 1.5,
        ease: 'none'
      })
      // Black Pepper moves back & recedes
      .to(pouchPepper, {
        xPercent: -60,
        scale: 0.75,
        rotation: -8,
        opacity: 0,
        duration: 1.8,
        ease: 'power2.in'
      })

      // PHASE 2: TURMERIC REVEAL & DWELL
      // Turmeric rises from bottom with warm golden glow
      .to(pouchTurmeric, {
        yPercent: 0,
        rotation: 0,
        scale: 1,
        opacity: 1,
        duration: 2,
        ease: 'power2.out'
      }, '-=1.2')
      // Dwell period
      .to(pouchTurmeric, {
        scale: 1.05,
        yPercent: -3,
        duration: 1.5,
        ease: 'none'
      })
      // Turmeric sinks away
      .to(pouchTurmeric, {
        yPercent: -80,
        scale: 0.78,
        rotation: 6,
        opacity: 0,
        duration: 1.8,
        ease: 'power2.in'
      })

      // PHASE 3: CASHEW NUTS REVEAL & DWELL
      // Cashews slide in from left, rotate slightly, settle in center
      .to(pouchCashew, {
        xPercent: 0,
        yPercent: 0,
        rotation: 0,
        scale: 1,
        opacity: 1,
        duration: 2,
        ease: 'power2.out'
      }, '-=1.2')
      // Dwell period
      .to(pouchCashew, {
        scale: 1.04,
        yPercent: -2,
        duration: 1.5,
        ease: 'none'
      });

    // Dot click jump functionality
    dots.forEach((dot) => {
      dot.addEventListener('click', () => {
        const step = parseInt(dot.getAttribute('data-step') || '0', 10);
        const trigger = ScrollTrigger.getById('stage-pinned') || ScrollTrigger.getAll()[1];
        if (trigger) {
          const targetY = trigger.start + (trigger.end - trigger.start) * (step === 0 ? 0.15 : step === 1 ? 0.5 : 0.85);
          lenis.scrollTo(targetY, { duration: 1.5 });
        }
      });
    });
  }

  // 6. Farm-to-Table Journey Progressive Reveal
  const journeyNodes = document.querySelectorAll('.stage-node-card');
  if (journeyNodes.length > 0) {
    gsap.from(journeyNodes, {
      scrollTrigger: {
        trigger: '.farm-story-section',
        start: 'top 75%',
        end: 'top 20%',
        scrub: 0.5
      },
      y: 40,
      opacity: 0,
      stagger: 0.15,
      ease: 'power2.out'
    });

    // Highlight nodes as user scrolls down
    journeyNodes.forEach((node, idx) => {
      ScrollTrigger.create({
        trigger: node,
        start: 'top 65%',
        onEnter: () => node.classList.add('active'),
        onLeaveBack: () => node.classList.remove('active')
      });
    });
  }

  // 7. Quality 4-Pillar Grid Stagger
  const qualityCards = document.querySelectorAll('.quality-card');
  if (qualityCards.length > 0) {
    gsap.from(qualityCards, {
      scrollTrigger: {
        trigger: '.quality-section',
        start: 'top 70%'
      },
      y: 45,
      opacity: 0,
      duration: 0.9,
      stagger: 0.18,
      ease: 'power3.out'
    });
  }

  // 8. Brand Story Floating Parallax
  const storyMain = document.querySelector('.story-visual-main img');
  if (storyMain) {
    gsap.to(storyMain, {
      scrollTrigger: {
        trigger: '.brand-story-section',
        start: 'top bottom',
        end: 'bottom top',
        scrub: true
      },
      yPercent: -12,
      ease: 'none'
    });
  }

  // 9. Final CTA Logo Gentle Growth
  const ctaLogo = document.querySelector('.cta-logo');
  if (ctaLogo) {
    gsap.fromTo(ctaLogo, 
      { scale: 0.85, opacity: 0.6 },
      {
        scrollTrigger: {
          trigger: '.final-cta-section',
          start: 'top 80%',
          end: 'bottom bottom',
          scrub: true
        },
        scale: 1.08,
        opacity: 1,
        ease: 'none'
      }
    );
  }

  // Smooth internal anchor scroll handling with Lenis
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener('click', function (e) {
      const targetId = this.getAttribute('href');
      if (targetId && targetId !== '#') {
        const targetEl = document.querySelector(targetId);
        if (targetEl) {
          e.preventDefault();
          lenis.scrollTo(targetEl, { offset: -60, duration: 1.4 });
        }
      }
    });
  });

  return lenis;
}
