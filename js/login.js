var loginBtn = document.getElementById('loginBtn');
var usernameInput = document.getElementById('username');
var passwordInput = document.getElementById('password');
var message = document.getElementById('loginMessage');

if (loginBtn) {
    loginBtn.onclick = function () {
        var username = usernameInput.value;
        var password = passwordInput.value;

        if (username === '') {
            message.innerText = '请输入用户名或手机号';
            message.style.color = 'red';
        } else if (password === '') {
            message.innerText = '请输入密码';
            message.style.color = 'red';
        } else if (password.length < 6) {
            message.innerText = '密码长度不能少于6位';
            message.style.color = 'red';
        } else {
            message.innerText = '登录成功';
            message.style.color = 'green';
        }
    };
}
