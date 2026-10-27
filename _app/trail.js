(function () {
  if (!window.matchMedia || !matchMedia('(hover: hover) and (pointer: fine)').matches) return;
  if (matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  var cv = document.createElement('canvas');
  cv.setAttribute('aria-hidden', 'true');
  cv.style.cssText = 'position:fixed;inset:0;width:100vw;height:100vh;pointer-events:none;z-index:9999;mix-blend-mode:difference';
  document.body.appendChild(cv);
  var ctx = cv.getContext('2d');
  var dpr = 1, W = 0, H = 0;
  function resize() {
    dpr = Math.max(1, Math.min(window.devicePixelRatio || 1, 2));
    W = innerWidth; H = innerHeight;
    cv.width = Math.round(W * dpr); cv.height = Math.round(H * dpr);
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    ctx.imageSmoothingEnabled = true;
  }
  resize(); addEventListener('resize', resize);

  var star = new Image(); star.src = '/portfolio/assets/brand/cursor-star.png';
  var raw = [], LIFE = 520, running = false, mx = -99, my = -99, hot = 0, hotT = 0, inside = false;
  var st = document.createElement('style');
  st.textContent = 'html.zt-on,html.zt-on *{cursor:none!important}html.zt-on .z-gal-modal,html.zt-on .z-gal-modal *,html.zt-on .zc-lb,html.zt-on .zc-lb *,html.zt-on .z-lightbox,html.zt-on .z-lightbox *{cursor:auto!important}html.zt-on .z-gal-modal a,html.zt-on .z-gal-modal button,html.zt-on .zc-lb button{cursor:pointer!important}';
  document.head.appendChild(st); document.documentElement.classList.add('zt-on');
  function kick() { if (!running) { running = true; requestAnimationFrame(draw); } }
  // smoothed cursor (light easing removes jitter / stair-steps)
  var sx = null, sy = null;
  function push(x, y, t) {
    if (sx == null) { sx = x; sy = y; }
    sx += (x - sx) * 0.7; sy += (y - sy) * 0.7;
    var last = raw[raw.length - 1];
    if (last && Math.hypot(last.x - sx, last.y - sy) < 1.5) return;
    raw.push({ x: sx, y: sy, t: t });
  }
  addEventListener('pointermove', function (e) {
    if (e.pointerType !== 'mouse') return;
    mx = e.clientX; my = e.clientY; inside = true;
    var el = e.target && e.target.closest ? e.target.closest('a,button,[role=button],input,textarea,select,label,video,iframe') : null;
    hotT = el ? 1 : 0;
    var list = e.getCoalescedEvents ? e.getCoalescedEvents() : null;
    if (list && list.length) for (var i = 0; i < list.length; i++) push(list[i].clientX, list[i].clientY, performance.now());
    else push(e.clientX, e.clientY, performance.now());
    kick();
  }, { passive: true });
  document.addEventListener('mouseleave', function () { raw.length = 0; sx = sy = null; inside = false; kick(); });
  document.addEventListener('mouseenter', function () { inside = true; kick(); });
  function modalOpen() { return document.querySelector('.z-gal-modal, .zc-lb.is-open, .z-lightbox'); }

  // Catmull-Rom resampling -> dense, smooth centerline
  function spline(p) {
    var out = [];
    for (var i = 0; i < p.length - 1; i++) {
      var p0 = p[i - 1] || p[i], p1 = p[i], p2 = p[i + 1], p3 = p[i + 2] || p2;
      var seg = Math.max(2, Math.ceil(Math.hypot(p2.x - p1.x, p2.y - p1.y) / 3));
      for (var s = 0; s < seg; s++) {
        var t = s / seg, t2 = t * t, t3 = t2 * t;
        out.push({
          x: 0.5 * (2 * p1.x + (-p0.x + p2.x) * t + (2 * p0.x - 5 * p1.x + 4 * p2.x - p3.x) * t2 + (-p0.x + 3 * p1.x - 3 * p2.x + p3.x) * t3),
          y: 0.5 * (2 * p1.y + (-p0.y + p2.y) * t + (2 * p0.y - 5 * p1.y + 4 * p2.y - p3.y) * t2 + (-p0.y + 3 * p1.y - 3 * p2.y + p3.y) * t3),
          t: p1.t + (p2.t - p1.t) * t
        });
      }
    }
    out.push(p[p.length - 1]);
    return out;
  }

  // tapered ribbon as one filled shape: no overlaps, no beads
  function ribbon(c, now, maxW) {
    var L = [], R = [], n = c.length;
    for (var i = 0; i < n; i++) {
      var a = c[Math.max(0, i - 1)], b = c[Math.min(n - 1, i + 1)];
      var dx = b.x - a.x, dy = b.y - a.y, len = Math.hypot(dx, dy) || 1;
      var k = Math.max(0, 1 - (now - c[i].t) / LIFE);
      var w = maxW * Math.pow(k, 0.8) * Math.min(1, i / 6 + 0.15) / 2;
      var nx = -dy / len * w, ny = dx / len * w;
      L.push([c[i].x + nx, c[i].y + ny]); R.push([c[i].x - nx, c[i].y - ny]);
    }
    ctx.beginPath(); ctx.moveTo(L[0][0], L[0][1]);
    for (i = 1; i < n; i++) ctx.lineTo(L[i][0], L[i][1]);
    var h = c[n - 1], hw = Math.hypot(L[n - 1][0] - h.x, L[n - 1][1] - h.y);
    var ang = Math.atan2(L[n - 1][1] - h.y, L[n - 1][0] - h.x);
    ctx.arc(h.x, h.y, hw, ang, ang + Math.PI, true); // rounded head
    for (i = n - 1; i >= 0; i--) ctx.lineTo(R[i][0], R[i][1]);
    ctx.closePath();
  }

  function draw(now) {
    while (raw.length && now - raw[0].t > LIFE) raw.shift();
    ctx.clearRect(0, 0, W, H);
    if (raw.length > 2 && !modalOpen()) {
      var c = spline(inside ? raw.concat([{ x: mx, y: my, t: now }]) : raw), tail = c[0], head = c[c.length - 1];
      var g = ctx.createLinearGradient(tail.x, tail.y, head.x, head.y);
      g.addColorStop(0, 'rgba(255,255,255,0)'); g.addColorStop(0.55, 'rgba(255,255,255,.35)'); g.addColorStop(1, 'rgba(255,255,255,1)');
      // glow
      ctx.save(); ctx.globalAlpha = 0.28; ctx.shadowColor = 'rgba(255,255,255,.9)'; ctx.shadowBlur = 16;
      ribbon(c, now, 9); ctx.fillStyle = g; ctx.fill(); ctx.restore();
      // core
      ctx.save(); ctx.shadowColor = 'rgba(255,255,255,.8)'; ctx.shadowBlur = 4;
      ribbon(c, now, 2.4); ctx.fillStyle = g; ctx.fill(); ctx.restore();
    }
    // the cursor itself: glowing dot, grows into a ring over clickable things
    hot += (hotT - hot) * 0.25;
    var open = modalOpen();
    if (inside && !open) {
      var rg = ctx.createRadialGradient(mx, my, 0, mx, my, 14);
      rg.addColorStop(0, 'rgba(255,255,255,.35)'); rg.addColorStop(1, 'rgba(255,255,255,0)');
      ctx.fillStyle = rg; ctx.beginPath(); ctx.arc(mx, my, 14, 0, Math.PI * 2); ctx.fill();
      if (star.complete && star.naturalWidth) {
        var sw = 26 * (1 + 0.35 * hot), sh = sw * 307 / 261;
        ctx.save(); ctx.translate(mx, my); ctx.rotate(hot * 0.35);
        ctx.shadowColor = 'rgba(255,255,255,.7)'; ctx.shadowBlur = 6;
        ctx.drawImage(star, -sw * 130 / 261, -sh * 127 / 307, sw, sh);
        ctx.restore();
      } else { ctx.fillStyle = '#fff'; ctx.beginPath(); ctx.arc(mx, my, 3, 0, Math.PI * 2); ctx.fill(); }
      }
    if (raw.length || Math.abs(hot - hotT) > 0.01) requestAnimationFrame(draw); else { running = false; sx = sy = null; }
  }
})();
