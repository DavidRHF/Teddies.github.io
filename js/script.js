"use strict";

/* ==========================================================
   TEDDIES - PRODUCTION JS (CLEAN VERSION)
========================================================== */

/* ---------- UTIL HELPERS ---------- */

const $ = (selector) => document.querySelector(selector);
const $$ = (selector) => document.querySelectorAll(selector);

/* ==========================================================
   MOBILE NAV
========================================================== */

const menuBtn = $(".mobile-menu-btn");
const navLinks = $(".nav-links");

if (menuBtn && navLinks) {

    menuBtn.addEventListener("click", () => {
        const isOpen = navLinks.classList.toggle("active");
        menuBtn.setAttribute("aria-expanded", isOpen);
    });

    $$(".nav-links a").forEach(link => {
        link.addEventListener("click", () => {
            navLinks.classList.remove("active");
            menuBtn.setAttribute("aria-expanded", false);
        });
    });
}

/* ==========================================================
   STICKY NAV SCROLL EFFECT
========================================================== */

const navbar = $(".navbar");

if (navbar) {
    window.addEventListener("scroll", () => {
        navbar.classList.toggle("scrolled", window.scrollY > 50);
    });
}

/* ==========================================================
   SCROLL REVEAL (PRODUCTION SAFE)
========================================================== */

const revealElements = $$(".card, .testimonial, .menu-item, .section");

if (revealElements.length > 0) {

    const observer = new IntersectionObserver((entries, obs) => {

        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("visible");
                obs.unobserve(entry.target); // run once (better performance)
            }
        });

    }, {
        threshold: 0.15
    });

    revealElements.forEach(el => {
        el.classList.add("reveal");
        observer.observe(el);
    });
}

/* ==========================================================
   MENU FILTER SYSTEM (FIXED)
========================================================== */

const filterButtons = $$(".filter-btn");
const menuItems = $$(".menu-item");

if (filterButtons.length > 0 && menuItems.length > 0) {

    filterButtons.forEach(btn => {

        btn.addEventListener("click", () => {

            const filter = btn.dataset.filter;

            // reset buttons
            filterButtons.forEach(b => {
                b.classList.remove("btn-primary");
                b.classList.add("btn-secondary");
            });

            btn.classList.add("btn-primary");
            btn.classList.remove("btn-secondary");

            // filter items
            menuItems.forEach(item => {

                const category = item.dataset.category;

                if (filter === "all" || filter === category) {
                    item.style.display = "block";
                } else {
                    item.style.display = "none";
                }
            });

        });

    });
}

/* ==========================================================
   GALLERY LIGHTBOX (SAFE)
========================================================== */

const galleryImages = $$(".gallery-item img");
const lightbox = $("#lightbox");
const lightboxImg = $("#lightbox-img");

if (galleryImages.length > 0 && lightbox && lightboxImg) {

    galleryImages.forEach(img => {

        img.addEventListener("click", () => {
            lightbox.style.display = "flex";
            lightboxImg.src = img.src;
        });

    });

    lightbox.addEventListener("click", () => {
        lightbox.style.display = "none";
    });
}

/* ==========================================================
   CONTACT FORM (GITHUB PAGES SAFE VERSION)
========================================================== */

/* ==========================================================
   CONTACT FORM (NETLIFY PRODUCTION READY)
========================================================== */

const form = document.querySelector("#contactForm");
const formMessage = document.querySelector("#formMessage");

if (form) {

    // Let Netlify handle submission naturally
    form.addEventListener("submit", () => {

        // Optional UI feedback BEFORE redirect/Netlify handling
        if (formMessage) {
            formMessage.textContent = "Sending your reservation...";
            formMessage.style.color = "#8B5E3C";
        }

        // DO NOT preventDefault — Netlify needs the POST
    });

}

const links = document.querySelectorAll(".nav-links a");
const currentPage = window.location.pathname;

links.forEach(link => {
    if (link.getAttribute("href") === currentPage) {
        link.classList.add("active");
    }
});


/* ==========================================================
   CUSTOM CURSOR SYSTEM (PRODUCTION VERSION)
========================================================== */


document.addEventListener("DOMContentLoaded", () => {

    const cursor = document.querySelector(".custom-cursor");

    if (!cursor) return;

    // follow mouse
    document.addEventListener("mousemove", (e) => {
        cursor.style.left = e.clientX + "px";
        cursor.style.top = e.clientY + "px";
    });

    // helper function
    const setCursor = (emoji) => {
        cursor.textContent = emoji;
    };

    // default
    setCursor("🍯");

    // hover targets + emoji mapping
    const map = [
        { selector: "a", emoji: "🐻" },
        { selector: "button, .btn", emoji: "🍔" },
        { selector: ".special, .highlight", emoji: "⭐" },
        { selector: "img", emoji: "👀" }
    ];

    map.forEach(item => {

        document.querySelectorAll(item.selector).forEach(el => {

            el.addEventListener("mouseenter", () => {
                setCursor(item.emoji);
            });

            el.addEventListener("mouseleave", () => {
                setCursor("🍯");
            });

        });

    });

});
