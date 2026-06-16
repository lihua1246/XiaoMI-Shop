const goodsData = [
    {
        name: 'Xiaomi 15',
        desc: '旗舰影像手机',
        price: '3999 元起',
        type: 'phone',
        label: '15'
    },
    {
        name: 'Redmi K80',
        desc: '性能旗舰手机',
        price: '2499 元起',
        type: 'phone',
        label: 'K80'
    },
    {
        name: 'Redmi Note 14',
        desc: '长续航大屏手机',
        price: '1399 元起',
        type: 'phone',
        label: 'N14'
    },
    {
        name: '小米电视 S Pro',
        desc: '高刷智能电视',
        price: '2999 元起',
        type: 'tv',
        label: 'TV'
    },
    {
        name: 'Redmi Book Pro',
        desc: '轻薄办公笔记本',
        price: '4599 元起',
        type: 'laptop',
        label: 'Book'
    },
    {
        name: 'Xiaomi Pad 7',
        desc: '学习娱乐平板',
        price: '1999 元起',
        type: 'device',
        label: 'Pad'
    },
    {
        name: '米家空调',
        desc: '节能智能空调',
        price: '2299 元起',
        type: 'home',
        label: 'AC'
    },
    {
        name: '小米手表',
        desc: '运动健康助手',
        price: '699 元起',
        type: 'device',
        label: 'Watch'
    }
];

const goodsContainer = document.getElementById('goodsContainer');
const tabs = document.querySelectorAll('.tab-item');

function renderGoods(list) {
    if (!goodsContainer) {
        return;
    }

    if (list.length === 0) {
        goodsContainer.innerHTML = '<div class="empty-goods">暂无该分类商品</div>';
        return;
    }

    goodsContainer.innerHTML = list.map((item) => `
        <article class="goods-card" data-type="${item.type}">
            <div class="goods-visual" aria-hidden="true">${item.label}</div>
            <h2 class="goods-name">${item.name}</h2>
            <p class="goods-desc">${item.desc}</p>
            <div class="goods-price">${item.price}</div>
            <button class="detail-btn" type="button" data-product="${item.name}">查看详情</button>
        </article>
    `).join('');
}

if (goodsContainer) {
    renderGoods(goodsData);

    tabs.forEach((tab) => {
        tab.addEventListener('click', () => {
            tabs.forEach((item) => item.classList.remove('active'));
            tab.classList.add('active');

            const selectType = tab.dataset.type;
            const list = selectType === 'all'
                ? goodsData
                : goodsData.filter((item) => item.type === selectType);

            renderGoods(list);
        });
    });

    goodsContainer.addEventListener('click', (event) => {
        const button = event.target.closest('.detail-btn');
        if (!button) {
            return;
        }

        alert(`进入【${button.dataset.product}】商品详情页`);
    });
}
