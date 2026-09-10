/**
 * AOBA — Cinematic Brand Film Experience (demo.js)
 * High-performance scroll choreography using GSAP, ScrollTrigger, and Lenis.
 */

(function () {
  'use strict';

  function initDemo() {
    initSmoothScroll();
    initAmbientCanvas();
    initNavigation();
    initOpeningHero();
    initFallingBlackPepper();
    initFallingTurmeric();
    initFallingCashew();
    initTrioCollision();
    initFarmParallax();
    initHorizontalStory();
    initShopCardsTilt();
    initBrandStatement();
    initQualityCards();
    console.log('🌿 AOBA Cinematic Brand Film Initialized.');
  }

  // ==========================================
  // Smooth Scrolling (Lenis + GSAP sync)
  // ==========================================
  let lenis = null;
  function initSmoothScroll() {
    if (typeof Lenis !== 'undefined') {
      lenis = new Lenis({
        duration: 1.35,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        orientation: 'vertical',
        smoothWheel: true,
      });

      if (typeof ScrollTrigger !== 'undefined') {
        lenis.on('scroll', ScrollTrigger.update);
        gsap.ticker.add((time) => lenis.raf(time * 1000));
        gsap.ticker.lagSmoothing(0);
      }
    }

    // Scroll progress bar
    const bar = document.getElementById('demo-scroll-bar');
    if (bar) {
      window.addEventListener('scroll', () => {
        const total = document.documentElement.scrollHeight - window.innerHeight;
        if (total > 0) {
          const progress = Math.min(100, Math.max(0, (window.scrollY / total) * 100));
          bar.style.width = `${progress}%`;
        }
      }, { passive: true });
    }
  }

  // ==========================================
  // Ambient Canvas Particles
  // ==========================================
  function initAmbientCanvas() {
    const canvas = document.getElementById('ambient-canvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let w = (canvas.width = window.innerWidth);
    let h = (canvas.height = window.innerHeight);

    const particles = [];
    const count = window.innerWidth < 768 ? 20 : 45;

    class Particle {
      constructor() { this.reset(true); }
      reset(initial) {
        this.x = Math.random() * w;
        this.y = initial ? Math.random() * h : h + 20;
        this.size = Math.random() * 2.5 + 1;
        this.speedY = Math.random() * 0.35 + 0.15;
        this.speedX = (Math.random() - 0.5) * 0.3;
        this.alpha = Math.random() * 0.35 + 0.1;
        this.isGold = Math.random() > 0.4;
      }
      update() {
        this.y -= this.speedY;
        this.x += this.speedX;
        if (this.y < -20 || this.x < -20 || this.x > w + 20) this.reset(false);
      }
      draw(ctx) {
        ctx.save();
        ctx.globalAlpha = this.alpha;
        ctx.fillStyle = this.isGold ? '#dfb56c' : '#275e40';
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      }
    }

    for (let i = 0; i < count; i++) particles.push(new Particle());

    window.addEventListener('resize', () => {
      w = canvas.width = window.innerWidth;
      h = canvas.height = window.innerHeight;
    }, { passive: true });

    function loop() {
      ctx.clearRect(0, 0, w, h);
      for (let i = 0; i < particles.length; i++) {
        particles[i].update();
        particles[i].draw(ctx);
      }
      requestAnimationFrame(loop);
    }
    loop();
  }

  // ==========================================
  // Navigation & Mobile Drawer
  // ==========================================
  function initNavigation() {
    const nav = document.getElementById('site-nav');
    window.addEventListener('scroll', () => {
      if (window.scrollY > 40) nav?.classList.add('scrolled');
      else nav?.classList.remove('scrolled');
    }, { passive: true });

    const burger = document.getElementById('mobile-burger');
    const overlay = document.getElementById('mobile-menu-overlay');
    if (burger && overlay) {
      burger.addEventListener('click', () => overlay.classList.toggle('active'));
      overlay.querySelectorAll('a').forEach(a => {
        a.addEventListener('click', () => overlay.classList.remove('active'));
      });
    }

    // Smooth Anchor jumping
    document.querySelectorAll('a[href^="#"]').forEach(a => {
      a.addEventListener('click', (e) => {
        const href = a.getAttribute('href');
        if (href && href !== '#') {
          const target = document.querySelector(href);
          if (target) {
            e.preventDefault();
            if (lenis) lenis.scrollTo(target, { offset: -60, duration: 1.4 });
            else target.scrollIntoView({ behavior: 'smooth' });
          }
        }
      });
    });
  }

  // ==========================================
  // 01 — CINEMATIC OPENING HERO
  // ==========================================
  function initOpeningHero() {
    if (typeof gsap === 'undefined') return;

    const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });
    tl.fromTo('.hero-stage-section', { backgroundColor: '#000000' }, { backgroundColor: '#050f0a', duration: 1.4 })
      .fromTo('.hero-logo-film', { opacity: 0, scale: 0.8, y: 30 }, { opacity: 1, scale: 1, y: 0, duration: 1.6, ease: 'power2.out' }, '-=0.8')
      .fromTo('.hero-film-tagline', { opacity: 0, y: 25 }, { opacity: 1, y: 0, duration: 1.2 }, '-=0.9')
      .fromTo('.hero-film-subtext', { opacity: 0, y: 15 }, { opacity: 1, y: 0, duration: 1 }, '-=0.8')
      .fromTo('.hero-scroll-begin-prompt', { opacity: 0 }, { opacity: 0.8, duration: 1 }, '-=0.5');

    // On scroll hero fadeout
    gsap.to('.hero-center-content', {
      scrollTrigger: {
        trigger: '.hero-stage-section',
        start: 'top top',
        end: 'bottom top',
        scrub: true,
      },
      y: 120,
      opacity: 0,
      scale: 0.9,
    });
  }

  // ==========================================
  // 02, 03, 04 — BLACK PEPPER FALLING & ORBIT
  // ==========================================
  function initFallingBlackPepper() {
    if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') return;

    const stage = document.getElementById('stage-pepper');
    const packet = document.getElementById('pepper-falling-packet');
    const shadow = document.getElementById('pepper-shadow');
    const peppercorns = document.querySelectorAll('.pepper-orbit-item');

    if (!stage || !packet) return;

    // Initial state: starts above viewport, rotated 16 deg
    gsap.set(packet, { yPercent: -170, rotation: 18, scale: 0.82, opacity: 0 });
    gsap.set(shadow, { scale: 0.2, opacity: 0 });
    gsap.set('.pepper-copy-line', { opacity: 0, y: 30 });

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: stage,
        start: 'top top',
        end: '+=380%',
        pin: true,
        scrub: 1.2,
        anticipatePin: 1,
      }
    });

    // 1. FALL & ACCELERATE DOWNWARD
    tl.to(packet, {
      opacity: 1,
      duration: 0.4,
      ease: 'power1.in'
    }, 0)
    .to(packet, {
      yPercent: 0,
      rotation: 0,
      scale: 1,
      duration: 1.8,
      ease: 'power3.in' // Physical gravity acceleration
    }, 0)
    .to(shadow, {
      opacity: 0.85,
      scale: 1,
      duration: 1.8,
      ease: 'power3.in'
    }, 0)

    // 2. BOOM / SOFT COMMERCIAL-GRADE LANDING BOUNCE
    .to(packet, {
      yPercent: -5,
      scale: 1.02,
      duration: 0.35,
      ease: 'power2.out'
    })
    .to(packet, {
      yPercent: 0,
      scale: 1,
      duration: 0.35,
      ease: 'power2.in'
    })

    // 3. BLACK PEPPER STORY (Text lines reveal in sequence)
    .to('#pepper-line-1', { opacity: 1, y: 0, duration: 0.6 }, '+=0.2')
    .to('#pepper-line-2', { opacity: 1, y: 0, duration: 0.6 }, '+=0.2')
    .to('#pepper-line-3', { opacity: 1, y: 0, duration: 0.6 }, '+=0.2')
    .to('#pepper-line-main', { opacity: 1, y: 0, duration: 0.8 }, '+=0.2')
    .to('#pepper-line-sub', { opacity: 1, y: 0, duration: 0.6 }, '-=0.4')
    .to('#pepper-line-btn', { opacity: 1, y: 0, duration: 0.6 }, '-=0.3')

    // 4. PRODUCT ORBIT (3D vertical rotation & orbiting peppercorns)
    .to(packet, {
      rotationY: 35,
      rotationZ: -4,
      scale: 1.04,
      duration: 1.8,
      ease: 'none'
    })
    .to(peppercorns, {
      x: (i) => (i % 2 === 0 ? 90 : -90),
      y: (i) => (i < 2 ? -70 : 70),
      rotation: 180,
      opacity: 0.9,
      stagger: 0.1,
      duration: 1.8,
      ease: 'none'
    }, '-=1.8')

    // 5. PACKET MOVES BACKWARD & PEPPERCORNS SCATTER
    .to(packet, {
      scale: 0.6,
      opacity: 0,
      yPercent: 20,
      duration: 1.2,
      ease: 'power2.in'
    })
    .to(peppercorns, {
      x: (i) => (i % 2 === 0 ? 250 : -250),
      y: (i) => (i < 2 ? -180 : 180),
      opacity: 0,
      scale: 0.3,
      duration: 1.2,
      ease: 'power2.in'
    }, '-=1.2')
    .to('#stage-pepper .film-story-copy', {
      opacity: 0,
      y: -30,
      duration: 0.8,
      ease: 'power2.in'
    }, '-=1.0');
  }

  // ==========================================
  // 05, 06 — TURMERIC FALLING & GOLDEN TRANSITION
  // ==========================================
  function initFallingTurmeric() {
    if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') return;

    const stage = document.getElementById('stage-turmeric');
    const packet = document.getElementById('turmeric-falling-packet');
    const shadow = document.getElementById('turmeric-shadow');
    const burst = document.getElementById('turmeric-burst-ring');
    const goldParticles = document.querySelectorAll('.turmeric-particle-item');

    if (!stage || !packet) return;

    gsap.set(packet, { yPercent: -170, rotation: -16, scale: 0.85, opacity: 0 });
    gsap.set(shadow, { scale: 0.2, opacity: 0 });
    gsap.set(burst, { scale: 0.2, opacity: 0 });
    gsap.set('.turmeric-copy-line', { opacity: 0, y: 30 });

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: stage,
        start: 'top top',
        end: '+=380%',
        pin: true,
        scrub: 1.2,
        anticipatePin: 1,
      }
    });

    // 1. FALL & ACCELERATE
    tl.to(packet, {
      opacity: 1,
      duration: 0.4,
      ease: 'power1.in'
    }, 0)
    .to(packet, {
      yPercent: 0,
      rotation: 0,
      scale: 1,
      duration: 1.8,
      ease: 'power3.in'
    }, 0)
    .to(shadow, {
      opacity: 0.85,
      scale: 1,
      duration: 1.8,
      ease: 'power3.in'
    }, 0)

    // 2. SOFT LANDING & POWDER BURST EXPANSION
    .to(burst, {
      scale: 2.4,
      opacity: 0.8,
      duration: 0.4,
      ease: 'power2.out'
    })
    .to(burst, {
      opacity: 0,
      scale: 3.2,
      duration: 0.5,
      ease: 'power2.in'
    }, '-=0.2')
    .to(packet, {
      yPercent: -4,
      duration: 0.35,
      ease: 'power2.out'
    }, '-=0.6')
    .to(packet, {
      yPercent: 0,
      duration: 0.35,
      ease: 'power2.in'
    })

    // 3. TURMERIC STORY DISPLAY
    .to('#turmeric-line-1', { opacity: 1, y: 0, duration: 0.6 }, '+=0.2')
    .to('#turmeric-line-main', { opacity: 1, y: 0, duration: 0.8 }, '+=0.2')
    .to('#turmeric-line-sub', { opacity: 1, y: 0, duration: 0.6 }, '-=0.4')
    .to('#turmeric-line-desc', { opacity: 1, y: 0, duration: 0.6 }, '+=0.1')
    .to('#turmeric-line-btn', { opacity: 1, y: 0, duration: 0.6 }, '-=0.2')

    // 4. GOLDEN PARTICLES SPREAD & TRANSITION TO SIDE
    .to(packet, {
      xPercent: -40,
      rotationY: -15,
      scale: 0.9,
      duration: 1.8,
      ease: 'power2.inOut'
    })
    .to(goldParticles, {
      x: (i) => (Math.sin(i) * 220),
      y: (i) => (Math.cos(i) * 180),
      opacity: 1,
      scale: 1.8,
      stagger: 0.08,
      duration: 1.8,
      ease: 'power2.out'
    }, '-=1.8')

    // 5. PARTICLES DISSOLVE
    .to(packet, {
      opacity: 0,
      scale: 0.6,
      duration: 1.0,
      ease: 'power2.in'
    })
    .to(goldParticles, {
      opacity: 0,
      scale: 0.2,
      duration: 1.0,
      ease: 'power2.in'
    }, '-=0.9')
    .to('#stage-turmeric .film-story-copy', {
      opacity: 0,
      y: -30,
      duration: 0.8
    }, '-=0.8');
  }

  // ==========================================
  // 07 — CASHEW FALLING ANIMATION
  // ==========================================
  function initFallingCashew() {
    if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') return;

    const stage = document.getElementById('stage-cashew');
    const packet = document.getElementById('cashew-falling-packet');
    const shadow = document.getElementById('cashew-shadow');
    const cashewNuts = document.querySelectorAll('.cashew-float-item');

    if (!stage || !packet) return;

    gsap.set(packet, { yPercent: -170, rotation: 10, scale: 0.85, opacity: 0 });
    gsap.set(shadow, { scale: 0.2, opacity: 0 });
    gsap.set('.cashew-copy-line', { opacity: 0, y: 30 });

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: stage,
        start: 'top top',
        end: '+=380%',
        pin: true,
        scrub: 1.2,
        anticipatePin: 1,
      }
    });

    // 1. FALL VERTICALLY PASSING THROUGH FLOATING CASHEWS
    tl.to(packet, {
      opacity: 1,
      duration: 0.4,
      ease: 'power1.in'
    }, 0)
    .to(packet, {
      yPercent: 0,
      rotation: 0,
      scale: 1,
      duration: 1.8,
      ease: 'power3.in'
    }, 0)
    .to(cashewNuts, {
      y: (i) => (i % 2 === 0 ? -120 : 120),
      rotation: 45,
      opacity: 0.85,
      stagger: 0.1,
      duration: 1.8,
      ease: 'none'
    }, 0)
    .to(shadow, {
      opacity: 0.85,
      scale: 1,
      duration: 1.8,
      ease: 'power3.in'
    }, 0)

    // 2. GENTLE BOUNCE WHEN LANDING
    .to(packet, {
      yPercent: -4,
      duration: 0.35,
      ease: 'power2.out'
    })
    .to(packet, {
      yPercent: 0,
      duration: 0.35,
      ease: 'power2.in'
    })

    // 3. TEXT REVEAL
    .to('#cashew-line-1', { opacity: 1, y: 0, duration: 0.6 }, '+=0.2')
    .to('#cashew-line-main', { opacity: 1, y: 0, duration: 0.8 }, '+=0.2')
    .to('#cashew-line-sub', { opacity: 1, y: 0, duration: 0.6 }, '-=0.4')
    .to('#cashew-line-btn', { opacity: 1, y: 0, duration: 0.6 }, '+=0.1')

    // 4. EXIT
    .to(packet, {
      scale: 0.7,
      opacity: 0,
      duration: 1.2,
      ease: 'power2.in'
    }, '+=0.4')
    .to(cashewNuts, {
      opacity: 0,
      y: 200,
      duration: 1.2
    }, '-=1.2')
    .to('#stage-cashew .film-story-copy', {
      opacity: 0,
      y: -30,
      duration: 0.8
    }, '-=0.9');
  }

  // ==========================================
  // 08 — THREE PRODUCTS COLLISION / COLLECTION
  // ==========================================
  function initTrioCollision() {
    if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') return;

    const stage = document.getElementById('stage-trio');
    const pPepper = document.getElementById('trio-pepper');
    const pTurmeric = document.getElementById('trio-turmeric');
    const pCashew = document.getElementById('trio-cashew');

    if (!stage || !pPepper || !pTurmeric || !pCashew) return;

    // Initially: Black Pepper left, Turmeric right, Cashew below
    gsap.set(pPepper, { xPercent: -180, yPercent: -15, rotation: -18, scale: 0.85, opacity: 0 });
    gsap.set(pTurmeric, { xPercent: 180, yPercent: -10, rotation: 16, scale: 0.85, opacity: 0 });
    gsap.set(pCashew, { xPercent: 0, yPercent: 200, rotation: 0, scale: 0.8, opacity: 0 });
    gsap.set('.trio-headline-wrap', { opacity: 0, y: 40 });

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: stage,
        start: 'top top',
        end: '+=300%',
        pin: true,
        scrub: 1.2,
        anticipatePin: 1,
      }
    });

    // Convergence to Center Lineup
    tl.to([pPepper, pTurmeric, pCashew], {
      opacity: 1,
      duration: 0.5,
    }, 0)
    .to(pPepper, {
      xPercent: -85,
      yPercent: 0,
      rotation: -6,
      scale: 0.96,
      duration: 2.2,
      ease: 'power3.out'
    }, 0)
    .to(pTurmeric, {
      xPercent: 85,
      yPercent: 0,
      rotation: 6,
      scale: 0.96,
      duration: 2.2,
      ease: 'power3.out'
    }, 0)
    .to(pCashew, {
      xPercent: 0,
      yPercent: 0,
      rotation: 0,
      scale: 1.05,
      duration: 2.2,
      ease: 'power3.out'
    }, 0)
    .to('.trio-headline-wrap', {
      opacity: 1,
      y: 0,
      duration: 1.2,
      ease: 'power2.out'
    }, '-=1.0');
  }

  // ==========================================
  // 09 — FARM STORY (Parallax Journey)
  // ==========================================
  function initFarmParallax() {
    if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') return;

    const rows = document.querySelectorAll('.journey-step-row');
    rows.forEach((row, idx) => {
      const img = row.querySelector('.step-photo-wrap img');
      const copy = row.querySelector('.step-copy-card');

      if (img) {
        gsap.fromTo(img, 
          { yPercent: -12, scale: 1.12 },
          {
            yPercent: 12,
            scale: 1.0,
            ease: 'none',
            scrollTrigger: {
              trigger: row,
              start: 'top bottom',
              end: 'bottom top',
              scrub: true,
            }
          }
        );
      }

      if (copy) {
        gsap.fromTo(copy,
          { opacity: 0, y: 40 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: row,
              start: 'top 75%',
              toggleActions: 'play none none reverse'
            }
          }
        );
      }
    });

    // Background color shifts on farm journey
    gsap.to('.farm-story-journey', {
      scrollTrigger: {
        trigger: '.farm-story-journey',
        start: 'top 40%',
        end: 'bottom bottom',
        scrub: true,
      },
      backgroundColor: '#0d2217'
    });
  }

  // ==========================================
  // 10 — HORIZONTAL PINNED STORYTELLING
  // ==========================================
  function initHorizontalStory() {
    if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') return;

    const section = document.querySelector('.horizontal-pinned-section');
    const track = document.querySelector('.horizontal-track');
    if (!section || !track) return;

    gsap.to(track, {
      xPercent: -80, // 5 panels => shift 4 panels (80%)
      ease: 'none',
      scrollTrigger: {
        trigger: section,
        start: 'top top',
        end: '+=400%',
        pin: true,
        scrub: 1,
        anticipatePin: 1,
      }
    });
  }

  // ==========================================
  // 11 — CLEAN PRODUCT SHOWCASE (3D Tilt)
  // ==========================================
  function initShopCardsTilt() {
    const cards = document.querySelectorAll('.shop-card-3d');
    cards.forEach(card => {
      card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = (e.clientX - rect.left) / rect.width - 0.5;
        const y = (e.clientY - rect.top) / rect.height - 0.5;
        card.style.transform = `perspective(1000px) rotateY(${x * 12}deg) rotateX(${-y * 12}deg) translateY(-12px)`;
      });
      card.addEventListener('mouseleave', () => {
        card.style.transform = '';
      });
    });

    document.querySelectorAll('.shop-card-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const title = btn.getAttribute('data-product') || 'AOBA Product';
        alert(`🌿 Discovering ${title} — Harvested directly from Kerala estates.`);
      });
    });
  }

  // ==========================================
  // 12 — MINIMAL BRAND STATEMENT (Scroll Reveal)
  // ==========================================
  function initBrandStatement() {
    if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') return;

    const words = document.querySelectorAll('.statement-word');
    words.forEach((word, idx) => {
      ScrollTrigger.create({
        trigger: word,
        start: 'top 80%',
        onEnter: () => word.classList.add('active'),
        onLeaveBack: () => word.classList.remove('active'),
      });
    });
  }

  // ==========================================
  // 13 — QUALITY SECTION (Staggered Cards)
  // ==========================================
  function initQualityCards() {
    if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') return;

    gsap.from('.quality-card-film', {
      scrollTrigger: {
        trigger: '.quality-grid-film',
        start: 'top 80%',
        toggleActions: 'play none none reverse'
      },
      opacity: 0,
      y: 40,
      stagger: 0.18,
      duration: 0.8,
      ease: 'power2.out'
    });
  }

  // Auto-run on DOM ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initDemo);
  } else {
    initDemo();
  }
})();
