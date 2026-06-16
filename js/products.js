const goodsData = [
    {
        name: 'Xiaomi 15',
        description: '新一代旗舰手机，高清影像与长续航体验',
        price: '3999 元起',
        type: 'phone',
        label: '15',
        detailUrl: 'detail.html'
    },
    {
        name: 'Redmi K80',
        description: '双芯旗舰，狂暴登场',
        price: '2249 元起',
        type: 'phone',
        label: 'K80',
        image: 'images/redmi-k80-main.png',
        detailUrl: 'detail2.html'
    },
    {
        name: 'Redmi Note 14',
        description: '真抗摔，真防水，长续航',
        price: '1349 元起',
        type: 'phone',
        label: 'N14',
        image: 'images/redmi-note14-blue.png',
        detailUrl: 'detail3.html'
    },
    {
        name: '小米电视 S Pro',
        description: 'Mini LED 画质新旗舰，288Hz 超高刷',
        price: '2699 元起',
        type: 'tv',
        label: 'TV',
        image: 'images/xiaomi-tv-s-pro.png',
        detailUrl: 'detail4.html'
    },
    {
        name: 'Redmi Book Pro',
        description: '80W 狂暴性能，3.1K 165Hz 高刷高亮屏',
        price: '7299 元起',
        type: 'laptop',
        label: 'Book',
        image: 'images/redmi-book-pro.png',
        detailUrl: 'detail5.html'
    },
    {
        name: 'Xiaomi Pad 7',
        description: '11.2 英寸 3.2K 高清高刷屏',
        price: '1999 元起',
        type: 'device',
        label: 'Pad',
        image: 'images/xiaomi-pad7-blue.png',
        detailUrl: 'detail6.html'
    },
    {
        name: '米家空调',
        description: '节能智能空调',
        price: '2299 元起',
        type: 'home',
        label: '空调'
    },
    {
        name: '小米手表',
        description: '运动健康助手',
        price: '699 元起',
        type: 'device',
        label: 'Watch'
    }
];

const goodsContainer = document.getElementById('goodsContainer');
const tabs = document.querySelectorAll('.tab-item');

function displayGoods(list) {
    if (!goodsContainer) {
        return;
    }

    if (list.length === 0) {
        goodsContainer.innerHTML = '<div class="empty-goods">暂无该分类商品</div>';
        return;
    }

    let html = '';
    for (let i = 0; i < list.length; i++) {
        var item = list[i];
        var visual = item.image
            ? '<div class="goods-visual goods-visual-image"><img src="' + item.image + '" alt="' + item.name + '"></div>'
            : '<div class="goods-visual" aria-hidden="true">' + item.label + '</div>';
        var detailControl = item.detailUrl
            ? '<a class="detail-btn" href="' + item.detailUrl + '">查看详情</a>'
            : '<button class="detail-btn" type="button" data-product="' + item.name + '">查看详情</button>';
        html += '<article class="goods-card" data-type="' + item.type + '">'
            + visual
            + '<h2 class="goods-name">' + item.name + '</h2>'
            + '<p class="goods-desc">' + item.description + '</p>'
            + '<div class="goods-price">' + item.price + '</div>'
            + detailControl
            + '</article>';
    }
    goodsContainer.innerHTML = html;
}

if (goodsContainer) {
    displayGoods(goodsData);

    tabs.forEach((tab) => {
        tab.addEventListener('click', () => {
            tabs.forEach((item) => item.classList.remove('active'));
            tab.classList.add('active');

            const selectType = tab.dataset.type;
            const list = selectType === 'all'
                ? goodsData
                : goodsData.filter((item) => item.type === selectType);

            displayGoods(list);
        });
    });

    goodsContainer.addEventListener('click', (event) => {
        const button = event.target.closest('.detail-btn');
        if (!button) {
            return;
        }

        alert(`暂未配置「${button.dataset.product}」商品详情页`);
    });
}
