console.log('XiaoMI-Shop project loaded');

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
