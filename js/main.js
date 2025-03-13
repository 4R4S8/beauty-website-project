// Main JavaScript file for Celestial Beauty website

// DOM Elements
const cartIcon = document.getElementById('cart-icon');
const cartCount = document.getElementById('cart-count');
const userIcon = document.getElementById('user-icon');
const loginForm = document.getElementById('login-form');
const loginLink = document.getElementById('login-link');
const registerLink = document.getElementById('register-link');
const closeFormBtn = document.querySelector('.close-form');
const shopNowBtn = document.getElementById('shop-now');

// Cart functionality
let cartItems = [];

function updateCartCount() {
  cartCount.textContent = cartItems.length;
}

function addToCart(product) {
  cartItems.push(product);
  updateCartCount();
  
  // Show added to cart notification
  showNotification(`${product.name} added to cart!`);
  
  // Save cart to localStorage
  localStorage.setItem('celestialCart', JSON.stringify(cartItems));
}

function showNotification(message) {
  const notification = document.createElement('div');
  notification.className = 'notification';
  notification.textContent = message;
  document.body.appendChild(notification);
  
  setTimeout(() => {
    notification.classList.add('show');
  }, 100);
  
  setTimeout(() => {
    notification.classList.remove('show');
    setTimeout(() => {
      document.body.removeChild(notification);
    }, 500);
  }, 3000);
}
// Login functionality
function toggleLoginForm() {
  loginForm.classList.toggle('show');
}

userIcon.addEventListener('click', toggleLoginForm);
loginLink.addEventListener('click', toggleLoginForm);
closeFormBtn.addEventListener('click', toggleLoginForm);

// Register link 
registerLink.addEventListener('click', () => {
  alert('Registration functionality will be implemented soon!');
});

// Login form submission
document.querySelector('#login-form form').addEventListener('submit', (e) => {
  e.preventDefault();
  const email = e.target.querySelector('input[type="email"]').value;
  const password = e.target.querySelector('input[type="password"]').value;
  
  // In a real implementation, you would make an API call to verify credentials
  // For now, just show a success message
  alert(`Login successful! Welcome back, ${email}`);
  toggleLoginForm();
});

// Shop now button
shopNowBtn.addEventListener('click', () => {
  document.getElementById('collection').scrollIntoView({ behavior: 'smooth' });
});

// Navigation links
document.querySelectorAll('.nav-list a').forEach(link => {
  link.addEventListener('click', (e) => {
    const href = link.getAttribute('href');
    
    if (href === '#') {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else if (href === '#collection') {
      e.preventDefault();
      document.getElementById('collection').scrollIntoView({ behavior: 'smooth' });
    } else if (href === '#blog') {
      e.preventDefault();
      alert('Blog section coming soon!');
    } else if (href === 'Galaxy') {
      e.preventDefault();
      alert('Galaxy section coming soon!');
    }
  });
});

// About Us section
document.querySelectorAll('.nav-list a').forEach(link => {
  if (link.textContent === 'About Us') {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      
      // Create and show About Us modal
      const aboutModal = document.createElement('div');
      aboutModal.className = 'about-modal';
      
      aboutModal.innerHTML = `
        <div class="about-content">
          <div class="close-about"><i class="bx bx-x"></i></div>
          <h2>About Celestial Beauty</h2>
          <p>Welcome to Celestial Beauty, where skincare meets the cosmos.</p>
          <p>Founded in 2023, Celestial Beauty harnesses the power of rare ingredients inspired by celestial bodies to create revolutionary skincare products.</p>
          <p>Our mission is to help you achieve skin that shines as bright as the stars, with sustainable and cruelty-free formulations.</p>
          <p>Every product is carefully crafted to bring the harmony of the universe to your daily skincare routine.</p>
          <h3>Our Cosmic Journey</h3>
          <p>What began as a small laboratory experiment has blossomed into a full range of products that capture the essence of the cosmos.</p>
          <p>Our team of cosmetic scientists and astronomers work together to create formulations that are out of this world.</p>
          <div class="team-section">
            <h3>Our Stellar Team</h3>
            <div class="team-members">
              <div class="team-member">
                <img src="/images/team1.jpg" alt="Team Member" />
                <h4>Dr. Luna Starlight</h4>
                <p>Founder & Chief Formulator</p>
              </div>
              <div class="team-member">
                <img src="/images/team2.jpg" alt="Team Member" />
                <h4>Nova Celestial</h4>
                <p>Head of Product Development</p>
              </div>
              <div class="team-member">
                <img src="/images/team3.jpg" alt="Team Member" />
                <h4>Orion Nebula</h4>
                <p>Sustainability Director</p>
              </div>
            </div>
          </div>
        </div>
      `;
      
      document.body.appendChild(aboutModal);
      
      // Close button functionality
      aboutModal.querySelector('.close-about').addEventListener('click', () => {
        document.body.removeChild(aboutModal);
      });
      
      // Also close when clicking outside the content
      aboutModal.addEventListener('click', (e) => {
        if (e.target === aboutModal) {
          document.body.removeChild(aboutModal);
        }
      });
    });
  }
});

// Initialize cart from localStorage if available
window.addEventListener('DOMContentLoaded', () => {
  const savedCart = localStorage.getItem('celestialCart');
  if (savedCart) {
    cartItems = JSON.parse(savedCart);
    updateCartCount();
  }
});

// Mobile menu toggle
const hamburger = document.querySelector('.hamburger');
const navList = document.querySelector('.nav-list');
const closeNav = document.querySelector('.close');

hamburger.addEventListener('click', () => {
  navList.classList.add('show');
});

closeNav.addEventListener('click', () => {
  navList.classList.remove('show');
});

// Cart functionality
let cart = [];

// Load cart from localStorage if available
function loadCart() {
  const savedCart = localStorage.getItem('celestialCart');
  if (savedCart) {
    cart = JSON.parse(savedCart);
    updateCartCount();
    updateCartTotal();
  }
}

// Save cart to localStorage
function saveCart() {
  localStorage.setItem('celestialCart', JSON.stringify(cart));
}

// Update cart count in the UI
function updateCartCount() {
  const cartCountElement = document.getElementById('cart-count');
  const totalItems = cart.reduce((total, item) => total + item.quantity, 0);
  cartCountElement.textContent = totalItems;
}

// Update cart total price
function updateCartTotal() {
  const cartTotalElement = document.getElementById('cart-total');
  const total = cart.reduce((total, item) => total + (item.price * item.quantity), 0);
  cartTotalElement.textContent = `$${total.toFixed(2)}`;
}

// Add item to cart
function addToCart(product) {
  const existingItem = cart.find(item => item.id === product.id);
  
  if (existingItem) {
    existingItem.quantity += 1;
  } else {
    cart.push({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      quantity: 1
    });
  }
  
  saveCart();
  updateCartCount();
  updateCartTotal();
  displayCartItems();
  
  // Show notification
  showNotification(`${product.name} added to cart!`);
}

// Remove item from cart
function removeFromCart(productId) {
  cart = cart.filter(item => item.id !== productId);
  saveCart();
  updateCartCount();
  updateCartTotal();
  displayCartItems();
}

// Update item quantity
function updateItemQuantity(productId, change) {
  const item = cart.find(item => item.id === productId);
  if (item) {
    item.quantity += change;
    
    if (item.quantity <= 0) {
      removeFromCart(productId);
    } else {
      saveCart();
      updateCartCount();
      updateCartTotal();
      displayCartItems();
    }
  }
}

// Clear cart
function clearCart() {
  cart = [];
  saveCart();
  updateCartCount();
  updateCartTotal();
  displayCartItems();
}

// Display cart items
function displayCartItems() {
  const cartItemsElement = document.getElementById('cart-items');
  
  if (cart.length === 0) {
    cartItemsElement.innerHTML = `
      <div class="empty-cart">
        <i class="bx bx-cart"></i>
        <p>Your cart is empty</p>
        <button class="continue-shopping">Continue Shopping</button>
      </div>
    `;
    return;
  }
  
  let cartHTML = '';
  
  cart.forEach(item => {
    cartHTML += `
      <div class="cart-item" data-id="${item.id}">
        <img src="${item.image}" alt="${item.name}" class="cart-item-img">
        <div class="cart-item-details">
          <div class="cart-item-name">${item.name}</div>
          <div class="cart-item-price">$${item.price.toFixed(2)}</div>
          <div class="cart-item-quantity">
            <button class="quantity-btn minus" data-id="${item.id}">-</button>
            <span>${item.quantity}</span>
            <button class="quantity-btn plus" data-id="${item.id}">+</button>
          </div>
        </div>
        <div class="cart-item-remove" data-id="${item.id}">
          <i class="bx bx-trash"></i>
        </div>
      </div>
    `;
  });
  
  cartItemsElement.innerHTML = cartHTML;
  
  // Add event listeners to quantity buttons and remove buttons
  document.querySelectorAll('.quantity-btn.minus').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const productId = e.target.dataset.id;
      updateItemQuantity(productId, -1);
    });
  });
  
  document.querySelectorAll('.quantity-btn.plus').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const productId = e.target.dataset.id;
      updateItemQuantity(productId, 1);
    });
  });
  
  document.querySelectorAll('.cart-item-remove').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const productId = e.target.closest('.cart-item-remove').dataset.id;
      removeFromCart(productId);
    });
  });
  
  // Add event listener to continue shopping button
  const continueShoppingBtn = document.querySelector('.continue-shopping');
  if (continueShoppingBtn) {
    continueShoppingBtn.addEventListener('click', () => {
      document.getElementById('cart-overlay').classList.remove('show');
    });
  }
}

// Show notification
function showNotification(message) {
  // Create notification element if it doesn't exist
  let notification = document.querySelector('.notification');
  if (!notification) {
    notification = document.createElement('div');
    notification.className = 'notification';
    document.body.appendChild(notification);
  }
  
  notification.textContent = message;
  notification.classList.add('show');
  
  // Hide notification after 3 seconds
  setTimeout(() => {
    notification.classList.remove('show');
  }, 3000);
}

// Initialize cart functionality
function initCart() {
  loadCart();
  displayCartItems();
  
  // Add event listeners for cart overlay
  const cartIcon = document.getElementById('cart-icon');
  const cartOverlay = document.getElementById('cart-overlay');
  const closeCart = document.querySelector('.close-cart');
  const clearCartBtn = document.querySelector('.clear-cart-btn');
  const checkoutBtn = document.querySelector('.checkout-btn');
  
  cartIcon.addEventListener('click', () => {
    cartOverlay.classList.add('show');
    displayCartItems();
  });
  
  closeCart.addEventListener('click', () => {
    cartOverlay.classList.remove('show');
  });
  
  clearCartBtn.addEventListener('click', clearCart);
  
  checkoutBtn.addEventListener('click', () => {
    if (cart.length > 0) {
      alert('Checkout functionality will be implemented soon!');
      // Implement checkout logic here
    } else {
      alert('Your cart is empty!');
    }
  });
  
  // Close cart when clicking outside
  cartOverlay.addEventListener('click', (e) => {
    if (e.target === cartOverlay) {
      cartOverlay.classList.remove('show');
    }
  });
}

// Initialize the cart functionality when the DOM is fully loaded
document.addEventListener('DOMContentLoaded', initCart);