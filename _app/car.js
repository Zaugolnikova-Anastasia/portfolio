(function () {
  var B = '/portfolio/assets/work/carousel/';
  var BANNERS = [
    { src: 'oiro-1', w: 720, h: 400, t: 'OIRO', s: 'Бельё · «Надень настроение»' },
    { src: 'kaspersky-1', w: 1920, h: 1080, t: 'Kaspersky', s: '«Балансируешь работу и жизнь?» · скидка до 20%' },
    { src: 'tanuki-1', w: 1680, h: 568, t: 'Тануки', s: 'Промо «2 по цене 1» на роллы' },
    { src: 'farsh', w: 1920, h: 1080, t: '#FARШ', s: 'Франшиза бургерной · 70+ ресторанов' },
    { src: 'oiro-2', w: 720, h: 400, t: 'OIRO', s: 'Бельё · «Надень настроение»' },
    { src: 'kaspersky-2', w: 1920, h: 1080, t: 'Kaspersky', s: '«Прыгай в сеть, 6-7!» · защита для детей' },
    { src: 'tanuki-3', w: 1680, h: 568, t: 'Тануки', s: 'Промо «2 по цене 1» на роллы' },
    { src: 'medwebinar', w: 1440, h: 480, t: 'Вебинары для врачей', s: 'Образовательная программа · ноябрь 2026' },
    { src: 'villeroy', w: 988, h: 371, t: 'Villeroy & Boch', s: 'Новая коллекция посуды' },
    { src: 'tanuki-2', w: 688, h: 234, t: 'Тануки', s: '1 + 1 = 1 · акция на роллы' },
    { src: 'tnf-rsya', w: 4668, h: 1504, t: 'TNF EXPO', s: 'Рекламные баннеры РСЯ · три визуальных решения' },
    { src: 'tnf-site', w: 2610, h: 1732, t: 'TNF EXPO', s: 'Главный баннер сайта · десктоп и мобайл' },
    { src: 'tnf', w: 1600, h: 900, t: 'TNF EXPO', s: 'Форум ТЭК · 308 макетов: РСЯ, сайт, email' }
  ];
  var INFO = [
    { src: 'ig-1', w: 900, h: 1200, t: 'Дон Баллон', s: 'Набор шаров к 23 февраля' },
    { src: 'ig-2', w: 900, h: 1200, t: 'Дон Баллон', s: 'В офисе · поздравьте коллег' },
    { src: 'ig-3', w: 900, h: 1200, t: 'Дон Баллон', s: 'Дома · праздник с порога' },
    { src: 'ig-4', w: 900, h: 1200, t: 'Дон Баллон', s: 'Состав набора' },
    { src: 'ig-5', w: 900, h: 1200, t: 'Дон Баллон', s: 'Внимание: тальк на шарах' },
    { src: 'ig-bag', w: 900, h: 1200, t: 'Danzla', s: 'Сумка женская · экозамша' },
    { src: 'ig-necklace', w: 1200, h: 1607, t: 'Колье', s: 'Серебро 925' },
    { src: 'ig-6', w: 1135, h: 1514, t: 'Health Form', s: 'Магний цитрат 600 мг' },
    { src: 'ig-7', w: 1132, h: 1509, t: 'Health Form', s: 'Рекомендации по применению' },
    { src: 'ig-8', w: 1132, h: 1509, t: 'Health Form', s: 'Симптомы' },
    { src: 'ig-9', w: 1135, h: 1514, t: 'Celimax', s: 'Сыворотка «Нони»' },
    { src: 'ig-10', w: 1132, h: 1509, t: 'Celimax', s: 'Эффективный уход' },
    { src: 'ig-11', w: 1135, h: 1514, t: 'Celimax', s: 'Эффект до/после' },
    { src: 'ig-12', w: 1135, h: 1514, t: 'Супер Пупс', s: 'Набор футболок ×3' },
    { src: 'ig-13', w: 1141, h: 1521, t: 'Супер Пупс', s: '3 шт в наборе' },
    { src: 'ig-14', w: 1135, h: 1514, t: 'Супер Пупс', s: 'Футболка для малыша' },
    { src: 'ig-15', w: 1135, h: 1514, t: 'Health Form', s: 'Магний цитрат + B6' },
    { src: 'ig-16', w: 1132, h: 1509, t: 'Health Form', s: 'Рекомендации по применению' },
    { src: 'ig-17', w: 1135, h: 1514, t: 'Health Form', s: 'Симптомы' },
    { src: 'ig-18', w: 1130, h: 1507, t: 'Sayfun', s: 'Набор для украшений' },
    { src: 'ig-19', w: 1130, h: 1507, t: 'Sayfun', s: 'Как собрать' },
    { src: 'ig-20', w: 1136, h: 1523, t: 'Платье макси', s: 'Трикотажное платье' },
    { src: 'ig-vibro', w: 1131, h: 1508, t: 'Виброплатформа', s: 'Ключевые характеристики' }
  ];

  var EMAILS = [
    { src: 'email-ambdoc', video: 1, w: 700, h: 3014, t: '«Амбулаторный врач»', s: 'Анонс вебинаров · анимированное письмо' },
    { src: 'email-tnf-1', w: 600, h: 1548, t: 'TNF EXPO', s: '«Что вас ждёт на TNF EXPO?» · тёмная версия' },
    { src: 'email-tnf-2', w: 600, h: 1696, t: 'TNF EXPO', s: '«Первый день EXPO» · программа дня' },
    { src: 'email-tnf-3', w: 600, h: 1410, t: 'TNF EXPO', s: '«Получите доступ в ТЭК» · BUSINESS формат' }
  ];

  var reduce = window.matchMedia && matchMedia('(prefers-reduced-motion: reduce)').matches;

  function el(tag, cls, html) { var e = document.createElement(tag); if (cls) e.className = cls; if (html != null) e.innerHTML = html; return e; }

  /* ---------- lightbox ---------- */
  var lb, lbImg, lbCap, lbCount, lbList, lbIdx;
  function lbBuild() {
    lb = el('div', 'zc-lb'); lb.setAttribute('role', 'dialog'); lb.setAttribute('aria-modal', 'true');
    lb.innerHTML = '<div class="zc-lb__bar"><span class="zc-lb__cap"></span><span class="zc-lb__count"></span><button type="button" class="zc-lb__close">Закрыть</button></div>' +
      '<div class="zc-lb__stage"><button type="button" class="zc-lb__nav zc-lb__nav--prev" aria-label="Назад">←</button><div class="zc-lb__doc"><img alt=""><video muted loop playsinline></video></div><button type="button" class="zc-lb__nav zc-lb__nav--next" aria-label="Вперёд">→</button></div>';
    document.body.appendChild(lb);
    lbImg = lb.querySelector('img'); lb._v = lb.querySelector('video'); lb._doc = lb.querySelector('.zc-lb__doc'); lbCap = lb.querySelector('.zc-lb__cap'); lbCount = lb.querySelector('.zc-lb__count');
    lb.querySelector('.zc-lb__close').onclick = lbClose;
    lb.querySelector('.zc-lb__nav--prev').onclick = function (e) { e.stopPropagation(); lbGo(-1); };
    lb.querySelector('.zc-lb__nav--next').onclick = function (e) { e.stopPropagation(); lbGo(1); };
    lb.querySelector('.zc-lb__stage').onclick = function (e) { if (e.target === this) lbClose(); };
    var sx = null;
    lb.addEventListener('touchstart', function (e) { sx = e.touches[0].clientX; }, { passive: true });
    lb.addEventListener('touchend', function (e) { if (sx == null) return; var dx = e.changedTouches[0].clientX - sx; sx = null; if (Math.abs(dx) > 40) lbGo(dx < 0 ? 1 : -1); });
    document.addEventListener('keydown', function (e) {
      if (!lb.classList.contains('is-open')) return;
      if (e.key === 'Escape') lbClose(); if (e.key === 'ArrowRight') lbGo(1); if (e.key === 'ArrowLeft') lbGo(-1);
    });
  }
  function lbShow() {
    var it = lbList[lbIdx];
    var tall = it.h / it.w > 1.7; lb._doc.classList.toggle('is-tall', tall); lb._doc.scrollTop = 0;
    if (it.video) { lbImg.style.display = 'none'; lb._v.style.display = ''; lb._v.src = B + it.src + '.mp4'; lb._v.poster = B + it.src + '.webp'; lb._v.play && lb._v.play().catch(function(){}); }
    else { lb._v.pause && lb._v.pause(); lb._v.removeAttribute('src'); lb._v.style.display = 'none'; lbImg.style.display = ''; }
    lbImg.src = B + it.src + '.webp'; if (it.w > it.h) lbImg.setAttribute('data-wide', ''); else lbImg.removeAttribute('data-wide'); lbImg.alt = it.t + ' — ' + it.s;
    lbCap.innerHTML = '<b>' + it.t + '</b> · ' + it.s; lbCount.textContent = (lbIdx + 1) + ' / ' + lbList.length;
    lbImg.classList.remove('is-in'); void lbImg.offsetWidth; lbImg.classList.add('is-in');
  }
  function lbOpen(list, i, onclose) { if (!lb) lbBuild(); lbList = list; lbIdx = i; lb._onclose = onclose; lbShow(); lb.classList.add('is-open'); document.body.style.overflow = 'hidden'; }
  function lbGo(d) { lbIdx = (lbIdx + d + lbList.length) % lbList.length; lbShow(); }
  function lbClose() { lb._v.pause && lb._v.pause(); lb.classList.remove('is-open'); document.body.style.overflow = ''; if (lb._onclose) lb._onclose(); }

  /* ---------- coverflow carousel ---------- */
  function Carousel(root, items, opt) {
    var n = items.length, active = 0, timer = null, paused = false, visible = false, cards = [];
    var wrap = el('div', 'zc ' + (opt.cls || ''));
    var head = el('div', 'zc__head', '<h3 class="zc__title">' + opt.title + '</h3><span class="zc__meta">' + opt.meta + '</span>' +
      '<div class="zc__ctrl"><button type="button" class="zc__btn" data-d="-1" aria-label="Предыдущий">←</button><button type="button" class="zc__btn" data-d="1" aria-label="Следующий">→</button></div>');
    var stage = el('div', 'zc__stage'); stage.tabIndex = 0; stage.setAttribute('aria-roledescription', 'карусель'); stage.setAttribute('aria-label', opt.title);
    var cap = el('div', 'zc__cap');
    var bar = el('div', 'zc__progress', '<i></i>');
    wrap.appendChild(head); wrap.appendChild(stage); wrap.appendChild(cap); wrap.appendChild(bar);
    root.appendChild(wrap);
    var prog = bar.firstChild;

    items.forEach(function (it, i) {
      var c = el('button', 'zc__card'); c.type = 'button';
      c.setAttribute('aria-label', it.t + ' — ' + it.s);
      var media = it.video ? '<video src="' + B + it.src + '.mp4" poster="' + B + it.src + '.webp" muted loop playsinline autoplay preload="metadata"></video>'
        : '<img src="' + B + it.src + '.webp" alt="" loading="lazy" decoding="async">';
      c.innerHTML = (opt.aspect ? '<span class="zc__scroll">' + media + '</span>' : media) + '<span class="zc__zoom" aria-hidden="true">Открыть</span>';
      if (opt.aspect) c.classList.add('zc__card--doc');
      c.onclick = function () {
        if (i === active) { stopAuto(true); lbOpen(items, i, function () { startAuto(); }); }
        else go(i, true);
      };
      stage.appendChild(c); cards.push(c);
    });

    function H() {
      var w = stage.clientWidth;
      return opt.height(w);
    }
    function layout() {
      var h = H(), W = stage.clientWidth, gap = opt.gap;
      stage.style.height = h + 'px';
      var half = Math.floor(n / 2);
      var pos = {};
      // signed distance for each item
      var off = items.map(function (_, i) { var d = i - active; if (d > half) d -= n; if (d < -half) d += n; return d; });
      function sc(d) { d = Math.abs(d); return d === 0 ? 1 : Math.max(0.56, opt.side - 0.07 * (d - 1)); }
      var maxW = W * (W < 640 ? 0.86 : 0.6);
      function ar(i) { return opt.aspect || (items[i].w / items[i].h); }
      function wid(i) { return Math.min(h * ar(i), maxW); }
      // cumulative x for right & left sides
      var idxBy = {}; off.forEach(function (d, i) { idxBy[d] = i; });
      pos[0] = W / 2;
      var x = W / 2 + wid(active) / 2;
      for (var d = 1; d <= half; d++) { var i = idxBy[d]; if (i == null) break; var w = wid(i) * sc(d); x += gap; pos[d] = x + w / 2; x += w; }
      x = W / 2 - wid(active) / 2;
      for (d = -1; d >= -half; d--) { i = idxBy[d]; if (i == null) break; w = wid(i) * sc(d); x -= gap; pos[d] = x - w / 2; x -= w; }
      cards.forEach(function (c, i) {
        var d = off[i], s = sc(d), w = wid(i), cx = pos[d];
        var far = Math.abs(d) > opt.show;
        var ch = w / ar(i);
        if (opt.aspect) { var full = w * items[i].h / items[i].w; c.style.setProperty('--zc-shift', (-(full - ch)) + 'px'); c.style.setProperty('--zc-dur', Math.max(6, (full - ch) / 70) + 's'); }
        c.style.width = w + 'px'; c.style.height = ch + 'px';
        c.style.transform = 'translate3d(' + (cx - w / 2) + 'px,' + ((h - ch) / 2) + 'px,0) scale(' + s + ')';
        c.style.opacity = far ? 0 : (d === 0 ? 1 : Math.max(0.25, 0.8 - 0.18 * (Math.abs(d) - 1)));
        c.style.zIndex = 100 - Math.abs(d);
        c.style.pointerEvents = far ? 'none' : '';
        c.tabIndex = d === 0 ? 0 : -1;
        c.classList.toggle('is-active', d === 0);
        c.style.visibility = Math.abs(d) > opt.show + 1 ? 'hidden' : '';
      });
      cap.innerHTML = '<b>' + items[active].t + '</b><span>' + items[active].s + '</span><em>' + (active + 1) + ' / ' + n + '</em>';
      cap.classList.remove('is-in'); void cap.offsetWidth; cap.classList.add('is-in');
    }
    function go(i, user) {
      active = (i + n) % n; layout();
      if (user) restart();
    }
    function tick() { go(active + 1); }
    function restart() { stopAuto(); startAuto(); }
    function startAuto() {
      if (reduce || paused || !visible || timer) return;
      prog.style.transition = 'none'; prog.style.transform = 'scaleX(0)'; void prog.offsetWidth;
      prog.style.transition = 'transform ' + opt.interval + 'ms linear'; prog.style.transform = 'scaleX(1)';
      timer = setTimeout(function () { timer = null; tick(); startAuto(); }, opt.interval);
    }
    function stopAuto(soft) {
      clearTimeout(timer); timer = null;
      if (soft) {
        var m = getComputedStyle(prog).transform, sc = 0;
        if (m && m !== 'none') sc = parseFloat(m.split('(')[1]) || 0;
        prog.style.transition = 'none'; prog.style.transform = 'scaleX(' + sc + ')'; void prog.offsetWidth;
        prog.style.transition = 'transform ' + Math.round(180 + 170 * sc) + 'ms cubic-bezier(.22,.8,.24,1)';
        prog.style.transform = 'scaleX(0)';
      } else { prog.style.transition = 'none'; prog.style.transform = 'scaleX(0)'; }
    }

    head.querySelectorAll('.zc__btn').forEach(function (b) { b.onclick = function () { go(active + (+b.dataset.d), true); }; });
    stage.addEventListener('keydown', function (e) { if (e.key === 'ArrowRight') { e.preventDefault(); go(active + 1, true); } if (e.key === 'ArrowLeft') { e.preventDefault(); go(active - 1, true); } });
    wrap.addEventListener('mouseenter', function () { paused = true; stopAuto(true); });
    wrap.addEventListener('mouseleave', function () { paused = false; startAuto(); });
    var sx = null, sy = null;
    stage.addEventListener('touchstart', function (e) { sx = e.touches[0].clientX; sy = e.touches[0].clientY; paused = true; stopAuto(true); }, { passive: true });
    stage.addEventListener('touchend', function (e) {
      var dx = e.changedTouches[0].clientX - sx, dy = e.changedTouches[0].clientY - sy; sx = null; paused = false;
      if (Math.abs(dx) > 40 && Math.abs(dx) > Math.abs(dy)) go(active + (dx < 0 ? 1 : -1), true); else startAuto();
    });
    // mouse drag
    var mx = null;
    stage.addEventListener('pointerdown', function (e) { if (e.pointerType === 'mouse') mx = e.clientX; });
    window.addEventListener('pointerup', function (e) { if (mx == null) return; var dx = e.clientX - mx; mx = null; if (Math.abs(dx) > 50) { stage._drag = true; go(active + (dx < 0 ? 1 : -1), true); setTimeout(function () { stage._drag = false; }, 0); } });
    stage.addEventListener('click', function (e) { if (stage._drag) { e.stopPropagation(); e.preventDefault(); } }, true);

    if ('IntersectionObserver' in window) {
      new IntersectionObserver(function (es) { es.forEach(function (en) { visible = en.isIntersecting; if (visible) startAuto(); else stopAuto(); }); }, { threshold: 0.35 }).observe(wrap);
    } else { visible = true; }
    document.addEventListener('visibilitychange', function () { if (document.hidden) stopAuto(); else startAuto(); });
    var rt; window.addEventListener('resize', function () { clearTimeout(rt); rt = setTimeout(layout, 80); });
    layout();
    requestAnimationFrame(function () { wrap.classList.add('is-ready'); });
  }

  function mount(root) {
    if (root.dataset.zc) return; root.dataset.zc = '1';
    Carousel(root, BANNERS, {
      title: 'Баннеры', meta: 'OIRO, Kaspersky, «Тануки», #FARШ, медвебинары, Villeroy & Boch, TNF EXPO', cls: 'zc--wide',
      height: function (w) { return w < 640 ? Math.round(w * 0.42) : Math.min(360, Math.round(w * 0.26)); },
      gap: 18, side: 0.78, show: 3, interval: 2400
    });
    Carousel(root, INFO, {
      title: 'Инфографика', meta: 'Карточки для маркетплейсов: товары для праздника, аксессуары и украшения, БАДы, косметика, детская и женская одежда, игрушки, техника', cls: 'zc--tall',
      height: function (w) { return w < 640 ? Math.round(w * 0.78) : Math.min(440, Math.round(w * 0.34)); },
      gap: 16, side: 0.8, show: 4, interval: 1800
    });
    mountEmail(root);
  }
  function mountEmail(root) {
    Carousel(root, EMAILS, {
      title: 'E-mail рассылки', meta: 'Письма для TNF EXPO и «Амбулаторного врача» — вёрстка под HTML', cls: 'zc--tall zc--email',
      aspect: 0.72,
      height: function (w) { return w < 640 ? Math.round(w * 0.95) : Math.min(500, Math.round(w * 0.38)); },
      gap: 18, side: 0.8, show: 3, interval: 5000
    });
  }
  function scan() { var r = document.querySelector('.z-car-root'); if (r) mount(r); }
  new MutationObserver(scan).observe(document.documentElement, { childList: true, subtree: true });
  if (document.readyState !== 'loading') scan(); else document.addEventListener('DOMContentLoaded', scan);
})();
