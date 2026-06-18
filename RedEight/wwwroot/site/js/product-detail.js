(function () {
    var imgs = window.r8Images || [];
    var currentIdx = 0;
    window.currentIdx = 0;

    window.setImg = function (idx) {
        var mainImg = document.getElementById('mainImg');
        mainImg.classList.add('switching');
        setTimeout(function () {
            mainImg.src = imgs[idx];
            mainImg.classList.remove('switching');
        }, 180);
        document.querySelectorAll('.gallery-thumb').forEach(function (t, i) {
            t.classList.toggle('active', i === idx);
        });
        var counter = document.getElementById('galleryCounter');
        if (counter) counter.textContent = (idx + 1) + ' / ' + imgs.length;
        currentIdx = idx;
        window.currentIdx = idx;
    };

    window.selectFinish = function (btn, name) {
        document.querySelectorAll('.finish-swatch').forEach(function (s) {
            s.classList.remove('active');
        });
        btn.classList.add('active');
        var el = document.getElementById('finishName');
        if (el) el.textContent = name;
    };

    var overlay = document.getElementById('lb');
    var lbImg   = document.getElementById('lbImg');
    var dotsEl  = document.getElementById('lbDots');
    var lbIdx   = 0;

    function buildDots() {
        if (!dotsEl) return;
        dotsEl.innerHTML = imgs.map(function (_, i) {
            return '<button class="lb-dot' + (i === lbIdx ? ' active' : '') +
                '" onclick="lbDot(' + i + ');event.stopPropagation()"></button>';
        }).join('');
    }

    window.lbOpen = function (idx) {
        lbIdx = idx;
        lbImg.src = imgs[lbIdx];
        buildDots();
        overlay.classList.add('lb-open');
        document.body.style.overflow = 'hidden';
    };

    window.lbClose = function (e) {
        if (e && e.target !== overlay) return;
        overlay.classList.remove('lb-open');
        document.body.style.overflow = '';
    };

    window.lbCloseForce = function () {
        overlay.classList.remove('lb-open');
        document.body.style.overflow = '';
    };

    window.lbNav = function (dir) {
        if (!imgs.length) return;
        lbIdx = (lbIdx + dir + imgs.length) % imgs.length;
        lbImg.src = imgs[lbIdx];
        buildDots();
    };

    window.lbDot = function (i) {
        lbIdx = i;
        lbImg.src = imgs[i];
        buildDots();
    };

    document.addEventListener('keydown', function (e) {
        if (!overlay.classList.contains('lb-open')) return;
        if (e.key === 'ArrowLeft')  window.lbNav(-1);
        if (e.key === 'ArrowRight') window.lbNav(1);
        if (e.key === 'Escape')     window.lbCloseForce();
    });
})();
