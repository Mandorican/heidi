(function () {
  var root = document.documentElement;
  var stored = localStorage.getItem('zeta-theme');
  var initial = stored || 'light';
  if (initial === 'dark') root.setAttribute('data-theme', 'dark');

  document.getElementById('themeToggle').addEventListener('click', function () {
    var isDark = root.getAttribute('data-theme') === 'dark';
    if (isDark) {
      root.removeAttribute('data-theme');
      localStorage.setItem('zeta-theme', 'light');
    } else {
      root.setAttribute('data-theme', 'dark');
      localStorage.setItem('zeta-theme', 'dark');
    }
  });

  var navToggle = document.getElementById('navToggle');
  var navLinks = document.getElementById('navLinks');

  if (navToggle && navLinks) {
    navToggle.addEventListener('click', function () {
      var isOpen = navLinks.classList.toggle('open');
      navToggle.classList.toggle('open', isOpen);
      navToggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
    });

    navLinks.querySelectorAll('.nav-link').forEach(function (link) {
      link.addEventListener('click', function () {
        navLinks.classList.remove('open');
        navToggle.classList.remove('open');
        navToggle.setAttribute('aria-expanded', 'false');
      });
    });
  }

  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var glitchRingEls = document.querySelectorAll('.glitch-ring');
  var glitchNameEls = document.querySelectorAll('.glitch-name');
  var scrambleChars = '!<>-_\\/[]{}—=+*^?#0123456789';

  function scrambleText(el, duration) {
    var target = el.querySelector('.name-dark') || el;
    var original = target.textContent;
    var length = original.length;
    var frame = 0;
    var totalFrames = Math.max(1, Math.round(duration / 40));
    var interval = setInterval(function () {
      frame++;
      var revealCount = Math.floor((frame / totalFrames) * length);
      var out = '';
      for (var i = 0; i < length; i++) {
        if (original[i] === ' ') {
          out += ' ';
        } else if (i < revealCount) {
          out += original[i];
        } else {
          out += scrambleChars[Math.floor(Math.random() * scrambleChars.length)];
        }
      }
      target.textContent = out;
      if (frame >= totalFrames) {
        clearInterval(interval);
        target.textContent = original;
      }
    }, 40);
  }

  if ((glitchRingEls.length || glitchNameEls.length) && !reduceMotion) {
    (function scheduleGlitch() {
      var delay = 5000 + Math.random() * 5000;
      setTimeout(function () {
        var isDark = root.getAttribute('data-theme') === 'dark';

        glitchRingEls.forEach(function (el) { el.classList.add('is-glitching'); });
        setTimeout(function () {
          glitchRingEls.forEach(function (el) { el.classList.remove('is-glitching'); });
        }, 280);

        if (isDark) {
          glitchNameEls.forEach(function (el) {
            el.classList.add('is-glitching');
            scrambleText(el, 280);
            setTimeout(function () { el.classList.remove('is-glitching'); }, 280);
          });
        }

        scheduleGlitch();
      }, delay);
    })();
  }
})();
