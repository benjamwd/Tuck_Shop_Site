// Add event listeners to "Add to Cart" buttons
document.querySelectorAll('.add-to-cart').forEach(button => {
  button.addEventListener('click', function() {
    const itemId = this.dataset.id;
    const itemName = this.dataset.name;
    const itemPrice = parseFloat(this.dataset.price);
    addToBasket(itemId, itemName, itemPrice);
  });
});

// Function to add an item to the basket
function addToBasket(itemId, itemName, itemPrice) {
  console.log('Adding item to basket:', itemId, itemName, itemPrice);

  const basketItems = document.querySelector('.basket-items');

  // Check if item already exists in the basket
  const existingItem = document.getElementById(`basket-item-${itemId}`);
  if (existingItem) {
    const quantityElement = existingItem.querySelector('.item-quantity');
    const quantity = parseInt(quantityElement.textContent) + 1;
    quantityElement.textContent = quantity;
  } else {
    // Create new basket item
    const newItem = document.createElement('div');
    newItem.classList.add('basket-item');
    newItem.id = `basket-item-${itemId}`;
    newItem.innerHTML = `
      <img src="images/${itemName.toLowerCase()}.jpg" alt="${itemName}">
      <span class="item-name">${itemName}</span>
      <span class="item-price">${itemPrice.toFixed(2)}</span>
      <span class="item-quantity">1</span>
    `;
    basketItems.appendChild(newItem);
  }

  // Update total items and total price
  updateBasketTotal();
}

// Function to update total items and total price
function updateBasketTotal() {
  let totalItems = 0;
  let totalPrice = 0;

  // Loop through each item in the basket
  document.querySelectorAll('.basket-item').forEach(item => {
    const quantity = parseInt(item.querySelector('.item-quantity').textContent);
    const price = parseFloat(item.querySelector('.item-price').textContent);
    
    totalItems += quantity;
    totalPrice += quantity * price;
  });

  // Update total items and total price in the basket
  document.getElementById('total-items').textContent = totalItems;
  document.getElementById('total-price').textContent = totalPrice.toFixed(2);
}


// Initialize basket total on page load
updateBasketTotal();
