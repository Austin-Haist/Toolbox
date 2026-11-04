// Retrieve saved cart items

        let cart;
        try {
            cart = JSON.parse(localStorage.getItem("toolboxCart") || "[]");
            if (!Array.isArray(cart)) cart = [];
        } catch (error) { cart = []; }

        const cartItemsContainer =
            document.getElementById("cart-items");

        const emptyCartMessage =
            document.getElementById("empty-cart");

        const subtotalDisplay =
            document.getElementById("subtotal");

        const taxDisplay =
            document.getElementById("tax");

        const totalDisplay =
            document.getElementById("total");

        const checkoutButton =
            document.getElementById("checkout-button");

        // Format prices

        function formatPrice(amount) {
            return "$" + amount.toFixed(2);
        }

        // Save changes to localStorage

        function saveCart() {
            localStorage.setItem(
                "toolboxCart",
                JSON.stringify(cart)
            );
        }

        // Display the cart

        function displayCart() {

            cartItemsContainer.innerHTML = "";

            if (cart.length === 0) {

                emptyCartMessage.hidden = false;
                checkoutButton.disabled = true;

            } else {

                emptyCartMessage.hidden = true;
                checkoutButton.disabled = false;

            }

            let subtotal = 0;

            cart.forEach(function(item, index) {

                subtotal += item.price * item.quantity;

                const card = document.createElement("div");
                card.className = "cart-item";

                card.innerHTML = `
                    <img
                        src="${item.image}"
                        alt="${item.name}"
                        class="cart-product-image"
                    >

                    <div class="cart-product-details">

                        <h3>${item.name}</h3>

                        <p class="product-description">
                            Battery + charger included
                        </p>

                        <strong class="item-price">
                            ${formatPrice(item.price)}
                        </strong>

                        <div class="item-actions">

                            <div class="quantity-controls">

                                <button
                                    type="button"
                                    class="decrease-btn"
                                    aria-label="Decrease quantity">
                                    −
                                </button>

                                <span>${item.quantity}</span>

                                <button
                                    type="button"
                                    class="increase-btn"
                                    aria-label="Increase quantity">
                                    +
                                </button>

                            </div>

                            <button
                                type="button"
                                class="remove-button">
                                Remove
                            </button>

                        </div>

                    </div>
                `;

                // Decrease quantity

                card.querySelector(".decrease-btn")
                    .addEventListener("click", function() {

                        if (cart[index].quantity > 1) {
                            cart[index].quantity--;
                        } else {
                            cart.splice(index, 1);
                        }

                        saveCart();
                        displayCart();

                    });

                // Increase quantity

                card.querySelector(".increase-btn")
                    .addEventListener("click", function() {

                        if (cart[index].quantity < 99) {
                            cart[index].quantity++;
                        }

                        saveCart();
                        displayCart();

                    });

                // Remove item

                card.querySelector(".remove-button")
                    .addEventListener("click", function() {

                        cart.splice(index, 1);

                        saveCart();
                        displayCart();

                    });

                cartItemsContainer.appendChild(card);

            });

            // Calculate totals

            const tax = subtotal * 0.08;
            const total = subtotal + tax;

            subtotalDisplay.textContent = formatPrice(subtotal);
            taxDisplay.textContent = formatPrice(tax);
            totalDisplay.textContent = formatPrice(total);

        }

        // Checkout

        checkoutButton.addEventListener("click", function() {

            if (cart.length === 0) {
                return;
            }

            let subtotal = 0;

            cart.forEach(function(item) {
                subtotal += item.price * item.quantity;
            });

            const total = subtotal * 1.08;

            // Save order information for confirmation page

            const order = {
                items: cart,
                subtotal: subtotal,
                tax: subtotal * 0.08,
                total: total
            };

            localStorage.setItem(
                "toolboxOrder",
                JSON.stringify(order)
            );

            // Clear the shopping cart

            cart = [];
            saveCart();

            // Go to confirmation page

            window.location.href = "confirmation.html";

        });

        // Display saved cart when page loads

        displayCart();
