/**
 * AOBA Brand Experience - Comprehensive Luxury Animation & Store Engine
 * Includes custom magnetic cursor, 3D card tilt, weight recalculation,
 * stage quick tabs, recipe modal, audio soundscape, and promo code cart system.
 */

(function () {
  'use strict';

  // --- Product Catalog Data ---
  const PRODUCTS = [
    {
      id: 'pepper-500g',
      prefix: 'pepper',
      name: 'AOBA Black Pepper',
      tagline: 'Bold flavour. Naturally grown.',
      weight: '500 g',
      price: 480,
      currentWeight: '500 g',
      currentPrice: 480,
      origin: 'Wayanad, Kerala',
      altitude: '950m Above Sea Level',
      harvest: 'Winter Harvest 2025/26',
      image: 'assets/black-pepper-500g.png',
      description: 'Single-estate Tellicherry Grade black pepper handpicked from old-growth vines in the mist-veiled hills of Wayanad. Boasts intense warmth, woody pine undertones, and a punchy piperine profile.',
      notes: ['Crisp Tellicherry Punch', 'Smoked Oak & Pine', 'High Piperine Heat'],
      pairings: ['Slow-cooked Kerala Stew', 'Artisan Steaks & Roasts', 'Cardamom Tea Infusions']
    },
    {
      id: 'turmeric-500g',
      prefix: 'turmeric',
      name: 'AOBA Turmeric Powder',
      tagline: 'Golden goodness from nature.',
      weight: '500 g',
      price: 390,
      currentWeight: '500 g',
      currentPrice: 390,
      origin: 'Alleppey & Wayanad, Kerala',
      altitude: 'River Basin Organic Soils',
      harvest: 'Sun-cured 2026',
      image: 'assets/turmeric-500g.png',
      description: 'High-curcumin (5.2% verified) heirloom turmeric rhizomes, sun-dried on organic palm mats and cold-milled to protect the volatile essential oils and earthy amber vitality.',
      notes: ['5.2% Curcumin Potency', 'Earthy Amber Floral', 'Zero Artificial Pigments'],
      pairings: ['Golden Turmeric Elixir / Milk', 'Traditional Kerala Curries', 'Morning Herbal Brews']
    },
    {
      id: 'cashew-500g',
      prefix: 'cashew',
      name: 'AOBA Cashew Nuts',
      tagline: 'Naturally rich. Simply delicious.',
      weight: '500 g',
      price: 650,
      currentWeight: '500 g',
      currentPrice: 650,
      origin: 'Kollam Coast, Kerala',
      altitude: 'Coastal Microclimate',
      harvest: 'Small Batch Roasted 2026',
      image: 'assets/cashew-500g.png',
      description: 'King-sized W-180 whole cashews from Kerala’s heritage coastal orchards. Hand-cracked and gently steam-cured to preserve their natural sweetness and velvety buttery texture.',
      notes: ['Jumbo W-180 Whole Kernels', 'Natural Buttery Sweetness', 'Zero Preservatives'],
      pairings: ['Luxury Charcuterie Boards', 'Kerala Payasam Desserts', 'Wholesome Healthy Snacking']
    }
  ];

  // --- Recipes Catalog Data ---
  const RECIPES_DATA = {
    pepper: {
      badge: '🌿 Tellicherry Black Pepper',
      title: 'Wayanad Pepper Crusted Filet Mignon & Forest Morels',
      time: '⏱️ 25 Mins · Chef Masterclass',
      serves: '2 Servings',
      desc: 'The essential Malabar culinary technique: high-piperine Tellicherry peppercorns coarse-crushed in brass mortar to create a fragrant, spicy caramelized bark.',
      ingredients: [
        '2 tbsp AOBA Black Pepper (Tellicherry Grade), coarsely cracked',
        '2 Grass-fed beef tenderloin steaks (or Portobello mushroom steaks)',
        '3 tbsp Cultured Kerala farm butter',
        '150g Fresh morel / cremini mushrooms',
        '60ml Dry red wine & splash of aged balsamic',
        'Sea salt & fresh sprigs of thyme'
      ],
      steps: [
        'Generously roll steaks into cracked AOBA black pepper until evenly crusted.',
        'Sear in smoking cast iron skillet for 3 mins each side until deep golden bark forms.',
        'Baste with foamy herb butter, remove steaks to rest.',
        'Sauté wild morels in pan drippings, deglaze with red wine, reduce to a velvety glaze.'
      ],
      spiceId: 'pepper-500g'
    },
    turmeric: {
      badge: '☀️ High-Curcumin Turmeric',
      title: 'Alleppey Golden Coconut & Turmeric Seafood Moilee',
      time: '⏱️ 30 Mins · Heritage Coastline Classic',
      serves: '4 Servings',
      desc: 'An iconic Syrian Christian & Malabar recipe celebrating the earthy, golden warmth of high-curcumin Kerala turmeric stewed in fresh coconut extract.',
      ingredients: [
        '1.5 tsp AOBA Turmeric Powder (5.2% Curcumin)',
        '400ml Fresh thick & thin coconut milk',
        '500g Fresh Kingfish or Tiger Prawns',
        '2 Shallots thinly sliced & 4 green chillies slit',
        '1 tbsp Cold-pressed coconut oil',
        'Fresh curry leaves & ginger batons'
      ],
      steps: [
        'Marinate seafood with 1/2 tsp AOBA turmeric and sea salt for 10 mins.',
        'Sauté shallots, ginger, and curry leaves in warm coconut oil until translucent.',
        'Whisk AOBA turmeric into thin coconut milk, bring to gentle simmer.',
        'Slide fish in, finish with thick coconut cream and lemon squeeze. Serve with Appams.'
      ],
      spiceId: 'turmeric-500g'
    },
    cashew: {
      badge: '🌰 King W-180 Cashews',
      title: 'Slow-Roasted Cashew & Saffron Honey Tart',
      time: '⏱️ 40 Mins · Luxury Artisanal Confection',
      serves: '6 Servings',
      desc: 'King W-180 whole cashews caramelized with wild forest honey, crushed cardamom, and ghee atop a crumbly almond-flour crust.',
      ingredients: [
        '250g AOBA Cashew Nuts (King W-180 Whole)',
        '120g Raw wild honey or palm jaggery syrup',
        '3 tbsp Pure A2 cow ghee',
        '1/2 tsp Ground cardamom & saffron threads',
        '1 pre-baked 8-inch tart shell'
      ],
      steps: [
        'Lightly oven-toast AOBA whole cashews at 160°C for 8 minutes until golden.',
        'Melt ghee and honey in heavy pan with crushed cardamom until bubbly caramel forms.',
        'Toss whole toasted cashews in golden glaze until evenly coated.',
        'Spoon into tart shell, chill for 20 mins, slice and serve with vanilla bean cream.'
      ],
      spiceId: 'cashew-500g'
    }
  };

  // --- Cart State ---
  let cart = [
    { product: PRODUCTS[0], qty: 1, weight: '500 g', price: 480 }
  ];
  let activeDiscountRate = 0;

  // --- Ambient Web Audio Soundscape ---
  let audioContext = null;
  let isPlayingSound = false;
  let soundNodes = [];

  function initApp() {
    initCursor();
    initParticles();
    initStickyNav();
    initProgressBar();
    initStore();
    initAnimations();
    initWeightSelectors();
    initCardTilt();
    initRecipesModal();
    initStageTabs();
    initTerroirMatrix();
    initInstantPromoChip();
    initMobileMenu();
    console.log('🌿 AOBA Full Luxury Experience initialized.');
  }

  // ==========================================
  // 0. Custom Magnetic Luxury Cursor
  // ==========================================
  function initCursor() {
    const dot = document.getElementById('cursor-dot');
    const ring = document.getElementById('cursor-ring');
    if (!dot || !ring) return;

    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;
    let ringX = mouseX;
    let ringY = mouseY;

    window.addEventListener('mousemove', (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      dot.style.transform = `translate(${mouseX}px, ${mouseY}px) translate(-50%, -50%)`;
    }, { passive: true });

    function renderRing() {
      ringX += (mouseX - ringX) * 0.18;
      ringY += (mouseY - ringY) * 0.18;
      ring.style.transform = `translate(${ringX}px, ${ringY}px) translate(-50%, -50%)`;
      requestAnimationFrame(renderRing);
    }
    renderRing();

    // Hover triggers
    const hoverElements = document.querySelectorAll('a, button, .luxury-card, .recipe-card, .stage-tab-pill, .stage-step-dot, .terroir-tab-btn, .sensory-pill, .promo-chip, .weight-opt-btn');
    hoverElements.forEach(el => {
      el.addEventListener('mouseenter', () => ring.classList.add('hovered'));
      el.addEventListener('mouseleave', () => ring.classList.remove('hovered'));
    });
  }

  // ==========================================
  // 1. Ambient Particles Canvas
  // ==========================================
  function initParticles() {
    const canvas = document.getElementById('ambient-canvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    let mouseX = width / 2;
    let mouseY = height / 2;

    const count = window.innerWidth < 768 ? 20 : 50;
    const particles = [];

    class Particle {
      constructor() { this.reset(true); }
      reset(initial) {
        this.x = Math.random() * width;
        this.y = initial ? Math.random() * height : height + 15;
        this.size = Math.random() * 3.5 + 1.2;
        this.speedY = Math.random() * 0.4 + 0.15;
        this.speedX = (Math.random() - 0.5) * 0.3;
        this.rotation = Math.random() * Math.PI * 2;
        this.rotationSpeed = (Math.random() - 0.5) * 0.02;
        this.alpha = Math.random() * 0.4 + 0.1;
        this.type = Math.random() > 0.45 ? 'gold' : Math.random() > 0.3 ? 'pepper' : 'leaf';
      }
      update() {
        this.y -= this.speedY;
        this.x += this.speedX;
        this.rotation += this.rotationSpeed;

        const dx = mouseX - this.x;
        const dy = mouseY - this.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 110) {
          this.x -= (dx / dist) * 0.8;
          this.y -= (dy / dist) * 0.8;
        }

        if (this.y < -20 || this.x < -20 || this.x > width + 20) {
          this.reset(false);
        }
      }
      draw(ctx) {
        ctx.save();
        ctx.translate(this.x, this.y);
        ctx.rotate(this.rotation);
        ctx.globalAlpha = this.alpha;

        if (this.type === 'gold') {
          ctx.fillStyle = '#dfb56c';
          ctx.shadowColor = '#cba258';
          ctx.shadowBlur = 5;
          ctx.beginPath();
          ctx.arc(0, 0, this.size * 0.8, 0, Math.PI * 2);
          ctx.fill();
        } else if (this.type === 'pepper') {
          ctx.fillStyle = '#0a1a12';
          ctx.strokeStyle = 'rgba(203, 162, 88, 0.45)';
          ctx.lineWidth = 0.5;
          ctx.beginPath();
          ctx.arc(0, 0, this.size * 1.1, 0, Math.PI * 2);
          ctx.fill();
          ctx.stroke();
        } else {
          ctx.fillStyle = '#2c6348';
          ctx.beginPath();
          ctx.moveTo(0, -this.size * 2);
          ctx.quadraticCurveTo(this.size * 1.5, 0, 0, this.size * 2);
          ctx.quadraticCurveTo(-this.size * 1.5, 0, 0, -this.size * 2);
          ctx.fill();
        }
        ctx.restore();
      }
    }

    for (let i = 0; i < count; i++) {
      particles.push(new Particle());
    }

    window.addEventListener('resize', () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    }, { passive: true });

    window.addEventListener('mousemove', (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    }, { passive: true });

    function render() {
      ctx.clearRect(0, 0, width, height);
      for (let i = 0; i < particles.length; i++) {
        particles[i].update();
        particles[i].draw(ctx);
      }
      requestAnimationFrame(render);
    }
    render();
  }

  // ==========================================
  // 2. Navigation Bar
  // ==========================================
  function initStickyNav() {
    const header = document.getElementById('site-header');
    window.addEventListener('scroll', () => {
      if (window.scrollY > 30) {
        header?.classList.add('scrolled');
      } else {
        header?.classList.remove('scrolled');
      }
    }, { passive: true });
  }

  // ==========================================
  // 3. Store, Cart Drawer & Modals
  // ==========================================
  function initStore() {
    const cartDrawer = document.getElementById('cart-drawer');
    const cartOverlay = document.getElementById('cart-overlay');
    const cartItemsList = document.getElementById('cart-items-list');
    const cartBadge = document.getElementById('cart-count-badge');
    const cartGrandTotal = document.getElementById('cart-grand-total');
    const shippingBar = document.getElementById('shipping-bar-fill');
    const shippingText = document.getElementById('shipping-status-text');

    const promoInp = document.getElementById('cart-promo-input');
    const promoBtn = document.getElementById('cart-promo-btn');
    const discountRow = document.getElementById('cart-discount-row');
    const discountAmt = document.getElementById('cart-discount-amt');

    const quickViewOverlay = document.getElementById('quick-view-overlay');
    const quickViewContent = document.getElementById('quick-view-content');
    const toast = document.getElementById('site-toast');

    function showToast(msg) {
      if (!toast) return;
      toast.textContent = msg;
      toast.classList.add('show');
      clearTimeout(window._toastTimer);
      window._toastTimer = setTimeout(() => toast.classList.remove('show'), 3500);
    }

    function openCart() {
      cartDrawer?.classList.add('open');
      cartOverlay?.classList.add('open');
      document.body.style.overflow = 'hidden';
    }

    function closeCart() {
      cartDrawer?.classList.remove('open');
      cartOverlay?.classList.remove('open');
      document.body.style.overflow = '';
    }

    function renderCart() {
      const totalCount = cart.reduce((sum, i) => sum + i.qty, 0);
      const grossSubtotal = cart.reduce((sum, i) => sum + (i.price * i.qty), 0);
      const discountVal = Math.round(grossSubtotal * activeDiscountRate);
      const netTotal = grossSubtotal - discountVal;

      if (cartBadge) cartBadge.textContent = totalCount;
      if (cartGrandTotal) cartGrandTotal.textContent = `₹${netTotal.toLocaleString('en-IN')}`;

      if (discountRow && discountAmt) {
        if (activeDiscountRate > 0) {
          discountRow.style.display = 'flex';
          discountAmt.textContent = `-₹${discountVal.toLocaleString('en-IN')}`;
        } else {
          discountRow.style.display = 'none';
        }
      }

      // Free shipping progress bar (threshold 999)
      if (shippingBar && shippingText) {
        if (grossSubtotal >= 999 || totalCount === 0) {
          shippingBar.style.width = '100%';
          shippingText.textContent = totalCount === 0
            ? 'Free express shipping on orders over ₹999'
            : '🎉 You unlocked Free Kerala Express Delivery!';
        } else {
          const rem = 999 - grossSubtotal;
          const pct = Math.round((grossSubtotal / 999) * 100);
          shippingBar.style.width = `${pct}%`;
          shippingText.textContent = `Add ₹${rem} more for Free Express Delivery`;
        }
      }

      if (cartItemsList) {
        if (cart.length === 0) {
          cartItemsList.innerHTML = `
            <div style="text-align: center; padding: 48px 0; color: #888;">
              <p style="font-family: var(--font-serif); font-size: 1.2rem; margin-bottom: 8px;">Your basket is empty.</p>
              <p style="font-size: 0.85rem;">Discover our authentic single-origin Kerala spices.</p>
            </div>
          `;
          return;
        }

        cartItemsList.innerHTML = cart.map(item => `
          <div class="cart-item">
            <img src="${item.product.image}" alt="${item.product.name}" class="cart-item-img">
            <div>
              <h4 class="cart-item-title">${item.product.name}</h4>
              <div class="cart-item-price">₹${item.price} · <span style="font-weight: 500; color: #667;">${item.weight}</span></div>
              <div class="cart-qty-ctrls">
                <button class="qty-btn" data-cart-action="dec" data-id="${item.product.id}" data-w="${item.weight}">-</button>
                <span class="qty-display">${item.qty}</span>
                <button class="qty-btn" data-cart-action="inc" data-id="${item.product.id}" data-w="${item.weight}">+</button>
              </div>
            </div>
            <button class="cart-item-remove" data-cart-action="del" data-id="${item.product.id}" data-w="${item.weight}" title="Remove">✕</button>
          </div>
        `).join('');

        cartItemsList.querySelectorAll('[data-cart-action="inc"]').forEach(btn => {
          btn.addEventListener('click', () => {
            const id = btn.getAttribute('data-id');
            const w = btn.getAttribute('data-w');
            const item = cart.find(i => i.product.id === id && i.weight === w);
            if (item) { item.qty += 1; renderCart(); }
          });
        });

        cartItemsList.querySelectorAll('[data-cart-action="dec"]').forEach(btn => {
          btn.addEventListener('click', () => {
            const id = btn.getAttribute('data-id');
            const w = btn.getAttribute('data-w');
            const idx = cart.findIndex(i => i.product.id === id && i.weight === w);
            if (idx > -1) {
              cart[idx].qty -= 1;
              if (cart[idx].qty <= 0) cart.splice(idx, 1);
              renderCart();
            }
          });
        });

        cartItemsList.querySelectorAll('[data-cart-action="del"]').forEach(btn => {
          btn.addEventListener('click', () => {
            const id = btn.getAttribute('data-id');
            const w = btn.getAttribute('data-w');
            cart = cart.filter(i => !(i.product.id === id && i.weight === w));
            renderCart();
          });
        });
      }
    }

    function triggerFlyingSpiceParticles(startEl) {
      const badge = document.getElementById('cart-count-badge');
      if (!badge) return;

      const badgeRect = badge.getBoundingClientRect();
      const targetX = badgeRect.left + badgeRect.width / 2;
      const targetY = badgeRect.top + badgeRect.height / 2;

      let startX = window.innerWidth / 2;
      let startY = window.innerHeight / 2;

      if (startEl && startEl.getBoundingClientRect) {
        const r = startEl.getBoundingClientRect();
        startX = r.left + r.width / 2;
        startY = r.top + r.height / 2;
      }

      for (let i = 0; i < 6; i++) {
        const p = document.createElement('div');
        p.className = 'flying-spice-particle';
        const jitterX = (Math.random() - 0.5) * 36;
        const jitterY = (Math.random() - 0.5) * 36;
        const curX = startX + jitterX;
        const curY = startY + jitterY;

        p.style.left = `${curX}px`;
        p.style.top = `${curY}px`;
        p.style.setProperty('--dx', `${targetX - curX}px`);
        p.style.setProperty('--dy', `${targetY - curY}px`);
        p.style.animationDelay = `${i * 0.05}s`;

        document.body.appendChild(p);
        setTimeout(() => p.remove(), 900);
      }

      setTimeout(() => {
        badge.classList.remove('bump');
        void badge.offsetWidth;
        badge.classList.add('bump');
      }, 500);
    }

    function addToCart(productId, customWeight = null, customPrice = null, triggerBtn = null) {
      const product = PRODUCTS.find(p => p.id === productId || p.prefix === productId);
      if (!product) return;

      const chosenWeight = customWeight || product.currentWeight || '500 g';
      const chosenPrice = customPrice || product.currentPrice || product.price;

      const existing = cart.find(i => i.product.id === product.id && i.weight === chosenWeight);
      if (existing) {
        existing.qty += 1;
      } else {
        cart.push({ product, qty: 1, weight: chosenWeight, price: chosenPrice });
      }

      triggerFlyingSpiceParticles(triggerBtn);
      renderCart();
      openCart();
      showToast(`Added ${product.name} (${chosenWeight}) to basket!`);
    }

    // Promo Code handling
    if (promoBtn && promoInp) {
      promoBtn.addEventListener('click', () => {
        const val = promoInp.value.trim().toUpperCase();
        if (val === 'KERALA10') {
          activeDiscountRate = 0.10;
          renderCart();
          showToast('🎉 Promo code KERALA10 applied: 10% off!');
          promoInp.disabled = true;
          promoBtn.textContent = 'Applied';
        } else {
          showToast('Invalid code. Try KERALA10 for 10% off.');
        }
      });
    }

    function openQuickView(productId) {
      const product = PRODUCTS.find(p => p.id === productId || p.prefix === productId);
      if (!product || !quickViewContent) return;

      quickViewContent.innerHTML = `
        <div class="quick-view-media">
          <img src="${product.image}" alt="${product.name}">
        </div>
        <div class="quick-view-body">
          <div class="product-index-tag">
            <span class="tag-dot"></span>
            <span>${product.origin}</span>
          </div>
          <h3 class="product-title" style="font-size: 2.2rem; margin-bottom: 8px;">${product.name}</h3>
          <p class="product-subtitle" style="font-size: 1.15rem; margin-bottom: 16px;">${product.tagline}</p>
          <div class="price-tag" style="margin-bottom: 16px;">₹${product.currentPrice || product.price} <span style="font-size: 0.9rem; color: #888; font-weight: 400;">(${product.currentWeight || product.weight})</span></div>
          <p class="product-desc" style="color: #4a5a50; margin-bottom: 20px;">${product.description}</p>
          
          <div style="margin-bottom: 20px;">
            <h5 style="font-size: 0.75rem; letter-spacing: 0.1em; text-transform: uppercase; color: var(--c-gold); margin-bottom: 8px;">Terroir & Provenance</h5>
            <div class="product-specs">
              <span class="spec-pill" style="color: #1b3827; border-color: #d1c6b2;">📍 Terroir: ${product.origin}</span>
              <span class="spec-pill" style="color: #1b3827; border-color: #d1c6b2;">⛰️ Altitude: ${product.altitude}</span>
              <span class="spec-pill" style="color: #1b3827; border-color: #d1c6b2;">🌿 ${product.harvest}</span>
            </div>
          </div>

          <div style="margin-bottom: 24px;">
            <h5 style="font-size: 0.75rem; letter-spacing: 0.1em; text-transform: uppercase; color: var(--c-gold); margin-bottom: 8px;">Tasting & Aroma Highlights</h5>
            <ul style="padding-left: 20px; font-size: 0.88rem; color: #4a5a50; line-height: 1.7;">
              ${product.notes.map(n => `<li>${n}</li>`).join('')}
            </ul>
          </div>

          <button class="btn btn-primary" id="modal-add-btn" style="background: var(--c-forest-dark); color: #fff; width: 100%;">
            Add to Basket · ₹${product.currentPrice || product.price}
          </button>
        </div>
      `;

      document.getElementById('modal-add-btn')?.addEventListener('click', (e) => {
        addToCart(product.id, product.currentWeight, product.currentPrice, e.target);
        closeQuickView();
      });

      quickViewOverlay?.classList.add('open');
      document.body.style.overflow = 'hidden';
    }

    function closeQuickView() {
      quickViewOverlay?.classList.remove('open');
      document.body.style.overflow = '';
    }

    // Bindings
    document.querySelectorAll('[data-action="open-cart"]').forEach(b => {
      b.addEventListener('click', (e) => { e.preventDefault(); openCart(); });
    });
    document.querySelectorAll('[data-action="close-cart"]').forEach(b => {
      b.addEventListener('click', closeCart);
    });
    cartOverlay?.addEventListener('click', closeCart);

    document.querySelectorAll('[data-action="add-to-cart"]').forEach(b => {
      b.addEventListener('click', () => {
        const prodId = b.getAttribute('data-product-id');
        addToCart(prodId, null, null, b);
      });
    });

    document.querySelectorAll('[data-action="quick-view"]').forEach(b => {
      b.addEventListener('click', () => openQuickView(b.getAttribute('data-product-id')));
    });
    document.querySelectorAll('[data-action="close-quick-view"]').forEach(b => {
      b.addEventListener('click', closeQuickView);
    });
    quickViewOverlay?.addEventListener('click', (e) => {
      if (e.target === quickViewOverlay) closeQuickView();
    });

    document.getElementById('checkout-btn')?.addEventListener('click', () => {
      closeCart();
      showToast('🌿 Order confirmed! Sourcing fresh spices directly from Kerala.');
    });

    document.getElementById('newsletter-form')?.addEventListener('submit', (e) => {
      e.preventDefault();
      const inp = e.target.querySelector('input');
      if (inp?.value) {
        showToast(`Welcome to AOBA, ${inp.value}! 10% welcome coupon sent.`);
        inp.value = '';
      }
    });

    // Soundscape Toggle
    const soundBtn = document.getElementById('sound-toggle-btn');
    soundBtn?.addEventListener('click', () => {
      if (isPlayingSound) {
        stopSoundscape();
        soundBtn.classList.remove('playing');
        showToast('Soundscape paused');
      } else {
        startSoundscape();
        soundBtn.classList.add('playing');
        showToast('🌧️ Kerala Rainforest soundscape active');
      }
    });

    renderCart();
  }

  function startSoundscape() {
    try {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (!audioContext) audioContext = new AudioCtx();
      if (audioContext.state === 'suspended') audioContext.resume();

      const bufferSize = audioContext.sampleRate * 2;
      const noiseBuffer = audioContext.createBuffer(1, bufferSize, audioContext.sampleRate);
      const output = noiseBuffer.getChannelData(0);
      let b0 = 0, b1 = 0, b2 = 0, b3 = 0, b4 = 0, b5 = 0, b6 = 0;
      for (let i = 0; i < bufferSize; i++) {
        const white = Math.random() * 2 - 1;
        b0 = 0.99886 * b0 + white * 0.0555179;
        b1 = 0.99332 * b1 + white * 0.0750759;
        b2 = 0.96900 * b2 + white * 0.1538520;
        b3 = 0.86650 * b3 + white * 0.3104856;
        b4 = 0.55000 * b4 + white * 0.5329522;
        b5 = -0.7616 * b5 - white * 0.0168980;
        output[i] = (b0 + b1 + b2 + b3 + b4 + b5 + b6 + white * 0.5362) * 0.035;
        b6 = white * 0.115926;
      }

      const whiteNoise = audioContext.createBufferSource();
      whiteNoise.buffer = noiseBuffer;
      whiteNoise.loop = true;

      const filter = audioContext.createBiquadFilter();
      filter.type = 'lowpass';
      filter.frequency.value = 850;

      const gain = audioContext.createGain();
      gain.gain.setValueAtTime(0.01, audioContext.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.08, audioContext.currentTime + 2);

      whiteNoise.connect(filter);
      filter.connect(gain);
      gain.connect(audioContext.destination);
      whiteNoise.start();

      soundNodes = [whiteNoise, gain];
      isPlayingSound = true;
    } catch (e) {
      console.warn('Soundscape error:', e);
    }
  }

  function stopSoundscape() {
    if (soundNodes.length > 0) {
      const [src, gain] = soundNodes;
      if (gain && audioContext) {
        gain.gain.exponentialRampToValueAtTime(0.001, audioContext.currentTime + 0.4);
        setTimeout(() => { try { src.stop(); } catch(err){} }, 450);
      }
    }
    isPlayingSound = false;
  }

  // ==========================================
  // 4. Weight Selectors (Interactive Price Updates)
  // ==========================================
  function initWeightSelectors() {
    const weightButtons = document.querySelectorAll('.weight-opt-btn');
    weightButtons.forEach(btn => {
      btn.addEventListener('click', () => {
        const parent = btn.closest('.weight-selector-pills');
        const prod = btn.getAttribute('data-prod');
        const weight = btn.getAttribute('data-weight');
        const price = parseInt(btn.getAttribute('data-price'), 10);

        parent.querySelectorAll('.weight-opt-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        const priceEl = document.getElementById(`price-${prod}`);
        const weightLabel = document.getElementById(`weight-label-${prod}`);
        if (priceEl) priceEl.textContent = `₹${price}`;
        if (weightLabel) weightLabel.textContent = `${weight} Pouch`;

        const prodObj = PRODUCTS.find(p => p.prefix === prod);
        if (prodObj) {
          prodObj.currentWeight = `${weight}`;
          prodObj.currentPrice = price;
        }
      });
    });
  }

  // ==========================================
  // 5. 3D Card Tilt with Interactive Specular Glare
  // ==========================================
  function initCardTilt() {
    const cards = document.querySelectorAll('.luxury-card, .recipe-card');
    cards.forEach(card => {
      card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = (e.clientX - rect.left) / rect.width - 0.5;
        const y = (e.clientY - rect.top) / rect.height - 0.5;
        card.style.transform = `perspective(1000px) rotateY(${x * 8}deg) rotateX(${-y * 8}deg) translateY(-8px)`;
      });
      card.addEventListener('mouseleave', () => {
        card.style.transform = '';
      });
    });
  }

  // ==========================================
  // 6. Recipe Details Modal
  // ==========================================
  function initRecipesModal() {
    const overlay = document.getElementById('recipe-modal-overlay');
    const content = document.getElementById('recipe-modal-content');
    if (!overlay || !content) return;

    document.querySelectorAll('[data-action="quick-recipe"]').forEach(btn => {
      btn.addEventListener('click', () => {
        const key = btn.getAttribute('data-recipe');
        const r = RECIPES_DATA[key];
        if (!r) return;

        content.innerHTML = `
          <div class="product-index-tag">
            <span class="tag-dot"></span>
            <span>${r.badge}</span>
          </div>
          <h3 class="product-title" style="font-size: 2rem; margin-bottom: 10px;">${r.title}</h3>
          <p class="product-subtitle" style="font-size: 1rem; margin-bottom: 16px; color: var(--c-gold-bright);">${r.time} · ${r.serves}</p>
          <p class="product-desc" style="color: #4a5a50; margin-bottom: 24px;">${r.desc}</p>
          
          <div style="margin-bottom: 20px;">
            <h5 style="font-size: 0.8rem; letter-spacing: 0.1em; text-transform: uppercase; color: var(--c-forest-dark); margin-bottom: 10px; font-weight: 700;">Key Ingredients:</h5>
            <ul style="padding-left: 20px; font-size: 0.9rem; color: #3a4a40; line-height: 1.8;">
              ${r.ingredients.map(i => `<li>${i}</li>`).join('')}
            </ul>
          </div>

          <div style="margin-bottom: 28px;">
            <h5 style="font-size: 0.8rem; letter-spacing: 0.1em; text-transform: uppercase; color: var(--c-forest-dark); margin-bottom: 10px; font-weight: 700;">Chef Method:</h5>
            <ol style="padding-left: 20px; font-size: 0.9rem; color: #3a4a40; line-height: 1.8;">
              ${r.steps.map(s => `<li>${s}</li>`).join('')}
            </ol>
          </div>

          <button class="btn btn-primary" id="recipe-add-spice-btn" style="background: var(--c-forest-dark); color: #fff; width: 100%;">
            + Add Spice for This Recipe to Basket
          </button>
        `;

        document.getElementById('recipe-add-spice-btn')?.addEventListener('click', () => {
          const prod = PRODUCTS.find(p => p.id === r.spiceId);
          if (prod) {
            cart.push({ product: prod, qty: 1, weight: prod.currentWeight || '500 g', price: prod.currentPrice || prod.price });
            const cartDrawer = document.getElementById('cart-drawer');
            const cartOverlay = document.getElementById('cart-overlay');
            cartDrawer?.classList.add('open');
            cartOverlay?.classList.add('open');
            const toast = document.getElementById('site-toast');
            if (toast) {
              toast.textContent = `Added ${prod.name} for recipe!`;
              toast.classList.add('show');
              setTimeout(() => toast.classList.remove('show'), 3500);
            }
          }
          overlay.classList.remove('open');
          document.body.style.overflow = '';
        });

        overlay.classList.add('open');
        document.body.style.overflow = 'hidden';
      });
    });

    document.querySelectorAll('[data-action="close-recipe-modal"]').forEach(b => {
      b.addEventListener('click', () => {
        overlay.classList.remove('open');
        document.body.style.overflow = '';
      });
    });

    overlay.addEventListener('click', (e) => {
      if (e.target === overlay) {
        overlay.classList.remove('open');
        document.body.style.overflow = '';
      }
    });
  }

  // ==========================================
  // 7. Stage Tabs Quick Switcher
  // ==========================================
  function initStageTabs() {
    const tabs = document.querySelectorAll('.stage-tab-pill');
    tabs.forEach(tab => {
      tab.addEventListener('click', () => {
        const step = parseInt(tab.getAttribute('data-step') || '0', 10);
        tabs.forEach(t => t.classList.remove('active'));
        tab.classList.add('active');

        const trig = typeof ScrollTrigger !== 'undefined' 
          ? ScrollTrigger.getAll().find(t => t.vars.trigger === '.experience-pinned-section') 
          : null;

        if (trig) {
          const targetY = trig.start + (trig.end - trig.start) * (step === 0 ? 0.15 : step === 1 ? 0.5 : 0.85);
          window.scrollTo({ top: targetY, behavior: 'smooth' });
        }
      });
    });
  }

  // ==========================================
  // 8. GSAP Scroll Animations & Timeline
  // ==========================================
  function initAnimations() {
    if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') {
      console.warn('GSAP or ScrollTrigger not loaded yet.');
      return;
    }

    gsap.registerPlugin(ScrollTrigger);

    let lenis = null;
    if (typeof Lenis !== 'undefined') {
      lenis = new Lenis({
        duration: 1.2,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        orientation: 'vertical',
        gestureOrientation: 'vertical',
        smoothWheel: true,
      });

      lenis.on('scroll', ScrollTrigger.update);
      gsap.ticker.add((time) => lenis.raf(time * 1000));
      gsap.ticker.lagSmoothing(0);
    }

    // Hero Timeline
    const heroTl = gsap.timeline({ defaults: { ease: 'power3.out' } });
    heroTl
      .fromTo('.hero-origin-pill', { opacity: 0, y: -20, scale: 0.9 }, { opacity: 1, y: 0, scale: 1, duration: 0.9, delay: 0.1 })
      .fromTo('.hero-logo-wrap', { opacity: 0, scale: 0.82, y: 30 }, { opacity: 1, scale: 1, y: 0, duration: 1.3, ease: 'back.out(1.2)' }, '-=0.5')
      .fromTo('.hero-crest-ring', { opacity: 0, scale: 0.7, rotation: -45 }, { opacity: 1, scale: 1, rotation: 0, duration: 1.5 }, '-=1.2')
      .fromTo('.hero-tagline', { opacity: 0, y: 25 }, { opacity: 1, y: 0, duration: 1 }, '-=0.8')
      .fromTo('.hero-subtext', { opacity: 0, y: 15 }, { opacity: 1, y: 0, duration: 0.8 }, '-=0.6')
      .fromTo('.hero-highlight-item', { opacity: 0, y: 15, scale: 0.95 }, { opacity: 1, y: 0, scale: 1, duration: 0.6, stagger: 0.12 }, '-=0.5')
      .fromTo('.hero-cta-group .btn', { opacity: 0, y: 18 }, { opacity: 1, y: 0, duration: 0.7, stagger: 0.15 }, '-=0.4')
      .fromTo('.hero-scroll-cue', { opacity: 0 }, { opacity: 0.8, duration: 0.7 }, '-=0.2');

    // Hero 3D Parallax
    const heroSec = document.querySelector('.hero-section');
    const logoWrap = document.getElementById('hero-logo-wrap');
    const heroLeaves = document.querySelectorAll('.hero-leaf');
    if (heroSec && logoWrap) {
      heroSec.addEventListener('mousemove', (e) => {
        const rect = heroSec.getBoundingClientRect();
        const x = (e.clientX - rect.left) / rect.width - 0.5;
        const y = (e.clientY - rect.top) / rect.height - 0.5;
        
        gsap.to(logoWrap, {
          rotationY: x * 18,
          rotationX: -y * 18,
          transformPerspective: 700,
          duration: 0.5,
          ease: 'power2.out'
        });

        heroLeaves.forEach((leaf, i) => {
          const factor = (i + 1) * 16;
          gsap.to(leaf, {
            x: -x * factor,
            y: -y * factor,
            duration: 0.7,
            ease: 'power2.out'
          });
        });
      });

      heroSec.addEventListener('mouseleave', () => {
        gsap.to(logoWrap, {
          rotationY: 0,
          rotationX: 0,
          duration: 0.9,
          ease: 'power2.out'
        });
        heroLeaves.forEach(leaf => {
          gsap.to(leaf, { x: 0, y: 0, duration: 0.9, ease: 'power2.out' });
        });
      });
    }

    // Hero on-scroll scale down
    gsap.to('.hero-logo-img', {
      scrollTrigger: {
        trigger: '.hero-section',
        start: 'top top',
        end: 'bottom top',
        scrub: true
      },
      scale: 0.7,
      y: 70,
      opacity: 0.3
    });

    // Pinned Apple-style Product Experience
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
      const stageTabs = document.querySelectorAll('.stage-tab-pill');

      function updateActiveProduct(idx) {
        dots.forEach((d, i) => d.classList.toggle('active', i === idx));
        stageTabs.forEach((t, i) => t.classList.toggle('active', i === idx));

        copyPepper?.classList.toggle('active', idx === 0);
        copyTurmeric?.classList.toggle('active', idx === 1);
        copyCashew?.classList.toggle('active', idx === 2);

        if (backdrop) {
          backdrop.className = 'stage-backdrop ' + 
            (idx === 0 ? 'pepper-mode' : idx === 1 ? 'turmeric-mode' : 'cashew-mode');
        }
        if (auraGlow) {
          auraGlow.className = 'product-aura-glow ' + 
            (idx === 0 ? 'aura-pepper' : idx === 1 ? 'aura-turmeric' : 'aura-cashew');
        }
      }

      gsap.set(pouchPepper, { xPercent: 120, yPercent: 15, rotation: 12, scale: 0.85, opacity: 0 });
      gsap.set(pouchTurmeric, { xPercent: 0, yPercent: 120, rotation: -8, scale: 0.8, opacity: 0 });
      gsap.set(pouchCashew, { xPercent: -120, yPercent: 10, rotation: -10, scale: 0.85, opacity: 0 });

      const masterTimeline = gsap.timeline({
        scrollTrigger: {
          trigger: '.experience-pinned-section',
          start: 'top top',
          end: '+=340%',
          pin: true,
          scrub: 1,
          anticipatePin: 1,
          onUpdate: (self) => {
            const p = self.progress;
            if (p < 0.35) updateActiveProduct(0);
            else if (p < 0.7) updateActiveProduct(1);
            else updateActiveProduct(2);
          }
        }
      });

      masterTimeline
        .to(pouchPepper, { xPercent: 0, yPercent: 0, rotation: 0, scale: 1, opacity: 1, duration: 2, ease: 'power2.out' })
        .to(pouchPepper, { scale: 1.04, yPercent: -2, duration: 1.5, ease: 'none' })
        .to(pouchPepper, { xPercent: -60, scale: 0.75, rotation: -8, opacity: 0, duration: 1.8, ease: 'power2.in' })
        .to(pouchTurmeric, { yPercent: 0, rotation: 0, scale: 1, opacity: 1, duration: 2, ease: 'power2.out' }, '-=1.2')
        .to(pouchTurmeric, { scale: 1.05, yPercent: -3, duration: 1.5, ease: 'none' })
        .to(pouchTurmeric, { yPercent: -80, scale: 0.78, rotation: 6, opacity: 0, duration: 1.8, ease: 'power2.in' })
        .to(pouchCashew, { xPercent: 0, yPercent: 0, rotation: 0, scale: 1, opacity: 1, duration: 2, ease: 'power2.out' }, '-=1.2')
        .to(pouchCashew, { scale: 1.04, yPercent: -2, duration: 1.5, ease: 'none' });

      dots.forEach(dot => {
        dot.addEventListener('click', () => {
          const step = parseInt(dot.getAttribute('data-step') || '0', 10);
          const trig = ScrollTrigger.getAll().find(t => t.vars.trigger === '.experience-pinned-section');
          if (trig) {
            const targetY = trig.start + (trig.end - trig.start) * (step === 0 ? 0.15 : step === 1 ? 0.5 : 0.85);
            if (lenis) lenis.scrollTo(targetY, { duration: 1.4 });
            else window.scrollTo({ top: targetY, behavior: 'smooth' });
          }
        });
      });
    }

    // Farm journey progress
    const nodes = document.querySelectorAll('.stage-node-card');
    nodes.forEach(node => {
      ScrollTrigger.create({
        trigger: node,
        start: 'top 75%',
        onEnter: () => node.classList.add('active'),
        onLeaveBack: () => node.classList.remove('active')
      });
    });

    // Smooth Anchor scrolling
    document.querySelectorAll('a[href^="#"]').forEach(a => {
      a.addEventListener('click', (e) => {
        const target = a.getAttribute('href');
        if (target && target !== '#') {
          const el = document.querySelector(target);
          if (el) {
            e.preventDefault();
            if (lenis) lenis.scrollTo(el, { offset: -60, duration: 1.3 });
            else el.scrollIntoView({ behavior: 'smooth' });
          }
        }
      });
    });
  }

  // ==========================================
  // 9. Mobile Menu
  // ==========================================
  function initMobileMenu() {
    const btn = document.getElementById('mobile-menu-btn');
    const links = document.querySelector('.nav-links');
    if (!btn || !links) return;

    btn.addEventListener('click', () => {
      const active = links.classList.contains('mobile-active');
      if (active) {
        links.classList.remove('mobile-active');
        links.removeAttribute('style');
      } else {
        links.classList.add('mobile-active');
        links.style.cssText = `
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

    links.querySelectorAll('a').forEach(a => {
      a.addEventListener('click', () => {
        links.classList.remove('mobile-active');
        links.removeAttribute('style');
      });
    });
  }

  // ==========================================
  // 10. Top Reading & Exploration Progress Bar
  // ==========================================
  function initProgressBar() {
    const bar = document.getElementById('scroll-progress-bar');
    if (!bar) return;

    window.addEventListener('scroll', () => {
      const scrollTotal = document.documentElement.scrollHeight - window.innerHeight;
      if (scrollTotal > 0) {
        const pct = Math.min(100, Math.max(0, (window.scrollY / scrollTotal) * 100));
        bar.style.width = `${pct}%`;
      }
    }, { passive: true });
  }

  // ==========================================
  // 11. Instant 1-Click Promo Code Chip
  // ==========================================
  function initInstantPromoChip() {
    const chip = document.getElementById('quick-promo-chip');
    const promoInp = document.getElementById('cart-promo-input');
    const promoBtn = document.getElementById('cart-promo-btn');
    if (!chip || !promoInp || !promoBtn) return;

    chip.addEventListener('click', () => {
      promoInp.value = 'KERALA10';
      promoBtn.click();
      chip.innerHTML = '✓ Code <strong>KERALA10</strong> Activated!';
      chip.style.borderColor = '#27ae60';
      chip.style.background = 'rgba(39, 174, 96, 0.25)';
    });
  }

  // ==========================================
  // 12. Kerala Terroir & Sensory Flavor Matrix
  // ==========================================
  const TERROIR_DATA = {
    pepper: {
      title: "Wayanad Highlands Terroir",
      originLabel: "Wayanad Highlands · Single Estate 950m ASL",
      soil: "🌋 Mineral Red Laterite",
      climate: "🌧️ 3,400mm Monsoon",
      cycle: "☀️ Bamboo Sun-Curing",
      desc: "Perched at 950 meters in the misty Western Ghats, ancient metamorphic soils and heavy southwest monsoon rains combine to concentrate extraordinary piperine levels inside Tellicherry black peppercorns.",
      polyPoints: "200,50 330,130 290,250 200,340 85,270 75,130",
      dots: [
        { cx: 200, cy: 50 },
        { cx: 330, cy: 130 },
        { cx: 290, cy: 250 },
        { cx: 200, cy: 340 },
        { cx: 85, cy: 270 },
        { cx: 75, cy: 130 }
      ],
      notes: ["Smoked Cedar", "Floral Pine", "Sharp Piperine", "Citrus Top-Note", "Sun-Dried Husk"],
      metrics: [
        { name: "Piperine Content", val: "6.8% (Benchmark: 4.0%)", pct: "92%" },
        { name: "Essential Volatile Oils", val: "3.4% v/w", pct: "88%" },
        { name: "Moisture Integrity", val: "< 10% (Zero Mold Risk)", pct: "95%" }
      ],
      pairingTitle: "Master Chef Pairing",
      pairingText: "Coarse-crushed over grass-fed steaks, slow mutton roasts, and winter mushroom broths.",
      btnText: "+ Add Wayanad Pepper to Basket",
      productId: "pepper-500g"
    },
    turmeric: {
      title: "Alleppey Alluvial Soils Terroir",
      originLabel: "Alleppey River Basin · 5.2% Active Curcumin",
      soil: "🌱 Humus-Rich Alluvium",
      climate: "☀️ Tropical Sun & Mist",
      cycle: "🌿 Cold-Milled Whole",
      desc: "Nourished by the fertile river plains of Alleppey and sun-baked on woven palm mats, this indigenous heirloom rhizome produces world-famous golden curcumin concentration without bitter aftertaste.",
      polyPoints: "200,100 310,140 330,270 200,320 65,275 110,150",
      dots: [
        { cx: 200, cy: 100 },
        { cx: 310, cy: 140 },
        { cx: 330, cy: 270 },
        { cx: 200, cy: 320 },
        { cx: 65, cy: 275 },
        { cx: 110, cy: 150 }
      ],
      notes: ["Earthy Amber", "Warm Ginger Root", "Active Curcumin", "Golden Floral", "Subtle Peppercorn"],
      metrics: [
        { name: "Active Curcumin", val: "5.2% (Benchmark: 2.5%)", pct: "98%" },
        { name: "Essential Turmerone", val: "4.1% Bioactive Oils", pct: "94%" },
        { name: "Purity & Non-Irradiated", val: "100% Certified Pure", pct: "100%" }
      ],
      pairingTitle: "Ayurvedic & Culinary Pairing",
      pairingText: "Silky coconut milk seafood moilee, golden immune elixirs, and roasted heirloom vegetables.",
      btnText: "+ Add Alleppey Turmeric to Basket",
      productId: "turmeric-500g"
    },
    cashew: {
      title: "Kollam Heritage Coastal Groves",
      originLabel: "Kollam Coast · Jumbo W-180 Whole",
      soil: "🏖️ Sandy Loam Microclimate",
      climate: "🌊 Sea-Breeze Humid Warm",
      cycle: "🔥 Steam-Cured Artisanal",
      desc: "Ancient coastal cashew orchards kissed by Arabian Sea salt mists produce the rarest W-180 King jumbo grade — revered globally for its sweet buttery mouthfeel and crunchy whole kernels.",
      polyPoints: "200,160 270,165 240,230 200,290 120,240 65,120",
      dots: [
        { cx: 200, cy: 160 },
        { cx: 270, cy: 165 },
        { cx: 240, cy: 230 },
        { cx: 200, cy: 290 },
        { cx: 120, cy: 240 },
        { cx: 65, cy: 120 }
      ],
      notes: ["Sweet Cream", "Roasted Macadamia", "Delicate Salt Spray", "Crisp Kernel", "Natural Ghee Note"],
      metrics: [
        { name: "King Kernel Grade", val: "W-180 Whole (< 180 nuts/lb)", pct: "96%" },
        { name: "Natural Oleic Acid", val: "46% Heart-Healthy Fats", pct: "92%" },
        { name: "Crunch & Moisture Balance", val: "Grade A Crispy", pct: "98%" }
      ],
      pairingTitle: "Artisanal Confection Pairing",
      pairingText: "Slow-caramelized with wild cardamom honey into festive tarts or enjoyed raw as a mindful snack.",
      btnText: "+ Add Kollam Cashews to Basket",
      productId: "cashew-500g"
    }
  };

  function initTerroirMatrix() {
    const tabs = document.querySelectorAll('.terroir-tab-btn');
    if (!tabs.length) return;

    tabs.forEach(tab => {
      tab.addEventListener('click', () => {
        const key = tab.getAttribute('data-terroir');
        const data = TERROIR_DATA[key];
        if (!data) return;

        tabs.forEach(t => t.classList.remove('active'));
        tab.classList.add('active');

        // Update left radar visualizer
        const poly = document.getElementById('radar-data-poly');
        if (poly) poly.setAttribute('points', data.polyPoints);

        data.dots.forEach((d, idx) => {
          const dot = document.getElementById(`dot-${idx}`);
          if (dot) {
            dot.setAttribute('cx', d.cx);
            dot.setAttribute('cy', d.cy);
          }
        });

        const titleEl = document.getElementById('radar-title');
        const originEl = document.getElementById('radar-origin-label');
        if (titleEl) titleEl.textContent = `${data.title} Matrix`;
        if (originEl) originEl.textContent = data.originLabel;

        const notesContainer = document.getElementById('radar-notes-cloud');
        if (notesContainer) {
          notesContainer.innerHTML = data.notes.map(n => `<span class="sensory-pill active">${n}</span>`).join('');
        }

        // Update right details
        const infoTitle = document.getElementById('terroir-info-title');
        const infoDesc = document.getElementById('terroir-info-desc');
        const soilBadge = document.getElementById('terroir-soil-badge');
        const climateBadge = document.getElementById('terroir-climate-badge');
        const cycleBadge = document.getElementById('terroir-cycle-badge');

        if (infoTitle) infoTitle.textContent = data.title;
        if (infoDesc) infoDesc.textContent = data.desc;
        if (soilBadge) soilBadge.textContent = data.soil;
        if (climateBadge) climateBadge.textContent = data.climate;
        if (cycleBadge) cycleBadge.textContent = data.cycle;

        data.metrics.forEach((m, idx) => {
          const nameEl = document.getElementById(`metric-${idx + 1}-name`);
          const valEl = document.getElementById(`metric-${idx + 1}-val`);
          const barEl = document.getElementById(`metric-${idx + 1}-bar`);
          if (nameEl) nameEl.textContent = m.name;
          if (valEl) valEl.textContent = m.val;
          if (barEl) barEl.style.width = m.pct;
        });

        const pairingTitle = document.getElementById('terroir-pairing-title');
        const pairingText = document.getElementById('terroir-pairing-text');
        if (pairingTitle) pairingTitle.textContent = data.pairingTitle;
        if (pairingText) pairingText.textContent = data.pairingText;

        const basketBtn = document.getElementById('terroir-basket-btn');
        if (basketBtn) {
          basketBtn.textContent = data.btnText;
          basketBtn.setAttribute('data-product-id', data.productId);
        }
      });
    });

    const terroirBasketBtn = document.getElementById('terroir-basket-btn');
    if (terroirBasketBtn) {
      terroirBasketBtn.addEventListener('click', () => {
        const prodId = terroirBasketBtn.getAttribute('data-product-id');
        const prod = PRODUCTS.find(p => p.id === prodId || p.prefix === prodId);
        if (prod) {
          cart.push({ product: prod, qty: 1, weight: prod.currentWeight || '500 g', price: prod.currentPrice || prod.price });
          triggerFlyingSpiceParticles(terroirBasketBtn);
          const cartDrawer = document.getElementById('cart-drawer');
          const cartOverlay = document.getElementById('cart-overlay');
          cartDrawer?.classList.add('open');
          cartOverlay?.classList.add('open');
          const toast = document.getElementById('site-toast');
          if (toast) {
            toast.textContent = `Added ${prod.name} to basket!`;
            toast.classList.add('show');
            setTimeout(() => toast.classList.remove('show'), 3500);
          }
        }
      });
    }
  }

  // Auto-init
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initApp);
  } else {
    initApp();
  }
})();
