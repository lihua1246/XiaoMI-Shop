(function () {
    var optionGroups = document.querySelectorAll('.option-list');

    optionGroups.forEach(function (group) {
        group.addEventListener('click', function (event) {
            var button = event.target.closest('.option-btn');
            if (!button) {
                return;
            }

            group.querySelectorAll('.option-btn').forEach(function (item) {
                item.classList.remove('active');
            });
            button.classList.add('active');

            if (button.dataset.img) {
                var productImage = document.querySelector('.phone-img');
                if (productImage) {
                    productImage.src = button.dataset.img;
                }
            }
        });
    });
})();
