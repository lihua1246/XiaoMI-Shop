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
│   ├── common.css
│   ├── index.css
│   ├── products.css
│   ├── detail.css
│   ├── cart.css
│   └── login.css
├── js/
│   ├── main.js
│   ├── products.js
│   ├── detail.js
│   ├── cart.js
│   └── login.js
└── images/
    └── 商品图片
```

## CSS 文件负责人

| CSS 文件 | 负责人 | 样式范围 |
| --- | --- | --- |
| `css/common.css` | A 张奕扬 | 全站公共样式：页面基础样式、导航栏、页脚、容器、标题、通用按钮和公共商品卡片 |
| `css/index.css` | A 张奕扬 | 首页样式：首屏、分类入口和首页推荐区域 |
| `css/products.css` | B 殷怡诺 | 商品列表页样式：分类筛选和页面说明区域 |
| `css/detail.css` | C 罗元浩 | 所有商品详情页共用样式：商品信息、规格选择、操作按钮和参数区域 |
| `css/cart.css` | D 钟国力 | 购物车页样式：商品行、数量控件、小计和结算区域 |
| `css/login.css` | E 何立威 | 登录页样式：登录布局、表单、提示信息和辅助链接 |

## 运行方式

直接双击 `index.html` 打开，或者用 VS Code 的 Live Server 运行。

## 小组分工

| 成员 | 负责内容 |
| --- | --- |
| A 张奕扬（组长） | 首页、整体样式、项目整合 |
| B 殷怡诺 | 商品列表页 |
| C 罗元浩 | 商品详情页 |
| D 钟国力 | 购物车页 |
| E 何立威 | 登录页、页面检查 |

## 当前完成情况

- 首页可以进入商品列表、详情、购物车和登录页。
- 商品列表可以按分类显示不同商品。
- 商品详情页展示了商品图片、价格和参数。
- 购物车可以调整数量并计算合计。
- 登录页做了简单的输入判断。
