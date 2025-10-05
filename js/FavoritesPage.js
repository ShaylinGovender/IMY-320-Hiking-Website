/* =========================================================
   FavoritesPage.js
   - Displays user's favorite products and trails
   - Manages wishlist and trail favorites from localStorage
   - Provides remove functionality and navigation to items
   ========================================================= */

// Global variables
let wishlist = [];
let favoriteTrails = [];

// Initialize page
document.addEventListener('DOMContentLoaded', function() {
    loadFavorites();
    updateFavoritesCount();
    updateCartCount();
    initNavbarScroll();
});

// Load favorites from localStorage
function loadFavorites() {
    try {
        wishlist = JSON.parse(localStorage.getItem('wishlist') || '[]');
        favoriteTrails = JSON.parse(localStorage.getItem('favoriteTrails') || '[]');
    } catch (e) {
        console.error('Error loading favorites:', e);
        wishlist = [];
        favoriteTrails = [];
    }
    
    displayProductFavorites();
    displayTrailFavorites();
}

// Display product favorites
function displayProductFavorites() {
    const container = document.getElementById('products-favorites');
    const emptyState = document.getElementById('no-products');
    const countElement = document.getElementById('products-count');
    
    if (!container || !emptyState || !countElement) return;
    
    if (wishlist.length === 0) {
        container.style.display = 'none';
        emptyState.style.display = 'block';
        countElement.textContent = '0 items';
        return;
    }
    
    container.style.display = 'grid';
    emptyState.style.display = 'none';
    countElement.textContent = `${wishlist.length} item${wishlist.length !== 1 ? 's' : ''}`;
    
    // Get product data from ProductData if available
    const products = window.ProductData ? window.ProductData.getProducts() : [];
    
    container.innerHTML = wishlist.map(item => {
        // Find full product data
        const productData = products.find(p => p.id === item.id) || item;
        
        return `
            <div class="favorite-item" data-id="${item.id}">
                <div class="favorite-item-header">
                    <img src="${item.image || productData.image || '../images/Women-Hiking-Boots.jpg'}" 
                         alt="${item.name}" 
                         class="favorite-item-image"
                         onerror="this.src='../images/Women-Hiking-Boots.jpg'">
                    <div class="favorite-item-info">
                        <h3 class="favorite-item-name">${item.name}</h3>
                        <p class="favorite-item-brand">${item.brand || productData.brand || 'TrailBlazer'}</p>
                        <p class="favorite-item-price">R${(item.price || productData.price || 0).toFixed(2)}</p>
                    </div>
                </div>
                <div class="favorite-item-actions">
                    <a href="ProductPage.html?id=${item.id}" class="btn btn-primary">
                        <i class="fas fa-eye"></i> View Details
                    </a>
                    <button class="btn btn-secondary" onclick="addToCartFromFavorites('${item.id}')">
                        <i class="fas fa-shopping-cart"></i> Add to Cart
                    </button>
                    <button class="btn btn-danger" onclick="removeFromWishlist('${item.id}')">
                        <i class="fas fa-heart-broken"></i> Remove
                    </button>
                </div>
            </div>
        `;
    }).join('');
}

// Display trail favorites
function displayTrailFavorites() {
    const container = document.getElementById('trails-favorites');
    const emptyState = document.getElementById('no-trails');
    const countElement = document.getElementById('trails-count');
    
    if (!container || !emptyState || !countElement) return;
    
    if (favoriteTrails.length === 0) {
        container.style.display = 'none';
        emptyState.style.display = 'block';
        countElement.textContent = '0 items';
        return;
    }
    
    container.style.display = 'grid';
    emptyState.style.display = 'none';
    countElement.textContent = `${favoriteTrails.length} item${favoriteTrails.length !== 1 ? 's' : ''}`;
    
    // Get trail data (this would need to be integrated with TrailsPage data)
    const trails = getTrailData();
    
    container.innerHTML = favoriteTrails.map(trailId => {
        const trail = trails.find(t => t.id === parseInt(trailId));
        if (!trail) {
            console.warn(`Trail with ID ${trailId} not found in trail data`);
            return '';
        }
        
        return `
            <div class="favorite-item trail-item" data-id="${trailId}">
                <div class="favorite-item-header">
                    <img src="${trail.image || '../images/backge.jpg'}" 
                         alt="${trail.name}" 
                         class="favorite-item-image"
                         onerror="this.src='../images/backge.jpg'">
                    <div class="favorite-item-info">
                        <h3 class="favorite-item-name">${trail.name}</h3>
                        <div class="trail-difficulty ${trail.difficulty}">${trail.difficulty}</div>
                        <p class="favorite-item-brand">${trail.location}</p>
                        <div class="trail-details">
                            <div class="trail-detail">
                                <i class="fas fa-route"></i>
                                <span>${trail.distance} <small>(length)</small></span>
                            </div>
                            <div class="trail-detail">
                                <i class="fas fa-clock"></i>
                                <span>${trail.duration}</span>
                            </div>
                            <div class="trail-detail">
                                <i class="fas fa-star"></i>
                                <span>${trail.rating}/5</span>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="favorite-item-actions">
                    <button class="btn btn-primary" onclick="viewTrailDetails(${trailId})">
                        <i class="fas fa-eye"></i> View Details
                    </button>
                    <button class="btn btn-danger" onclick="removeFromTrailFavorites(${trailId})">
                        <i class="fas fa-heart-broken"></i> Remove
                    </button>
                </div>
            </div>
        `;
    }).join('');
}

// Get trail data (matches TrailsPage.js data)
function getTrailData() {
    return [
        {
            id: 1,
            name: "Table Mountain - Platteklip Gorge",
            location: "Western Cape",
            province: "western-cape",
            difficulty: "challenging",
            duration: "half-day",
            type: "mountain",
            distance: "5.5 km",
            elevation: "1084m",
            rating: 4.8,
            description: "The classic route up Table Mountain via Platteklip Gorge. A challenging but rewarding hike with spectacular views of Cape Town.",
            image: "https://images.unsplash.com/photo-1624209808748-5dd13edf5eb6?q=80&w=1074&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            features: ["Scenic Views", "Rock Formations", "Cable Car Option"],
            isFeatured: true
        },
        {
            id: 2,
            name: "Drakensberg Amphitheatre",
            location: "KwaZulu-Natal",
            province: "kwazulu-natal",
            difficulty: "expert",
            duration: "full-day",
            type: "mountain",
            distance: "12 km",
            elevation: "3165m",
            rating: 4.9,
            description: "An epic hike to the top of the Drakensberg Amphitheatre, featuring chain ladders and breathtaking mountain scenery.",
            image: "https://images.unsplash.com/photo-1500843613192-839e95410c10?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            features: ["Chain Ladders", "Mountain Views", "Alpine Environment"],
            isFeatured: true
        },
        {
            id: 3,
            name: "Tsitsikamma Waterfall Trail",
            location: "Eastern Cape",
            province: "eastern-cape",
            difficulty: "easy",
            duration: "short",
            type: "waterfall",
            distance: "3 km",
            elevation: "50m",
            rating: 4.3,
            description: "A gentle forest walk leading to beautiful waterfalls in the heart of Tsitsikamma National Park.",
            image: "https://images.unsplash.com/photo-1432405972618-c60b0225b8f9?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            features: ["Waterfalls", "Forest Walk", "Swimming Holes"],
            isFeatured: false
        },
        {
            id: 4,
            name: "Lion's Head Sunrise Hike",
            location: "Western Cape",
            province: "western-cape",
            difficulty: "moderate",
            duration: "short",
            type: "mountain",
            distance: "2.5 km",
            elevation: "669m",
            rating: 4.7,
            description: "Popular sunrise hike with panoramic views of Cape Town, Table Mountain, and the Atlantic Ocean.",
            image: "https://images.unsplash.com/photo-1463694775559-eea25626346b?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            features: ["Sunrise Views", "City Views", "Quick Ascent"],
            isFeatured: true
        },
        {
            id: 5,
            name: "Blyde River Canyon",
            location: "Mpumalanga",
            province: "mpumalanga",
            difficulty: "moderate",
            duration: "half-day",
            type: "viewpoint",
            distance: "6 km",
            elevation: "200m",
            rating: 4.6,
            description: "Explore one of the world's largest green canyons with stunning viewpoints and unique rock formations.",
            image: "https://images.unsplash.com/photo-1550486686-a496af34a2d5?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            features: ["Canyon Views", "Rock Formations", "Photography"],
            isFeatured: false
        },
        {
            id: 6,
            name: "Kirstenbosch Tree Canopy Walkway",
            location: "Western Cape",
            province: "western-cape",
            difficulty: "easy",
            duration: "short",
            type: "forest",
            distance: "2 km",
            elevation: "30m",
            rating: 4.4,
            description: "A elevated walkway through the forest canopy offering unique perspectives of the indigenous flora.",
            image: "https://images.unsplash.com/photo-1425913397330-cf8af2ff40a1?q=80&w=1074&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            features: ["Canopy Walk", "Botanical Gardens", "Educational"],
            isFeatured: false
        },
        {
            id: 7,
            name: "God's Window Trail",
            location: "Mpumalanga",
            province: "mpumalanga",
            difficulty: "easy",
            duration: "short",
            type: "viewpoint",
            distance: "1 km",
            elevation: "100m",
            rating: 4.5,
            description: "Short walk to one of South Africa's most spectacular viewpoints overlooking the Lowveld.",
            image: "https://images.unsplash.com/photo-1617046684381-627c3da329c8?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            features: ["Panoramic Views", "Easy Access", "Scenic Drive"],
            isFeatured: false
        },
        {
            id: 8,
            name: "Otter Trail",
            location: "Western Cape",
            province: "western-cape",
            difficulty: "challenging",
            duration: "multi-day",
            type: "coastal",
            distance: "45 km",
            elevation: "300m",
            rating: 4.8,
            description: "Famous 5-day coastal hiking trail along the Garden Route with river crossings and pristine beaches.",
            image: "https://images.unsplash.com/photo-1607114591078-e816e2785fa1?q=80&w=1325&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            features: ["Coastal Views", "River Crossings", "Multi-day"],
            isFeatured: true
        },
        {
            id: 9,
            name: "Augrabies Falls Trail",
            location: "Northern Cape",
            province: "northern-cape",
            difficulty: "moderate",
            duration: "half-day",
            type: "waterfall",
            distance: "4 km",
            elevation: "150m",
            rating: 4.2,
            description: "Desert hiking trail to the impressive Augrabies Falls on the Orange River.",
            image: "https://images.unsplash.com/photo-1640585346033-54add18552b4?q=80&w=1176&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            features: ["Desert Landscape", "Waterfall Views", "Orange River"],
            isFeatured: false
        },
        {
            id: 10,
            name: "Magaliesberg Canopy Tour",
            location: "Gauteng",
            province: "gauteng",
            difficulty: "easy",
            duration: "short",
            type: "forest",
            distance: "3 km",
            elevation: "100m",
            rating: 4.1,
            description: "Adventure trail through ancient mountains with zip-lining and canopy walking opportunities.",
            image: "https://images.unsplash.com/photo-1425913397330-cf8af2ff40a1?q=80&w=1074&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            features: ["Adventure Activities", "Ancient Mountains", "Family Friendly"],
            isFeatured: false
        }
    ];
}

// Tab switching functionality
function showTab(tabName, buttonElement) {
    // Hide all tab contents
    document.querySelectorAll('.tab-content').forEach(tab => {
        tab.classList.remove('active');
    });
    
    // Remove active class from all buttons
    document.querySelectorAll('.tab-button').forEach(btn => {
        btn.classList.remove('active');
    });
    
    // Show selected tab
    const selectedTab = document.getElementById(tabName);
    if (selectedTab) {
        selectedTab.classList.add('active');
    }
    
    // Add active class to clicked button
    if (buttonElement) {
        buttonElement.classList.add('active');
    }
}

// Remove item from wishlist
function removeFromWishlist(productId) {
    wishlist = wishlist.filter(item => item.id !== parseInt(productId));
    localStorage.setItem('wishlist', JSON.stringify(wishlist));
    
    displayProductFavorites();
    updateFavoritesCount();
    
    // Show success message
    showMessage('Item removed from favorites', 'success');
}

// Remove trail from favorites
function removeFromTrailFavorites(trailId) {
    favoriteTrails = favoriteTrails.filter(id => id !== parseInt(trailId));
    localStorage.setItem('favoriteTrails', JSON.stringify(favoriteTrails));
    
    displayTrailFavorites();
    updateFavoritesCount();
    
    // Show success message
    showMessage('Trail removed from favorites', 'success');
}

// Add to cart from favorites
function addToCartFromFavorites(productId) {
    const item = wishlist.find(item => item.id === productId);
    if (!item) return;
    
    // Use the Cart system
    if (window.Cart) {
        window.Cart.add({
            id: item.id,
            title: item.name,
            price: item.price,
            image: item.image,
            brand: item.brand,
            descriptor: '',
            link: `ProductPage.html?id=${item.id}`,
            availability: 'in_stock',
            availabilityDate: new Date().toISOString()
        }, 1);
        
        updateCartCount();
        showMessage(`${item.name} added to cart!`, 'success');
    }
}

// View trail details
function viewTrailDetails(trailId) {
    // Navigate to trails page with the specific trail
    window.location.href = `TrailsPage.html?trail=${trailId}`;
}

// Update favorites count in navigation
function updateFavoritesCount() {
    const countElement = document.getElementById('favorites-count');
    if (countElement) {
        const totalFavorites = wishlist.length + favoriteTrails.length;
        countElement.textContent = totalFavorites;
    }
}

// Update cart count in navigation
function updateCartCount() {
    const countElement = document.getElementById('cart-count');
    if (countElement && window.Cart) {
        const cartCount = window.Cart.count();
        countElement.textContent = cartCount;
    }
}

// Show message to user
function showMessage(message, type = 'info') {
    // Create a simple notification
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.style.cssText = `
        position: fixed;
        top: 120px;
        right: 20px;
        background: ${type === 'success' ? '#27ae60' : type === 'error' ? '#e74c3c' : '#3498db'};
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 8px;
        box-shadow: 0 4px 12px rgba(0,0,0,0.15);
        z-index: 3000;
        font-weight: 500;
        animation: slideInRight 0.3s ease-out;
    `;
    notification.textContent = message;
    
    document.body.appendChild(notification);
    
    // Remove after 3 seconds
    setTimeout(() => {
        notification.style.animation = 'slideOutRight 0.3s ease-in forwards';
        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        }, 300);
    }, 3000);
}

// Navbar scroll effect
function initNavbarScroll() {
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const navbar = document.getElementById('navbar');
        
        if (scrolled > 100) {
            navbar.style.background = 'rgba(44, 62, 80, 0.98)';
            navbar.style.boxShadow = '0 2px 10px rgba(0,0,0,0.1)';
        } else {
            navbar.style.background = 'rgba(44, 62, 80, 0.95)';
            navbar.style.boxShadow = 'none';
        }
    });
}

// Add CSS animations for notifications
const style = document.createElement('style');
style.textContent = `
    @keyframes slideInRight {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOutRight {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(100%);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);
