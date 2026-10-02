/* Redesign Carnevali: interações. Sem listeners de scroll: usa IntersectionObserver e GSAP ScrollTrigger. */
(function () {
  'use strict';

  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var $ = function (s, r) { return (r || document).querySelector(s); };
  var $$ = function (s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); };

  /* ---------- Reveal ao entrar na viewport (hierarquia: guia a leitura) ---------- */
  var rv = $$('.rv');
  if ('IntersectionObserver' in window && !reduce) {
    var io = new IntersectionObserver(function (es) {
      es.forEach(function (e) { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } });
    }, { threshold: 0.12, rootMargin: '0px 0px -6% 0px' });
    rv.forEach(function (el) { io.observe(el); });
  } else {
    rv.forEach(function (el) { el.classList.add('in'); });
  }

  /* ---------- Contadores da faixa de números ---------- */
  $$('[data-count]').forEach(function (el) {
    var end = parseInt(el.dataset.count, 10);
    if (reduce || !('IntersectionObserver' in window)) return;
    el.textContent = '0';
    var o = new IntersectionObserver(function (es) {
      if (!es[0].isIntersecting) return;
      o.disconnect();
      var t0 = performance.now(), dur = 1400;
      (function tick(t) {
        var p = Math.min((t - t0) / dur, 1);
        el.textContent = Math.round(end * (1 - Math.pow(1 - p, 4)));
        if (p < 1) requestAnimationFrame(tick);
      })(t0);
    }, { threshold: 0.6 });
    o.observe(el);
  });

  /* ---------- Menu mobile ---------- */
  var burger = $('#burger'), menu = $('#menu');
  function setMenu(open) {
    burger.setAttribute('aria-expanded', open);
    burger.setAttribute('aria-label', open ? 'Fechar menu' : 'Abrir menu');
    menu.classList.toggle('open', open);
    menu.setAttribute('aria-hidden', !open);
    burger.classList.toggle('on-top', open);
    document.body.style.overflow = open ? 'hidden' : '';
  }
  burger.addEventListener('click', function () { setMenu(burger.getAttribute('aria-expanded') !== 'true'); });
  $$('a', menu).forEach(function (a) { a.addEventListener('click', function () { setMenu(false); }); });
  document.addEventListener('keydown', function (e) { if (e.key === 'Escape') setMenu(false); });

  /* ---------- Link ativo no menu + CTA fixo mobile (via observer) ---------- */
  var links = $$('.nav-links a');
  var secs = links.map(function (a) { return $(a.getAttribute('href')); });
  if ('IntersectionObserver' in window) {
    var so = new IntersectionObserver(function (es) {
      es.forEach(function (e) {
        if (!e.isIntersecting) return;
        links.forEach(function (a) { a.classList.toggle('on', a.getAttribute('href') === '#' + e.target.id); });
      });
    }, { rootMargin: '-45% 0px -50% 0px' });
    secs.forEach(function (s) { if (s) so.observe(s); });

    var sticky = $('#sticky'), hero = $('#topo'), fin = $('#contato');
    var visible = { hero: true, fin: false };
    var update = function () { sticky.classList.toggle('show', !visible.hero && !visible.fin); };
    new IntersectionObserver(function (es) { visible.hero = es[0].isIntersecting; update(); }).observe(hero);
    new IntersectionObserver(function (es) { visible.fin = es[0].isIntersecting; update(); }).observe(fin);
  }

  /* ---------- Pan horizontal dos casos (GSAP, só desktop) ---------- */
  function initPan() {
    if (reduce || typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') return;
    gsap.registerPlugin(ScrollTrigger);
    var mm = gsap.matchMedia();
    mm.add('(min-width: 961px)', function () {
      var wrap = $('#pan'), track = $('#pan-track');
      var dist = function () { return Math.max(track.scrollWidth - window.innerWidth, 0); };
      wrap.classList.add('is-pan');
      gsap.to(track, {
        x: function () { return -dist(); },
        ease: 'none',
        scrollTrigger: {
          trigger: wrap, start: 'top top', end: function () { return '+=' + dist(); },
          pin: $('.pan-stick', wrap), scrub: 0.8, invalidateOnRefresh: true
        }
      });
      return function () { wrap.classList.remove('is-pan'); track.style.transform = ''; };
    });
  }
  window.addEventListener('load', initPan);

  /* ---------- Diagnóstico ---------- */
  var st = { step: 1, total: 5, segmento: null, equipe: null, leads: null, taxa: null, ticket: null, desafio: null };
  var groups = { 1: ['segmento', 'equipe'], 2: ['leads', 'taxa'], 3: ['ticket', 'desafio'] };
  var panes = $$('.step-pane'), bars = $$('#diag-prog .prog-bar i');
  var back = $('#diag-back'), next = $('#diag-next'), err = $('#diag-err');
  err.style.display = 'none';

  $$('.opt').forEach(function (b) {
    b.addEventListener('click', function () {
      $$('.opt[data-group="' + b.dataset.group + '"]').forEach(function (o) { o.classList.remove('sel'); o.setAttribute('aria-pressed', 'false'); });
      b.classList.add('sel'); b.setAttribute('aria-pressed', 'true');
      st[b.dataset.group] = b.dataset.value;
      err.style.display = 'none';
    });
  });

  function calc() {
    var leads = parseFloat(st.leads) || 75, taxa = parseFloat(st.taxa) || 15, ticket = parseFloat(st.ticket) || 600;
    var taxaIA = Math.min(taxa * 1.3, 100);
    var ganho = Math.round(leads * ((taxaIA - taxa) / 100) * ticket);
    var rec = Math.round(leads * 0.6 * 0.4);
    return { ganho: ganho, ano: ganho * 12, rec: rec, perdida: Math.round(rec * ticket * (taxa / 100)) };
  }
  var brl = function (n) { return 'R$ ' + n.toLocaleString('pt-BR'); };

  function show(n) {
    st.step = n;
    panes.forEach(function (p) { p.classList.toggle('on', +p.dataset.step === n); });
    bars.forEach(function (b, i) { b.classList.toggle('on', i < n); });
    $('#diag-label').textContent = 'Etapa ' + n + ' de ' + st.total;
    back.disabled = n === 1;
    next.firstChild.nodeValue = n === st.total ? 'Enviar e agendar ' : 'Próximo ';
    if (n === 4) {
      var r = calc();
      $('#roi-loss').textContent = brl(r.perdida); $('#roi-gain').textContent = brl(r.ganho);
      $('#roi-year').textContent = brl(r.ano); $('#roi-leads').textContent = r.rec + ' leads';
    }
  }

  next.addEventListener('click', function () {
    if (st.step === st.total) return send();
    var g = groups[st.step] || [];
    if (g.some(function (k) { return !st[k]; })) { err.style.display = 'block'; return; }
    err.style.display = 'none';
    show(st.step + 1);
  });
  back.addEventListener('click', function () { err.style.display = 'none'; if (st.step > 1) show(st.step - 1); });

  function label(group) {
    var c = $('.opt[data-group="' + group + '"].sel');
    return c ? (c.dataset.label || c.textContent.trim()) : 'N/A';
  }

  function send() {
    var f = { nome: $('#f-nome'), empresa: $('#f-empresa'), whatsapp: $('#f-whatsapp') };
    var ok = true;
    Object.keys(f).forEach(function (k) {
      var v = f[k].value.trim();
      var bad = !v || (k === 'whatsapp' && v.replace(/\D/g, '').length < 10);
      f[k].closest('.field').classList.toggle('err', bad);
      if (bad) ok = false;
    });
    if (!ok) return;

    var segs = { ecommerce: 'E-commerce', clinica: 'Saúde / Clínica', imobiliaria: 'Imobiliária', consultoria: 'Consultoria / Serviços', educacao: 'Educação / Cursos', outro: 'Outro segmento' };
    var r = calc(), cargo = $('#f-cargo').value;
    var fmt = function (n) { return 'R$ ' + n.toLocaleString('pt-BR'); };
    var lines = [
      'Olá! Fiz o Diagnóstico de IA da Carnevali Soluções Digitais e quero receber meu resultado detalhado.', '',
      '*Meu Diagnóstico:*',
      '• Nome: ' + f.nome.value.trim(), '• Empresa: ' + f.empresa.value.trim(), '• Cargo: ' + (cargo || 'Não informado'),
      '• Segmento: ' + (segs[st.segmento] || 'N/A'), '• Equipe de atendimento: ' + label('equipe'),
      '• Leads/mês: ' + label('leads'), '• Taxa de conversão: ' + label('taxa'),
      '• Ticket médio: ' + label('ticket'), '• Principal desafio: ' + label('desafio'), '',
      '*ROI Estimado:*', '• Potencial extra/mês: ' + fmt(r.ganho), '• Potencial extra/ano: ' + fmt(r.ano), '',
      'Aguardo o contato!'
    ];
    var url = 'https://wa.me/5513988091008?text=' + encodeURIComponent(lines.join('\n'));
    window.open(url, '_blank', 'noopener');
    $('#diag-again').href = url;
    $('#diag-steps').style.display = 'none'; $('#diag-nav').style.display = 'none'; $('#diag-prog').style.display = 'none';
    $('#diag-done').classList.add('on');
  }
  show(1);
})();
