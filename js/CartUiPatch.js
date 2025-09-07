(function(){
  function storageKey(){
    var ks=["tb_cart_v1","cart"];
    for(var i=0;i<ks.length;i++){try{JSON.parse(localStorage.getItem(ks[i])||"[]");return ks[i]}catch(_){}} 
    return "tb_cart_v1"
  }
  var KEY=storageKey();

  function removeFromStorage(id){
    try{
      var arr=JSON.parse(localStorage.getItem(KEY)||"[]");
      arr=arr.filter(function(it){return (it.id||"")!==id});
      localStorage.setItem(KEY,JSON.stringify(arr))
    }catch(_){}
  }

  function getItemId(node){
    var n=node,i=0;
    while(n&&i<6){
      if(n.getAttribute&&n.getAttribute("data-id")) return n.getAttribute("data-id");
      if(n.dataset&&n.dataset.id) return n.dataset.id;
      n=n.parentElement;i++
    }
    return ""
  }

  function hidePlusButtons(item){
    item.querySelectorAll('button,[role="button"]').forEach(function(b){
      var t=(b.textContent||"").trim();
      var label=(b.getAttribute("aria-label")||"")+" "+(b.className||"")+" "+(b.id||"");
      if(t==="+"||/increase|plus|increment/i.test(label)) b.style.display="none"
    })
  }

  function makeRemoveBtn(id){
    var btn=document.createElement("button");
    btn.type="button";
    btn.className="btn danger remove-item";
    btn.textContent="Remove";
    btn.addEventListener("click",function(e){
      e.preventDefault();
      if(window.Cart&&typeof Cart.remove==="function"){Cart.remove(id);return}
      removeFromStorage(id);
      location.reload()
    });
    return btn
  }

  function placeRemoveRight(item){
    var id=item.getAttribute("data-id")||getItemId(item);
    var qty=item.querySelector(".qty");
    if(!qty) return;
    var btn=item.querySelector(".remove-item")||makeRemoveBtn(id);
    if(btn.parentElement) btn.parentElement.removeChild(btn);
    qty.insertAdjacentElement("afterend",btn)
  }

  function normalize(){
    var items=document.querySelectorAll('#cart-items .item, .cart-item, .item[data-id]');
    items.forEach(function(it){
      hidePlusButtons(it);
      placeRemoveRight(it)
    })
  }

  var mo=new MutationObserver(normalize);
  document.addEventListener("DOMContentLoaded",function(){
    normalize();
    mo.observe(document.body,{childList:true,subtree:true});
    setTimeout(function(){try{mo.disconnect()}catch(_){}} ,5000)
  })
})();
