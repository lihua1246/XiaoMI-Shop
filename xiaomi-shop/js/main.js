console.log("小米商城前端仿站项目已加载");

var optionGroups = document.querySelectorAll("[data-option-group]");

optionGroups.forEach(function (group) {
    var buttons = group.querySelectorAll(".option-btn");

    buttons.forEach(function (button) {
        button.addEventListener("click", function () {
            buttons.forEach(function (item) {
                item.classList.remove("active");
            });

            button.classList.add("active");
        });
    });
});

var cartItems = document.querySelectorAll(".cart-item");
var totalPrice = document.querySelector("#totalPrice");

function updateCartTotal() {
    var total = 0;

    cartItems.forEach(function (item) {
        var price = Number(item.dataset.price);
        var quantity = Number(item.querySelector(".quantity").textContent);
        var subtotal = price * quantity;

        item.querySelector(".subtotal").textContent = subtotal + " 元";
        total = total + subtotal;
    });

    if (totalPrice) {
        totalPrice.textContent = total + " 元";
    }
}

cartItems.forEach(function (item) {
    var minusBtn = item.querySelector(".minus-btn");
    var plusBtn = item.querySelector(".plus-btn");
    var quantityText = item.querySelector(".quantity");

    minusBtn.addEventListener("click", function () {
        var quantity = Number(quantityText.textContent);

        if (quantity > 1) {
            quantityText.textContent = quantity - 1;
            updateCartTotal();
        }
    });

    plusBtn.addEventListener("click", function () {
        var quantity = Number(quantityText.textContent);

        quantityText.textContent = quantity + 1;
        updateCartTotal();
    });
});

updateCartTotal();
