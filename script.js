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

    // Update results
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
