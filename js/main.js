/**
 * ============================================================
 * main.js — 小米商城前端仿站项目 主脚本
 * ============================================================
 * 功能概述：
 *   1. 商品规格选项切换（如颜色、版本选择）
 *   2. 购物车数量加减与总价实时计算
 *   3. 登录表单前端验证
 *   4. 商品分类筛选过滤
 * ============================================================
 */

// ---------- 启动标记 ----------
// 在浏览器控制台输出加载提示，用于调试时确认脚本已正确引入并执行
console.log("小米商城前端仿站项目已加载");

// ============================================================
// 一、商品规格选项切换模块
// ============================================================
// 功能：当用户点击某个规格按钮（如"黑色"、"128GB"）时，
//       该按钮高亮为 active，同组其他按钮取消高亮。
// 原理：利用 data-option-group 属性将按钮分组，
//       同一组内的按钮互斥选中。

// 1. 获取页面上所有带有 data-option-group 属性的容器元素
//    querySelectorAll 返回一个 NodeList（类数组），可用 forEach 遍历
var optionGroups = document.querySelectorAll("[data-option-group]");

// 2. 遍历每一个规格组（例如：颜色组、版本组）
optionGroups.forEach(function (group) {

    // 2.1 在当前组内查找所有带 .option-btn 类的按钮
    var buttons = group.querySelectorAll(".option-btn");

    // 2.2 为当前组内的每一个按钮绑定点击事件
    buttons.forEach(function (button) {

        button.addEventListener("click", function () {

            // 2.3 点击后，先把同组所有按钮的 active 类移除
            //      （取消之前选中的那个按钮的高亮）
            buttons.forEach(function (item) {
                item.classList.remove("active");
            });

            // 2.4 再给当前被点击的按钮添加 active 类
            //      （让这个按钮高亮显示，表示选中）
            button.classList.add("active");
        });
    });
});

// ============================================================
// 二、购物车模块
// ============================================================
// 功能：支持商品数量加减，实时计算小计和总价。
// 页面结构约定：
//   - .cart-item              单个购物车条目容器
//   - .cart-item[data-price]  该条目的商品单价（放在 data-price 属性上）
//   - .minus-btn              数量减1按钮
//   - .plus-btn               数量加1按钮
//   - .quantity               显示当前数量的元素
//   - .subtotal               显示当前条目小计的元素
//   - #totalPrice             显示购物车总价的元素

// 1. 获取页面上所有购物车条目和总价显示元素
var cartItems = document.querySelectorAll(".cart-item");
var totalPrice = document.querySelector("#totalPrice");

/**
 * updateCartTotal —— 根据当前各条目数量和单价，重新计算小计和总价
 *
 * 计算逻辑：
 *   遍历每个 .cart-item 条目：
 *     ① 从 data-price 属性读取单价
 *     ② 从 .quantity 元素读取当前数量
 *     ③ 小计 = 单价 × 数量，更新到 .subtotal 元素
 *     ④ 累加到总价
 *   最后将总价更新到 #totalPrice 元素
 */
function updateCartTotal() {
    // 总价累加器，初始为 0
    var total = 0;

    // 遍历每一个购物车条目
    cartItems.forEach(function (item) {
        // 从 data-price 属性读取单价，Number() 将字符串转为数字
        var price = Number(item.dataset.price);
        // 从 .quantity 元素读取当前数量文本，并转为数字
        var quantity = Number(item.querySelector(".quantity").textContent);
        // 计算该条目的小计
        var subtotal = price * quantity;

        // 将小计写入 .subtotal 元素，格式为 "数字 元"
        item.querySelector(".subtotal").textContent = subtotal + " 元";
        // 将小计累加到总价
        total = total + subtotal;
    });

    // 如果页面上存在 #totalPrice 元素，更新其文本内容
    if (totalPrice) {
        totalPrice.textContent = total + " 元";
    }
}

// 2. 为每个购物车条目绑定加减按钮事件
cartItems.forEach(function (item) {

    // 2.1 在当前条目内查找 减号按钮、加号按钮、数量显示元素
    var minusBtn = item.querySelector(".minus-btn");
    var plusBtn  = item.querySelector(".plus-btn");
    var quantityText = item.querySelector(".quantity");

    // 2.2 减号按钮 —— 点击后数量减1（最小为1，防止出现0或负数）
    minusBtn.addEventListener("click", function () {
        // 获取当前数量并转为数字
        var quantity = Number(quantityText.textContent);

        // 只有数量大于1时才允许减少（保证最少购买1件）
        if (quantity > 1) {
            // 数量减1并写回 .quantity 元素
            quantityText.textContent = quantity - 1;
            // 数量变化后，重新计算总价
            updateCartTotal();
        }
    });

    // 2.3 加号按钮 —— 点击后数量加1
    plusBtn.addEventListener("click", function () {
        // 获取当前数量并转为数字
        var quantity = Number(quantityText.textContent);

        // 数量加1并写回 .quantity 元素
        quantityText.textContent = quantity + 1;
        // 数量变化后，重新计算总价
        updateCartTotal();
    });
});

// 3. 页面加载完成后，立即执行一次总价计算
//    确保初始显示的总价与各条目数据一致（防止 HTML 模板数据不同步）
updateCartTotal();

// ============================================================
// 三、登录表单验证模块
// ============================================================
// 功能：对登录表单做前端基本验证 ——
//       ① 阻止表单默认提交行为（避免页面刷新）
//       ② 检查用户名和密码是否为空
//       ③ 给出相应的提示信息
// 页面结构约定：
//   - #loginForm     登录表单元素
//   - #username      用户名输入框
//   - #password      密码输入框
//   - #loginMessage  提示信息显示区域

// 1. 获取登录表单和提示信息区域元素
var loginForm = document.querySelector("#loginForm");
var loginMessage = document.querySelector("#loginMessage");

// 2. 仅在页面存在登录表单时才绑定事件（避免在无登录页的页面上报错）
if (loginForm) {

    // 2.1 监听表单的 submit 事件
    loginForm.addEventListener("submit", function (event) {

        // 2.2 阻止浏览器的默认表单提交行为
        //     默认行为会导致页面刷新/跳转，前端单页应用需要拦截
        event.preventDefault();

        // 2.3 获取用户名输入框的值，并用 trim() 去除首尾空白字符
        var username = document.querySelector("#username").value.trim();
        // 2.4 获取密码输入框的值，并去除首尾空白字符
        var password = document.querySelector("#password").value.trim();

        // 2.5 验证：用户名或密码为空时，显示错误提示并终止提交
        if (username === "" || password === "") {
            loginMessage.textContent = "用户名和密码不能为空";
            return;  // 提前退出函数，不再往下执行
        }

        // 2.6 前端验证通过，显示成功提示
        //     实际项目中这里应发送 AJAX 请求到后端进行身份验证
        loginMessage.textContent = "登录信息填写完成，可以继续完善后端功能";
    });
}

// ============================================================
// 四、商品分类筛选模块
// ============================================================
// 功能：点击分类标签（如"全部"、"手机"、"电视"等），
//       过滤显示对应分类的商品卡片。
// 页面结构约定：
//   - .filter-tabs a              分类标签链接（带有 data-filter 属性表示分类）
//   - .product-list .product-card 商品卡片（带有 data-category 属性表示所属分类）
//
// data-filter 值说明：
//   "all"     → 显示全部商品
//   其他值     → 只显示 data-category 与之匹配的商品

// 1. 获取所有分类标签链接和所有商品卡片
var filterLinks = document.querySelectorAll(".filter-tabs a");
var productListCards = document.querySelectorAll(".product-list .product-card");

// 2. 为每一个分类标签绑定点击事件
filterLinks.forEach(function (link) {

    link.addEventListener("click", function (event) {

        // 2.1 阻止 <a> 标签的默认跳转行为（href="#" 会导致页面滚到顶部）
        event.preventDefault();

        // 2.2 从被点击标签的 data-filter 属性读取筛选条件
        //     例如：data-filter="phone" → filter = "phone"
        var filter = link.dataset.filter;

        // 2.3 移除所有标签的 active 类（取消之前的高亮）
        filterLinks.forEach(function (item) {
            item.classList.remove("active");
        });

        // 2.4 给当前点击的标签添加 active 类（高亮显示当前筛选条件）
        link.classList.add("active");

        // 2.5 遍历所有商品卡片，根据筛选条件显示或隐藏
        productListCards.forEach(function (card) {

            // 如果筛选条件是 "all"，或者卡片的 data-category 与筛选条件匹配
            // 则显示该卡片；否则隐藏
            if (filter === "all" || card.dataset.category === filter) {
                // 恢复显示：将 display 重置为空字符串
                // 空字符串会让元素回退到 CSS 中定义的默认 display 值
                card.style.display = "";
            } else {
                // 隐藏该卡片
                card.style.display = "none";
            }
        });
    });
});

// ============================================================
// 五、商品详情页规格切换模块
// ============================================================
// 功能：在商品详情页中处理选项组（版本/颜色/尺寸等）按钮切换，
//       并支持通过 data-img 属性切换商品主图。
// 页面结构约定：
//   - .detail-box                详情页容器（用于判断是否在详情页）
//   - [data-group] .option-btn   各组选项按钮
//   - .phone-img                 商品主图元素

// 仅在商品详情页执行
if (document.querySelector('.detail-box')) {
    // 获取所有分组容器
    var groups = document.querySelectorAll('[data-group]');

    groups.forEach(function (group) {
        var buttons = group.querySelectorAll('.option-btn');

        buttons.forEach(function (button) {
            button.addEventListener('click', function () {
                // 移除同组所有按钮的 active 类
                buttons.forEach(function (btn) {
                    btn.classList.remove('active');
                });
                // 给当前按钮添加 active 类
                this.classList.add('active');

                // 如果按钮有 data-img 属性且页面存在主图元素，则切换图片
                if (this.dataset.img) {
                    var imgBox = document.querySelector('.phone-img');
                    if (imgBox) {
                        imgBox.src = this.dataset.img;
                    }
                }
            });
        });
    });
}
