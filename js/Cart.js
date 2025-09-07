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
    return cart.findIndex(function (i) { return i.id === id; });
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
      '<div class="item" data-id="' + item.id + '">' +
      '<img src="' + (item.image || "") + '" alt="">' +
      '<div>' +
      '<h4>' + (item.title || "Item") + '</h4>' +
      (item.brand ? '<div class="kicker">' + item.brand + "</div>" : "") +
      '<div class="kicker">' + money(item.price) + "</div>" +
      "</div>" +
      '<div style="display:flex;gap:8px;align-items:center">' +
      '<div class="qty"><input type="number" min="1" value="' + item.qty + '"></div>' +
      '<button class="btn danger remove-item">Remove</button>' +
      "</div>" +
      "</div>"
    );
  }

  function renderCartPage() {
    var wrap = document.getElementById("cart-items");
    var summaryBox = document.querySelector(".summary");
    if (!wrap || !summaryBox) return;

    var cart = load();
    if (!cart.length) {
      wrap.innerHTML = '<div class="kicker">Your cart is empty.</div>';
    } else {
      wrap.innerHTML = cart.map(cartItemHTML).join("");
    }

    var sub = subtotal(cart);
    var tx = tax(cart);
    var tot = total(cart);

    summaryBox.innerHTML =
      '<div class="row" style="margin-bottom:12px">' +
      '<div><label class="kicker">Discount code</label><input id="discount-code" class="input" placeholder="Enter code"></div>' +
      '<button id="apply-discount" class="btn" type="button">Apply</button>' +
      '</div>' +
      '<div style="margin-bottom:12px"><label class="kicker">Shipping method</label><select id="shipping" class="input"><option value="standard" selected>Standard</option></select></div>' +
      '<div class="line"><span>Subtotal</span><span id="sum-subtotal">' + money(sub) + '</span></div>' +
      '<div class="line"><span>Discount</span><span id="sum-discount">-R0.00</span></div>' +
      '<div class="line"><span>Shipping</span><span id="sum-shipping">R0.00</span></div>' +
      '<div class="line"><span>Tax</span><span id="sum-tax">' + money(tx) + '</span></div>' +
      '<div class="line total"><span>Total</span><span id="sum-total">' + money(tot) + '</span></div>' +
      '<button id="checkout-btn" class="btn" style="width:100%;margin-top:10px">Proceed to checkout</button>' +
      '<a class="btn link" href="./ProductCatalogue.html" style="width:100%;margin-top:8px;text-align:center">Continue shopping</a>';

    wrap.querySelectorAll(".item .qty input").forEach(function (inp) {
      inp.addEventListener("change", function () {
        var id = inp.closest(".item").getAttribute("data-id");
        var cart = load();
        var idx = findIndex(cart, id);
        if (idx >= 0) {
          var v = Math.max(1, parseInt(inp.value || "1", 10));
          cart[idx].qty = v;
          save(cart);
          renderCartPage();
        }
      });
    });

    wrap.querySelectorAll(".item .remove-item").forEach(function (btn) {
      btn.addEventListener("click", function () {
        var id = btn.closest(".item").getAttribute("data-id");
        Cart.remove(id);
      });
    });

    document.getElementById("checkout-btn").addEventListener("click", function (e) {
      e.preventDefault();
      if (!load().length) return;
      location.href = "./Checkout.html";
    });
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
    var ctp = document.getElementById("continue-to-payment-btn");
    if (ctp) ctp.addEventListener("click", function (e) { e.preventDefault(); location.href = "./Payment.html"; });
  }

  function renderPaymentSummary() {
    var box = document.querySelector(".summary");
    if (!box) return;
    var cart = load();
    box.innerHTML =
      '<div class="line"><span>Items</span><span>' + cart.reduce(function (s, i) { return s + i.qty; }, 0) + "</span></div>" +
      '<div class="line"><span>Shipping</span><span>standard</span></div>' +
      '<div class="line"><span>Subtotal</span><span>' + money(subtotal(cart)) + "</span></div>" +
      '<div class="line"><span>Discount</span><span>-R0.00</span></div>"' +
      '<div class="line"><span>Shipping</span><span>R0.00</span></div>' +
      '<div class="line"><span>Tax</span><span>' + money(tax(cart)) + "</span></div>" +
      '<div class="line total"><span>Total</span><span>' + money(total(cart)) + "</span></div>";
    var pay = document.getElementById("pay-btn");
    if (pay) pay.addEventListener("click", function (e) {
      e.preventDefault();
      if (!load().length) return;
      var order = {
        id: "ORD" + Date.now(),
        total: total(load()),
        items: load()
      };
      localStorage.setItem("tb_last_order", JSON.stringify(order));
      save([]);
      location.href = "./OrderSuccess.html";
    });
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
    get: load
  };

  window.Cart = Cart;

  function render() {
    renderBadge();
    renderCartPage();
    renderCheckoutSummary();
    renderPaymentSummary();
    renderSuccess();
  }

  document.addEventListener("DOMContentLoaded", render);
})();
