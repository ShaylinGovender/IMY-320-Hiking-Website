class RegisterPage {
    constructor() {
        this.users = this.loadUsers();
        this.initializeEventListeners();
        this.initializeGoogleAuth();
        this.initializeImageCarousel();
        this.passwordRequirements = {
            length: false,
            uppercase: false,
            lowercase: false,
            number: false
        };
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
        const registerForm = document.querySelector('.register-form');
        const googleBtn = document.querySelector('.google-btn');
        const firstNameInput = document.getElementById('firstName');
        const lastNameInput = document.getElementById('lastName');
        const emailInput = document.getElementById('email');
        const passwordInput = document.getElementById('password');
        const confirmPasswordInput = document.getElementById('confirmPassword');

        if (registerForm) {
            registerForm.addEventListener('submit', (e) => this.handleRegister(e));
        }

        if (googleBtn) {
            googleBtn.addEventListener('click', () => this.handleGoogleRegister());
        }

        if (firstNameInput) {
            firstNameInput.addEventListener('blur', () => this.validateName(firstNameInput, 'First name'));
            firstNameInput.addEventListener('input', () => this.clearFieldError(firstNameInput));
        }

        if (lastNameInput) {
            lastNameInput.addEventListener('blur', () => this.validateName(lastNameInput, 'Last name'));
            lastNameInput.addEventListener('input', () => this.clearFieldError(lastNameInput));
        }

        if (emailInput) {
            emailInput.addEventListener('blur', () => this.validateEmail(emailInput.value));
            emailInput.addEventListener('input', () => this.clearFieldError(emailInput));
        }

        if (passwordInput) {
            passwordInput.addEventListener('input', () => {
                this.checkPasswordStrength(passwordInput.value);
                this.clearFieldError(passwordInput);
                if (confirmPasswordInput.value) {
                    this.validatePasswordMatch(passwordInput.value, confirmPasswordInput.value);
                }
            });
        }

        if (confirmPasswordInput) {
            confirmPasswordInput.addEventListener('input', () => {
                this.validatePasswordMatch(passwordInput.value, confirmPasswordInput.value);
                this.clearFieldError(confirmPasswordInput);
            });
        }
    }

    loadUsers() {
        const users = sessionStorage.getItem('trailblazer_users'); 
        if (users) {
            return JSON.parse(users);
        }
        
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
    saveUsers(users) {
        sessionStorage.setItem('trailblazer_users', JSON.stringify(users)); 
    }

    async handleRegister(event) {
        event.preventDefault();
        
        const firstName = document.getElementById('firstName').value.trim();
        const lastName = document.getElementById('lastName').value.trim();
        const email = document.getElementById('email').value.trim();
        const password = document.getElementById('password').value;
        const confirmPassword = document.getElementById('confirmPassword').value;
        const termsAccepted = document.getElementById('terms').checked;
        const newsletter = document.getElementById('newsletter').checked;

        this.clearAllErrors();

        if (!this.validateRegistrationInputs(firstName, lastName, email, password, confirmPassword, termsAccepted)) {
            return;
        }

        this.setLoadingState(true);

        try {
            await this.delay(1500);

            const existingUser = this.users.find(user => 
                user.email.toLowerCase() === email.toLowerCase()
            );

            if (existingUser) {
                this.showError('An account with this email already exists. Please sign in instead.');
                return;
            }

            const newUser = {
                id: Date.now(),
                firstName: firstName,
                lastName: lastName,
                email: email,
                password: password,
                newsletter: newsletter,
                createdAt: new Date().toISOString()
            };

            this.users.push(newUser);
            this.saveUsers(this.users);

            this.handleSuccessfulRegistration(newUser);

        } catch (error) {
            console.error('Registration error:', error);
            this.showError('An error occurred during registration. Please try again.');
        } finally {
            this.setLoadingState(false);
        }
    }

    validateRegistrationInputs(firstName, lastName, email, password, confirmPassword, termsAccepted) {
        let isValid = true;

        const firstNameInput = document.getElementById('firstName');
        if (!this.validateName(firstNameInput, 'First name')) {
            isValid = false;
        }

        const lastNameInput = document.getElementById('lastName');
        if (!this.validateName(lastNameInput, 'Last name')) {
            isValid = false;
        }

        if (!email) {
            this.showFieldError('email', 'Email is required');
            isValid = false;
        } else if (!this.validateEmail(email)) {
            this.showFieldError('email', 'Please enter a valid email address');
            isValid = false;
        }

        if (!password) {
            this.showFieldError('password', 'Password is required');
            isValid = false;
        } else if (!this.isPasswordStrong(password)) {
            this.showFieldError('password', 'Password does not meet the requirements');
            isValid = false;
        }

        if (!confirmPassword) {
            this.showFieldError('confirmPassword', 'Please confirm your password');
            isValid = false;
        } else if (password !== confirmPassword) {
            this.showFieldError('confirmPassword', 'Passwords do not match');
            isValid = false;
        }

        if (!termsAccepted) {
            this.showError('You must accept the Terms of Service and Privacy Policy to continue.');
            isValid = false;
        }

        return isValid;
    }

    
        validateName(nameInput, fieldLabel) {
            const name = nameInput.value.trim();
            
            if (!name) {
                this.showFieldError(nameInput.id, `${fieldLabel} is required`);
                return false;
            }
            
            if (name.length < 2) {
                this.showFieldError(nameInput.id, `${fieldLabel} must be at least 2 characters long`);
                return false;
            }
            
            if (name.length > 50) {
                this.showFieldError(nameInput.id, `${fieldLabel} must be less than 50 characters`);
                return false;
            }
            
            const namePattern = /^[a-zA-ZàáâäãåąčćęèéêëėįìíîïłńòóôöõøùúûüųūÿýżźñçčšžÀÁÂÄÃÅĄĆČĖĘÈÉÊËÌÍÎÏĮŁŃÒÓÔÖÕØÙÚÛÜŲŪŸÝŻŹÑßÇŒÆČŠŽ∂ð\s'\-]+$/u;
            
            if (!namePattern.test(name)) {
                this.showFieldError(nameInput.id, `${fieldLabel} can only contain letters, spaces, hyphens, and apostrophes`);
                return false;
            }
            
            this.clearFieldError(nameInput);
            return true;
        }
    

    validateEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

   checkPasswordStrength(password) {
        const strengthBar = document.getElementById('strengthBar');
        const strengthText = document.getElementById('strengthText');
        
        if (!strengthBar || !strengthText) return;

        let strength = 0;
        let feedback = [];

        if (password.length >= 8) strength++;
        else feedback.push('At least 8 characters');

        if (/[A-Z]/.test(password)) strength++;
        else feedback.push('One uppercase letter');

        if (/[a-z]/.test(password)) strength++;
        else feedback.push('One lowercase letter');

        if (/\d/.test(password)) strength++;
        else feedback.push('One number');

        if (/[!@#$%^&*(),.?":{}|<>]/.test(password)) strength++;
        else feedback.push('One special character');

        strengthBar.className = 'strength-bar';
        
        if (strength < 3) {
            strengthBar.classList.add('strength-weak');
            strengthText.textContent = 'Weak - ' + feedback.slice(0, 2).join(', ');
            strengthText.style.color = '#e74c3c';
        } else if (strength < 5) {
            strengthBar.classList.add('strength-medium');
            strengthText.textContent = 'Medium - ' + feedback.slice(0, 1).join(', ');
            strengthText.style.color = '#f39c12';
        } else {
            strengthBar.classList.add('strength-strong');
            strengthText.textContent = 'Strong password';
            strengthText.style.color = '#27ae60';
        }
    }

    isPasswordStrong(password) {
        return password.length >= 8 &&
               /[A-Z]/.test(password) &&
               /[a-z]/.test(password) &&
               /\d/.test(password);
    }

    validatePasswordMatch(password, confirmPassword) {
        const confirmField = document.getElementById('confirmPassword');
        if (confirmPassword && password !== confirmPassword) {
            this.showFieldError('confirmPassword', 'Passwords do not match');
            return false;
        } else if (confirmPassword && password === confirmPassword) {
            this.clearFieldError(confirmField);
            return true;
        }
        return true;
    }

    handleSuccessfulRegistration(user) {
        const sessionData = {
            id: user.id,
            email: user.email,
            firstName: user.firstName,
            lastName: user.lastName,
            loginTime: new Date().toISOString()
        };

        sessionStorage.setItem('trailblazer_user', JSON.stringify(sessionData));

        this.showSuccessModal(`Welcome, ${user.firstName}! Taking you to begin your adventure shortly...`);

        setTimeout(() => {
        window.location.href = `../html/LandingPage.html?registered=true&name=${encodeURIComponent(user.firstName)}`;
    }, 4000);
    }

    showSuccessModal(message) {
        const existingModal = document.querySelector('.success-modal-overlay');
        if (existingModal) {
            existingModal.remove();
        }

        const overlay = document.createElement('div');
        overlay.className = 'success-modal-overlay';

        const modal = document.createElement('div');
        modal.className = 'success-modal';

        modal.innerHTML = `
            <h2>
                <span>🥾</span>
                Account Created Successfully!
            </h2>
            <p>${message}</p>
            <div class="loading-dots">
                <span></span>
                <span></span>
                <span></span>
            </div>
        `;

        overlay.appendChild(modal);
        document.body.appendChild(overlay);

        document.body.style.overflow = 'hidden';

        setTimeout(() => {
            document.body.style.overflow = '';
            if (overlay.parentNode) {
                overlay.remove();
            }
        }, 4000);
    }

    async handleGoogleRegister() {
        try {
            this.setGoogleLoadingState(true);
            
            await this.delay(2000);
            
            const mockGoogleUser = {
                id: Date.now(),
                email: 'google.user@gmail.com',
                firstName: 'Google',
                lastName: 'User',
                provider: 'google',
                newsletter: false,
                createdAt: new Date().toISOString()
            };

            const existingUser = this.users.find(u => u.email === mockGoogleUser.email);
            if (existingUser) {
                this.showError('An account with this Google email already exists. Please sign in instead.');
                return;
            }

            this.users.push(mockGoogleUser);
            this.saveUsers(this.users);

            this.handleSuccessfulRegistration(mockGoogleUser);
            
        } catch (error) {
            console.error('Google registration error:', error);
            this.showError('Google registration failed. Please try again.');
        } finally {
            this.setGoogleLoadingState(false);
        }
    }

    initializeGoogleAuth() {
        console.log('Google Auth initialized (demo mode)');
    }

    setLoadingState(isLoading) {
        const submitBtn = document.querySelector('.register-btn');
        if (submitBtn) {
            if (isLoading) {
                submitBtn.disabled = true;
                submitBtn.innerHTML = '<span>Creating Account...</span>';
                submitBtn.style.opacity = '0.7';
            } else {
                submitBtn.disabled = false;
                submitBtn.innerHTML = 'Create Account';
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
        const existingMessage = document.querySelector('.register-message');
        if (existingMessage) {
            existingMessage.remove();
        }

        const messageEl = document.createElement('div');
        messageEl.className = `register-message ${type}`;
        messageEl.textContent = message;

        const formContainer = document.querySelector('.form-container');
        const form = document.querySelector('.register-form');
        
        if (formContainer && form) {
            formContainer.insertBefore(messageEl, form);
        }

        messageEl.scrollIntoView({ behavior: 'smooth', block: 'nearest' });

        setTimeout(() => {
            if (messageEl.parentNode) {
                messageEl.remove();
            }
        }, 6000);
    }

    showFieldError(fieldName, message) {
        const field = document.getElementById(fieldName);
        if (field) {
            field.style.borderColor = '#e74c3c';
            
            const existingError = field.parentNode.querySelector('.field-error');
            if (existingError) {
                existingError.remove();
            }

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
        const errorMessages = document.querySelectorAll('.register-message, .field-error');
        errorMessages.forEach(el => el.remove());

        const fields = document.querySelectorAll('#firstName, #lastName, #email, #password, #confirmPassword');
        fields.forEach(field => {
            field.style.borderColor = '#ddd';
        });
    }

    delay(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    static isLoggedIn() {
        return !!sessionStorage.getItem('trailblazer_user');
    }

    static getCurrentUser() {
        const userData = sessionStorage.getItem('trailblazer_user');
        return userData ? JSON.parse(userData) : null;
    }
}

document.addEventListener('DOMContentLoaded', () => {
    new RegisterPage();
});