/**
 * Dynamic Content Loader and Renderer
 * Handles populating the website with data from placeholders.js
 */

document.addEventListener('DOMContentLoaded', function() {
    // Wait for the SMART_RENTAL_DATA to be available
    if (!window.SMART_RENTAL_DATA) {
        console.error('Rental data not found');
        return;
    }
    
    const data = window.SMART_RENTAL_DATA;
    
    // Populate rental items
    populateRentalItems(data.items);
    
    // Populate categories
    populateCategories(data.categories);
    
    // Populate testimonials
    populateTestimonials(data.testimonials);
    
    // Add search filtering
    initializeSearch();
    
    // Add category filtering
    initializeCategoryFiltering();
    
    // Initialize item details modal
    initializeItemDetailsModal();
});

/**
 * Populates the rental items grid with dynamic data
 */
function populateRentalItems(items) {
    const itemsGrid = document.querySelector('.items-grid');
    if (!itemsGrid) return;
    
    // Clear existing content
    itemsGrid.innerHTML = '';
    
    // Add each item to the grid
    items.forEach(item => {
        const itemCard = document.createElement('div');
        itemCard.className = 'item-card';
        itemCard.dataset.itemId = item.id;
        
        itemCard.innerHTML = `
            <div class="item-image" style="background-image: url('${item.image}'); background-size: cover; background-position: center;"></div>
            <div class="item-content">
                <h3 class="item-title">${item.title}</h3>
                <p class="item-description">${item.description}</p>
                <div class="item-price">${item.price} ${item.priceUnit}</div>
                <div class="item-seller">${item.seller}</div>
                <button class="btn-view-details">View Details</button>
            </div>
        `;
        
        itemsGrid.appendChild(itemCard);
        
        // Add animation classes
        setTimeout(() => {
            itemCard.classList.add('scroll-reveal', 'from-bottom');
            setTimeout(() => {
                itemCard.classList.add('revealed');
            }, 100);
        }, 100);
    });
    
    // Add click event listeners to the "View Details" buttons
    const detailButtons = document.querySelectorAll('.btn-view-details');
    detailButtons.forEach(button => {
        button.addEventListener('click', function(event) {
            event.preventDefault();
            const itemCard = this.closest('.item-card');
            const itemId = parseInt(itemCard.dataset.itemId);
            showItemDetails(itemId);
        });
    });
    
    // Add click event to the entire card
    const itemCards = document.querySelectorAll('.item-card');
    itemCards.forEach(card => {
        card.addEventListener('click', function(event) {
            // Only trigger if the click is not on the button
            if (!event.target.closest('.btn-view-details')) {
                const itemId = parseInt(this.dataset.itemId);
                showItemDetails(itemId);
            }
        });
    });
    
    // Update search results message
    updateSearchResultsMessage(items.length);
}

/**
 * Populates the categories grid with dynamic data
 */
function populateCategories(categories) {
    const categoryGrid = document.querySelector('.category-grid');
    if (!categoryGrid) return;
    
    // Clear existing content
    categoryGrid.innerHTML = '';
    
    // Add each category to the grid
    categories.forEach(category => {
        const categoryItem = document.createElement('a');
        categoryItem.href = '#';
        categoryItem.className = 'category-item';
        categoryItem.dataset.categoryId = category.id;
        if (category.active) categoryItem.classList.add('active');
        
        categoryItem.innerHTML = `
            <i class="${category.icon}"></i>
            <span>${category.name}</span>
        `;
        
        categoryGrid.appendChild(categoryItem);
    });
    
    // Create category dots for pagination
    const categoryDots = document.querySelector('.category-dots');
    if (categoryDots) {
        categoryDots.innerHTML = '';
        const pages = Math.ceil(categories.length / 6); // 6 items per page
        
        for (let i = 0; i < pages; i++) {
            const dot = document.createElement('span');
            dot.className = 'dot';
            if (i === 0) dot.classList.add('active');
            categoryDots.appendChild(dot);
        }
    }
}

/**
 * Populates the testimonials with dynamic data
 */
function populateTestimonials(testimonials) {
    const testimonialsGrid = document.querySelector('.testimonials-grid');
    if (!testimonialsGrid) return;
    
    // Clear existing content
    testimonialsGrid.innerHTML = '';
    
    // Add each testimonial to the grid
    testimonials.forEach((testimonial, index) => {
        const card = document.createElement('div');
        card.className = 'testimonial-card scroll-reveal from-bottom';
        if (index === 0) card.classList.add('active');
        
        // Create stars based on rating
        let starsHTML = '';
        const fullStars = Math.floor(testimonial.rating);
        const hasHalfStar = testimonial.rating % 1 >= 0.5;
        
        for (let i = 0; i < 5; i++) {
            if (i < fullStars) {
                starsHTML += '<i class="fas fa-star"></i>';
            } else if (i === fullStars && hasHalfStar) {
                starsHTML += '<i class="fas fa-star-half-alt"></i>';
            } else {
                starsHTML += '<i class="far fa-star"></i>';
            }
        }
        
        card.innerHTML = `
            <div class="quote-icon">
                <svg width="96" height="96" viewBox="0 0 96 96" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <g clip-path="url(#clip0_17_396)">
                        <path d="M74.6854 52.5256L77.3783 52.463C106.875 51.962 97.0429 8.62484 65.4794 20.0854C42.1826 28.5399 46.5038 67.4306 71.4289 73.8185C82.4511 76.6366 94.7257 74.6326 85.5824 71.5013C77.7541 68.871 71.4289 61.2933 71.8673 55.0933C71.9925 53.7155 73.1824 52.5256 74.6854 52.5256Z" fill="#FFA559"/>
                        <path d="M17.133 18.5198C-11.2366 29.4167 0.286603 77.0125 31.7875 79.0792C39.9915 79.6428 42.1207 77.7014 35.9208 75.3842C29.9087 73.1297 22.3309 62.4833 21.5168 55.2813C21.3289 53.8409 22.4562 52.651 23.8966 52.651C32.1632 52.651 35.6076 52.651 40.4298 46.0126C52.2662 29.6046 36.547 11.0674 17.133 18.5198Z" fill="#FFA559"/>
                    </g>
                    <defs>
                        <clipPath id="clip0_17_396">
                            <rect width="96" height="96" fill="white"/>
                        </clipPath>
                    </defs>
                </svg>
            </div>
            <div class="user-profile">
                <div class="profile-pic" style="background-color: #FFA559; display: flex; align-items: center; justify-content: center; color: white; font-weight: bold;">
                    ${testimonial.name.substring(0, 2)}
                </div>
            </div>
            <div class="rating">
                ${starsHTML}
            </div>
            <p class="testimonial-text">${testimonial.text}</p>
            <div class="user-info">
                <span class="user-name">${testimonial.name}</span>
            </div>
        `;
        
        testimonialsGrid.appendChild(card);
    });
    
    // Create testimonial navigation dots
    const testimonialDots = document.querySelector('.testimonial-dots');
    if (testimonialDots) {
        testimonialDots.innerHTML = '';
        
        testimonials.forEach((_, index) => {
            const dot = document.createElement('span');
            dot.className = 'dot';
            if (index === 0) dot.classList.add('active');
            testimonialDots.appendChild(dot);
        });
    }
}

/**
 * Initialize search functionality
 */
function initializeSearch() {
    const searchInput = document.querySelector('.search-input');
    if (!searchInput) return;
    
    // Add input event for search filtering
    searchInput.addEventListener('input', function() {
        searchItems(this.value.trim());
    });
    
    // Add submit event to prevent form submission
    const searchForm = searchInput.closest('form');
    if (searchForm) {
        searchForm.addEventListener('submit', function(e) {
            e.preventDefault();
            searchItems(searchInput.value.trim());
        });
    }
}

/**
 * Search items based on search term
 */
function searchItems(searchTerm) {
    if (!window.SMART_RENTAL_DATA) return;
    
    const items = window.SMART_RENTAL_DATA.items;
    
    if (!searchTerm) {
        // If search term is empty, show all items
        populateRentalItems(items);
        return;
    }
    
    // Convert search term to lowercase for case-insensitive search
    searchTerm = searchTerm.toLowerCase();
    
    // Filter items based on search term
    const filteredItems = items.filter(item => {
        return (
            item.title.toLowerCase().includes(searchTerm) ||
            item.description.toLowerCase().includes(searchTerm) ||
            item.seller.toLowerCase().includes(searchTerm)
        );
    });
    
    // Update the items grid with filtered items
    populateRentalItems(filteredItems);
    
    // Update search results message
    updateSearchResultsMessage(filteredItems.length, searchTerm);
}

/**
 * Update search results message
 */
function updateSearchResultsMessage(count, searchTerm = '') {
    const recentItemsSection = document.querySelector('#recent-items');
    if (!recentItemsSection) return;
    
    // Check if message element exists, create if not
    let messageElement = recentItemsSection.querySelector('.search-results-message');
    if (!messageElement) {
        messageElement = document.createElement('div');
        messageElement.className = 'search-results-message';
        
        // Insert after the heading
        const heading = recentItemsSection.querySelector('h2');
        if (heading) {
            heading.parentNode.insertBefore(messageElement, heading.nextSibling);
        } else {
            recentItemsSection.querySelector('.container').appendChild(messageElement);
        }
    }
    
    // Update message text
    if (searchTerm) {
        messageElement.textContent = `${count} ${count === 1 ? 'result' : 'results'} found for "${searchTerm}"`;
        messageElement.style.display = 'block';
    } else {
        messageElement.style.display = 'none';
    }
    
    // Show "no results" message if needed
    let noResultsElement = recentItemsSection.querySelector('.no-results');
    
    if (count === 0) {
        if (!noResultsElement) {
            noResultsElement = document.createElement('div');
            noResultsElement.className = 'no-results';
            noResultsElement.innerHTML = `
                <h3>No items found</h3>
                <p>Try adjusting your search criteria or browse our categories for more options.</p>
            `;
            
            // Get the items grid
            const itemsGrid = recentItemsSection.querySelector('.items-grid');
            if (itemsGrid) {
                itemsGrid.parentNode.insertBefore(noResultsElement, itemsGrid.nextSibling);
            }
        } else {
            noResultsElement.style.display = 'block';
        }
    } else if (noResultsElement) {
        noResultsElement.style.display = 'none';
    }
    
    // Update "Show more" button visibility
    const showMoreButton = recentItemsSection.querySelector('.btn-show-more');
    if (showMoreButton) {
        showMoreButton.style.display = count > 0 ? 'block' : 'none';
    }
}

/**
 * Initialize category filtering
 */
function initializeCategoryFiltering() {
    const categoryItems = document.querySelectorAll('.category-item');
    if (categoryItems.length === 0) return;
    
    // Add click event to category items
    categoryItems.forEach(item => {
        item.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Get category ID
            const categoryId = parseInt(this.dataset.categoryId);
            
            // Filter items by category
            filterItemsByCategory(categoryId);
            
            // Update active state
            categoryItems.forEach(i => i.classList.remove('active'));
            this.classList.add('active');
        });
    });
}

/**
 * Filter items by category
 */
function filterItemsByCategory(categoryId) {
    if (!window.SMART_RENTAL_DATA) return;
    
    const items = window.SMART_RENTAL_DATA.items;
    
    // If category ID is 1 (All), show all items
    if (categoryId === 1) {
        populateRentalItems(items);
        return;
    }
    
    // Filter items by category (for demo purposes, we'll use a simple filter)
    // In a real application, items would have a category property
    const filteredItems = items.filter((item, index) => {
        // For demo, we'll use the item ID modulo the number of categories
        // This is just to simulate category filtering
        return index % 3 === (categoryId % 3);
    });
    
    // Update the items grid with filtered items
    populateRentalItems(filteredItems);
    
    // Update category name in the section heading
    const categoryName = document.querySelector(`.category-item[data-category-id="${categoryId}"] .category-name`).textContent;
    const sectionHeading = document.querySelector('#recent-items h2');
    
    if (sectionHeading) {
        sectionHeading.innerHTML = `${categoryName} <span>items</span>`;
    }
}

/**
 * Initializes the item details modal functionality
 */
function initializeItemDetailsModal() {
    const modal = document.querySelector('.item-details-modal');
    if (!modal) return;
    
    // Get close button
    const closeButton = modal.querySelector('.close-modal');
    if (closeButton) {
        closeButton.addEventListener('click', closeItemDetailsModal);
    }
    
    // Close modal when clicking outside content
    modal.addEventListener('click', function(e) {
        if (e.target === modal) {
            closeItemDetailsModal();
        }
    });
    
    // Close modal on escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && modal.classList.contains('active')) {
            closeItemDetailsModal();
        }
    });
    
    // Add event listener to rental days input
    const rentalDaysInput = modal.querySelector('#rental-days');
    if (rentalDaysInput) {
        rentalDaysInput.addEventListener('input', updateTotalPrice);
    }
    
    // Add event listener to rent now button
    const rentNowButton = modal.querySelector('.btn-rent-now');
    if (rentNowButton) {
        rentNowButton.addEventListener('click', function() {
            // Simulate rental process
            this.textContent = 'Processing...';
            this.disabled = true;
            
            setTimeout(() => {
                alert('Rental request submitted successfully!');
                closeItemDetailsModal();
                
                // Reset button state
                this.textContent = 'Rent Now';
                this.disabled = false;
            }, 1500);
        });
    }
}

/**
 * Shows the item details modal with the selected item
 */
function showItemDetails(itemId) {
    if (!window.SMART_RENTAL_DATA) return;
    
    // Find item by ID
    const item = window.SMART_RENTAL_DATA.items.find(item => item.id === itemId);
    if (!item) return;
    
    // Get modal elements
    const modal = document.querySelector('.item-details-modal');
    if (!modal) return;
    
    const titleElement = modal.querySelector('.item-details-header h2');
    const imageElement = modal.querySelector('.item-details-image');
    const priceElement = modal.querySelector('.item-details-price');
    const descriptionElement = modal.querySelector('.item-details-description');
    const sellerNameElement = modal.querySelector('.seller-name');
    const rentalDaysInput = modal.querySelector('#rental-days');
    const totalPriceElement = modal.querySelector('.total-price');
    
    // Update modal content
    if (titleElement) titleElement.textContent = item.title;
    if (imageElement) imageElement.style.backgroundImage = `url('${item.image}')`;
    if (priceElement) priceElement.textContent = `${item.price} ${item.priceUnit}`;
    if (descriptionElement) descriptionElement.textContent = item.description;
    if (sellerNameElement) sellerNameElement.textContent = item.seller;
    
    // Reset rental days to 1
    if (rentalDaysInput) {
        rentalDaysInput.value = 1;
        updateTotalPrice();
    }
    
    // Store item ID in modal
    modal.dataset.itemId = itemId;
    
    // Show modal with animation
    modal.classList.add('active');
    document.body.classList.add('modal-open');
}

/**
 * Closes the item details modal
 */
function closeItemDetailsModal() {
    const modal = document.querySelector('.item-details-modal');
    if (!modal) return;
    
    // Hide modal with animation
    modal.classList.remove('active');
    document.body.classList.remove('modal-open');
}

/**
 * Updates the total price based on rental days
 */
function updateTotalPrice() {
    const modal = document.querySelector('.item-details-modal');
    if (!modal) return;
    
    // Get current item
    const itemId = parseInt(modal.dataset.itemId);
    const item = window.SMART_RENTAL_DATA.items.find(item => item.id === itemId);
    if (!item) return;
    
    // Get rental days
    const rentalDaysInput = modal.querySelector('#rental-days');
    const totalPriceElement = modal.querySelector('.total-price');
    
    if (!rentalDaysInput || !totalPriceElement) return;
    
    // Get rental days value (minimum 1)
    const rentalDays = Math.max(1, parseInt(rentalDaysInput.value) || 1);
    
    // Calculate total price
    const totalPrice = item.price * rentalDays;
    
    // Update total price element
    totalPriceElement.textContent = `Total: ${totalPrice} DH`;
} 