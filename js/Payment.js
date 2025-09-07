(function(){
  function fillSummary(){
    const cart = Cart.items();
    const cartCount = Cart.count();
    let subtotal = 0;
    
    if (cart && cart.length) {
      subtotal = cart.reduce((sum, item) => sum + (item.price * item.qty), 0);
    }
    
    const tax = subtotal * 0.15;
    const total = subtotal + tax;
    
    const el = document.getElementById('payment-summary');
    el.innerHTML = `
      <div class="line"><span>Items</span><strong>${cartCount}</strong></div>
      <div class="line"><span>Shipping</span><strong>standard</strong></div>
      <hr>
      <div class="line"><span>Subtotal</span><strong>R${subtotal.toFixed(2)}</strong></div>
      <div class="line"><span>Discount</span><strong>-R0.00</strong></div>
      <div class="line"><span>Shipping</span><strong>R0.00</strong></div>
      <div class="line"><span>Tax</span><strong>R${tax.toFixed(2)}</strong></div>
      <div class="line total"><span>Total</span><strong>R${total.toFixed(2)}</strong></div>`;
  }
  
  function toggleCard(){
    const val = document.querySelector('input[name="method"]:checked').value;
    document.getElementById('card-fields').style.display = val === 'card' ? 'block' : 'none';
  }
  
  document.addEventListener('change', e => {
    if(e.target.name === 'method') toggleCard();
  });
  
  document.getElementById('payment-form').addEventListener('submit', e => {
    e.preventDefault();
    document.getElementById('paying').classList.remove('hidden');
    
    setTimeout(() => {
      const cart = Cart.items();
      
      if (!cart || cart.length === 0) {
        console.error('No items in cart');
        location.href = './Cart.html';
        return;
      }
      
      const subtotal = cart.reduce((sum, item) => sum + (item.price * item.qty), 0);
      const tax = subtotal * 0.15;
      const total = subtotal + tax;
      
      const order = {
        id: 'ORD' + Date.now(),
        items: cart,
        totals: {
          subtotal: subtotal,
          discount: 0,
          shipping: 0,
          tax: tax,
          total: total
        },
        createdAt: new Date().toISOString()
      };
      
      console.log('Payment: Saving order:', order);
      
      localStorage.setItem('tb_last_order', JSON.stringify(order));
      
      if (Cart.saveLastOrder) {
        Cart.saveLastOrder(order);
      }
      
      Cart.clear();
      
      location.href = './OrderSuccess.html';
    }, 600);
  });
  
  const cart = Cart.items();
  if (!cart || cart.length === 0) {
    const lastOrder = localStorage.getItem('tb_last_order');
    if (!lastOrder) {
      location.href = './Cart.html';
      return;
    }
  }
  
  toggleCard();
  fillSummary();
})();
