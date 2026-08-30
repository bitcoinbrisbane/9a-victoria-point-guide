/* =========================================================
   Pinned header layout — 9A Edinburgh St
   ---------------------------------------------------------
   The full-height hero and the nav are both position:fixed at
   the top. Their heights vary with viewport width (the hero
   title uses clamp(); the nav can wrap), so this measures both
   and exposes them as CSS vars. Content padding and anchor
   offsets are calc()'d from --hero-h + --nav-h in CSS.
   ========================================================= */

(function () {
  "use strict";

  var hero = document.querySelector(".hero");
  var nav = document.querySelector(".quicknav");
  var root = document.documentElement;
  if (!hero || !nav) return;

  function measure() {
    root.style.setProperty("--hero-h", hero.offsetHeight + "px");
    root.style.setProperty("--nav-h", nav.offsetHeight + "px");
  }

  window.addEventListener("resize", measure);
  window.addEventListener("load", measure);
  if (document.fonts && document.fonts.ready) {
    document.fonts.ready.then(measure);
  }
  measure();
})();
