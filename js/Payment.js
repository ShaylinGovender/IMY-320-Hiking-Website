(function(){
  function validateCardNumber(number) {
    number = number.replace(/[\s-]/g, '');
    
    if (!/^\d{13,19}$/.test(number)) {
      return false;
    }
    
    let sum = 0;
    let isEven = false;
    
    for (let i = number.length - 1; i >= 0; i--) {
      let digit = parseInt(number[i]);
      
      if (isEven) {
        digit *= 2;
        if (digit > 9) {
          digit -= 9;
        }
      }
      
      sum += digit;
      isEven = !isEven;
    }
    
    return sum % 10 === 0;
  }
  
  function validateExpiry(expiry) {
    // Format: MM/YY
    const match = expiry.match(/^(\d{2})\/(\d{2})$/);
    if (!match) return false;
    
    const month = parseInt(match[1]);
    const year = parseInt('20' + match[2]);
    
    if (month < 1 || month > 12) return false;
    
    const now = new Date();
    const currentYear = now.getFullYear();
    const currentMonth = now.getMonth() + 1;
    
    if (year < currentYear || (year === currentYear && month < currentMonth)) {
      return false;
    }
    
    return true;
  }
  
  function validateCVC(cvc) {
    return /^\d{3,4}$/.test(cvc);
  }
  
  function validateCardName(name) {
    return name.trim().length >= 3 && /^[a-zA-Z\s]+$/.test(name);
  }
  
  // Format card number with spaces
  function formatCardNumber(value) {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    const matches = v.match(/\d{4,16}/g);
    const match = (matches && matches[0]) || '';
    const parts = [];
    
    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4));
    }
    
    if (parts.length) {
      return parts.join(' ');
    } else {
      return value;
    }
  }
  
  // Show error message
  function showError(field, message) {
    const errorDiv = field.parentElement.querySelector('.error-message') || document.createElement('div');
    errorDiv.className = 'error-message';
    errorDiv.style.cssText = 'color:#e74c3c;font-size:0.85rem;margin-top:4px;';
    errorDiv.textContent = message;
    
    if (!field.parentElement.querySelector('.error-message')) {
      field.parentElement.appendChild(errorDiv);
    }
    
    field.style.borderColor = '#e74c3c';
  }
  
  function clearError(field) {
    const errorDiv = field.parentElement.querySelector('.error-message');
    if (errorDiv) {
      errorDiv.remove();
    }
    field.style.borderColor = '';
  }
  
  function fillSummary(){
    const cart = Cart.items();
    const draft = Cart.loadDraft();
    const totals = Cart.totals({
      discountCode: draft.discountCode || '',
      shippingMethod: draft.shippingMethod || 'standard'
    });
    
    const el = document.getElementById('payment-summary');
    el.innerHTML = `
      <div class="line"><span>Items</span><strong>${Cart.count()}</strong></div>
      <div class="line shipping"><span><i class="fas fa-shipping-fast"></i> Shipping (${draft.shippingMethod || 'standard'})</span><strong class="shipping-amount">R${totals.shipping.toFixed(2)}</strong></div>
      <hr>
      <div class="line"><span>Subtotal</span><span class="amount">R${totals.subtotal.toFixed(2)}</span></div>
      <div class="line"><span>Discount</span><span class="amount discount-amount">-R${totals.discount.toFixed(2)}</span></div>
      <div class="line"><span>Shipping</span><span class="amount shipping-amount">R${totals.shipping.toFixed(2)}</span></div>
      <div class="line"><span>Tax (15%)</span><span class="amount tax-amount">R${totals.tax.toFixed(2)}</span></div>
      <div class="line total"><span><i class="fas fa-calculator"></i> <strong>Total</strong></span><span class="amount total-amount"><strong>R${totals.total.toFixed(2)}</strong></span></div>`;
  }
  
  function toggleCard(){
    const val = document.querySelector('input[name="method"]:checked').value;
    document.getElementById('card-fields').style.display = val === 'card' ? 'block' : 'none';
  }
  
  document.addEventListener('change', e => {
    if(e.target.name === 'method') toggleCard();
  });
  
  // Card number formatting
  const cardNumberInput = document.getElementById('cardNumber');
  if (cardNumberInput) {
    cardNumberInput.addEventListener('input', function(e) {
      this.value = formatCardNumber(this.value);
      clearError(this);
    });
    
    cardNumberInput.addEventListener('blur', function() {
      if (this.value && !validateCardNumber(this.value)) {
        showError(this, 'Invalid card number');
      }
    });
  }
  
  // Expiry validation
  const expiryInput = document.getElementById('cardExpiry');
  if (expiryInput) {
    expiryInput.addEventListener('blur', function() {
      if (this.value && !validateExpiry(this.value)) {
        showError(this, 'Invalid expiry date (MM/YY)');
      }
    });
    
    expiryInput.addEventListener('input', function() {
      clearError(this);
    });
  }
  
  // CVC validation
  const cvcInput = document.getElementById('cardCvc');
  if (cvcInput) {
    cvcInput.addEventListener('blur', function() {
      if (this.value && !validateCVC(this.value)) {
        showError(this, 'Invalid CVC (3-4 digits)');
      }
    });
    
    cvcInput.addEventListener('input', function(e) {
      this.value = this.value.replace(/[^0-9]/g, '');
      clearError(this);
    });
  }
  
  // Card name validation
  const cardNameInput = document.getElementById('cardName');
  if (cardNameInput) {
    cardNameInput.addEventListener('blur', function() {
      if (this.value && !validateCardName(this.value)) {
        showError(this, 'Please enter a valid name');
      }
    });
    
    cardNameInput.addEventListener('input', function() {
      clearError(this);
    });
  }
  
  document.getElementById('payment-form').addEventListener('submit', e => {
    e.preventDefault();
    
    const paymentMethod = document.querySelector('input[name="method"]:checked').value;
    let isValid = true;
    
    // Validate card fields if card payment selected
    if (paymentMethod === 'card') {
      const cardNumber = cardNumberInput.value;
      const cardExpiry = expiryInput.value;
      const cardCvc = cvcInput.value;
      const cardName = cardNameInput.value;
      
      if (!cardNumber) {
        showError(cardNumberInput, 'Card number is required');
        isValid = false;
      } else if (!validateCardNumber(cardNumber)) {
        showError(cardNumberInput, 'Invalid card number');
        isValid = false;
      }
      
      if (!cardExpiry) {
        showError(expiryInput, 'Expiry date is required');
        isValid = false;
      } else if (!validateExpiry(cardExpiry)) {
        showError(expiryInput, 'Invalid or expired date');
        isValid = false;
      }
      
      if (!cardCvc) {
        showError(cvcInput, 'CVC is required');
        isValid = false;
      } else if (!validateCVC(cardCvc)) {
        showError(cvcInput, 'Invalid CVC');
        isValid = false;
      }
      
      if (!cardName) {
        showError(cardNameInput, 'Cardholder name is required');
        isValid = false;
      } else if (!validateCardName(cardName)) {
        showError(cardNameInput, 'Invalid name');
        isValid = false;
      }
      
      if (!isValid) {
        return;
      }
    }
    
    document.getElementById('paying').classList.remove('hidden');
    document.getElementById('pay-btn').disabled = true;
    
    setTimeout(() => {
      const cart = Cart.items();
      
      if (!cart || cart.length === 0) {
        console.error('No items in cart');
        location.href = './Cart.html';
        return;
      }
      
      const draft = Cart.loadDraft();
      const totals = Cart.totals({
        discountCode: draft.discountCode || '',
        shippingMethod: draft.shippingMethod || 'standard'
      });
      
      const order = {
        id: 'ORD' + Date.now(),
        items: cart,
        totals: totals,
        paymentMethod: paymentMethod,
        createdAt: new Date().toISOString()
      };
      
      console.log('Payment: Saving order:', order);
      
      localStorage.setItem('tb_last_order', JSON.stringify(order));
      
      if (Cart.saveLastOrder) {
        Cart.saveLastOrder(order);
      }
      
      Cart.clear();
      
      location.href = './OrderSuccess.html';
    }, 1200);
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