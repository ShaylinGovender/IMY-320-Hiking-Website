// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Scroll animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);

document.querySelectorAll('.section').forEach(section => {
    observer.observe(section);
});

// Parallax effect for hero section and navbar scroll effect
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('.hero');
    if (hero) {
        hero.style.transform = `translateY(${scrolled * 0.5}px)`;
    }

    // Navbar background opacity - updated to match AboutUsPage
    const navbar = document.getElementById('navbar');
    if (scrolled > 100) {
        navbar.style.background = 'rgba(44, 62, 80, 0.98)';
        navbar.style.boxShadow = '0 2px 10px rgba(0,0,0,0.1)';
    } else {
        navbar.style.background = 'rgba(44, 62, 80, 0.95)';
        navbar.style.boxShadow = 'none';
    }
});

// Carousel functionality
let currentSlide = 0;
const totalSlides = 3;

function showSlide(index) {
    const carousel = document.getElementById('trailsCarousel');
    const dots = document.querySelectorAll('.carousel-dot');
    
    currentSlide = index;
    carousel.style.transform = `translateX(-${index * 100}%)`;
    
    dots.forEach((dot, i) => {
        dot.classList.toggle('active', i === index);
    });
}

// Auto-advance carousel
setInterval(() => {
    currentSlide = (currentSlide + 1) % totalSlides;
    showSlide(currentSlide);
}, 5000);

// Gear items hover animation
document.querySelectorAll('.gear-item').forEach(item => {
    item.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-10px) scale(1.02)';
    });
    
    item.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0) scale(1)';
    });
});

// Add scroll-triggered counter animation for features
function animateCounters() {
    const counters = document.querySelectorAll('.feature-item');
    counters.forEach((counter, index) => {
        setTimeout(() => {
            counter.style.animation = `fadeInUp 0.6s ease ${index * 0.2}s both`;
        }, 100);
    });
}

// Trigger counter animation when features section is visible
const featuresSection = document.querySelector('.features-section');
const featuresObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            animateCounters();
            featuresObserver.unobserve(entry.target);
        }
    });
});

if (featuresSection) {
    featuresObserver.observe(featuresSection);
}

// Search functionality (placeholder)
document.querySelector('.search-btn').addEventListener('click', function() {
    const searchQuery = document.querySelector('.search-input').value;
    if (searchQuery.trim()) {
        // Add search functionality here
        console.log('Searching for:', searchQuery);
        // You can redirect to a search results page or filter content
    }
});

// Search on Enter key
document.querySelector('.search-input').addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
        document.querySelector('.search-btn').click();
    }
});

// Cart functionality (placeholder)
document.querySelector('.cart-icon').addEventListener('click', function() {
    // Add cart functionality here
    console.log('Opening cart...');
    // You can redirect to cart page or show cart modal
});

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

// Initialize page
document.addEventListener('DOMContentLoaded', function() {
    console.log('TrailBlazer Landing Page Loaded');
    
    // Update counts on page load
    updateCartCount();
    updateFavoritesCount();
});
