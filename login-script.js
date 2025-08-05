// DOM Elements
const loginForm = document.getElementById('loginForm');
const emailInput = document.getElementById('email');
const passwordInput = document.getElementById('password');
const togglePasswordBtn = document.getElementById('togglePassword');
const loginBtn = document.querySelector('.login-btn');
const emailError = document.getElementById('email-error');
const passwordError = document.getElementById('password-error');
const rememberCheckbox = document.getElementById('remember');

// Validation Rules
const validationRules = {
    email: {
        required: true,
        pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
        message: 'Please enter a valid email address'
    },
    password: {
        required: true,
        minLength: 6,
        message: 'Password must be at least 6 characters long'
    }
};

// State Management
let formState = {
    isValid: false,
    isSubmitting: false,
    fields: {
        email: { isValid: false, value: '' },
        password: { isValid: false, value: '' }
    }
};

// Initialize the form
document.addEventListener('DOMContentLoaded', function() {
    initializeForm();
    loadRememberedCredentials();
});

// Initialize form functionality
function initializeForm() {
    // Password toggle functionality
    togglePasswordBtn.addEventListener('click', togglePasswordVisibility);
    
    // Form validation
    emailInput.addEventListener('input', (e) => validateField('email', e.target.value));
    emailInput.addEventListener('blur', (e) => validateField('email', e.target.value));
    
    passwordInput.addEventListener('input', (e) => validateField('password', e.target.value));
    passwordInput.addEventListener('blur', (e) => validateField('password', e.target.value));
    
    // Form submission
    loginForm.addEventListener('submit', handleFormSubmit);
    
    // Social login buttons
    const socialBtns = document.querySelectorAll('.social-btn');
    socialBtns.forEach(btn => {
        btn.addEventListener('click', handleSocialLogin);
    });
    
    // Add smooth focus transitions
    const inputs = document.querySelectorAll('input');
    inputs.forEach(input => {
        input.addEventListener('focus', handleInputFocus);
        input.addEventListener('blur', handleInputBlur);
    });
}

// Toggle password visibility
function togglePasswordVisibility() {
    const isPassword = passwordInput.type === 'password';
    passwordInput.type = isPassword ? 'text' : 'password';
    
    const icon = togglePasswordBtn.querySelector('i');
    icon.className = isPassword ? 'fas fa-eye-slash' : 'fas fa-eye';
    
    // Add a subtle animation
    togglePasswordBtn.style.transform = 'scale(0.95)';
    setTimeout(() => {
        togglePasswordBtn.style.transform = 'scale(1)';
    }, 100);
}

// Validate individual field
function validateField(fieldName, value) {
    const rules = validationRules[fieldName];
    const errorElement = document.getElementById(`${fieldName}-error`);
    const formGroup = errorElement.closest('.form-group');
    
    let isValid = true;
    let errorMessage = '';
    
    // Required validation
    if (rules.required && !value.trim()) {
        isValid = false;
        errorMessage = `${fieldName.charAt(0).toUpperCase() + fieldName.slice(1)} is required`;
    }
    
    // Pattern validation (for email)
    else if (rules.pattern && value && !rules.pattern.test(value)) {
        isValid = false;
        errorMessage = rules.message;
    }
    
    // Length validation (for password)
    else if (rules.minLength && value && value.length < rules.minLength) {
        isValid = false;
        errorMessage = rules.message;
    }
    
    // Update UI
    updateFieldValidation(formGroup, errorElement, isValid, errorMessage);
    
    // Update state
    formState.fields[fieldName] = { isValid, value };
    formState.isValid = Object.values(formState.fields).every(field => field.isValid);
    
    // Update submit button state
    updateSubmitButton();
    
    return isValid;
}

// Update field validation UI
function updateFieldValidation(formGroup, errorElement, isValid, errorMessage) {
    // Remove existing classes
    formGroup.classList.remove('error', 'success');
    errorElement.classList.remove('show');
    
    if (errorMessage) {
        // Show error state
        formGroup.classList.add('error');
        errorElement.textContent = errorMessage;
        errorElement.classList.add('show');
    } else if (isValid && formGroup.querySelector('input').value) {
        // Show success state
        formGroup.classList.add('success');
    }
}

// Update submit button state
function updateSubmitButton() {
    const btnText = loginBtn.querySelector('.btn-text');
    const btnIcon = loginBtn.querySelector('.btn-icon');
    
    if (formState.isValid && !formState.isSubmitting) {
        loginBtn.disabled = false;
        loginBtn.style.opacity = '1';
        btnText.textContent = 'Sign In';
    } else if (formState.isSubmitting) {
        loginBtn.disabled = true;
        loginBtn.classList.add('loading');
        btnText.textContent = 'Signing In...';
    } else {
        loginBtn.disabled = false; // Keep enabled for better UX, show validation on click
        loginBtn.style.opacity = '1';
    }
}

// Handle form submission
async function handleFormSubmit(e) {
    e.preventDefault();
    
    // Validate all fields
    const emailValid = validateField('email', emailInput.value);
    const passwordValid = validateField('password', passwordInput.value);
    
    if (!emailValid || !passwordValid) {
        // Show shake animation for invalid fields
        if (!emailValid) emailInput.closest('.form-group').classList.add('error');
        if (!passwordValid) passwordInput.closest('.form-group').classList.add('error');
        return;
    }
    
    // Set loading state
    formState.isSubmitting = true;
    updateSubmitButton();
    
    try {
        // Simulate API call
        await simulateLogin({
            email: emailInput.value,
            password: passwordInput.value,
            remember: rememberCheckbox.checked
        });
        
        // Handle successful login
        handleLoginSuccess();
        
    } catch (error) {
        // Handle login error
        handleLoginError(error.message);
    } finally {
        // Reset loading state
        formState.isSubmitting = false;
        loginBtn.classList.remove('loading');
        updateSubmitButton();
    }
}

// Simulate login API call
function simulateLogin(credentials) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            // Simulate different scenarios
            if (credentials.email === 'demo@example.com' && credentials.password === 'password123') {
                resolve({ success: true, user: { email: credentials.email } });
            } else if (credentials.email === 'error@example.com') {
                reject({ message: 'Server error. Please try again later.' });
            } else {
                reject({ message: 'Invalid email or password. Please try again.' });
            }
        }, 2000); // 2 second delay to simulate network request
    });
}

// Handle successful login
function handleLoginSuccess() {
    // Save credentials if remember is checked
    if (rememberCheckbox.checked) {
        localStorage.setItem('rememberedEmail', emailInput.value);
    } else {
        localStorage.removeItem('rememberedEmail');
    }
    
    // Show success message
    showNotification('Login successful! Redirecting...', 'success');
    
    // Simulate redirect after delay
    setTimeout(() => {
        // In a real app, you would redirect to the dashboard
        console.log('Redirecting to dashboard...');
        showNotification('Welcome to your dashboard!', 'info');
    }, 1500);
}

// Handle login error
function handleLoginError(message) {
    showNotification(message, 'error');
    
    // Add shake animation to form
    const loginCard = document.querySelector('.login-card');
    loginCard.style.animation = 'shake 0.5s ease-in-out';
    setTimeout(() => {
        loginCard.style.animation = '';
    }, 500);
}

// Show notification
function showNotification(message, type = 'info') {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <i class="fas ${getNotificationIcon(type)}"></i>
        <span>${message}</span>
    `;
    
    // Add styles
    Object.assign(notification.style, {
        position: 'fixed',
        top: '20px',
        right: '20px',
        background: getNotificationColor(type),
        color: 'white',
        padding: '16px 20px',
        borderRadius: '12px',
        boxShadow: '0 8px 25px rgba(0, 0, 0, 0.15)',
        display: 'flex',
        alignItems: 'center',
        gap: '12px',
        fontSize: '14px',
        fontWeight: '500',
        zIndex: '10000',
        transform: 'translateX(100%)',
        transition: 'transform 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
        backdropFilter: 'blur(10px)'
    });
    
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Remove after delay
    setTimeout(() => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        }, 300);
    }, 4000);
}

// Get notification icon
function getNotificationIcon(type) {
    const icons = {
        success: 'fa-check-circle',
        error: 'fa-exclamation-circle',
        info: 'fa-info-circle',
        warning: 'fa-exclamation-triangle'
    };
    return icons[type] || icons.info;
}

// Get notification color
function getNotificationColor(type) {
    const colors = {
        success: '#22c55e',
        error: '#ef4444',
        info: '#6366f1',
        warning: '#f59e0b'
    };
    return colors[type] || colors.info;
}

// Handle social login
function handleSocialLogin(e) {
    const provider = e.currentTarget.classList.contains('google-btn') ? 'Google' : 'GitHub';
    
    // Add loading state to the clicked button
    const btn = e.currentTarget;
    const originalContent = btn.innerHTML;
    btn.innerHTML = `<i class="fas fa-spinner fa-spin"></i> <span>Connecting...</span>`;
    btn.disabled = true;
    
    // Simulate social login
    setTimeout(() => {
        showNotification(`${provider} login is not implemented yet`, 'info');
        
        // Reset button
        btn.innerHTML = originalContent;
        btn.disabled = false;
    }, 1500);
}

// Handle input focus
function handleInputFocus(e) {
    const formGroup = e.target.closest('.form-group');
    formGroup.classList.add('focused');
}

// Handle input blur
function handleInputBlur(e) {
    const formGroup = e.target.closest('.form-group');
    formGroup.classList.remove('focused');
}

// Load remembered credentials
function loadRememberedCredentials() {
    const rememberedEmail = localStorage.getItem('rememberedEmail');
    if (rememberedEmail) {
        emailInput.value = rememberedEmail;
        rememberCheckbox.checked = true;
        validateField('email', rememberedEmail);
    }
}

// Demo functionality - remove in production
function addDemoHelpers() {
    // Add demo credentials button
    const demoBtn = document.createElement('button');
    demoBtn.type = 'button';
    demoBtn.textContent = 'Use Demo Credentials';
    demoBtn.className = 'demo-btn';
    demoBtn.style.cssText = `
        position: fixed;
        bottom: 20px;
        left: 20px;
        background: #22c55e;
        color: white;
        border: none;
        padding: 12px 16px;
        border-radius: 8px;
        font-size: 14px;
        cursor: pointer;
        box-shadow: 0 4px 12px rgba(34, 197, 94, 0.3);
        transition: all 0.3s ease;
        z-index: 1000;
    `;
    
    demoBtn.addEventListener('click', () => {
        emailInput.value = 'demo@example.com';
        passwordInput.value = 'password123';
        validateField('email', emailInput.value);
        validateField('password', passwordInput.value);
        showNotification('Demo credentials filled! Click Sign In to test.', 'info');
    });
    
    demoBtn.addEventListener('mouseenter', () => {
        demoBtn.style.transform = 'translateY(-2px)';
        demoBtn.style.boxShadow = '0 8px 20px rgba(34, 197, 94, 0.4)';
    });
    
    demoBtn.addEventListener('mouseleave', () => {
        demoBtn.style.transform = 'translateY(0)';
        demoBtn.style.boxShadow = '0 4px 12px rgba(34, 197, 94, 0.3)';
    });
    
    document.body.appendChild(demoBtn);
}

// Add demo helpers on load
document.addEventListener('DOMContentLoaded', addDemoHelpers);

// Add keyboard shortcuts
document.addEventListener('keydown', (e) => {
    // Enter key to submit form
    if (e.key === 'Enter' && document.activeElement.tagName !== 'BUTTON') {
        e.preventDefault();
        loginForm.dispatchEvent(new Event('submit'));
    }
    
    // Escape key to clear form
    if (e.key === 'Escape') {
        emailInput.value = '';
        passwordInput.value = '';
        rememberCheckbox.checked = false;
        
        // Reset validation states
        document.querySelectorAll('.form-group').forEach(group => {
            group.classList.remove('error', 'success', 'focused');
        });
        document.querySelectorAll('.error-message').forEach(error => {
            error.classList.remove('show');
        });
        
        formState.isValid = false;
        updateSubmitButton();
        
        showNotification('Form cleared', 'info');
    }
});

// Add smooth animations for better UX
function addSmoothAnimations() {
    // Animate form on load
    const loginCard = document.querySelector('.login-card');
    loginCard.style.opacity = '0';
    loginCard.style.transform = 'translateY(20px)';
    
    setTimeout(() => {
        loginCard.style.transition = 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1)';
        loginCard.style.opacity = '1';
        loginCard.style.transform = 'translateY(0)';
    }, 100);
    
    // Animate form elements
    const formElements = document.querySelectorAll('.form-group, .login-btn, .divider, .social-login, .signup-link');
    formElements.forEach((element, index) => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(20px)';
        
        setTimeout(() => {
            element.style.transition = 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1)';
            element.style.opacity = '1';
            element.style.transform = 'translateY(0)';
        }, 200 + (index * 100));
    });
}

// Initialize smooth animations
document.addEventListener('DOMContentLoaded', addSmoothAnimations);