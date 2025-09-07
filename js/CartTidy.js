(function(){
  function txt(el){return (el && el.textContent || '').trim()}
  function hidePlus(item){
    item.querySelectorAll('button').forEach(function(b){
      var t=txt(b)
      if(t==='+'||b.classList.contains('increase')||b.getAttribute('aria-label')==='increase'){
        b.style.display='none'
      }
    })
  }
  function ensureRemove(item){
    if(item.querySelector('.remove-item')) return
    var id=item.getAttribute('data-id')||''
    var host=(item.querySelector('.qty')||{}).parentElement||item.lastElementChild||item
    var btn=document.createElement('button')
    btn.className='btn danger remove-item'
    btn.textContent='Remove'
    btn.addEventListener('click',function(e){
      e.preventDefault()
      if(window.Cart&&Cart.remove){Cart.remove(id);return}
      var keys=['tb_cart_v1','cart']
      for(var i=0;i<keys.length;i++){
        try{
          var k=keys[i],arr=JSON.parse(localStorage.getItem(k)||'[]')
          var out=arr.filter(function(it){return (it.id||'')!==id})
          if(out.length!==arr.length){localStorage.setItem(k,JSON.stringify(out));break}
        }catch(_){}
      }
      location.reload()
    })
    host.appendChild(btn)
  }
  function run(){
    document.querySelectorAll('#cart-items .item').forEach(function(item){
      hidePlus(item)
      ensureRemove(item)
    })
  }
  document.addEventListener('DOMContentLoaded',run)
})()
