/* ==========================================================================
   AOBA — Cinematic scroll film
   GSAP + ScrollTrigger + Lenis · vanilla JS
   ========================================================================== */
(function () {
  'use strict';

  var doc = document;
  var body = doc.body;
  var reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var noGSAP = (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined');
  var mqMobile = window.matchMedia('(max-width: 760px)');

  var $  = function (s, c) { return (c || doc).querySelector(s); };
  var $$ = function (s, c) { return Array.prototype.slice.call((c || doc).querySelectorAll(s)); };

  /* deterministic pseudo-random */
  function seed(n) { return function () { n = (n * 1664525 + 1013904223) % 4294967296; return n / 4294967296; }; }

  /* ----------------------------------------------------------------------
     Ambient particle canvas (pauses when off-screen)
     ---------------------------------------------------------------------- */
  function ambient(canvas, opts) {
    if (!canvas) return;
    var ctx = canvas.getContext('2d');
    if (!ctx) return;
    opts = opts || {};
    var colors = opts.colors || ['rgba(230,192,121,', 'rgba(125,154,134,'];
    var count = opts.count || 40;
    var w, h, dpr = Math.min(window.devicePixelRatio || 1, 2);
    var parts = [];
    var running = true;
    var rnd = seed(opts.seed || 7);

    function size() {
      w = canvas.clientWidth; h = canvas.clientHeight;
      canvas.width = w * dpr; canvas.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    }
    size();
    window.addEventListener('resize', size, { passive: true });

    for (var i = 0; i < count; i++) {
      parts.push({
        x: rnd() * w, y: rnd() * h,
        r: rnd() * 2.2 + 0.5,
        sy: (rnd() * 0.35 + 0.05) * (opts.rise === false ? -1 : 1),
        sx: (rnd() - 0.5) * 0.22,
        a: rnd() * 0.4 + 0.08,
        c: colors[(rnd() * colors.length) | 0]
      });
    }

    function frame() {
      if (!running) return;
      ctx.clearRect(0, 0, w, h);
      for (var i = 0; i < parts.length; i++) {
        var p = parts[i];
        p.y -= p.sy; p.x += p.sx;
        if (p.y < -12) { p.y = h + 12; p.x = rnd() * w; }
        if (p.y > h + 12) { p.y = -12; p.x = rnd() * w; }
        if (p.x < -12) p.x = w + 12; else if (p.x > w + 12) p.x = -12;
        ctx.beginPath();
        ctx.fillStyle = p.c + p.a + ')';
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fill();
      }
      requestAnimationFrame(frame);
    }
    frame();

    if ('IntersectionObserver' in window) {
      new IntersectionObserver(function (e) {
        var vis = e[0].isIntersecting;
        if (vis && !running) { running = true; frame(); }
        else running = vis;
      }, { threshold: 0.01 }).observe(canvas);
    }
  }

  /* ----------------------------------------------------------------------
     Navigation
     ---------------------------------------------------------------------- */
  function initNav(lenis) {
    var nav = $('#nav');
    var burger = $('#burger');
    var progress = $('#progress');

    function onScroll() {
      var y = window.scrollY || window.pageYOffset;
      nav.classList.toggle('scrolled', y > 40);
      if (progress) {
        var max = doc.documentElement.scrollHeight - window.innerHeight;
        progress.style.width = (max > 0 ? (y / max) * 100 : 0) + '%';
      }
    }
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();

    burger.addEventListener('click', function () {
      var open = body.classList.toggle('menu-open');
      burger.setAttribute('aria-expanded', open ? 'true' : 'false');
      if (lenis) { open ? lenis.stop() : lenis.start(); }
      else { body.style.overflow = open ? 'hidden' : ''; }
    });

    function closeMenu() {
      if (!body.classList.contains('menu-open')) return;
      body.classList.remove('menu-open');
      burger.setAttribute('aria-expanded', 'false');
      if (lenis) lenis.start(); else body.style.overflow = '';
    }

    $$('[data-scroll]').forEach(function (a) {
      a.addEventListener('click', function (e) {
        var id = a.getAttribute('href');
        if (!id || id.charAt(0) !== '#') return;
        var target = doc.querySelector(id);
        if (!target) return;
        e.preventDefault();
        closeMenu();
        var doScroll = function () {
          if (lenis) lenis.scrollTo(target, { offset: -50, duration: 1.2 });
          else target.scrollIntoView({ behavior: reduced ? 'auto' : 'smooth' });
        };
        body.classList.contains('menu-open') ? setTimeout(doScroll, 350) : doScroll();
      });
    });
  }

  /* ----------------------------------------------------------------------
     Generic reveal (IntersectionObserver)
     ---------------------------------------------------------------------- */
  function initReveals() {
    var els = $$('.reveal');
    if (!('IntersectionObserver' in window)) { els.forEach(function (e) { e.classList.add('in'); }); return; }
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) { en.target.classList.add('in'); io.unobserve(en.target); }
      });
    }, { threshold: 0.18, rootMargin: '0px 0px -8% 0px' });
    els.forEach(function (e) { io.observe(e); });
  }

  /* ----------------------------------------------------------------------
     Shop cards — 3D tilt + ingredient particles
     ---------------------------------------------------------------------- */
  function initShop() {
    $$('.shop-card').forEach(function (card) {
      var inner = $('.shop-card-inner', card);
      var ing = $('.shop-ing', card);
      var accent = card.getAttribute('data-accent') || '#c79a49';

      for (var i = 0; i < 6; i++) {
        var s = doc.createElement('span');
        s.style.left = (12 + Math.random() * 76) + '%';
        s.style.top = (18 + Math.random() * 66) + '%';
        s.style.background = accent;
        s.style.transitionDelay = (i * 0.04) + 's';
        s.style.width = s.style.height = (5 + Math.random() * 7) + 'px';
        ing.appendChild(s);
      }

      if (reduced || mqMobile.matches) return;

      card.addEventListener('pointermove', function (e) {
        var r = card.getBoundingClientRect();
        var px = (e.clientX - r.left) / r.width - 0.5;
        var py = (e.clientY - r.top) / r.height - 0.5;
        inner.style.transform =
          'rotateY(' + (px * 12) + 'deg) rotateX(' + (-py * 12) + 'deg) translateY(-10px)';
      });
      card.addEventListener('pointerleave', function () {
        inner.style.transform = '';
      });
    });
  }

  /* ----------------------------------------------------------------------
     Ambient soundscape (Web Audio — synthesised, no asset)
     ---------------------------------------------------------------------- */
  function initSound() {
    var btn = $('#soundToggle');
    if (!btn) return;
    var AC = window.AudioContext || window.webkitAudioContext;
    if (!AC) { btn.style.display = 'none'; return; }

    var ctx = null, master = null, playing = false, built = false;

    function build() {
      ctx = new AC();
      var comp = ctx.createDynamicsCompressor();
      comp.threshold.value = -22; comp.ratio.value = 3; comp.connect(ctx.destination);
      master = ctx.createGain(); master.gain.value = 0; master.connect(comp);

      /* warm pad — detuned oscillators through a slowly sweeping lowpass */
      var pad = ctx.createGain(); pad.gain.value = 0.17; pad.connect(master);
      var lp = ctx.createBiquadFilter(); lp.type = 'lowpass'; lp.frequency.value = 560; lp.Q.value = 0.7; lp.connect(pad);
      [110, 164.81, 220, 277.18].forEach(function (f, i) {
        var o = ctx.createOscillator();
        o.type = i % 2 ? 'sine' : 'triangle';
        o.frequency.value = f; o.detune.value = (i - 1.5) * 5;
        var g = ctx.createGain(); g.gain.value = 0.26 / (i + 1);
        o.connect(g); g.connect(lp); o.start();
        var drift = ctx.createOscillator(); drift.frequency.value = 0.03 + i * 0.019;
        var dg = ctx.createGain(); dg.gain.value = 3.6;
        drift.connect(dg); dg.connect(o.detune); drift.start();
      });
      var sweep = ctx.createOscillator(); sweep.frequency.value = 0.021;
      var sg = ctx.createGain(); sg.gain.value = 170;
      sweep.connect(sg); sg.connect(lp.frequency); sweep.start();

      /* airy texture — softly breathing band-passed noise */
      var buf = ctx.createBuffer(1, ctx.sampleRate * 4, ctx.sampleRate);
      var d = buf.getChannelData(0);
      for (var s = 0; s < d.length; s++) d[s] = (Math.random() * 2 - 1) * 0.5;
      var noise = ctx.createBufferSource(); noise.buffer = buf; noise.loop = true;
      var bp = ctx.createBiquadFilter(); bp.type = 'bandpass'; bp.frequency.value = 1350; bp.Q.value = 0.5;
      var ng = ctx.createGain(); ng.gain.value = 0.05;
      noise.connect(bp); bp.connect(ng); ng.connect(master); noise.start();
      var breath = ctx.createOscillator(); breath.frequency.value = 0.08;
      var bg = ctx.createGain(); bg.gain.value = 0.03;
      breath.connect(bg); bg.connect(ng.gain); breath.start();

      built = true;
    }

    function fade(to, t) {
      master.gain.cancelScheduledValues(ctx.currentTime);
      master.gain.setValueAtTime(master.gain.value, ctx.currentTime);
      master.gain.linearRampToValueAtTime(to, ctx.currentTime + t);
    }

    function setPlaying(on) {
      playing = on;
      btn.classList.toggle('on', on);
      btn.setAttribute('aria-pressed', on ? 'true' : 'false');
    }

    function toggle() {
      if (!built) build();
      if (ctx.state === 'suspended') ctx.resume();
      setPlaying(!playing);
      fade(playing ? 0.62 : 0, playing ? 2.6 : 0.7);
      try { localStorage.setItem('aoba-sound', playing ? '1' : '0'); } catch (e) {}
    }

    btn.addEventListener('click', toggle);

    doc.addEventListener('visibilitychange', function () {
      if (!built || !playing) return;
      fade(doc.hidden ? 0 : 0.62, 0.5);
    });

    /* resume a previous "on" choice at the first interaction (autoplay policy) */
    try {
      if (localStorage.getItem('aoba-sound') === '1') {
        var kick = function () {
          toggle();
          window.removeEventListener('pointerdown', kick);
          window.removeEventListener('keydown', kick);
        };
        window.addEventListener('pointerdown', kick, { once: true });
        window.addEventListener('keydown', kick, { once: true });
      }
    } catch (e) {}
  }

  /* ----------------------------------------------------------------------
     Back-to-top button
     ---------------------------------------------------------------------- */
  function initBackToTop(lenis) {
    var btn = $('#toTop');
    if (!btn) return;
    var shown = false;
    function upd() {
      var want = (window.scrollY || window.pageYOffset) > window.innerHeight * 0.85;
      if (want !== shown) { shown = want; btn.classList.toggle('show', want); }
    }
    window.addEventListener('scroll', upd, { passive: true });
    window.addEventListener('resize', upd, { passive: true });
    upd();
    btn.addEventListener('click', function () {
      if (lenis) lenis.scrollTo(0, { duration: 1.4 });
      else window.scrollTo({ top: 0, behavior: reduced ? 'auto' : 'smooth' });
    });
  }

  /* ----------------------------------------------------------------------
     Auto-play — hands-free scroll from top to bottom
     ---------------------------------------------------------------------- */
  function initAutoScroll(lenis) {
    var btn = $('#autoPlay');
    if (!btn) return;
    var running = false, raf = 0, last = 0;

    function maxY() { return Math.max(0, doc.documentElement.scrollHeight - window.innerHeight); }
    function curY() { return lenis ? lenis.scroll : (window.scrollY || window.pageYOffset); }

    function setState(on) {
      running = on;
      btn.setAttribute('aria-pressed', on ? 'true' : 'false');
      body.classList.toggle('autoscrolling', on);
    }
    function stop() { if (!running) return; setState(false); cancelAnimationFrame(raf); }
    function start() {
      if (running || curY() >= maxY() - 4) return;
      setState(true);
      last = performance.now();
      var speed = Math.min(240, Math.max(72, maxY() / 100));   // ~100s end-to-end
      (function step(now) {
        if (!running) return;
        var dt = Math.min(0.048, (now - last) / 1000); last = now;
        var next = curY() + speed * dt;
        if (next >= maxY() - 2) {
          if (lenis) lenis.scrollTo(maxY(), { immediate: true }); else window.scrollTo(0, maxY());
          return stop();
        }
        if (lenis) lenis.scrollTo(next, { immediate: true }); else window.scrollTo(0, next);
        raf = requestAnimationFrame(step);
      })(last);
    }

    btn.addEventListener('click', function () { running ? stop() : start(); });

    window.addEventListener('wheel', function () { stop(); }, { passive: true });
    window.addEventListener('touchstart', function () { stop(); }, { passive: true });
    window.addEventListener('keydown', function (e) {
      if (['ArrowUp', 'ArrowDown', 'PageUp', 'PageDown', 'Home', 'End', ' ', 'Spacebar'].indexOf(e.key) !== -1) stop();
    });
    doc.addEventListener('click', function (e) { if (running && !btn.contains(e.target)) stop(); });
  }

  /* ======================================================================
     LIGHT MODE  (reduced motion or GSAP unavailable)
     ====================================================================== */
  function lightMode() {
    body.classList.add('reduced');
    body.classList.remove('is-loading');
    var veil = $('#heroVeil'); if (veil) veil.style.display = 'none';
    initNav(null);
    initReveals();
    initShop();
    initSound();
    initBackToTop(null);
    initAutoScroll(null);

    // reveal the cinematic copy that would otherwise be animated
    $$('.act-reveal, .act-copy .line, .statement-words span, .q-card').forEach(function (el) {
      el.style.opacity = 1; el.style.transform = 'none';
    });
  }

  /* ======================================================================
     FULL CINEMATIC MODE
     ====================================================================== */
  function fullMode() {
    gsap.registerPlugin(ScrollTrigger);
    ScrollTrigger.config({ ignoreMobileResize: true });

    /* ---- Lenis smooth scroll ---- */
    var lenis = null;
    if (typeof Lenis !== 'undefined') {
      lenis = new Lenis({
        duration: 1.15,
        easing: function (t) { return Math.min(1, 1.001 - Math.pow(2, -10 * t)); },
        smoothWheel: true
      });
      lenis.on('scroll', ScrollTrigger.update);
      gsap.ticker.add(function (time) { lenis.raf(time * 1000); });
      gsap.ticker.lagSmoothing(0);
      window.__lenis = lenis;
    }

    initNav(lenis);
    initReveals();
    initShop();
    initSound();
    initBackToTop(lenis);
    initAutoScroll(lenis);

    ambient($('#hero-particles'), { count: 46, seed: 11, colors: ['rgba(230,192,121,', 'rgba(120,150,132,'] });
    ambient($('#final-particles'), { count: 32, seed: 23, colors: ['rgba(230,192,121,', 'rgba(150,175,158,'] });

    var vh = function () { return window.innerHeight; };
    var vw = function () { return window.innerWidth; };

    /* ---- Hero intro timeline (on load) ---- */
    function heroIntro() {
      body.classList.remove('is-loading');
      gsap.set('#heroVeil', { animation: 'none', opacity: 1, visibility: 'visible' });
      var tl = gsap.timeline({ defaults: { ease: 'power3.out' } });
      tl.to('#heroVeil', { opacity: 0, duration: 1.7, ease: 'power2.inOut' })
        .fromTo('#hero-particles', { opacity: 0 }, { opacity: 1, duration: 1.6 }, 0.3)
        .fromTo('#heroLogo', { opacity: 0, scale: 0.8, y: 10 }, { opacity: 1, scale: 1, y: 0, duration: 1.5 }, 0.5)
        .fromTo('.hero-leaf', { opacity: 0, y: 30 }, { opacity: 0.5, y: 0, duration: 1.6, stagger: 0.12 }, 0.6)
        .fromTo('#heroTag .w', { opacity: 0, y: 26, filter: 'blur(6px)' }, { opacity: 1, y: 0, filter: 'blur(0px)', duration: 0.9, stagger: 0.14 }, '-=0.9')
        .fromTo('#heroSub', { opacity: 0, y: 14 }, { opacity: 1, y: 0, duration: 0.8 }, '-=0.5')
        .fromTo('#heroCue', { opacity: 0 }, { opacity: 1, duration: 0.8 }, '-=0.3')
        .add(function () {
          gsap.to('#heroLogo', { y: -12, duration: 3.4, ease: 'sine.inOut', yoyo: true, repeat: -1 });
          gsap.to('.hero-leaf.lf1', { rotation: 4, y: -14, duration: 7, ease: 'sine.inOut', yoyo: true, repeat: -1 });
          gsap.to('.hero-leaf.lf2', { rotation: -5, y: 12, duration: 8, ease: 'sine.inOut', yoyo: true, repeat: -1 });
          gsap.to('.hero-leaf.lf3', { rotation: 6, duration: 6, ease: 'sine.inOut', yoyo: true, repeat: -1 });
        });

      // hero parts drift away as you leave
      gsap.to('.hero-inner', {
        yPercent: -18, opacity: 0, ease: 'none',
        scrollTrigger: { trigger: '#hero', start: 'top top', end: 'bottom top', scrub: true }
      });
      gsap.to('#heroCue', {
        opacity: 0, ease: 'none',
        scrollTrigger: { trigger: '#hero', start: 'top top', end: '15% top', scrub: true }
      });
    }

    /* ---- Reusable falling packet ---- */
    function fallInto(tl, o) {
      o = Object.assign({ at: 0, dur: 0.28, fromVH: -1.35, spin: 15, blur: 12, land: 0.78 }, o);
      var p = o.packet, sh = o.shadow;
      var landDur = o.dur * o.land;

      // GSAP fully owns the transform — zero out any inherited px translate
      gsap.set(p, { xPercent: -50, yPercent: -50, x: 0, y: 0, rotation: 0, transformOrigin: '50% 50%' });
      gsap.set(sh, { xPercent: -50, yPercent: -50, x: 0, y: function () { return vh() * 0.26; } });

      tl.fromTo(p,
        { y: function () { return vh() * o.fromVH; }, rotation: o.spin, scale: 0.82 },
        { y: 0, rotation: 0, scale: 1, ease: 'power3.out', duration: landDur }, o.at);

      // motion blur through the fast middle
      tl.fromTo(p, { filter: 'blur(0px)' },
        { filter: 'blur(' + o.blur + 'px)', ease: 'sine.in', duration: landDur * 0.42 }, o.at)
        .to(p, { filter: 'blur(0px)', ease: 'sine.out', duration: landDur * 0.42 }, o.at + landDur * 0.5);

      // soft landing rebound + settle
      tl.to(p, { y: function () { return -vh() * 0.02; }, rotation: -1.1, duration: o.dur * 0.1, ease: 'sine.out' }, o.at + landDur)
        .to(p, { y: 0, rotation: 0, duration: o.dur * 0.12, ease: 'sine.inOut' });

      // contact shadow
      tl.fromTo(sh, { scale: 0.3, opacity: 0 },
        { scale: 1, opacity: 0.5, ease: 'power2.out', duration: landDur }, o.at)
        .to(sh, { scale: 1.16, opacity: 0.64, duration: o.dur * 0.1 }, o.at + landDur)
        .to(sh, { scale: 1, opacity: 0.5, duration: o.dur * 0.12 });
    }

    /* ---- Trail particles that follow a fall ---- */
    function makeBits(container, cls, n) {
      var arr = [];
      for (var i = 0; i < n; i++) {
        var b = doc.createElement('span');
        b.className = 'bit ' + cls;
        container.appendChild(b);
        arr.push(b);
      }
      return arr;
    }
    function trail(tl, bits, o) {
      o = Object.assign({ at: 0, dur: 0.28, spread: 0.24 }, o);
      var r = seed(99);
      bits.forEach(function (b, i) {
        var f = i / bits.length;
        var x = (r() - 0.5) * o.spread;
        var sc = 0.45 + r() * 0.95;
        var lag = 0.02 + f * 0.1;
        var spin = (r() - 0.5) * 520;
        gsap.set(b, { xPercent: -50, yPercent: -50 });
        tl.fromTo(b,
          { x: function () { return vw() * x; }, y: function () { return -vh() * (1.2 + f * 0.5); }, rotation: r() * 360, scale: sc, opacity: 0 },
          { y: function () { return vh() * 0.12; }, opacity: 0.92, rotation: '+=' + spin, ease: 'power2.in', duration: o.dur * 0.92 }, o.at + lag)
          .to(b, { opacity: 0, duration: o.dur * 0.22 }, o.at + lag + o.dur * 0.72);
      });
    }

    /* ---- Orbiting ingredient bits (fake 3D) ---- */
    function makeOrbiters(viewport, cls, defs) {
      return defs.map(function (d) {
        var orb = doc.createElement('div');
        orb.style.cssText = 'position:absolute;left:50%;top:50%;width:0;height:0;z-index:' + (d.front ? 6 : 3) + ';will-change:transform';
        var b = doc.createElement('span');
        b.className = 'bit ' + cls;
        b.style.position = 'absolute';
        b.style.left = d.radius + 'px';
        b.style.top = '0';
        orb.appendChild(b);
        viewport.appendChild(orb);
        return { orb: orb, bit: b, def: d };
      });
    }

    /* ==================================================================
       ACT 1 — BLACK PEPPER
       ================================================================== */
    (function pepperAct() {
      var sec = $('#act-pepper');
      var vp = $('.act-viewport', sec);
      var packet = $('#pepperPacket');
      var shadow = $('#pepperShadow');
      var lines = $$('#pepperCopy .line');
      var reveal = $('#pepperReveal');
      var bgAlt = $('.act-bg-alt', sec);

      gsap.set(vp, { perspective: 1500 });
      var bits = makeBits($('#pepperBits'), 'pep', 12);
      var orbiters = makeOrbiters(vp, 'pep', [
        { radius: 150, start: 0,   dir: 1,  front: false },
        { radius: 210, start: 120, dir: -1, front: true },
        { radius: 120, start: 240, dir: 1,  front: true },
        { radius: 250, start: 60,  dir: -1, front: false },
        { radius: 180, start: 300, dir: 1,  front: false }
      ]);
      orbiters.forEach(function (o) {
        gsap.set(o.orb, { rotation: o.def.start, opacity: 0 });
        gsap.set(o.bit, { opacity: 0.92 });
      });
      gsap.set(reveal, { opacity: 0, y: 30 });
      gsap.set(lines, { opacity: 0, y: 20, filter: 'blur(6px)' });

      var tl = gsap.timeline({
        scrollTrigger: {
          trigger: sec, start: 'top top', end: '+=440%',
          pin: vp, scrub: 1, anticipatePin: 1, invalidateOnRefresh: true,
          onUpdate: function (self) { sec.classList.toggle('is-split', self.progress > 0.5); }
        }
      });

      // 0 - 0.18 : the fall
      fallInto(tl, { packet: packet, shadow: shadow, at: 0, dur: 0.18, spin: 16, blur: 13 });
      trail(tl, bits, { at: 0, dur: 0.18, spread: 0.26 });

      // 0.18 - 0.24 : product settles into its "hero" position, clear of the caption zone
      tl.to(packet, { y: function () { return -vh() * 0.11; }, scale: 0.9, duration: 0.06, ease: 'power2.out' }, 0.18)
        .to(shadow, { y: function () { return vh() * 0.30; }, scale: 1.1, opacity: 0.3, duration: 0.06 }, 0.18);

      // 0.28 - 0.55 : three lines, one at a time, below the product
      lines.forEach(function (ln, i) {
        var at = 0.28 + i * 0.1;
        tl.fromTo(ln, { opacity: 0, y: 24, filter: 'blur(6px)' },
          { opacity: 1, y: 0, filter: 'blur(0px)', duration: 0.045, ease: 'power2.out' }, at)
          .to(ln, { opacity: 0, y: -20, filter: 'blur(6px)', duration: 0.04, ease: 'power2.in' }, at + 0.078);
      });

      // 0.46 - 0.66 : product glides to the left, peppercorns orbit it, the light deepens
      var parkX = function () { return mqMobile.matches ? 0 : -vw() * 0.30; };
      var parkY = function () { return mqMobile.matches ? -vh() * 0.17 : -vh() * 0.015; };

      tl.to(bgAlt, { opacity: 1, duration: 0.2, ease: 'power1.inOut' }, 0.46)
        .to(packet, { x: parkX, y: parkY, rotation: -6, scale: mqMobile.matches ? 0.7 : 0.8, duration: 0.18, ease: 'power2.inOut' }, 0.48)
        .to(shadow, { x: parkX, y: function () { return vh() * (mqMobile.matches ? 0.13 : 0.23); }, scale: 0.9, opacity: 0.32, duration: 0.18, ease: 'power2.inOut' }, 0.48)
        .to(orbiters.map(function (o) { return o.orb; }), { opacity: 1, duration: 0.06 }, 0.5)
        .to(packet, { keyframes: { rotationY: [0, 14, -14, 0] }, duration: 0.34, ease: 'sine.inOut' }, 0.6);
      orbiters.forEach(function (o) {
        tl.to(o.orb, { rotation: o.def.start + 300 * o.def.dir, duration: 0.5, ease: 'none' }, 0.5);
      });

      // 0.62 : the story reveal rises in the right-hand column
      tl.to(reveal, { opacity: 1, y: 0, duration: 0.1, ease: 'power3.out' }, 0.62);

      // 0.92 - 1 : ease the scene out for the hand-off to Turmeric
      tl.to([packet, shadow], { opacity: 0, duration: 0.1, ease: 'power1.in' }, 0.92)
        .to(reveal, { opacity: 0, y: -20, duration: 0.1 }, 0.92)
        .to(orbiters.map(function (o) { return o.orb; }), { opacity: 0, duration: 0.1 }, 0.92);
    })();

    /* ==================================================================
       ACT 2 — TURMERIC
       ================================================================== */
    (function turmericAct() {
      var sec = $('#act-turmeric');
      var vp = $('.act-viewport', sec);
      var packet = $('#turmericPacket');
      var shadow = $('#turmericShadow');
      var burst = $('#turmericBurst');
      var line = $('#turmericCopy .line');
      var reveal = $('#turmericReveal');
      var bgAlt = $('.act-bg-alt', sec);

      var bits = makeBits($('#turmericBits'), 'gold', 14);
      var fill = makeBits($('#turmericBits'), 'gold', 22);   // screen-fill sweep
      gsap.set(reveal, { opacity: 0, y: 30 });
      gsap.set(line, { opacity: 0, y: 20, filter: 'blur(6px)' });
      gsap.set(burst, { opacity: 0, scale: 0 });
      gsap.set(fill, { opacity: 0 });

      var tl = gsap.timeline({
        scrollTrigger: {
          trigger: sec, start: 'top top', end: '+=400%',
          pin: vp, scrub: 1, anticipatePin: 1, invalidateOnRefresh: true,
          onUpdate: function (self) {
            sec.classList.toggle('is-split', self.progress > 0.40);
            sec.classList.toggle('turmeric-lit', self.progress > 0.74);
          }
        }
      });

      fallInto(tl, { packet: packet, shadow: shadow, at: 0, dur: 0.2, spin: 14, blur: 12 });
      trail(tl, bits, { at: 0, dur: 0.2, spread: 0.22 });

      // powder burst on landing
      tl.to(burst, { opacity: 0.9, scale: 1, duration: 0.03, ease: 'power2.out' }, 0.19)
        .to(burst, { scale: 4.4, opacity: 0, duration: 0.1, ease: 'power2.out' }, 0.22);

      // product settles to hero position, clear of the caption
      tl.to(packet, { y: function () { return -vh() * 0.1; }, scale: 0.9, duration: 0.06, ease: 'power2.out' }, 0.2)
        .to(shadow, { y: function () { return vh() * 0.3; }, opacity: 0.28, duration: 0.06 }, 0.2);

      // "From earth's gold."
      tl.fromTo(line, { opacity: 0, y: 24, filter: 'blur(6px)' },
        { opacity: 1, y: 0, filter: 'blur(0px)', duration: 0.05 }, 0.26)
        .to(line, { opacity: 0, y: -18, filter: 'blur(6px)', duration: 0.05 }, 0.4);

      // 0.44 - 0.62 : packet glides to the left FIRST — then the reveal fades in already parked right
      var parkX = function () { return mqMobile.matches ? 0 : -vw() * 0.30; };
      var parkY = function () { return mqMobile.matches ? -vh() * 0.17 : -vh() * 0.015; };
      tl.to(packet, { x: parkX, y: parkY, rotation: -6, scale: mqMobile.matches ? 0.7 : 0.8, duration: 0.18, ease: 'power2.inOut' }, 0.44)
        .to(shadow, { x: parkX, y: function () { return vh() * (mqMobile.matches ? 0.13 : 0.23); }, scale: 0.9, opacity: 0.26, duration: 0.18, ease: 'power2.inOut' }, 0.44)
        .to(reveal, { opacity: 1, y: 0, duration: 0.1, ease: 'power3.out' }, 0.58);

      // 0.66 - 1 : golden particles sweep up, gold light fills the frame, then it all clears for Cashew
      var r = seed(42);
      fill.forEach(function (b, i) {
        var x = (r() - 0.5) * 1.1, sc = 0.6 + r() * 1.8;
        gsap.set(b, { xPercent: -50, yPercent: -50 });
        tl.fromTo(b,
          { x: function () { return vw() * x; }, y: function () { return vh() * (0.8 + r() * 0.5); }, scale: sc, opacity: 0, rotation: r() * 360 },
          { y: function () { return -vh() * (0.8 + r() * 0.6); }, opacity: 0.95, duration: 0.28, ease: 'power1.in' }, 0.66 + (i / fill.length) * 0.13)
          .to(b, { opacity: 0, duration: 0.1 }, 0.92 + (i / fill.length) * 0.05);
      });
      tl.to(bgAlt, { opacity: 1, duration: 0.16 }, 0.7)
        .to(bgAlt, { opacity: 0, duration: 0.16 }, 0.92)
        .to([packet, shadow], { opacity: 0, duration: 0.1 }, 0.92)
        .to(reveal, { opacity: 0, y: -20, duration: 0.12 }, 0.92);
    })();

    /* ==================================================================
       ACT 3 — CASHEW
       ================================================================== */
    (function cashewAct() {
      var sec = $('#act-cashew');
      var vp = $('.act-viewport', sec);
      var packet = $('#cashewPacket');
      var shadow = $('#cashewShadow');
      var line = $('#cashewCopy .line');
      var reveal = $('#cashewReveal');
      var bgAlt = $('.act-bg-alt', sec);

      // floating cashews at varied depth
      var floaters = makeBits($('#cashewBits'), 'cash', 7);
      var r = seed(17);
      floaters.forEach(function (b) {
        var x = (r() - 0.5) * 0.7, y = (r() - 0.5) * 0.9, sc = 0.5 + r() * 1.1;
        gsap.set(b, { xPercent: -50, yPercent: -50, x: vw() * x, y: vh() * y, scale: sc, opacity: 0.5 + r() * 0.4, rotation: r() * 360 });
        gsap.to(b, { y: '+=' + (18 + r() * 26), rotation: '+=' + (r() * 40 - 20), duration: 4 + r() * 4, ease: 'sine.inOut', yoyo: true, repeat: -1 });
      });
      var trailBits = makeBits($('#cashewBits'), 'cash', 6);

      gsap.set(reveal, { opacity: 0, y: 30 });
      gsap.set(line, { opacity: 0, y: 20, filter: 'blur(6px)' });

      var tl = gsap.timeline({
        scrollTrigger: {
          trigger: sec, start: 'top top', end: '+=380%',
          pin: vp, scrub: 1, anticipatePin: 1, invalidateOnRefresh: true,
          onUpdate: function (self) { sec.classList.toggle('is-split', self.progress > 0.5); }
        }
      });

      fallInto(tl, { packet: packet, shadow: shadow, at: 0, dur: 0.28, spin: 10, blur: 9, land: 0.84 });
      trail(tl, trailBits, { at: 0.02, dur: 0.26, spread: 0.18 });

      // product settles to hero position while the line reads
      tl.to(packet, { y: function () { return -vh() * 0.08; }, scale: 0.92, duration: 0.05, ease: 'power2.out' }, 0.26)
        .to(shadow, { y: function () { return vh() * 0.3; }, opacity: 0.26, duration: 0.05 }, 0.26)
        .fromTo(line, { opacity: 0, y: 24, filter: 'blur(6px)' },
          { opacity: 1, y: 0, filter: 'blur(0px)', duration: 0.06 }, 0.3)
        .to(line, { opacity: 0, y: -18, filter: 'blur(6px)', duration: 0.06 }, 0.46);

      // 0.48 - 0.66 : packet glides to the left, warm cashew light fills the frame
      var parkX = function () { return mqMobile.matches ? 0 : -vw() * 0.30; };
      var parkY = function () { return mqMobile.matches ? -vh() * 0.17 : -vh() * 0.015; };
      tl.to(bgAlt, { opacity: 1, duration: 0.2, ease: 'power1.inOut' }, 0.48)
        .to(packet, { x: parkX, y: parkY, rotation: -5, scale: mqMobile.matches ? 0.7 : 0.8, duration: 0.18, ease: 'power2.inOut' }, 0.5)
        .to(shadow, { x: parkX, y: function () { return vh() * (mqMobile.matches ? 0.13 : 0.23); }, scale: 0.9, opacity: 0.3, duration: 0.18, ease: 'power2.inOut' }, 0.5)
        .to(reveal, { opacity: 1, y: 0, duration: 0.1, ease: 'power3.out' }, 0.62);

      // 0.92 - 1 : ease the scene out for the hand-off to the collection
      tl.to([packet, shadow], { opacity: 0, duration: 0.1, ease: 'power1.in' }, 0.92)
        .to(reveal, { opacity: 0, y: -20, duration: 0.1 }, 0.92)
        .to(bgAlt, { opacity: 0, duration: 0.12 }, 0.92);
    })();

    /* ==================================================================
       ACT 4 — THREE PRODUCTS COLLECTION
       ================================================================== */
    (function collectionAct() {
      var sec = $('#act-collection');
      var vp = $('.act-viewport', sec);
      var row = $('#collectionRow');
      var packs = $$('.packet', row);
      var reveal = $('#collectionReveal');
      var bits = makeBits($('#collectionBits'), 'gold', 10);

      var starts = [
        { x: -0.42, y: -0.05, rot: -12 },   // pepper  -> left
        { x:  0.42, y: -0.05, rot:  12 },   // turmeric -> right
        { x:  0,    y:  0.46, rot:  0  }     // cashew  -> below
      ];
      packs.forEach(function (p, i) {
        gsap.set(p, { x: function () { return vw() * starts[i].x; }, y: function () { return vh() * starts[i].y; }, rotation: starts[i].rot, scale: 0.9 });
      });
      gsap.set(reveal, { opacity: 0, y: 30 });

      var r = seed(5);
      bits.forEach(function (b) {
        var x = (r() - 0.5) * 0.8, y = (r() - 0.5) * 0.8;
        gsap.set(b, { xPercent: -50, yPercent: -50, x: vw() * x, y: vh() * y, opacity: 0.35 + r() * 0.4, scale: 0.5 + r() });
        gsap.to(b, { y: '+=' + (14 + r() * 20), duration: 4 + r() * 3, ease: 'sine.inOut', yoyo: true, repeat: -1 });
      });

      var tl = gsap.timeline({
        scrollTrigger: {
          trigger: sec, start: 'top top', end: '+=300%',
          pin: vp, scrub: 1, anticipatePin: 1, invalidateOnRefresh: true
        }
      });

      gsap.set(row, { y: function () { return -vh() * 0.03; } });
      packs.forEach(function (p) {
        tl.to(p, { x: 0, y: 0, rotation: 0, scale: 0.86, ease: 'power2.inOut', duration: 0.6 }, 0);
      });
      tl.to(reveal, { opacity: 1, y: 0, duration: 0.2, ease: 'power3.out' }, 0.45);
    })();

    /* ==================================================================
       09 — FARM PARALLAX JOURNEY
       ================================================================== */
    (function farmJourney() {
      var farm = $('#farm');
      var journey = $('.farm-journey', farm);
      var stages = $$('.farm-stage', farm);
      if (!journey || !stages.length) return;

      /* --- sticky progress rail --- */
      var LABELS = ['Farm', 'Harvest', 'Select', 'Process', 'Pack', 'Kitchen'];
      var rail = doc.createElement('div');
      rail.className = 'farm-rail';
      rail.setAttribute('aria-hidden', 'true');
      rail.innerHTML =
        '<span class="fr-track"><span class="fr-fill"></span></span>' +
        '<ol class="fr-list">' + LABELS.map(function (l) {
          return '<li><i></i><b>' + l + '</b></li>';
        }).join('') + '</ol>';
      journey.appendChild(rail);
      var fill = $('.fr-fill', rail);
      var items = $$('.fr-list li', rail);

      stages.forEach(function (stage, i) {
        var bg = $('.farm-parallax', stage);
        var wrap = $('.wrap', stage);
        var num = $('.st-num', stage);
        var title = $('.st-title', stage);
        var desc = $('.st-desc', stage);

        /* oversized ghost number */
        var ghost = doc.createElement('div');
        ghost.className = 'st-ghost';
        ghost.setAttribute('aria-hidden', 'true');
        ghost.textContent = (i < 9 ? '0' : '') + (i + 1);
        stage.insertBefore(ghost, wrap);

        /* wrap the title text so it can slide up out of a mask */
        if (title && !title.firstElementChild) {
          title.innerHTML = '<span>' + title.textContent + '</span>';
        }
        var titleInner = title && title.firstElementChild;

        /* image — slow ken-burns push + drift */
        if (bg) {
          var sp = parseFloat(bg.getAttribute('data-speed')) || 0.12;
          gsap.fromTo(bg,
            { scale: 1.16, yPercent: -sp * 42 },
            {
              scale: 1, yPercent: sp * 42, ease: 'none',
              scrollTrigger: { trigger: stage, start: 'top bottom', end: 'bottom top', scrub: true }
            });
          gsap.fromTo(bg,
            { clipPath: 'inset(14% 16% 14% 16%)' },
            {
              clipPath: 'inset(0% 0% 0% 0%)', ease: 'power2.out',
              scrollTrigger: { trigger: stage, start: 'top 90%', end: 'top 38%', scrub: 0.6 }
            });
        }

        /* ghost number drifts against the scroll */
        gsap.fromTo(ghost,
          { yPercent: 26, opacity: 0 },
          {
            yPercent: -26, opacity: 1, ease: 'none',
            scrollTrigger: { trigger: stage, start: 'top bottom', end: 'bottom top', scrub: true }
          });

        /* content reveal */
        var rvl = gsap.timeline({ scrollTrigger: { trigger: wrap, start: 'top 74%' } });
        if (num) rvl.from(num, { opacity: 0, x: -26, duration: 0.6, ease: 'power2.out' });
        if (titleInner) rvl.from(titleInner, { yPercent: 118, duration: 0.9, ease: 'power4.out' }, '-=0.32');
        if (desc) rvl.from(desc, { opacity: 0, y: 26, duration: 0.7, ease: 'power2.out' }, '-=0.52');

        /* mark the active dot on the rail */
        ScrollTrigger.create({
          trigger: stage, start: 'top 55%', end: 'bottom 55%',
          onToggle: function (self) { items[i].classList.toggle('is-on', self.isActive); }
        });

        /* flip the rail to its dark palette over the cream final stage */
        if (stage.getAttribute('data-stage') === '5') {
          ScrollTrigger.create({
            trigger: stage, start: 'top 62%', end: 'bottom top',
            onToggle: function (self) { rail.classList.toggle('on-light', self.isActive); }
          });
        }
      });

      /* rail fill tracks progress through the whole journey */
      gsap.fromTo(fill, { height: '0%' }, {
        height: '100%', ease: 'none',
        scrollTrigger: { trigger: journey, start: 'top 62%', end: 'bottom 78%', scrub: true }
      });

      /* rail only visible while inside the journey */
      ScrollTrigger.create({
        trigger: journey, start: 'top 42%', end: 'bottom 58%',
        onToggle: function (self) { rail.classList.toggle('is-vis', self.isActive); }
      });
    })();

    /* ==================================================================
       10 — HORIZONTAL STORYTELLING
       ================================================================== */
    (function horizontal() {
      if (mqMobile.matches) return;
      var track = $('#horizonTrack');
      var amount = function () { return Math.max(0, track.scrollWidth - vw()); };
      var htween = gsap.to(track, {
        x: function () { return -amount(); },
        ease: 'none',
        scrollTrigger: {
          trigger: '#horizon', start: 'top top',
          end: function () { return '+=' + amount(); },
          pin: true, scrub: 1, anticipatePin: 1, invalidateOnRefresh: true
        }
      });
      $$('.hpanel').forEach(function (panel) {
        gsap.fromTo(panel.children,
          { opacity: 0, y: 46 },
          {
            opacity: 1, y: 0, duration: 1, stagger: 0.08, ease: 'power3.out',
            scrollTrigger: { trigger: panel, containerAnimation: htween, start: 'left 74%' }
          });
      });
    })();

    /* ==================================================================
       12 — BRAND STATEMENT
       ================================================================== */
    (function statement() {
      gsap.set('.statement h2 .ln span', { yPercent: 110 });
      gsap.to('.statement h2 .ln span', {
        yPercent: 0, ease: 'power3.out', duration: 1, stagger: 0.16,
        scrollTrigger: { trigger: '#statement', start: 'top 68%' }
      });
      gsap.to('#statementWords span', {
        opacity: 1, y: 0, ease: 'power3.out', duration: 0.9, stagger: 0.22,
        scrollTrigger: { trigger: '#statementWords', start: 'top 82%' }
      });
    })();

    /* ==================================================================
       13 — QUALITY CARDS
       ================================================================== */
    gsap.to('.q-card', {
      opacity: 1, y: 0, ease: 'power3.out', duration: 0.9, stagger: 0.14,
      scrollTrigger: { trigger: '.quality-grid', start: 'top 80%' }
    });

    /* ==================================================================
       14 — FINAL MOMENT
       ================================================================== */
    (function finalMoment() {
      gsap.set(['.final-logo', '.final h2', '.final .sub', '.final .btn', '.site-foot'], { opacity: 0, y: 24 });
      gsap.timeline({
        scrollTrigger: { trigger: '#final', start: 'top 70%', end: 'top 20%', scrub: 0.6 }
      })
        .to('.final-logo', { opacity: 1, y: 0, duration: 0.4, ease: 'power3.out' })
        .to('.final h2', { opacity: 1, y: 0, duration: 0.3 }, 0.35)
        .to('.final .sub', { opacity: 1, y: 0, duration: 0.3 }, 0.5)
        .to('.final .btn', { opacity: 1, y: 0, duration: 0.3 }, 0.62)
        .to('.site-foot', { opacity: 1, y: 0, duration: 0.3 }, 0.72);
    })();

    /* ---- kick off ---- */
    heroIntro();
    ScrollTrigger.refresh();
    window.addEventListener('load', function () { ScrollTrigger.refresh(); });
  }

  /* ======================================================================
     BOOT
     ====================================================================== */
  function boot() {
    if (reduced || noGSAP) lightMode();
    else fullMode();
  }
  if (doc.readyState === 'loading') doc.addEventListener('DOMContentLoaded', boot);
  else boot();
})();
