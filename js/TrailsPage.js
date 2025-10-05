// Trails Page JavaScript
class TrailsManager {
    constructor() {
        this.trails = [];
        this.filteredTrails = [];
        this.currentFilters = {};
        this.init();
    }

    init() {
        this.loadTrails();
        this.displayFeaturedTrails();
        this.displayAllTrails();
        this.setupEventListeners();
    }

    loadTrails() {
        // Sample trails data for South Africa
        this.trails = [
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

        this.filteredTrails = [...this.trails];
    }

    setupEventListeners() {
        // Search functionality
        const searchInput = document.querySelector('.search-input');
        if (searchInput) {
            searchInput.addEventListener('input', (e) => {
                this.searchTrails(e.target.value);
            });
        }
    }

    displayFeaturedTrails() {
        const featuredContainer = document.getElementById('featuredTrails');
        if (!featuredContainer) return;

        // Get favorite trails from localStorage
        const favorites = JSON.parse(localStorage.getItem('favoriteTrails') || '[]');
        const favoriteTrails = this.trails.filter(trail => favorites.includes(trail.id));
        
        if (favoriteTrails.length === 0) {
            featuredContainer.innerHTML = `
                <div class="no-favorites">
                    <h3>No favorite trails yet</h3>
                    <p>Start exploring trails and tap the ❤️ button to add them to your favorites!</p>
                </div>
            `;
        } else {
            featuredContainer.innerHTML = favoriteTrails.map(trail => this.createTrailCard(trail, true)).join('');
        }
    }

    displayAllTrails() {
        const allContainer = document.getElementById('allTrails');
        if (!allContainer) return;

        allContainer.innerHTML = this.filteredTrails.map(trail => this.createTrailCard(trail)).join('');
        this.updateResultsCount();
    }

    createTrailCard(trail, isFeatured = false) {
        const difficultyClass = `difficulty-${trail.difficulty}`;
        const durationText = this.getDurationText(trail.duration);
        
        return `
            <div class="trail-card" data-id="${trail.id}" onclick="viewTrailDetails(${trail.id})">
                <img src="${trail.image}" alt="${trail.name}" class="trail-image" onerror="this.src='../images/backwater1.jpg'">
                <div class="trail-card-content">
                    <div class="trail-header">
                        <div>
                            <div class="trail-name">${trail.name}</div>
                            <div class="trail-location">📍 ${trail.location}</div>
                        </div>

                    </div>
                    <p class="trail-description">${trail.description}</p>
                    <div class="trail-details">
                        <span class="trail-detail ${difficultyClass}">🏃 ${this.capitalizeFirst(trail.difficulty)}</span>
                        <span class="trail-detail">⏱️ ${durationText}</span>
                        <span class="trail-detail">📏 ${trail.distance}</span>
                        <span class="trail-detail">⛰️ ${trail.elevation}</span>
                    </div>
                    <div class="trail-actions">
                        <button class="btn-primary" onclick="event.stopPropagation(); viewTrailDetails(${trail.id})">
                            View Details
                        </button>
                        <button class="btn-favorite" onclick="event.stopPropagation(); addToFavorites(${trail.id})">
                            <span class="heart-icon">♡</span>
                        </button>
                    </div>
                </div>
            </div>
        `;
    }

    getDurationText(duration) {
        const durationMap = {
            'short': '1-3 hours',
            'half-day': '3-6 hours',
            'full-day': '6+ hours',
            'multi-day': 'Multi-day'
        };
        return durationMap[duration] || duration;
    }

    capitalizeFirst(str) {
        return str.charAt(0).toUpperCase() + str.slice(1);
    }

    searchTrails(searchTerm) {
        if (!searchTerm.trim()) {
            this.filteredTrails = [...this.trails];
        } else {
            this.filteredTrails = this.trails.filter(trail =>
                trail.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                trail.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
                trail.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                trail.type.toLowerCase().includes(searchTerm.toLowerCase())
            );
        }
        this.displayAllTrails();
    }

    applyFilters() {
        const location = document.getElementById('locationFilter').value;
        const difficulty = document.getElementById('difficultyFilter').value;
        const duration = document.getElementById('durationFilter').value;
        const type = document.getElementById('typeFilter').value;

        this.currentFilters = { location, difficulty, duration, type };

        this.filteredTrails = this.trails.filter(trail => {
            return (!location || trail.province === location) &&
                   (!difficulty || trail.difficulty === difficulty) &&
                   (!duration || trail.duration === duration) &&
                   (!type || trail.type === type);
        });

        this.displayAllTrails();
        this.showMessage(`Found ${this.filteredTrails.length} trails matching your criteria`, 'success');
    }

    clearFilters() {
        document.getElementById('locationFilter').value = '';
        document.getElementById('difficultyFilter').value = '';
        document.getElementById('durationFilter').value = '';
        document.getElementById('typeFilter').value = '';
        
        this.currentFilters = {};
        this.filteredTrails = [...this.trails];
        this.displayAllTrails();
        this.showMessage('Filters cleared', 'success');
    }

    sortTrails() {
        const sortBy = document.getElementById('sortBy').value;
        
        this.filteredTrails.sort((a, b) => {
            switch (sortBy) {
                case 'name':
                    return a.name.localeCompare(b.name);
                case 'difficulty':
                    const difficultyOrder = { 'easy': 1, 'moderate': 2, 'challenging': 3, 'expert': 4 };
                    return difficultyOrder[a.difficulty] - difficultyOrder[b.difficulty];
                case 'duration':
                    const durationOrder = { 'short': 1, 'half-day': 2, 'full-day': 3, 'multi-day': 4 };
                    return durationOrder[a.duration] - durationOrder[b.duration];
                case 'rating':
                    return b.rating - a.rating;
                case 'distance':
                    const distanceA = parseFloat(a.distance.replace(' km', ''));
                    const distanceB = parseFloat(b.distance.replace(' km', ''));
                    return distanceA - distanceB;
                default:
                    return 0;
            }
        });

        this.displayAllTrails();
    }

    updateResultsCount() {
        const resultsCount = document.getElementById('resultsCount');
        if (resultsCount) {
            const total = this.filteredTrails.length;
            const showing = total === this.trails.length ? 'all' : total;
            resultsCount.textContent = `Showing ${showing} ${total === 1 ? 'trail' : 'trails'}`;
        }
    }

    getTrailById(id) {
        return this.trails.find(trail => trail.id === parseInt(id));
    }

    showMessage(message, type = 'success') {
        const messageEl = document.createElement('div');
        messageEl.className = `alert alert-${type}`;
        messageEl.textContent = message;
        messageEl.style.cssText = `
            position: fixed;
            top: 100px;
            right: 20px;
            padding: 1rem;
            border-radius: 8px;
            color: white;
            font-weight: bold;
            z-index: 1000;
            max-width: 300px;
            background: ${type === 'success' ? '#27ae60' : '#e74c3c'};
        `;

        document.body.appendChild(messageEl);

        setTimeout(() => {
            messageEl.remove();
        }, 3000);
    }
}

// Global functions
function applyFilters() {
    trailsManager.applyFilters();
}

function clearFilters() {
    trailsManager.clearFilters();
}

function sortTrails() {
    trailsManager.sortTrails();
}

function viewTrailDetails(trailId) {
    const trail = trailsManager.getTrailById(trailId);
    if (!trail) return;

    const modal = document.getElementById('trailModal');
    const modalBody = document.getElementById('modalBody');
    
    const difficultyClass = `difficulty-${trail.difficulty}`;
    const durationText = trailsManager.getDurationText(trail.duration);
    
    modalBody.innerHTML = `
        <div class="trail-detail-content">
            <img src="${trail.image}" alt="${trail.name}" style="width: 100%; height: 300px; object-fit: cover; border-radius: 15px; margin-bottom: 2rem;">
            
            <div class="trail-detail-header">
                <h2>${trail.name}</h2>
                <div class="trail-rating">⭐ ${trail.rating} / 5</div>
            </div>
            
            <div class="trail-location">📍 ${trail.location}</div>
            
            <div class="trail-description">
                <h3>About This Trail</h3>
                <p>${trail.description}</p>
            </div>
            
            <div class="trail-info-grid">
                <div class="info-item">
                    <strong>🏃 Difficulty:</strong>
                    <span class="trail-detail ${difficultyClass}">${trailsManager.capitalizeFirst(trail.difficulty)}</span>
                </div>
                <div class="info-item">
                    <strong>⏱️ Duration:</strong>
                    <span>${durationText}</span>
                </div>
                <div class="info-item">
                    <strong>📏 Distance:</strong>
                    <span>${trail.distance}</span>
                </div>
                <div class="info-item">
                    <strong>⛰️ Elevation:</strong>
                    <span>${trail.elevation}</span>
                </div>
                <div class="info-item">
                    <strong>🌟 Type:</strong>
                    <span>${trailsManager.capitalizeFirst(trail.type)} Trail</span>
                </div>
            </div>
            
            <div class="trail-features">
                <h3>🎯 Trail Features</h3>
                <div class="features-list">
                    ${trail.features.map(feature => `<div class="feature-tag">${feature}</div>`).join('')}
                </div>
            </div>
            
            <div class="trail-actions-modal">
                <button class="btn-favorite" onclick="addToFavorites(${trail.id})">
                    <span class="heart-icon">♡</span> Add to Favorites
                </button>
                <button class="btn-secondary" onclick="shareTrail(${trail.id})">📤 Share Trail</button>
            </div>
        </div>
    `;

    modal.style.display = 'block';
}

function closeTrailModal() {
    document.getElementById('trailModal').style.display = 'none';
}

function addToFavorites(trailId) {
    const trail = trailsManager.getTrailById(trailId);
    if (!trail) return;
    
    // Save to localStorage
    const favorites = JSON.parse(localStorage.getItem('favoriteTrails') || '[]');
    if (!favorites.includes(trailId)) {
        favorites.push(trailId);
        localStorage.setItem('favoriteTrails', JSON.stringify(favorites));
        trailsManager.showMessage(`${trail.name} added to favorites!`, 'success');
        // Refresh the favorites display
        updateFavoritesButtons();
        trailsManager.displayFeaturedTrails();
        // Update favorites count
        updateFavoritesCount();
    } else {
        // Remove from favorites
        const updatedFavorites = favorites.filter(id => id !== trailId);
        localStorage.setItem('favoriteTrails', JSON.stringify(updatedFavorites));
        trailsManager.showMessage(`${trail.name} removed from favorites`, 'info');
        updateFavoritesButtons();
        trailsManager.displayFeaturedTrails();
        updateFavoritesCount();
    }
}

function updateFavoritesButtons() {
    const favorites = JSON.parse(localStorage.getItem('favoriteTrails') || '[]');
    
    document.querySelectorAll('.btn-favorite').forEach(button => {
        const trailId = parseInt(button.getAttribute('onclick').match(/\d+/)[0]);
        const icon = button.querySelector('.heart-icon');
        if (favorites.includes(trailId)) {
            icon.textContent = '♥';
            button.classList.add('active');
        } else {
            icon.textContent = '♡';
            button.classList.remove('active');
        }
    });
}

function startNavigation(trailId) {
    const trail = trailsManager.getTrailById(trailId);
    if (!trail) return;
    
    trailsManager.showMessage(`Navigation started for ${trail.name}`, 'success');
    // Here you would integrate with a mapping service
}

function shareTrail(trailId) {
    const trail = trailsManager.getTrailById(trailId);
    if (!trail) return;
    
    if (navigator.share) {
        navigator.share({
            title: trail.name,
            text: trail.description,
            url: window.location.href
        });
    } else {
        // Fallback: copy to clipboard
        navigator.clipboard.writeText(`Check out this amazing trail: ${trail.name} - ${window.location.href}`);
        trailsManager.showMessage('Trail link copied to clipboard!', 'success');
    }
}

/* ---------- Navbar scroll effect function ---------- */
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

// Update favorites count
function updateFavoritesCount() {
    try {
        const wishlist = JSON.parse(localStorage.getItem('wishlist') || '[]');
        const favoriteTrails = JSON.parse(localStorage.getItem('favoriteTrails') || '[]');
        const total = wishlist.length + favoriteTrails.length;
        
        const el = document.querySelector('.favorites-count');
        if (el) {
            el.textContent = total;
        }
    } catch (e) {
        console.error('Error updating favorites count:', e);
    }
}

// Update cart count
function updateCartCount() {
    try {
        const cart = JSON.parse(localStorage.getItem('cart') || '[]');
        const total = cart.reduce((sum, item) => sum + (item.quantity || 1), 0);
        
        const el = document.querySelector('.cart-count');
        if (el) {
            el.textContent = total;
        }
    } catch (e) {
        console.error('Error updating cart count:', e);
    }
}

// Initialize trails manager when DOM is loaded
let trailsManager;
document.addEventListener('DOMContentLoaded', () => {
    trailsManager = new TrailsManager();
    initNavbarScroll(); // Add navbar scroll effect
    
    // Update counts on page load
    updateCartCount();
    updateFavoritesCount();
    updateFavoritesButtons();
    
    // Close modal when clicking outside
    window.onclick = function(event) {
        const modal = document.getElementById('trailModal');
        if (event.target === modal) {
            closeTrailModal();
        }
    }
});
