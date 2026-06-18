(function () {
    var CART_KEY = 'xiaomiCart';

    function readCart() {
        try {
            var saved = JSON.parse(localStorage.getItem(CART_KEY) || '[]');
            return Array.isArray(saved) ? saved : [];
        } catch (error) {
            return [];
        }
    }

    function saveCart(cart) {
        localStorage.setItem(CART_KEY, JSON.stringify(cart));
    }

    function priceText(price) {
        return '¥' + price.toLocaleString('zh-CN');
    }

    function htmlText(text) {
        return String(text || '')
            .replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;')
            .replace(/"/g, '&quot;');
    }

    function cartItemFrom(button) {
        var detailImage = document.querySelector('.phone-img');
        var currentImage = detailImage ? detailImage.getAttribute('src') : '';

        return {
            id: button.dataset.id,
            name: button.dataset.name,
            desc: button.dataset.desc,
            price: parseInt(button.dataset.price, 10),
            image: currentImage || button.dataset.image || '',
            qty: 1,
            checked: true
        };
    }

    function addCartItem(product) {
        if (!product.id || !product.name || isNaN(product.price)) {
            return false;
        }

        var cart = readCart();
        var sameItem = cart.find(function (item) {
            return item.id === product.id;
        });

        if (sameItem) {
            sameItem.qty = parseInt(sameItem.qty, 10) + 1 || 2;
            sameItem.checked = true;
            if (product.image) {
                sameItem.image = product.image;
            }
        } else {
            cart.push(product);
        }

        saveCart(cart);
        return true;
    }

    document.addEventListener('click', function (event) {
        var button = event.target.closest('[data-cart-action="add"]');
        if (!button) {
            return;
        }

        event.preventDefault();
        if (addCartItem(cartItemFrom(button))) {
            window.location.href = button.getAttribute('href') || 'cart.html';
        }
    });

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
            cartTotal.textContent = priceText(total);
        }
        if (checkedCount) {
            checkedCount.textContent = checked;
        }
    }

    function cartRow(item) {
        var picture = item.image
            ? '<span class="cart-product-visual cart-product-visual-img"><img src="' + htmlText(item.image) + '" alt="' + htmlText(item.name) + '"></span>'
            : '<span class="cart-product-visual" aria-hidden="true">' + htmlText(item.name.slice(0, 2)) + '</span>';

        return '<div class="cart-item" data-id="' + htmlText(item.id) + '" data-price="' + item.price + '">'
            + '<span class="cart-col-check">'
            + '<input type="checkbox" class="cart-checkbox" ' + (item.checked ? 'checked' : '') + '>'
            + '</span>'
            + '<span class="cart-col-product">'
            + picture
            + '<span class="cart-product-info">'
            + '<strong class="cart-product-name">' + htmlText(item.name) + '</strong>'
            + '<span class="cart-product-desc">' + htmlText(item.desc) + '</span>'
            + '</span>'
            + '</span>'
            + '<span class="cart-col-price"><span class="cart-price">' + priceText(item.price) + '</span></span>'
            + '<span class="cart-col-qty">'
            + '<span class="cart-qty-stepper">'
            + '<button type="button" class="qty-btn qty-minus" aria-label="减少数量">−</button>'
            + '<input type="text" class="qty-input" value="' + item.qty + '" readonly>'
            + '<button type="button" class="qty-btn qty-plus" aria-label="增加数量">+</button>'
            + '</span>'
            + '</span>'
            + '<span class="cart-col-subtotal"><span class="cart-subtotal">' + priceText(item.price * item.qty) + '</span></span>'
            + '</div>';
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

        cartList.innerHTML = cart.map(cartRow).join('');
        updateTotal(cart);
    }

    function changeItem(itemId, updater) {
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
        var button = event.target.closest('.qty-btn');
        if (!button) {
            return;
        }

        var row = button.closest('.cart-item');
        var itemId = row ? row.getAttribute('data-id') : '';
        changeItem(itemId, function (item) {
            if (button.classList.contains('qty-plus')) {
                item.qty += 1;
            } else if (button.classList.contains('qty-minus') && item.qty > 1) {
                item.qty -= 1;
            }
        });
    });

    cartList.addEventListener('change', function (event) {
        if (!event.target.classList.contains('cart-checkbox')) {
            return;
        }

        var row = event.target.closest('.cart-item');
        var itemId = row ? row.getAttribute('data-id') : '';
        changeItem(itemId, function (item) {
            item.checked = event.target.checked;
        });
    });

    var checkoutBtn = document.getElementById('checkoutBtn');
    if (checkoutBtn) {
        checkoutBtn.addEventListener('click', function () {
            var totalText = cartTotal ? cartTotal.textContent : '¥0';
            var countText = checkedCount ? checkedCount.textContent : '0';
            alert('已选 ' + countText + ' 件商品，合计 ' + totalText);
        });
    }

    renderCart();
})();
