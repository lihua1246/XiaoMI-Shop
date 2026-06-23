var tabButtons = document.querySelectorAll('.tab-item');
var goodsCards = document.querySelectorAll('.goods-card');

for (var i = 0; i < tabButtons.length; i++) {
    tabButtons[i].onclick = function () {
        var type = this.getAttribute('data-type');

        for (var j = 0; j < tabButtons.length; j++) {
            tabButtons[j].classList.remove('active');
        }
        this.classList.add('active');

        for (var k = 0; k < goodsCards.length; k++) {
            var cardType = goodsCards[k].getAttribute('data-type');
            if (type === 'all' || type === cardType) {
                goodsCards[k].style.display = 'block';
            } else {
                goodsCards[k].style.display = 'none';
            }
        }
    };
}
