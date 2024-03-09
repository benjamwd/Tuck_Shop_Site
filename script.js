const SHEET_ID = "1WoWi5QviWTfsYcYbqKrhLulnTOUAqQqwyg7FYmvh52E";
const SHEET_TITLE = "tuckshop";
const SHEET_RANGE = "A2:D14"; // Exclude the header row
const FULL_URL = `https://docs.google.com/spreadsheets/d/${SHEET_ID}/gviz/tq?sheet=${SHEET_TITLE}&range=${SHEET_RANGE}`;

let count = {};
let total = 0;
let total_price = 0;
let items = [];


fetch(FULL_URL)
    .then(res => res.text())
    .then(rep => {
        let data = JSON.parse(rep.substr(47).slice(0, -2));

        // Iterate over the rows fetched from the Google Sheet and construct the items array
        for (let row of data.table.rows) {
            let id = ('00000' + row.c[0].v).slice(-5); // Format ID to always have five digits
            let name = row.c[1].v;
            let price = parseFloat(row.c[2].v);
            let stock = parseInt(row.c[3].v);

            count[id] = 0;
            items.push({ id: id, name: name, price: price, stock: stock });

            // Attach event listeners to the buttons
            document.getElementById(`item-btn${id}`).addEventListener("click", () => handleItemClick(id, 'add'));
            document.getElementById(`item-btn-${id}`).addEventListener("click", () => handleItemClick(id, 'remove'));
            document.getElementById(`item-btn-C${id}`).addEventListener("click", () => handleItemClick(id, 'clear'));
        }
    })
    .catch(error => {
        console.error('Error fetching data:', error);
    });

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

    // Get the button element
    var checkoutBtn = document.querySelector('.checkout-btn');

    // Add click event listener to the button
    checkoutBtn.addEventListener('click', function() {
        // Redirect to the new page
        window.location.href = 'payment.html';
    });
});

function handleItemClick(itemId, action) {
    const stock = parseInt(items.find(item => item.id === itemId).stock);
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

function updateTotal() {
    total_price = Object.keys(count).reduce((acc, itemId) => {
        const item = items.find(item => item.id === itemId);
        return acc + count[itemId] * item.price;
    }, 0);
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

