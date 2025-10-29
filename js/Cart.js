(function () {
  var KEY = "tb_cart_v1";
  var TAX_RATE = 0.15;

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
    return cart.findIndex(function (i) { 
      return i.id === id || i.id.toString() === id.toString(); 
    });
  }

  function subtotal(cart) {
    return cart.reduce(function (s, i) { return s + i.price * i.qty; }, 0);
  }

  function tax(cart) {
    return subtotal(cart) * TAX_RATE;
  }

  function total(cart) {
    return subtotal(cart) + tax(cart);
  }

  function renderBadge() {
    var cart = load();
    var count = cart.reduce(function (s, i) { return s + i.qty; }, 0);
    var els = document.querySelectorAll("[data-cart-count], .cart-count");
    els.forEach(function (el) { el.textContent = count; });
  }

  function cartItemHTML(item) {
    return (
      '<div class="item" data-id="' + item.id + '" style="cursor: pointer;" onclick="window.navigateToProduct(\'' + item.id + '\')">' +
      '<img src="' + (item.image || "") + '" alt="">' +
      '<div>' +
      '<h4>' + (item.title || "Item") + '</h4>' +
      (item.brand ? '<div class="kicker">' + item.brand + "</div>" : "") +
      '<div class="kicker">' + money(item.price) + "</div>" +
      "</div>" +
      '<div style="display:flex;gap:8px;align-items:center" onclick="event.stopPropagation();">' +
      '<div class="qty"><input type="number" min="1" value="' + item.qty + '" data-id="' + item.id + '"></div>' +
      '<button class="btn danger remove-item" data-id="' + item.id + '">Remove</button>' +
      "</div>" +
      "</div>"
    );
  }

  function renderCartPage() {
    var wrap = document.getElementById("cart-items");
    var emptyMsg = document.getElementById("cart-empty");
    if (!wrap) return;

    var cart = load();
    
    if (!cart.length) {
      wrap.innerHTML = '';
      if (emptyMsg) {
        emptyMsg.classList.remove("hidden");
        emptyMsg.style.display = "flex"; // Ensure it's visible
      }
      var summaryLines = document.getElementById("summary-lines");
      if (summaryLines) summaryLines.innerHTML = '';
      return;
    }

    // Hide empty message when there are items
    if (emptyMsg) {
      emptyMsg.classList.add("hidden");
      emptyMsg.style.display = "none"; // Force hide
    }
    wrap.innerHTML = cart.map(cartItemHTML).join("");

    var sub = subtotal(cart);
    var tx = tax(cart);
    var tot = total(cart);

    var summaryLines = document.getElementById("summary-lines");
    if (summaryLines) {
      summaryLines.innerHTML =
        '<div class="line"><span>Subtotal</span><span>' + money(sub) + '</span></div>' +
        '<div class="line"><span>Discount</span><span>-R0.00</span></div>' +
        '<div class="line"><span>Shipping</span><span>R0.00</span></div>' +
        '<div class="line"><span>Tax</span><span>' + money(tx) + '</span></div>' +
        '<div class="line total"><span>Total</span><span>' + money(tot) + '</span></div>';
    }

    attachEventListeners();
  }

  function attachEventListeners() {
    var wrap = document.getElementById("cart-items");
    if (!wrap) return;

    wrap.querySelectorAll(".item .qty input").forEach(function (inp) {
      inp.removeEventListener("input", handleQuantityChange);
      inp.addEventListener("input", handleQuantityChange);
    });

    wrap.querySelectorAll(".item .remove-item").forEach(function (btn) {
      btn.removeEventListener("click", handleRemoveClick);
      btn.addEventListener("click", handleRemoveClick);
    });

    var checkoutBtn = document.getElementById("checkout-btn");
    if (checkoutBtn) {
      checkoutBtn.removeEventListener("click", handleCheckoutClick);
      checkoutBtn.addEventListener("click", handleCheckoutClick);
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
      renderCartPage();
    }
  }

  function handleRemoveClick(e) {
    e.preventDefault();
    e.stopPropagation(); 
    var id = e.target.getAttribute("data-id");
    if (id) {
      Cart.remove(id);
      
      showRemoveNotification();
      
      render();
    }
  }

  function showRemoveNotification() {
    let notification = document.getElementById('removeNotification');
    if (!notification) {
      notification = document.createElement('div');
      notification.id = 'removeNotification';
      notification.className = 'remove-notification';
      notification.innerHTML = 
        '<div class="notification-content">' +
        '<div class="notification-icon">' +
        '<i class="fas fa-check-circle"></i>' +
        '</div>' +
        '<div class="notification-message">' +
        '<h4>Item Removed</h4>' +
        '<p>The item has been removed from your cart.</p>' +
        '</div>' +
        '</div>';
      document.body.appendChild(notification);
    }
    
    notification.style.display = 'block';
    notification.classList.remove('hiding');
    
    
    setTimeout(() => {
      hideRemoveNotification();
    }, 2000);
  }

  function hideRemoveNotification() {
    const notification = document.getElementById('removeNotification');
    if (notification) {
      notification.classList.add('hiding');
      setTimeout(() => {
        notification.style.display = 'none';
        notification.classList.remove('hiding');
      }, 300);
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
    box.innerHTML =
      '<div class="line"><span>Items</span><span>' + cart.reduce(function (s, i) { return s + i.qty; }, 0) + "</span></div>" +
      '<div class="line"><span>Shipping</span><span>standard</span></div>' +
      '<div class="line"><span>Subtotal</span><span>' + money(subtotal(cart)) + "</span></div>" +
      '<div class="line"><span>Discount</span><span>-R0.00</span></div>' +
      '<div class="line"><span>Shipping</span><span>R0.00</span></div>' +
      '<div class="line"><span>Tax</span><span>' + money(tax(cart)) + "</span></div>" +
      '<div class="line total"><span>Total</span><span>' + money(total(cart)) + "</span></div>";
  }

  function renderPaymentSummary() {
    var box = document.querySelector(".summary");
    if (!box || document.getElementById("cart-items")) return;
    var cart = load();
    box.innerHTML =
      '<div class="line"><span>Items</span><span>' + cart.reduce(function (s, i) { return s + i.qty; }, 0) + "</span></div>" +
      '<div class="line"><span>Shipping</span><span>standard</span></div>' +
      '<div class="line"><span>Subtotal</span><span>' + money(subtotal(cart)) + "</span></div>" +
      '<div class="line"><span>Discount</span><span>-R0.00</span></div>' +
      '<div class="line"><span>Shipping</span><span>R0.00</span></div>' +
      '<div class="line"><span>Tax</span><span>' + money(tax(cart)) + "</span></div>" +
      '<div class="line total"><span>Total</span><span>' + money(total(cart)) + "</span></div>";
  }

  function renderSuccess() {
    var order = null;
    try { order = JSON.parse(localStorage.getItem("tb_last_order") || "null"); } catch (e) {}
    if (!order) return;
    var t = document.getElementById("success-total");
    var id = document.getElementById("order-id");
    if (t) t.textContent = "Total " + money(order.total);
    if (id) id.textContent = "Order ID " + order.id;

    var itemsBox = document.getElementById("success-items");
    var sumBox = document.getElementById("success-summary");
    if (itemsBox) itemsBox.innerHTML = order.items.map(cartItemHTML).join("");
    if (sumBox) {
      var sub = order.items.reduce(function (s, i) { return s + i.price * i.qty; }, 0);
      var tx = sub * TAX_RATE;
      sumBox.innerHTML =
        '<div class="line"><span>Subtotal</span><span>' + money(sub) + '</span></div>' +
        '<div class="line"><span>Discount</span><span>-R0.00</span></div>' +
        '<div class="line"><span>Shipping</span><span>R0.00</span></div>' +
        '<div class="line"><span>Tax</span><span>' + money(tx) + '</span></div>' +
        '<div class="line total"><span>Total</span><span>' + money(sub + tx) + '</span></div>';
    }
  }

  var Cart = {
    add: function (product, qty) {
      var cart = load();
      var id = (product.id !== undefined && product.id !== null) ? product.id : (product.title || "").toLowerCase().replace(/[^a-z0-9]+/g, "-");
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
    setQty: function (id, qty) {
      this.update(id, qty);
    },
    remove: function (id) {
      var cart = load().filter(function (i) { return i.id !== id && i.id.toString() !== id.toString(); });
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
      var discount = 0;
      var shipping = 0;
      var tx = tax(cart);
      return {
        subtotal: sub,
        discount: discount,
        shipping: shipping,
        tax: tx,
        total: sub + shipping + tx - discount
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

  window.navigateToProduct = function(productId) {
    console.log('Navigating to product with ID:', productId, 'Type:', typeof productId);
    
    let targetId = productId;
    
    if (typeof productId === 'string' && !isNaN(productId)) {
      targetId = parseInt(productId, 10);
    }
    
    console.log('Target ID after conversion:', targetId, 'Type:', typeof targetId);
    
    if (window.ProductData) {
      const products = window.ProductData.getProducts();
      console.log('Available products:', products.map(p => ({ id: p.id, name: p.name })));
      
      let product = products.find(p => p.id === targetId);
      
      if (!product && typeof targetId === 'number') {
        product = products.find(p => p.id.toString() === targetId.toString());
      }
      
      if (!product && typeof targetId === 'string') {
        product = products.find(p => p.id === parseInt(targetId, 10));
      }
      
      if (product) {
        console.log('Found matching product:', product);
        window.location.href = `ProductPage.html?id=${product.id}`;
        return;
      } else {
        console.log('No product found with ID:', targetId);
      }
    } else {
      console.log('ProductData not available');
    }
    
    console.log('Using fallback navigation with ID:', targetId);
    window.location.href = `ProductPage.html?id=${targetId}`;
  };

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