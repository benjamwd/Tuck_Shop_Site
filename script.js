document.addEventListener("DOMContentLoaded", function() {
    const categoryTitles = document.querySelectorAll('.category-title');
    categoryTitles.forEach(title => {
        title.addEventListener('click', function() {
            this.nextElementSibling.classList.toggle('show');
        });
        // Add touch event listener for mobile devices
        title.addEventListener('touchstart', function() {
            this.nextElementSibling.classList.toggle('show');
        });
    });

    // Add event listeners for item buttons
    const itemButtons = document.querySelectorAll('.item-btn');
    itemButtons.forEach(button => {
        button.addEventListener('click', function() {
            const itemId = this.dataset.itemId;
            const action = this.dataset.action;
            handleItemClick(itemId, action);
        });
        // Add touch event listener for mobile devices
        button.addEventListener('touchstart', function() {
            const itemId = this.dataset.itemId;
            const action = this.dataset.action;
            handleItemClick(itemId, action);
        });
    });
});

let count = {};
const items = [
    {id: "00000", name: "kitkat", price: 0.50, stock: 10},
    {id: "00001", name: "Freddo", price: 0.50, stock: 10},
    // Add more items as needed
];

items.forEach(item => {
    count[item.id] = 0;
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
                                <p>Price: £${item.price.toFixed(2)}</p>
                                <p>Quantity: ${count[item.id]}</p>
                                <p>Subtotal: £${subtotal.toFixed(2)}</p>
                            </div>`;
        }
    });

    localStorage.setItem('productInfo', productInfo);

    window.location.href = "basket.html";
}

