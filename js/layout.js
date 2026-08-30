/* =========================================================
   Pinned header layout — 9A Edinburgh St
   ---------------------------------------------------------
   The hero band and nav are both position:fixed at the top,
   with fixed heights via CSS vars. The only variable part is
   the nav height (it can wrap to two rows on some widths), so
   this measures it and updates --nav-h. Content padding and
   anchor offsets are calc()'d from --hero-h + --nav-h in CSS.
   ========================================================= */

(function () {
  "use strict";

  var nav = document.querySelector(".quicknav");
  var root = document.documentElement;
  if (!nav) return;

  function measureNav() {
    root.style.setProperty("--nav-h", nav.offsetHeight + "px");
  }

  window.addEventListener("resize", measureNav);
  window.addEventListener("load", measureNav);
  if (document.fonts && document.fonts.ready) {
    document.fonts.ready.then(measureNav);
  }
  measureNav();
})();
