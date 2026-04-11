/* ----------------------------------- */
/*    Creative Inference - script.js   */
/* ----------------------------------- */

(function () {
    'use strict';

    // ---- Mobile Navigation Toggle ----
    const navToggle = document.querySelector('.nav-toggle');
    const mainNav = document.getElementById('main-nav');

    if (navToggle && mainNav) {
        navToggle.addEventListener('click', function () {
            const isOpen = mainNav.classList.toggle('is-open');
            navToggle.classList.toggle('is-open');
            navToggle.setAttribute('aria-expanded', isOpen);
        });

        // Close nav when a link is clicked
        mainNav.querySelectorAll('a').forEach(function (link) {
            link.addEventListener('click', function () {
                mainNav.classList.remove('is-open');
                navToggle.classList.remove('is-open');
                navToggle.setAttribute('aria-expanded', 'false');
            });
        });
    }

    // ---- Smooth Scroll for Anchor Links ----
    document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
        anchor.addEventListener('click', function (e) {
            var targetId = this.getAttribute('href');
            if (targetId === '#') return;
            var target = document.querySelector(targetId);
            if (target) {
                e.preventDefault();
                target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });
    });

    // ---- Scroll Animations (IntersectionObserver) ----
    var animatedElements = document.querySelectorAll('.animate-on-scroll');

    if ('IntersectionObserver' in window && animatedElements.length > 0) {
        var observer = new IntersectionObserver(function (entries) {
            entries.forEach(function (entry) {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    observer.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '0px 0px -40px 0px'
        });

        animatedElements.forEach(function (el) {
            observer.observe(el);
        });
    } else {
        // Fallback: show everything if IntersectionObserver not supported
        animatedElements.forEach(function (el) {
            el.classList.add('visible');
        });
    }

    // ---- Active Nav Link on Scroll ----
    var sections = document.querySelectorAll('section[id]');
    var navLinks = document.querySelectorAll('.main-nav a');

    if ('IntersectionObserver' in window && sections.length > 0) {
        var navObserver = new IntersectionObserver(function (entries) {
            entries.forEach(function (entry) {
                if (entry.isIntersecting) {
                    var id = entry.target.getAttribute('id');
                    navLinks.forEach(function (link) {
                        link.classList.remove('active');
                        if (link.getAttribute('href') === '#' + id) {
                            link.classList.add('active');
                        }
                    });
                }
            });
        }, {
            threshold: 0.3,
            rootMargin: '-80px 0px -50% 0px'
        });

        sections.forEach(function (section) {
            navObserver.observe(section);
        });
    }

    // ---- Project Category Filter ----
    var filterButtons = document.querySelectorAll('.filter-btn');
    var projectCards = document.querySelectorAll('.project-card');

    filterButtons.forEach(function (btn) {
        btn.addEventListener('click', function () {
            var filter = this.getAttribute('data-filter');

            // Update active button
            filterButtons.forEach(function (b) { b.classList.remove('active'); });
            this.classList.add('active');

            // Filter cards
            projectCards.forEach(function (card) {
                if (filter === 'all' || card.getAttribute('data-category') === filter) {
                    card.classList.remove('hidden');
                } else {
                    card.classList.add('hidden');
                }
            });
        });
    });

    // ---- Auto-update Copyright Year ----
    var yearSpan = document.querySelector('.year');
    if (yearSpan) {
        yearSpan.textContent = new Date().getFullYear();
    }

})();
