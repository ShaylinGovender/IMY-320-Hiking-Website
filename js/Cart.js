(function () {
  var KEY = "tb_cart_v1";
  var TAX_RATE = 0.15;
  var SHIPPING_RATES = {
    standard: 50.00,
    express: 100.00,
    pickup: 0.00
  };

  function money(n) {
    n = Math.max(0, Number(n) || 0);
    return "R" + n.toLocaleString("en-ZA", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  }

  function load() {
    try { return JSON.parse(localStorage.getItem(KEY) || "[]"); } catch (e) { return []; }
  }

  function save(cart) {
    localStorage.setItem(KEY, JSON.stringify(cart));
    renderBadge();
  }

  function findIndex(cart, id) {
    return cart.findIndex(function (i) { return i.id === id; });
  }

  function subtotal(cart) {
    return cart.reduce(function (s, i) { return s + i.price * i.qty; }, 0);
  }

  function getShippingCost(method) {
    return SHIPPING_RATES[method] || SHIPPING_RATES.standard;
  }

  function getDiscount(code, subtotal) {
    // Add discount codes here
    var discounts = {
      'SAVE10': subtotal * 0.10,
      'SAVE20': subtotal * 0.20,
      'WELCOME': 50.00
    };
    return discounts[code.toUpperCase()] || 0;
  }

  function tax(subtotalAmount, shippingCost) {
    return (subtotalAmount + shippingCost) * TAX_RATE;
  }

  function total(cart, options) {
    options = options || {};
    var sub = subtotal(cart);
    var shipping = getShippingCost(options.shippingMethod || 'standard');
    var discount = getDiscount(options.discountCode || '', sub);
    var taxAmount = (sub + shipping - discount) * TAX_RATE;
    return sub + shipping + taxAmount - discount;
  }

  function renderBadge() {
    var cart = load();
    var count = cart.reduce(function (s, i) { return s + i.qty; }, 0);
    var els = document.querySelectorAll("[data-cart-count], .cart-count");
    els.forEach(function (el) { el.textContent = count; });
  }

  function cartItemHTML(item) {
    return (
      '<div class="item" data-id="' + item.id + '">' +
      '<img src="' + (item.image || "") + '" alt="">' +
      '<div>' +
      '<h4>' + (item.title || "Item") + '</h4>' +
      (item.brand ? '<div class="kicker">' + item.brand + "</div>" : "") +
      '<div class="kicker">' + money(item.price) + "</div>" +
      "</div>" +
      '<div style="display:flex;gap:8px;align-items:center">' +
      '<div class="qty">' +
      '<button class="qty-btn qty-decrease" data-id="' + item.id + '" aria-label="Decrease quantity">-</button>' +
      '<input type="number" min="1" value="' + item.qty + '" data-id="' + item.id + '">' +
      '<button class="qty-btn qty-increase" data-id="' + item.id + '" aria-label="Increase quantity">+</button>' +
      '</div>' +
      '<button class="btn danger remove-item" data-id="' + item.id + '">Remove</button>' +
      "</div>" +
      "</div>"
    );
  }

  function renderCartPage() {
    var wrap = document.getElementById("cart-items");
    if (!wrap) return;

    var cart = load();
    var emptyMsg = document.getElementById("cart-empty");
    
    if (!cart.length) {
      if (emptyMsg) emptyMsg.classList.remove('hidden');
      wrap.innerHTML = '';
      var summaryLines = document.getElementById("summary-lines");
      if (summaryLines) summaryLines.innerHTML = '';
      var checkoutBtn = document.getElementById("checkout-btn");
      if (checkoutBtn) checkoutBtn.disabled = true;
      return;
    }

    if (emptyMsg) emptyMsg.classList.add('hidden');
    wrap.innerHTML = cart.map(cartItemHTML).join("");

    updateCartSummary();
    attachEventListeners();
  }

  function updateCartSummary() {
    var cart = load();
    var discountCode = (document.getElementById('discount-code') && document.getElementById('discount-code').value) || '';
    var shippingMethod = (document.getElementById('shipping-method') && document.getElementById('shipping-method').value) || 'standard';
    
    var sub = subtotal(cart);
    var shipping = getShippingCost(shippingMethod);
    var discount = getDiscount(discountCode, sub);
    var taxAmount = (sub + shipping - discount) * TAX_RATE;
    var tot = sub + shipping + taxAmount - discount;

    var summaryLines = document.getElementById("summary-lines");
    if (summaryLines) {
      summaryLines.innerHTML =
        '<div class="line"><span>Subtotal</span><span class="amount">' + money(sub) + '</span></div>' +
        '<div class="line"><span>Discount</span><span class="amount discount-amount">-' + money(discount) + '</span></div>' +
        '<div class="line shipping"><span><i class="fas fa-shipping-fast"></i> Shipping (' + shippingMethod + ')</span><span class="amount shipping-amount">' + money(shipping) + '</span></div>' +
        '<div class="line"><span>Tax (15%)</span><span class="amount tax-amount">' + money(taxAmount) + '</span></div>' +
        '<div class="line total"><span><i class="fas fa-calculator"></i> <strong>Total</strong></span><span class="amount total-amount"><strong>' + money(tot) + '</strong></span></div>';
    }

    // Save current selections
    Cart.saveDraft({
      discountCode: discountCode,
      shippingMethod: shippingMethod
    });
  }

  function attachEventListeners() {
    var wrap = document.getElementById("cart-items");
    if (!wrap) return;

    // Quantity input changes
    wrap.querySelectorAll(".item .qty input").forEach(function (inp) {
      inp.removeEventListener("input", handleQuantityChange);
      inp.addEventListener("input", handleQuantityChange);
    });

    // Quantity decrease buttons
    wrap.querySelectorAll(".qty-decrease").forEach(function (btn) {
      btn.removeEventListener("click", handleDecreaseClick);
      btn.addEventListener("click", handleDecreaseClick);
    });

    // Quantity increase buttons
    wrap.querySelectorAll(".qty-increase").forEach(function (btn) {
      btn.removeEventListener("click", handleIncreaseClick);
      btn.addEventListener("click", handleIncreaseClick);
    });

    // Remove buttons
    wrap.querySelectorAll(".item .remove-item").forEach(function (btn) {
      btn.removeEventListener("click", handleRemoveClick);
      btn.addEventListener("click", handleRemoveClick);
    });

    // Checkout button
    var checkoutBtn = document.getElementById("checkout-btn");
    if (checkoutBtn) {
      checkoutBtn.disabled = false;
      checkoutBtn.removeEventListener("click", handleCheckoutClick);
      checkoutBtn.addEventListener("click", handleCheckoutClick);
    }

    // Discount and shipping change
    var discountBtn = document.getElementById("apply-discount");
    if (discountBtn) {
      discountBtn.removeEventListener("click", updateCartSummary);
      discountBtn.addEventListener("click", updateCartSummary);
    }

    var shippingSelect = document.getElementById("shipping-method");
    if (shippingSelect) {
      shippingSelect.removeEventListener("change", updateCartSummary);
      shippingSelect.addEventListener("change", updateCartSummary);
    }
  }

  function handleQuantityChange(e) {
    var id = e.target.getAttribute("data-id");
    var cart = load();
    var idx = findIndex(cart, id);
    if (idx >= 0) {
      var v = Math.max(1, parseInt(e.target.value || "1", 10));
      cart[idx].qty = v;
      save(cart);
      updateCartSummary();
    }
  }

  function handleDecreaseClick(e) {
    e.preventDefault();
    var id = e.target.getAttribute("data-id");
    var cart = load();
    var idx = findIndex(cart, id);
    if (idx >= 0) {
      cart[idx].qty = Math.max(1, cart[idx].qty - 1);
      save(cart);
      renderCartPage();
    }
  }

  function handleIncreaseClick(e) {
    e.preventDefault();
    var id = e.target.getAttribute("data-id");
    var cart = load();
    var idx = findIndex(cart, id);
    if (idx >= 0) {
      cart[idx].qty += 1;
      save(cart);
      renderCartPage();
    }
  }

  function handleRemoveClick(e) {
    e.preventDefault();
    var id = e.target.getAttribute("data-id");
    if (id) {
      Cart.remove(id);
    }
  }

  function handleCheckoutClick(e) {
    e.preventDefault();
    if (!load().length) return;
    location.href = "./Checkout.html";
  }

  function renderCheckoutSummary() {
    var box = document.getElementById("checkout-summary");
    if (!box) return;
    
    var cart = load();
    var draft = Cart.loadDraft();
    var shippingMethod = draft.shippingMethod || 'standard';
    var discountCode = draft.discountCode || '';
    
    var sub = subtotal(cart);
    var shipping = getShippingCost(shippingMethod);
    var discount = getDiscount(discountCode, sub);
    var taxAmount = (sub + shipping - discount) * TAX_RATE;
    var tot = sub + shipping + taxAmount - discount;
    
    box.innerHTML =
      (discountCode ? '<div class="badge" style="margin-bottom:6px">Code: ' + discountCode.toUpperCase() + "</div>" : "") +
      '<div class="line"><span><strong>Items</strong></span><strong>' + cart.reduce(function (s, i) { return s + i.qty; }, 0) + "</strong></div>" +
      '<div class="line shipping"><span><i class="fas fa-shipping-fast"></i> <strong>Shipping</strong> (' + shippingMethod + ')</span><strong class="shipping-amount">' + money(shipping) + "</strong></div>" +
      '<hr>' +
      '<div class="line"><span>Subtotal</span><span class="amount">' + money(sub) + "</span></div>" +
      '<div class="line"><span>Discount</span><span class="amount discount-amount">-' + money(discount) + "</span></div>" +
      '<div class="line"><span>Shipping</span><span class="amount shipping-amount">' + money(shipping) + "</span></div>" +
      '<div class="line"><span>Tax (15%)</span><span class="amount tax-amount">' + money(taxAmount) + "</span></div>" +
      '<div class="line total"><span><i class="fas fa-calculator"></i> <strong>Total</strong></span><span class="amount total-amount"><strong>' + money(tot) + "</strong></span></div>";
  }

  function renderPaymentSummary() {
    var box = document.getElementById("payment-summary");
    if (!box || document.getElementById("cart-items")) return;
    
    var cart = load();
    var draft = Cart.loadDraft();
    var shippingMethod = draft.shippingMethod || 'standard';
    var discountCode = draft.discountCode || '';
    
    var sub = subtotal(cart);
    var shipping = getShippingCost(shippingMethod);
    var discount = getDiscount(discountCode, sub);
    var taxAmount = (sub + shipping - discount) * TAX_RATE;
    var tot = sub + shipping + taxAmount - discount;
    
    box.innerHTML =
      '<div class="line"><span>Items</span><strong>' + cart.reduce(function (s, i) { return s + i.qty; }, 0) + "</strong></div>" +
      '<div class="line shipping"><span><i class="fas fa-shipping-fast"></i> Shipping (' + shippingMethod + ')</span><strong class="shipping-amount">' + money(shipping) + "</strong></div>" +
      '<hr>' +
      '<div class="line"><span>Subtotal</span><span class="amount">' + money(sub) + "</span></div>" +
      '<div class="line"><span>Discount</span><span class="amount discount-amount">-' + money(discount) + "</span></div>" +
      '<div class="line"><span>Tax (15%)</span><span class="amount tax-amount">' + money(taxAmount) + "</span></div>" +
      '<div class="line total"><span><i class="fas fa-calculator"></i> <strong>Total</strong></span><span class="amount total-amount"><strong>' + money(tot) + "</strong></span></div>";
  }

  function renderSuccess() {
    var order = null;
    try { order = JSON.parse(localStorage.getItem("tb_last_order") || "null"); } catch (e) {}
    if (!order) return;
    
    var t = document.getElementById("success-total");
    var id = document.getElementById("order-id");
    if (t && order.totals) t.textContent = "Total " + money(order.totals.total);
    if (id && order.id) id.textContent = "Order ID " + order.id;

    var itemsBox = document.getElementById("success-items");
    var sumBox = document.getElementById("success-summary");
    if (itemsBox && order.items) itemsBox.innerHTML = order.items.map(cartItemHTML).join("");
    if (sumBox && order.totals) {
      sumBox.innerHTML =
        '<div class="line"><span>Subtotal</span><span class="amount">' + money(order.totals.subtotal) + '</span></div>' +
        '<div class="line"><span>Discount</span><span class="amount discount-amount">-' + money(order.totals.discount) + '</span></div>' +
        '<div class="line"><span>Shipping</span><span class="amount shipping-amount">' + money(order.totals.shipping) + '</span></div>' +
        '<div class="line"><span>Tax</span><span class="amount tax-amount">' + money(order.totals.tax) + '</span></div>' +
        '<div class="line total"><span><strong>Total</strong></span><span class="amount total-amount"><strong>' + money(order.totals.total) + '</strong></span></div>';
    }
  }

  var Cart = {
    add: function (product, qty) {
      var cart = load();
      var id = product.id || (product.title || "").toLowerCase().replace(/[^a-z0-9]+/g, "-");
      var idx = findIndex(cart, id);
      qty = Math.max(1, parseInt(qty || 1, 10));
      if (idx >= 0) cart[idx].qty += qty;
      else cart.push({
        id: id,
        title: product.title || "Item",
        brand: product.brand || "",
        price: Number(product.price) || 0,
        image: product.image || "",
        descriptor: product.descriptor || "",
        link: product.link || location.href,
        availability: product.availability || "in_stock",
        availabilityDate: product.availabilityDate || new Date().toISOString(),
        qty: qty
      });
      save(cart);
    },
    update: function (id, qty) {
      var cart = load();
      var idx = findIndex(cart, id);
      if (idx >= 0) {
        cart[idx].qty = Math.max(1, parseInt(qty || 1, 10));
        save(cart);
      }
    },
    remove: function (id) {
      var cart = load().filter(function (i) { return i.id !== id; });
      save(cart);
      render(); 
    },
    clear: function () {
      save([]);
      render();
    },
    get: load,
    items: load,
    count: function () {
      var cart = load();
      return cart.reduce(function (s, i) { return s + i.qty; }, 0);
    },
    totals: function (options) {
      options = options || {};
      var cart = load();
      var sub = subtotal(cart);
      var shippingMethod = options.shippingMethod || 'standard';
      var discountCode = options.discountCode || '';
      var shipping = getShippingCost(shippingMethod);
      var discount = getDiscount(discountCode, sub);
      var taxAmount = (sub + shipping - discount) * TAX_RATE;
      return {
        subtotal: sub,
        discount: discount,
        shipping: shipping,
        tax: taxAmount,
        total: sub + shipping + taxAmount - discount
      };
    },
    loadDraft: function () {
      try {
        return JSON.parse(localStorage.getItem("tb_draft") || "{}");
      } catch (e) {
        return {};
      }
    },
    saveDraft: function (data) {
      localStorage.setItem("tb_draft", JSON.stringify(data || {}));
    },
    loadProfile: function () {
      try {
        return JSON.parse(localStorage.getItem("tb_profile") || "{}");
      } catch (e) {
        return {};
      }
    },
    saveProfile: function (data) {
      localStorage.setItem("tb_profile", JSON.stringify(data || {}));
    },
    loadLastOrder: function () {
      try {
        return JSON.parse(localStorage.getItem("tb_last_order") || "null");
      } catch (e) {
        return null;
      }
    },
    saveLastOrder: function (order) {
      localStorage.setItem("tb_last_order", JSON.stringify(order));
    }
  };

  window.Cart = Cart;

  function updateFavoritesCount() {
    try {
      const wishlist = JSON.parse(localStorage.getItem('wishlist') || '[]');
      const favoriteTrails = JSON.parse(localStorage.getItem('favoriteTrails') || '[]');
      const total = wishlist.length + favoriteTrails.length;
      
      const el = document.querySelector('.favorites-count');
      if (el) {
        el.textContent = total;
      }
    } catch (e) {
      console.error('Error updating favorites count:', e);
    }
  }

  function render() {
    renderBadge();
    updateFavoritesCount();
    renderCartPage();
    renderCheckoutSummary();
    renderPaymentSummary();
    renderSuccess();
  }

  function forceCartRender() {
    if (document.getElementById("cart-items")) {
      renderCartPage();
    }
  }

  document.addEventListener("DOMContentLoaded", render);
  window.addEventListener("load", forceCartRender);
  
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", render);
  } else {
    render();
  }
})();