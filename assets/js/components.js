/* =============================================
   NEXUM BUSINESS SAC - Shared Components
   Header + Footer injected into every page
   ============================================= */
(function () {
  var path = window.location.pathname;
  var isDark = path.indexOf('/dark/') !== -1;
  var currentFile = path.split('/').pop() || 'inicio.html';

  /* ── Dark Header ── */
  var DARK_HEADER = [
    '<nav class="fixed top-0 w-full z-50 bg-glass-surface backdrop-blur-xl border-b border-glass-border shadow-sm" id="site-nav">',
    '  <div class="flex justify-between items-center px-grid-margin max-w-container-max-width mx-auto h-20">',
    '    <a href="inicio.html" class="flex items-center gap-3 hover:opacity-80 transition-opacity">',
    '      <img src="../assets/images/logo.png" alt="Nexum" class="h-16 w-auto rounded-md">',
    '    </a>',
    '    <div class="hidden md:flex gap-8 items-center font-body-md text-body-md">',
    '      <a class="nav-link text-on-surface-variant hover:text-primary transition-colors" href="inicio.html">Inicio</a>',
    '      <a class="nav-link text-on-surface-variant hover:text-primary transition-colors" href="moodle.html">Soluciones</a>',
    '      <a class="nav-link text-on-surface-variant hover:text-primary transition-colors" href="servicios.html">Servicios</a>',
    '      <a class="nav-link text-on-surface-variant hover:text-primary transition-colors" href="nosotros.html">Nosotros</a>',
    '      <a class="nav-link text-on-surface-variant hover:text-primary transition-colors" href="contacto.html">Contacto</a>',
    '    </div>',
    '    <a href="contacto.html" class="hidden md:flex bg-primary text-on-primary px-6 py-2 rounded-full font-label-sm text-label-sm hover:bg-primary-fixed transition-colors items-center gap-2">',
    '      Agenda una consultoría',
    '      <span class="material-symbols-outlined text-[18px]">arrow_forward</span>',
    '    </a>',
    '    <button class="md:hidden hamburger text-text-primary p-2 rounded-md hover:bg-primary/10 transition-all duration-300" id="mobile-menu-toggle" aria-expanded="false" aria-controls="mobile-menu">',
    '      <span class="material-symbols-outlined">menu</span>',
    '    </button>',
    '  </div>',
    '</nav>',
    '<div id="mobile-menu" class="md:hidden bg-[#0F0F14] shadow-xl border-t border-glass-border" role="navigation" aria-label="Menú mobile">',
    '  <div class="px-4 py-3 flex flex-col gap-1">',
    '    <a class="block py-3 px-4 rounded-lg text-on-surface-variant hover:text-primary hover:bg-primary/10 transition-all duration-200" href="inicio.html">Inicio</a>',
    '    <a class="block py-3 px-4 rounded-lg text-on-surface-variant hover:text-primary hover:bg-primary/10 transition-all duration-200" href="servicios.html">Servicios</a>',
    '    <a class="block py-3 px-4 rounded-lg text-on-surface-variant hover:text-primary hover:bg-primary/10 transition-all duration-200" href="cloud.html">Cloud</a>',
    '    <a class="block py-3 px-4 rounded-lg text-on-surface-variant hover:text-primary hover:bg-primary/10 transition-all duration-200" href="moodle.html">Moodle</a>',
    '    <a class="block py-3 px-4 rounded-lg text-on-surface-variant hover:text-primary hover:bg-primary/10 transition-all duration-200" href="nosotros.html">Experiencia</a>',
    '    <a class="block py-3 px-4 rounded-lg text-on-surface-variant hover:text-primary hover:bg-primary/10 transition-all duration-200" href="contacto.html">Contacto</a>',
    '  </div>',
    '</div>',
  ].join('\n');

  /* ── Light Header ── */
  var LIGHT_HEADER = [
    '<nav class="fixed top-0 w-full z-50 backdrop-blur-md border-b shadow-sm" id="site-nav" style="background:rgba(255,255,255,0.88);border-color:rgba(0,0,0,0.09);">',
    '  <div class="flex justify-between items-center px-grid-margin max-w-container-max-width mx-auto h-20">',
    '    <a href="inicio.html" class="flex items-center gap-3 hover:opacity-80 transition-opacity">',
    '      <img src="../assets/images/logo.png" alt="Nexum" class="h-16 w-auto rounded-md">',
    '    </a>',
    '    <div class="hidden md:flex gap-8 items-center font-body-md text-body-md">',
    '      <a class="nav-link text-on-surface-variant hover:text-primary transition-colors" href="inicio.html">Inicio</a>',
    '      <a class="nav-link text-on-surface-variant hover:text-primary transition-colors" href="moodle.html">Soluciones</a>',
    '      <a class="nav-link text-on-surface-variant hover:text-primary transition-colors" href="servicios.html">Servicios</a>',
    '      <a class="nav-link text-on-surface-variant hover:text-primary transition-colors" href="nosotros.html">Nosotros</a>',
    '      <a class="nav-link text-on-surface-variant hover:text-primary transition-colors" href="contacto.html">Contacto</a>',
    '    </div>',
    '    <a href="contacto.html" class="hidden md:flex bg-primary text-on-primary px-6 py-2 rounded-full font-label-sm text-label-sm hover:opacity-90 transition-opacity items-center gap-2">',
    '      Agenda una consultoría',
    '      <span class="material-symbols-outlined text-[18px]">arrow_forward</span>',
    '    </a>',
    '    <button class="md:hidden hamburger text-text-primary p-2 rounded-md hover:bg-primary/10 transition-all duration-300" id="mobile-menu-toggle" aria-expanded="false" aria-controls="mobile-menu">',
    '      <span class="material-symbols-outlined">menu</span>',
    '    </button>',
    '  </div>',
    '</nav>',
    '<div id="mobile-menu" class="md:hidden bg-white shadow-xl border-t" style="border-color:rgba(0,0,0,0.09);" role="navigation" aria-label="Menú mobile">',
    '  <div class="px-4 py-3 flex flex-col gap-1">',
    '    <a class="block py-3 px-4 rounded-lg text-on-surface-variant hover:text-primary hover:bg-primary/10 transition-all duration-200" href="inicio.html">Inicio</a>',
    '    <a class="block py-3 px-4 rounded-lg text-on-surface-variant hover:text-primary hover:bg-primary/10 transition-all duration-200" href="servicios.html">Servicios</a>',
    '    <a class="block py-3 px-4 rounded-lg text-on-surface-variant hover:text-primary hover:bg-primary/10 transition-all duration-200" href="cloud.html">Cloud</a>',
    '    <a class="block py-3 px-4 rounded-lg text-on-surface-variant hover:text-primary hover:bg-primary/10 transition-all duration-200" href="moodle.html">Moodle</a>',
    '    <a class="block py-3 px-4 rounded-lg text-on-surface-variant hover:text-primary hover:bg-primary/10 transition-all duration-200" href="nosotros.html">Experiencia</a>',
    '    <a class="block py-3 px-4 rounded-lg text-on-surface-variant hover:text-primary hover:bg-primary/10 transition-all duration-200" href="contacto.html">Contacto</a>',
    '  </div>',
    '</div>',
  ].join('\n');

  /* ── Shared Footer (CSS overrides in main.css handle light colors) ── */
  var SHARED_FOOTER = [
    '<footer class="w-full bg-surface-container-lowest border-t border-glass-border z-10 relative">',
    '  <div class="grid grid-cols-1 md:grid-cols-4 gap-grid-gutter px-grid-margin py-16 max-w-container-max-width mx-auto">',
    '    <div class="flex flex-col gap-4">',
    '      <a href="inicio.html" class="flex items-center gap-3 opacity-90 hover:opacity-100 transition-opacity">',
    '        <img src="../assets/images/logo.png" alt="Nexum" class="h-24 w-auto rounded-md">',
    '      </a>',
    '      <p class="font-body-md text-body-md text-text-secondary mt-2">Enterprise Cloud &amp; Software Solutions. Potenciando la infraestructura digital corporativa en el Perú.</p>',
    '    </div>',
    '    <div class="md:col-start-4 flex flex-col items-start md:items-end gap-3 font-body-md text-body-md">',
    '      <a class="text-on-surface-variant hover:text-on-surface transition-colors opacity-80 hover:opacity-100" href="https://linkedin.com/company/nexum-business-sac" target="_blank" rel="noopener">LinkedIn</a>',
    '      <a class="text-primary underline opacity-80 hover:opacity-100 transition-opacity" href="legales.html">Términos y Condiciones</a>',
    '      <a class="text-on-surface-variant hover:text-on-surface transition-colors opacity-80 hover:opacity-100" href="legales.html">Cookies</a>',
    '    </div>',
    '    <div class="col-span-1 md:col-span-4 mt-8 pt-8 border-t border-glass-border/50 text-center md:text-left">',
    '      <span class="font-body-md text-body-md text-text-muted">© 2025 Nexum Business SAC. Lima, Perú. Todos los derechos reservados.</span>',
    '    </div>',
    '  </div>',
    '</footer>',
  ].join('\n');

  /* ── Inject ── */
  var headerEl = document.getElementById('site-header');
  var footerEl = document.getElementById('site-footer');

  if (headerEl) {
    headerEl.outerHTML = isDark ? DARK_HEADER : LIGHT_HEADER;
    var navLinks = document.querySelectorAll('#site-nav .nav-link');
    navLinks.forEach(function (link) {
      var href = (link.getAttribute('href') || '').split('/').pop();
      if (href === currentFile) link.classList.add('active');
    });
  }

  if (footerEl) {
    footerEl.outerHTML = SHARED_FOOTER;
  }
})();
