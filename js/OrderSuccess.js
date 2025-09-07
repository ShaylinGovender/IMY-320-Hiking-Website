(function(){
  function render(){
    const o=Cart.loadLastOrder();
    if(!o){location.href='./ProductCatalogue.html';return}
    const total=document.getElementById('success-total');
    total.textContent='Total '+('R'+o.totals.total.toFixed(2));
    const oid=document.getElementById('order-id');
    oid.textContent='Order ID '+o.id;
    const items=document.getElementById('success-items');
    items.innerHTML='';
    o.items.forEach(p=>{
      const div=document.createElement('div');
      div.className='item';
      div.innerHTML=`<img src="${p.image||''}" width="72" height="72"><div><h4>${p.title||'Item'}</h4><div class="kicker">${p.brand||''}</div></div><div class="price kicker">x${p.qty} • ${'R'+(p.price).toFixed(2)}</div>`;
      items.appendChild(div);
    });
    const s=document.getElementById('success-summary');
    s.innerHTML=`
      <div class="line"><span>Subtotal</span><strong>${'R'+o.totals.subtotal.toFixed(2)}</strong></div>
      <div class="line"><span>Discount</span><strong>-${'R'+o.totals.discount.toFixed(2)}</strong></div>
      <div class="line"><span>Shipping</span><strong>${'R'+o.totals.shipping.toFixed(2)}</strong></div>
      <div class="line"><span>Tax</span><strong>${'R'+o.totals.tax.toFixed(2)}</strong></div>
      <div class="line total"><span>Total</span><strong>${'R'+o.totals.total.toFixed(2)}</strong></div>`;
  }
  function confetti(){
    const c=document.getElementById('confetti');const ctx=c.getContext('2d');let w=window.innerWidth,h=window.innerHeight;c.width=w;c.height=h;const n=120;const p=[];for(let i=0;i<n;i++){p.push({x:Math.random()*w,y:Math.random()*-h,r:2+Math.random()*4,vx:(Math.random()-.5)*1.5,vy:1+Math.random()*2,rot:Math.random()*Math.PI*2})}
    function step(){ctx.clearRect(0,0,w,h);p.forEach(o=>{o.x+=o.vx;o.y+=o.vy;o.rot+=0.05;ctx.save();ctx.translate(o.x,o.y);ctx.rotate(o.rot);ctx.fillStyle='hsl('+Math.floor(Math.random()*360)+',80%,60%)';ctx.fillRect(-3,-3,6,6);ctx.restore();if(o.y>h+10)o.y=-10});requestAnimationFrame(step)}
    step();setTimeout(()=>{c.remove()},2500)
  }
  render();
  confetti();
})();
