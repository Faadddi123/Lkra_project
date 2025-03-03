/**
 * Main JavaScript file
 * Simple smooth scrolling, header background opacity,
 * hero section animations, and scroll reveal animations
 */

// Apply smooth scrolling behavior
document.addEventListener('DOMContentLoaded', function() {
    // Set smooth scroll behavior
    document.documentElement.style.scrollBehavior = 'smooth';
    
    // Get the header element
    const header = document.querySelector('header.header');
    
    // Add scroll event listener to change header background opacity
    window.addEventListener('scroll', function() {
        // Get current scroll position
        const scrollPosition = window.scrollY;
        
        // Change header background opacity after 1000px scroll
        if (scrollPosition > 1000) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });
    
    // Hero animations
    const heroContent = document.querySelector('.hero-content');
    const heroImage = document.querySelector('.hero-image');
    
    // Trigger animations after a small delay for better effect
    setTimeout(function() {
        if (heroContent) heroContent.classList.add('animated');
        if (heroImage) heroImage.classList.add('animated');
    }, 300); // Small delay for better visual effect
    
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
        // Options
        threshold: 0.15, // Trigger when 15% of the element is visible
        rootMargin: '0px 0px -50px 0px' // Adjust trigger point (50px before element is fully in view)
    });
    
    // Start observing each element
    scrollRevealElements.forEach(element => {
        // Add the initial hidden class
        element.classList.add('hidden');
        // Start observing
        observer.observe(element);
    });
}); 