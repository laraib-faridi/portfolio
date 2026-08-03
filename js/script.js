/* ==========================================================================
   PORTFOLIO SCRIPT
   Vanilla JavaScript — no external libraries/frameworks
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {

  /* ---------------------------------------------------------------------
     1. LOADING SCREEN
  --------------------------------------------------------------------- */
  const loader = document.getElementById('loader');
  if (loader) {
    window.addEventListener('load', () => {
      setTimeout(() => loader.classList.add('hide'), 600);
    });
  }

  /* ---------------------------------------------------------------------
     2. YEAR IN FOOTER
  --------------------------------------------------------------------- */
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  /* ---------------------------------------------------------------------
     3. DARK / LIGHT MODE TOGGLE
  --------------------------------------------------------------------- */
  const themeToggle = document.getElementById('themeToggle');
  const root = document.documentElement;
  const savedTheme = localStorage.getItem('portfolio-theme') ||
    (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
  root.setAttribute('data-theme', savedTheme);

  if (themeToggle) {
    themeToggle.addEventListener('click', () => {
      const current = root.getAttribute('data-theme');
      const next = current === 'dark' ? 'light' : 'dark';
      root.setAttribute('data-theme', next);
      localStorage.setItem('portfolio-theme', next);
    });
  }

  /* ---------------------------------------------------------------------
     4. STICKY NAVBAR + SCROLL PROGRESS + BACK TO TOP + ACTIVE LINK
  --------------------------------------------------------------------- */
  const navbar = document.getElementById('navbar');
  const scrollProgress = document.getElementById('scrollProgress');
  const backToTop = document.getElementById('backToTop');
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');

  function onScroll() {
    const scrollY = window.scrollY;

    // Sticky navbar state
    navbar.classList.toggle('scrolled', scrollY > 40);

    // Scroll progress bar
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const progress = docHeight > 0 ? (scrollY / docHeight) * 100 : 0;
    scrollProgress.style.width = progress + '%';

    // Back to top button visibility
    backToTop.classList.toggle('show', scrollY > 600);

    // Active nav link highlight
    let currentSection = '';
    sections.forEach(section => {
      const sectionTop = section.offsetTop - 140;
      if (scrollY >= sectionTop) currentSection = section.getAttribute('id');
    });
    navLinks.forEach(link => {
      link.classList.toggle('active', link.getAttribute('href') === '#' + currentSection);
    });
  }
  document.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  backToTop.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));

  /* ---------------------------------------------------------------------
     5. MOBILE NAVIGATION
  --------------------------------------------------------------------- */
  const navToggle = document.getElementById('navToggle');
  const navLinksWrap = document.getElementById('navLinks');

  navToggle.addEventListener('click', () => {
    navToggle.classList.toggle('active');
    navLinksWrap.classList.toggle('open');
  });

  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      navToggle.classList.remove('active');
      navLinksWrap.classList.remove('open');
    });
  });

  /* ---------------------------------------------------------------------
     6. CUSTOM CURSOR + MOUSE GLOW (desktop only)
  --------------------------------------------------------------------- */
  const cursorDot = document.getElementById('cursorDot');
  const cursorRing = document.getElementById('cursorRing');
  const mouseGlow = document.getElementById('mouseGlow');
  const isTouch = window.matchMedia('(hover: none), (pointer: coarse)').matches;

  if (!isTouch) {
    let ringX = 0, ringY = 0, mouseX = 0, mouseY = 0;

    document.addEventListener('mousemove', (e) => {
      mouseX = e.clientX; mouseY = e.clientY;
      cursorDot.style.left = mouseX + 'px';
      cursorDot.style.top = mouseY + 'px';
      mouseGlow.style.left = mouseX + 'px';
      mouseGlow.style.top = mouseY + 'px';
    });

    function animateRing() {
      ringX += (mouseX - ringX) * 0.15;
      ringY += (mouseY - ringY) * 0.15;
      cursorRing.style.left = ringX + 'px';
      cursorRing.style.top = ringY + 'px';
      requestAnimationFrame(animateRing);
    }
    animateRing();

    document.querySelectorAll('a, button, .service-card, .project-card, .tool-card').forEach(el => {
      el.addEventListener('mouseenter', () => cursorRing.classList.add('active'));
      el.addEventListener('mouseleave', () => cursorRing.classList.remove('active'));
    });
  } else {
    if (mouseGlow) mouseGlow.style.display = 'none';
  }

  /* ---------------------------------------------------------------------
     7. HERO TYPING EFFECT
  --------------------------------------------------------------------- */
  const typedText = document.getElementById('typedText');
  const roles = ['Software Engineer', 'Web Developer', 'UI Developer', 'Problem Solver'];
  let roleIndex = 0, charIndex = 0, isDeleting = false;

  function typeLoop() {
    const currentRole = roles[roleIndex];
    if (isDeleting) {
      charIndex--;
      typedText.textContent = currentRole.substring(0, charIndex);
    } else {
      charIndex++;
      typedText.textContent = currentRole.substring(0, charIndex);
    }

    let speed = isDeleting ? 45 : 90;

    if (!isDeleting && charIndex === currentRole.length) {
      speed = 1600;
      isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      roleIndex = (roleIndex + 1) % roles.length;
      speed = 300;
    }
    setTimeout(typeLoop, speed);
  }
  if (typedText) typeLoop();

  /* ---------------------------------------------------------------------
     8. SCROLL REVEAL ANIMATIONS (Intersection Observer)
  --------------------------------------------------------------------- */
  const revealEls = document.querySelectorAll('[data-reveal]');
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        setTimeout(() => entry.target.classList.add('revealed'), i * 60);
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });
  revealEls.forEach(el => revealObserver.observe(el));

  /* ---------------------------------------------------------------------
     9. ANIMATED SKILL BARS
  --------------------------------------------------------------------- */
  const skillBars = document.querySelectorAll('.skill-bar');
  const skillObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const bar = entry.target;
        const percent = bar.getAttribute('data-percent');
        const fill = bar.querySelector('.bar-fill');
        const label = bar.querySelector('.skill-bar-head em');
        fill.style.width = percent + '%';

        let current = 0;
        const step = Math.max(1, Math.round(percent / 40));
        const counter = setInterval(() => {
          current += step;
          if (current >= percent) { current = percent; clearInterval(counter); }
          label.textContent = current + '%';
        }, 25);

        skillObserver.unobserve(bar);
      }
    });
  }, { threshold: 0.4 });
  skillBars.forEach(bar => skillObserver.observe(bar));

  /* ---------------------------------------------------------------------
     10. ANIMATED COUNTERS (About section)
  --------------------------------------------------------------------- */
  const counters = document.querySelectorAll('.counter');
  const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el = entry.target;
        const target = parseInt(el.getAttribute('data-count'), 10);
        let current = 0;
        const step = Math.max(1, Math.round(target / 60));
        const timer = setInterval(() => {
          current += step;
          if (current >= target) { current = target; clearInterval(timer); }
          el.textContent = current;
        }, 30);
        counterObserver.unobserve(el);
      }
    });
  }, { threshold: 0.5 });
  counters.forEach(c => counterObserver.observe(c));

  /* ---------------------------------------------------------------------
     11. PROJECT FILTERING (Portfolio section)
  --------------------------------------------------------------------- */
  const filterBtns = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('.project-card');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const filter = btn.getAttribute('data-filter');

      projectCards.forEach(card => {
        const match = filter === 'all' || card.getAttribute('data-category') === filter;
        card.classList.toggle('hidden-card', !match);
      });
    });
  });

  /* ---------------------------------------------------------------------
     12. TESTIMONIAL SLIDER
  --------------------------------------------------------------------- */
  const track = document.getElementById('testimonialTrack');
  const dotsWrap = document.getElementById('testimonialDots');
  const slides = track.children.length;
  let activeSlide = 0;

  for (let i = 0; i < slides; i++) {
    const dot = document.createElement('button');
    dot.setAttribute('aria-label', 'Go to testimonial ' + (i + 1));
    if (i === 0) dot.classList.add('active');
    dot.addEventListener('click', () => goToSlide(i));
    dotsWrap.appendChild(dot);
  }

  function goToSlide(index) {
    activeSlide = (index + slides) % slides;
    track.style.transform = `translateX(-${activeSlide * 100}%)`;
    [...dotsWrap.children].forEach((dot, i) => dot.classList.toggle('active', i === activeSlide));
  }

  let autoSlide = setInterval(() => goToSlide(activeSlide + 1), 5500);
  track.addEventListener('mouseenter', () => clearInterval(autoSlide));
  track.addEventListener('mouseleave', () => { autoSlide = setInterval(() => goToSlide(activeSlide + 1), 5500); });

  /* ---------------------------------------------------------------------
     13. CONTACT FORM VALIDATION
  --------------------------------------------------------------------- */
  const form = document.getElementById('contactForm');
  const formSuccess = document.getElementById('formSuccess');

  function showError(fieldId, message) {
    const field = document.getElementById(fieldId);
    const errorEl = document.getElementById(fieldId + 'Error');
    field.closest('.form-group').classList.toggle('error', !!message);
    errorEl.textContent = message || '';
  }

  function validateForm() {
    let valid = true;
    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const subject = document.getElementById('subject').value.trim();
    const message = document.getElementById('message').value.trim();
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (name.length < 2) { showError('name', 'Please enter your full name.'); valid = false; }
    else showError('name', '');

    if (!emailPattern.test(email)) { showError('email', 'Please enter a valid email address.'); valid = false; }
    else showError('email', '');

    if (subject.length < 3) { showError('subject', 'Please enter a subject.'); valid = false; }
    else showError('subject', '');

    if (message.length < 10) { showError('message', 'Message should be at least 10 characters.'); valid = false; }
    else showError('message', '');

    return valid;
  }

  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      if (formSuccess) formSuccess.classList.remove('show');

      if (validateForm()) {
        // Client-side demo only: connect a real form backend/service to receive messages.
        if (formSuccess) formSuccess.classList.add('show');
        form.reset();
        if (formSuccess) {
          setTimeout(() => formSuccess.classList.remove('show'), 5000);
        }
      }
    });
  }

  /* ---------------------------------------------------------------------
     14. RIPPLE BUTTON EFFECT
  --------------------------------------------------------------------- */
  document.querySelectorAll('.ripple').forEach(btn => {
    btn.addEventListener('click', function (e) {
      const rect = this.getBoundingClientRect();
      const ripple = document.createElement('span');
      const size = Math.max(rect.width, rect.height);
      ripple.className = 'ripple-effect';
      ripple.style.width = ripple.style.height = size + 'px';
      ripple.style.left = (e.clientX - rect.left - size / 2) + 'px';
      ripple.style.top = (e.clientY - rect.top - size / 2) + 'px';
      this.appendChild(ripple);
      setTimeout(() => ripple.remove(), 650);
    });
  });

  /* ---------------------------------------------------------------------
     15. SMOOTH SCROLL FOR NAV ANCHORS (with header offset)
  --------------------------------------------------------------------- */
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const targetId = this.getAttribute('href');
      const target = document.querySelector(targetId);
      if (target) {
        e.preventDefault();
        const offset = target.offsetTop - 80;
        window.scrollTo({ top: offset, behavior: 'smooth' });
      }
    });
  });

});
