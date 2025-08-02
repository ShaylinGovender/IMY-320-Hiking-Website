// TrailBlazer Login Page Backend Functionality
class LoginPage {
    constructor() {
        this.users = this.loadUsers();
        this.initializeEventListeners();
        this.initializeGoogleAuth();
        this.initializeImageCarousel();
    }

    initializeImageCarousel() {
        const images = document.querySelectorAll('.hiking-image');
        let currentIndex = 0;

        if (images.length === 0) return;

        setInterval(() => {
            images[currentIndex].classList.remove('active');
            currentIndex = (currentIndex + 1) % images.length;
            images[currentIndex].classList.add('active');
        }, 4000);
    }

    // Initialize event listeners
    initializeEventListeners() {
        const loginForm = document.querySelector('.login-form');
        const googleBtn = document.querySelector('.google-btn');
        const emailInput = document.getElementById('email');
        const passwordInput = document.getElementById('password');

        // Form submission handler
        if (loginForm) {
            loginForm.addEventListener('submit', (e) => this.handleLogin(e));
        }

        // Google login handler
        if (googleBtn) {
            googleBtn.addEventListener('click', () => this.handleGoogleLogin());
        }

        // Real-time validation
        if (emailInput) {
            emailInput.addEventListener('blur', () => this.validateEmail(emailInput.value));
            emailInput.addEventListener('input', () => this.clearFieldError(emailInput));
        }

        if (passwordInput) {
            passwordInput.addEventListener('input', () => this.clearFieldError(passwordInput));
        }

        // Remember me functionality
        this.loadRememberedUser();
    }

    // Load users from localStorage (simulating a database)
    loadUsers() {
        const users = localStorage.getItem('trailblazer_users');
        if (users) {
            return JSON.parse(users);
        }
        
        // Default demo users for testing
        const defaultUsers = [
            {
                id: 1,
                email: 'demo@trailblazer.com',
                password: 'password123',
                firstName: 'Demo',
                lastName: 'User',
                createdAt: new Date().toISOString()
            },
            {
                id: 2,
                email: 'admin@trailblazer.com',
                password: 'admin123',
                firstName: 'Admin',
                lastName: 'User',
                createdAt: new Date().toISOString()
            }
        ];
        
        this.saveUsers(defaultUsers);
        return defaultUsers;
    }

    // Save users to localStorage
    saveUsers(users) {
        localStorage.setItem('trailblazer_users', JSON.stringify(users));
    }

    // Handle login form submission
    async handleLogin(event) {
        event.preventDefault();
        
        const email = document.getElementById('email').value.trim();
        const password = document.getElementById('password').value;
        const rememberMe = document.getElementById('remember').checked;

        // Clear previous errors
        this.clearAllErrors();

        // Validate inputs
        if (!this.validateLoginInputs(email, password)) {
            return;
        }

        // Show loading state
        this.setLoadingState(true);

        try {
            // Simulate API call delay
            await this.delay(1000);

            // Authenticate user
            const user = this.authenticateUser(email, password);
            
            if (user) {
                // Login successful
                this.handleSuccessfulLogin(user, rememberMe);
            } else {
                // Login failed
                this.showError('Invalid email or password. Please try again.');
            }
        } catch (error) {
            console.error('Login error:', error);
            this.showError('An error occurred during login. Please try again.');
        } finally {
            this.setLoadingState(false);
        }
    }

    // Validate login inputs
    validateLoginInputs(email, password) {
        let isValid = true;

        // Email validation
        if (!email) {
            this.showFieldError('email', 'Email is required');
            isValid = false;
        } else if (!this.validateEmail(email)) {
            this.showFieldError('email', 'Please enter a valid email address');
            isValid = false;
        }

        // Password validation
        if (!password) {
            this.showFieldError('password', 'Password is required');
            isValid = false;
        } else if (password.length < 6) {
            this.showFieldError('password', 'Password must be at least 6 characters');
            isValid = false;
        }

        return isValid;
    }

    // Validate email format
    validateEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    // Authenticate user
    authenticateUser(email, password) {
        return this.users.find(user => 
            user.email.toLowerCase() === email.toLowerCase() && 
            user.password === password
        );
    }

    // Handle successful login
    handleSuccessfulLogin(user, rememberMe) {
        // Store user session
        const sessionData = {
            id: user.id,
            email: user.email,
            firstName: user.firstName,
            lastName: user.lastName,
            loginTime: new Date().toISOString()
        };

        // Store in sessionStorage for current session
        sessionStorage.setItem('trailblazer_user', JSON.stringify(sessionData));

        // Store in localStorage if remember me is checked
        if (rememberMe) {
            localStorage.setItem('trailblazer_remember', JSON.stringify({
                email: user.email,
                rememberMe: true
            }));
        } else {
            localStorage.removeItem('trailblazer_remember');
        }

        // Show success message
        this.showSuccess(`Welcome back, ${user.firstName}!`);

        // Redirect after delay
        setTimeout(() => {
            window.location.href = '../html/HomePage.html'; // Adjust path as needed
        }, 1500);
    }

    // Handle Google login
    async handleGoogleLogin() {
        try {
            this.setGoogleLoadingState(true);
            
            // Simulate Google OAuth flow
            await this.delay(2000);
            
            // For demo purposes, create a mock Google user
            const mockGoogleUser = {
                id: Date.now(),
                email: 'google.user@gmail.com',
                firstName: 'Google',
                lastName: 'User',
                provider: 'google',
                createdAt: new Date().toISOString()
            };

            // Add to users if not exists
            const existingUser = this.users.find(u => u.email === mockGoogleUser.email);
            if (!existingUser) {
                this.users.push(mockGoogleUser);
                this.saveUsers(this.users);
            }

            this.handleSuccessfulLogin(existingUser || mockGoogleUser, false);
            
        } catch (error) {
            console.error('Google login error:', error);
            this.showError('Google login failed. Please try again.');
        } finally {
            this.setGoogleLoadingState(false);
        }
    }

    // Initialize Google Auth (placeholder for real implementation)
    initializeGoogleAuth() {
        // In a real implementation, you would initialize Google Sign-In here
        // For now, this is just a placeholder
        console.log('Google Auth initialized (demo mode)');
    }

    // Load remembered user
    loadRememberedUser() {
        const remembered = localStorage.getItem('trailblazer_remember');
        if (remembered) {
            const { email, rememberMe } = JSON.parse(remembered);
            const emailInput = document.getElementById('email');
            const rememberCheckbox = document.getElementById('remember');
            
            if (emailInput) emailInput.value = email;
            if (rememberCheckbox) rememberCheckbox.checked = rememberMe;
        }
    }

    // UI Helper Methods
    setLoadingState(isLoading) {
        const submitBtn = document.querySelector('.login-btn');
        if (submitBtn) {
            if (isLoading) {
                submitBtn.disabled = true;
                submitBtn.innerHTML = '<span>Signing in...</span>';
                submitBtn.style.opacity = '0.7';
            } else {
                submitBtn.disabled = false;
                submitBtn.innerHTML = 'Sign In';
                submitBtn.style.opacity = '1';
            }
        }
    }

    setGoogleLoadingState(isLoading) {
        const googleBtn = document.querySelector('.google-btn');
        if (googleBtn) {
            if (isLoading) {
                googleBtn.disabled = true;
                googleBtn.style.opacity = '0.7';
                const text = googleBtn.querySelector('svg').nextSibling;
                if (text) text.textContent = ' Connecting...';
            } else {
                googleBtn.disabled = false;
                googleBtn.style.opacity = '1';
                const text = googleBtn.querySelector('svg').nextSibling;
                if (text) text.textContent = ' Continue with Google';
            }
        }
    }

    showError(message) {
        this.showMessage(message, 'error');
    }

    showSuccess(message) {
        this.showMessage(message, 'success');
    }

    showMessage(message, type) {
        // Remove existing messages
        const existingMessage = document.querySelector('.login-message');
        if (existingMessage) {
            existingMessage.remove();
        }

        // Create message element
        const messageEl = document.createElement('div');
        messageEl.className = `login-message ${type}`;
        messageEl.textContent = message;

        // Insert after form
        const form = document.querySelector('.login-form');
        if (form) {
            form.insertAdjacentElement('afterend', messageEl);

            // Remove after 5 seconds
            setTimeout(() => {
                if (messageEl.parentNode) {
                    messageEl.remove();
                }
            }, 5000);
        }
    }

    showFieldError(fieldName, message) {
        const field = document.getElementById(fieldName);
        if (field) {
            field.style.borderColor = '#e74c3c';
            
            // Remove existing error
            const existingError = field.parentNode.querySelector('.field-error');
            if (existingError) {
                existingError.remove();
            }

            // Add error message
            const errorEl = document.createElement('div');
            errorEl.className = 'field-error';
            errorEl.textContent = message;
            field.parentNode.appendChild(errorEl);
        }
    }

    clearFieldError(field) {
        field.style.borderColor = '#ddd';
        const errorEl = field.parentNode.querySelector('.field-error');
        if (errorEl) {
            errorEl.remove();
        }
    }

    clearAllErrors() {
        const errorMessages = document.querySelectorAll('.login-message, .field-error');
        errorMessages.forEach(el => el.remove());

        const fields = document.querySelectorAll('#email, #password');
        fields.forEach(field => {
            field.style.borderColor = '#ddd';
        });
    }

    // Utility method for delays
    delay(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    // Public method to check if user is logged in
    static isLoggedIn() {
        return !!sessionStorage.getItem('trailblazer_user');
    }

    // Public method to get current user
    static getCurrentUser() {
        const userData = sessionStorage.getItem('trailblazer_user');
        return userData ? JSON.parse(userData) : null;
    }

    // Public method to logout
    static logout() {
        sessionStorage.removeItem('trailblazer_user');
        localStorage.removeItem('trailblazer_remember');
        window.location.href = '../html/LoginPage.html';
    }
}

// Initialize the login page when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new LoginPage();
});

// Add CSS for error and success messages
const style = document.createElement('style');
style.textContent = `
    .login-message {
        padding: 0.75rem;
        border-radius: 6px;
        margin-top: 1rem;
        font-size: 0.9rem;
        font-weight: 500;
    }

    .login-message.success {
        background-color: #d4edda;
        color: #155724;
        border: 1px solid #c3e6cb;
    }

    .login-message.error {
        background-color: #f8d7da;
        color: #721c24;
        border: 1px solid #f5c6cb;
    }

    .field-error {
        color: #e74c3c;
        font-size: 0.8rem;
        margin-top: 0.25rem;
    }

    .login-btn:disabled,
    .google-btn:disabled {
        cursor: not-allowed;
    }
`;
document.head.appendChild(style);
