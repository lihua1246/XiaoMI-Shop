/* ========== detail page ========== */
document.querySelectorAll('.option-list').forEach((optionList) => {
    optionList.addEventListener('click', (event) => {
        const button = event.target.closest('.option-btn');
        if (!button) {
            return;
        }

        optionList.querySelectorAll('.option-btn').forEach((item) => {
            item.classList.remove('active');
        });
        button.classList.add('active');

        if (button.dataset.img) {
            const detailImage = document.querySelector('.phone-img');
            if (detailImage) {
                detailImage.src = button.dataset.img;
            }
        }
    });
});

/* ========== cart page ========== */
(function () {
    var cartList = document.getElementById('cartList');
    var cartTotal = document.getElementById('cartTotal');
    var checkedCount = document.getElementById('checkedCount');
    var cartContent = document.getElementById('cartContent');
    var cartEmpty = document.getElementById('cartEmpty');

    if (!cartList) {
        return;
    }

    /* 格式化价格为 ¥x,xxx */
    function formatPrice(price) {
        return '¥' + price.toLocaleString('zh-CN');
    }

    /* 更新单个商品小计 */
    function updateSubtotal(item) {
        var price = parseInt(item.getAttribute('data-price'), 10);
        var qtyInput = item.querySelector('.qty-input');
        var subtotalEl = item.querySelector('.cart-subtotal');
        var qty = parseInt(qtyInput.value, 10);

        if (isNaN(qty) || qty < 1) {
            qty = 1;
            qtyInput.value = 1;
        }

        var subtotal = price * qty;
        subtotalEl.textContent = formatPrice(subtotal);
    }

    /* 更新底部总价和已选件数 */
    function updateTotal() {
        var items = cartList.querySelectorAll('.cart-item');
        var total = 0;
        var checked = 0;

        items.forEach(function (item) {
            var checkbox = item.querySelector('.cart-checkbox');
            if (checkbox && checkbox.checked) {
                var qtyInput = item.querySelector('.qty-input');
                var price = parseInt(item.getAttribute('data-price'), 10);
                var qty = parseInt(qtyInput.value, 10);
                if (!isNaN(price) && !isNaN(qty) && qty >= 1) {
                    total += price * qty;
                    checked += qty;
                }
            }
        });

        if (cartTotal) {
            cartTotal.textContent = formatPrice(total);
        }
        if (checkedCount) {
            checkedCount.textContent = checked;
        }
    }

    /* 数量加减按钮 */
    cartList.addEventListener('click', function (event) {
        var btn = event.target.closest('.qty-btn');
        if (!btn) {
            return;
        }

        var item = btn.closest('.cart-item');
        var qtyInput = item.querySelector('.qty-input');
        var currentQty = parseInt(qtyInput.value, 10);

        if (isNaN(currentQty)) {
            currentQty = 1;
        }

        if (btn.classList.contains('qty-plus')) {
            /* 增加数量 */
            qtyInput.value = currentQty + 1;
        } else if (btn.classList.contains('qty-minus')) {
            /* 减少数量，不小于 1 */
            if (currentQty > 1) {
                qtyInput.value = currentQty - 1;
            }
        }

        updateSubtotal(item);
        updateTotal();
    });

    /* 复选框变化 */
    cartList.addEventListener('change', function (event) {
        if (event.target.classList.contains('cart-checkbox')) {
            updateTotal();
        }
    });

    /* 结算按钮 */
    var checkoutBtn = document.getElementById('checkoutBtn');
    if (checkoutBtn) {
        checkoutBtn.addEventListener('click', function () {
            var totalText = cartTotal ? cartTotal.textContent : '¥0';
            var countText = checkedCount ? checkedCount.textContent : '0';
            alert('已选 ' + countText + ' 件商品，合计 ' + totalText + '\n（本项目为静态演示，不涉及真实支付）');
        });
    }

    /* 初始化：计算所有小计和总价 */
    var allItems = cartList.querySelectorAll('.cart-item');
    allItems.forEach(function (item) {
        updateSubtotal(item);
    });
    updateTotal();
})();
