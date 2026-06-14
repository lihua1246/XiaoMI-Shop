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

var loginForm = document.querySelector("#loginForm");
var loginMessage = document.querySelector("#loginMessage");

if (loginForm) {
    loginForm.addEventListener("submit", function (event) {
        event.preventDefault();

        var username = document.querySelector("#username").value.trim();
        var password = document.querySelector("#password").value.trim();

        if (username === "" || password === "") {
            loginMessage.textContent = "用户名和密码不能为空";
            return;
        }

        loginMessage.textContent = "登录信息填写完成，可以继续完善后端功能";
    });
}

var filterLinks = document.querySelectorAll(".filter-tabs a");
var productListCards = document.querySelectorAll(".product-list .product-card");

filterLinks.forEach(function (link) {
    link.addEventListener("click", function (event) {
        event.preventDefault();

        var filter = link.dataset.filter;

        filterLinks.forEach(function (item) {
            item.classList.remove("active");
        });
        link.classList.add("active");

        productListCards.forEach(function (card) {
            if (filter === "all" || card.dataset.category === filter) {
                card.style.display = "";
            } else {
                card.style.display = "none";
            }
        });
    });
});
