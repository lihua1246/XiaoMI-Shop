var cartKey = 'xiaomiCart';

function getCartList() {
    var text = localStorage.getItem(cartKey);
    if (text) {
        return JSON.parse(text);
    }
    return [];
}

function saveCartList(list) {
    localStorage.setItem(cartKey, JSON.stringify(list));
}

function addProductToCart(btn) {
    var list = getCartList();
    var id = btn.getAttribute('data-id');
    var hasProduct = false;

    for (var i = 0; i < list.length; i++) {
        if (list[i].id === id) {
            list[i].num = list[i].num + 1;
            hasProduct = true;
        }
    }

    if (!hasProduct) {
        list.push({
            id: id,
            name: btn.getAttribute('data-name'),
            desc: btn.getAttribute('data-desc'),
            price: Number(btn.getAttribute('data-price')),
            image: btn.getAttribute('data-image'),
            num: 1
        });
    }

    saveCartList(list);
}

var addButtons = document.querySelectorAll('[data-cart-action="add"]');
for (var i = 0; i < addButtons.length; i++) {
    addButtons[i].onclick = function () {
        addProductToCart(this);
    };
}

var cartList = document.getElementById('cartList');
var cartTotal = document.getElementById('cartTotal');
var checkedCount = document.getElementById('checkedCount');
var cartContent = document.getElementById('cartContent');
var cartEmpty = document.getElementById('cartEmpty');

function showCart() {
    if (!cartList) {
        return;
    }

    var list = getCartList();
    var html = '';

    if (list.length === 0) {
        cartContent.style.display = 'none';
        cartEmpty.style.display = 'block';
        return;
    }

    cartContent.style.display = 'block';
    cartEmpty.style.display = 'none';

    for (var i = 0; i < list.length; i++) {
        html += '<div class="cart-item" data-index="' + i + '">';
        html += '<span class="cart-col-check"><input type="checkbox" class="cart-checkbox" checked></span>';
        html += '<span class="cart-col-product">';
        html += '<span class="cart-product-visual cart-product-visual-img"><img src="' + list[i].image + '" alt="' + list[i].name + '"></span>';
        html += '<span class="cart-product-info">';
        html += '<strong class="cart-product-name">' + list[i].name + '</strong>';
        html += '<span class="cart-product-desc">' + list[i].desc + '</span>';
        html += '</span></span>';
        html += '<span class="cart-col-price"><span class="cart-price">¥' + list[i].price + '</span></span>';
        html += '<span class="cart-col-qty">';
        html += '<span class="cart-qty-stepper">';
        html += '<button type="button" class="qty-btn minus-btn">-</button>';
        html += '<input type="text" class="qty-input" value="' + list[i].num + '" readonly>';
        html += '<button type="button" class="qty-btn plus-btn">+</button>';
        html += '</span></span>';
        html += '<span class="cart-col-subtotal"><span class="cart-subtotal">¥' + (list[i].price * list[i].num) + '</span></span>';
        html += '</div>';
    }

    cartList.innerHTML = html;
    countTotal();
    bindCartButtons();
}

function countTotal() {
    var list = getCartList();
    var total = 0;
    var count = 0;

    for (var i = 0; i < list.length; i++) {
        total += list[i].price * list[i].num;
        count += list[i].num;
    }

    if (cartTotal) {
        cartTotal.innerText = '¥' + total;
    }
    if (checkedCount) {
        checkedCount.innerText = count;
    }
}

function bindCartButtons() {
    var plusButtons = document.querySelectorAll('.plus-btn');
    var minusButtons = document.querySelectorAll('.minus-btn');

    for (var i = 0; i < plusButtons.length; i++) {
        plusButtons[i].onclick = function () {
            var index = this.parentNode.parentNode.parentNode.getAttribute('data-index');
            var list = getCartList();
            list[index].num = list[index].num + 1;
            saveCartList(list);
            showCart();
        };
    }

    for (var j = 0; j < minusButtons.length; j++) {
        minusButtons[j].onclick = function () {
            var index = this.parentNode.parentNode.parentNode.getAttribute('data-index');
            var list = getCartList();
            if (list[index].num > 1) {
                list[index].num = list[index].num - 1;
            }
            saveCartList(list);
            showCart();
        };
    }
}

var checkoutBtn = document.getElementById('checkoutBtn');
if (checkoutBtn) {
    checkoutBtn.onclick = function () {
        alert('当前合计：' + cartTotal.innerText);
    };
}

showCart();
