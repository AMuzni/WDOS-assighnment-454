document.addEventListener('DOMContentLoaded', () => {
    let cart = [];  // Changed to let for reassignment
    const prices = {
        'Sugar Free Dark Chocolate': 800,
        'Milk & Dark Chocolates': 600,
        'Butter - 1Kg': 750,
        'Heavenly Ice cream Cone': 200,
        'Milk': 550,
        'Low Fat Strawberry Flavoured': 600,
        'Potatoes': 1000,
        'Carrot': 800,
        'Cabbage': 650,
        'Bell Pepper': 350,
        'Tomato': 600,
        'Onions': 750,
        'Sun Cream 500mL': 850,
        'Natural Olive Cream & Lotion': 1850,
        'Cucumber Face mask': 1000,
        'Aloevera Glowing Cream': 1200,
        'Combo Pack': 3000,
        'All kinds of premium makeup brushes': 600
    };

    // Helper functions
    const addToCart = (id, quantity) => {
        const existingItem = cart.find(item => item.id === id);
        if (existingItem) {
            existingItem.quantity = parseFloat(quantity);
        } else {
            const item = {
                id,
                quantity: parseFloat(quantity),
                price: prices[id]
            };
            cart.push(item);
        }
        updateCartTable();
    };

    const updateCartTable = () => {
        const table = document.querySelector('table');
        table.innerHTML = `
            <tr>
                <th>Item</th>
                <th>Quantity</th>
                <th>Total</th>
            </tr>
        `;
        let totalPrice = 0;
        cart.forEach(item => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${item.id}</td>
                <td>${item.quantity}</td>
                <td>${(item.quantity * item.price).toFixed(2)}</td>
            `;
            table.appendChild(row);
            totalPrice += item.quantity * item.price;
        });
        const totalRow = document.createElement('tr');
        totalRow.innerHTML = `
            <td colspan="2"><strong>Total</strong></td>
            <td><strong>${totalPrice.toFixed(2)}</strong></td>
        `;
        table.appendChild(totalRow);
    };

    const saveToFavorites = () => {
        localStorage.setItem('favoriteCart', JSON.stringify(cart));
    };

    const loadFromFavorites = () => {
        const favoriteCart = JSON.parse(localStorage.getItem('favoriteCart'));
        if (favoriteCart) {
            cart = [];  // Clear current cart
            document.querySelectorAll('input[type="number"]').forEach(input => input.value = 0); // Reset all input fields
            favoriteCart.forEach(item => {
                document.getElementById(item.id).value = item.quantity;
                cart.push(item);
            });
            updateCartTable();
        }
    };

    // Event listeners for order page
    document.querySelectorAll('input[type="number"]').forEach(input => {
        input.addEventListener('change', (event) => {
            const { id, value } = event.target;
            if (value > 0) {
                addToCart(id, value);
            }
        });
    });

    document.querySelector('input[type="submit"]').addEventListener('click', (event) => {
        event.preventDefault();
        window.location.href = 'checkout.html';
    });

    document.querySelector('input[value="Add to favourite"]').addEventListener('click', saveToFavorites);
    document.querySelector('input[value="Apply favourite"]').addEventListener('click', loadFromFavorites);
});

// Event listener for checkout page
document.addEventListener("DOMContentLoaded", function() {
    const checkoutForm = document.getElementById("checkout-form");
    const successMessage = document.querySelector(".success-message");
    const deliveryDateSpan = document.getElementById("delivery-date");

    checkoutForm.addEventListener("submit", function(event) {
        event.preventDefault();

        // Validate the form fields
        const fullName = document.getElementById("full-name").value.trim();
        const email = document.getElementById("email").value.trim();
        const phoneNumber = document.getElementById("phone-number").value.trim();
        const deliveryAddress = document.getElementById("delivery-address").value.trim();
        const loyaltyType = document.getElementById("loyalty-type").value.trim();
        const paymentMethod = document.getElementById("payment-method").value;

        if (fullName && email && phoneNumber && deliveryAddress && loyaltyType && paymentMethod) {
            // Calculate delivery date (assuming 3 days from now)
            const today = new Date();
            const deliveryDate = new Date(today);
            deliveryDate.setDate(today.getDate() + 3);

            const options = { year: 'numeric', month: 'long', day: 'numeric' };
            const formattedDeliveryDate = deliveryDate.toLocaleDateString(undefined, options);

            // Show the success message
            deliveryDateSpan.textContent = formattedDeliveryDate;
            successMessage.style.display = "block";
            checkoutForm.style.display = "none";
        }
    });
});
