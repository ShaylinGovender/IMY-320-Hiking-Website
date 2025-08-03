class LoginPage {
    constructor() {
        this.users = [
            {
                id: 1,
                firstName: "John",
                lastName: "Smith",
                email: "john.smith@trailblazer.com",
                password: "password123"
            },
            {
                id: 2,
                firstName: "Sarah",
                lastName: "Johnson", 
                email: "sarah.johnson@gmail.com",
                password: "hiking2024"
            },
            {
                id: 3,
                firstName: "Mike",
                lastName: "Chen",
                email: "mike.chen@outlook.com", 
                password: "adventure456"
            },
            {
                id: 4,
                firstName: "Emily",
                lastName: "Davis",
                email: "emily.davis@yahoo.com",
                password: "mountain789"
            },
            {
                id: 5,
                firstName: "Alex",
                lastName: "Wilson",
                email: "alex.wilson@trailblazer.com",
                password: "explore321"
            }
        ];
        this.initializeEventListeners();
        this.initializeImageCarousel();
        this.loadRememberedUser();
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

    initializeEventListeners() {
        const loginForm = document.querySelector('.login-form');
        const googleBtn = document.querySelector('.google-btn');
        const forgotPasswordLink = document.querySelector('.forgot-password');
        const emailInput = document.getElementById('email');
        const passwordInput = document.getElementById('password');
        const passwordToggle = document.querySelector('.password-toggle');

        if (loginForm) {
            loginForm.addEventListener('submit', (e) => this.handleLogin(e));
        }

        if (googleBtn) {
            googleBtn.addEventListener('click', (e) => this.handleGoogleLogin(e));
        }

        if (forgotPasswordLink) {
            forgotPasswordLink.addEventListener('click', (e) => this.handleForgotPassword(e));
        }

        if (passwordToggle) {
            passwordToggle.addEventListener('click', () => this.togglePasswordVisibility());
        }

        if (emailInput) {
            emailInput.addEventListener('blur', () => this.validateEmail(emailInput.value));
            emailInput.addEventListener('input', () => this.clearFieldError(emailInput));
        }

        if (passwordInput) {
            passwordInput.addEventListener('input', () => this.clearFieldError(passwordInput));
        }
    }

    async handleLogin(e) {
        e.preventDefault();
        
        const email = document.getElementById('email').value.trim();
        const password = document.getElementById('password').value;
        const rememberMe = document.getElementById('remember').checked;

        this.clearAllErrors();

        if (!this.validateLoginForm(email, password)) {
            return;
        }

        this.setLoginLoadingState(true);

        try {
            await this.delay(1000);
            
            // Create a generic user object for any valid login
            const user = {
                id: Date.now(), // Use timestamp as unique ID
                firstName: "User",
                lastName: "",
                email: email,
                loginTime: new Date().toISOString()
            };

            this.handleSuccessfulLogin(user, rememberMe);

        } catch (error) {
            console.error('Login error:', error);
            this.showError('Login failed. Please try again.');
        } finally {
            this.setLoginLoadingState(false);
        }
    }

    handleSuccessfulLogin(user, rememberMe) {
        sessionStorage.setItem('trailblazer_user', JSON.stringify({
            id: user.id,
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            loginTime: new Date().toISOString()
        }));

        if (rememberMe) {
            localStorage.setItem('trailblazer_remember', JSON.stringify({
                email: user.email,
                rememberMe: true
            }));
        } else {
            localStorage.removeItem('trailblazer_remember');
        }

        this.showSuccess(`Welcome back, ${user.firstName}! Redirecting to your dashboard...`);
        
        setTimeout(() => {
            window.location.href = 'landingPage.html';
        }, 1500);
    }

    handleGoogleLogin(e) {
        e.preventDefault();
        
        this.setGoogleLoadingState(true);
        
        setTimeout(() => {
            const mockGoogleUser = {
                id: Date.now(),
                firstName: 'Google',
                lastName: 'User',
                email: 'google.user@gmail.com'
            };

            sessionStorage.setItem('trailblazer_user', JSON.stringify({
                ...mockGoogleUser,
                loginTime: new Date().toISOString(),
                provider: 'google'
            }));

            this.showSuccess('Successfully signed in with Google! Redirecting...');
            
            setTimeout(() => {
                window.location.href = 'landingPage.html';
            }, 1500);
            
        }, 2000);
    }

    handleForgotPassword(e) {
        e.preventDefault();
        
        const email = document.getElementById('email').value.trim();
        
        if (!email) {
            this.showError('Please enter your email address first, then click "Forgot Password".');
            this.highlightField(document.getElementById('email'));
            return;
        }

        if (!this.validateEmail(email)) {
            this.showError('Please enter a valid email address.');
            this.highlightField(document.getElementById('email'));
            return;
        }

        const user = this.users.find(u => u.email.toLowerCase() === email.toLowerCase());
        
        // For demo purposes, we'll simulate sending password reset for any valid email
        // In a real application, this would actually send an email if the user exists

        this.showSuccess(`Password reset instructions have been sent to ${email}. Please check your inbox and follow the instructions to reset your password.`);
    }

    validateLoginForm(email, password) {
        let isValid = true;

        if (!email) {
            this.showFieldError(document.getElementById('email'), 'Email is required');
            isValid = false;
        } else if (!this.validateEmail(email)) {
            this.showFieldError(document.getElementById('email'), 'Please enter a valid email address');
            isValid = false;
        }

        if (!password) {
            this.showFieldError(document.getElementById('password'), 'Password is required');
            isValid = false;
        } else if (password.length < 6) {
            this.showFieldError(document.getElementById('password'), 'Password must be at least 6 characters');
            isValid = false;
        }

        return isValid;
    }

    validateEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    showError(message) {
        this.removeExistingMessages();
        const errorDiv = document.createElement('div');
        errorDiv.className = 'error-message';
        errorDiv.innerHTML = `
            <div class="error-content">
                <span class="error-icon">!</span>
                <span class="error-text">${message}</span>
            </div>
        `;
        
        const loginForm = document.querySelector('.login-form');
        loginForm.insertBefore(errorDiv, loginForm.firstChild);
    }

    showSuccess(message) {
        this.removeExistingMessages();
        const successDiv = document.createElement('div');
        successDiv.className = 'success-message';
        successDiv.innerHTML = `
            <div class="success-content">
                <span class="success-icon">✓</span>
                <span class="success-text">${message}</span>
            </div>
        `;
        
        const loginForm = document.querySelector('.login-form');
        loginForm.insertBefore(successDiv, loginForm.firstChild);
    }

    showFieldError(field, message) {
        this.clearFieldError(field);
        field.classList.add('error');
        
        const errorSpan = document.createElement('span');
        errorSpan.className = 'field-error';
        errorSpan.textContent = message;
        
        field.parentNode.appendChild(errorSpan);
    }

    clearFieldError(field) {
        field.classList.remove('error');
        const existingError = field.parentNode.querySelector('.field-error');
        if (existingError) {
            existingError.remove();
        }
    }

    clearAllErrors() {
        this.removeExistingMessages();
        document.querySelectorAll('.error').forEach(field => {
            this.clearFieldError(field);
        });
    }

    highlightField(field) {
        field.classList.add('highlight');
        field.focus();
        setTimeout(() => {
            field.classList.remove('highlight');
        }, 2000);
    }

    removeExistingMessages() {
        const existingMessages = document.querySelectorAll('.error-message, .success-message');
        existingMessages.forEach(msg => msg.remove());
    }

    setLoginLoadingState(loading) {
        const loginBtn = document.querySelector('.login-btn');
        const emailInput = document.getElementById('email');
        const passwordInput = document.getElementById('password');
        
        if (loading) {
            loginBtn.innerHTML = '<span class="loading-spinner"></span> Signing In...';
            loginBtn.disabled = true;
            emailInput.disabled = true;
            passwordInput.disabled = true;
        } else {
            loginBtn.innerHTML = 'Sign In';
            loginBtn.disabled = false;
            emailInput.disabled = false;
            passwordInput.disabled = false;
        }
    }

    setGoogleLoadingState(loading) {
        const googleBtn = document.querySelector('.google-btn');
        
        if (loading) {
            googleBtn.innerHTML = '<span class="loading-spinner"></span> Connecting to Google...';
            googleBtn.disabled = true;
        } else {
            googleBtn.innerHTML = '<span class="google-icon">G</span> Continue with Google';
            googleBtn.disabled = false;
        }
    }

    loadRememberedUser() {
        const remembered = localStorage.getItem('trailblazer_remember');
        if (remembered) {
            const { email, rememberMe } = JSON.parse(remembered);
            const emailInput = document.getElementById('email');
            const rememberCheckbox = document.getElementById('remember');
            
            if (emailInput && email) {
                emailInput.value = email;
            }
            if (rememberCheckbox && rememberMe) {
                rememberCheckbox.checked = true;
            }
        }
    }

    delay(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    togglePasswordVisibility() {
        const passwordInput = document.getElementById('password');
        const eyeOpenIcon = document.querySelector('.eye-open');
        const eyeClosedIcon = document.querySelector('.eye-closed');
        
        if (passwordInput.type === 'password') {
            passwordInput.type = 'text';
            eyeOpenIcon.style.display = 'none';
            eyeClosedIcon.style.display = 'block';
        } else {
            passwordInput.type = 'password';
            eyeOpenIcon.style.display = 'block';
            eyeClosedIcon.style.display = 'none';
        }
    }
}

document.addEventListener('DOMContentLoaded', () => {
    new LoginPage();
});
