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
