/* ProductPageReviews.js
   - Adds "Add Review" button and modal on the product detail page
   - Stores reviews locally in localStorage under key 'productReviews'
   - Appends local reviews to the existing reviews list and updates averages
*/
(function () {
  function getLocalReviewsMap() {
    try { return JSON.parse(localStorage.getItem('productReviews') || '{}'); }
    catch (e) { return {}; }
  }

  function getLocalReviewsFor(id) {
    const map = getLocalReviewsMap();
    return map[id] || [];
  }

  function saveLocalReview(id, review) {
    const map = getLocalReviewsMap();
    if (!map[id]) map[id] = [];
    map[id].push(review);
    localStorage.setItem('productReviews', JSON.stringify(map));
  }

  function formatDateIso(d) {
    const dt = new Date(d);
    return dt.toISOString().split('T')[0];
  }

  function buildReviewNode(r) {
    const div = document.createElement('div');
    div.className = 'review-item';
    const stars = '★'.repeat(Math.round(r.rating || 0)) + '☆'.repeat(5 - Math.round(r.rating || 0));
    div.innerHTML = `
      <div class="review-header">
        <span class="reviewer-name">${r.user || 'Anonymous'}</span>
        <span class="review-stars">${stars}</span>
        <span class="review-date">${r.date || ''}</span>
      </div>
      <div>
        <h4 style="color: #2c3e50; margin-bottom: 0.5rem; font-size: 1.1rem;">${r.title || 'Review'}</h4>
        <p class="review-text">${r.text || ''}</p>
      </div>`;
    return div;
  }

  function parseFootwearFallbackReviews() {
    // footwearReviews is defined in ProductPage.js when present
    try {
      if (typeof footwearReviews === 'object') return footwearReviews;
    } catch (e) { }
    return {};
  }

  function computeBaseReviews() {
    // Return an array of reviews in {rating, user, date, title, text} shape
    if (!window.currentProduct) return [];
    if (Array.isArray(window.currentProduct.reviews) && window.currentProduct.reviews.length) {
      return window.currentProduct.reviews.map(r => ({ rating: r.rating || 0, user: r.user || r.name || 'Customer', date: r.date || '', title: r.title || '', text: r.text || '' }));
    }
    const fr = parseFootwearFallbackReviews();
    const frForId = fr[window.currentProduct.id];
    if (frForId && Array.isArray(frForId.reviews)) {
      return frForId.reviews.map(r => ({ rating: (r.stars||'').split('★').length - 1 || 0, user: r.name || 'Customer', date: r.date || '', title: r.title || '', text: r.text || '' }));
    }
    return [];
  }

  function refreshLocalReviewsInDOM() {
    if (!window.currentProduct) return;
    const id = window.currentProduct.id;
    const list = document.getElementById('reviewsList');
    if (!list) return;

    // Remove any previously injected local reviews (mark with data-local)
    list.querySelectorAll('[data-local-review]').forEach(n => n.remove());

    const local = getLocalReviewsFor(id);
    local.forEach(r => {
      const node = buildReviewNode(r);
      node.setAttribute('data-local-review', '1');
      list.appendChild(node);
    });

    // Recompute overall rating and count
    const base = computeBaseReviews();
    const all = base.concat(local);
    const avg = all.length ? (all.reduce((s, x) => s + (Number(x.rating) || 0), 0) / all.length) : (window.currentProduct ? (window.currentProduct.rating || 0) : 0);
    const bigRating = document.querySelector('.big-rating');
    const reviewCount = document.querySelector('.review-count');
    const starsDisplay = document.querySelector('.overall-rating .stars');

    if (bigRating) bigRating.textContent = avg.toFixed(1);
    if (reviewCount) reviewCount.textContent = `Based on ${all.length} reviews`;
    if (starsDisplay) {
      const rounded = Math.round(avg);
      starsDisplay.innerHTML = '★'.repeat(rounded) + '☆'.repeat(5 - rounded);
    }
  }

  function createReviewModal() {
    if (document.getElementById('reviewModal')) return; // already created
    // Add modal styles if not present
    if (!document.getElementById('reviewModalStyles')) {
      const style = document.createElement('style');
      style.id = 'reviewModalStyles';
      style.textContent = `
        /* Review item styling */
        .review-item {
          padding: 1.5rem;
          background: white;
          border: 1px solid #e9ecef;
          border-radius: 8px;
          margin-bottom: 1rem;
          transition: transform 0.2s ease;
          box-shadow: 0 2px 4px rgba(0,0,0,0.05);
        }
        .review-item:hover {
          transform: translateY(-2px);
          box-shadow: 0 4px 8px rgba(0,0,0,0.1);
        }
        .review-header {
          display: flex;
          align-items: center;
          gap: 1rem;
          margin-bottom: 1rem;
          flex-wrap: wrap;
        }
        .reviewer-name {
          font-weight: 600;
          color: #2c3e50;
        }
        .review-stars {
          color: #f39c12;
          letter-spacing: 1px;
        }
        .review-date {
          color: #7f8c8d;
          font-size: 0.9rem;
          margin-left: auto;
        }
        .review-text {
          color: #6c757d;
          line-height: 1.6;
          font-size: 1rem;
        }
        .review-modal-content {
          background: white;
          width: 90%;
          max-width: 600px;
          padding: 2rem;
          border-radius: 10px;
          position: relative;
        }
        .review-form-field {
          margin-bottom: 1.5rem;
        }
        .review-form-field label {
          display: block;
          margin-bottom: 0.5rem;
          font-weight: 600;
          color: #2c3e50;
        }
        .review-form-input {
          width: 100%;
          padding: 0.8rem 1rem;
          border: 2px solid #e9ecef;
          border-radius: 8px;
          font-size: 1rem;
          transition: all 0.3s ease;
        }
        .review-form-input:focus {
          outline: none;
          border-color: #e67e22;
        }
        .review-form-actions {
          display: flex;
          gap: 1rem;
          justify-content: flex-end;
          margin-top: 2rem;
        }
        .review-form-actions .btn {
          min-width: 120px;
          padding: 1rem 1.5rem;
          font-size: 1rem;
          font-weight: 600;
          border: none;
          border-radius: 8px;
          cursor: pointer;
          transition: all 0.3s ease;
        }
        .review-form-actions .btn-secondary {
          background: #f3f4f6;
          color: #4b5563;
          border: 1px solid #e5e7eb;
        }
        .review-form-actions .btn-secondary:hover {
          background: #e5e7eb;
          color: #374151;
        }
        .review-form-actions .btn-primary {
          background: #e67e22;
          color: white;
        }
        .review-form-actions .btn-primary:hover {
          background: #d35400;
          transform: translateY(-1px);
          box-shadow: 0 4px 6px rgba(230, 126, 34, 0.2);
        }
      `;
      document.head.appendChild(style);
    }

    const modal = document.createElement('div');
    modal.id = 'reviewModal';
    modal.className = 'zoom-modal'; // use existing ProductPage modal style
    modal.style.display = 'none';
    modal.innerHTML = `
      <div class="review-modal-content">
        <span class="zoom-close" id="reviewModalClose">&times;</span>
        <h2 style="margin-bottom:1.5rem;color:#2c3e50;font-size:1.8rem;">Write a Review</h2>
        <form id="reviewForm">
          <div class="review-form-field">
            <label>Your name (optional)</label>
            <input type="text" id="reviewUser" class="review-form-input" placeholder="Your name">
          </div>
          <div class="review-form-field">
            <label>Review Title</label>
            <input type="text" id="reviewTitle" class="review-form-input" placeholder="Summary of your experience" required>
          </div>
          <div class="review-form-field">
            <label>Rating</label>
            <select id="reviewRating" class="review-form-input" required>
              <option value="5">5 - Excellent</option>
              <option value="4">4 - Very good</option>
              <option value="3">3 - Good</option>
              <option value="2">2 - Fair</option>
              <option value="1">1 - Poor</option>
            </select>
          </div>
          <div class="review-form-field">
            <label>Your Review</label>
            <textarea id="reviewText" class="review-form-input" rows="5" placeholder="Tell others what you think about this product" required></textarea>
          </div>
          <div class="review-form-actions">
            <button type="button" class="btn btn-secondary" id="cancelReviewBtn">Cancel</button>
            <button type="submit" class="btn btn-primary">Submit Review</button>
          </div>
        </form>
      </div>`;
    document.body.appendChild(modal);

    // Improved event handling and bubbling prevention
    document.getElementById('reviewModalClose').addEventListener('click', hideReviewModal);
    document.getElementById('cancelReviewBtn').addEventListener('click', hideReviewModal);

    // Stop click propagation from modal content to prevent accidental closes
    const modalContent = modal.querySelector('.review-modal-content');
    modalContent.addEventListener('click', function(e) {
      e.stopPropagation();
    });

    // Close on background click
    modal.addEventListener('click', function(e) {
      if (e.target === modal) {
        e.preventDefault();
        e.stopPropagation();
        hideReviewModal();
      }
    });

    const form = document.getElementById('reviewForm');
    form.addEventListener('submit', function(e) {
      e.preventDefault();
      e.stopPropagation();
      submitReviewFromForm();
    });

    // Close on Escape key
    document.addEventListener('keydown', function(e) {
      if (e.key === 'Escape' && modal.style.display === 'flex') {
        hideReviewModal();
      }
    });
  }

  function showReviewModal() {
    createReviewModal();
    const modal = document.getElementById('reviewModal');
    if (!modal) return;
    modal.style.display = 'flex';
    document.body.style.overflow = 'hidden';
    // reset fields
    document.getElementById('reviewUser').value = '';
    document.getElementById('reviewTitle').value = '';
    document.getElementById('reviewRating').value = '5';
    document.getElementById('reviewText').value = '';
  }

  function hideReviewModal() {
    const modal = document.getElementById('reviewModal');
    if (!modal) return;
    modal.style.display = 'none';
    document.body.style.overflow = 'auto';
  }

  function submitReviewFromForm() {
    if (!window.currentProduct) {
      showInlineMessage('Error: Could not find product information', 'error');
      return;
    }

    const id = window.currentProduct.id;
    if (!id) {
      showInlineMessage('Error: Invalid product ID', 'error');
      return;
    }

    // Get form elements
    const userInput = document.getElementById('reviewUser');
    const titleInput = document.getElementById('reviewTitle');
    const ratingInput = document.getElementById('reviewRating');
    const textInput = document.getElementById('reviewText');

    // Validate required fields
    if (!titleInput || !ratingInput || !textInput) {
      showInlineMessage('Error: Form fields not found', 'error');
      return;
    }

    // Get and validate values
    const user = (userInput?.value || '').trim() || 'Anonymous';
    const title = titleInput.value.trim();
    const rating = parseInt(ratingInput.value, 10);
    const text = textInput.value.trim();

    // Additional validation
    if (!title) {
      showInlineMessage('Please enter a review title', 'error');
      titleInput.focus();
      return;
    }

    if (!text) {
      showInlineMessage('Please enter your review', 'error');
      textInput.focus();
      return;
    }

    if (isNaN(rating) || rating < 1 || rating > 5) {
      showInlineMessage('Please select a valid rating', 'error');
      ratingInput.focus();
      return;
    }

    try {
      const review = { user, title, rating, text, date: formatDateIso(new Date()) };
      saveLocalReview(id, review);
      hideReviewModal();
      refreshLocalReviewsInDOM();
      showInlineMessage('Thanks — your review was added!', 'success');
    } catch (error) {
      console.error('Error saving review:', error);
      showInlineMessage('Sorry, there was an error saving your review. Please try again.', 'error');
    }
  }

  function showInlineMessage(text, type = 'success') {
    // small, ephemeral banner near reviews
    const container = document.querySelector('.reviews-content') || document.body;
    const msg = document.createElement('div');
    msg.className = `notification notification-${type}`;
    msg.style.cssText = `
      position: fixed;
      top: 20px;
      left: 50%;
      transform: translateX(-50%);
      background: ${type === 'error' ? '#fee2e2' : '#ecfdf5'};
      border: 1px solid ${type === 'error' ? '#fecaca' : '#d1fae5'};
      color: ${type === 'error' ? '#dc2626' : '#059669'};
      padding: 1rem 2rem;
      border-radius: 8px;
      font-weight: 600;
      box-shadow: 0 4px 6px ${type === 'error' ? 'rgba(220, 38, 38, 0.1)' : 'rgba(5, 150, 105, 0.1)'};
      z-index: 9999;
    `;
    msg.innerHTML = text;
    document.body.appendChild(msg);
    
    // Remove the message after delay
    setTimeout(() => {
      msg.style.opacity = '0';
      msg.style.transform = 'translate(-50%, -20px)';
      msg.style.transition = 'all 0.3s ease';
      setTimeout(() => msg.remove(), 300);
    }, 3000);
  }

  function insertAddReviewButton() {
    const reviewsPanel = document.getElementById('reviews');
    if (!reviewsPanel) return;
    const existing = document.getElementById('addReviewButton');
    if (existing) return;
    const btn = document.createElement('button');
    btn.id = 'addReviewButton';
    btn.className = 'btn btn-primary';
    btn.style.cssText = `
      margin: 0 0 2rem 0;
      padding: 1rem 2rem;
      font-size: 1.1rem;
      font-weight: 600;
      min-width: 200px;
      background: #e67e22;
      color: white;
      border: none;
      border-radius: 8px;
      cursor: pointer;
      transition: all 0.3s ease;
      text-transform: uppercase;
      letter-spacing: 0.5px;
      box-shadow: 0 4px 6px rgba(230, 126, 34, 0.2);
    `;
    btn.innerHTML = '<i class="fas fa-star" style="margin-right:0.5rem;"></i>Add Review';
    btn.addEventListener('click', function (e) {
      e.preventDefault();
      e.stopPropagation();
      showReviewModal();
    });
    btn.addEventListener('mouseover', function() {
      this.style.background = '#d35400';
      this.style.transform = 'translateY(-2px)';
      this.style.boxShadow = '0 6px 12px rgba(230, 126, 34, 0.3)';
    });
    btn.addEventListener('mouseout', function() {
      this.style.background = '#e67e22';
      this.style.transform = 'translateY(0)';
      this.style.boxShadow = '0 4px 6px rgba(230, 126, 34, 0.2)';
    });
    const container = reviewsPanel.querySelector('.reviews-summary');
    if (container) container.parentNode.insertBefore(btn, container.nextSibling);
  }

  function initProductInfo() {
    if (!window.currentProduct) {
      const body = document.body;
      window.currentProduct = {
        id: body.dataset.productId || '',
        title: body.dataset.productTitle || '',
        price: parseFloat(body.dataset.productPrice || '0'),
        image: body.dataset.productImage || '',
        brand: body.dataset.productBrand || '',
        descriptor: body.dataset.productDescriptor || ''
      };
    }
  }

  function initReviewFeature() {
    initProductInfo();
    insertAddReviewButton();
    createReviewModal();
    // After initial display from ProductPage.js, append local reviews
    setTimeout(refreshLocalReviewsInDOM, 200);
  }

  document.addEventListener('DOMContentLoaded', initReviewFeature);

})();
