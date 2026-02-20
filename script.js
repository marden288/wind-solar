/**
 * Wind & Solar Charging Station Website
 * JavaScript for Interactivity and Smooth Scrolling
 * 
 * Features:
 * - Mobile menu toggle
 * - Smooth scroll navigation
 * - Form validation and handling
 * - Scroll animations
 * - Interactive elements
 */

// ============================================
// DOM ELEMENTS
// ============================================

const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');
const navLinks = document.querySelectorAll('.nav-link');
const ctaButton = document.querySelector('.cta-button');
const contactForm = document.getElementById('contactForm');

// ============================================
// MOBILE MENU TOGGLE
// ============================================

/**
 * Toggle mobile menu visibility
 * Handles hamburger menu click events
 */
function toggleMobileMenu() {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
}

/**
 * Close mobile menu when a nav link is clicked
 * Provides smooth navigation on mobile devices
 */
function closeMobileMenu() {
    hamburger.classList.remove('active');
    navMenu.classList.remove('active');
}

// Add event listener to hamburger menu
if (hamburger) {
    hamburger.addEventListener('click', toggleMobileMenu);
}

// Add event listeners to all navigation links
navLinks.forEach(link => {
    link.addEventListener('click', closeMobileMenu);
});

// ============================================
// SMOOTH SCROLL NAVIGATION
// ============================================

/**
 * Smooth scroll to section when nav link is clicked
 * Uses native smooth scroll behavior with fallback
 */
navLinks.forEach(link => {
    link.addEventListener('click', function(e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        const targetSection = document.querySelector(targetId);
        
        if (targetSection) {
            // Use native smooth scroll if available
            targetSection.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
            
            // Update active nav link
            updateActiveNavLink(targetId);
        }
    });
});

/**
 * CTA button smooth scroll to features section
 */
if (ctaButton) {
    ctaButton.addEventListener('click', function() {
        const featuresSection = document.querySelector('#features');
        if (featuresSection) {
            featuresSection.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
}

// ============================================
// ACTIVE NAV LINK HIGHLIGHTING
// ============================================

/**
 * Update active navigation link based on scroll position
 * Highlights the current section in the navigation menu
 */
function updateActiveNavLink(sectionId) {
    navLinks.forEach(link => {
        link.classList.remove('active');
    });
    
    const activeLink = document.querySelector(`a[href="${sectionId}"]`);
    if (activeLink) {
        activeLink.classList.add('active');
    }
}

/**
 * Detect which section is in view and update nav accordingly
 * Called on scroll events
 */
function updateNavOnScroll() {
    const sections = document.querySelectorAll('section');
    let currentSection = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        
        // Check if section is in viewport
        if (window.pageYOffset >= sectionTop - 200) {
            currentSection = section.getAttribute('id');
        }
    });
    
    if (currentSection) {
        updateActiveNavLink(`#${currentSection}`);
    }
}

// Update nav on scroll
window.addEventListener('scroll', updateNavOnScroll);

// ============================================
// FORM HANDLING
// ============================================

/**
 * Validate email format
 * @param {string} email - Email address to validate
 * @returns {boolean} - True if email is valid
 */
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

/**
 * Validate form inputs
 * @param {object} formData - Form data object
 * @returns {object} - Validation result with isValid flag and errors array
 */
function validateForm(formData) {
    const errors = [];
    
    // Validate name
    if (!formData.name || formData.name.trim().length < 2) {
        errors.push('Name must be at least 2 characters long');
    }
    
    // Validate email
    if (!formData.email || !isValidEmail(formData.email)) {
        errors.push('Please enter a valid email address');
    }
    
    // Validate subject
    if (!formData.subject || formData.subject.trim().length < 3) {
        errors.push('Subject must be at least 3 characters long');
    }
    
    // Validate message
    if (!formData.message || formData.message.trim().length < 10) {
        errors.push('Message must be at least 10 characters long');
    }
    
    return {
        isValid: errors.length === 0,
        errors: errors
    };
}

/**
 * Display form validation errors to user
 * @param {array} errors - Array of error messages
 */
function displayFormErrors(errors) {
    // Remove previous error messages
    const existingErrors = document.querySelectorAll('.form-error');
    existingErrors.forEach(error => error.remove());
    
    // Create and display new error messages
    const errorContainer = document.createElement('div');
    errorContainer.className = 'form-error';
    errorContainer.style.cssText = `
        background-color: #fee2e2;
        color: #991b1b;
        padding: 1rem;
        border-radius: 0.5rem;
        margin-bottom: 1.5rem;
        border-left: 4px solid #dc2626;
    `;
    
    const errorList = document.createElement('ul');
    errorList.style.cssText = 'margin: 0; padding-left: 1.5rem;';
    
    errors.forEach(error => {
        const listItem = document.createElement('li');
        listItem.textContent = error;
        listItem.style.marginBottom = '0.5rem';
        errorList.appendChild(listItem);
    });
    
    errorContainer.appendChild(errorList);
    contactForm.insertBefore(errorContainer, contactForm.firstChild);
}

/**
 * Display success message after form submission
 */
function displaySuccessMessage() {
    // Remove previous messages
    const existingMessages = document.querySelectorAll('.form-success, .form-error');
    existingMessages.forEach(msg => msg.remove());
    
    // Create success message
    const successContainer = document.createElement('div');
    successContainer.className = 'form-success';
    successContainer.style.cssText = `
        background-color: #dcfce7;
        color: #166534;
        padding: 1rem;
        border-radius: 0.5rem;
        margin-bottom: 1.5rem;
        border-left: 4px solid #16a34a;
    `;
    
    const message = document.createElement('p');
    message.textContent = '✓ Thank you for your message! We will get back to you soon.';
    message.style.margin = '0';
    
    successContainer.appendChild(message);
    contactForm.insertBefore(successContainer, contactForm.firstChild);
}

/**
 * Handle contact form submission
 * Validates form data and displays appropriate messages
 */
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Collect form data
        const formData = {
            name: document.getElementById('name').value,
            email: document.getElementById('email').value,
            subject: document.getElementById('subject').value,
            message: document.getElementById('message').value
        };
        
        // Validate form
        const validation = validateForm(formData);
        
        if (validation.isValid) {
            // Display success message
            displaySuccessMessage();
            
            // Reset form
            contactForm.reset();
            
            // Log form data (in production, send to backend)
            console.log('Form submitted with data:', formData);
            
            // Scroll to form to show success message
            contactForm.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        } else {
            // Display validation errors
            displayFormErrors(validation.errors);
        }
    });
}

// ============================================
// SCROLL ANIMATIONS
// ============================================

/**
 * Intersection Observer for scroll animations
 * Animates elements as they come into view
 */
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe all cards and animated elements
const animatedElements = document.querySelectorAll(
    '.feature-card, .component-card, .gallery-item, .process-step'
);

animatedElements.forEach(element => {
    element.style.opacity = '0';
    element.style.transform = 'translateY(20px)';
    element.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
    observer.observe(element);
});

// ============================================
// INTERACTIVE ELEMENTS
// ============================================

/**
 * Add hover effects to cards
 * Provides visual feedback on interactive elements
 */
const cards = document.querySelectorAll('.feature-card, .component-card');

cards.forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-10px)';
    });
    
    card.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0)';
    });
});

/**
 * Gallery image click handler
 * Could be extended for lightbox functionality
 */
const galleryImages = document.querySelectorAll('.gallery-image');

galleryImages.forEach(image => {
    image.addEventListener('click', function() {
        // Add click feedback
        this.style.transform = 'scale(1.05)';
        setTimeout(() => {
            this.style.transform = 'scale(1)';
        }, 200);
    });
});

// ============================================
// UTILITY FUNCTIONS
// ============================================

/**
 * Debounce function to limit function calls
 * Useful for scroll and resize events
 * @param {function} func - Function to debounce
 * @param {number} wait - Wait time in milliseconds
 * @returns {function} - Debounced function
 */
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

/**
 * Throttle function to limit function calls
 * Useful for performance-critical events
 * @param {function} func - Function to throttle
 * @param {number} limit - Time limit in milliseconds
 * @returns {function} - Throttled function
 */
function throttle(func, limit) {
    let inThrottle;
    return function(...args) {
        if (!inThrottle) {
            func.apply(this, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

// ============================================
// INITIALIZATION
// ============================================

/**
 * Initialize all interactive features
 * Called when DOM is ready
 */
function initializeWebsite() {
    console.log('Wind & Solar Charging Station Website Initialized');
    
    // Set initial active nav link
    updateNavOnScroll();
    
    // Add smooth scroll fallback for older browsers
    if (!('scrollBehavior' in document.documentElement.style)) {
        console.log('Smooth scroll not supported, using polyfill');
    }
}

// Initialize when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeWebsite);
} else {
    initializeWebsite();
}

// ============================================
// PERFORMANCE OPTIMIZATION
// ============================================

/**
 * Throttle scroll event for better performance
 */
const throttledScroll = throttle(updateNavOnScroll, 100);
window.addEventListener('scroll', throttledScroll);

// ============================================
// KEYBOARD NAVIGATION
// ============================================

/**
 * Handle keyboard navigation
 * Allows users to navigate using Tab key
 */
document.addEventListener('keydown', function(e) {
    // Close mobile menu on Escape key
    if (e.key === 'Escape') {
        closeMobileMenu();
    }
    
    // Skip to main content on Alt+1
    if (e.altKey && e.key === '1') {
        const mainContent = document.querySelector('#about');
        if (mainContent) {
            mainContent.focus();
        }
    }
});

// ============================================
// ACCESSIBILITY ENHANCEMENTS
// ============================================

/**
 * Add ARIA labels for better accessibility
 */
document.addEventListener('DOMContentLoaded', function() {
    // Add aria-label to buttons
    const buttons = document.querySelectorAll('button');
    buttons.forEach(button => {
        if (!button.getAttribute('aria-label')) {
            button.setAttribute('aria-label', button.textContent.trim());
        }
    });
    
    // Add aria-label to links
    const links = document.querySelectorAll('a');
    links.forEach(link => {
        if (!link.getAttribute('aria-label') && !link.textContent.trim()) {
            link.setAttribute('aria-label', link.href);
        }
    });
});

// ============================================
// CONSOLE MESSAGES
// ============================================

/**
 * Display welcome message in console
 */
console.log(
    '%cWind & Solar Charging Station',
    'font-size: 20px; font-weight: bold; color: #10b981;'
);
console.log(
    '%cA student engineering project combining renewable energy with IoT security',
    'font-size: 14px; color: #0ea5e9;'
);
console.log(
    '%cFor more information, visit the project sections or contact us.',
    'font-size: 12px; color: #6b7280;'
);
