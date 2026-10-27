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

  var star = new Image(), starC = null;
  star.onload = function () {
    var S = 26, pad = 12, sw = S, sh = S * 307 / 261, c = document.createElement('canvas'), q = Math.max(2, dpr);
    c.width = Math.ceil((sw + pad * 2) * q); c.height = Math.ceil((sh + pad * 2) * q);
    var x = c.getContext('2d'); x.scale(q, q);
    var g = x.createRadialGradient(pad + sw * 130 / 261, pad + sh * 127 / 307, 0, pad + sw * 130 / 261, pad + sh * 127 / 307, 14);
    g.addColorStop(0, 'rgba(255,255,255,.35)'); g.addColorStop(1, 'rgba(255,255,255,0)');
    x.fillStyle = g; x.fillRect(0, 0, sw + pad * 2, sh + pad * 2);
    x.shadowColor = 'rgba(255,255,255,.7)'; x.shadowBlur = 6; x.drawImage(star, pad, pad, sw, sh);
    starC = { c: c, w: sw + pad * 2, h: sh + pad * 2, ox: pad + sw * 130 / 261, oy: pad + sh * 127 / 307 };
  };
  star.src = '/portfolio/assets/brand/cursor-star.png';
  var raw = [], LIFE = 520, running = false, mx = -99, my = -99, hot = 0, hotT = 0, inside = false;
  var st = document.createElement('style');
  st.textContent = 'html.zt-on,html.zt-on *{cursor:none!important}html.zt-on .z-gal-modal,html.zt-on .z-gal-modal *,html.zt-on .zc-lb,html.zt-on .zc-lb *,html.zt-on .z-lightbox,html.zt-on .z-lightbox *{cursor:auto!important}html.zt-on .z-gal-modal a,html.zt-on .z-gal-modal button,html.zt-on .zc-lb button{cursor:pointer!important}';
  document.head.appendChild(st); document.documentElement.classList.add('zt-on');
  function kick() { if (!running) { running = true; requestAnimationFrame(draw); } }
  // spring-follower head: sampled every frame -> evenly spaced, naturally rounded path
  var hx = null, hy = null, vx = 0, vy = 0, lastT = 0;
  function step(now) {
    if (hx == null) { hx = mx; hy = my; vx = vy = 0; }
    var dt = Math.min(2.5, Math.max(0.5, (now - (lastT || now - 16.7)) / 16.7)); lastT = now;
    for (var k = 0; k < 2; k++) {            // 2 substeps for stability
      var h = dt / 2;
      vx += (mx - hx) * 0.55 * h; vy += (my - hy) * 0.55 * h;
      var d = Math.pow(0.3, h); vx *= d; vy *= d;
      hx += vx * h; hy += vy * h;
    }
    var last = raw[raw.length - 1];
    if (!last || Math.hypot(last.x - hx, last.y - hy) > 0.6) raw.push({ x: hx, y: hy, t: now });
  }
  addEventListener('onpointerrawupdate' in window ? 'pointerrawupdate' : 'pointermove', function (e) {
    if (e.pointerType !== 'mouse') return;
    mx = e.clientX; my = e.clientY; inside = true;
    kick();
  }, { passive: true });
  document.addEventListener('pointerover', function (e) {
    var el = e.target && e.target.closest ? e.target.closest('a,button,[role=button],input,textarea,select,label,video,iframe') : null;
    hotT = el ? 1 : 0; kick();
  }, { passive: true });
  document.addEventListener('mouseleave', function () { raw.length = 0; hx = hy = null; inside = false; kick(); });
  document.addEventListener('mouseenter', function () { inside = true; kick(); });
  function modalOpen() { return document.querySelector('.z-gal-modal, .zc-lb.is-open, .z-lightbox'); }

  // Chaikin corner-cutting: removes any leftover angles
  function smooth(p, it) {
    for (var n = 0; n < it; n++) {
      if (p.length < 3) return p;
      var o = [p[0]];
      for (var i = 0; i < p.length - 1; i++) {
        var a = p[i], b = p[i + 1];
        o.push({ x: a.x * .75 + b.x * .25, y: a.y * .75 + b.y * .25, t: a.t * .75 + b.t * .25 });
        o.push({ x: a.x * .25 + b.x * .75, y: a.y * .25 + b.y * .75, t: a.t * .25 + b.t * .75 });
      }
      o.push(p[p.length - 1]); p = o;
    }
    return p;
  }

  // tapered ribbon as one filled shape: no overlaps, no beads
  function ribbon(c, now, maxW) {
    var L = [], R = [], n = c.length;
    for (var i = 0; i < n; i++) {
      var a = c[Math.max(0, i - 3)], b = c[Math.min(n - 1, i + 3)];
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
    if (inside) step(now);
    while (raw.length && now - raw[0].t > LIFE) raw.shift();
    ctx.clearRect(0, 0, W, H);
    var open = modalOpen();
    if (raw.length > 2 && !open) {
      var c = smooth(inside ? raw.concat([{ x: mx, y: my, t: now }]) : raw, 2), tail = c[0], head = c[c.length - 1];
      var g = ctx.createLinearGradient(tail.x, tail.y, head.x, head.y);
      g.addColorStop(0, 'rgba(255,255,255,0)'); g.addColorStop(0.55, 'rgba(255,255,255,.35)'); g.addColorStop(1, 'rgba(255,255,255,1)');
      // glow
      ctx.fillStyle = g;
      ctx.globalAlpha = 0.07; ribbon(c, now, 16); ctx.fill();
      ctx.globalAlpha = 0.16; ribbon(c, now, 8); ctx.fill();
      ctx.globalAlpha = 1; ribbon(c, now, 2.4); ctx.fill();
    }
    // the cursor itself: glowing dot, grows into a ring over clickable things
    hot += (hotT - hot) * 0.25;
    if (inside && !open) {
      if (starC) {
        var z = 1 + 0.35 * hot;
        ctx.drawImage(starC.c, mx - starC.ox * z, my - starC.oy * z, starC.w * z, starC.h * z);
      } else { ctx.fillStyle = '#fff'; ctx.beginPath(); ctx.arc(mx, my, 3, 0, Math.PI * 2); ctx.fill(); }
      }
    var moving = inside && hx != null && (Math.abs(mx - hx) + Math.abs(my - hy) > 0.3 || Math.abs(vx) + Math.abs(vy) > 0.05);
    if (raw.length > 1 || moving || Math.abs(hot - hotT) > 0.01) requestAnimationFrame(draw); else { running = false; raw.length = 0; lastT = 0; }
  }
})();
