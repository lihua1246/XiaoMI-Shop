# XiaoMI-Shop

这是一个小米商城静态网页练习项目，主要用 HTML、CSS 和 JavaScript 完成页面展示。

项目没有连接后端，也没有真实的登录、付款和订单功能，主要用于前端基础课程展示。

## 页面内容

| 页面 | 文件 |
| --- | --- |
| 首页 | `index.html` |
| 商品列表 | `products.html` |
| 商品详情 | `detail-*.html` |
| 购物车 | `cart.html` |
| 登录页 | `login.html` |

## 使用到的知识

- HTML 页面结构
- CSS 盒模型、布局、颜色和简单响应式
- JavaScript 点击事件、表单判断、数量计算
- 多个页面之间的跳转

## 文件夹说明

```text
XiaoMI-Shop/
├── index.html
├── products.html
├── detail-*.html
├── cart.html
├── login.html
├── css/
│   └── style.css
├── js/
│   ├── main.js
│   ├── products.js
│   ├── detail.js
│   ├── cart.js
│   └── login.js
└── images/
    └── 商品图片
```

## 运行方式

直接双击 `index.html` 打开，或者用 VS Code 的 Live Server 运行。

## 小组分工

| 成员 | 负责内容 |
| --- | --- |
| A 张奕扬（组长） | 首页、整体样式、项目整合 |
| B 段怡诺 | 商品列表页 |
| C 罗元浩 | 商品详情页 |
| D 钟国力 | 购物车页 |
| E 何立威 | 登录页、页面检查 |

## 当前完成情况

- 首页可以进入商品列表、详情、购物车和登录页。
- 商品列表可以按分类显示不同商品。
- 商品详情页展示了商品图片、价格和参数。
- 购物车可以调整数量并计算合计。
- 登录页做了简单的输入判断。
