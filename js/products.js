var tabButtons = document.querySelectorAll('.tab-item');
var goodsCards = document.querySelectorAll('.goods-card');
var searchInput = document.getElementById('productSearch');
var clearSearchButton = document.getElementById('clearSearch');
var searchResult = document.getElementById('searchResult');
var emptyResult = document.getElementById('emptyResult');
var activeType = 'all';

function filterProducts() {
    var keyword = searchInput.value.trim().toLowerCase();
    var visibleCount = 0;

    for (var i = 0; i < goodsCards.length; i++) {
        var cardType = goodsCards[i].getAttribute('data-type');
        var cardText = goodsCards[i].innerText.toLowerCase();
        var matchesType = activeType === 'all' || activeType === cardType;
        var matchesKeyword = keyword === '' || cardText.indexOf(keyword) !== -1;

        if (matchesType && matchesKeyword) {
            goodsCards[i].style.display = 'block';
            visibleCount++;
        } else {
            goodsCards[i].style.display = 'none';
        }
    }

    searchResult.innerText = '找到 ' + visibleCount + ' 件商品';
    emptyResult.style.display = visibleCount === 0 ? 'block' : 'none';
}

for (var i = 0; i < tabButtons.length; i++) {
    tabButtons[i].onclick = function () {
        activeType = this.getAttribute('data-type');

        for (var j = 0; j < tabButtons.length; j++) {
            tabButtons[j].classList.remove('active');
        }
        this.classList.add('active');
        filterProducts();
    };
}

searchInput.oninput = filterProducts;

clearSearchButton.onclick = function () {
    searchInput.value = '';
    searchInput.focus();
    filterProducts();
};
