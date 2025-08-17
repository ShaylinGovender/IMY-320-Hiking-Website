// Product Page JavaScript
// Handles product display, interactions, and functionality

// Import products from catalogue (will be shared)
const products = [
    {
        id: 1,
        name: "Women's Hiking Boots",
        brand: "TrailMaster",
        category: "footwear",
        price: 2699.82,
        originalPrice: 3239.82,
        rating: 4.5,
        description: "Durable waterproof hiking boots with superior ankle support and grip. Perfect for challenging terrain and long-distance hikes.",
        image: "../images/Women-Hiking-Boots.jpg",
        features: ["Waterproof", "Ankle Support", "Vibram Sole", "Breathable"],
        inStock: true,
        dateAdded: "2024-01-15"
    },
    {
        id: 2,
        name: "Hiking Gloves",
        brand: "GripTech",
        category: "accessories",
        price: 539.82,
        originalPrice: null,
        rating: 4.2,
        description: "Lightweight, breathable hiking gloves with enhanced grip and touchscreen compatibility. Ideal for trail navigation and protection.",
        image: "../images/Hiking-Gloves.jpg",
        features: ["Touchscreen Compatible", "Breathable", "Enhanced Grip", "Lightweight"],
        inStock: true,
        dateAdded: "2024-02-01"
    },
    {
        id: 3,
        name: "Backpacking Gear Essentials",
        brand: "AdventurePro",
        category: "gear",
        price: 5399.82,
        originalPrice: 6299.82,
        rating: 4.8,
        description: "Complete backpacking gear set including sleeping bag, camping mat, portable stove, and essential survival tools.",
        image: "../images/Backpacking-Gear-Essentials.jpg",
        features: ["Complete Set", "Lightweight", "Compact", "Weather Resistant"],
        inStock: true,
        dateAdded: "2024-01-20"
    },
    {
        id: 5,
        name: "GPS Navigation Device",
        brand: "TrailTech",
        category: "safety",
        price: 4499.82,
        originalPrice: null,
        rating: 4.4,
        description: "Advanced GPS device with topographic maps, weather alerts, and emergency SOS functionality. Essential for backcountry adventures.",
        image: "../images/Hiking-Gloves.jpg",
        features: ["GPS Navigation", "Topographic Maps", "Weather Alerts", "SOS Function"],
        inStock: false,
        dateAdded: "2024-01-30"
    },
    {
        id: 6,
        name: "Ultralight Hiking Jacket",
        brand: "WindShield",
        category: "clothing",
        price: 3419.82,
        originalPrice: 4139.82,
        rating: 4.3,
        description: "Packable ultralight jacket with wind and water resistance. Perfect for unpredictable mountain weather conditions.",
        image: "../images/hikingjacket.jpg",
        features: ["Ultralight", "Packable", "Water Resistant", "Wind Proof"],
        inStock: true,
        dateAdded: "2024-02-05"
    },
    {
        id: 7,
        name: "Trekking Poles Set",
        brand: "StableStep",
        category: "gear",
        price: 1619.82,
        originalPrice: null,
        rating: 4.7,
        description: "Adjustable carbon fiber trekking poles with ergonomic grips and shock absorption. Reduces strain on knees and improves stability.",
        image: "../images/Women-Hiking-Boots.jpg",
        features: ["Carbon Fiber", "Adjustable", "Shock Absorption", "Ergonomic"],
        inStock: true,
        dateAdded: "2024-01-25"
    },
    {
        id: 8,
        name: "Trail Running Shoes",
        brand: "SpeedTrail",
        category: "footwear",
        price: 2339.82,
        originalPrice: 2879.82,
        rating: 4.4,
        description: "Lightweight trail running shoes with aggressive tread pattern and rock protection. Built for speed on technical terrain.",
        image: "../images/Trail Running Shoes.jpg",
        features: ["Lightweight", "Rock Protection", "Aggressive Tread", "Quick Dry"],
        inStock: true,
        dateAdded: "2024-02-12"
    },
    {
        id: 9,
        name: "Hydration Backpack",
        brand: "HydroFlow",
        category: "gear",
        price: 2159.82,
        originalPrice: null,
        rating: 4.5,
        description: "25L hydration pack with 3L reservoir, multiple compartments, and breathable back panel. Perfect for day hikes and trail running.",
        image: "../images/Backpacking-Gear-Essentials.jpg",
        features: ["3L Reservoir", "25L Capacity", "Breathable", "Multiple Pockets"],
        inStock: true,
        dateAdded: "2024-01-18"
    },
    {
        id: 10,
        name: "Camping Headlamp",
        brand: "BrightBeam",
        category: "accessories",
        price: 899.82,
        originalPrice: 1169.82,
        rating: 4.6,
        description: "High-powered LED headlamp with multiple brightness settings, red light mode, and waterproof design. Essential for night hiking.",
        image: "../images/headlamp.jpg",
        features: ["LED Light", "Multiple Modes", "Waterproof", "Long Battery"],
        inStock: true,
        dateAdded: "2024-02-08"
    },
    {
        id: 11,
        name: "Mountaineering Boots",
        brand: "AlpinePro",
        category: "footwear",
        price: 4199.82,
        originalPrice: 4799.82,
        rating: 4.7,
        description: "Heavy-duty mountaineering boots designed for extreme alpine conditions. Featuring rigid construction, crampon compatibility, and superior insulation for high-altitude adventures.",
        image: "../images/Mountaineering Boots.jpeg",
        features: ["Crampon Compatible", "Insulated", "Rigid Construction", "Alpine Ready"],
        inStock: true,
        dateAdded: "2024-01-10"
    },
    {
        id: 12,
        name: "Lightweight Hiking Sandals",
        brand: "ComfortWalk",
        category: "footwear",
        price: 1299.82,
        originalPrice: null,
        rating: 4.2,
        description: "Ultra-lightweight hiking sandals with superior comfort and excellent grip. Perfect for warm weather adventures, river crossings, and casual trail walking.",
        image: "../images/Lightweight Hiking Sandals.jpeg",
        features: ["Lightweight", "Quick Dry", "Adjustable Straps", "Excellent Grip"],
        inStock: true,
        dateAdded: "2024-02-15"
    },
    {
        id: 13,
        name: "Winter Hiking Boots",
        brand: "WinterTrek",
        category: "footwear",
        price: 3599.82,
        originalPrice: 4319.82,
        rating: 4.5,
        description: "Insulated winter hiking boots designed for extreme cold weather conditions. Features waterproof construction, thermal insulation, and aggressive tread for snow and ice traction.",
        image: "../images/Winter Hiking Boots.jpeg",
        features: ["Thermal Insulation", "Waterproof", "Ice Traction", "Cold Weather"],
        inStock: false,
        dateAdded: "2024-01-05"
    },
    {
        id: 15,
        name: "Hiking Cap",
        brand: "SunGuard",
        category: "accessories",
        price: 479.82,
        originalPrice: null,
        rating: 4.3,
        description: "UV protection hiking hat with moisture-wicking band and adjustable chin strap. Keeps you cool and protected.",
        image: "../images/hikingCap3.jpg",
        features: ["UV Protection", "Moisture Wicking", "Adjustable", "Lightweight"],
        inStock: true,
        dateAdded: "2024-01-28"
    },
    {
        id: 21,
        name: "Emergency Whistle",
        brand: "SafeSound",
        category: "safety",
        price: 179.82,
        originalPrice: null,
        rating: 4.5,
        description: "High-decibel emergency whistle with lanyard. Essential safety item for solo hikers and emergency situations.",
        image: "../images/Hiking-Gloves.jpg",
        features: ["High Decibel", "Lightweight", "Lanyard Included", "Weather Resistant"],
        inStock: true,
        dateAdded: "2024-02-12"
    },
    {
        id: 24,
        name: "Reflective Safety Vest",
        brand: "VisibleTrek",
        category: "safety",
        price: 359.82,
        originalPrice: 479.82,
        rating: 4.2,
        description: "High-visibility reflective vest for early morning or late evening hikes. Lightweight and adjustable.",
        image: "../images/Hiking-Gloves.jpg",
        features: ["High Visibility", "Reflective", "Lightweight", "Adjustable"],
        inStock: true,
        dateAdded: "2024-02-05"
    }
];

// Global variables
let currentProduct = null;
let quantity = 1;
let cart = JSON.parse(localStorage.getItem('cart')) || [];
let wishlist = JSON.parse(localStorage.getItem('wishlist')) || [];

// Initialize page when DOM loads
document.addEventListener('DOMContentLoaded', function() {
    // Get product ID from URL parameters
    const urlParams = new URLSearchParams(window.location.search);
    const productId = parseInt(urlParams.get('id'));
    
    if (productId) {
        loadProduct(productId);
    } else {
        // Default to first accessory product for demo
        const defaultProduct = products.find(p => p.category === 'accessories');
        if (defaultProduct) {
            loadProduct(defaultProduct.id);
        }
    }
    
    // Initialize other components
    updateCartCount();
    setupEventListeners();
});

// Load and display product details
function loadProduct(productId) {
    currentProduct = products.find(p => p.id === productId);
    
    if (!currentProduct) {
        console.error('Product not found');
        return;
    }
    
    updateProductDisplay();
    generateRelatedProducts();
    updateURL(productId);
}

// Update all product information on the page
function updateProductDisplay() {
    if (!currentProduct) return;
    
    // Update simple breadcrumb
    document.getElementById('breadcrumbCategory').textContent = capitalizeFirst(currentProduct.category);
    document.getElementById('breadcrumbProduct').textContent = currentProduct.name;
    
    // Update product header
    document.getElementById('productBrand').textContent = currentProduct.brand.toUpperCase();
    document.getElementById('productName').textContent = currentProduct.name;
    document.title = `TrailBlazer - ${currentProduct.name}`;
    
    // Update rating
    updateRatingDisplay(currentProduct.rating);
    document.getElementById('ratingScore').textContent = currentProduct.rating;
    
    // Update pricing
    updatePricingDisplay();
    
    // Update stock status
    updateStockStatus();
    
    // Update main image
    document.getElementById('mainProductImage').src = currentProduct.image;
    document.getElementById('mainProductImage').alt = currentProduct.name;
    
    // Hide thumbnail images for Women's Hiking Boots (product ID 1), Trail Running Shoes (product ID 8), Mountaineering Boots (product ID 11), Lightweight Hiking Sandals (product ID 12), and Winter Hiking Boots (product ID 13)
    const thumbnailImages = document.querySelector('.thumbnail-images');
    if (thumbnailImages) {
        if (currentProduct.id === 1 || currentProduct.id === 8 || currentProduct.id === 11 || currentProduct.id === 12 || currentProduct.id === 13) {
            thumbnailImages.style.display = 'none';
        } else {
            thumbnailImages.style.display = 'flex'; // or whatever the default display value is
        }
    }
    
    // Update description
    document.getElementById('productDescription').textContent = currentProduct.description;
    
    // Update features
    updateFeaturesDisplay();
    
    // Update specifications and reviews for footwear products
    updateSpecificationsDisplay();
    updateReviewsDisplay();
    
    // Update wishlist button state
    updateWishlistButton();
}

// Update rating stars display
function updateRatingDisplay(rating) {
    const starsContainer = document.getElementById('productRating');
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;
    let starsHTML = '';
    
    for (let i = 0; i < fullStars; i++) {
        starsHTML += '★';
    }
    if (hasHalfStar) {
        starsHTML += '☆';
    }
    for (let i = fullStars + (hasHalfStar ? 1 : 0); i < 5; i++) {
        starsHTML += '☆';
    }
    
    starsContainer.innerHTML = starsHTML;
}

// Update pricing display
function updatePricingDisplay() {
    document.getElementById('productPrice').textContent = currentProduct.price.toFixed(2);
    
    const originalPriceContainer = document.getElementById('originalPriceContainer');
    
    if (currentProduct.originalPrice) {
        document.getElementById('originalPrice').textContent = currentProduct.originalPrice.toFixed(2);
        originalPriceContainer.style.display = 'flex';
    } else {
        originalPriceContainer.style.display = 'none';
    }
}

// Update stock status
function updateStockStatus() {
    const stockIndicator = document.getElementById('stockIndicator');
    const addToCartBtn = document.querySelector('.add-to-cart-btn');
    
    if (currentProduct.inStock) {
        stockIndicator.className = 'stock-indicator in-stock';
        stockIndicator.innerHTML = '<span class="status-icon">✓</span><span class="status-text">In stock</span>';
        addToCartBtn.disabled = false;
    } else {
        stockIndicator.className = 'stock-indicator out-of-stock';
        stockIndicator.innerHTML = '<span class="status-icon">✗</span><span class="status-text">Currently out of stock</span>';
        addToCartBtn.disabled = true;
    }
}

// Update features display
function updateFeaturesDisplay() {
    const featuresContainer = document.getElementById('productFeatures');
    featuresContainer.innerHTML = '';
    
    currentProduct.features.forEach(feature => {
        const featureItem = document.createElement('div');
        featureItem.className = 'feature-item';
        
        featureItem.innerHTML = `
            <span class="feature-text">${feature}</span>
        `;
        
        featuresContainer.appendChild(featureItem);
    });
}

// Update specifications display based on product type
function updateSpecificationsDisplay() {
    const specsTableBody = document.querySelector('.specs-table');
    if (!specsTableBody) return;
    
    // Define specifications for different footwear products
    const footwearSpecs = {
        1: { // Women's Hiking Boots
            "Material": "Full-grain leather and synthetic mesh",
            "Weight": "620g per pair (size 7)",
            "Sizes Available": "5, 6, 7, 8, 9, 10, 11",
            "Sole": "Vibram® Megagrip outsole",
            "Waterproofing": "GORE-TEX® membrane",
            "Care Instructions": "Clean with brush, air dry, condition leather"
        },
        8: { // Trail Running Shoes
            "Material": "Mesh upper with synthetic overlays",
            "Weight": "280g per pair (size 7)",
            "Sizes Available": "5, 6, 7, 8, 9, 10, 11, 12",
            "Sole": "Aggressive lug outsole",
            "Drop": "4mm heel-to-toe drop",
            "Care Instructions": "Machine wash cold, air dry"
        },
        11: { // Mountaineering Boots
            "Material": "Full leather upper with insulation",
            "Weight": "950g per pair (size 7)",
            "Sizes Available": "6, 7, 8, 9, 10, 11, 12",
            "Sole": "Rigid mountaineering sole",
            "Insulation": "Primaloft® synthetic insulation",
            "Temperature Rating": "-40°C to -10°C",
            "Crampon Compatibility": "C2 (semi-automatic) and C3 (automatic)",
            "Care Instructions": "Clean with brush, air dry, waterproof regularly"
        },
        12: { // Lightweight Hiking Sandals
            "Material": "Synthetic webbing and EVA footbed",
            "Weight": "195g per pair (size 7)",
            "Sizes Available": "5, 6, 7, 8, 9, 10, 11, 12",
            "Sole": "Non-marking rubber outsole",
            "Footbed": "Contoured EVA with arch support",
            "Straps": "Adjustable heel and toe straps",
            "Water Rating": "Quick-dry, suitable for water activities",
            "Care Instructions": "Rinse with water, air dry"
        },
        13: { // Winter Hiking Boots
            "Material": "Waterproof leather with insulated lining",
            "Weight": "780g per pair (size 7)",
            "Sizes Available": "6, 7, 8, 9, 10, 11, 12",
            "Sole": "Deep-lug outsole with ice traction",
            "Insulation": "400g Thinsulate™ insulation",
            "Temperature Rating": "-25°C to 5°C",
            "Waterproofing": "Sealed seam waterproof construction",
            "Height": "7-inch ankle support",
            "Care Instructions": "Clean with damp cloth, air dry, apply waterproofing treatment"
        }
    };
    
    const specs = footwearSpecs[currentProduct.id];
    if (specs) {
        specsTableBody.innerHTML = '';
        Object.entries(specs).forEach(([key, value]) => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${key}</td>
                <td>${value}</td>
            `;
            specsTableBody.appendChild(row);
        });
    }
}

// Update reviews display based on product
function updateReviewsDisplay() {
    const reviewsList = document.querySelector('.reviews-list');
    const overallRating = document.querySelector('.big-rating');
    const reviewCount = document.querySelector('.review-count');
    const starsDisplay = document.querySelector('.overall-rating .stars');
    
    if (!reviewsList) return;
    
    // Define reviews for different footwear products
    const footwearReviews = {
        1: { // Women's Hiking Boots
            rating: 4.5,
            count: 245,
            reviews: [
                {
                    name: "Jennifer L.",
                    stars: "★★★★★",
                    date: "1 week ago",
                    text: "Amazing boots! Completely waterproof and incredibly comfortable even on long hikes. The ankle support is excellent and they have great traction on rocky terrain."
                },
                {
                    name: "Maria K.",
                    stars: "★★★★☆",
                    date: "2 weeks ago",
                    text: "Great quality boots, very durable. Took a few hikes to break them in but now they're perfect. Worth the investment for serious hikers."
                }
            ]
        },
        8: { // Trail Running Shoes
            rating: 4.4,
            count: 189,
            reviews: [
                {
                    name: "Alex R.",
                    stars: "★★★★★",
                    date: "3 days ago",
                    text: "Perfect for trail running! Lightweight yet protective. The grip on technical terrain is outstanding and they drain water quickly."
                },
                {
                    name: "Emily S.",
                    stars: "★★★★☆",
                    date: "1 week ago",
                    text: "Great shoes for fast hiking and trail running. Very comfortable and the rock protection works well. Sizing runs a bit small."
                }
            ]
        },
        11: { // Mountaineering Boots
            rating: 4.7,
            count: 156,
            reviews: [
                {
                    name: "Mark T.",
                    stars: "★★★★★",
                    date: "2 weeks ago",
                    text: "Exceptional boots for serious mountaineering. Used them on a winter ascent and they kept my feet warm and dry in -30°C. Crampon attachment is secure and reliable."
                },
                {
                    name: "Sarah W.",
                    stars: "★★★★★",
                    date: "1 month ago",
                    text: "These boots are built like tanks! Heavy but incredibly durable. Perfect for alpine climbing and glacier travel. The insulation is top-notch."
                }
            ]
        },
        12: { // Lightweight Hiking Sandals
            rating: 4.2,
            count: 127,
            reviews: [
                {
                    name: "Lisa M.",
                    stars: "★★★★☆",
                    date: "5 days ago",
                    text: "Perfect for summer hiking! Super comfortable and they dry incredibly fast after river crossings. Great grip on wet rocks. Sizing is accurate."
                },
                {
                    name: "David R.",
                    stars: "★★★★★",
                    date: "2 weeks ago",
                    text: "Love these sandals! So lightweight I barely notice them. Perfect for warm weather hikes and beach walks. The adjustable straps ensure a perfect fit."
                }
            ]
        },
        13: { // Winter Hiking Boots
            rating: 4.5,
            count: 203,
            reviews: [
                {
                    name: "Michael S.",
                    stars: "★★★★★",
                    date: "1 week ago",
                    text: "Outstanding winter boots! Kept my feet warm and dry during a -20°C winter hike. The ice traction is phenomenal and they're surprisingly comfortable for long distances."
                },
                {
                    name: "Karen J.",
                    stars: "★★★★☆",
                    date: "3 weeks ago",
                    text: "Great boots for winter hiking. Very warm and completely waterproof. They run a bit large, so size down half a size. Worth the investment for serious winter adventurers."
                }
            ]
        }
    };
    
    const productReviews = footwearReviews[currentProduct.id];
    if (productReviews) {
        // Update overall rating
        if (overallRating) overallRating.textContent = productReviews.rating;
        if (reviewCount) reviewCount.textContent = `Based on ${productReviews.count} reviews`;
        if (starsDisplay) {
            const fullStars = Math.floor(productReviews.rating);
            const hasHalfStar = productReviews.rating % 1 >= 0.5;
            let starsHTML = '';
            for (let i = 0; i < fullStars; i++) {
                starsHTML += '★';
            }
            if (hasHalfStar) {
                starsHTML += '☆';
            }
            for (let i = fullStars + (hasHalfStar ? 1 : 0); i < 5; i++) {
                starsHTML += '☆';
            }
            starsDisplay.innerHTML = starsHTML;
        }
        
        // Update reviews list
        reviewsList.innerHTML = '';
        productReviews.reviews.forEach(review => {
            const reviewItem = document.createElement('div');
            reviewItem.className = 'review-item';
            reviewItem.innerHTML = `
                <div class="review-header">
                    <span class="reviewer-name">${review.name}</span>
                    <div class="review-stars">${review.stars}</div>
                    <span class="review-date">${review.date}</span>
                </div>
                <p class="review-text">
                    "${review.text}"
                </p>
            `;
            reviewsList.appendChild(reviewItem);
        });
    }
}

// Setup event listeners
function setupEventListeners() {
    // Image zoom
    document.getElementById('mainProductImage').addEventListener('click', openZoomModal);
    
    // Quantity input validation
    document.getElementById('quantity').addEventListener('change', function() {
        const value = parseInt(this.value);
        if (value < 1) this.value = 1;
        if (value > 10) this.value = 10;
        quantity = parseInt(this.value);
    });
}

// Change main product image
function changeMainImage(src) {
    document.getElementById('mainProductImage').src = src;
    
    // Update thumbnail active state
    document.querySelectorAll('.thumbnail').forEach(thumb => {
        thumb.classList.remove('active');
    });
    event.target.classList.add('active');
}

// Change quantity
function changeQuantity(change) {
    const quantityInput = document.getElementById('quantity');
    let newQuantity = parseInt(quantityInput.value) + change;
    
    if (newQuantity < 1) newQuantity = 1;
    if (newQuantity > 10) newQuantity = 10;
    
    quantityInput.value = newQuantity;
    quantity = newQuantity;
}

// Add product to cart
function addToCart() {
    if (!currentProduct || !currentProduct.inStock) return;
    
    const cartItem = {
        id: currentProduct.id,
        name: currentProduct.name,
        brand: currentProduct.brand,
        price: currentProduct.price,
        image: currentProduct.image,
        quantity: quantity,
        dateAdded: new Date().toISOString()
    };
    
    // Check if item already exists in cart
    const existingItemIndex = cart.findIndex(item => 
        item.id === cartItem.id
    );
    
    if (existingItemIndex > -1) {
        cart[existingItemIndex].quantity += quantity;
    } else {
        cart.push(cartItem);
    }
    
    // Save to localStorage
    localStorage.setItem('cart', JSON.stringify(cart));
    
    // Update UI
    updateCartCount();
    showAddToCartFeedback();
}

// Show add to cart feedback
function showAddToCartFeedback() {
    const btn = document.querySelector('.add-to-cart-btn');
    const originalText = btn.innerHTML;
    
    btn.classList.add('added');
    btn.innerHTML = 'Added to Cart';
    btn.disabled = true;
    
    setTimeout(() => {
        btn.classList.remove('added');
        btn.innerHTML = originalText;
        btn.disabled = false;
    }, 3000);
}

// Toggle wishlist
function toggleWishlist() {
    if (!currentProduct) return;
    
    const btn = document.querySelector('.wishlist-btn');
    const isInWishlist = wishlist.some(item => item.id === currentProduct.id);
    
    if (isInWishlist) {
        wishlist = wishlist.filter(item => item.id !== currentProduct.id);
        btn.classList.remove('active');
        btn.querySelector('.heart-icon').textContent = '♡';
    } else {
        wishlist.push({
            id: currentProduct.id,
            name: currentProduct.name,
            price: currentProduct.price,
            image: currentProduct.image,
            dateAdded: new Date().toISOString()
        });
        btn.classList.add('active');
        btn.querySelector('.heart-icon').textContent = '♥';
    }
    
    localStorage.setItem('wishlist', JSON.stringify(wishlist));
}

// Update wishlist button state
function updateWishlistButton() {
    const btn = document.querySelector('.wishlist-btn');
    const isInWishlist = wishlist.some(item => item.id === currentProduct.id);
    
    if (isInWishlist) {
        btn.classList.add('active');
        btn.querySelector('.heart-icon').textContent = '♥';
    } else {
        btn.classList.remove('active');
        btn.querySelector('.heart-icon').textContent = '♡';
    }
}

// Update cart count display
function updateCartCount() {
    const cartCount = document.querySelector('.cart-count');
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    cartCount.textContent = totalItems;
}

// Show tab content
function showTab(tabName) {
    // Hide all tab panels
    document.querySelectorAll('.tab-panel').forEach(panel => {
        panel.classList.remove('active');
    });
    
    // Remove active class from all tab buttons
    document.querySelectorAll('.tab-button').forEach(button => {
        button.classList.remove('active');
    });
    
    // Show selected tab panel
    document.getElementById(tabName).classList.add('active');
    
    // Add active class to clicked button
    event.target.classList.add('active');
}

// Generate related products
function generateRelatedProducts() {
    if (!currentProduct) return;
    
    // Get products from same category, excluding current product
    const relatedProducts = products
        .filter(p => p.category === currentProduct.category && p.id !== currentProduct.id)
        .slice(0, 4);
    
    const container = document.getElementById('relatedProductsGrid');
    container.innerHTML = '';
    
    relatedProducts.forEach(product => {
        const productCard = document.createElement('div');
        productCard.className = 'related-product-card';
        productCard.onclick = () => loadProduct(product.id);
        
        productCard.innerHTML = `
            <img src="${product.image}" alt="${product.name}" class="related-product-image">
            <div class="related-product-info">
                <div class="related-product-name">${product.name}</div>
                <div class="related-product-price">R${product.price.toFixed(2)}</div>
            </div>
        `;
        
        container.appendChild(productCard);
    });
}

// Open image zoom modal
function openZoomModal() {
    const modal = document.getElementById('imageZoomModal');
    const zoomedImage = document.getElementById('zoomedImage');
    
    zoomedImage.src = this.src;
    modal.style.display = 'flex';
    document.body.style.overflow = 'hidden';
}

// Close image zoom modal
function closeZoomModal() {
    const modal = document.getElementById('imageZoomModal');
    modal.style.display = 'none';
    document.body.style.overflow = 'auto';
}

// Update URL without page reload
function updateURL(productId) {
    const newURL = `${window.location.pathname}?id=${productId}`;
    window.history.replaceState({}, '', newURL);
}

// Utility function to capitalize first letter
function capitalizeFirst(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
}

// Handle browser back/forward navigation
window.addEventListener('popstate', function(event) {
    const urlParams = new URLSearchParams(window.location.search);
    const productId = parseInt(urlParams.get('id'));
    
    if (productId && productId !== currentProduct?.id) {
        loadProduct(productId);
    }
});

// Close modal when clicking outside
document.addEventListener('click', function(event) {
    const modal = document.getElementById('imageZoomModal');
    if (event.target === modal) {
        closeZoomModal();
    }
});

// Keyboard navigation for modal
document.addEventListener('keydown', function(event) {
    if (event.key === 'Escape') {
        closeZoomModal();
    }
});

// Function to navigate to product page from catalogue (used by ProductCatalogue.js)
function viewProductDetails(productId) {
    window.location.href = `ProductPage.html?id=${productId}`;
}
