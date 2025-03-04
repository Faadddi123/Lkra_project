/**
 * Main JavaScript file
 * Enhanced with modern features, animations, and interactive elements
 */

document.addEventListener('DOMContentLoaded', function() {
    // Set smooth scroll behavior
    document.documentElement.style.scrollBehavior = 'smooth';
    
    // Get the header element
    const header = document.querySelector('header.header');
    
    // Add scroll event listener to change header background opacity
    window.addEventListener('scroll', function() {
        // Get current scroll position
        const scrollPosition = window.scrollY;
        
        // Change header background opacity after 50px scroll
        if (scrollPosition > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }

        // Show or hide scroll-to-top button
        if (scrollToTopBtn) {
            if (scrollPosition > 500) {
                scrollToTopBtn.classList.add('visible');
            } else {
                scrollToTopBtn.classList.remove('visible');
            }
        }
    });
    
    // Mobile menu toggle
    const hamburgerMenu = document.createElement('div');
    hamburgerMenu.className = 'hamburger-menu';
    hamburgerMenu.innerHTML = '<span></span><span></span><span></span>';
    
    const navMenu = document.querySelector('.nav-menu');
    const authButtons = document.querySelector('.auth-buttons');
    
    // Only proceed if these elements exist
    if (navMenu && header) {
        // Insert hamburger menu
        header.querySelector('.container').appendChild(hamburgerMenu);
        
        // Create mobile auth buttons if original auth buttons exist
        if (authButtons) {
            const mobileAuthButtons = document.createElement('div');
            mobileAuthButtons.className = 'mobile-auth-buttons';
            mobileAuthButtons.innerHTML = authButtons.innerHTML;
            navMenu.appendChild(mobileAuthButtons);
        }
        
        // Toggle mobile menu
        hamburgerMenu.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            hamburgerMenu.classList.toggle('active');
            
            // Prevent body scrolling when menu is open
            document.body.classList.toggle('menu-open');
        });
        
        // Close menu when clicking outside
        document.addEventListener('click', function(event) {
            if (navMenu.classList.contains('active') && 
                !navMenu.contains(event.target) && 
                !hamburgerMenu.contains(event.target)) {
                navMenu.classList.remove('active');
                hamburgerMenu.classList.remove('active');
                document.body.classList.remove('menu-open');
            }
        });
        
        // Close menu when clicking on a menu item
        const menuLinks = navMenu.querySelectorAll('a');
        menuLinks.forEach(link => {
            link.addEventListener('click', function() {
                navMenu.classList.remove('active');
                hamburgerMenu.classList.remove('active');
                document.body.classList.remove('menu-open');
            });
        });
    }
    
    // Hero animations
    const heroContent = document.querySelector('.hero-content');
    const heroImage = document.querySelector('.hero-image');
    
    // Trigger animations after a small delay for better effect
    setTimeout(function() {
        if (heroContent) heroContent.classList.add('animated');
        if (heroImage) heroImage.classList.add('animated');
    }, 300);
    
    // Scroll animations
    // Select all elements with the 'scroll-reveal' class
    const scrollRevealElements = document.querySelectorAll('.scroll-reveal');
    
    // Create an Intersection Observer
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            // When element is visible
            if (entry.isIntersecting) {
                // Add the animation class
                entry.target.classList.add('revealed');
                // Stop observing after animation is triggered
                observer.unobserve(entry.target);
            }
        });
    }, {
        // Options for the observer
        threshold: 0.1, // Trigger when at least 10% of the element is visible
        rootMargin: '0px 0px -50px 0px' // Adjust the trigger point
    });
    
    // Start observing each element
    scrollRevealElements.forEach(element => {
        observer.observe(element);
    });
    
    // Create and append scroll-to-top button
    const scrollToTopBtn = document.createElement('button');
    scrollToTopBtn.className = 'scroll-to-top';
    scrollToTopBtn.innerHTML = '<i class="fas fa-arrow-up"></i>';
    document.body.appendChild(scrollToTopBtn);
    
    // Add click event to scroll to top
    scrollToTopBtn.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
    
    // Testimonial slider functionality
    initTestimonialSlider();
    
    // Category slider/tabs functionality
    initCategorySlider();
    
    // Show more button for recent items
    initShowMoreButton();
    
    // Search functionality
    initSearchFunctionality();
    
    // Location dropdown
    initLocationDropdown();
    
    // Login modal
    initLoginModal();
    
    // Feature cards hover effect
    initFeatureCardsInteraction();
});

/**
 * Initialize testimonial slider with auto-rotation
 */
function initTestimonialSlider() {
    const testimonialCards = document.querySelectorAll('.testimonial-card');
    const dots = document.querySelectorAll('.testimonial-dots .dot');
    
    if (testimonialCards.length === 0 || dots.length === 0) return;
    
    let currentSlide = 0;
    let slideInterval;
    
    // Function to show a specific slide
    function showSlide(index) {
        // Reduce opacity and change background of all slides
        testimonialCards.forEach(card => {
            card.style.opacity = '0.4';
            card.style.transform = 'translateX(50px)';
            card.style.background = '#f5f5f5';
            card.style.pointerEvents = 'none';
            card.style.transition = 'opacity 0.5s ease, transform 0.5s ease, background-color 0.5s ease';
        });
        
        // Deactivate all dots
        dots.forEach(dot => {
            dot.classList.remove('active');
        });
        
        // Show the current slide with full opacity and original background
        testimonialCards[index].style.opacity = '1';
        testimonialCards[index].style.transform = 'translateX(0)';
        testimonialCards[index].style.background = '#FFE6C7';
        testimonialCards[index].style.pointerEvents = 'auto';
        
        // Activate the current dot
        dots[index].classList.add('active');
        
        // Update current slide index
        currentSlide = index;
    }
    
    // Function to show the next slide
    function nextSlide() {
        let nextIndex = currentSlide + 1;
        if (nextIndex >= testimonialCards.length) {
            nextIndex = 0;
        }
        showSlide(nextIndex);
    }
    
    // Add click event to dots
    dots.forEach((dot, index) => {
        dot.addEventListener('click', function() {
            // Clear the auto-rotation interval
            clearInterval(slideInterval);
            
            // Show the clicked slide
            showSlide(index);
            
            // Restart the auto-rotation
            slideInterval = setInterval(nextSlide, 5000);
        });
    });
    
    // Start with the first slide
    showSlide(0);
    
    // Auto-rotate slides every 5 seconds
    slideInterval = setInterval(nextSlide, 5000);
}

/**
 * Initialize category slider/tabs with pagination
 */
function initCategorySlider() {
    const categoryGrid = document.querySelector('.category-grid');
    const categoryItems = document.querySelectorAll('.category-item');
    
    if (!categoryGrid || categoryItems.length === 0) return;
    
    // Add click event to category items
    categoryItems.forEach(item => {
        item.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Remove active class from all items
            categoryItems.forEach(i => i.classList.remove('active'));
            
            // Add active class to clicked item
            this.classList.add('active');
            
            // Get category ID
            const categoryId = this.dataset.categoryId;
            
            // Filter items by category (implemented in dynamic-content.js)
            if (typeof filterItemsByCategory === 'function') {
                filterItemsByCategory(categoryId);
            }
        });
    });
}

/**
 * Initialize "Show more" button for recent items
 */
function initShowMoreButton() {
    const showMoreBtn = document.querySelector('.btn-show-more');
    const itemsGrid = document.querySelector('.items-grid');
    
    if (!showMoreBtn || !itemsGrid) return;
    
    let isExpanded = false;
    
    showMoreBtn.addEventListener('click', function() {
        if (!isExpanded) {
            // Clone existing items for demonstration
            const existingItems = itemsGrid.querySelectorAll('.item-card');
            
            // Only proceed if there are items to clone
            if (existingItems.length > 0) {
                // Get data from SMART_RENTAL_DATA if available
                let additionalItems = [];
                
                if (window.SMART_RENTAL_DATA && window.SMART_RENTAL_DATA.items) {
                    // Use items from data that aren't already displayed
                    const displayedCount = existingItems.length;
                    additionalItems = window.SMART_RENTAL_DATA.items.slice(displayedCount, displayedCount + 4);
                }
                
                if (additionalItems.length > 0) {
                    // Add new items from data
                    if (typeof populateRentalItems === 'function') {
                        // Get all current items
                        const allItems = window.SMART_RENTAL_DATA.items.slice(0, existingItems.length + additionalItems.length);
                        populateRentalItems(allItems);
                    }
                } else {
                    // Clone existing items as fallback
                    existingItems.forEach(item => {
                        const clone = item.cloneNode(true);
                        
                        // Add animation classes
                        clone.classList.add('scroll-reveal', 'from-bottom');
                        itemsGrid.appendChild(clone);
                        
                        // Trigger animation after a small delay
                        setTimeout(() => {
                            clone.classList.add('revealed');
                        }, 100);
                    });
                }
            }
            
            // Change button text
            showMoreBtn.textContent = 'Show less';
            isExpanded = true;
        } else {
            // Remove added items
            const allItems = itemsGrid.querySelectorAll('.item-card');
            const originalCount = allItems.length / 2;
            
            // Remove items beyond the original count
            for (let i = allItems.length - 1; i >= originalCount; i--) {
                allItems[i].remove();
            }
            
            // Change button text back
            showMoreBtn.textContent = 'Show more';
            isExpanded = false;
        }
    });
}

/**
 * Initialize search functionality
 */
function initSearchFunctionality() {
    const searchInput = document.querySelector('.search-input');
    const searchIcon = document.querySelector('.search-icon');
    
    if (!searchInput) return;
    
    // Add focus and blur events for placeholder animation
    searchInput.addEventListener('focus', function() {
        this.parentElement.classList.add('focused');
    });
    
    searchInput.addEventListener('blur', function() {
        if (this.value.trim() === '') {
            this.parentElement.classList.remove('focused');
        }
    });
    
    // Add input event for search filtering
    searchInput.addEventListener('input', function() {
        const searchTerm = this.value.trim().toLowerCase();
        
        // Call search function from dynamic-content.js
        if (typeof searchItems === 'function') {
            searchItems(searchTerm);
        }
    });
    
    // Add click event to search icon
    if (searchIcon) {
        searchIcon.addEventListener('click', function() {
            // Focus the search input
            searchInput.focus();
        });
    }
}

/**
 * Initialize location dropdown
 */
function initLocationDropdown() {
    const locationSelector = document.querySelector('.location-selector');
    
    if (!locationSelector) return;
    
    // Create dropdown element
    const dropdown = document.createElement('div');
    dropdown.className = 'location-selector-dropdown';
    dropdown.innerHTML = `
        <ul>
            <li data-value="casablanca">Casablanca</li>
            <li data-value="rabat">Rabat</li>
            <li data-value="marrakech">Marrakech</li>
            <li data-value="tangier">Tangier</li>
            <li data-value="agadir">Agadir</li>
        </ul>
    `;
    
    // Append dropdown to location selector
    locationSelector.appendChild(dropdown);
    
    // Toggle dropdown on click
    locationSelector.addEventListener('click', function(e) {
        // Prevent clicks on dropdown from closing it
        if (e.target.closest('.location-selector-dropdown')) return;
        
        // Toggle active class
        this.classList.toggle('active');
    });
    
    // Close dropdown when clicking outside
    document.addEventListener('click', function(e) {
        if (!e.target.closest('.location-selector')) {
            locationSelector.classList.remove('active');
        }
    });
    
    // Select location on click
    const locationItems = dropdown.querySelectorAll('li');
    locationItems.forEach(item => {
        item.addEventListener('click', function() {
            const value = this.dataset.value;
            const text = this.textContent;
            
            // Update location text
            const locationText = locationSelector.querySelector('.location-text');
            if (locationText) {
                locationText.textContent = text;
            }
            
            // Close dropdown
            locationSelector.classList.remove('active');
        });
    });
}

/**
 * Initialize login modal
 */
function initLoginModal() {
    const loginBtn = document.querySelector('.btn-login');
    const signupBtn = document.querySelector('.btn-signup');
    
    if (!loginBtn && !signupBtn) return;
    
    // Create modal element
    const modal = document.createElement('div');
    modal.className = 'auth-modal';
    modal.innerHTML = `
        <div class="modal-content">
            <div class="modal-header">
                <h2>Log in to your account</h2>
                <button class="close-modal">&times;</button>
            </div>
            <div class="modal-body">
                <form id="login-form">
                    <div class="form-group">
                        <label for="email">Email</label>
                        <input type="email" id="email" name="email" required>
                        <span class="error-message"></span>
                    </div>
                    <div class="form-group">
                        <label for="password">Password</label>
                        <input type="password" id="password" name="password" required>
                        <span class="error-message"></span>
                    </div>
                    <div class="form-group remember-me">
                        <input type="checkbox" id="remember" name="remember">
                        <label for="remember">Remember me</label>
                    </div>
                    <button type="submit" class="btn btn-primary">Log in</button>
                </form>
                <div class="auth-links">
                    <a href="#forgot-password">Forgot password?</a>
                    <a href="#signup" class="switch-to-signup">Don't have an account? Sign up</a>
                </div>
            </div>
        </div>
    `;
    
    // Append modal to body
    document.body.appendChild(modal);
    
    // Function to open modal
    function openModal(type = 'login') {
        // Show modal
        modal.classList.add('active');
        document.body.classList.add('modal-open');
        
        // Update modal content based on type
        const modalHeader = modal.querySelector('.modal-header h2');
        const authLinks = modal.querySelector('.auth-links');
        const form = modal.querySelector('form');
        
        if (type === 'login') {
            modalHeader.textContent = 'Log in to your account';
            form.id = 'login-form';
            authLinks.innerHTML = `
                <a href="#forgot-password">Forgot password?</a>
                <a href="#signup" class="switch-to-signup">Don't have an account? Sign up</a>
            `;
        } else {
            modalHeader.textContent = 'Create an account';
            form.id = 'signup-form';
            
            // Add name field for signup
            const emailField = form.querySelector('.form-group:first-child');
            if (!form.querySelector('#name')) {
                const nameField = document.createElement('div');
                nameField.className = 'form-group';
                nameField.innerHTML = `
                    <label for="name">Full Name</label>
                    <input type="text" id="name" name="name" required>
                    <span class="error-message"></span>
                `;
                form.insertBefore(nameField, emailField);
            }
            
            // Update button text
            form.querySelector('button[type="submit"]').textContent = 'Sign up';
            
            // Update auth links
            authLinks.innerHTML = `
                <a href="#login" class="switch-to-login">Already have an account? Log in</a>
            `;
        }
        
        // Add event listeners to switch between login and signup
        const switchToSignup = modal.querySelector('.switch-to-signup');
        const switchToLogin = modal.querySelector('.switch-to-login');
        
        if (switchToSignup) {
            switchToSignup.addEventListener('click', function(e) {
                e.preventDefault();
                openModal('signup');
            });
        }
        
        if (switchToLogin) {
            switchToLogin.addEventListener('click', function(e) {
                e.preventDefault();
                openModal('login');
            });
        }
    }
    
    // Function to close modal
    function closeModal() {
        modal.classList.remove('active');
        document.body.classList.remove('modal-open');
    }
    
    // Open modal on login button click
    if (loginBtn) {
        loginBtn.addEventListener('click', function(e) {
            e.preventDefault();
            openModal('login');
        });
    }
    
    // Open modal on signup button click
    if (signupBtn) {
        signupBtn.addEventListener('click', function(e) {
            e.preventDefault();
            openModal('signup');
        });
    }
    
    // Close modal on close button click
    const closeBtn = modal.querySelector('.close-modal');
    if (closeBtn) {
        closeBtn.addEventListener('click', closeModal);
    }
    
    // Close modal on click outside
    modal.addEventListener('click', function(e) {
        if (e.target === modal) {
            closeModal();
        }
    });
    
    // Close modal on escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && modal.classList.contains('active')) {
            closeModal();
        }
    });
    
    // Form validation
    const loginForm = document.getElementById('login-form');
    if (loginForm) {
        loginForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Validate form
            let isValid = true;
            
            // Validate email
            const emailInput = this.querySelector('#email');
            const emailError = emailInput.nextElementSibling;
            
            if (!emailInput.value.trim()) {
                emailError.textContent = 'Email is required';
                isValid = false;
            } else if (!/\S+@\S+\.\S+/.test(emailInput.value)) {
                emailError.textContent = 'Please enter a valid email';
                isValid = false;
            } else {
                emailError.textContent = '';
            }
            
            // Validate password
            const passwordInput = this.querySelector('#password');
            const passwordError = passwordInput.nextElementSibling;
            
            if (!passwordInput.value.trim()) {
                passwordError.textContent = 'Password is required';
                isValid = false;
            } else if (passwordInput.value.length < 6) {
                passwordError.textContent = 'Password must be at least 6 characters';
                isValid = false;
            } else {
                passwordError.textContent = '';
            }
            
            // If form is valid, submit it
            if (isValid) {
                // Simulate successful login
                alert('Login successful!');
                closeModal();
            }
        });
    }
}

/**
 * Initialize feature cards interaction
 */
function initFeatureCardsInteraction() {
    const featureCards = document.querySelectorAll('.feature-card');
    
    featureCards.forEach(card => {
        // Add hover effect
        card.addEventListener('mouseenter', function() {
            this.classList.add('hovered');
        });
        
        card.addEventListener('mouseleave', function() {
            this.classList.remove('hovered');
        });
        
        // Add click effect
        card.addEventListener('click', function() {
            // Add active class
            this.classList.add('active');
            
            // Remove active class after animation
            setTimeout(() => {
                this.classList.remove('active');
            }, 300);
        });
    });
}