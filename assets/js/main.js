/* Dongeng Digital — interaksi ringan */

(function () {
  "use strict";

  /* ----- Menu mobile ----- */
  var menuBtn = document.getElementById("menuBtn");
  var nav = document.getElementById("nav");
  if (menuBtn && nav) {
    menuBtn.addEventListener("click", function () {
      var open = menuBtn.getAttribute("aria-expanded") === "true";
      menuBtn.setAttribute("aria-expanded", String(!open));
      nav.classList.toggle("open", !open);
      menuBtn.classList.toggle("open", !open);
    });
    nav.addEventListener("click", function (e) {
      if (e.target.closest("a")) {
        nav.classList.remove("open");
        menuBtn.setAttribute("aria-expanded", "false");
      }
    });
  }

  /* ----- Reveal on scroll ----- */
  var reveals = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window) {
    var io = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (en) {
          if (en.isIntersecting) {
            en.target.classList.add("in");
            io.unobserve(en.target);
          }
        });
      },
      { threshold: 0.12 }
    );
    reveals.forEach(function (el) { io.observe(el); });
  } else {
    reveals.forEach(function (el) { el.classList.add("in"); });
  }

  /* ----- Tahun footer ----- */
  var y = document.getElementById("year");
  if (y) y.textContent = new Date().getFullYear();

  /* ----- Tombol salin tautan ----- */
  var copyBtn = document.getElementById("copyLink");
  if (copyBtn) {
    copyBtn.addEventListener("click", function () {
      var url = "https://sdamandiri.my.id/";
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(url).then(function () {
          showToast("Tautan disalin ✓");
        });
      }
    });
  }

  /* ----- Toast sederhana ----- */
  function showToast(msg) {
    var t = document.getElementById("toast");
    if (!t) return;
    t.textContent = msg;
    t.classList.add("show");
    setTimeout(function () { t.classList.remove("show"); }, 2200);
  }

  /* ----- Skeleton e-book: sembunyikan saat iframe siap ----- */
  var frame = document.getElementById("canvaFrame");
  var sk = document.getElementById("readerSkeleton");
  if (frame && sk) {
    frame.addEventListener("load", function () {
      sk.classList.add("hide");
    });
    setTimeout(function () { sk.classList.add("hide"); }, 6000);
  }
})();
