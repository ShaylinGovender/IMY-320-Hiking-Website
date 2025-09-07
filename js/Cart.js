(function(){
  const KEY='cart_v1';
  const PROFILE_KEY='profile_v1';
  const DRAFT_KEY='orderDraft_v1';
  const LAST_ORDER_KEY='lastOrder_v1';
  const TAX_RATE=0.15;
  const SHIPPING_RATES={standard:60,express:120,pickup:0};
  const FREE_SHIPPING_THRESHOLD=1000;
  function load(){try{return JSON.parse(localStorage.getItem(KEY))||[]}catch(e){return []}}
  function save(items){localStorage.setItem(KEY,JSON.stringify(items));updateBadge()}
  function items(){return load()}
  function findIndex(id){return load().findIndex(i=>i.id===id)}
  function add(product,qty){qty=qty||1;const it=load();const i=it.findIndex(x=>x.id===product.id);if(i>-1){it[i].qty+=qty}else{it.push({...product,qty})}save(it);return it}
  function setQty(id,qty){const it=load();const i=it.findIndex(x=>x.id===id);if(i>-1){it[i].qty=Math.max(1,qty)}save(it);return it}
  function remove(id){const it=load().filter(x=>x.id!==id);save(it);return it}
  function clear(){save([])}
  function count(){return load().reduce((a,b)=>a+b.qty,0)}
  function subtotal(){return load().reduce((a,b)=>a+b.price*b.qty,0)}
  function discountFromCode(code,sub){if(!code) return 0;const c=code.trim().toUpperCase();if(c==='TRAIL10')return sub*0.10;return 0}
  function shippingCost(method,sub,code){let s=SHIPPING_RATES[method||'standard'];if(sub>=FREE_SHIPPING_THRESHOLD)s=0;const c=code?code.trim().toUpperCase():'';if(c==='FREESHIP')s=0;return s}
  function totals(opts){opts=opts||{};const sub=subtotal();const discount=discountFromCode(opts.discountCode,sub);const ship=shippingCost(opts.shippingMethod||'standard',sub-discount,opts.discountCode);const tax=(sub-discount)*0.15;const total=Math.max(0,sub-discount)+ship+tax;return {subtotal:sub,discount,shipping:ship,tax,total}}
  function updateBadge(){const els=document.querySelectorAll('[data-cart-count],#cart-count');els.forEach(e=>e.textContent=String(count()))}
  function saveDraft(d){localStorage.setItem(DRAFT_KEY,JSON.stringify(d))}
  function loadDraft(){try{return JSON.parse(localStorage.getItem(DRAFT_KEY))||{}}catch(e){return {}}}
  function saveProfile(p){localStorage.setItem(PROFILE_KEY,JSON.stringify(p))}
  function loadProfile(){try{return JSON.parse(localStorage.getItem(PROFILE_KEY))||{}}catch(e){return {}}}
  function saveLastOrder(o){localStorage.setItem(LAST_ORDER_KEY,JSON.stringify(o))}
  function loadLastOrder(){try{return JSON.parse(localStorage.getItem(LAST_ORDER_KEY))||null}catch(e){return null}}
  window.Cart={items,add,setQty,remove,clear,count,subtotal,totals,updateBadge,saveDraft,loadDraft,saveProfile,loadProfile,saveLastOrder,loadLastOrder,shippingCost,discountFromCode,FREE_SHIPPING_THRESHOLD};
  document.addEventListener('DOMContentLoaded',updateBadge);
})();
