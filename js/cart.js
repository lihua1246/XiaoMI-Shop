var cartList = document.getElementById('cartList');
var cartTotal = document.getElementById('cartTotal');
var checkedCount = document.getElementById('checkedCount');
var cartHeader = document.getElementById('cartHeader');
var cartEmpty = document.getElementById('cartEmpty');
var cartFooter = document.querySelector('.cart-footer');
var checkoutBtn = document.getElementById('checkoutBtn');
var cartStorageKey = 'xiaomiCartV2';

function readCart() {
    var savedCart;

    try {
        savedCart = JSON.parse(localStorage.getItem(cartStorageKey) || '[]');
    } catch (error) {
        savedCart = [];
    }

    if (!Array.isArray(savedCart)) {
        return [];
    }

    var validCart = [];

    for (var i = 0; i < savedCart.length; i++) {
        var product = savedCart[i];
        var price = Number(String(product.price || '').replace(/[^\d.]/g, ''));
        var quantity = Number(product.quantity || product.count || 1);

        if (!product.name || !Number.isFinite(price) || price <= 0) {
            continue;
        }

        product.id = product.id || product.name;
        product.price = price;
        product.quantity = Number.isFinite(quantity) && quantity > 0 ? quantity : 1;
        product.description = product.description || product.spec || '默认规格';
        product.image = product.image || '';
        validCart.push(product);
    }

    return validCart;
}

var cart = readCart();

function saveCart() {
    localStorage.setItem(cartStorageKey, JSON.stringify(cart));
}

function updateTotal() {
    var total = 0;
    var count = 0;

    for (var i = 0; i < cart.length; i++) {
        total += cart[i].price * cart[i].quantity;
        count += cart[i].quantity;
    }

    cartTotal.innerText = '¥' + total;
    checkedCount.innerText = count;
}

function createCartItem(product, index) {
    return '<div class="cart-item" data-index="' + index + '">' +
        '<span class="cart-col-product">' +
            '<span class="cart-product-visual cart-product-visual-img">' +
                '<img src="' + product.image + '" alt="' + product.name + '">' +
            '</span>' +
            '<span class="cart-product-info">' +
                '<strong class="cart-product-name">' + product.name + '</strong>' +
                '<span class="cart-product-desc">' + product.description + '</span>' +
                '' +
            '</span>' +
        '</span>' +
        '<span class="cart-col-price"><span class="cart-price">¥' + product.price + '</span></span>' +
        '<span class="cart-col-qty">' +
            '<span class="cart-qty-stepper">' +
                '<button type="button" class="qty-btn minus-btn">-</button>' +
                '<input type="text" class="qty-input" value="' + product.quantity + '" readonly>' +
                '<button type="button" class="qty-btn plus-btn">+</button>' +
            '</span>' +
        '</span>' +
        '<span class="cart-col-subtotal"><span class="cart-subtotal">¥' +
            product.price * product.quantity +
        '</span></span>' +
    '</div>';
}

function renderCart() {
    var html = '';

    for (var i = 0; i < cart.length; i++) {
        html += createCartItem(cart[i], i);
    }

    cartList.innerHTML = html;
    var isEmpty = cart.length === 0;
    cartHeader.style.display = isEmpty ? 'none' : 'flex';
    cartEmpty.style.display = isEmpty ? 'block' : 'none';
    cartFooter.style.display = isEmpty ? 'none' : 'flex';
    checkoutBtn.disabled = isEmpty;
    updateTotal();
}

if (cartList) {
    saveCart();
    renderCart();

    cartList.onclick = function (event) {
        var item = event.target.closest('.cart-item');

        if (!item) {
            return;
        }

        var index = Number(item.getAttribute('data-index'));

        if (event.target.classList.contains('plus-btn')) {
            cart[index].quantity++;
        } else if (event.target.classList.contains('minus-btn')) {
            if (cart[index].quantity > 1) {
                cart[index].quantity--;
            }
            return;
        }

        saveCart();
        renderCart();
    };
}

if (checkoutBtn) {
    checkoutBtn.onclick = function () {
        alert('当前合计：' + cartTotal.innerText);
    };
}
