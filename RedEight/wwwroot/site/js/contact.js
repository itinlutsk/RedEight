(function () {
    document.querySelectorAll('.reveal').forEach(function (el) {
        el.classList.add('visible');
    });

    var msg     = document.getElementById('msg');
    var charCnt = document.getElementById('charCount');
    if (msg && charCnt) {
        msg.addEventListener('input', function () {
            var n = msg.value.length, max = 1200;
            charCnt.textContent = n + ' / ' + max;
            charCnt.classList.toggle('warn', n > max * .9);
        });
    }

    function setError(id, errId, ok) {
        var el = document.getElementById(id);
        var er = document.getElementById(errId);
        if (el) el.classList.toggle('error', !ok);
        if (er) er.classList.toggle('visible', !ok);
        return ok;
    }

    function clearErr(id, errId) {
        var el = document.getElementById(id);
        if (!el) return;
        el.addEventListener('input', function () {
            el.classList.remove('error');
            var er = document.getElementById(errId);
            if (er) er.classList.remove('visible');
        });
    }

    ['fname', 'lname', 'email', 'service', 'msg'].forEach(function (id) {
        clearErr(id, 'err-' + id);
    });

    document.getElementById('contactForm').addEventListener('submit', function (e) {
        e.preventDefault();

        var fname   = document.getElementById('fname').value.trim();
        var lname   = document.getElementById('lname').value.trim();
        var emailV  = document.getElementById('email').value.trim();
        var service = document.getElementById('service').value;
        var msgV    = document.getElementById('msg').value.trim();

        var emailRx = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        var ok = true;
        ok = setError('fname',   'err-fname',   fname.length > 0)       && ok;
        ok = setError('lname',   'err-lname',   lname.length > 0)       && ok;
        ok = setError('email',   'err-email',   emailRx.test(emailV))   && ok;
        ok = setError('service', 'err-service', service.length > 0)     && ok;
        ok = setError('msg',     'err-msg',     msgV.length > 0)        && ok;
        if (!ok) return;

        var btn = document.getElementById('submitBtn');
        btn.classList.add('loading');
        btn.disabled = true;

        setTimeout(function () {
            btn.classList.remove('loading');
            btn.disabled = false;
            document.getElementById('formCard').classList.add('success-shown');
            document.getElementById('formSuccess').classList.add('visible');
        }, 1200);
    });

    window.resetForm = function () {
        document.getElementById('contactForm').reset();
        if (charCnt) { charCnt.textContent = '0 / 1200'; charCnt.classList.remove('warn'); }
        document.getElementById('formCard').classList.remove('success-shown');
        document.getElementById('formSuccess').classList.remove('visible');
    };
})();
