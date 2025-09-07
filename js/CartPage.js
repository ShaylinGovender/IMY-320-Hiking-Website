(function(){
  function render(){
    const list=document.getElementById('cart-items');
    const empty=document.getElementById('cart-empty');
    const items=Cart.items();
    if(!items.length){empty.classList.remove('hidden');list.innerHTML='';document.getElementById('summary-lines').innerHTML='';return}
    empty.classList.add('hidden');
    list.innerHTML='';
    items.forEach(p=>{
      const div=document.createElement('div');
      div.className='item';
      div.innerHTML=`
        <img src="${p.image||''}" alt="">
        <div>
          <h4>${p.title||'Item'}</h4>
          <div class="kicker">${p.brand||''}</div>
          <div class="kicker">${'R'+(p.price).toFixed(2)}</div>
        </div>
        <div style="display:flex;gap:8px;align-items:center">
          <div class="qty">
            <input class="input" data-qty="${p.id}" value="${p.qty}" type="number" min="1">
          </div>
          <button class="btn danger" data-remove="${p.id}">Remove</button>
        </div>`;
      list.appendChild(div);
    });
    updateSummary();
  }
  function updateSummary(){
    const code=(document.getElementById('discount-code').value||Cart.loadDraft().discountCode||'').toString();
    const shipSel=document.getElementById('shipping-method');
    const method=shipSel.value||(Cart.loadDraft().shippingMethod||'standard');
    const t=Cart.totals({discountCode:code,shippingMethod:method});
    const s=document.getElementById('summary-lines');
    s.innerHTML=`
      <div class="line"><span>Subtotal</span><strong>${'R'+t.subtotal.toFixed(2)}</strong></div>
      <div class="line"><span>Discount</span><strong>-${'R'+t.discount.toFixed(2)}</strong></div>
      <div class="line"><span>Shipping</span><strong>${'R'+t.shipping.toFixed(2)}</strong></div>
      <div class="line"><span>Tax</span><strong>${'R'+t.tax.toFixed(2)}</strong></div>
      <div class="line total"><span>Total</span><strong>${'R'+t.total.toFixed(2)}</strong></div>`;
    Cart.saveDraft({...Cart.loadDraft(),discountCode:code,shippingMethod:method});
  }
  document.addEventListener('click',e=>{
    const rem=e.target.getAttribute('data-remove');
    if(rem){Cart.remove(rem);render()}
  });
  document.addEventListener('input',e=>{
    const key=e.target.getAttribute('data-qty');
    if(key){const v=parseInt(e.target.value||'1',10);Cart.setQty(key,Math.max(1,isNaN(v)?1:v));updateSummary()}
  });
  document.getElementById('apply-discount').addEventListener('click',updateSummary);
  document.getElementById('shipping-method').addEventListener('change',updateSummary);
  document.getElementById('checkout-btn').addEventListener('click',()=>{
    if(!Cart.items().length)return;
    location.href='./Checkout.html';
  });
  document.getElementById('continue-shopping').addEventListener('click',()=>{location.href='./ProductCatalogue.html'});
  render();
})();