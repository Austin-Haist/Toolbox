// Retrieve the order saved by cart.html

        const savedOrder = localStorage.getItem("toolboxOrder");

        const order = savedOrder
            ? JSON.parse(savedOrder)
            : null;

        const orderItemsContainer =
            document.getElementById("order-items");

        // Format prices

        function formatPrice(amount) {
            return "$" + amount.toFixed(2);
        }

        // Display the order

        function displayOrder() {

            if (!order || !order.items || order.items.length === 0) {

                orderItemsContainer.innerHTML = `
                    <p class="no-order">
                        No completed order was found.
                        <a href="tools.html">Browse Tools</a>
                    </p>
                `;

                document.querySelector(".confirmation-hero h1")
                    .textContent = "No Order Found";

                document.querySelector(".confirmation-message")
                    .textContent =
                    "Complete a demo checkout to see your order here.";

                document.querySelector(".order-number").hidden = true;

                document.getElementById("track-button").disabled = true;

                return;
            }

            // Generate an order number once

            let orderNumber = localStorage.getItem("toolboxOrderNumber");

            if (!orderNumber) {

                orderNumber = "TB-" +
                    Math.floor(10000 + Math.random() * 90000);

                localStorage.setItem(
                    "toolboxOrderNumber",
                    orderNumber
                );

            }

            document.getElementById("order-number")
                .textContent = orderNumber;

            // Display each purchased item

            order.items.forEach(function(item) {

                const itemElement = document.createElement("div");

                itemElement.className = "order-item";

                const productImage = document.createElement("img");
                productImage.src = item.image;
                productImage.alt = item.name;
                productImage.className = "order-product-image";

                const productDetails = document.createElement("div");
                productDetails.className = "order-product-details";

                const productName = document.createElement("h3");
                productName.textContent = item.name;

                const productQuantity = document.createElement("p");
                productQuantity.textContent =
                    "Quantity: " + item.quantity;

                const productPrice = document.createElement("strong");
                productPrice.textContent =
                    formatPrice(item.price * item.quantity);

                productDetails.appendChild(productName);
                productDetails.appendChild(productQuantity);

                itemElement.appendChild(productImage);
                itemElement.appendChild(productDetails);
                itemElement.appendChild(productPrice);

                orderItemsContainer.appendChild(itemElement);

            });

            // Display saved totals

            document.getElementById("subtotal")
                .textContent = formatPrice(order.subtotal);

            document.getElementById("tax")
                .textContent = formatPrice(order.tax);

            document.getElementById("total")
                .textContent = formatPrice(order.total);

        }

        // Demo tracking button

        document.getElementById("track-button")
            .addEventListener("click", function() {

                alert(
                    "Your order has been confirmed! " +
                    "Live shipping tracking is not available " +
                    "in this demo."
                );

            });

        // Run when page loads

        displayOrder();
