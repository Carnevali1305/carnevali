// ===================================
// CARNEVALI SOLUÇÕES DIGITAIS
// Interactive Features
// ===================================

document.addEventListener('DOMContentLoaded', () => {

  // Smooth scrolling for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        const headerOffset = 80;
        const elementPosition = target.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
      }
    });
  });

  // Animation Loop for Chat and CRM
  initAnimationLoop();

  // ROI Calculator Logic
  initROICalculator();

  // Typewriter Effect
  initTypewriter();

  // Scroll Reveal
  initScrollReveal();

  // Animated Counters
  initCounters();

  // Sticky CTA Mobile
  initStickyCTA();

  // Hamburger Menu
  initHamburger();

  // Active nav link on scroll
  initActiveNavLink();

  // Diagnostic Wizard
  initDiagnostico();

});

// Infinite Animation Loop
function initAnimationLoop() {
  const chatSequence = document.querySelector('.chat-sequence');
  const crmView = document.querySelector('.crm-view');

  if (!chatSequence || !crmView) return;

  // Total animation duration: 17s (animation) + 3s (pause) = 20s
  const LOOP_DURATION = 20000; // 20 seconds

  function restartAnimations() {
    // Clone and replace to restart CSS animations
    const chatClone = chatSequence.cloneNode(true);
    const crmClone = crmView.cloneNode(true);

    chatSequence.parentNode.replaceChild(chatClone, chatSequence);
    crmView.parentNode.replaceChild(crmClone, crmView);

    // Schedule next restart
    setTimeout(restartAnimations, LOOP_DURATION);
  }

  // Start the loop after first animation completes
  setTimeout(restartAnimations, LOOP_DURATION);
}


// ============================================================
// DIAGNÓSTICO INTERATIVO
// ============================================================

// Wizard state
const diagState = {
  step: 1,
  totalSteps: 5,
  segmento: null,
  equipe: null,
  leads: null,
  taxa: null,
  ticket: null,
  desafio: null,
  stepTitles: ['Seu negócio', 'Volume de leads', 'Ticket e desafio', 'ROI estimado', 'Seus dados'],
  stepGroups: [
    ['segmento', 'equipe'],
    ['leads', 'taxa'],
    ['ticket', 'desafio'],
    [],
    []
  ]
};

function initDiagnostico() {
  const section = document.getElementById('diagnostico');
  if (!section) return;

  document.querySelectorAll('.diag-option-card').forEach(card => {
    card.addEventListener('click', () => {
      const group = card.dataset.group;
      document.querySelectorAll('.diag-option-card[data-group="' + group + '"]').forEach(c => c.classList.remove('selected'));
      card.classList.add('selected');
      diagState[group] = card.dataset.value;
    });
  });

  diagUpdateProgress();
}

function diagUpdateProgress() {
  const pct = (diagState.step / diagState.totalSteps) * 100;
  const bar = document.getElementById('diag-progress-bar');
  const stepNum = document.getElementById('diag-current-step');
  const stepTitle = document.getElementById('diag-step-title-label');
  if (bar) bar.style.width = pct + '%';
  if (stepNum) stepNum.textContent = diagState.step;
  if (stepTitle) stepTitle.textContent = diagState.stepTitles[diagState.step - 1];
}

function diagShowStep(newStep, direction) {
  const currentEl = document.getElementById('diag-step-' + diagState.step);
  const nextEl = document.getElementById('diag-step-' + newStep);
  if (!currentEl || !nextEl) return;

  currentEl.classList.remove('active', 'back-active');
  diagState.step = newStep;
  diagUpdateProgress();

  if (direction === 'forward') {
    nextEl.classList.remove('back-active');
    nextEl.classList.add('active');
  } else {
    nextEl.classList.remove('active');
    nextEl.classList.add('back-active');
  }

  const backBtn = document.getElementById('diag-back-btn');
  const nextBtn = document.getElementById('diag-next-btn');
  if (backBtn) backBtn.style.display = newStep === 1 ? 'none' : 'inline-flex';
  if (nextBtn) {
    nextBtn.style.display = newStep === diagState.totalSteps ? 'none' : 'inline-flex';
    if (nextBtn.style.display !== 'none') {
      nextBtn.textContent = newStep === 4 ? 'Continuar \u2192' : 'Pr\u00f3ximo \u2192';
    }
  }

  if (newStep === 4) diagCalcularROI();

  const card = document.querySelector('.diag-card');
  if (card) setTimeout(() => card.scrollIntoView({ behavior: 'smooth', block: 'start' }), 50);
}

function diagValidateStep() {
  const groups = diagState.stepGroups[diagState.step - 1];
  for (let i = 0; i < groups.length; i++) {
    const group = groups[i];
    if (!diagState[group]) {
      const firstCard = document.querySelector('.diag-option-card[data-group="' + group + '"]');
      const grid = firstCard ? firstCard.closest('.diag-options-grid') : null;
      if (grid) {
        grid.style.outline = '1.5px solid rgba(255,100,100,.55)';
        grid.style.borderRadius = '16px';
        setTimeout(() => { grid.style.outline = ''; }, 1800);
      }
      return false;
    }
  }
  return true;
}

function diagNext() {
  if (!diagValidateStep()) return;
  if (diagState.step < diagState.totalSteps) {
    diagShowStep(diagState.step + 1, 'forward');
  }
}

function diagBack() {
  if (diagState.step > 1) {
    diagShowStep(diagState.step - 1, 'back');
  }
}

function diagCalcularROI() {
  const leads = parseFloat(diagState.leads) || 75;
  const taxa = parseFloat(diagState.taxa) || 15;
  const ticket = parseFloat(diagState.ticket) || 600;

  // 30% conversion improvement with AI (instant response benchmark)
  const taxaIA = Math.min(taxa * 1.30, 100);
  const ganhoMes = Math.round(leads * ((taxaIA - taxa) / 100) * ticket);
  const ganhoAno = ganhoMes * 12;

  // ~60% leads get slow reply; 40% of those are recoverable
  const leadsRecuperados = Math.round(leads * 0.60 * 0.40);
  const receitaPerdida = Math.round(leadsRecuperados * ticket * (taxa / 100));

  const fmt = function(n) { return 'R$\u00a0' + n.toLocaleString('pt-BR'); };

  diagAnimateValue('diag-roi-loss', fmt(receitaPerdida));
  diagAnimateValue('diag-roi-gain', fmt(ganhoMes));
  diagAnimateValue('diag-roi-year', fmt(ganhoAno));
  diagAnimateValue('diag-roi-leads', leadsRecuperados + ' leads');
}

function diagAnimateValue(id, value) {
  const el = document.getElementById(id);
  if (!el) return;
  el.textContent = '\u2026';
  setTimeout(() => {
    el.textContent = value;
    el.style.animation = 'none';
    el.offsetHeight; // reflow
    el.style.animation = 'diagFadeUp 0.4s ease both';
  }, 300);
}

function diagEnviar() {
  const nome = document.getElementById('diag-nome').value.trim();
  const empresa = document.getElementById('diag-empresa').value.trim();
  const whatsapp = document.getElementById('diag-whatsapp').value.trim();
  const cargo = document.getElementById('diag-cargo').value;
  const errorEl = document.getElementById('diag-form-error');

  if (!nome || !empresa || !whatsapp) {
    if (errorEl) errorEl.style.display = 'block';
    return;
  }
  if (errorEl) errorEl.style.display = 'none';

  const segLabels = {
    ecommerce: 'E-commerce', clinica: 'Sa\u00fade / Cl\u00ednica',
    imobiliaria: 'Imobili\u00e1ria', consultoria: 'Consultoria / Servi\u00e7os',
    educacao: 'Educa\u00e7\u00e3o / Cursos', outro: 'Outro segmento'
  };
  const seg = segLabels[diagState.segmento] || 'N/A';

  function getLabel(group) {
    var card = document.querySelector('.diag-option-card[data-group="' + group + '"].selected');
    if (!card) return 'N/A';
    return card.dataset.label || (card.querySelector('.diag-option-label') || {}).textContent || 'N/A';
  }

  const leads = parseFloat(diagState.leads) || 75;
  const taxa = parseFloat(diagState.taxa) || 15;
  const ticket = parseFloat(diagState.ticket) || 600;
  const taxaIA = Math.min(taxa * 1.30, 100);
  const ganhoMes = Math.round(leads * ((taxaIA - taxa) / 100) * ticket);
  const ganhoAno = ganhoMes * 12;
  const fmt = function(n) { return 'R$ ' + n.toLocaleString('pt-BR'); };

  const lines = [
    'Ol\u00e1! Fiz o Diagn\u00f3stico de IA da Carnevali Solu\u00e7\u00f5es Digitais e quero receber meu resultado detalhado.',
    '',
    '\ud83d\udccb *Meu Diagn\u00f3stico:*',
    '\u2022 Nome: ' + nome,
    '\u2022 Empresa: ' + empresa,
    '\u2022 Cargo: ' + (cargo || 'N\u00e3o informado'),
    '\u2022 Segmento: ' + seg,
    '\u2022 Equipe de atendimento: ' + getLabel('equipe'),
    '\u2022 Leads/m\u00eas: ' + getLabel('leads'),
    '\u2022 Taxa de convers\u00e3o: ' + getLabel('taxa'),
    '\u2022 Ticket m\u00e9dio: ' + getLabel('ticket'),
    '\u2022 Principal desafio: ' + getLabel('desafio'),
    '',
    '\ud83d\udcca *ROI Estimado:*',
    '\u2022 Potencial extra/m\u00eas: ' + fmt(ganhoMes),
    '\u2022 Potencial extra/ano: ' + fmt(ganhoAno),
    '',
    'Aguardo o contato! \ud83d\ude80'
  ];

  const url = 'https://wa.me/5513988091008?text=' + encodeURIComponent(lines.join('\n'));
  window.open(url, '_blank', 'noopener');
}

// ROI Calculator Functionality
function initROICalculator() {
  const monthlyLeadsInput = document.getElementById('monthly-leads');
  const conversionRateInput = document.getElementById('conversion-rate');
  const ticketValueInput = document.getElementById('ticket-value');
  const responseTimeInput = document.getElementById('response-time');

  if (!monthlyLeadsInput) return; // Exit if calculator not on page

  // Display elements
  const leadsValue = document.getElementById('leads-value');
  const conversionValue = document.getElementById('conversion-value');
  const ticketDisplay = document.getElementById('ticket-display');
  const timeValue = document.getElementById('time-value');

  // Result elements
  const conversionIncrease = document.getElementById('conversion-increase');
  const additionalSales = document.getElementById('additional-sales');
  const extraRevenue = document.getElementById('extra-revenue');
  const roi12Months = document.getElementById('roi-12-months');

  function calculateROI() {
    const leads = parseInt(monthlyLeadsInput.value);
    const conversionRate = parseInt(conversionRateInput.value);
    const ticketValue = parseInt(ticketValueInput.value);
    const responseTime = parseInt(responseTimeInput.value);

    // Update display values
    leadsValue.textContent = leads;
    conversionValue.textContent = conversionRate + '%';
    ticketDisplay.textContent = 'R$ ' + ticketValue.toLocaleString('pt-BR');
    timeValue.textContent = responseTime + 'h';

    // Calculate improvements with AI Agent
    // Assumption: AI improves conversion by 30% due to instant response
    const improvementFactor = 0.30;
    const currentSales = (leads * conversionRate) / 100;
    const newConversionRate = conversionRate * (1 + improvementFactor);
    const newSales = (leads * newConversionRate) / 100;
    const additionalSalesCount = Math.round(newSales - currentSales);
    const monthlyExtraRevenue = additionalSalesCount * ticketValue;
    const yearlyRevenue = monthlyExtraRevenue * 12;

    // Assuming AI Agent costs ~R$1000/month
    const agentCost = 1000;
    const yearlyInvestment = agentCost * 12;
    const roiPercentage = Math.round((yearlyRevenue / yearlyInvestment) * 100);

    // Update results with simplified animation for changes
    conversionIncrease.textContent = '+' + Math.round(improvementFactor * 100) + '%';
    additionalSales.textContent = additionalSalesCount;
    extraRevenue.textContent = 'R$ ' + monthlyExtraRevenue.toLocaleString('pt-BR');
    roi12Months.textContent = roiPercentage.toLocaleString('pt-BR') + '%';
  }

  // Add event listeners
  monthlyLeadsInput.addEventListener('input', calculateROI);
  conversionRateInput.addEventListener('input', calculateROI);
  ticketValueInput.addEventListener('input', calculateROI);
  responseTimeInput.addEventListener('input', calculateROI);

  // Initial calculation
  calculateROI();
}

// Typewriter Effect
function initTypewriter() {
  const textElement = document.querySelector('.type-effect');
  if (!textElement) return;

  const phrases = ["Piloto Automático.", "WhatsApp.", "Instagram."];
  let phraseIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  let typeSpeed = 100;

  function type() {
    const currentPhrase = phrases[phraseIndex];

    if (isDeleting) {
      textElement.textContent = currentPhrase.substring(0, charIndex - 1);
      charIndex--;
      typeSpeed = 50;
    } else {
      textElement.textContent = currentPhrase.substring(0, charIndex + 1);
      charIndex++;
      typeSpeed = 100;
    }

    if (!isDeleting && charIndex === currentPhrase.length) {
      isDeleting = true;
      typeSpeed = 2000; // Pause at end
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      phraseIndex = (phraseIndex + 1) % phrases.length;
      typeSpeed = 500; // Pause before new word
    }

    setTimeout(type, typeSpeed);
  }

  type();
}

// Scroll Reveal
function initScrollReveal() {
  const reveals = document.querySelectorAll('.reveal');

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active');
      }
    });
  }, {
    threshold: 0.15
  });

  reveals.forEach(reveal => observer.observe(reveal));
}

// Animated Counters (Simple Implementation)
function initCounters() {
  // This could be expanded to animating numbers when they appear in viewport
  // For now, simpler implementation is fine as ROI calculator is interactive
}

// ============================================================
// Hamburger Menu
// ============================================================
function initHamburger() {
  const btn = document.getElementById('hamburger');
  const nav = document.getElementById('nav-links');
  if (!btn || !nav) return;

  btn.addEventListener('click', () => {
    const isOpen = nav.classList.toggle('open');
    btn.classList.toggle('open', isOpen);
    btn.setAttribute('aria-expanded', isOpen);
    document.body.style.overflow = isOpen ? 'hidden' : '';
  });

  // Close menu when a link is clicked
  nav.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      nav.classList.remove('open');
      btn.classList.remove('open');
      btn.setAttribute('aria-expanded', 'false');
      document.body.style.overflow = '';
    });
  });
}

// ============================================================
// Active Nav Link on Scroll
// ============================================================
function initActiveNavLink() {
  const sections = document.querySelectorAll('main section[id]');
  const navLinks = document.querySelectorAll('.nav-links a[href^="#"]');
  if (!sections.length || !navLinks.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute('id');
        navLinks.forEach(link => {
          link.classList.toggle('active', link.getAttribute('href') === `#${id}`);
        });
      }
    });
  }, {
    rootMargin: '-30% 0px -60% 0px',
    threshold: 0
  });

  sections.forEach(section => observer.observe(section));
}

// ============================================================
// Sticky CTA — Contextual: hide after the ROI section
// ============================================================
function initStickyCTA() {
  const stickyCta = document.querySelector('.sticky-cta');
  const roiSection = document.getElementById('roi-calculator');
  if (!stickyCta || !roiSection) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      // Hide sticky CTA once ROI section has scrolled past (user already saw it)
      if (!entry.isIntersecting && entry.boundingClientRect.top < 0) {
        stickyCta.style.transform = 'translateY(120%)';
        stickyCta.style.opacity = '0';
      } else {
        stickyCta.style.transform = '';
        stickyCta.style.opacity = '';
      }
    });
  }, { threshold: 0 });

  observer.observe(roiSection);

  // Add smooth transition to sticky CTA
  stickyCta.style.transition = 'transform .35s ease, opacity .35s ease';
}

// ============================================================
// ROI Simulação — Calculadora comparativa por inputs
// ============================================================
function calcularROI() {
  const leads = parseFloat(document.getElementById('sim-leads').value);
  const taxa = parseFloat(document.getElementById('sim-taxa').value);
  const ticket = parseFloat(document.getElementById('sim-ticket').value);
  const el = document.getElementById('roi-resultado');

  // Validação
  if (!leads || !taxa || !ticket || leads <= 0 || taxa <= 0 || ticket <= 0 || taxa > 100) {
    el.innerHTML = `
      <div class="roi-sim-placeholder">
        <span>⚠️</span>
        <p>Preencha os três campos com valores válidos.</p>
      </div>`;
    return;
  }

  // Cálculo
  const taxaIA = Math.min(taxa * 1.30, 100);
  const vendasHoje = Math.round(leads * (taxa / 100));
  const vendasIA = Math.round(leads * (taxaIA / 100));
  const recHoje = vendasHoje * ticket;
  const recIA = vendasIA * ticket;
  const ganhoMes = recIA - recHoje;
  const ganhoAno = ganhoMes * 12;
  const extra = vendasIA - vendasHoje;

  const fmt = n => n.toLocaleString('pt-BR', { minimumFractionDigits: 2 });
  const fmtN = n => n.toLocaleString('pt-BR');

  el.innerHTML = `
    <div class="roi-sim-cards">
      <div class="roi-sim-card hoje">
        <div class="roi-sim-card-title">📌 Situação Atual</div>
        <div class="roi-sim-row">
          <div class="roi-sim-metric">
            <span class="roi-sim-metric-lbl">Leads / mês</span>
            <span class="roi-sim-metric-val">${fmtN(leads)}</span>
          </div>
          <div class="roi-sim-metric">
            <span class="roi-sim-metric-lbl">Taxa de conversão</span>
            <span class="roi-sim-metric-val">${taxa.toFixed(1)}%</span>
          </div>
          <div class="roi-sim-metric">
            <span class="roi-sim-metric-lbl">Vendas / mês</span>
            <span class="roi-sim-metric-val">${fmtN(vendasHoje)}</span>
          </div>
          <div class="roi-sim-metric">
            <span class="roi-sim-metric-lbl">Receita / mês</span>
            <span class="roi-sim-metric-val">R$ ${fmt(recHoje)}</span>
          </div>
        </div>
      </div>
      <div class="roi-sim-card com-ia">
        <div class="roi-sim-card-title">🤖 Com Agente de IA</div>
        <div class="roi-sim-row">
          <div class="roi-sim-metric">
            <span class="roi-sim-metric-lbl">Leads / mês</span>
            <span class="roi-sim-metric-val">${fmtN(leads)}</span>
          </div>
          <div class="roi-sim-metric">
            <span class="roi-sim-metric-lbl">Taxa de conversão</span>
            <span class="roi-sim-metric-val">${taxaIA.toFixed(1)}% <small style="font-size:0.6rem;opacity:.65">(+30%)</small></span>
          </div>
          <div class="roi-sim-metric">
            <span class="roi-sim-metric-lbl">Vendas / mês</span>
            <span class="roi-sim-metric-val">${fmtN(vendasIA)} <small style="font-size:0.6rem;opacity:.65">(+${extra})</small></span>
          </div>
          <div class="roi-sim-metric">
            <span class="roi-sim-metric-lbl">Receita / mês</span>
            <span class="roi-sim-metric-val">R$ ${fmt(recIA)}</span>
          </div>
        </div>
      </div>
    </div>
    <div class="roi-sim-gain">
      <div class="roi-sim-gain-title">🚀 Potencial adicional estimado</div>
      <div class="roi-sim-gain-values">
        <span class="roi-sim-gain-month">+ R$ ${fmt(ganhoMes)}/mês</span>
        <span class="roi-sim-gain-year">→ R$ ${fmt(ganhoAno)}/ano</span>
      </div>
    </div>`;
}

