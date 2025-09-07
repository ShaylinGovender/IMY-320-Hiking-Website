(function () {
  var el = document.getElementById('cardExpiry');
  if (!el) return;

  el.setAttribute('inputmode', 'numeric');
  el.placeholder = 'MM/YY';

  el.addEventListener('input', function () {
    var v = el.value.replace(/\D/g, '').slice(0, 4);
    if (v.length >= 1 && v[0] > '1') v = '0' + v;
    var mm = v.slice(0, 2);
    if (mm.length === 2) {
      if (+mm === 0) mm = '01';
      else if (+mm > 12) mm = '12';
    }
    if (v.length > 2) el.value = mm + '/' + v.slice(2);
    else el.value = v;
  });

  el.addEventListener('keydown', function (e) {
    var pos = el.selectionStart || 0;
    if (e.key === 'Backspace' && pos === 3 && el.value.charAt(2) === '/') {
      e.preventDefault();
      el.setSelectionRange(2, 2);
    }
  });
})();
