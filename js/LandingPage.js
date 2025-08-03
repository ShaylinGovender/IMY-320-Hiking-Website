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

// Parallax effect for hero section
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('.hero');
    if (hero) {
        hero.style.transform = `translateY(${scrolled * 0.5}px)`;
    }

    // Navbar background opacity
    const navbar = document.getElementById('navbar');
    if (scrolled > 100) {
        navbar.style.background = 'rgba(44, 62, 80, 0.95)';
    } else {
        navbar.style.background = 'rgba(44, 62, 80, 0.8)';
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

// Initialize page
document.addEventListener('DOMContentLoaded', function() {
    console.log('TrailBlazer Landing Page Loaded');
    
    // Add any initialization code here
    // For example, load cart count from localStorage
    const cartCount = localStorage.getItem('cartCount') || '0';
    const cartCountElement = document.querySelector('.cart-count');
    if (cartCountElement) {
        cartCountElement.textContent = cartCount;
    }
});
