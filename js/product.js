// Product JavaScript file for Celestial Beauty website

// Sample product data
const products = [
  {
    id: 1,
    name: "Nebula Glow Serum",
    price: 49.99,
    image: "/images/product1.jpg",
    category: "Serums",
    description: "Infused with cosmic particles for an otherworldly glow.",
    rating: 4.8,
    featured: true
  },
  {
    id: 2,
    name: "Stardust Moisturizer",
    price: 39.99,
    image: "/images/product2.jpg",
    category: "Moisturizers",
    description: "Lightweight hydration with stardust minerals.",
    rating: 4.7,
    featured: true
  },
  {
    id: 3,
    name: "Galaxy Mud Mask",
    price: 29.99,
    image: "/images/product3.jpg",
    category: "Masks",
    description: "Deep cleansing mask with rare cosmic clay.",
    rating: 4.9,
    featured: false
  },
  {
    id: 4,
    name: "Solar Flare Cleanser",
    price: 24.99,
    image: "/images/product4.jpg",
    category: "Cleansers",
    description: "Energizing cleanser that removes impurities with the power of the sun.",
    rating: 4.6,
    featured: true
  },
  {
    id: 5,
    name: "Celestial Hydrating Toner",
    price: 22.99,
    image: "/images/product5.jpg",
    category: "Cleansers",
    description: "Balancing toner with asteroid water essence.",
    rating: 4.5,
    featured: false
  },
  {
    id: 6,
    name: "Cosmic Retinol Serum",
    price: 59.99,
    image: "/images/product6.jpg",
    category: "Serums",
    description: "Advanced anti-aging formula with meteor-derived retinol.",
    rating: 4.9,
    featured: true
  },
  {
    id: 7,
    name: "Supernova Night Cream",
    price: 49.99,
    image: "/images/product7.jpg",
    category: "Moisturizers",
    description: "Rejuvenating overnight treatment with supernova extracts.",
    rating: 4.8,
    featured: true
  },
  {
    id: 8,
    name: "Aurora Revitalizing Mask",
    price: 34.99,
    image: "/images/product8.jpg",
    category: "Masks",
    description: "Color-changing mask inspired by the aurora borealis.",
    rating: 4.7,
    featured: false
  }
];

// DOM Elements
const productList = document.getElementById('product-list');
const filterBtns = document.querySelectorAll('.filters div');

// Display products
function displayProducts(products) {
  productList.innerHTML = '';
  
  products.forEach(product => {
    const productDiv = document.createElement('div');
    productDiv.className = 'product';
    productDiv.dataset.category = product.category;
    
    // Use placeholder image if actual image is not available
    const imageSrc = product.image || '/images/placeholder.jpg';
    
    productDiv.innerHTML = `
      <div class="product-header">
        <img src="${imageSrc}" alt="${product.name}">
        ${product.featured ? '<span class="featured">Featured</span>' : ''}
      </div>
      <div class="product-footer">
        <h3>${product.name}</h3>
        <div class="rating">
          ${generateRatingStars(product.rating)}
        </div>
        <div class="price">
          <h4>$${product.price.toFixed(2)}</h4>
        </div>
        <p>${product.description}</p>
        <button class="add-to-cart" data-id="${product.id}">Add To Cart</button>
      </div>
    `;
    
    productList.appendChild(productDiv);
  });
  
  // Add event listeners to Add To Cart buttons
  document.querySelectorAll('.add-to-cart').forEach(button => {
    button.addEventListener('click', handleAddToCart);
  });
}

// Generate rating stars
function generateRatingStars(rating) {
  let stars = '';
  const fullStars = Math.floor(rating);
  const halfStar = rating % 1 >= 0.5;
  
  for (let i = 0; i < fullStars; i++) {
    stars += '<i class="bx bxs-star"></i>';
  }
  
  if (halfStar) {
    stars += '<i class="bx bxs-star-half"></i>';
  }
  
  const emptyStars = 5 - Math.ceil(rating);
  for (let i = 0; i < emptyStars; i++) {
    stars += '<i class="bx bx-star"></i>';
  }
  
  return stars;
}

// Handle Add To Cart button click
function handleAddToCart(e) {
  const productId = parseInt(e.target.dataset.id);
  const product = products.find(p => p.id === productId);
  
  if (product) {
    // Call the addToCart function from main.js
    window.addToCart ? window.addToCart(product) : addToCart(product);
  }
}

// Filter products by category
function filterProducts(category) {
  if (category === 'All') {
    displayProducts(products);
  } else {
    const filtered = products.filter(product => product.category === category);
    displayProducts(filtered);
  }
}

// Add event listeners to filter buttons
filterBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    filterBtns.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    
    const category = btn.dataset.filter;
    filterProducts(category);
  });
});

// Initialize with all products
window.addEventListener('DOMContentLoaded', () => {
  displayProducts(products);
  
  // Activate first filter
  filterBtns[0].classList.add('active');
  
  // Make addToCart function available globally
  window.addToCart = addToCart;
});