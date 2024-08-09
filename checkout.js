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
