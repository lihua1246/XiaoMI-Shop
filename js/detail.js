var optionButtons = document.querySelectorAll('.option-btn');

for (var i = 0; i < optionButtons.length; i++) {
    optionButtons[i].onclick = function () {
        var group = this.parentNode;
        var buttons = group.querySelectorAll('.option-btn');

        for (var j = 0; j < buttons.length; j++) {
            buttons[j].classList.remove('active');
        }

        this.classList.add('active');

        var img = this.getAttribute('data-img');
        var productImage = document.querySelector('.phone-img');
        if (img && productImage) {
            productImage.src = img;
        }
    };
}
