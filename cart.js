// ==================== AAADIETYA Cart System ====================
// Uses localStorage to persist cart across pages

(function() {
  'use strict';

  // ==================== Cart Data ====================
  function getCart() {
    try {
      return JSON.parse(localStorage.getItem('aaadietya_cart')) || [];
    } catch(e) {
      return [];
    }
  }

  function saveCart(cart) {
    localStorage.setItem('aaadietya_cart', JSON.stringify(cart));
  }

  function getCartCount() {
    return getCart().reduce((sum, item) => sum + item.qty, 0);
  }

  function getCartTotal() {
    return getCart().reduce((sum, item) => sum + (item.price * item.qty), 0);
  }

  // ==================== Update Badge ====================
  function updateBadge() {
    document.querySelectorAll('.cart-badge').forEach(badge => {
      const count = getCartCount();
      badge.textContent = count;
      if (count > 0) {
        badge.style.display = 'flex';
      }
    });
  }

  // ==================== Add to Cart ====================
  window.addToCartGlobal = function(name, price, qty, image) {
    const cart = getCart();
    const existing = cart.find(item => item.name === name);
    if (existing) {
      existing.qty += qty;
    } else {
      cart.push({ name, price, qty, image: image || '' });
    }
    saveCart(cart);
    updateBadge();
    animateBadge();
    showToast(name + ' added to cart!', 'success');
    setTimeout(() => openCartPanel(), 800);
  };

  function animateBadge() {
    document.querySelectorAll('.cart-badge').forEach(badge => {
      badge.style.transform = 'scale(1.4)';
      setTimeout(() => { badge.style.transform = 'scale(1)'; }, 300);
    });
  }

  // ==================== Toast Notification ====================
  function showToast(message, type) {
    let container = document.getElementById('toast-container');
    if (!container) {
      container = document.createElement('div');
      container.id = 'toast-container';
      container.style.cssText = 'position:fixed;top:80px;right:20px;z-index:100000;display:flex;flex-direction:column;gap:8px;pointer-events:none;';
      document.body.appendChild(container);
    }
    const toast = document.createElement('div');
    toast.className = 'cart-toast';
    const icon = type === 'success' ? '✅' : '🛒';
    toast.innerHTML = `<span style="margin-right:8px;font-size:18px;">${icon}</span><span>${message}</span>`;
    toast.style.cssText = 'display:flex;align-items:center;background:linear-gradient(135deg,#1a1a2e,#16213e);color:#fff;padding:14px 22px;border-radius:12px;font-size:14px;font-weight:500;box-shadow:0 8px 32px rgba(0,0,0,0.25);pointer-events:auto;transform:translateX(120%);transition:transform 0.4s cubic-bezier(0.175,0.885,0.32,1.275),opacity 0.3s ease;opacity:0;border-left:4px solid #16A34A;max-width:320px;';
    container.appendChild(toast);
    requestAnimationFrame(() => {
      toast.style.transform = 'translateX(0)';
      toast.style.opacity = '1';
    });
    setTimeout(() => {
      toast.style.transform = 'translateX(120%)';
      toast.style.opacity = '0';
      setTimeout(() => toast.remove(), 400);
    }, 2500);
  }

  // ==================== Cart Panel HTML ====================
  function createCartPanel() {
    if (document.getElementById('cart-slide-panel')) return;

    const overlay = document.createElement('div');
    overlay.id = 'cart-overlay';
    overlay.addEventListener('click', closeCartPanel);

    const panel = document.createElement('div');
    panel.id = 'cart-slide-panel';
    panel.innerHTML = `
      <div class="cart-panel-header">
        <h3>🛒 Your Cart</h3>
        <button id="close-cart-panel" aria-label="Close">✕</button>
      </div>
      <div class="cart-panel-items" id="cart-panel-items">
        <!-- items rendered here -->
      </div>
      <div class="cart-panel-footer" id="cart-panel-footer">
        <div class="cart-total-row">
          <span>Total:</span>
          <span class="cart-total-amount" id="cart-total-amount">₹0</span>
        </div>
        <button class="cart-checkout-btn" id="cart-checkout-btn">Proceed to Checkout</button>
        <button class="cart-continue-btn" onclick="closeCartPanel()">Continue Shopping</button>
      </div>
    `;

    document.body.appendChild(overlay);
    document.body.appendChild(panel);

    document.getElementById('close-cart-panel').addEventListener('click', closeCartPanel);
    document.getElementById('cart-checkout-btn').addEventListener('click', () => {
      closeCartPanel();
      window.location.href = 'checkout.html';
    });
  }

  // ==================== Render Cart Items ====================
  function renderCartItems() {
    const container = document.getElementById('cart-panel-items');
    const footer = document.getElementById('cart-panel-footer');
    const cart = getCart();

    if (cart.length === 0) {
      container.innerHTML = `
        <div class="cart-empty">
          <span class="cart-empty-icon">🛒</span>
          <p>Your cart is empty</p>
          <small>Browse our collection and add items</small>
        </div>
      `;
      footer.style.display = 'none';
      return;
    }

    footer.style.display = 'block';

    container.innerHTML = cart.map((item, index) => `
      <div class="cart-item" data-index="${index}">
        <div class="cart-item-img">
          ${item.image ? `<img src="${item.image}" alt="${item.name}">` : `<span class="cart-item-placeholder">📿</span>`}
        </div>
        <div class="cart-item-details">
          <h4 class="cart-item-name">${item.name}</h4>
          <div class="cart-item-price">₹${item.price.toLocaleString('en-IN')}</div>
          <div class="cart-item-qty-row">
            <button class="cart-qty-btn" onclick="updateCartQty(${index}, -1)">−</button>
            <span class="cart-qty-val">${item.qty}</span>
            <button class="cart-qty-btn" onclick="updateCartQty(${index}, 1)">+</button>
            <span class="cart-item-subtotal">₹${(item.price * item.qty).toLocaleString('en-IN')}</span>
          </div>
        </div>
        <button class="cart-remove-btn" onclick="removeCartItem(${index})" title="Remove">🗑️</button>
      </div>
    `).join('');

    document.getElementById('cart-total-amount').textContent = '₹' + getCartTotal().toLocaleString('en-IN');
  }

  // ==================== Cart Actions ====================
  window.updateCartQty = function(index, delta) {
    const cart = getCart();
    if (cart[index]) {
      cart[index].qty += delta;
      if (cart[index].qty < 1) cart[index].qty = 1;
      saveCart(cart);
      updateBadge();
      renderCartItems();
    }
  };

  window.removeCartItem = function(index) {
    const cart = getCart();
    cart.splice(index, 1);
    saveCart(cart);
    updateBadge();
    renderCartItems();
  };

  // ==================== Open / Close Panel ====================
  window.openCartPanel = function() {
    createCartPanel();
    renderCartItems();
    document.getElementById('cart-overlay').classList.add('active');
    document.getElementById('cart-slide-panel').classList.add('active');
    document.body.style.overflow = 'hidden';
  };

  window.closeCartPanel = function() {
    const overlay = document.getElementById('cart-overlay');
    const panel = document.getElementById('cart-slide-panel');
    if (overlay) overlay.classList.remove('active');
    if (panel) panel.classList.remove('active');
    document.body.style.overflow = '';
  };

  // ==================== Init on DOM Ready ====================
  document.addEventListener('DOMContentLoaded', () => {
    updateBadge();

    // Cart icon click → open panel
    document.querySelectorAll('#cart-btn, [id="cart-btn"]').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        openCartPanel();
      });
    });
  });

})();
