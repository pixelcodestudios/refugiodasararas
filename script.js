(function () {
  "use strict";

  /* =========================================================
     CONFIGURAÇÃO — preencher com os dados reais do cliente
     ========================================================= */
  const CONFIG = {
    WHATSAPP_NUMBER: "5562993213203",
    WHATSAPP_MESSAGE: "Olá! Vim pelo site e gostaria de saber mais sobre a Chácara Refúgio das Araras.",
    // TODO: inserir o link real do anúncio no Airbnb
    AIRBNB_URL: "",
    INSTAGRAM_URL: "https://www.instagram.com/refugiodasararas",
    EMAIL: "Refugiodasararas@gmail.com",
    // Endereço aproximado usado apenas para abrir uma busca no Google Maps (nenhuma coordenada foi inventada)
    ADDRESS_QUERY: "Chácara Refúgio das Araras, Condomínio Contendas, BR-070, Pirenópolis - GO"
  };

  const mapsUrl = "https://www.google.com/maps/search/?api=1&query=" + encodeURIComponent(CONFIG.ADDRESS_QUERY);
  const whatsappUrl = CONFIG.WHATSAPP_NUMBER
    ? "https://wa.me/" + CONFIG.WHATSAPP_NUMBER + "?text=" + encodeURIComponent(CONFIG.WHATSAPP_MESSAGE)
    : "#";
  const airbnbUrl = CONFIG.AIRBNB_URL || "#";
  const instaUrl = CONFIG.INSTAGRAM_URL || "#";
  const emailUrl = CONFIG.EMAIL ? "mailto:" + CONFIG.EMAIL : "#";

  function wireLink(id, href, disabledIfEmpty) {
    const el = document.getElementById(id);
    if (!el) return;
    el.href = href;
    if (disabledIfEmpty && href === "#") {
      el.setAttribute("aria-disabled", "true");
      el.addEventListener("click", function (e) {
        e.preventDefault();
      });
    }
  }

  wireLink("mapsLink", mapsUrl);
  wireLink("mapsLinkFooter", mapsUrl);
  wireLink("whatsappCta", whatsappUrl, true);
  wireLink("whatsappLink", whatsappUrl, true);
  wireLink("whatsappFloat", whatsappUrl, true);
  wireLink("airbnbCta", airbnbUrl, true);
  wireLink("airbnbLink", airbnbUrl, true);
  wireLink("instaLink", instaUrl, true);
  wireLink("emailLink", emailUrl, true);

  /* =========================================================
     HEADER — estado ao rolar
     ========================================================= */
  const header = document.getElementById("siteHeader");
  function onScroll() {
    if (window.scrollY > 40) header.classList.add("scrolled");
    else header.classList.remove("scrolled");
  }
  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });

  /* =========================================================
     MENU MOBILE
     ========================================================= */
  const navToggle = document.getElementById("navToggle");
  const mainNav = document.getElementById("mainNav");
  navToggle.addEventListener("click", function () {
    const open = mainNav.classList.toggle("open");
    navToggle.setAttribute("aria-expanded", open ? "true" : "false");
    document.body.style.overflow = open ? "hidden" : "";
  });
  mainNav.querySelectorAll("a").forEach(function (a) {
    a.addEventListener("click", function () {
      mainNav.classList.remove("open");
      navToggle.setAttribute("aria-expanded", "false");
      document.body.style.overflow = "";
    });
  });

  /* =========================================================
     ÍCONES — sprite simples injetado via data-icon
     ========================================================= */
  const ICONS = {
    leaf: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M4 20C4 10 12 4 21 4c0 9-8 16-17 16Z" opacity="0.92"/><path d="M6 18C10 12 14 8 19 5" fill="none" stroke="#FBF8F1" stroke-width="1.3" stroke-linecap="round" opacity="0.55"/></svg>',
    tree: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2 5 13h4l-4 7h14l-4-7h4L12 2Z" opacity="0.92"/><rect x="11" y="20" width="2" height="2"/></svg>',
    home: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><path d="M4 11 12 4l8 7"/><path d="M6 10v10h12V10"/></svg>',
    sun: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><circle cx="12" cy="12" r="4.5"/><path d="M12 2v3M12 19v3M4.2 4.2l2.1 2.1M17.7 17.7l2.1 2.1M2 12h3M19 12h3M4.2 19.8l2.1-2.1M17.7 6.3l2.1-2.1"/></svg>',
    pool: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><path d="M3 17c1.5 1.3 3 1.3 4.5 0s3-1.3 4.5 0 3 1.3 4.5 0 3-1.3 4.5 0"/><path d="M3 21c1.5 1.1 3 1.1 4.5 0s3-1.1 4.5 0 3 1.1 4.5 0 3-1.1 4.5 0"/><path d="M6 13V6a2 2 0 0 1 2-2h3l7 7"/></svg>',
    gourmet: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M7 2v7a2 2 0 1 1-4 0V2M5 9v13M17 2c-1.6 1.6-1.6 4.4-1.6 6S15.4 11 17 11s1.6-1.4 1.6-3-.4-4.9-1.6-6ZM17 11v11"/></svg>',
    grill: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M4 9h16"/><rect x="5" y="9" width="14" height="8" rx="1.2"/><path d="M9 9v8M12 9v8M15 9v8M6 17l-2 4M18 17l2 4"/></svg>',
    billiard: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><rect x="2.5" y="6" width="19" height="12" rx="1.2"/><circle cx="9" cy="12" r="1.6" fill="currentColor" stroke="none"/><circle cx="15.5" cy="10" r="1.6"/><circle cx="15.5" cy="10" r="0.4" fill="currentColor" stroke="none"/></svg>',
    fire: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3s4 4 4 8a4 4 0 0 1-8 0c0-1.2.6-2 1.2-2.8C10 10 9 12 9 14a3 3 0 0 0 6 0c0-3-3-6-3-11Z"/></svg>',
    kitchen: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M5 11h14v2a7 7 0 0 1-14 0v-2Z"/><path d="M5 12H3M21 12h-2M12 5.5v2"/><path d="M9 3c0 .8-.8.8-.8 1.6S9 5.5 9 6.3M15 3c0 .8-.8.8-.8 1.6s.8.9.8 1.7"/></svg>',
    wifi: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"><path d="M4 9c4.5-4.3 11.5-4.3 16 0M7 12.5c2.8-2.6 6.2-2.6 9 0M10.2 16c1.1-1 2.5-1 3.6 0"/><circle cx="12" cy="19" r="0.9" fill="currentColor" stroke="none"/></svg>',
    parking: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><rect x="4" y="4" width="16" height="16" rx="2"/><path d="M9.5 16V8h3.2a2.4 2.4 0 0 1 0 4.8H9.5"/></svg>',
    paw: '<svg viewBox="0 0 24 24" fill="currentColor"><circle cx="6.3" cy="9.2" r="2.1"/><circle cx="12" cy="6.3" r="2.1"/><circle cx="17.7" cy="9.2" r="2.1"/><path d="M12 11.5c-4.1 0-7.2 2.7-7.2 5.5 0 2 1.8 3.4 3.7 2.8 1.1-.4 2.3-1 3.5-1s2.4.6 3.5 1c1.9.6 3.7-.8 3.7-2.8 0-2.8-3.1-5.5-7.2-5.5Z"/></svg>',
    pin: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M12 21s7-6.5 7-12a7 7 0 1 0-14 0c0 5.5 7 12 7 12Z"/><circle cx="12" cy="9" r="2.4"/></svg>'
  };

  document.querySelectorAll("[data-icon]").forEach(function (el) {
    const name = el.getAttribute("data-icon");
    if (ICONS[name]) el.innerHTML = ICONS[name];
  });

  /* =========================================================
     REVEAL ON SCROLL
     ========================================================= */
  const revealTargets = document.querySelectorAll(
    ".split-text, .split-media, .amenity-card, .who-card, .stay-text, .stay-media, .review-card, .experience-list"
  );
  revealTargets.forEach(function (el) { el.classList.add("reveal"); });

  if ("IntersectionObserver" in window) {
    const io = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("in-view");
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15, rootMargin: "0px 0px -60px 0px" }
    );
    revealTargets.forEach(function (el) { io.observe(el); });
  } else {
    revealTargets.forEach(function (el) { el.classList.add("in-view"); });
  }

  /* =========================================================
     GALERIA — LIGHTBOX
     ========================================================= */
  const galleryGrid = document.getElementById("galleryGrid");
  const galleryItems = Array.prototype.slice.call(galleryGrid.querySelectorAll(".g-item"));
  const lightbox = document.getElementById("lightbox");
  const lbImage = document.getElementById("lbImage");
  const lbClose = document.getElementById("lbClose");
  const lbPrev = document.getElementById("lbPrev");
  const lbNext = document.getElementById("lbNext");
  let currentIndex = 0;

  function openLightbox(index) {
    currentIndex = index;
    updateLightboxImage();
    lightbox.hidden = false;
    document.body.style.overflow = "hidden";
    lbClose.focus();
  }
  function updateLightboxImage() {
    const item = galleryItems[currentIndex];
    const full = item.getAttribute("data-full");
    const alt = item.querySelector("img").getAttribute("alt");
    lbImage.src = full;
    lbImage.alt = alt || "";
  }
  function closeLightbox() {
    lightbox.hidden = true;
    document.body.style.overflow = "";
  }
  function showPrev() {
    currentIndex = (currentIndex - 1 + galleryItems.length) % galleryItems.length;
    updateLightboxImage();
  }
  function showNext() {
    currentIndex = (currentIndex + 1) % galleryItems.length;
    updateLightboxImage();
  }

  galleryItems.forEach(function (item, index) {
    item.addEventListener("click", function () { openLightbox(index); });
  });
  lbClose.addEventListener("click", closeLightbox);
  lbPrev.addEventListener("click", showPrev);
  lbNext.addEventListener("click", showNext);
  lightbox.addEventListener("click", function (e) {
    if (e.target === lightbox) closeLightbox();
  });
  document.addEventListener("keydown", function (e) {
    if (lightbox.hidden) return;
    if (e.key === "Escape") closeLightbox();
    if (e.key === "ArrowLeft") showPrev();
    if (e.key === "ArrowRight") showNext();
  });

  /* Swipe support (mobile) */
  let touchStartX = 0;
  lightbox.addEventListener("touchstart", function (e) { touchStartX = e.changedTouches[0].screenX; }, { passive: true });
  lightbox.addEventListener("touchend", function (e) {
    const dx = e.changedTouches[0].screenX - touchStartX;
    if (Math.abs(dx) > 40) { dx > 0 ? showPrev() : showNext(); }
  }, { passive: true });

  /* =========================================================
     RODAPÉ — ano atual
     ========================================================= */
  document.getElementById("year").textContent = new Date().getFullYear();
})();
