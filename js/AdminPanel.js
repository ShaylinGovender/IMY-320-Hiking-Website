// Admin Panel JavaScript
class AdminPanel {
    constructor() {
        this.currentSection = 'products';
        this.products = [];
        this.tempProductData = null;
        this.init();
    }

    init() {
        this.loadProducts();
        this.setupEventListeners();
        this.showSection('products');
    }

    loadProducts() {
        // Load products from existing ProductData or localStorage
        if (window.ProductData && window.ProductData.products) {
            this.products = [...window.ProductData.products];
        } else {
            // Fallback to sample data if ProductData not available
            this.products = [
                {
                    id: 1,
                    title: "Women's Hiking Boots",
                    description: "Durable waterproof hiking boots with superior ankle support",
                    brand: "TrailMaster",
                    price: 2699.82,
                    category: "footwear",
                    image: "../images/Women-Hiking-Boots.jpg",
                    availability: "in stock",
                    availability_date: "2024-01-15",
                    link: "#"
                }
            ];
        }
        this.renderAdminProducts();
    }

    setupEventListeners() {
        // Navigation
        document.querySelectorAll('.nav-links a').forEach(link => {
            link.addEventListener('click', (e) => {
                if (link.getAttribute('href').startsWith('#')) {
                    e.preventDefault();
                    const section = link.getAttribute('href').substring(1);
                    this.showSection(section);
                }
            });
        });

        // Product form submission
        const productForm = document.getElementById('productForm');
        if (productForm) {
            productForm.addEventListener('submit', (e) => {
                e.preventDefault();
                
                // Check if form is valid using HTML5 validation
                if (!productForm.checkValidity()) {
                    productForm.reportValidity();
                    return;
                }
                
                this.handleProductFormSubmit();
            });
        }

        // QA form submission and progress tracking
        const qaForm = document.getElementById('qaForm');
        if (qaForm) {
            qaForm.addEventListener('submit', (e) => {
                e.preventDefault();
                this.handleQASubmit();
            });

            // Setup QA progress tracking
            this.setupQAProgressTracking();
        }
    }

    showSection(sectionId) {
        // Hide all sections
        document.querySelectorAll('.admin-section').forEach(section => {
            section.classList.remove('active');
        });

        // Show selected section
        const section = document.getElementById(sectionId);
        if (section) {
            section.classList.add('active');
        }

        // Update navigation
        document.querySelectorAll('.nav-links a').forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${sectionId}`) {
                link.classList.add('active');
            }
        });

        this.currentSection = sectionId;

        // Update section-specific content
        if (sectionId === 'products') {
            this.renderAdminProducts();
        }
    }

    updateDashboardStats() {
        const totalProductsEl = document.getElementById('totalProducts');
        const productsInReviewEl = document.getElementById('productsInReview');
        
        if (totalProductsEl) {
            totalProductsEl.textContent = this.products.length;
        }
        
        if (productsInReviewEl) {
            // Count products that might be in review (recently added)
            const recentProducts = this.products.filter(product => {
                const addedDate = new Date(product.availability_date || '2024-01-01');
                const daysDiff = (new Date() - addedDate) / (1000 * 60 * 60 * 24);
                return daysDiff <= 7; // Products added in last 7 days
            });
            productsInReviewEl.textContent = recentProducts.length;
        }
    }

    showAddProductForm() {
        document.getElementById('addProductForm').style.display = 'block';
        document.getElementById('qaChecklist').style.display = 'none';
        document.getElementById('productForm').reset();
    }

    hideAddProductForm() {
        document.getElementById('addProductForm').style.display = 'none';
        this.tempProductData = null;
    }

    handleProductFormSubmit() {
        const formData = new FormData(document.getElementById('productForm'));
        
        // Validate required fields
        const requiredFields = ['id', 'title', 'description', 'link', 'image', 'availability', 'price', 'brand', 'category'];
        let isValid = true;
        
        for (let field of requiredFields) {
            if (!formData.get(field)) {
                isValid = false;
                this.showMessage(`Please fill in the ${field} field`, 'error');
                break;
            }
        }

        if (!isValid) return;

        // Check for duplicate ID
        if (this.products.find(p => p.id == formData.get('id'))) {
            this.showMessage('Product ID already exists. Please use a unique ID.', 'error');
            return;
        }

        // Validate price is not negative
        const price = parseFloat(formData.get('price'));
        if (price < 0) {
            this.showMessage('Price cannot be negative. Please enter a valid price.', 'error');
            return;
        }

        // Store temporary product data
        this.tempProductData = {
            id: parseInt(formData.get('id')) || formData.get('id'),
            title: formData.get('title'),
            description: formData.get('description'),
            link: formData.get('link'),
            image: formData.get('image'),
            availability: formData.get('availability'),
            availability_date: formData.get('availability_date') || new Date().toISOString().split('T')[0],
            price: parseFloat(formData.get('price')),
            brand: formData.get('brand'),
            category: formData.get('category')
        };

        // Hide product form and show QA checklist
        document.getElementById('addProductForm').style.display = 'none';
        document.getElementById('qaChecklist').style.display = 'block';
        
        // Scroll to top of the page
        window.scrollTo({ top: 0, behavior: 'smooth' });
        
        // Reset QA form and reinitialize progress tracking
        document.getElementById('qaForm').reset();
        
        // Initialize progress tracking for the QA form
        setTimeout(() => {
            this.updateQAProgress();
        }, 100);

        this.showMessage('Please complete the quality assurance checklist', 'success');
    }

    setupQAProgressTracking() {
        const qaForm = document.getElementById('qaForm');
        if (!qaForm) return;

        const checkboxes = qaForm.querySelectorAll('input[type="checkbox"]');
        const progressBar = document.querySelector('.progress-fill');
        const progressText = document.querySelector('.progress-text');
        const summaryItems = document.querySelectorAll('.summary-value');
        const submitButton = document.querySelector('#qaSubmitBtn');
        const resetButton = document.querySelector('#qaResetBtn');

        if (checkboxes.length === 0) return;

        // Update progress whenever a checkbox changes
        checkboxes.forEach(checkbox => {
            checkbox.addEventListener('change', () => {
                this.updateQAProgress();
                this.updateCheckboxItemAppearance(checkbox);
            });
        });

        // Reset functionality
        if (resetButton) {
            resetButton.addEventListener('click', () => {
                checkboxes.forEach(checkbox => {
                    checkbox.checked = false;
                    this.updateCheckboxItemAppearance(checkbox);
                });
                this.updateQAProgress();
            });
        }

        // Initial progress update
        this.updateQAProgress();
    }

    updateCheckboxItemAppearance(checkbox) {
        const checkboxItem = checkbox.closest('.checkbox-item');
        if (checkboxItem) {
            if (checkbox.checked) {
                checkboxItem.classList.add('completed');
            } else {
                checkboxItem.classList.remove('completed');
            }
        }
    }

    updateQAProgress() {
        const qaForm = document.getElementById('qaForm');
        if (!qaForm) return;

        const checkboxes = qaForm.querySelectorAll('input[type="checkbox"]');
        const progressBar = document.querySelector('.progress-fill');
        const progressText = document.querySelector('.progress-text');
        const submitButton = document.querySelector('#qaSubmitBtn');
        
        // Count checked items
        const checkedCount = Array.from(checkboxes).filter(cb => cb.checked).length;
        const totalCount = checkboxes.length;
        const percentage = totalCount > 0 ? Math.round((checkedCount / totalCount) * 100) : 0;

        // Update progress bar
        if (progressBar) {
            progressBar.style.width = `${percentage}%`;
            
            // Change color from red to green based on percentage
            const redValue = Math.round(231 - (percentage * 1.31)); // From 231 (red) to 100
            const greenValue = Math.round(76 + (percentage * 0.98)); // From 76 to 174
            const blueValue = Math.round(60 + (percentage * 0.36)); // From 60 to 96
            
            progressBar.style.background = `linear-gradient(90deg, 
                rgb(${redValue}, ${greenValue}, ${blueValue}), 
                rgb(${Math.max(redValue - 20, 39)}, ${Math.min(greenValue + 20, 174)}, ${blueValue})
            )`;
        }

        // Update progress text
        if (progressText) {
            progressText.textContent = `${checkedCount}/${totalCount} checks completed (${percentage}%)`;
        }

        // Update summary values
        const completedValue = document.querySelector('.summary-value.completed');
        const pendingValue = document.querySelector('.summary-value.pending');
        const statusValue = document.querySelector('.summary-value.status');

        if (completedValue) completedValue.textContent = checkedCount;
        if (pendingValue) pendingValue.textContent = totalCount - checkedCount;
        if (statusValue) {
            statusValue.textContent = percentage === 100 ? 'Ready' : 'In Progress';
            statusValue.className = percentage === 100 ? 'summary-value status-complete' : 'summary-value status-pending';
        }

        // Enable/disable submit button
        if (submitButton) {
            submitButton.disabled = percentage !== 100;
        }
    }

    hideQAChecklist() {
        document.getElementById('qaChecklist').style.display = 'none';
        document.getElementById('addProductForm').style.display = 'block';
        // Keep tempProductData so user can continue editing
    }

    handleQASubmit() {
        const qaForm = document.getElementById('qaForm');
        const checkboxes = qaForm.querySelectorAll('input[type="checkbox"]');
        
        // Check if all checkboxes are checked
        let allChecked = true;
        checkboxes.forEach(checkbox => {
            if (!checkbox.checked) {
                allChecked = false;
            }
        });

        if (!allChecked) {
            this.showMessage('Please complete all quality assurance checks before proceeding.', 'error');
            return;
        }

        if (!this.tempProductData) {
            this.showMessage('No product data found. Please start over.', 'error');
            return;
        }

        // Add the product
        this.addProduct(this.tempProductData);
        
        // Hide QA checklist and product form, show product list
        document.getElementById('qaChecklist').style.display = 'none';
        document.getElementById('addProductForm').style.display = 'none';
        this.tempProductData = null;
        
        this.showMessage('Product successfully added to the system!', 'success');
    }

    addProduct(productData) {
        // Add additional properties for compatibility
        const newProduct = {
            ...productData,
            name: productData.title, // For compatibility with existing product display
            inStock: productData.availability === 'in stock',
            rating: 4.0, // Default rating
            features: [], // Empty features array
            dateAdded: productData.availability_date
        };

        this.products.push(newProduct);
        
        // Update ProductData if available
        if (window.ProductData && window.ProductData.products) {
            window.ProductData.products.push(newProduct);
        }

        // Save to localStorage
        localStorage.setItem('adminProducts', JSON.stringify(this.products));
        
        this.renderAdminProducts();
        this.updateDashboardStats();
    }

    renderAdminProducts() {
        const container = document.getElementById('adminProductsGrid');
        if (!container) return;

        if (this.products.length === 0) {
            container.innerHTML = '<p>No products found. Add your first product!</p>';
            return;
        }

        container.innerHTML = this.products.map(product => `
            <div class="admin-product-card" data-id="${product.id}">
                <img src="${product.image}" alt="${product.title || product.name}" class="admin-product-image" onerror="handleImageError(this)">
                <div class="admin-product-info">
                    <div class="admin-product-name">${product.title || product.name}</div>
                    <div class="admin-product-brand">${product.brand}</div>
                    <div class="admin-product-price">R${product.price.toFixed(2)}</div>
                    <div class="admin-product-status ${product.availability === 'in stock' || product.inStock ? 'in-stock' : 'out-stock'}">
                        ${product.availability === 'in stock' || product.inStock ? 'In Stock' : '❌ Out of Stock'}
                    </div>
                    <div class="admin-product-actions">
                        <button class="btn-delete" onclick="adminPanel.deleteProduct(${product.id})">Delete</button>
                    </div>
                </div>
            </div>
        `).join('');
    }

    deleteProduct(productId) {
        if (confirm('Are you sure you want to delete this product?')) {
            this.products = this.products.filter(p => p.id != productId);
            
            // Update ProductData if available
            if (window.ProductData && window.ProductData.products) {
                window.ProductData.products = window.ProductData.products.filter(p => p.id != productId);
            }

            localStorage.setItem('adminProducts', JSON.stringify(this.products));
            this.renderAdminProducts();
            this.updateDashboardStats();
            this.showMessage('Product deleted successfully', 'success');
        }
    }

    filterAdminProducts() {
        const searchTerm = document.getElementById('adminSearch').value.toLowerCase();
        const categoryFilter = document.getElementById('adminCategoryFilter').value;

        const filteredProducts = this.products.filter(product => {
            const matchesSearch = !searchTerm || 
                (product.title || product.name).toLowerCase().includes(searchTerm) ||
                product.brand.toLowerCase().includes(searchTerm);
            
            const matchesCategory = !categoryFilter || product.category === categoryFilter;
            
            return matchesSearch && matchesCategory;
        });

        this.renderFilteredProducts(filteredProducts);
    }

    renderFilteredProducts(products) {
        const container = document.getElementById('adminProductsGrid');
        if (!container) return;

        if (products.length === 0) {
            container.innerHTML = '<p>No products match your filters.</p>';
            return;
        }

        container.innerHTML = products.map(product => `
            <div class="admin-product-card" data-id="${product.id}">
                <img src="${product.image}" alt="${product.title || product.name}" class="admin-product-image" onerror="handleImageError(this)">
                <div class="admin-product-info">
                    <div class="admin-product-name">${product.title || product.name}</div>
                    <div class="admin-product-brand">${product.brand}</div>
                    <div class="admin-product-price">R${product.price.toFixed(2)}</div>
                    <div class="admin-product-status ${product.availability === 'in stock' || product.inStock ? 'in-stock' : 'out-stock'}">
                        ${product.availability === 'in stock' || product.inStock ? '✅ In Stock' : '❌ Out of Stock'}
                    </div>
                    <div class="admin-product-actions">
                        <button class="btn-delete" onclick="adminPanel.deleteProduct(${product.id})">Delete</button>
                    </div>
                </div>
            </div>
        `).join('');
    }

    showMessage(message, type = 'success') {
        // Remove existing messages
        const existingMessages = document.querySelectorAll('.message');
        existingMessages.forEach(msg => msg.remove());

        // Create new message
        const messageEl = document.createElement('div');
        messageEl.className = `message ${type}`;
        
        // Add close button
        const closeBtn = document.createElement('span');
        closeBtn.innerHTML = '&times;';
        closeBtn.className = 'message-close';
        closeBtn.onclick = () => messageEl.remove();
        
        // Add message text
        const messageText = document.createElement('span');
        messageText.textContent = message;
        
        messageEl.appendChild(messageText);
        messageEl.appendChild(closeBtn);
        messageEl.style.display = 'block';

        // Insert into body for fixed positioning
        document.body.appendChild(messageEl);

        // Auto-hide after 5 seconds
        setTimeout(() => {
            if (messageEl.parentNode) {
                messageEl.remove();
            }
        }, 5000);
    }
}

// Global functions for button clicks
function showAddProductForm() {
    adminPanel.showAddProductForm();
}

function hideAddProductForm() {
    adminPanel.hideAddProductForm();
}

function hideQAChecklist() {
    adminPanel.hideQAChecklist();
}

function filterAdminProducts() {
    adminPanel.filterAdminProducts();
}

// Handle image loading errors
function handleImageError(img) {
    // Prevent infinite loop by checking if already handled
    if (img.classList.contains('image-error')) {
        return;
    }
    
    // Add error class and remove src to show CSS placeholder
    img.classList.add('image-error');
    img.removeAttribute('src');
    img.alt = 'Image not available';
}

// Initialize admin panel when DOM is loaded
let adminPanel;
document.addEventListener('DOMContentLoaded', () => {
    adminPanel = new AdminPanel();
});
