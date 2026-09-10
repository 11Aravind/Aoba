/**
 * AOBA E-Commerce Store & Interaction Manager
 * Handles Cart Drawer, Quick View Modal, Toast Messages, and Kerala Ambient Soundscape
 */

export const PRODUCTS_DATA = [
  {
    id: 'pepper-500g',
    name: 'AOBA Black Pepper',
    tagline: 'Bold flavour. Naturally grown.',
    weight: '500 g',
    price: 480,
    rating: '4.95 ★ (280+ Reviews)',
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
    name: 'AOBA Turmeric Powder',
    tagline: 'Golden goodness from nature.',
    weight: '500 g',
    price: 390,
    rating: '4.98 ★ (340+ Reviews)',
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
    name: 'AOBA Cashew Nuts',
    tagline: 'Naturally rich. Simply delicious.',
    weight: '500 g',
    price: 650,
    rating: '4.93 ★ (190+ Reviews)',
    origin: 'Kollam Coast, Kerala',
    altitude: 'Coastal Microclimate',
    harvest: 'Small Batch Roasted 2026',
    image: 'assets/cashew-500g.png',
    description: 'King-sized W-180 whole cashews from Kerala’s heritage coastal orchards. Hand-cracked and gently steam-cured to preserve their natural sweetness and velvety buttery texture.',
    notes: ['Jumbo W-180 Whole Kernels', 'Natural Buttery Sweetness', 'Zero Preservatives'],
    pairings: ['Luxury Charcuterie Boards', 'Kerala Payasam Desserts', 'Wholesome Healthy Snacking']
  }
];

export class AobaStore {
  constructor() {
    this.cart = [
      { product: PRODUCTS_DATA[0], qty: 1 } // Start with 1 Black Pepper in cart for immediate delight
    ];
    this.audioContext = null;
    this.isPlayingSound = false;
    this.soundNodes = [];
    
    this.initElements();
    this.bindEvents();
    this.renderCart();
  }

  initElements() {
    this.cartDrawer = document.getElementById('cart-drawer');
    this.cartOverlay = document.getElementById('cart-overlay');
    this.cartItemsList = document.getElementById('cart-items-list');
    this.cartCountBadge = document.getElementById('cart-count-badge');
    this.cartSubtotal = document.getElementById('cart-subtotal');
    this.cartGrandTotal = document.getElementById('cart-grand-total');
    this.shippingFill = document.getElementById('shipping-bar-fill');
    this.shippingText = document.getElementById('shipping-status-text');

    this.quickViewOverlay = document.getElementById('quick-view-overlay');
    this.quickViewContainer = document.getElementById('quick-view-content');

    this.soundToggleBtn = document.getElementById('sound-toggle-btn');
    this.toastEl = document.getElementById('site-toast');
  }

  bindEvents() {
    // Open/Close Cart
    document.querySelectorAll('[data-action="open-cart"]').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        this.openCart();
      });
    });

    document.querySelectorAll('[data-action="close-cart"]').forEach(btn => {
      btn.addEventListener('click', () => this.closeCart());
    });

    if (this.cartOverlay) {
      this.cartOverlay.addEventListener('click', () => this.closeCart());
    }

    // Add to cart buttons
    document.querySelectorAll('[data-action="add-to-cart"]').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const prodId = btn.getAttribute('data-product-id');
        this.addToCart(prodId);
      });
    });

    // Quick View buttons
    document.querySelectorAll('[data-action="quick-view"]').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const prodId = btn.getAttribute('data-product-id');
        this.openQuickView(prodId);
      });
    });

    // Quick View Close
    document.querySelectorAll('[data-action="close-quick-view"]').forEach(btn => {
      btn.addEventListener('click', () => this.closeQuickView());
    });

    if (this.quickViewOverlay) {
      this.quickViewOverlay.addEventListener('click', (e) => {
        if (e.target === this.quickViewOverlay) this.closeQuickView();
      });
    }

    // Sound toggle
    if (this.soundToggleBtn) {
      this.soundToggleBtn.addEventListener('click', () => this.toggleSound());
    }

    // Checkout button
    const checkoutBtn = document.getElementById('checkout-btn');
    if (checkoutBtn) {
      checkoutBtn.addEventListener('click', () => {
        this.closeCart();
        this.showToast('🌿 Order confirmed! Sourcing fresh spices from Kerala.');
      });
    }

    // Newsletter submit
    const newsletterForm = document.getElementById('newsletter-form');
    if (newsletterForm) {
      newsletterForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const input = newsletterForm.querySelector('input');
        if (input && input.value) {
          this.showToast(`Welcome to AOBA, ${input.value}! 10% coupon emailed.`);
          input.value = '';
        }
      });
    }
  }

  showToast(message) {
    if (!this.toastEl) return;
    this.toastEl.textContent = message;
    this.toastEl.classList.add('show');
    clearTimeout(this.toastTimeout);
    this.toastTimeout = setTimeout(() => {
      this.toastEl.classList.remove('show');
    }, 3800);
  }

  openCart() {
    this.cartDrawer?.classList.add('open');
    this.cartOverlay?.classList.add('open');
    document.body.style.overflow = 'hidden';
  }

  closeCart() {
    this.cartDrawer?.classList.remove('open');
    this.cartOverlay?.classList.remove('open');
    document.body.style.overflow = '';
  }

  addToCart(productId) {
    const product = PRODUCTS_DATA.find(p => p.id === productId);
    if (!product) return;

    const existing = this.cart.find(item => item.product.id === productId);
    if (existing) {
      existing.qty += 1;
    } else {
      this.cart.push({ product, qty: 1 });
    }

    this.renderCart();
    this.openCart();
    this.showToast(`Added ${product.name} to your basket!`);
  }

  updateQty(productId, delta) {
    const itemIndex = this.cart.findIndex(i => i.product.id === productId);
    if (itemIndex > -1) {
      this.cart[itemIndex].qty += delta;
      if (this.cart[itemIndex].qty <= 0) {
        this.cart.splice(itemIndex, 1);
      }
      this.renderCart();
    }
  }

  removeItem(productId) {
    this.cart = this.cart.filter(i => i.product.id !== productId);
    this.renderCart();
  }

  renderCart() {
    const totalCount = this.cart.reduce((sum, item) => sum + item.qty, 0);
    const subtotal = this.cart.reduce((sum, item) => sum + (item.product.price * item.qty), 0);

    if (this.cartCountBadge) {
      this.cartCountBadge.textContent = totalCount;
    }

    if (this.cartSubtotal) {
      this.cartSubtotal.textContent = `₹${subtotal.toLocaleString('en-IN')}`;
    }

    if (this.cartGrandTotal) {
      this.cartGrandTotal.textContent = `₹${subtotal.toLocaleString('en-IN')}`;
    }

    // Free shipping threshold (₹999)
    const threshold = 999;
    if (this.shippingFill && this.shippingText) {
      if (subtotal >= threshold || totalCount === 0) {
        this.shippingFill.style.width = '100%';
        this.shippingText.textContent = totalCount === 0 
          ? 'Free express shipping on orders over ₹999' 
          : '🎉 You have unlocked Free Kerala Express Shipping!';
      } else {
        const remaining = threshold - subtotal;
        const pct = Math.min(100, Math.round((subtotal / threshold) * 100));
        this.shippingFill.style.width = `${pct}%`;
        this.shippingText.textContent = `Add ₹${remaining} more for Free Kerala Express Delivery`;
      }
    }

    // Render items list
    if (this.cartItemsList) {
      if (this.cart.length === 0) {
        this.cartItemsList.innerHTML = `
          <div style="text-align: center; padding: 48px 0; color: #888;">
            <p style="font-family: var(--font-serif); font-size: 1.2rem; margin-bottom: 8px;">Your basket is empty.</p>
            <p style="font-size: 0.85rem;">Discover our authentic spices from Kerala.</p>
          </div>
        `;
        return;
      }

      this.cartItemsList.innerHTML = this.cart.map(item => `
        <div class="cart-item">
          <img src="${item.product.image}" alt="${item.product.name}" class="cart-item-img">
          <div>
            <h4 class="cart-item-title">${item.product.name}</h4>
            <div class="cart-item-price">₹${item.product.price} · <span style="font-weight: 400; color: #777;">${item.product.weight}</span></div>
            <div class="cart-qty-ctrls">
              <button class="qty-btn" data-action="decrease-qty" data-id="${item.product.id}">-</button>
              <span class="qty-display">${item.qty}</span>
              <button class="qty-btn" data-action="increase-qty" data-id="${item.product.id}">+</button>
            </div>
          </div>
          <button class="cart-item-remove" data-action="remove-item" data-id="${item.product.id}" title="Remove">✕</button>
        </div>
      `).join('');

      // Bind dynamic item buttons
      this.cartItemsList.querySelectorAll('[data-action="increase-qty"]').forEach(b => {
        b.addEventListener('click', () => this.updateQty(b.getAttribute('data-id'), 1));
      });
      this.cartItemsList.querySelectorAll('[data-action="decrease-qty"]').forEach(b => {
        b.addEventListener('click', () => this.updateQty(b.getAttribute('data-id'), -1));
      });
      this.cartItemsList.querySelectorAll('[data-action="remove-item"]').forEach(b => {
        b.addEventListener('click', () => this.removeItem(b.getAttribute('data-id')));
      });
    }
  }

  openQuickView(productId) {
    const product = PRODUCTS_DATA.find(p => p.id === productId);
    if (!product || !this.quickViewContainer) return;

    this.quickViewContainer.innerHTML = `
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
        <div class="price-tag" style="margin-bottom: 16px;">₹${product.price} <span style="font-size: 0.9rem; color: #888; font-weight: 400;">(${product.weight})</span></div>
        <p class="product-desc" style="color: #4a5a50; margin-bottom: 20px;">${product.description}</p>
        
        <div style="margin-bottom: 20px;">
          <h5 style="font-size: 0.75rem; letter-spacing: 0.1em; text-transform: uppercase; color: var(--c-gold); margin-bottom: 8px;">Botanical & Terroir Profile</h5>
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

        <button class="btn btn-primary" data-action="modal-add-to-cart" style="background: var(--c-forest-dark); color: #fff; width: 100%;">
          Add to Basket · ₹${product.price}
        </button>
      </div>
    `;

    const addBtn = this.quickViewContainer.querySelector('[data-action="modal-add-to-cart"]');
    if (addBtn) {
      addBtn.addEventListener('click', () => {
        this.addToCart(product.id);
        this.closeQuickView();
      });
    }

    this.quickViewOverlay?.classList.add('open');
    document.body.style.overflow = 'hidden';
  }

  closeQuickView() {
    this.quickViewOverlay?.classList.remove('open');
    document.body.style.overflow = '';
  }

  toggleSound() {
    if (this.isPlayingSound) {
      this.stopSoundscape();
    } else {
      this.startSoundscape();
    }
  }

  startSoundscape() {
    try {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (!this.audioContext) {
        this.audioContext = new AudioCtx();
      }
      if (this.audioContext.state === 'suspended') {
        this.audioContext.resume();
      }

      // Generate gentle pink noise for Kerala mist & soothing rainforest breeze
      const bufferSize = this.audioContext.sampleRate * 2;
      const noiseBuffer = this.audioContext.createBuffer(1, bufferSize, this.audioContext.sampleRate);
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

      const whiteNoise = this.audioContext.createBufferSource();
      whiteNoise.buffer = noiseBuffer;
      whiteNoise.loop = true;

      // Filter to create warm soothing rain in foliage
      const filter = this.audioContext.createBiquadFilter();
      filter.type = 'lowpass';
      filter.frequency.value = 850;

      const gain = this.audioContext.createGain();
      gain.gain.setValueAtTime(0.01, this.audioContext.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.08, this.audioContext.currentTime + 2);

      whiteNoise.connect(filter);
      filter.connect(gain);
      gain.connect(this.audioContext.destination);
      whiteNoise.start();

      this.soundNodes = [whiteNoise, gain];
      this.isPlayingSound = true;
      this.soundToggleBtn?.classList.add('playing');
      this.showToast('🌧️ Kerala Rainforest ambient sound enabled');
    } catch (e) {
      console.warn('Audio contextual initialization:', e);
    }
  }

  stopSoundscape() {
    if (this.soundNodes && this.soundNodes.length > 0) {
      const [source, gain] = this.soundNodes;
      if (gain && this.audioContext) {
        gain.gain.exponentialRampToValueAtTime(0.001, this.audioContext.currentTime + 0.5);
        setTimeout(() => {
          try { source.stop(); } catch(err){}
        }, 550);
      }
    }
    this.isPlayingSound = false;
    this.soundToggleBtn?.classList.remove('playing');
    this.showToast('Ambient sound paused');
  }
}
