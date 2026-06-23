var cartList = document.getElementById('cartList');
var cartTotal = document.getElementById('cartTotal');
var checkedCount = document.getElementById('checkedCount');

function countTotal() {
    var items = document.querySelectorAll('.cart-item');
    var total = 0;
    var count = 0;

    for (var i = 0; i < items.length; i++) {
        var price = Number(items[i].getAttribute('data-price'));
        var input = items[i].querySelector('.qty-input');
        var subtotal = items[i].querySelector('.cart-subtotal');
        var num = Number(input.value);

        subtotal.innerText = '¥' + price * num;
        total += price * num;
        count += num;
    }

    cartTotal.innerText = '¥' + total;
    checkedCount.innerText = count;
}

function bindButtons() {
    var plusButtons = document.querySelectorAll('.plus-btn');
    var minusButtons = document.querySelectorAll('.minus-btn');

    for (var i = 0; i < plusButtons.length; i++) {
        plusButtons[i].onclick = function () {
            var input = this.parentNode.querySelector('.qty-input');
            input.value = Number(input.value) + 1;
            countTotal();
        };
    }

    for (var j = 0; j < minusButtons.length; j++) {
        minusButtons[j].onclick = function () {
            var input = this.parentNode.querySelector('.qty-input');
            if (Number(input.value) > 1) {
                input.value = Number(input.value) - 1;
            }
            countTotal();
        };
    }
}

var checkoutBtn = document.getElementById('checkoutBtn');
if (cartList) {
    bindButtons();
    countTotal();
}

if (checkoutBtn) {
    checkoutBtn.onclick = function () {
        alert('当前合计：' + cartTotal.innerText);
    };
}
