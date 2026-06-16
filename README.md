# XiaoMI-Shop

小米商城前端仿站实训项目。项目使用原生 HTML、CSS 和 JavaScript 完成静态页面、商品展示、页面跳转和基础交互，适合作为前端基础实训与团队协作练习。

## 项目范围

- 纯前端静态页面，不接入后端数据库。
- 不实现真实登录、订单、支付和库存。
- 不引入 Vue、React、打包工具或后端服务。
- 页面可直接用浏览器打开，也可以用 VS Code Live Server 预览。

## 已有页面

| 页面 | 文件 |
| --- | --- |
| 首页 | `index.html` |
| 商品列表 | `products.html` |
| Xiaomi 15 详情 | `detail.html` |
| Redmi K80 详情 | `detail2.html` |
| Redmi Note 14 详情 | `detail3.html` |
| 小米电视 S Pro 详情 | `detail4.html` |
| Redmi Book Pro 详情 | `detail5.html` |
| Xiaomi Pad 7 详情 | `detail6.html` |
| 购物车 | `cart.html` |
| 登录 | `login.html` |

## 目录结构

```text
XiaoMI-Shop/
├── index.html
├── products.html
├── detail.html
├── detail2.html
├── detail3.html
├── detail4.html
├── detail5.html
├── detail6.html
├── cart.html
├── login.html
├── css/
│   └── style.css
├── js/
│   ├── main.js
│   └── products.js
├── images/
│   └── 商品图片素材
├── README.md
└── 团队协作开发规范.md
```

## 运行方式

1. 直接双击 `index.html` 打开。
2. 或使用 VS Code Live Server，从 `index.html` 进入项目。

## 分工

| 成员 | 负责内容 |
| --- | --- |
| A 张奕扬（组长） | 项目框架、首页、公共样式、最终整合 |
| B 段怡诺 | 商品列表页 |
| C 罗元浩 | 商品详情页 |
| D 钟国力 | 购物车页 |
| E 何立威 | 登录页和测试记录 |

## 协作约定

- 开发前先阅读 `团队协作开发规范.md`。
- 不直接在 `main` 分支开发，功能开发使用 `feat/...` 分支。
- 每位成员只修改自己负责的页面和相关样式/脚本。
- 提交前检查是否误改其他成员文件。
- 组长统一检查后合并到 `main`。

## 当前整合状态

- 首页和商品列表页已接入基础展示。
- 商品列表前 6 个商品已连接到对应详情页。
- 商品详情页已接入真实商品图片素材，Xiaomi 15 暂无图片素材，当前保留文字视觉占位。
- `js/main.js` 保持公共交互逻辑简洁，避免混入其他成员未完成页面的复杂脚本。
