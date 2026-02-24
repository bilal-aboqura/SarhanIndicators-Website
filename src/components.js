// Global Components Loader
// Loads navbar and footer components dynamically

async function loadComponent(elementId, componentPath) {
  try {
    const response = await fetch(componentPath);
    if (!response.ok) {
      throw new Error(`Failed to load ${componentPath}`);
    }
    const html = await response.text();
    const element = document.getElementById(elementId);
    if (element) {
      element.innerHTML = html;
    }
  } catch (error) {
    console.error('Error loading component:', error);
  }
}

// Load components when DOM is ready
document.addEventListener('DOMContentLoaded', async () => {
  await Promise.all([
    loadComponent('navbar-placeholder', '/components/navbar.html'),
    loadComponent('footer-placeholder', '/components/footer.html')
  ]);

  // Initialize navbar functionality after loading
  initializeNavbar();

  // Initialize language (apply saved preference)
  if (window.i18n) {
    window.i18n.initLanguage();
  }

  // Notify other scripts that components are ready (for auth UI updates etc.)
  document.dispatchEvent(new Event('componentsLoaded'));
});

// Navbar functionality
function initializeNavbar() {
  const navbar = document.getElementById('navbar');
  const hamburger = document.getElementById('hamburger');
  const navLinks = document.getElementById('navLinks');

  if (!navbar) return;

  // Scroll effect
  const handleScroll = () => {
    if (window.scrollY > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  };
  window.addEventListener('scroll', handleScroll);
  handleScroll(); // Initial check

  if (hamburger && navLinks) {
    // Mobile menu toggle
    hamburger.addEventListener('click', () => {
      hamburger.classList.toggle('active');
      navLinks.classList.toggle('open');
      // Prevent scrolling when menu is open
      document.body.style.overflow = navLinks.classList.contains('open') ? 'hidden' : '';
    });

    // Close mobile menu when clicking a link
    const links = navLinks.querySelectorAll('a');
    links.forEach(link => {
      link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navLinks.classList.remove('open');
        document.body.style.overflow = '';
      });
    });
  }

  // Active link management based on current path
  const currentPath = window.location.pathname;
  const hash = window.location.hash;
  
  document.querySelectorAll('.nav-link').forEach(link => {
    const href = link.getAttribute('href');
    if (href === currentPath || (href && href.startsWith('/#') && hash)) {
      link.classList.add('active');
    } else {
      link.classList.remove('active');
    }
  });

  // User profile button update if logged in
  const user = JSON.parse(localStorage.getItem('user'));
  const loginBtn = document.getElementById('loginBtn');
  if (user && loginBtn) {
    loginBtn.href = '/profile';
    const t = window.i18n ? window.i18n.t : (k) => k;
    loginBtn.innerHTML = `
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
      <span data-i18n="nav.myAccount">${t('nav.myAccount')}</span>
    `;
  }
}
