"use strict";

/* ==========================================================
   TEDDIES - PRODUCTION JS
========================================================== */

/* ---------- UTIL ---------- */

const $ = (selector) => document.querySelector(selector);
const $$ = (selector) => document.querySelectorAll(selector);

/* ==========================================================
   MOBILE NAV
========================================================== */

const menuBtn = $(".mobile-menu-btn");
const navLinks = $(".nav-links");

if (menuBtn && navLinks) {
    menuBtn.addEventListener("click", () => {
        navLinks.classList.toggle("active");
    });

    $$(".nav-links a").forEach(link => {
        link.addEventListener("click", () => {
            navLinks.classList.remove("active");
        });
    });
}

/*Better scroll system*/

const revealElements = $$(".card, .testimonial, .menu-item, .section");

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add("visible");
        }
    });
}, {
    threshold: 0.15
});

revealElements.forEach(el => {
    el.classList.add("reveal");
    observer.observe(el);
});
