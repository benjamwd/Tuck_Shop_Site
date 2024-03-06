const currentHour = new Date().getHours();
const startHour = 10; 
const endHour = 12;   

if (currentHour >= startHour && currentHour < endHour) {
    window.location.href = "hours.html";
}

document.addEventListener("DOMContentLoaded", function() {
    // Chocolate category
    const categoryTitlesChoc = document.querySelectorAll('.category-title-choc');
    categoryTitlesChoc.forEach(title => {
        title.addEventListener('click', function() {
            this.nextElementSibling.classList.toggle('show');
        });
    });

    // Crisps category
    const categoryTitlesCrisp = document.querySelectorAll('.category-title-crisp');
    categoryTitlesCrisp.forEach(title => {
        title.addEventListener('click', function() {
            this.nextElementSibling.classList.toggle('show');
        });
    });

    // Other category
    const categoryTitlesOther = document.querySelectorAll('.category-title-other');
    categoryTitlesOther.forEach(title => {
        title.addEventListener('click', function() {
            this.nextElementSibling.classList.toggle('show');
        });
    });
});

document.addEventListener("DOMContentLoaded", function() {
  // Get the button element
  var checkoutBtn = document.querySelector('.checkout-btn');

  // Add click event listener to the button
  checkoutBtn.addEventListener('click', function() {
    // Redirect to the new page
    window.location.href = 'payment.html';
  });
});

let count = {};

// db for products
const items = [
    {id: "00000", name: "kitkat", price: 0.50, stock: 10},
    {id: "00001", name: "Freddo", price: 0.50, stock: 10},
    {id: "00002", name: "twirl", price: 0.50, stock: 10},
    {id: "00003", name: "kiner", price: 0.50, stock: 10},
    {id: "00004", name: "brunchbar", price: 0.50, stock: 10},
    {id: "00005", name: "aeros", price: 1, stock: 10},
    {id: "00006", name: "smarties", price: 1, stock: 10},
    {id: "00007", name: "bissli", price: 1, stock: 10},
    {id: "00008", name: "walkers", price: 1, stock: 10},
    {id: "00009", name: "sweet and salted popcorn", price: 1, stock: 10},
    {id: "00010", name: "salted Popcorn", price: 0.50, stock: 10},
    {id: "00011", name: "nature valley", price: 0.50, stock: 10},
    {id: "00012", name: "Yoyo bear", price: 0.50, stock: 10},
]

items.forEach(item => {
    count[item.id] = 0;
    document.getElementById(`item-btn${item.id}`).addEventListener("click", () => handleItemClick(item.id, 'add'));
    document.getElementById(`item-btn-${item.id}`).addEventListener("click", () => handleItemClick(item.id, 'remove'));
    document.getElementById(`item-btn-C${item.id}`).addEventListener("click", () => handleItemClick(item.id, 'clear'));
});

function handleItemClick(itemId, action) {
    const stock = items.find(item => item.id === itemId).stock;
    if (action === 'add') {
        if (stock >= count[itemId] + 1) {
            count[itemId]++;
            updateTotal();
        } else {
            alert("Sorry, we are out of stock!");
        }
    } else if (action === 'remove') {
        if (count[itemId] > 0) {
            count[itemId]--;
            updateTotal();
        } else {
            alert("You can't buy negative items mate!");
        }
    } else if (action === 'clear') {
        count[itemId] = 0;
        updateTotal();
    }
    document.getElementById(`counter${itemId}`).innerHTML = count[itemId];
}

let total = 0;
let total_price = 0;

function updateTotal() {
    total_price = items.reduce((acc, item) => acc + count[item.id] * item.price, 0);
    total = Object.values(count).reduce((acc, val) => acc + val, 0);
   
    // Update the total counter element in the HTML
    document.getElementById('total-counter').innerHTML = total;
}




function toggleCart() {
    let productInfo = '';
    items.forEach(item => {
        if (count[item.id] > 0) {
            const subtotal = count[item.id] * item.price;
            productInfo += `<div class="product-info">
                    <p>Product Name: ${item.name}</p>
                    <p>Price: &pound;${item.price.toFixed(2)}</p>
                    <p>Quantity: ${count[item.id]}</p>
                    <p>Subtotal: &pound;${subtotal.toFixed(2)}</p>
                </div>`;

        }
    });

    localStorage.setItem('productInfo', productInfo);

    window.location.href = "basket.html";
}

 

 

