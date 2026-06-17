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

/* ========== shared cart data ========== */
(function () {
    var CART_KEY = 'xiaomiCart';

    function readCart() {
        try {
            var cart = JSON.parse(localStorage.getItem(CART_KEY) || '[]');
            return Array.isArray(cart) ? cart : [];
        } catch (error) {
            return [];
        }
    }

    function saveCart(cart) {
        localStorage.setItem(CART_KEY, JSON.stringify(cart));
    }

    function formatPrice(price) {
        return '¥' + price.toLocaleString('zh-CN');
    }

    function escapeHtml(text) {
        return String(text || '')
            .replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;')
            .replace(/"/g, '&quot;');
    }

    function normalizeProduct(rawProduct) {
        return {
            id: rawProduct.id,
            name: rawProduct.name,
            desc: rawProduct.desc,
            price: parseInt(rawProduct.price, 10),
            image: rawProduct.image || '',
            qty: 1,
            checked: true
        };
    }

    function addToCart(rawProduct) {
        var product = normalizeProduct(rawProduct);
        if (!product.id || !product.name || isNaN(product.price)) {
            return false;
        }

        var cart = readCart();
        var existing = cart.find(function (item) {
            return item.id === product.id;
        });

        if (existing) {
            existing.qty = parseInt(existing.qty, 10) + 1 || 2;
            existing.checked = true;
            if (product.image) {
                existing.image = product.image;
            }
        } else {
            cart.push(product);
        }

        saveCart(cart);
        return true;
    }

    function getProductFromButton(button) {
        var detailImage = document.querySelector('.phone-img');
        var currentImage = detailImage ? detailImage.getAttribute('src') : '';

        return {
            id: button.dataset.id,
            name: button.dataset.name,
            desc: button.dataset.desc,
            price: button.dataset.price,
            image: currentImage || button.dataset.image
        };
    }

    document.addEventListener('click', function (event) {
        var button = event.target.closest('[data-cart-action="add"]');
        if (!button) {
            return;
        }

        event.preventDefault();
        if (addToCart(getProductFromButton(button))) {
            window.location.href = button.getAttribute('href') || 'cart.html';
        }
    });

    /* ========== cart page ========== */
    var cartList = document.getElementById('cartList');
    var cartTotal = document.getElementById('cartTotal');
    var checkedCount = document.getElementById('checkedCount');
    var cartContent = document.getElementById('cartContent');
    var cartEmpty = document.getElementById('cartEmpty');

    if (!cartList) {
        return;
    }

    function getCart() {
        return readCart().map(function (item) {
            return {
                id: item.id,
                name: item.name,
                desc: item.desc,
                price: parseInt(item.price, 10),
                image: item.image || '',
                qty: Math.max(parseInt(item.qty, 10) || 1, 1),
                checked: item.checked !== false
            };
        }).filter(function (item) {
            return item.id && item.name && !isNaN(item.price);
        });
    }

    function updateTotal(cart) {
        var total = 0;
        var checked = 0;

        cart.forEach(function (item) {
            if (item.checked) {
                total += item.price * item.qty;
                checked += item.qty;
            }
        });

        if (cartTotal) {
            cartTotal.textContent = formatPrice(total);
        }
        if (checkedCount) {
            checkedCount.textContent = checked;
        }
    }

    function renderCart() {
        var cart = getCart();
        saveCart(cart);

        if (cart.length === 0) {
            cartList.innerHTML = '';
            if (cartContent) {
                cartContent.style.display = 'none';
            }
            if (cartEmpty) {
                cartEmpty.style.display = 'block';
            }
            updateTotal([]);
            return;
        }

        if (cartContent) {
            cartContent.style.display = '';
        }
        if (cartEmpty) {
            cartEmpty.style.display = 'none';
        }

        cartList.innerHTML = cart.map(function (item) {
            var visual = item.image
                ? '<span class="cart-product-visual cart-product-visual-img"><img src="' + escapeHtml(item.image) + '" alt="' + escapeHtml(item.name) + '"></span>'
                : '<span class="cart-product-visual" aria-hidden="true">' + escapeHtml(item.name.slice(0, 2)) + '</span>';

            return '<div class="cart-item" data-id="' + escapeHtml(item.id) + '" data-price="' + item.price + '">'
                + '<span class="cart-col-check">'
                + '<input type="checkbox" class="cart-checkbox" ' + (item.checked ? 'checked' : '') + '>'
                + '</span>'
                + '<span class="cart-col-product">'
                + visual
                + '<span class="cart-product-info">'
                + '<strong class="cart-product-name">' + escapeHtml(item.name) + '</strong>'
                + '<span class="cart-product-desc">' + escapeHtml(item.desc) + '</span>'
                + '</span>'
                + '</span>'
                + '<span class="cart-col-price"><span class="cart-price">' + formatPrice(item.price) + '</span></span>'
                + '<span class="cart-col-qty">'
                + '<span class="cart-qty-stepper">'
                + '<button type="button" class="qty-btn qty-minus" aria-label="减少数量">−</button>'
                + '<input type="text" class="qty-input" value="' + item.qty + '" readonly>'
                + '<button type="button" class="qty-btn qty-plus" aria-label="增加数量">+</button>'
                + '</span>'
                + '</span>'
                + '<span class="cart-col-subtotal"><span class="cart-subtotal">' + formatPrice(item.price * item.qty) + '</span></span>'
                + '</div>';
        }).join('');

        updateTotal(cart);
    }

    function updateCartItem(itemId, updater) {
        var cart = getCart();
        cart.forEach(function (item) {
            if (item.id === itemId) {
                updater(item);
            }
        });
        saveCart(cart);
        renderCart();
    }

    cartList.addEventListener('click', function (event) {
        var btn = event.target.closest('.qty-btn');
        if (!btn) {
            return;
        }

        var itemEl = btn.closest('.cart-item');
        var itemId = itemEl ? itemEl.getAttribute('data-id') : '';
        updateCartItem(itemId, function (item) {
            if (btn.classList.contains('qty-plus')) {
                item.qty += 1;
            } else if (btn.classList.contains('qty-minus') && item.qty > 1) {
                item.qty -= 1;
            }
        });
    });

    cartList.addEventListener('change', function (event) {
        if (!event.target.classList.contains('cart-checkbox')) {
            return;
        }

        var itemEl = event.target.closest('.cart-item');
        var itemId = itemEl ? itemEl.getAttribute('data-id') : '';
        updateCartItem(itemId, function (item) {
            item.checked = event.target.checked;
        });
    });

    var checkoutBtn = document.getElementById('checkoutBtn');
    if (checkoutBtn) {
        checkoutBtn.addEventListener('click', function () {
            var totalText = cartTotal ? cartTotal.textContent : '¥0';
            var countText = checkedCount ? checkedCount.textContent : '0';
            alert('已选 ' + countText + ' 件商品，合计 ' + totalText + '\n（本项目为静态演示，不涉及真实支付）');
        });
    }

    renderCart();
})();

/* ========== login page ========== */
(function () {
    var loginBtn = document.getElementById('loginBtn');
    var usernameInput = document.getElementById('username');
    var passwordInput = document.getElementById('password');
    var message = document.getElementById('loginMessage');

    if (!loginBtn || !usernameInput || !passwordInput || !message) {
        return;
    }

    function resetMessage() {
        message.innerText = '';
        message.style.color = 'red';
    }

    loginBtn.addEventListener('click', function () {
        var username = usernameInput.value;
        var password = passwordInput.value;

        if (username === '') {
            message.innerText = '请输入用户名或手机号';
            return;
        }
        if (password === '') {
            message.innerText = '请输入密码';
            return;
        }
        if (password.length < 6) {
            message.innerText = '密码长度不能少于6位';
            return;
        }

        message.style.color = 'green';
        message.innerText = '登录成功，正在跳转...';
        setTimeout(function () {
            window.location.href = 'index.html';
        }, 1000);
    });

    usernameInput.addEventListener('input', resetMessage);
    passwordInput.addEventListener('input', resetMessage);
})();
