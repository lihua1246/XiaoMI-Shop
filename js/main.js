(function () {
    var currentPage = location.pathname.split('/').pop() || 'index.html';

    document.querySelectorAll('.main-nav a').forEach(function (link) {
        if (link.getAttribute('href') === currentPage) {
            link.classList.add('active');
        }
    });
})();
