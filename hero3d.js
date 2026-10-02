/* Hero 3D — núcleo de IA em Three.js + tilt 3D dos cards de produto.
   Degrada com elegância: sem WebGL / reduced-motion / three.js ausente => fallback CSS. */
(function () {
  'use strict';

  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ---------- Cena Three.js ---------- */
  function initHero3D() {
    var host = document.getElementById('hero3d');
    var canvas = document.getElementById('hero3d-canvas');
    if (!host || !canvas) return;

    if (reduceMotion || typeof THREE === 'undefined') { host.classList.add('is-fallback'); return; }

    var renderer;
    try {
      renderer = new THREE.WebGLRenderer({ canvas: canvas, antialias: true, alpha: true, powerPreference: 'high-performance' });
    } catch (e) { host.classList.add('is-fallback'); return; }

    var isMobile = window.innerWidth < 768;
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, isMobile ? 1.5 : 2));

    var scene = new THREE.Scene();
    var camera = new THREE.PerspectiveCamera(45, 1, 0.1, 100);
    camera.position.set(0, 0, 9);

    var group = new THREE.Group();
    scene.add(group);

    var CYAN = 0x25f3ff, BLUE = 0x2d7dff, PURPLE = 0x9b5cff;

    // Núcleo sólido + brilho
    var core = new THREE.Mesh(
      new THREE.IcosahedronGeometry(1.25, 3),
      new THREE.MeshBasicMaterial({ color: BLUE, transparent: true, opacity: 0.18 })
    );
    group.add(core);

    var glow = new THREE.Mesh(
      new THREE.SphereGeometry(1.9, 32, 32),
      new THREE.MeshBasicMaterial({ color: PURPLE, transparent: true, opacity: 0.07 })
    );
    group.add(glow);

    // Malha wireframe externa
    var wire = new THREE.Mesh(
      new THREE.IcosahedronGeometry(1.75, 1),
      new THREE.MeshBasicMaterial({ color: CYAN, wireframe: true, transparent: true, opacity: 0.55 })
    );
    group.add(wire);

    // Anéis orbitais
    var rings = [];
    [[2.6, CYAN, 0.45, 0.35], [3.1, PURPLE, 0.35, -0.6], [3.6, BLUE, 0.28, 1.1]].forEach(function (r, i) {
      var ring = new THREE.Mesh(
        new THREE.TorusGeometry(r[0], 0.012, 8, 160),
        new THREE.MeshBasicMaterial({ color: r[1], transparent: true, opacity: r[2] })
      );
      ring.rotation.x = Math.PI / 2 + r[3];
      ring.rotation.y = i * 0.7;
      group.add(ring);
      rings.push(ring);
    });

    // Nós orbitando (representam canais / leads)
    var nodes = [];
    var nodeGeo = new THREE.SphereGeometry(0.09, 12, 12);
    for (var n = 0; n < 7; n++) {
      var node = new THREE.Mesh(nodeGeo, new THREE.MeshBasicMaterial({ color: n % 2 ? CYAN : PURPLE }));
      node.userData = { r: 2.6 + (n % 3) * 0.5, speed: 0.25 + n * 0.05, phase: (n / 7) * Math.PI * 2, tilt: (n % 3) * 0.5 - 0.4 };
      group.add(node);
      nodes.push(node);
    }

    // Partículas
    var count = isMobile ? 220 : 520;
    var pos = new Float32Array(count * 3);
    for (var i = 0; i < count; i++) {
      var rad = 3.2 + Math.random() * 4.5;
      var th = Math.random() * Math.PI * 2;
      var ph = Math.acos(2 * Math.random() - 1);
      pos[i * 3] = rad * Math.sin(ph) * Math.cos(th);
      pos[i * 3 + 1] = rad * Math.sin(ph) * Math.sin(th);
      pos[i * 3 + 2] = rad * Math.cos(ph);
    }
    var pGeo = new THREE.BufferGeometry();
    pGeo.setAttribute('position', new THREE.BufferAttribute(pos, 3));
    var points = new THREE.Points(pGeo, new THREE.PointsMaterial({ color: 0xbfe9ff, size: 0.04, transparent: true, opacity: 0.8 }));
    scene.add(points);

    // Resize
    function resize() {
      var w = host.clientWidth, h = host.clientHeight;
      if (!w || !h) return;
      renderer.setSize(w, h, false);
      camera.aspect = w / h;
      // posiciona o núcleo à direita em telas largas
      var wide = w > 760;
      group.position.x = wide ? 2.3 : 0;
      camera.position.z = wide ? 9 : 11;
      camera.updateProjectionMatrix();
    }
    resize();
    window.addEventListener('resize', resize);

    // Interação: parallax do mouse + scroll
    var mx = 0, my = 0, tx = 0, ty = 0;
    window.addEventListener('pointermove', function (e) {
      mx = (e.clientX / window.innerWidth - 0.5) * 2;
      my = (e.clientY / window.innerHeight - 0.5) * 2;
    }, { passive: true });

    var scrollY = 0;
    window.addEventListener('scroll', function () { scrollY = window.scrollY; }, { passive: true });

    // Só renderiza enquanto visível
    var visible = true, clock = new THREE.Clock(), raf = 0;
    new IntersectionObserver(function (es) {
      visible = es[0].isIntersecting;
      if (visible && !raf) loop();
    }, { threshold: 0 }).observe(host);

    function loop() {
      raf = 0;
      if (!visible) return;
      var t = clock.getElapsedTime();

      tx += (mx - tx) * 0.05;
      ty += (my - ty) * 0.05;

      group.rotation.y = t * 0.15 + tx * 0.5;
      group.rotation.x = ty * 0.3 + Math.sin(t * 0.3) * 0.08;
      wire.rotation.y = -t * 0.2;
      core.rotation.y = t * 0.25;
      core.scale.setScalar(1 + Math.sin(t * 1.6) * 0.04);
      glow.scale.setScalar(1 + Math.sin(t * 1.6 + 1) * 0.06);
      rings.forEach(function (r, i) { r.rotation.z = t * (0.12 + i * 0.06) * (i % 2 ? -1 : 1); });
      points.rotation.y = t * 0.03;
      points.rotation.x = scrollY * 0.0004;

      nodes.forEach(function (nd) {
        var a = t * nd.userData.speed + nd.userData.phase, d = nd.userData;
        nd.position.set(Math.cos(a) * d.r, Math.sin(a * 1.3) * d.tilt * 2, Math.sin(a) * d.r);
      });

      renderer.render(scene, camera);
      raf = requestAnimationFrame(loop);
    }
    loop();
  }

  /* ---------- Tilt 3D (cards de produto) ---------- */
  function initTilt() {
    if (reduceMotion || !window.matchMedia('(hover: hover)').matches) return;
    document.querySelectorAll('[data-tilt]').forEach(function (el) {
      var frame = 0;
      el.addEventListener('pointermove', function (e) {
        var r = el.getBoundingClientRect();
        var px = (e.clientX - r.left) / r.width - 0.5;
        var py = (e.clientY - r.top) / r.height - 0.5;
        cancelAnimationFrame(frame);
        frame = requestAnimationFrame(function () {
          el.style.setProperty('--ry', (px * 14).toFixed(2) + 'deg');
          el.style.setProperty('--rx', (-py * 12).toFixed(2) + 'deg');
          el.style.setProperty('--mx', ((px + 0.5) * 100).toFixed(1) + '%');
          el.style.setProperty('--my', ((py + 0.5) * 100).toFixed(1) + '%');
        });
      });
      el.addEventListener('pointerleave', function () {
        cancelAnimationFrame(frame);
        el.style.setProperty('--ry', '0deg');
        el.style.setProperty('--rx', '0deg');
      });
    });
  }

  /* ---------- Contadores da faixa de números ---------- */
  function initCounters() {
    var els = document.querySelectorAll('[data-count]');
    if (!els.length || !('IntersectionObserver' in window)) return;
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (!en.isIntersecting) return;
        io.unobserve(en.target);
        var el = en.target, end = parseFloat(el.dataset.count), t0 = null;
        if (reduceMotion) { el.textContent = end; return; }
        (function step(ts) {
          t0 = t0 || ts;
          var p = Math.min((ts - t0) / 1200, 1);
          el.textContent = Math.round(end * (1 - Math.pow(1 - p, 3)));
          if (p < 1) requestAnimationFrame(step);
        })(performance.now());
      });
    }, { threshold: 0.6 });
    els.forEach(function (el) { io.observe(el); });
  }

  document.addEventListener('DOMContentLoaded', function () {
    initHero3D();
    initTilt();
    initCounters();
  });
})();
