(function(){
  function fillSummary(){
    const d=Cart.loadDraft();
    const t=Cart.totals({discountCode:d.discountCode,shippingMethod:d.shippingMethod||'standard'});
    const el=document.getElementById('checkout-summary');
    const code=d.discountCode?`<div class="badge" style="margin-bottom:6px">Code: ${d.discountCode.toUpperCase()}</div>`:'';
    const method=d.shippingMethod||'standard';
    el.innerHTML=`
      ${code}
      <div class="line"><span><strong>Items</strong></span><strong>${Cart.count()}</strong></div>
      <div class="line shipping"><span><i class="fas fa-shipping-fast"></i> <strong>Shipping</strong> (${method})</span><strong>${'R'+t.shipping.toFixed(2)}</strong></div>
      <hr>
      <div class="line"><span><strong>Subtotal</strong></span><strong>${'R'+t.subtotal.toFixed(2)}</strong></div>
      <div class="line"><span><strong>Discount</strong></span><strong>-${'R'+t.discount.toFixed(2)}</strong></div>
      <div class="line"><span><strong>Shipping</strong></span><strong>${'R'+t.shipping.toFixed(2)}</strong></div>
      <div class="line"><span><strong>Tax</strong></span><strong>${'R'+t.tax.toFixed(2)}</strong></div>
      <div class="line total"><span><i class="fas fa-calculator"></i> Total</span><strong>${'R'+t.total.toFixed(2)}</strong></div>`;
  }
  function restore(){
    const p=Cart.loadProfile();
    Object.entries({email:'',phone:'',firstName:'',lastName:'',address1:'',address2:'',city:'',province:'',postalCode:'',country:'South Africa'}).forEach(([k,v])=>{
      const el=document.getElementById(k);if(el)el.value=p[k]||v;
    });
  }
  document.getElementById('details-form').addEventListener('submit',e=>{
    e.preventDefault();
    const data={
      email:document.getElementById('email').value.trim(),
      phone:document.getElementById('phone').value.trim(),
      firstName:document.getElementById('firstName').value.trim(),
      lastName:document.getElementById('lastName').value.trim(),
      address1:document.getElementById('address1').value.trim(),
      address2:document.getElementById('address2').value.trim(),
      city:document.getElementById('city').value.trim(),
      province:document.getElementById('province').value.trim(),
      postalCode:document.getElementById('postalCode').value.trim(),
      country:document.getElementById('country').value.trim()
    };
    Cart.saveProfile(data);
    const d=Cart.loadDraft();
    Cart.saveDraft({...d,contact:data,shippingAddress:data});
    location.href='./Payment.html';
  });
  if(!Cart.items().length){location.href='./Cart.html';return}
  restore();
  fillSummary();
})();
