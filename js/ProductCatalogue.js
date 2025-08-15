// Product Catalogue JavaScript
// This implements search, filter, and sort functionality for the hiking gear catalogue

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
        id: 4,
        name: "Merino Wool Base Layer",
        brand: "NatureFit",
        category: "clothing",
        price: 1439.82,
        originalPrice: 1799.82,
        rating: 4.6,
        description: "Premium merino wool base layer for temperature regulation and moisture wicking. Naturally odor-resistant and comfortable.",
        image: "../images/Women-Hiking-Boots.jpg", // Placeholder image
        features: ["Merino Wool", "Moisture Wicking", "Odor Resistant", "Temperature Control"],
        inStock: true,
        dateAdded: "2024-02-10"
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
        image: "../images/Hiking-Gloves.jpg", // Placeholder image
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
        image: "../images/Backpacking-Gear-Essentials.jpg", // Placeholder image
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
        image: "../images/Women-Hiking-Boots.jpg", // Placeholder image
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
        image: "../images/Hiking-Gloves.jpg", // Placeholder image
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
        image: "../images/Backpacking-Gear-Essentials.jpg", // Placeholder image
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
        image: "../images/Women-Hiking-Boots.jpg", // Placeholder image
        features: ["LED Light", "Multiple Modes", "Waterproof", "Long Battery"],
        inStock: true,
        dateAdded: "2024-02-08"
    },
    // Additional Footwear Products
    {
        id: 11,
        name: "Mountaineering Boots",
        brand: "AlpinePro",
        category: "footwear",
        price: 4199.82,
        originalPrice: 4799.82,
        rating: 4.7,
        description: "Heavy-duty mountaineering boots with crampon compatibility and insulation for extreme cold conditions.",
        image: "../images/Women-Hiking-Boots.jpg",
        features: ["Crampon Compatible", "Insulated", "Waterproof", "Steel Shank"],
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
        description: "Breathable hiking sandals with excellent grip and quick-dry materials. Perfect for water crossings and hot weather.",
        image: "../images/Hiking-Gloves.jpg",
        features: ["Quick Dry", "Water Friendly", "Lightweight", "Adjustable Straps"],
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
        description: "Insulated winter hiking boots with thermal lining and snow-gripping outsole for cold weather adventures.",
        image: "../images/Backpacking-Gear-Essentials.jpg",
        features: ["Thermal Insulation", "Snow Grip", "Waterproof", "Warm Lining"],
        inStock: false,
        dateAdded: "2024-01-05"
    },
    // Additional Accessories
    {
        id: 14,
        name: "Multi-Tool Kit",
        brand: "ToolMaster",
        category: "accessories",
        price: 719.82,
        originalPrice: 899.82,
        rating: 4.4,
        description: "Compact multi-tool with knife, pliers, screwdrivers, and essential outdoor tools. Perfect for trail repairs.",
        image: "../images/Women-Hiking-Boots.jpg",
        features: ["15 Tools", "Compact", "Stainless Steel", "Belt Clip"],
        inStock: true,
        dateAdded: "2024-02-03"
    },
    {
        id: 15,
        name: "Hiking Hat",
        brand: "SunGuard",
        category: "accessories",
        price: 479.82,
        originalPrice: null,
        rating: 4.3,
        description: "UV protection hiking hat with moisture-wicking band and adjustable chin strap. Keeps you cool and protected.",
        image: "../images/Hiking-Gloves.jpg",
        features: ["UV Protection", "Moisture Wicking", "Adjustable", "Lightweight"],
        inStock: true,
        dateAdded: "2024-01-28"
    },
    // Additional Gear
    {
        id: 16,
        name: "Portable Camping Stove",
        brand: "FlameMax",
        category: "gear",
        price: 1799.82,
        originalPrice: 2159.82,
        rating: 4.6,
        description: "Lightweight portable stove with wind shield and efficient fuel consumption. Perfect for backcountry cooking.",
        image: "../images/Backpacking-Gear-Essentials.jpg",
        features: ["Lightweight", "Wind Resistant", "Fuel Efficient", "Compact"],
        inStock: true,
        dateAdded: "2024-01-12"
    },
    {
        id: 17,
        name: "Sleeping Bag",
        brand: "NightRest",
        category: "gear",
        price: 2879.82,
        originalPrice: 3599.82,
        rating: 4.5,
        description: "3-season sleeping bag with down insulation and compression sack. Rated for temperatures down to -5°C.",
        image: "../images/Women-Hiking-Boots.jpg",
        features: ["Down Insulation", "3-Season", "Compression Sack", "Lightweight"],
        inStock: true,
        dateAdded: "2024-02-20"
    },
    // Additional Clothing
    {
        id: 18,
        name: "Hiking Pants",
        brand: "TrailFlex",
        category: "clothing",
        price: 1799.82,
        originalPrice: null,
        rating: 4.4,
        description: "Durable hiking pants with stretch fabric and multiple pockets. Water-resistant and quick-drying.",
        image: "../images/Hiking-Gloves.jpg",
        features: ["Stretch Fabric", "Water Resistant", "Quick Dry", "Multiple Pockets"],
        inStock: true,
        dateAdded: "2024-01-22"
    },
    {
        id: 19,
        name: "Thermal Underwear Set",
        brand: "WarmLayer",
        category: "clothing",
        price: 1079.82,
        originalPrice: 1439.82,
        rating: 4.3,
        description: "Thermal underwear set with moisture-wicking properties and odor control. Essential for cold weather hiking.",
        image: "../images/Backpacking-Gear-Essentials.jpg",
        features: ["Thermal", "Moisture Wicking", "Odor Control", "Comfortable Fit"],
        inStock: true,
        dateAdded: "2024-02-01"
    },
    {
        id: 20,
        name: "Rain Poncho",
        brand: "StormShield",
        category: "clothing",
        price: 899.82,
        originalPrice: 1169.82,
        rating: 4.1,
        description: "Lightweight rain poncho with hood and snap closures. Packs small and provides excellent rain protection.",
        image: "../images/Women-Hiking-Boots.jpg",
        features: ["Waterproof", "Lightweight", "Packable", "Hood"],
        inStock: false,
        dateAdded: "2024-01-08"
    },
    // Additional Safety Equipment
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
        id: 22,
        name: "First Aid Kit",
        brand: "MedTrail",
        category: "safety",
        price: 719.82,
        originalPrice: 899.82,
        rating: 4.7,
        description: "Comprehensive first aid kit with bandages, antiseptic, and emergency medications. Compact and trail-ready.",
        image: "../images/Backpacking-Gear-Essentials.jpg",
        features: ["Comprehensive", "Compact", "Trail Ready", "Emergency Meds"],
        inStock: true,
        dateAdded: "2024-01-15"
    },
    {
        id: 23,
        name: "Emergency Beacon",
        brand: "RescueLink",
        category: "safety",
        price: 5399.82,
        originalPrice: null,
        rating: 4.8,
        description: "Satellite emergency beacon with GPS tracking and SOS messaging. Critical safety device for remote adventures.",
        image: "../images/Women-Hiking-Boots.jpg",
        features: ["Satellite", "GPS Tracking", "SOS Messaging", "Long Battery"],
        inStock: true,
        dateAdded: "2024-01-30"
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
    },
    {
        id: 25,
        name: "Water Purification Tablets",
        brand: "PureH2O",
        category: "safety",
        price: 299.82,
        originalPrice: null,
        rating: 4.4,
        description: "Emergency water purification tablets for treating questionable water sources. Essential for backcountry safety.",
        image: "../images/Backpacking-Gear-Essentials.jpg",
        features: ["Water Purification", "Emergency Use", "Lightweight", "Long Shelf Life"],
        inStock: true,
        dateAdded: "2024-01-18"
    }
];

// Global variables for filtering and sorting
let filteredProducts = [...products];
let currentFilters = {
    search: '',
    category: 'all',
    brand: 'all',
    price: 'all'
};
let currentSort = 'name';

// Initialize the page when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    populateBrandFilter();
    displayProducts(products);
    updateResultsCount(products.length);
    
    // Add event listener for search input
    const searchInput = document.getElementById('productSearch');
    searchInput.addEventListener('input', debounce(searchProducts, 300));
    
    // Add event listener for Enter key in search
    searchInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            searchProducts();
        }
    });
});

// Populate brand filter with unique brands from products
function populateBrandFilter() {
    const brandFilter = document.getElementById('brandFilter');
    const uniqueBrands = [...new Set(products.map(product => product.brand))].sort();
    
    // Clear existing options except "All Brands"
    brandFilter.innerHTML = '<option value="all">All Brands</option>';
    
    // Add brand options
    uniqueBrands.forEach(brand => {
        const option = document.createElement('option');
        option.value = brand;
        option.textContent = brand;
        brandFilter.appendChild(option);
    });
}

// Debounce function to limit search frequency
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Display products in the list format
function displayProducts(productsToDisplay) {
    const productList = document.getElementById('productList');
    const noResults = document.getElementById('noResults');
    
    if (productsToDisplay.length === 0) {
        productList.style.display = 'none';
        noResults.style.display = 'block';
        return;
    }
    
    productList.style.display = 'block';
    noResults.style.display = 'none';
    
    productList.innerHTML = productsToDisplay.map(product => {
        const stars = generateStars(product.rating);
        const stockStatus = product.inStock ? '' : ' (Out of Stock)';
        const stockClass = product.inStock ? '' : 'out-of-stock';
        const categoryBadge = getCategoryBadge(product.category);
        
        return `
            <div class="product-item ${stockClass}" data-id="${product.id}">
                <div class="product-info">
                    <img src="${product.image}" alt="${product.name}" class="product-image" 
                         onerror="this.src='../images/Women-Hiking-Boots.jpg'">
                    <div class="product-details">
                        ${categoryBadge}
                        <h3>${product.name}${stockStatus}</h3>
                    </div>
                </div>
                
                <div class="product-brand-main">
                    ${product.brand}
                </div>
                
                <div class="product-price">
                    R${formatPrice(product.price)}
                    ${product.originalPrice ? `<span class="price-original">R${formatPrice(product.originalPrice)}</span>` : ''}
                </div>
                
                <div class="product-rating">
                    <div class="stars">${stars}</div>
                    <div class="rating-score">${product.rating}/5</div>
                </div>
                
                <div class="product-actions">
                    <button class="btn btn-primary" onclick="addToCart(${product.id})" 
                            ${!product.inStock ? 'disabled' : ''}>
                        ${product.inStock ? 'Add to Cart' : 'Out of Stock'}
                    </button>
                    <button class="btn btn-secondary" onclick="viewProduct(${product.id})">
                        View Details
                    </button>
                </div>
            </div>
        `;
    }).join('');
}

// Get category badge HTML
function getCategoryBadge(category) {
    const categoryNames = {
        'footwear': 'Footwear',
        'clothing': 'Clothing',
        'gear': 'Gear',
        'accessories': 'Accessories',
        'safety': 'Safety'
    };
    
    return `<div class="category-badge" data-category="${category}">${categoryNames[category] || category}</div>`;
}

// Format price for South African Rands
function formatPrice(price) {
    return new Intl.NumberFormat('en-ZA', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
    }).format(price);
}

// Generate star rating HTML
function generateStars(rating) {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;
    const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);
    
    let starsHTML = '';
    
    // Full stars
    for (let i = 0; i < fullStars; i++) {
        starsHTML += '<span class="star">★</span>';
    }
    
    // Half star
    if (hasHalfStar) {
        starsHTML += '<span class="star">★</span>';
    }
    
    // Empty stars
    for (let i = 0; i < emptyStars; i++) {
        starsHTML += '<span class="star empty">☆</span>';
    }
    
    return starsHTML;
}

// Search functionality
function searchProducts() {
    const searchTerm = document.getElementById('productSearch').value.toLowerCase().trim();
    currentFilters.search = searchTerm;
    applyFiltersInternal();
}

// Apply all active filters (called by Apply Filters button)
function applyFilters() {
    const categoryFilter = document.getElementById('categoryFilter').value;
    const brandFilter = document.getElementById('brandFilter').value;
    const priceFilter = document.getElementById('priceFilter').value;
    
    currentFilters.category = categoryFilter;
    currentFilters.brand = brandFilter;
    currentFilters.price = priceFilter;
    
    applyFiltersInternal();
}

// Internal function to apply filters
function applyFiltersInternal() {
    filteredProducts = products.filter(product => {
        // Search filter - now includes categories but excludes descriptions
        const matchesSearch = currentFilters.search === '' || 
            product.name.toLowerCase().includes(currentFilters.search) ||
            product.brand.toLowerCase().includes(currentFilters.search) ||
            product.category.toLowerCase().includes(currentFilters.search) ||
            product.features.some(feature => feature.toLowerCase().includes(currentFilters.search));
        
        // Category filter
        const matchesCategory = currentFilters.category === 'all' || 
            product.category === currentFilters.category;
        
        // Brand filter
        const matchesBrand = currentFilters.brand === 'all' || 
            product.brand === currentFilters.brand;
        
        // Price filter (updated for Rand amounts)
        let matchesPrice = true;
        if (currentFilters.price !== 'all') {
            const [min, max] = currentFilters.price.split('-').map(p => p.replace('+', '').replace(',', ''));
            const minPrice = parseInt(min);
            const maxPrice = max ? parseInt(max) : Infinity;
            
            matchesPrice = product.price >= minPrice && product.price <= maxPrice;
        }
        
        return matchesSearch && matchesCategory && matchesBrand && matchesPrice;
    });
    
    // Apply current sort
    sortProducts();
    updateResultsCount(filteredProducts.length);
}

// Sort products
function sortProducts() {
    const sortBy = document.getElementById('sortBy').value;
    currentSort = sortBy;
    
    const sortedProducts = [...filteredProducts];
    
    switch (sortBy) {
        case 'name':
            sortedProducts.sort((a, b) => a.name.localeCompare(b.name));
            break;
        case 'price-low':
            sortedProducts.sort((a, b) => a.price - b.price);
            break;
        case 'price-high':
            sortedProducts.sort((a, b) => b.price - a.price);
            break;
        case 'rating':
            sortedProducts.sort((a, b) => b.rating - a.rating);
            break;
        case 'newest':
            sortedProducts.sort((a, b) => new Date(b.dateAdded) - new Date(a.dateAdded));
            break;
    }
    
    displayProducts(sortedProducts);
}

// Update results count display
function updateResultsCount(count) {
    const resultsCount = document.getElementById('resultsCount');
    if (count === products.length) {
        resultsCount.textContent = `Showing all ${count} products`;
    } else {
        resultsCount.textContent = `Showing ${count} of ${products.length} products`;
    }
}

// Clear all filters
function clearAllFilters() {
    document.getElementById('productSearch').value = '';
    document.getElementById('categoryFilter').value = 'all';
    document.getElementById('brandFilter').value = 'all';
    document.getElementById('priceFilter').value = 'all';
    document.getElementById('sortBy').value = 'name';
    
    currentFilters = {
        search: '',
        category: 'all',
        brand: 'all',
        price: 'all'
    };
    currentSort = 'name';
    
    filteredProducts = [...products];
    displayProducts(products);
    updateResultsCount(products.length);
}

// View product details in modal
function viewProduct(productId) {
    const product = products.find(p => p.id === productId);
    if (!product) return;
    
    const modal = document.getElementById('productModal');
    const modalBody = document.getElementById('modalBody');
    
    const stars = generateStars(product.rating);
    const stockStatus = product.inStock ? 'In Stock' : 'Out of Stock';
    const stockClass = product.inStock ? 'in-stock' : 'out-of-stock';
    
    modalBody.innerHTML = `
        <div class="modal-product-header">
            <img src="${product.image}" alt="${product.name}" class="modal-product-image"
                 onerror="this.src='../images/Women-Hiking-Boots.jpg'">
            <div class="modal-product-info">
                <h2>${product.name}</h2>
                <div class="modal-product-brand">${product.brand}</div>
                <div class="modal-product-price">
                    R${formatPrice(product.price)}
                    ${product.originalPrice ? `<span class="price-original">R${formatPrice(product.originalPrice)}</span>` : ''}
                </div>
                <div class="modal-product-rating">
                    <div class="stars">${stars}</div>
                    <span>${product.rating}/5 stars</span>
                </div>
                <div class="stock-status ${stockClass}">
                    <strong>${stockStatus}</strong>
                </div>
            </div>
        </div>
        
        <div class="modal-product-description">
            <h3>Description</h3>
            <p>${product.description}</p>
        </div>
        
        <div class="product-features">
            <h3>Key Features</h3>
            <ul>
                ${product.features.map(feature => `<li>${feature}</li>`).join('')}
            </ul>
        </div>
        
        <div class="modal-actions">
            <button class="btn btn-primary" onclick="addToCart(${product.id}); closeModal();" 
                    ${!product.inStock ? 'disabled' : ''}>
                ${product.inStock ? 'Add to Cart' : 'Out of Stock'}
            </button>
            <button class="btn btn-secondary" onclick="closeModal()">
                Close
            </button>
        </div>
    `;
    
    modal.style.display = 'flex';
    document.body.style.overflow = 'hidden';
}

// Close modal
function closeModal() {
    const modal = document.getElementById('productModal');
    modal.style.display = 'none';
    document.body.style.overflow = 'auto';
}

// Add to cart functionality (placeholder)
function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    if (!product || !product.inStock) return;
    
    // In a real application, this would add the item to a cart system
    alert(`Added "${product.name}" to cart!`);
    
    // Update cart count (placeholder)
    const cartCount = document.querySelector('.cart-count');
    if (cartCount) {
        const currentCount = parseInt(cartCount.textContent) || 0;
        cartCount.textContent = currentCount + 1;
    }
}

// Close modal when clicking outside
window.addEventListener('click', function(event) {
    const modal = document.getElementById('productModal');
    if (event.target === modal) {
        closeModal();
    }
});

// Close modal with Escape key
document.addEventListener('keydown', function(event) {
    if (event.key === 'Escape') {
        closeModal();
    }
});

// Keyboard navigation for accessibility
document.addEventListener('keydown', function(event) {
    if (event.ctrlKey && event.key === 'f') {
        event.preventDefault();
        document.getElementById('productSearch').focus();
    }
});
