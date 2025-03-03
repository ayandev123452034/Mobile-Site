// Gallery Functionality
const galleryImages = document.querySelectorAll('.gallery-container img');
const prevBtn = document.querySelector('.prev-btn');
const nextBtn = document.querySelector('.next-btn');
let currentImageIndex = 0;

function showImage(index) {
    galleryImages.forEach(img => img.classList.remove('active'));
    galleryImages[index].classList.add('active');
}

nextBtn.addEventListener('click', () => {
    currentImageIndex = (currentImageIndex + 1) % galleryImages.length;
    showImage(currentImageIndex);
});

prevBtn.addEventListener('click', () => {
    currentImageIndex = (currentImageIndex - 1 + galleryImages.length) % galleryImages.length;
    showImage(currentImageIndex);
});

// Auto-rotate gallery
setInterval(() => {
    currentImageIndex = (currentImageIndex + 1) % galleryImages.length;
    showImage(currentImageIndex);
}, 5000);

// Modal Handling
let cartCount = 0;
const cartCountElement = document.querySelector('.cart-count');

function updateCart(count) {
    cartCount += count;
    cartCountElement.textContent = cartCount;
    cartCountElement.classList.add('bump');
    setTimeout(() => cartCountElement.classList.remove('bump'), 300);
}

// Add after cart count initialization
let cartItems = [];
const cartModal = document.getElementById('cartModal');
const cartClose = document.querySelector('.cart-close');
const cartItemsContainer = document.getElementById('cartItems');
const cartTotal = document.getElementById('cartTotal');
const checkoutBtn = document.getElementById('checkoutBtn');

// Update cart icon click handler
document.querySelector('.cart-icon').addEventListener('click', (e) => {
    e.preventDefault();
    showCartModal();
});

cartClose.onclick = () => cartModal.style.display = 'none';

function addToCart(product) {
    cartItems.push(product);
    updateCartUI();
    updateCart(1);
}

function removeFromCart(index) {
    const item = cartItemsContainer.children[index];
    item.classList.add('removing');
    
    setTimeout(() => {
        cartItems.splice(index, 1);
        updateCartUI();
        updateCart(-1);
    }, 300);
}

function updateCartUI() {
    cartItemsContainer.innerHTML = '';
    let total = 0;
    
    cartItems.forEach((item, index) => {
        total += item.price;
        const cartItem = document.createElement('div');
        cartItem.className = 'cart-item';
        cartItem.innerHTML = `
            <img src="${item.image}" alt="${item.name}">
            <div class="cart-item-info">
                <h4>${item.name}</h4>
            </div>
            <span class="cart-item-price">$${item.price}</span>
            <button class="remove-item" onclick="removeFromCart(${index})">
                <i class="fas fa-times"></i>
            </button>
        `;
        cartItemsContainer.appendChild(cartItem);
    });
    
    cartTotal.textContent = `$${total}`;
    checkoutBtn.disabled = cartItems.length === 0;
}

function showCartModal() {
    cartModal.style.display = 'block';
    updateCartUI();
}

const loginBtn = document.getElementById('loginBtn');
const loginModal = document.getElementById('loginModal');
const closeBtn = document.querySelector('.close');
const signupLink = document.getElementById('signupLink');

// Show Modal
loginBtn.onclick = () => {
    loginModal.style.display = 'block';
}

// Close Modal
closeBtn.onclick = () => {
    loginModal.style.display = 'none';
}

// Close on outside click
window.onclick = (e) => {
    if (e.target == loginModal) {
        loginModal.style.display = 'none';
    }
}

// Form Handling
const loginForm = document.getElementById('loginForm');
const contactForm = document.getElementById('contactForm');

loginForm.onsubmit = (e) => {
    e.preventDefault();
    // Add login logic here
    console.log('Login submitted');
}

contactForm.onsubmit = (e) => {
    e.preventDefault();
    // Add contact form logic here
    console.log('Contact form submitted');
}

// Smooth Scrolling
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Mobile Navigation
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');
let isNavOpen = false;

function toggleNavigation() {
    isNavOpen = !isNavOpen;
    hamburger.classList.toggle('active');
    navLinks.classList.toggle('active');
    document.body.style.overflow = isNavOpen ? 'hidden' : '';
}

// Single event listener for hamburger
hamburger.addEventListener('click', toggleNavigation);

// Close nav when clicking links
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        if (isNavOpen) {
            toggleNavigation();
        }
    });
});

// Close nav on escape key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && isNavOpen) {
        toggleNavigation();
    }
});

// Close nav on resize if mobile menu is open
window.addEventListener('resize', () => {
    if (window.innerWidth > 768 && isNavOpen) {
        toggleNavigation();
    }
});

// Remove any duplicate event listeners
document.removeEventListener('DOMContentLoaded', toggleNavigation);

// Enhanced Mobile Navigation
function toggleNavigation() {
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    const body = document.body;

    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navLinks.classList.toggle('active');
        body.classList.toggle('nav-open');
    });

    // Close nav when clicking links
    const navItems = document.querySelectorAll('.nav-links a');
    navItems.forEach(item => {
        item.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navLinks.classList.remove('active');
            body.classList.remove('nav-open');

            // Smooth scroll to section
            const target = document.querySelector(item.getAttribute('href'));
            if (target) {
                setTimeout(() => {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }, 300);
            }
        });
    });

    // Close nav on escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && navLinks.classList.contains('active')) {
            hamburger.classList.remove('active');
            navLinks.classList.remove('active');
            body.classList.remove('nav-open');
        }
    });
}

// Initialize navigation
document.addEventListener('DOMContentLoaded', () => {
    toggleNavigation();
    // ...rest of existing initialization code...
});

// Close navigation on link click
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        if (window.innerWidth <= 768) {
            closeNavigation();
        }
    });
});

// Close navigation on escape key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        closeNavigation();
    }
});

// Close navigation on resize if mobile menu is open
window.addEventListener('resize', () => {
    if (window.innerWidth > 768 && navLinks.classList.contains('active')) {
        closeNavigation();
    }
});

// Product Cards
const productCards = document.querySelectorAll('.product-card button');
productCards.forEach(button => {
    button.addEventListener('click', () => {
        // Add to cart logic here
        alert('Product added to cart!');
    });
});

document.querySelectorAll('.add-to-cart').forEach(button => {
    button.addEventListener('click', (e) => {
        e.preventDefault();
        updateCart(1);
        
        // Animation feedback
        const card = button.closest('.product-card');
        card.classList.add('added-to-cart');
        setTimeout(() => card.classList.remove('added-to-cart'), 1000);
        
        // Show notification
        const productName = card.querySelector('h3').textContent;
        showNotification(`${productName} added to cart!`);
    });
});

// Update add to cart click handler
document.querySelectorAll('.add-to-cart').forEach(button => {
    button.addEventListener('click', (e) => {
        e.preventDefault();
        const card = button.closest('.product-card');
        const product = {
            name: card.querySelector('h3').textContent,
            price: parseFloat(card.querySelector('.price').textContent.replace('$', '')),
            image: card.querySelector('img').src
        };
        addToCart(product);
        showNotification(`${product.name} added to cart!`);
    });
});

function showNotification(message) {
    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.textContent = message;
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.classList.add('show');
        setTimeout(() => {
            notification.classList.remove('show');
            setTimeout(() => notification.remove(), 300);
        }, 2000);
    }, 100);
}

// Animation on Scroll
window.addEventListener('scroll', () => {
    const elements = document.querySelectorAll('.product-card, .about-content');
    elements.forEach(element => {
        const position = element.getBoundingClientRect().top;
        if (position < window.innerHeight - 100) {
            element.classList.add('animate');
        }
    });
    
    // Animate section headings
    document.querySelectorAll('.section-heading').forEach(heading => {
        if (isElementInViewport(heading) && !heading.classList.contains('animate')) {
            heading.classList.add('animate');
        }
    });
});

// Animate elements on scroll
const observerCallback = (entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate-fade-up');
            observer.unobserve(entry.target);
        }
    });
};

const observer = new IntersectionObserver(observerCallback, {
    threshold: 0.1
});

document.querySelectorAll('.about-features li, .stat, .about-grid img').forEach(el => {
    observer.observe(el);
});

// Text Animation Functions
function animateText() {
    const textElements = document.querySelectorAll('.text-reveal');
    textElements.forEach(element => {
        if (isElementInViewport(element)) {
            element.classList.add('animate');
        }
    });
}

function animateFeatures() {
    const features = document.querySelectorAll('.feature-item');
    features.forEach((feature, index) => {
        setTimeout(() => {
            if (isElementInViewport(feature)) {
                feature.classList.add('animate');
            }
        }, index * 200);
    });
}

function isElementInViewport(el) {
    const rect = el.getBoundingClientRect();
    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
}

// Enhanced Scroll Animation
window.addEventListener('scroll', () => {
    animateText();
    animateFeatures();
    document.querySelectorAll('.section-title').forEach(title => {
        if (isElementInViewport(title)) {
            title.classList.add('animate');
        }
    });
});

// Product Description Toggle
document.querySelectorAll('.product-card').forEach(card => {
    const description = card.querySelector('.product-description');
    if (description) {
        card.addEventListener('mouseenter', () => {
            description.style.maxHeight = description.scrollHeight + 'px';
        });
        card.addEventListener('mouseleave', () => {
            description.style.maxHeight = '0';
        });
    }
});

// Dynamic Content Loading
function loadMoreProducts(page = 1) {
    // Simulated API call
    setTimeout(() => {
        const productGrid = document.querySelector('.product-grid');
        const newProduct = document.createElement('div');
        newProduct.className = 'product-card';
        // Add product content...
        productGrid.appendChild(newProduct);
    }, 1000);
}

// Initialize Animations
document.addEventListener('DOMContentLoaded', () => {
    animateText();
    animateFeatures();
    
    // Animate visible headings on page load
    document.querySelectorAll('.section-heading').forEach(heading => {
        if (isElementInViewport(heading)) {
            heading.classList.add('animate');
        }
    });
});
