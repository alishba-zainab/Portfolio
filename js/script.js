/* =========================================================
   script.js
   Every feature here is plain vanilla JavaScript — no build
   step, no libraries. Each block is independent, so you can
   read/explain/remove any one of them on its own.
   ========================================================= */

// Respect the user's motion preference — several effects below check this.
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

/* ---------------------------------------------------------
   1. Mobile nav toggle
   --------------------------------------------------------- */
const navToggle = document.getElementById('navToggle');
const navLinks = document.getElementById('navLinks');

navToggle.addEventListener('click', () => {
  const isOpen = navLinks.classList.toggle('is-open');
  navToggle.setAttribute('aria-expanded', String(isOpen));
});

// Close the mobile menu whenever a link is clicked
navLinks.querySelectorAll('a').forEach((link) => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('is-open');
    navToggle.setAttribute('aria-expanded', 'false');
  });
});

/* ---------------------------------------------------------
   2. Header shadow on scroll
   --------------------------------------------------------- */
const header = document.getElementById('header');

window.addEventListener('scroll', () => {
  header.classList.toggle('is-scrolled', window.scrollY > 20);
});

/* ---------------------------------------------------------
   3. Scroll-spy: highlight the nav link for the section
      currently in view, using IntersectionObserver.
   --------------------------------------------------------- */
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
  { rootMargin: '-45% 0px -45% 0px' } // triggers when a section crosses the middle of the viewport
);

sections.forEach((section) => spyObserver.observe(section));

/* ---------------------------------------------------------
   4. Scroll-triggered reveals.
      Every element with .reveal-on-scroll fades/slides in the
      first time it enters the viewport. Elements that share a
      parent (a skills grid, a project grid, a timeline list)
      get a small incremental delay so they stagger instead of
      popping in all at once.
   --------------------------------------------------------- */
if (!prefersReducedMotion) {
  const revealGroups = new Map(); // parent element -> count of children revealed so far

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
  // Motion is disabled — just show everything immediately.
  document.querySelectorAll('.reveal-on-scroll').forEach((el) => el.classList.add('is-visible'));
}

/* ---------------------------------------------------------
   5. Project cards zoom forward on hover — handled entirely
      in CSS (.project-card:hover). No JS needed for this one.
   --------------------------------------------------------- */

/* ---------------------------------------------------------
   7. Contact form — front-end only.
      There is no backend yet, so this just confirms the
      message "sent" and resets the form. Wire this up to a
      real endpoint (Formspree, EmailJS, your own API) later.
   --------------------------------------------------------- */
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

/* ---------------------------------------------------------
   8. Footer year
   --------------------------------------------------------- */
document.getElementById('year').textContent = new Date().getFullYear();
