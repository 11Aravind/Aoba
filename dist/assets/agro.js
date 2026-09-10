/**
 * AOBA AGRO & FARM SUPPLY — E-COMMERCE JAVASCRIPT
 * Catalog management, reactive filtering, interactive cart, and WhatsApp checkout.
 */

// 1. PRODUCT CATALOG DATA
const AGRO_PRODUCTS = [
  {
    id: "gb-hdpe-set",
    name: "AOBA Heavy-Duty UV Grow Bags (Set of 10)",
    category: "growbags",
    categoryLabel: "Grow Bags & Planters",
    badge: "bestseller",
    badgeText: "Best Seller",
    price: 699,
    mrp: 1199,
    image: "assets/agro-grow-bags.jpg",
    specsHighlight: "240 GSM • UV Stabilized 5-Year Life",
    rating: 4.9,
    reviews: 142,
    inStock: true,
    description: "Premium UV-stabilized 240 GSM high-density polyethylene grow bags engineered for Kerala monsoon and extreme sun. Ideal for pepper vines, terrace gardening, vegetables, and ginger.",
    specs: {
      "Material": "Virgin HDPE 240 GSM UV-Treated",
      "Pack Size": "10 Bags (12x12 & 15x15 inches combo)",
      "Drainage": "Multi-hole aerated base with reinforced handles",
      "Durability": "5 to 7 Years in tropical outdoor conditions",
      "Origin": "Made in Kerala"
    }
  },
  {
    id: "tool-pro-shears",
    name: "AOBA Pro Titanium Bypass Pruning Shears",
    category: "tools",
    categoryLabel: "Farm & Pruning Tools",
    badge: "heavy-duty",
    badgeText: "Pro Grade",
    price: 849,
    mrp: 1399,
    image: "assets/agro-farm-tools.jpg",
    specsHighlight: "SK5 Japanese Steel • Non-slip Grip",
    rating: 4.8,
    reviews: 89,
    inStock: true,
    description: "Razor-sharp orchard pruning shears with titanium-coated SK5 high carbon steel blade. Designed for effortless trimming of pepper vines, coffee bushes, fruit trees, and nursery grafting.",
    specs: {
      "Blade Type": "SK5 High Carbon Steel with Titanium Coat",
      "Cutting Capacity": "Up to 25mm diameter branches",
      "Handle": "Ergonomic aluminum alloy with rubberized grip",
      "Safety Lock": "One-hand thumb latch mechanism",
      "Warranty": "2 Years AOBA Farm Guarantee"
    }
  },
  {
    id: "mach-pulverizer-3hp",
    name: "AOBA 3 HP Stainless Spice Pulverizer",
    category: "machines",
    categoryLabel: "Agro Machinery",
    badge: "subsidy",
    badgeText: "Govt Subsidy 40%",
    price: 34999,
    mrp: 42000,
    image: "assets/agro-spice-machine.jpg",
    specsHighlight: "3 HP Copper Motor • 40 kg/hr output",
    rating: 5.0,
    reviews: 34,
    inStock: true,
    description: "Heavy-duty commercial continuous-feed spice grinder machine for turmeric roots, black pepper, cardamom, and dry chillies. Features food-grade SS-304 contact parts and dual-stage cyclone collector.",
    specs: {
      "Motor Power": "3 HP Single / 3-Phase 100% Pure Copper",
      "Crushing Chamber": "Food-grade SS 304 with hardened beaters",
      "Output Capacity": "30 - 45 kg per hour (mesh adjustable)",
      "Cooling": "Continuous airflow cooling (preserves essential oils)",
      "Warranty": "3-Year Motor & Machine Warranty"
    }
  },
  {
    id: "bio-neem-coco-combo",
    name: "Organic Neem Cake & Compressed Coco-Peat Block (5kg)",
    category: "bio",
    categoryLabel: "Bio-Inputs & Nutrients",
    badge: "organic",
    badgeText: "100% Organic",
    price: 499,
    mrp: 750,
    image: "assets/agro-coco-peat.jpg",
    specsHighlight: "Low EC (<0.5) • Expands to 75 Litres",
    rating: 4.9,
    reviews: 215,
    inStock: true,
    description: "Sterilized washed coco-peat block paired with pure cold-pressed neem cake powder. Enriches soil microbiology, retains moisture, and naturally repels subterranean nematodes and root pests.",
    specs: {
      "Composition": "100% Natural Coconut Coir Pith + Cold Pressed Neem",
      "Expansion Ratio": "1 : 15 (Yields ~75 Litres soil volume)",
      "EC Level": "Washed, Low EC (< 0.5 mS/cm)",
      "Application": "Potting mix, seed germination, root zone booster",
      "Certification": "NPOP India Organic Compliant"
    }
  },
  {
    id: "spice-black-pepper",
    name: "AOBA Single-Origin Black Pepper (500 g)",
    category: "spices",
    categoryLabel: "Kerala Farm Spices",
    badge: "bestseller",
    badgeText: "Harvest 2026",
    price: 649,
    mrp: 850,
    image: "assets/black-pepper-500g.png",
    specsHighlight: "Panniyur-1 Bold • Piperine 7.2%",
    rating: 5.0,
    reviews: 310,
    inStock: true,
    description: "Sun-dried bold black peppercorns grown organically in the misty hills of Wayanad, Kerala. Unbleached, unpolished, and packed directly after shade sorting.",
    specs: {
      "Grade": "Garbled Extra Bold (550+ GL)",
      "Piperine Content": "7.2% natural active piperine",
      "Packaging": "Vacuum multi-barrier nitrogen sealed pouch",
      "Weight": "500 grams",
      "Origin": "Wayanad, Kerala"
    }
  },
  {
    id: "spice-turmeric",
    name: "AOBA Pure Golden Turmeric Powder (500 g)",
    category: "spices",
    categoryLabel: "Kerala Farm Spices",
    badge: "organic",
    badgeText: "Curcumin 5.8%",
    price: 399,
    mrp: 520,
    image: "assets/turmeric-500g.png",
    specsHighlight: "High Curcumin • Cold Ground",
    rating: 4.9,
    reviews: 188,
    inStock: true,
    description: "Single-estate Alleppey finger turmeric stone-ground at low temperatures to lock in delicate essential turmerone oils and vibrant golden pigment.",
    specs: {
      "Active Curcumin": "5.8% laboratory certified",
      "Processing": "Traditional stone-milled low-heat grinding",
      "Additives": "0% starch, 0% lead chromate, zero chemicals",
      "Weight": "500 grams",
      "Origin": "Alleppey Terroir, Kerala"
    }
  },
  {
    id: "spice-cashews",
    name: "AOBA Jumbo King Cashew Nuts W180 (500 g)",
    category: "spices",
    categoryLabel: "Kerala Farm Spices",
    badge: "bestseller",
    badgeText: "Jumbo Grade",
    price: 890,
    mrp: 1150,
    image: "assets/cashew-500g.png",
    specsHighlight: "W-180 King Size • Naturally Sweet",
    rating: 4.9,
    reviews: 240,
    inStock: true,
    description: "Hand-cracked jumbo whole cashews sourced from coastal North Kerala plantations. Roasted fresh and nitrogen-sealed for rich buttery crunch.",
    specs: {
      "Kernel Grade": "W-180 (King Size, 180 nuts per pound)",
      "Processing": "Wood-fire kiln conditioned & hand-shelled",
      "Taste Profile": "Buttery, sweet, crisp crunch",
      "Weight": "500 grams",
      "Origin": "Kannur & Kasaragod, Kerala"
    }
  },
  {
    id: "tool-kerala-sickle",
    name: "Handcrafted Kerala Steel Harvesting Sickle (Arival)",
    category: "tools",
    categoryLabel: "Farm & Pruning Tools",
    badge: "heavy-duty",
    badgeText: "Hand-Forged",
    price: 450,
    mrp: 650,
    image: "assets/agro-farm-tools.jpg",
    specsHighlight: "High Carbon Leaf-Spring Steel",
    rating: 4.9,
    reviews: 76,
    inStock: true,
    description: "Traditional Kerala blacksmith hand-forged agricultural curved sickle with teak handle. Ideal for paddy harvesting, fodder grass cutting, and weed clearing.",
    specs: {
      "Steel": "Forged automotive spring steel",
      "Handle": "Seasoned Nilambur teak wood with brass ferrule",
      "Edge": "Hand-chiseled serrated micro-teeth",
      "Weight": "380 grams balanced center of gravity",
      "Origin": "Palakkad, Kerala"
    }
  },
  {
    id: "gb-rectangle-raised",
    name: "AOBA Rectangle Raised Bed Grow Bag (4x2x1 ft)",
    category: "growbags",
    categoryLabel: "Grow Bags & Planters",
    badge: "",
    badgeText: "",
    price: 599,
    mrp: 899,
    image: "assets/agro-grow-bags.jpg",
    specsHighlight: "350 GSM Geo-Fabric • Built-in Pipe Sleeves",
    rating: 4.8,
    reviews: 58,
    inStock: true,
    description: "Spacious rectangular raised garden bed constructed from breathable non-woven geotextile. Perfect for root vegetables like turmeric, carrots, and sweet potatoes.",
    specs: {
      "Dimensions": "48\" Length x 24\" Width x 12\" Height",
      "Material": "350 GSM Breathable Geo-Fabric",
      "Capacity": "Approx 220 Litres potting soil",
      "Features": "Root air-pruning & prevents circling roots",
      "Durability": "6+ years UV resistance"
    }
  },
  {
    id: "mach-dryer-solar",
    name: "AOBA Hybrid Solar Cardamom & Spice Dryer (25 kg)",
    category: "machines",
    categoryLabel: "Agro Machinery",
    badge: "subsidy",
    badgeText: "Subsidy Eligible",
    price: 28500,
    mrp: 35000,
    image: "assets/agro-spice-machine.jpg",
    specsHighlight: "Dual Electric/Solar • Thermostat Control",
    rating: 4.9,
    reviews: 19,
    inStock: true,
    description: "Scientific cabinet dehydrator with poly-carbonate solar heat concentrator and automated digital auxiliary electric backup. Preserves natural green color in cardamom and essential oils in pepper.",
    specs: {
      "Tray Capacity": "10 SS-304 Trays (Holds 25 kg wet spice)",
      "Temperature Range": "35°C to 75°C with PID controller",
      "Power": "1200W electric heating + solar collection duct",
      "Air Circulation": "Dual industrial cross-flow blowers",
      "Warranty": "2-Year Full Onsite Guarantee"
    }
  },
  {
    id: "bio-vermicompost",
    name: "Enriched Bio-Vermicompost with Trichoderma (10 kg)",
    category: "bio",
    categoryLabel: "Bio-Inputs & Nutrients",
    badge: "organic",
    badgeText: "Bio-Active",
    price: 349,
    mrp: 499,
    image: "assets/agro-coco-peat.jpg",
    specsHighlight: "Cow Dung Base • Beneficial Microbes",
    rating: 4.8,
    reviews: 112,
    inStock: true,
    description: "Pure vermicompost processed by African Earthworms (Eisenia fetida) utilizing organic cow dung and crop residue, fortified with anti-fungal Trichoderma viride.",
    specs: {
      "Moisture": "15% - 20% optimal humidity",
      "Nitrogen / Phosphorus / Potassium": "Balanced organic NPK 1.8 : 1.2 : 1.5",
      "Inoculation": "Fortified with Pseudomonas & Trichoderma",
      "Weight": "10 kg moisture-proof woven bag",
      "Origin": "Thrissur Organic Farms"
    }
  }
];

// 2. STATE MANAGEMENT
let cart = JSON.parse(localStorage.getItem('aoba_agro_cart') || '[]');
let currentCategory = 'all';
let currentSearchQuery = '';
let currentSort = 'featured';
let inStockOnly = false;
let appliedDiscount = 0; // percentage

// 3. INITIALIZATION ON DOM READY
document.addEventListener('DOMContentLoaded', () => {
  renderCatalog();
  updateCartUI();
  setupEventListeners();
});

// 4. EVENT LISTENERS
function setupEventListeners() {
  // Category tabs
  const catButtons = document.querySelectorAll('.cat-tab-btn');
  catButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
      catButtons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      currentCategory = btn.dataset.category;
      renderCatalog();
    });
  });

  // Search input
  const searchInput = document.getElementById('agroSearchInput');
  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      currentSearchQuery = e.target.value.toLowerCase().trim();
      renderCatalog();
    });
  }

  // Sort dropdown
  const sortSelect = document.getElementById('agroSortSelect');
  if (sortSelect) {
    sortSelect.addEventListener('change', (e) => {
      currentSort = e.target.value;
      renderCatalog();
    });
  }

  // In-stock toggle
  const inStockCheck = document.getElementById('inStockToggle');
  if (inStockCheck) {
    inStockCheck.addEventListener('change', (e) => {
      inStockOnly = e.target.checked;
      renderCatalog();
    });
  }

  // Cart open/close triggers
  const navCartBtn = document.getElementById('navCartBtn');
  const cartDrawer = document.getElementById('cartDrawer');
  const cartBackdrop = document.getElementById('cartDrawerBackdrop');
  const cartCloseBtn = document.getElementById('cartCloseBtn');

  if (navCartBtn) {
    navCartBtn.addEventListener('click', openCartDrawer);
  }
  if (cartCloseBtn) {
    cartCloseBtn.addEventListener('click', closeCartDrawer);
  }
  if (cartBackdrop) {
    cartBackdrop.addEventListener('click', closeCartDrawer);
  }

  // Modal backdrop click to close
  const modalBackdrop = document.getElementById('productModalBackdrop');
  const modalCloseBtn = document.getElementById('modalCloseBtn');
  if (modalBackdrop) {
    modalBackdrop.addEventListener('click', (e) => {
      if (e.target === modalBackdrop) closeModal();
    });
  }
  if (modalCloseBtn) {
    modalCloseBtn.addEventListener('click', closeModal);
  }

  // Coupon code application
  const couponBtn = document.getElementById('applyCouponBtn');
  const couponInput = document.getElementById('couponInput');
  if (couponBtn && couponInput) {
    couponBtn.addEventListener('click', () => {
      const code = couponInput.value.trim().toUpperCase();
      if (code === 'AOBAFARM10') {
        appliedDiscount = 10;
        showToast('Coupon AOBAFARM10 applied! 10% discount added.');
        updateCartUI();
      } else if (code === 'KERALAFREE') {
        appliedDiscount = 5;
        showToast('Coupon KERALAFREE applied! Extra 5% off.');
        updateCartUI();
      } else {
        showToast('Invalid promo code. Try: AOBAFARM10');
      }
    });
  }

  // WhatsApp checkout buttons
  const checkoutWaBtn = document.getElementById('btnCheckoutWa');
  if (checkoutWaBtn) {
    checkoutWaBtn.addEventListener('click', checkoutViaWhatsApp);
  }

  const checkoutDirectBtn = document.getElementById('btnCheckoutDirect');
  if (checkoutDirectBtn) {
    checkoutDirectBtn.addEventListener('click', () => {
      if (cart.length === 0) {
        showToast('Your cart is empty!');
        return;
      }
      showToast('Order confirmed! Our Kerala farm logistics team will contact you.');
      cart = [];
      saveCart();
      updateCartUI();
      closeCartDrawer();
    });
  }
}

// 5. CATALOG RENDERING
function renderCatalog() {
  const grid = document.getElementById('agroProductGrid');
  const countBadge = document.getElementById('catalogCountBadge');
  if (!grid) return;

  // Filter products
  let filtered = AGRO_PRODUCTS.filter(p => {
    // Category check
    if (currentCategory !== 'all' && p.category !== currentCategory) return false;
    // Search query check
    if (currentSearchQuery) {
      const matchName = p.name.toLowerCase().includes(currentSearchQuery);
      const matchCat = p.categoryLabel.toLowerCase().includes(currentSearchQuery);
      const matchDesc = p.description.toLowerCase().includes(currentSearchQuery);
      const matchSpecs = p.specsHighlight.toLowerCase().includes(currentSearchQuery);
      if (!matchName && !matchCat && !matchDesc && !matchSpecs) return false;
    }
    // In-stock check
    if (inStockOnly && !p.inStock) return false;
    return true;
  });

  // Sort products
  if (currentSort === 'price-low') {
    filtered.sort((a, b) => a.price - b.price);
  } else if (currentSort === 'price-high') {
    filtered.sort((a, b) => b.price - a.price);
  } else if (currentSort === 'rating') {
    filtered.sort((a, b) => b.rating - a.rating);
  }

  if (countBadge) {
    countBadge.textContent = `${filtered.length} Items`;
  }

  if (filtered.length === 0) {
    grid.innerHTML = `
      <div style="grid-column: 1 / -1; text-align: center; padding: 60px 20px; color: var(--c-text-muted);">
        <svg width="48" height="48" fill="none" stroke="currentColor" viewBox="0 0 24 24" style="margin-bottom: 16px; opacity: 0.5;">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
        </svg>
        <h3 style="color: #fff; font-family: var(--font-serif); margin-bottom: 8px;">No farm supplies match your filter</h3>
        <p>Try resetting the category filter or searching for another tool, grow bag, or spice.</p>
      </div>
    `;
    return;
  }

  grid.innerHTML = filtered.map(item => {
    const discountPct = Math.round(((item.mrp - item.price) / item.mrp) * 100);
    const badgeHtml = item.badgeText ? `<span class="card-badge ${item.badge}">${item.badgeText}</span>` : `<span></span>`;

    return `
      <article class="agro-card" data-id="${item.id}">
        <div class="card-badge-row">
          ${badgeHtml}
          <span class="card-discount-pill">${discountPct}% OFF</span>
        </div>

        <div class="card-media-wrapper" onclick="openProductModal('${item.id}')">
          <img src="${item.image}" alt="${item.name}" class="card-media-img" loading="lazy">
          <button class="quick-view-overlay-btn" type="button">
            <svg width="14" height="14" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"></path>
            </svg>
            Quick View
          </button>
        </div>

        <div class="card-content-body">
          <span class="card-category-lbl">${item.categoryLabel}</span>
          <h3 class="card-title">${item.name}</h3>
          
          <div class="card-specs-highlight">
            <svg fill="currentColor" viewBox="0 0 20 20">
              <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"></path>
            </svg>
            <span>${item.specsHighlight}</span>
          </div>

          <div class="card-rating-row">
            <span class="rating-stars">★ ★ ★ ★ ★</span>
            <span class="rating-reviews-count">(${item.reviews})</span>
          </div>

          <div class="card-pricing-row">
            <span class="card-price-current">₹${item.price.toLocaleString('en-IN')}</span>
            <span class="card-price-mrp">₹${item.mrp.toLocaleString('en-IN')}</span>
          </div>

          <div class="card-stock-status">
            <span class="stock-dot"></span>
            <span>In Stock — Dispatches within 24h</span>
          </div>

          <div class="card-action-btns">
            <button class="btn-add-cart" onclick="addToCart('${item.id}')" type="button">
              <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"></path>
              </svg>
              Add to Cart
            </button>
            <button class="btn-quick-wa" onclick="orderItemDirectWhatsApp('${item.id}')" title="Quick Order on WhatsApp" type="button">
              <svg width="18" height="18" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12.04 2c-5.46 0-9.91 4.45-9.91 9.91 0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21 5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.816 9.816 0 0012.04 2zm5.8 14.16c-.24.68-1.2 1.28-1.7 1.34-.48.06-1.07.09-3.18-.78-2.69-1.12-4.41-3.86-4.55-4.04-.13-.18-1.09-1.46-1.09-2.78 0-1.32.69-1.97.94-2.24.25-.26.54-.33.72-.33.18 0 .36 0 .52.01.17.01.39-.06.61.47.23.55.77 1.9.84 2.04.07.14.12.3.02.49-.09.19-.14.3-.28.46-.14.16-.3.35-.43.47-.14.14-.29.29-.12.58.17.29.74 1.22 1.59 1.98 1.09.97 2.01 1.27 2.3 1.41.29.14.46.12.63-.07.18-.19.74-.86.94-1.16.2-.29.4-.24.68-.14.28.1 1.77.83 2.07.98.3.15.5.23.57.36.08.13.08.77-.16 1.45z"/>
              </svg>
            </button>
          </div>
        </div>
      </article>
    `;
  }).join('');
}

// 6. CART MANAGEMENT
function addToCart(productId, qty = 1) {
  const product = AGRO_PRODUCTS.find(p => p.id === productId);
  if (!product) return;

  const existing = cart.find(item => item.id === productId);
  if (existing) {
    existing.qty += qty;
  } else {
    cart.push({
      id: product.id,
      name: product.name,
      price: product.price,
      mrp: product.mrp,
      image: product.image,
      categoryLabel: product.categoryLabel,
      qty: qty
    });
  }

  saveCart();
  updateCartUI();
  showToast(`Added "${product.name}" to cart!`);
}

function updateCartItemQty(productId, change) {
  const item = cart.find(i => i.id === productId);
  if (!item) return;

  item.qty += change;
  if (item.qty <= 0) {
    cart = cart.filter(i => i.id !== productId);
  }

  saveCart();
  updateCartUI();
}

function removeCartItem(productId) {
  cart = cart.filter(i => i.id !== productId);
  saveCart();
  updateCartUI();
}

function saveCart() {
  localStorage.setItem('aoba_agro_cart', JSON.stringify(cart));
}

function updateCartUI() {
  const counterPills = document.querySelectorAll('.cart-counter-pill');
  const itemsContainer = document.getElementById('cartItemsContainer');
  const subtotalEl = document.getElementById('cartSubtotalAmount');
  const discountEl = document.getElementById('cartDiscountAmount');
  const totalEl = document.getElementById('cartTotalAmount');
  const progressText = document.getElementById('shippingProgressText');
  const progressFill = document.getElementById('shippingProgressFill');

  const totalCount = cart.reduce((sum, item) => sum + item.qty, 0);
  counterPills.forEach(pill => pill.textContent = totalCount);

  // Totals
  const subtotal = cart.reduce((sum, item) => sum + (item.price * item.qty), 0);
  const discountAmount = Math.round((subtotal * appliedDiscount) / 100);
  const finalTotal = subtotal - discountAmount;

  if (subtotalEl) subtotalEl.textContent = `₹${subtotal.toLocaleString('en-IN')}`;
  if (discountEl) discountEl.textContent = `-₹${discountAmount.toLocaleString('en-IN')}`;
  if (totalEl) totalEl.textContent = `₹${finalTotal.toLocaleString('en-IN')}`;

  // Free shipping threshold (₹999)
  const freeThreshold = 999;
  if (progressText && progressFill) {
    if (subtotal >= freeThreshold || cart.length === 0) {
      progressText.innerHTML = `🎉 <strong>Congratulations!</strong> You qualify for <strong>FREE Kerala Shipping</strong>!`;
      progressFill.style.width = cart.length === 0 ? '0%' : '100%';
    } else {
      const remaining = freeThreshold - subtotal;
      const pct = Math.min(100, Math.round((subtotal / freeThreshold) * 100));
      progressText.innerHTML = `Add <strong>₹${remaining}</strong> more to unlock <strong>FREE Kerala Shipping</strong>!`;
      progressFill.style.width = `${pct}%`;
    }
  }

  // Items list
  if (!itemsContainer) return;

  if (cart.length === 0) {
    itemsContainer.innerHTML = `
      <div class="empty-cart-view">
        <svg class="empty-cart-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"></path>
        </svg>
        <p style="font-weight: 600; color: #fff; margin-bottom: 6px;">Your farm cart is empty</p>
        <p style="font-size: 0.85rem;">Browse our grow bags, machines, tools, and Kerala spices.</p>
      </div>
    `;
    return;
  }

  itemsContainer.innerHTML = cart.map(item => `
    <div class="cart-item-row">
      <img src="${item.image}" alt="${item.name}" class="cart-item-thumb">
      <div class="cart-item-details">
        <span class="cart-item-cat">${item.categoryLabel}</span>
        <h4 class="cart-item-name">${item.name}</h4>
        <span class="cart-item-price">₹${(item.price * item.qty).toLocaleString('en-IN')}</span>
        <div class="cart-qty-ctrl">
          <button class="qty-btn" onclick="updateCartItemQty('${item.id}', -1)" type="button">-</button>
          <span class="qty-val">${item.qty}</span>
          <button class="qty-btn" onclick="updateCartItemQty('${item.id}', 1)" type="button">+</button>
        </div>
      </div>
      <button class="cart-item-remove" onclick="removeCartItem('${item.id}')" title="Remove item" type="button">
        <svg width="18" height="18" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
        </svg>
      </button>
    </div>
  `).join('');
}

function openCartDrawer() {
  const drawer = document.getElementById('cartDrawer');
  const backdrop = document.getElementById('cartDrawerBackdrop');
  if (drawer) drawer.classList.add('active');
  if (backdrop) backdrop.classList.add('active');
  document.body.style.overflow = 'hidden';
}

function closeCartDrawer() {
  const drawer = document.getElementById('cartDrawer');
  const backdrop = document.getElementById('cartDrawerBackdrop');
  if (drawer) drawer.classList.remove('active');
  if (backdrop) backdrop.classList.remove('active');
  document.body.style.overflow = '';
}

// 7. PRODUCT DETAIL MODAL
function openProductModal(productId) {
  const product = AGRO_PRODUCTS.find(p => p.id === productId);
  if (!product) return;

  const modalBackdrop = document.getElementById('productModalBackdrop');
  const modalBox = document.getElementById('productModalBox');
  if (!modalBackdrop || !modalBox) return;

  const discountPct = Math.round(((product.mrp - product.price) / product.mrp) * 100);

  const specsRows = Object.entries(product.specs).map(([key, val]) => `
    <tr>
      <td>${key}</td>
      <td>${val}</td>
    </tr>
  `).join('');

  modalBox.innerHTML = `
    <button class="modal-close-btn" id="modalCloseBtn" onclick="closeModal()" type="button">
      <svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
      </svg>
    </button>

    <div class="modal-media-col">
      <img src="${product.image}" alt="${product.name}">
    </div>

    <div class="modal-info-col">
      <span class="modal-cat-tag">${product.categoryLabel}</span>
      <h2 class="modal-product-title">${product.name}</h2>

      <div class="modal-pricing-row">
        <span class="modal-price-cur">₹${product.price.toLocaleString('en-IN')}</span>
        <span class="modal-price-mrp">MRP ₹${product.mrp.toLocaleString('en-IN')}</span>
        <span class="card-discount-pill">${discountPct}% OFF</span>
      </div>

      <p class="modal-desc-text">${product.description}</p>

      <table class="modal-specs-table">
        <tbody>
          ${specsRows}
        </tbody>
      </table>

      <div class="modal-actions-row">
        <button class="btn-add-cart" onclick="addToCart('${product.id}'); closeModal(); openCartDrawer();" type="button" style="flex: 1;">
          <svg width="18" height="18" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"></path>
          </svg>
          Add to Cart
        </button>
        <button class="btn-quick-wa" onclick="orderItemDirectWhatsApp('${product.id}')" type="button" style="width: auto; padding: 0 18px; gap: 8px;">
          <svg width="18" height="18" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12.04 2c-5.46 0-9.91 4.45-9.91 9.91 0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21 5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.816 9.816 0 0012.04 2zm5.8 14.16c-.24.68-1.2 1.28-1.7 1.34-.48.06-1.07.09-3.18-.78-2.69-1.12-4.41-3.86-4.55-4.04-.13-.18-1.09-1.46-1.09-2.78 0-1.32.69-1.97.94-2.24.25-.26.54-.33.72-.33.18 0 .36 0 .52.01.17.01.39-.06.61.47.23.55.77 1.9.84 2.04.07.14.12.3.02.49-.09.19-.14.3-.28.46-.14.16-.3.35-.43.47-.14.14-.29.29-.12.58.17.29.74 1.22 1.59 1.98 1.09.97 2.01 1.27 2.3 1.41.29.14.46.12.63-.07.18-.19.74-.86.94-1.16.2-.29.4-.24.68-.14.28.1 1.77.83 2.07.98.3.15.5.23.57.36.08.13.08.77-.16 1.45z"/>
          </svg>
          Direct Order
        </button>
      </div>
    </div>
  `;

  modalBackdrop.classList.add('active');
  document.body.style.overflow = 'hidden';
}

function closeModal() {
  const modalBackdrop = document.getElementById('productModalBackdrop');
  if (modalBackdrop) modalBackdrop.classList.remove('active');
  document.body.style.overflow = '';
}

// 8. WHATSAPP CHECKOUT GENERATOR
function checkoutViaWhatsApp() {
  if (cart.length === 0) {
    showToast('Your cart is empty! Add products first.');
    return;
  }

  const subtotal = cart.reduce((sum, item) => sum + (item.price * item.qty), 0);
  const discountAmount = Math.round((subtotal * appliedDiscount) / 100);
  const finalTotal = subtotal - discountAmount;

  let msg = `*NEW ORDER: AOBA AGRO & FARM STORE*%0A`;
  msg += `--------------------------------%0A`;
  cart.forEach((item, index) => {
    msg += `${index + 1}. *${item.name}*%0A   Qty: ${item.qty} × ₹${item.price} = ₹${item.qty * item.price}%0A`;
  });
  msg += `--------------------------------%0A`;
  msg += `*Subtotal:* ₹${subtotal}%0A`;
  if (appliedDiscount > 0) {
    msg += `*Discount (${appliedDiscount}%):* -₹${discountAmount}%0A`;
  }
  msg += `*Total Payable:* ₹${finalTotal}%0A%0A`;
  msg += `📍 *Delivery Details:*%0AName: %0AAddress & Pincode: %0APhone Number: %0A`;

  // Open WhatsApp with prefilled message
  window.open(`https://wa.me/919447000000?text=${msg}`, '_blank');
}

function orderItemDirectWhatsApp(productId) {
  const product = AGRO_PRODUCTS.find(p => p.id === productId);
  if (!product) return;

  let msg = `*AOBA FARM ENQUIRY / ORDER*%0A`;
  msg += `Product: *${product.name}*%0A`;
  msg += `Price: ₹${product.price} (MRP: ₹${product.mrp})%0A`;
  msg += `Category: ${product.categoryLabel}%0A%0A`;
  msg += `I would like to order this item / enquire about agricultural delivery to my pincode.`;

  window.open(`https://wa.me/919447000000?text=${encodeURIComponent(msg)}`, '_blank');
}

// 9. TOAST NOTIFICATION
function showToast(message) {
  let toast = document.getElementById('agroToast');
  if (!toast) {
    toast = document.createElement('div');
    toast.id = 'agroToast';
    toast.className = 'agro-toast';
    document.body.appendChild(toast);
  }

  toast.innerHTML = `
    <svg width="20" height="20" fill="currentColor" viewBox="0 0 20 20" style="color: var(--c-gold-bright);">
      <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"></path>
    </svg>
    <span>${message}</span>
  `;
  toast.classList.add('show');

  setTimeout(() => {
    toast.classList.remove('show');
  }, 3000);
}
