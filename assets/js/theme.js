/* =============================================
   NEXUM - Theme Manager
   Debe cargarse antes que cualquier otro script
   para evitar el parpadeo de tema incorrecto
   ============================================= */

(function() {
  'use strict';

  var STORAGE_KEY = 'nexum-theme';

  function getStored() {
    try { return localStorage.getItem(STORAGE_KEY) || 'auto'; } catch(e) { return 'auto'; }
  }

  function setStored(t) {
    try { localStorage.setItem(STORAGE_KEY, t); } catch(e) {}
  }

  function systemIsDark() {
    return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
  }

  function effectiveTheme(t) {
    return t === 'auto' ? (systemIsDark() ? 'dark' : 'light') : t;
  }

  // Anti-flicker: redirect immediately if wrong theme
  var path = window.location.pathname;
  var inDark  = path.indexOf('/dark/')  !== -1;
  var inLight = path.indexOf('/light/') !== -1;

  if (inDark || inLight) {
    var stored    = getStored();
    var effective = effectiveTheme(stored);
    var shouldBeDark = effective === 'dark';

    if (shouldBeDark && inLight) {
      window.location.replace(path.replace('/light/', '/dark/'));
      return;
    }
    if (!shouldBeDark && inDark) {
      window.location.replace(path.replace('/dark/', '/light/'));
      return;
    }
  }

  // Create floating widget after DOM is ready
  function createWidget() {
    var stored = getStored();
    var widget = document.createElement('div');
    widget.id = 'theme-widget';
    widget.setAttribute('role', 'group');
    widget.setAttribute('aria-label', 'Selector de tema');
    widget.innerHTML =
      '<button data-t="auto"  title="Automático (sistema)"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/></svg><span>Auto</span></button>' +
      '<button data-t="light" title="Modo claro"><svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><circle cx="12" cy="12" r="5"/><line x1="12" y1="2" x2="12" y2="4" stroke="currentColor" stroke-width="2"/><line x1="12" y1="20" x2="12" y2="22" stroke="currentColor" stroke-width="2"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64" stroke="currentColor" stroke-width="2"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78" stroke="currentColor" stroke-width="2"/><line x1="2" y1="12" x2="4" y2="12" stroke="currentColor" stroke-width="2"/><line x1="20" y1="12" x2="22" y2="12" stroke="currentColor" stroke-width="2"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36" stroke="currentColor" stroke-width="2"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22" stroke="currentColor" stroke-width="2"/></svg><span>Claro</span></button>' +
      '<button data-t="dark"  title="Modo oscuro"><svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg><span>Oscuro</span></button>';

    // Mark current
    widget.querySelector('[data-t="' + stored + '"]').classList.add('active');

    widget.addEventListener('click', function(e) {
      var btn = e.target.closest('[data-t]');
      if (!btn) return;
      var theme = btn.getAttribute('data-t');
      setStored(theme);

      var p = window.location.pathname;
      var nowDark  = p.indexOf('/dark/')  !== -1;
      var nowLight = p.indexOf('/light/') !== -1;
      var goDark   = effectiveTheme(theme) === 'dark';

      if ((nowDark || nowLight)) {
        if (goDark && !nowDark) {
          document.body.style.opacity = '0';
          document.body.style.transition = 'opacity 0.25s ease';
          setTimeout(function() { window.location.href = p.replace('/light/', '/dark/'); }, 220);
          return;
        }
        if (!goDark && !nowLight) {
          document.body.style.opacity = '0';
          document.body.style.transition = 'opacity 0.25s ease';
          setTimeout(function() { window.location.href = p.replace('/dark/', '/light/'); }, 220);
          return;
        }
      }
      // Same mode — just update widget UI
      widget.querySelectorAll('[data-t]').forEach(function(b) { b.classList.remove('active'); });
      btn.classList.add('active');
    });

    document.body.appendChild(widget);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', createWidget);
  } else {
    createWidget();
  }
})();
