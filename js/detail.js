var optionButtons = document.querySelectorAll('.option-btn');
var productImage = document.querySelector('.phone-img');
var addCartButton = document.querySelector('.buy-button');

for (var i = 0; i < optionButtons.length; i++) {
    optionButtons[i].onclick = function () {
        var group = this.parentNode;
        var buttons = group.querySelectorAll('.option-btn');

        for (var j = 0; j < buttons.length; j++) {
            buttons[j].classList.remove('active');
        }

        this.classList.add('active');

        if (productImage && this.dataset.image) {
            productImage.src = this.dataset.image;
        }
    };
}

if (addCartButton) {
    addCartButton.onclick = function (event) {
        event.preventDefault();

        var cart = JSON.parse(localStorage.getItem('xiaomiCart') || '[]');
        var name = document.querySelector('.detail-info h1').innerText;
        var priceText = document.querySelector('.detail-price').innerText;
        var description = document.querySelector('.detail-desc').innerText;
        var selectedOptions = document.querySelectorAll('.option-btn.active');
        var optionText = [];

        for (var i = 0; i < selectedOptions.length; i++) {
            optionText.push(selectedOptions[i].innerText);
        }

        var product = {
            id: location.pathname.split('/').pop(),
            name: name,
            price: Number(priceText.replace(/\D/g, '')),
            image: productImage.getAttribute('src'),
            description: optionText.length > 0 ? optionText.join(' / ') : description,
            quantity: 1
        };
        var existingProduct = null;

        for (var j = 0; j < cart.length; j++) {
            if (cart[j].id === product.id) {
                existingProduct = cart[j];
                break;
            }
        }

        if (existingProduct) {
            existingProduct.quantity++;
            existingProduct.image = product.image;
            existingProduct.description = product.description;
        } else {
            cart.push(product);
        }

        localStorage.setItem('xiaomiCart', JSON.stringify(cart));
        location.href = 'cart.html';
    };
}
