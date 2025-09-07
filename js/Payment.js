(function(){
  function fillSummary(){
    const d=Cart.loadDraft();
    const t=Cart.totals({discountCode:d.discountCode,shippingMethod:d.shippingMethod||'standard'});
    const el=document.getElementById('payment-summary');
    const method=d.shippingMethod||'standard';
    el.innerHTML=`
      <div class="line"><span>Items</span><strong>${Cart.count()}</strong></div>
      <div class="line"><span>Shipping</span><strong>${method}</strong></div>
      <hr>
      <div class="line"><span>Subtotal</span><strong>${'R'+t.subtotal.toFixed(2)}</strong></div>
      <div class="line"><span>Discount</span><strong>-${'R'+t.discount.toFixed(2)}</strong></div>
      <div class="line"><span>Shipping</span><strong>${'R'+t.shipping.toFixed(2)}</strong></div>
      <div class="line"><span>Tax</span><strong>${'R'+t.tax.toFixed(2)}</strong></div>
      <div class="line total"><span>Total</span><strong>${'R'+t.total.toFixed(2)}</strong></div>`;
  }
  function toggleCard(){
    const val=document.querySelector('input[name="method"]:checked').value;
    document.getElementById('card-fields').style.display=val==='card'?'block':'none';
  }
  document.addEventListener('change',e=>{
    if(e.target.name==='method')toggleCard();
  });
  document.getElementById('payment-form').addEventListener('submit',e=>{
    e.preventDefault();
    document.getElementById('paying').classList.remove('hidden');
    setTimeout(()=>{
      const d=Cart.loadDraft();
      const t=Cart.totals({discountCode:d.discountCode,shippingMethod:d.shippingMethod||'standard'});
      const order={
        id:'ORD'+Date.now(),
        items:Cart.items(),
        totals:t,
        contact:(d.contact||{}),
        shippingAddress:(d.shippingAddress||{}),
        shippingMethod:(d.shippingMethod||'standard'),
        discountCode:(d.discountCode||null),
        createdAt:new Date().toISOString()
      };
      Cart.saveLastOrder(order);
      Cart.clear();
      location.href='./OrderSuccess.html';
    },600);
  });
  if(!Cart.items().length&& !Cart.loadLastOrder()){location.href='./Cart.html';return}
  toggleCard();
  fillSummary();
})();
