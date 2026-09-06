// checks if the user has reduced motion turned on in their device settings
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

// mobile menu toggle
const navToggle = document.getElementById('navToggle');
const navLinks = document.getElementById('navLinks');

navToggle.addEventListener('click', () => {
  const isOpen = navLinks.classList.toggle('is-open');
  navToggle.setAttribute('aria-expanded', String(isOpen));
});

// close menu after clicking a link
navLinks.querySelectorAll('a').forEach((link) => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('is-open');
    navToggle.setAttribute('aria-expanded', 'false');
  });
});

// adds shadow to navbar once you scroll down a bit
const header = document.getElementById('header');

window.addEventListener('scroll', () => {
  header.classList.toggle('is-scrolled', window.scrollY > 20);
});

// highlights the current section's nav link while scrolling
const sections = document.querySelectorAll('main section[id]');
const navLinkByHref = new Map();
document.querySelectorAll('.nav__link').forEach((link) => {
  navLinkByHref.set(link.getAttribute('href'), link);
});

const spyObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      const link = navLinkByHref.get(`#${entry.target.id}`);
      if (!link) return;
      document.querySelectorAll('.nav__link').forEach((l) => l.classList.remove('is-active'));
      link.classList.add('is-active');
    });
  },
  { rootMargin: '-45% 0px -45% 0px' }
);

sections.forEach((section) => spyObserver.observe(section));

// fade-in animation when scrolling to a section
// elements in the same group get a small delay so they appear one after another
if (!prefersReducedMotion) {
  const revealGroups = new Map();

  const revealObserver = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;

        const el = entry.target;
        const parent = el.parentElement;
        const index = revealGroups.get(parent) || 0;
        el.style.setProperty('--rd', `${Math.min(index, 5) * 0.1}s`);
        revealGroups.set(parent, index + 1);

        el.classList.add('is-visible');
        observer.unobserve(el);
      });
    },
    { threshold: 0.15, rootMargin: '0px 0px -60px 0px' }
  );

  document.querySelectorAll('.reveal-on-scroll').forEach((el) => revealObserver.observe(el));
} else {
  // reduced motion is on, just show everything right away
  document.querySelectorAll('.reveal-on-scroll').forEach((el) => el.classList.add('is-visible'));
}

// contact form - no backend yet, just shows a fake success message
const contactForm = document.getElementById('contactForm');
const contactStatus = document.getElementById('contactStatus');

contactForm.addEventListener('submit', (e) => {
  e.preventDefault();

  if (!contactForm.checkValidity()) {
    contactStatus.textContent = 'Please fill in every field before sending.';
    return;
  }

  contactStatus.textContent = 'Message sent — thanks! (demo only, no backend yet)';
  contactForm.reset();
});

// footer year
document.getElementById('year').textContent = new Date().getFullYear();