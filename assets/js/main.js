/* =============================================
   NEXUM BUSINESS SAC - Main JavaScript
   Animaciones, interactividad, SEO helpers
   ============================================= */

/* ── Page Loader ── */
(function initLoader() {
  const loader = document.getElementById('page-loader');
  if (!loader) return;
  window.addEventListener('load', () => {
    setTimeout(() => loader.classList.add('loaded'), 300);
  });
})();

/* ── Scroll Progress Bar ── */
(function initScrollProgress() {
  const bar = document.getElementById('scroll-progress');
  if (!bar) return;
  function update() {
    const total = document.documentElement.scrollHeight - window.innerHeight;
    const pct = total > 0 ? (window.scrollY / total) * 100 : 0;
    bar.style.width = pct + '%';
  }
  window.addEventListener('scroll', update, { passive: true });
  update();
})();

/* ── Navbar scroll effect ── */
(function initNavbar() {
  const header = document.querySelector('header, nav.fixed, nav.sticky');
  if (!header) return;
  function onScroll() {
    if (window.scrollY > 20) {
      header.classList.add('navbar--scrolled');
    } else {
      header.classList.remove('navbar--scrolled');
    }
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
})();

/* ── Mobile Menu ── */
(function initMobileMenu() {
  const toggleBtn = document.getElementById('mobile-menu-toggle');
  const menu = document.getElementById('mobile-menu');
  if (!toggleBtn || !menu) return;

  function openMenu() {
    menu.classList.add('open');
    toggleBtn.classList.add('open');
    toggleBtn.setAttribute('aria-expanded', 'true');
    document.body.style.overflow = 'hidden';
  }

  function closeMenu() {
    menu.classList.remove('open');
    toggleBtn.classList.remove('open');
    toggleBtn.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
  }

  toggleBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    menu.classList.contains('open') ? closeMenu() : openMenu();
  });

  // Cerrar al clickar un link
  menu.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', closeMenu);
  });

  // Cerrar con Escape
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeMenu();
  });

  // Cerrar al clickar fuera
  document.addEventListener('click', (e) => {
    if (menu.classList.contains('open') &&
        !toggleBtn.contains(e.target) &&
        !menu.contains(e.target)) {
      closeMenu();
    }
  });

  // Cerrar al resize a desktop
  window.addEventListener('resize', () => {
    if (window.innerWidth >= 768) closeMenu();
  });
})();

/* ── Theme Toggle (dark ↔ light) ── */
(function initThemeToggle() {
  const btn = document.getElementById('theme-toggle');
  if (!btn) return;

  const html = document.documentElement;
  const currentPage = window.location.pathname;

  // Determine current theme from html class
  const isDark = html.classList.contains('dark');

  // Build the opposite-theme URL
  function getOppositeUrl() {
    const path = window.location.pathname;
    if (path.includes('/dark/')) {
      return path.replace('/dark/', '/light/');
    } else if (path.includes('/light/')) {
      return path.replace('/light/', '/dark/');
    }
    return '#';
  }

  btn.addEventListener('click', () => {
    const target = getOppositeUrl();
    if (target !== '#') {
      // Animate exit
      document.body.style.opacity = '0';
      document.body.style.transition = 'opacity 0.3s ease';
      setTimeout(() => { window.location.href = target; }, 280);
    }
  });
})();

/* ── Scroll Reveal (Intersection Observer) ── */
(function initScrollReveal() {
  // Auto-detect animatable elements inside sections
  const AUTO_SELECTORS = [
    'section > div > h1', 'section > div > h2', 'section > div > h3',
    'section > div > p', 'section > div > .grid > div',
    'section > div > div > h2', 'section > div > div > p',
    'section h1', 'section h2', 'section p.font-body-lg',
    '.reveal',
  ].join(', ');

  // Collect all animatable elements (skip those already in viewport on load)
  const candidates = Array.from(document.querySelectorAll(AUTO_SELECTORS));

  // Deduplicate and skip nav/footer/loader
  const seen = new Set();
  const elements = candidates.filter(el => {
    if (seen.has(el)) return false;
    seen.add(el);
    const inNavOrFooter = el.closest('nav, header, footer, #page-loader, #mobile-menu');
    return !inNavOrFooter;
  });

  if (!elements.length) return;

  // Apply initial hidden state
  elements.forEach((el, i) => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = `opacity 0.6s cubic-bezier(0.16,1,0.3,1) ${(i % 4) * 80}ms, transform 0.6s cubic-bezier(0.16,1,0.3,1) ${(i % 4) * 80}ms`;
  });

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.style.opacity = '1';
          entry.target.style.transform = 'none';
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.1, rootMargin: '0px 0px -30px 0px' }
  );

  elements.forEach(el => observer.observe(el));
})();

/* ── Lazy Image Loading ── */
(function initLazyImages() {
  const images = document.querySelectorAll('img[loading="lazy"]');
  images.forEach(img => {
    if (img.complete) {
      img.classList.add('loaded');
    } else {
      img.addEventListener('load', () => img.classList.add('loaded'));
    }
  });
})();

/* ── Back to Top ── */
(function initBackToTop() {
  const btn = document.getElementById('back-to-top');
  if (!btn) return;

  window.addEventListener('scroll', () => {
    btn.classList.toggle('visible', window.scrollY > 400);
  }, { passive: true });

  btn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
})();

/* ── Smooth page transitions ── */
(function initPageTransitions() {
  document.querySelectorAll('a[href]').forEach(link => {
    const href = link.getAttribute('href');
    // Only internal links, not anchors
    if (
      href &&
      !href.startsWith('#') &&
      !href.startsWith('mailto:') &&
      !href.startsWith('tel:') &&
      !href.startsWith('http') &&
      !link.hasAttribute('target')
    ) {
      link.addEventListener('click', (e) => {
        e.preventDefault();
        document.body.style.opacity = '0';
        document.body.style.transition = 'opacity 0.3s ease';
        setTimeout(() => { window.location.href = href; }, 280);
      });
    }
  });
})();

/* ── Active nav link + hover class injection ── */
(function initNavLinks() {
  var path = window.location.pathname;
  var currentFile = path.split('/').pop() || 'inicio.html';

  // Target only the DESKTOP nav (hidden md:flex)
  var desktopNavs = document.querySelectorAll(
    'nav.hidden.md\\:flex a, div.hidden.md\\:flex a, header nav a'
  );

  desktopNavs.forEach(function(link) {
    // Add nav-link class
    link.classList.add('nav-link');

    // Remove existing Tailwind active border classes
    link.classList.remove('border-b-2', 'border-primary', 'pb-1', 'font-bold');
    link.style.borderBottom = '';

    // Mark active
    var href = link.getAttribute('href') || '';
    var linkFile = href.split('/').pop();
    if (linkFile && linkFile === currentFile) {
      link.classList.add('active');
    }
  });
})();

/* ── Animated counters ── */
(function initCounters() {
  const counters = document.querySelectorAll('.counter[data-target]');
  if (!counters.length) return;

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el = entry.target;
        const target = parseInt(el.dataset.target, 10);
        const duration = parseInt(el.dataset.duration || '2000', 10);
        const suffix = el.dataset.suffix || '';
        const start = performance.now();

        function update(time) {
          const elapsed = time - start;
          const progress = Math.min(elapsed / duration, 1);
          const eased = 1 - Math.pow(1 - progress, 3);
          el.textContent = Math.round(eased * target) + suffix;
          if (progress < 1) requestAnimationFrame(update);
        }

        requestAnimationFrame(update);
        observer.unobserve(el);
      }
    });
  }, { threshold: 0.5 });

  counters.forEach(c => observer.observe(c));
})();

/* ── Page entry animation ── */
(function initPageEntry() {
  document.body.style.opacity = '0';
  document.body.style.transition = 'opacity 0.4s ease';
  requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      document.body.style.opacity = '1';
    });
  });
})();

/* ── Card tilt effect (subtle) ── */
(function initCardTilt() {
  const cards = document.querySelectorAll('.card-hover');
  cards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      card.style.transform = `translateY(-6px) rotateX(${-y * 6}deg) rotateY(${x * 6}deg)`;
      card.style.transition = 'transform 0.1s ease';
    });

    card.addEventListener('mouseleave', () => {
      card.style.transform = '';
      card.style.transition = 'transform 0.4s cubic-bezier(0.16, 1, 0.3, 1)';
    });
  });
})();
