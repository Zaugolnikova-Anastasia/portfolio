(function () {
  if (!window.matchMedia || !matchMedia('(hover: hover) and (pointer: fine)').matches) return;
  if (matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  var cv = document.createElement('canvas');
  cv.setAttribute('aria-hidden', 'true');
  cv.style.cssText = 'position:fixed;inset:0;width:100vw;height:100vh;pointer-events:none;z-index:9999;mix-blend-mode:screen';
  document.body.appendChild(cv);
  var ctx = cv.getContext('2d');
  var dpr = 1, W = 0, H = 0;
  function resize() {
    dpr = Math.min(window.devicePixelRatio || 1, 2);
    W = innerWidth; H = innerHeight;
    cv.width = W * dpr; cv.height = H * dpr;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  }
  resize(); addEventListener('resize', resize);

  var pts = [], LIFE = 520, running = false, hidden = false;
  addEventListener('pointermove', function (e) {
    if (e.pointerType !== 'mouse') return;
    var t = performance.now(), last = pts[pts.length - 1];
    if (last && Math.abs(last.x - e.clientX) + Math.abs(last.y - e.clientY) < 2) return;
    pts.push({ x: e.clientX, y: e.clientY, t: t });
    if (!running) { running = true; requestAnimationFrame(draw); }
  }, { passive: true });
  document.addEventListener('mouseleave', function () { pts.length = 0; });
  // hide while a lightbox / modal is open
  function modalOpen() { return document.querySelector('.z-gal-modal, .zc-lb.is-open, .z-lightbox'); }

  function draw(now) {
    while (pts.length && now - pts[0].t > LIFE) pts.shift();
    ctx.clearRect(0, 0, W, H);
    if (pts.length > 1 && !modalOpen()) {
      ctx.lineCap = 'round'; ctx.lineJoin = 'round';
      for (var pass = 0; pass < 2; pass++) {
        for (var i = 1; i < pts.length; i++) {
          var a = pts[i - 1], b = pts[i];
          var k = 1 - (now - b.t) / LIFE;            // 0..1, fresher = 1
          if (k <= 0) continue;
          var mx = (a.x + b.x) / 2, my = (a.y + b.y) / 2;
          var pa = i > 1 ? { x: (pts[i - 2].x + a.x) / 2, y: (pts[i - 2].y + a.y) / 2 } : a;
          ctx.beginPath(); ctx.moveTo(pa.x, pa.y); ctx.quadraticCurveTo(a.x, a.y, mx, my);
          ctx.lineCap = pass === 0 ? 'butt' : 'round';
          if (pass === 0) {                           // soft glow
            ctx.strokeStyle = 'rgba(255,255,255,' + (0.18 * k) + ')';
            ctx.lineWidth = 10 * k + 2;
            ctx.shadowColor = 'rgba(255,255,255,' + (0.9 * k) + ')'; ctx.shadowBlur = 18;
          } else {                                    // bright core
            ctx.strokeStyle = 'rgba(255,255,255,' + (0.95 * k) + ')';
            ctx.lineWidth = 2.2 * k + 0.4;
            ctx.shadowBlur = 6; ctx.shadowColor = 'rgba(255,255,255,' + k + ')';
          }
          ctx.stroke();
        }
      }
      ctx.shadowBlur = 0;
      // star spark at the head
      var h = pts[pts.length - 1], hk = 1 - (now - h.t) / LIFE;
      if (hk > 0) {
        var g = ctx.createRadialGradient(h.x, h.y, 0, h.x, h.y, 14);
        g.addColorStop(0, 'rgba(255,255,255,' + 0.9 * hk + ')'); g.addColorStop(1, 'rgba(255,255,255,0)');
        ctx.fillStyle = g; ctx.beginPath(); ctx.arc(h.x, h.y, 14, 0, Math.PI * 2); ctx.fill();
      }
    }
    if (pts.length) requestAnimationFrame(draw); else { running = false; ctx.clearRect(0, 0, W, H); }
  }
})();
