// Quantity selector

        let quantity = 1;

        const quantityDisplay =
            document.getElementById("quantity");

        const decreaseButton =
            document.getElementById("decrease");

        const increaseButton =
            document.getElementById("increase");

        decreaseButton.addEventListener("click", function() {

            if (quantity > 1) {
                quantity--;
                quantityDisplay.textContent = quantity;
            }

        });

        increaseButton.addEventListener("click", function() {

            if (quantity < 99) {
                quantity++;
                quantityDisplay.textContent = quantity;
            }

        });

// Details and cart data for each available tool.
const products = {
    drill: {name: "18V Cordless Drill", price: 89, image: "images/drill.png", description: "Cordless drill for drilling holes and driving screws. Battery and charger included.", category: "Power Tools"},
    level: {name: "Spirit Level", price: 24, image: "images/level.png", description: "24-inch aluminum spirit level for checking horizontal and vertical alignment.", category: "Hand Tools"},
    tape: {name: "Tape Measure", price: 12, image: "images/tapemeasure.png", description: "16-foot tape measure with an easy-lock blade for accurate measurements.", category: "Hand Tools"},
    hammer: {name: "Claw Hammer", price: 18, image: "images/hammer.png", description: "16-ounce claw hammer with a comfortable grip for driving and removing nails.", category: "Hand Tools"}
};
const requestedId = new URLSearchParams(window.location.search).get("tool") || "drill";
const productId = Object.prototype.hasOwnProperty.call(products, requestedId) ? requestedId : "drill";
const product = products[productId];
document.getElementById("product-name").textContent = product.name;
document.getElementById("product-price").textContent = "$" + product.price.toFixed(2);
const productImage = document.getElementById("product-image");
productImage.src = product.image;
productImage.alt = product.name;
document.querySelector(".product-info .description").textContent = product.description;
document.querySelector(".breadcrumbs span:last-child").textContent = product.category;
// The original drill-specific specifications and benefits do not apply to other products.
if (productId !== "drill") {
    document.querySelector(".specifications").hidden = true;
    document.querySelector(".product-benefits").hidden = true;
    document.querySelector(".price-note").hidden = true;
    document.querySelector(".product-category").textContent = product.category.toUpperCase();
    document.querySelector(".rating").hidden = true;
}

document.getElementById("add-to-cart").addEventListener("click", function() {
    let cart;
    try {
        cart = JSON.parse(localStorage.getItem("toolboxCart") || "[]");
        if (!Array.isArray(cart)) cart = [];
    } catch (error) {
        cart = [];
    }
    const existing = cart.find(function(item) { return item.id === productId; });
    if (existing) {
        existing.quantity = Math.min(99, existing.quantity + quantity);
    } else {
        cart.push({id: productId, name: product.name, price: product.price, image: product.image, quantity: quantity});
    }
    try {
        localStorage.setItem("toolboxCart", JSON.stringify(cart));
        window.location.href = "cart.html";
    } catch (error) {
        document.getElementById("cart-message").textContent = "Could not save the cart. Check your browser storage settings.";
    }
});
