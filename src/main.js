/* ============================================================
   SARHAN INDICATORS — Main JavaScript
   Handles: pricing toggle, FAQ accordion, navbar, scroll reveal,
            mobile menu, and auth state
   ============================================================ */


// ---- Mobile Menu Toggle ----
const hamburger = document.getElementById('hamburger');
const navLinksEl = document.getElementById('navLinks');

if (hamburger && navLinksEl) {
  hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navLinksEl.classList.toggle('open');
  });

  // Close menu when a link is clicked
  navLinksEl.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      hamburger.classList.remove('active');
      navLinksEl.classList.remove('open');
    });
  });
}


// ---- Active Nav Link (Section Scroll Spy) ----
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.navbar-links a');

function updateActiveLink() {
  const scrollPos = window.scrollY + 200;

  sections.forEach((section) => {
    const top = section.offsetTop;
    const height = section.offsetHeight;
    const id = section.getAttribute('id');

    if (scrollPos >= top && scrollPos < top + height) {
      navLinks.forEach((link) => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${id}`) {
          link.classList.add('active');
        }
      });
    }
  });
}

window.addEventListener('scroll', updateActiveLink, { passive: true });
updateActiveLink(); // Initial check

// ---- Pricing Toggles ----
const billingToggle = document.getElementById('billingToggle');
const currencyToggle = document.getElementById('currencyToggle');

let currentBilling = 'yearly';
let currentCurrency = 'usd';

function updatePricing() {
  const key = `${currentBilling}-${currentCurrency}`;

  // Update amounts
  document.querySelectorAll('.pricing-card .amount').forEach((el) => {
    const value = el.getAttribute(`data-${key}`);
    if (value !== null) el.textContent = value;
  });

  // Update old prices
  document.querySelectorAll('.pricing-card .old-price').forEach((el) => {
    const value = el.getAttribute(`data-${key}`);
    el.textContent = value || '';
    el.style.display = value ? 'inline' : 'none';
  });

  // Update discounts
  document.querySelectorAll('.pricing-card .discount').forEach((el) => {
    const value = el.getAttribute(`data-${currentBilling}`);
    el.textContent = value || '';
    el.style.display = value ? 'inline-block' : 'none';
  });

  // Update periods
  document.querySelectorAll('.pricing-card .period').forEach((el) => {
    const value = el.getAttribute(`data-${currentBilling}`);
    if (value !== null) el.textContent = value;
  });
}

function setupToggle(toggleGroup, stateKey) {
  if (!toggleGroup) return;

  const buttons = toggleGroup.querySelectorAll('button');
  buttons.forEach((btn) => {
    btn.addEventListener('click', () => {
      buttons.forEach((b) => b.classList.remove('active'));
      btn.classList.add('active');

      if (stateKey === 'billing') {
        currentBilling = btn.getAttribute('data-billing');
      } else {
        currentCurrency = btn.getAttribute('data-currency');
      }

      updatePricing();
    });
  });
}

setupToggle(billingToggle, 'billing');
setupToggle(currencyToggle, 'currency');

// Initialize pricing
updatePricing();

// ---- FAQ Accordion ----
document.querySelectorAll('.faq-question').forEach((question) => {
  question.addEventListener('click', () => {
    const item = question.parentElement;
    const answer = item.querySelector('.faq-answer');
    const isOpen = item.classList.contains('open');

    // Close all
    document.querySelectorAll('.faq-item').forEach((faqItem) => {
      faqItem.classList.remove('open');
      faqItem.querySelector('.faq-answer').style.maxHeight = null;
    });

    // Open clicked if it was closed
    if (!isOpen) {
      item.classList.add('open');
      answer.style.maxHeight = answer.scrollHeight + 'px';
    }
  });
});

// ---- Scroll Reveal ----
const revealElements = document.querySelectorAll('.reveal');

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        revealObserver.unobserve(entry.target);
      }
    });
  },
  {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px',
  }
);

revealElements.forEach((el) => revealObserver.observe(el));

// ---- Subscribe Buttons ----
document.querySelectorAll('.subscribe-btn').forEach((btn) => {
  btn.addEventListener('click', async () => {
    const planId = btn.getAttribute('data-plan-id');

    // Check if user is logged in
    const token = localStorage.getItem('token');
    if (!token) {
      // Redirect to login with return url
      window.location.href = `/login?redirect=${encodeURIComponent(window.location.pathname + '#pricing')}&plan=${planId}`;
      return;
    }

    try {
      btn.disabled = true;
      btn.textContent = window.i18n ? window.i18n.t('pricing.loading') : 'Loading...';

      const response = await fetch('/api/payment/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          planId,
          billingCycle: currentBilling,
          currency: currentCurrency === 'usd' ? 'USD' : 'EGP',
        }),
      });

      const data = await response.json();

      if (data.success && data.paymentUrl) {
        window.location.href = data.paymentUrl;
      } else {
        alert(data.message || (window.i18n ? window.i18n.t('general.error') : 'An error occurred.'));
      }
    } catch (err) {
      console.error('Payment error:', err);
      alert(window.i18n ? window.i18n.t('general.connectionError') : 'Connection error.');
    } finally {
      btn.disabled = false;
      btn.textContent = window.i18n ? window.i18n.t('pricing.subscribe') : 'Subscribe Now';
    }
  });
});

// ---- Auth State ----
function updateAuthUI() {
  const token = localStorage.getItem('token');
  const user = JSON.parse(localStorage.getItem('user') || '{}');
  const loginBtn = document.getElementById('loginBtn');

  if (token && loginBtn) {
    loginBtn.href = '/profile';
    loginBtn.textContent = window.i18n ? window.i18n.t('nav.myAccount') : 'My Account';

    // Show admin link for admins
    if (user.role === 'admin') {
      const actionsContainer = loginBtn.parentElement;
      if (actionsContainer && !document.getElementById('adminBtn')) {
        const adminBtn = document.createElement('a');
        adminBtn.id = 'adminBtn';
        adminBtn.href = '/admin';
        adminBtn.className = 'btn btn-outline btn-sm';
        adminBtn.textContent = window.i18n ? window.i18n.t('nav.adminPanel') : 'Admin Panel';
        adminBtn.style.marginRight = 'var(--sp-sm)';
        actionsContainer.insertBefore(adminBtn, loginBtn);
      }
    }
  }
}

updateAuthUI();
// Also run after dynamically loaded navbar is ready
document.addEventListener('componentsLoaded', updateAuthUI);

// ---- Smooth Scroll for Anchor Links ----
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener('click', (e) => {
    const targetId = anchor.getAttribute('href');
    if (targetId === '#') return;

    const target = document.querySelector(targetId);
    if (target) {
      e.preventDefault();
      const offset = navbar.offsetHeight + 20;
      const top = target.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  });
});

// ---- Dynamic Pricing ----
async function fetchPricing() {
  try {
    const res = await fetch('/api/pricing');
    const result = await res.json();
    const data = result.pricing || [];

    if (!Array.isArray(data) || data.length === 0) return;

    data.forEach(item => {
      // Find the card for this plan
      const card = document.querySelector(`.pricing-card[data-plan="${item.planId}"]`);
      if (!card) return;

      const amountEl = card.querySelector('.amount');
      const oldPriceEl = card.querySelector('.old-price');
      const discountEl = card.querySelector('.discount');

      // Construct data attribute keys
      const cycle = item.billingCycle; // 'monthly' or 'yearly'
      const cur = item.currency.toLowerCase(); // 'usd' or 'egp'
      const attrKey = `${cycle}-${cur}`; // e.g., 'monthly-usd'

      // Format values
      const formattedAmount = item.currency === 'USD' ? `$${item.amount}` : `${item.amount} EGP`;
      const formattedOriginal = item.originalAmount ? (item.currency === 'USD' ? `$${item.originalAmount}` : `${item.originalAmount} EGP`) : '';
      const formattedDiscount = item.discountPercentage ? `${item.discountPercentage}%` : '';

      // Update attributes
      if (amountEl) amountEl.setAttribute(`data-${attrKey}`, formattedAmount);
      if (oldPriceEl) oldPriceEl.setAttribute(`data-${attrKey}`, formattedOriginal);
      
      // Discount is cycle specific
      // The HTML structure has data-yearly="50% off". Let's update that.
      if (discountEl && formattedDiscount) {
         // Append 'خصم' or just replace content if needed. HTML has '50% خصم'
         const discountLabel = window.i18n ? window.i18n.t('pricing.discount') : 'OFF';
         const discountText = `${formattedDiscount} ${discountLabel}`;
         if (cycle === 'yearly') discountEl.setAttribute(`data-${cycle}`, discountText);
         if (cycle === 'monthly') discountEl.setAttribute(`data-${cycle}`, discountText);
      }
    });

    // Refresh view
    if (typeof updatePricing === 'function') updatePricing();

  } catch (e) {
    console.error('Failed to load pricing:', e);
  }
}

// Initial fetch
fetchPricing();
