
(function(){
  function parsePriceZA(s){
    if(!s)return 0;
    var t=s.replace(/[^\d,.,-]/g,'').replace(/\s/g,'');
    var comma=t.lastIndexOf(','), dot=t.lastIndexOf('.');
    var nStr;
    if(comma>dot){ nStr=t.replace(/\./g,'').replace(',', '.'); }
    else{ nStr=t.replace(/,/g,''); }
    var n=parseFloat(nStr);
    return isNaN(n)?0:n;
  }
  document.addEventListener('click',function(e){
    var btn=e.target.closest('.product-actions .btn-primary,[data-add-to-cart]');
    if(!btn)return;
    e.preventDefault();
    var row=btn.closest('.product-item')||document;
    var title=(row.querySelector('.product-details h3,.product-name,[data-title]')||{}).textContent||'Item';
    var brand=(row.querySelector('.product-brand-main,.product-brand,[data-brand]')||{}).textContent||'';
    var priceText=(row.querySelector('.product-price,[data-price]')||{}).textContent||'0';
    var imgEl=row.querySelector('img.product-image, .product-image img, img');
    var image=imgEl?imgEl.src:'';
    var id=(row.getAttribute('data-id')||(title+'-'+brand)).toLowerCase().replace(/[^a-z0-9]+/g,'-');
    var price=parsePriceZA(priceText);
    var product={id:id,title:title.trim(),price:price,image:image,brand:brand.trim(),descriptor:'',link:location.href,availability:'in_stock',availabilityDate:new Date().toISOString()};
    Cart.add(product,1);
  });
})();
