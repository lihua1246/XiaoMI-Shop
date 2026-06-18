(function () {
    var loginBtn = document.getElementById('loginBtn');
    var usernameInput = document.getElementById('username');
    var passwordInput = document.getElementById('password');
    var message = document.getElementById('loginMessage');

    if (!loginBtn || !usernameInput || !passwordInput || !message) {
        return;
    }

    function clearMessage() {
        message.innerText = '';
        message.style.color = 'red';
    }

    loginBtn.addEventListener('click', function () {
        var username = usernameInput.value.trim();
        var password = passwordInput.value;

        if (username === '') {
            message.innerText = '请输入用户名或手机号';
            return;
        }
        if (password === '') {
            message.innerText = '请输入密码';
            return;
        }
        if (password.length < 6) {
            message.innerText = '密码长度不能少于6位';
            return;
        }

        message.style.color = 'green';
        message.innerText = '登录成功，正在跳转...';
        setTimeout(function () {
            window.location.href = 'index.html';
        }, 1000);
    });

    usernameInput.addEventListener('input', clearMessage);
    passwordInput.addEventListener('input', clearMessage);
})();
