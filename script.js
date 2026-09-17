// Mobile nav toggle with keyboard and outside-click support.
const navToggle = document.getElementById('navToggle');
const mainNav = document.getElementById('main-nav');

const closeMenu = () => {
  mainNav?.classList.remove('open');
  navToggle?.setAttribute('aria-expanded', 'false');
  navToggle?.setAttribute('aria-label', 'Open navigation menu');
};

navToggle?.addEventListener('click', () => {
  const isOpen = mainNav.classList.toggle('open');
  navToggle.setAttribute('aria-expanded', String(isOpen));
  navToggle.setAttribute('aria-label', isOpen ? 'Close navigation menu' : 'Open navigation menu');
  if (isOpen) mainNav.querySelector('a')?.focus();
});

mainNav?.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    closeMenu();
  });
});

document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape' && mainNav?.classList.contains('open')) {
    closeMenu();
    navToggle?.focus();
  }
});

document.addEventListener('click', (event) => {
  if (mainNav?.classList.contains('open') && !mainNav.contains(event.target) && !navToggle.contains(event.target)) {
    closeMenu();
  }
});

// Scroll-spy for active nav link
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.main-nav a');

const spyObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const id = entry.target.getAttribute('id');
      navLinks.forEach(link => {
        link.classList.toggle('active-link', link.getAttribute('href') === `#${id}`);
      });
    }
  });
}, { rootMargin: '-40% 0px -50% 0px' });

sections.forEach(section => spyObserver.observe(section));

// Reveal content as it enters the viewport, while preserving reduced-motion preferences.
const revealItems = document.querySelectorAll('.about-text, .about-facts li, .stall-item, .route-step, .why-item, .contact-copy, .contact-form');
revealItems.forEach((item, index) => {
  item.classList.add('reveal');
  item.style.setProperty('--reveal-delay', `${Math.min(index % 4, 3) * 70}ms`);
});

const revealObserver = new IntersectionObserver((entries, observer) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('is-visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

revealItems.forEach(item => revealObserver.observe(item));

// Product category filter
const tabs = document.querySelectorAll('.stall-tab');
const items = document.querySelectorAll('.stall-item');

tabs.forEach(tab => {
  tab.addEventListener('click', () => {
    tabs.forEach(t => { t.classList.remove('active'); t.setAttribute('aria-selected', 'false'); });
    tab.classList.add('active');
    tab.setAttribute('aria-selected', 'true');

    const filter = tab.dataset.filter;
    items.forEach(item => {
      const show = filter === 'all' || item.dataset.cat === filter;
      item.classList.toggle('hidden', !show);
    });
  });
});

// Send the enquiry through the visitor's default email application.
const form = document.getElementById('contactForm');
const formNote = document.getElementById('formNote');

form?.addEventListener('submit', (e) => {
  e.preventDefault();
  const formData = new FormData(form);
  const name = String(formData.get('name') || '').trim();
  const email = String(formData.get('email') || '').trim();
  const message = String(formData.get('message') || '').trim();
  const subject = `Import enquiry from ${name}`;
  const body = [`Name: ${name}`, `Email: ${email}`, '', message].join('\n');
  const mailto = `mailto:abkadar3010@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

  formNote.textContent = 'Opening your email app with the enquiry details.';
  window.location.href = mailto;
});
