/* ==========================================================================
   Creative Inference — Interactive Tour, Split-Flap, Dual-Buffer Simone
   Cinemagraph Studio & Code 128 Set B Night Pass Engine
   ========================================================================== */

(function () {
    'use strict';

    var REDUCED_MOTION =
        typeof window !== 'undefined' &&
        window.matchMedia &&
        window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // ---- 1. Split-Flap Departure-Board Engine ----
    var FLAP_ALPHABET = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789· ';

    function renderStaticFlap(el, text) {
        var clean = String(text || '').toUpperCase();
        el.setAttribute('aria-label', clean);
        el.innerHTML = '';
        var frag = document.createDocumentFragment();
        for (var i = 0; i < clean.length; i++) {
            var ch = clean[i];
            var span = document.createElement('span');
            span.className = ch === ' ' ? 'flap-tile is-space' : 'flap-tile';
            span.setAttribute('aria-hidden', 'true');
            span.textContent = ch === ' ' ? '\u00A0' : ch;
            frag.appendChild(span);
        }
        el.appendChild(frag);
    }

    function flipSplitFlap(el, nextText) {
        if (!el) return;
        var target = String(nextText || el.getAttribute('data-flap') || '').toUpperCase();
        el.setAttribute('data-flap', target);

        if (el._flapTimer) {
            clearTimeout(el._flapTimer);
            el._flapTimer = null;
        }

        if (REDUCED_MOTION) {
            renderStaticFlap(el, target);
            return;
        }

        renderStaticFlap(el, target);
        var tiles = Array.prototype.slice.call(el.children);
        var remaining = tiles.map(function (_, idx) {
            var ch = target[idx] || ' ';
            return ch === ' ' ? 0 : 5 + Math.min(idx, 10) + Math.floor(Math.random() * 3);
        });

        function tick() {
            var anyLeft = false;
            for (var i = 0; i < tiles.length; i++) {
                if (remaining[i] <= 0) continue;
                remaining[i] -= 1;
                var tile = tiles[i];
                if (remaining[i] === 0) {
                    var ch = target[i] || ' ';
                    tile.textContent = ch === ' ' ? '\u00A0' : ch;
                    tile.classList.remove('is-flipping');
                } else {
                    anyLeft = true;
                    tile.classList.add('is-flipping');
                    tile.textContent = FLAP_ALPHABET[Math.floor(Math.random() * (FLAP_ALPHABET.length - 1))];
                }
            }
            if (anyLeft) {
                el._flapTimer = setTimeout(tick, 44);
            } else {
                el._flapTimer = null;
            }
        }

        el._flapTimer = setTimeout(tick, 44);
    }

    document.querySelectorAll('[data-flap]').forEach(function (el) {
        renderStaticFlap(el, el.getAttribute('data-flap'));
    });

    if ('IntersectionObserver' in window && !REDUCED_MOTION) {
        var flapObserver = new IntersectionObserver(function (entries) {
            entries.forEach(function (entry) {
                if (!entry.isIntersecting) return;
                flapObserver.unobserve(entry.target);
                flipSplitFlap(entry.target, entry.target.getAttribute('data-flap'));
            });
        }, { threshold: 0.2 });

        document.querySelectorAll('[data-flap]:not([data-flap-manual])').forEach(function (el) {
            flapObserver.observe(el);
        });
    }

    // ---- 2. Code 128 Set B SVG Barcode Generator ----
    var CODE128_PATTERNS = [
        '11011001100','11001101100','11001100110','10010011000','10010001100','10001001100','10011001000','10011000100',
        '10001100100','11001001000','11001000100','11000100100','10110011100','10011011100','10011001110','10111001100',
        '10011101100','10011100110','11001110010','11001011100','11001001110','11011100100','11001110100','11101101110',
        '11101001100','11100101100','11100100110','11101100100','11100110100','11100110010','11011011000','11011000110',
        '11000110110','10100011000','10001011000','10001000110','10110001000','10001101000','10001100010','11010001000',
        '11000101000','11000100010','10110111000','10110001110','10001101110','10111011000','10111000110','10001110110',
        '11101110110','11010001110','11000101110','11011101000','11011100010','11011101110','11101011000','11101000110',
        '11100010110','11101101000','11101100010','11100011010','11101111010','11001000010','11110001010','10100110000',
        '10100001100','10010110000','10010000110','10000101100','10000100110','10110010000','10110000100','10011010000',
        '10011000010','10000110100','10000110010','11000010010','11001010000','11110111010','11000010100','10001111010',
        '10100111100','10010111100','10010011110','10111100100','10011110100','10011110010','11110100100','11110010100',
        '11110010010','11011011110','11011110110','11110110110','10101111000','10100011110','10001011110','10111101000',
        '10111100010','11110101000','11110100010','10111011110','10111101110','11101011110','11110101110','11010000100',
        '11010010000','11010011100','1100011101011'
    ];

    function renderCode128Svg(text) {
        var clean = String(text || 'BARDC').replace(/[^\x20-\x7E]/g, '').slice(0, 32) || 'BARDC';
        var codes = [104];
        var checksum = 104;
        for (var i = 0; i < clean.length; i++) {
            var val = clean.charCodeAt(i) - 32;
            codes.push(val);
            checksum += val * (i + 1);
        }
        codes.push(checksum % 103);
        codes.push(106);

        var bits = codes.map(function (c) { return CODE128_PATTERNS[c]; }).join('');
        var quiet = 8;
        var totalW = bits.length + quiet * 2;
        var rects = '';
        var pos = 0;
        while (pos < bits.length) {
            if (bits[pos] === '1') {
                var run = 1;
                while (pos + run < bits.length && bits[pos + run] === '1') run++;
                rects += '<rect x="' + (quiet + pos) + '" y="0" width="' + run + '" height="32"/>';
                pos += run;
            } else {
                pos++;
            }
        }
        return '<svg viewBox="0 0 ' + totalW + ' 32" preserveAspectRatio="none" role="img" aria-label="Code 128 Barcode ' + clean + '">' + rects + '</svg>';
    }

    // ---- 3. Mobile Navigation Toggle ----
    var navToggle = document.querySelector('.nav-toggle');
    var mainNav = document.getElementById('main-nav');

    if (navToggle && mainNav) {
        navToggle.addEventListener('click', function () {
            var isOpen = mainNav.classList.toggle('is-open');
            navToggle.classList.toggle('is-open');
            navToggle.setAttribute('aria-expanded', String(isOpen));
        });

        mainNav.querySelectorAll('a').forEach(function (link) {
            link.addEventListener('click', function () {
                mainNav.classList.remove('is-open');
                navToggle.classList.remove('is-open');
                navToggle.setAttribute('aria-expanded', 'false');
            });
        });
    }

    // ---- 4. Interactive 5-Stop Technology Tour ----
    var tourTabs = Array.prototype.slice.call(document.querySelectorAll('.tour-tab'));
    var tourPanels = Array.prototype.slice.call(document.querySelectorAll('.tour-panel'));
    var tourStepCounter = document.getElementById('tourStepCounter');
    var prevBtn = document.getElementById('tourPrevBtn');
    var nextBtn = document.getElementById('tourNextBtn');
    var currentStep = 0;

    function activateTourStep(index, focusTab) {
        if (!tourTabs.length || !tourPanels.length) return;
        currentStep = (index + tourTabs.length) % tourTabs.length;

        tourTabs.forEach(function (tab, i) {
            var active = i === currentStep;
            tab.classList.toggle('is-active', active);
            tab.setAttribute('aria-selected', String(active));
            tab.setAttribute('tabindex', active ? '0' : '-1');
            if (active && focusTab) tab.focus();
        });

        tourPanels.forEach(function (panel, i) {
            var active = i === currentStep;
            panel.classList.toggle('is-active', active);
            panel.hidden = !active;

            panel.querySelectorAll('video').forEach(function (vid) {
                if (active && !REDUCED_MOTION) {
                    vid.play().catch(function () {});
                } else {
                    vid.pause();
                }
            });
        });

        if (tourStepCounter) {
            tourStepCounter.textContent = 'Stop 0' + (currentStep + 1) + ' of 0' + tourTabs.length;
        }
    }

    tourTabs.forEach(function (tab, idx) {
        tab.addEventListener('click', function () {
            activateTourStep(idx, false);
        });

        tab.addEventListener('keydown', function (e) {
            if (e.key === 'ArrowRight') {
                e.preventDefault();
                activateTourStep(idx + 1, true);
            } else if (e.key === 'ArrowLeft') {
                e.preventDefault();
                activateTourStep(idx - 1, true);
            }
        });
    });

    if (prevBtn) prevBtn.addEventListener('click', function () { activateTourStep(currentStep - 1, false); });
    if (nextBtn) nextBtn.addEventListener('click', function () { activateTourStep(currentStep + 1, false); });

    // Tour Stop 02 inline mini switcher
    var simoneTourVideo = document.getElementById('simoneStageVideo');
    var simoneTourBadge = document.getElementById('simoneStageBadge');
    var simoneTourStyle = document.getElementById('simoneStyleTag');
    document.querySelectorAll('.world-btn').forEach(function (btn) {
        btn.addEventListener('click', function () {
            var videoSrc = btn.getAttribute('data-video');
            var posterSrc = btn.getAttribute('data-poster');
            var worldLabel = btn.getAttribute('data-world');
            var styleLabel = btn.getAttribute('data-style');

            document.querySelectorAll('.world-btn').forEach(function (b) {
                b.classList.remove('is-selected');
                b.setAttribute('aria-pressed', 'false');
            });
            btn.classList.add('is-selected');
            btn.setAttribute('aria-pressed', 'true');

            if (simoneTourBadge && worldLabel) simoneTourBadge.textContent = worldLabel;
            if (simoneTourStyle && styleLabel) simoneTourStyle.textContent = 'Style: ' + styleLabel;
            if (simoneTourVideo && videoSrc) {
                if (posterSrc) simoneTourVideo.setAttribute('poster', posterSrc);
                var sourceEl = simoneTourVideo.querySelector('source');
                if (sourceEl && sourceEl.getAttribute('src') !== videoSrc) {
                    sourceEl.setAttribute('src', videoSrc);
                    simoneTourVideo.load();
                    if (!REDUCED_MOTION) simoneTourVideo.play().catch(function () {});
                }
            }
        });
    });

    // ---- 5. Full Simone Canon Showcase (#simone): Dual-Buffer Player & Night Pass ----
    var CANON_PLATES = {
        'lounge-idle': {
            flap: 'LO-FI LOUNGE · IDLE',
            title: 'The Host · Idle',
            style: 'Lo-Fi Neon Anime',
            wardrobe: 'Dark charcoal blazer over warm rust-gold silk camisole',
            passKey: 'lounge'
        },
        'lounge-greet': {
            flap: 'LO-FI LOUNGE · GREET',
            title: 'The Welcome · Greet',
            style: 'Lo-Fi Neon Anime',
            wardrobe: 'Raising glowing amber coupe glass in welcoming toast',
            passKey: 'lounge'
        },
        'lounge-speaking': {
            flap: 'LO-FI LOUNGE · SPEAKING',
            title: 'The Recommendation · Speaking',
            style: 'Lo-Fi Neon Anime',
            wardrobe: 'Animated mid-sentence recommendation at polished bar',
            passKey: 'lounge'
        },
        'speakeasy': {
            flap: 'NOIR SPEAKEASY',
            title: 'Velvet & Cipher',
            style: 'Noir Graphic Novel Ink',
            wardrobe: 'Tailored midnight velvet lapel coat + smoked old fashioned',
            passKey: 'speakeasy'
        },
        'jazz': {
            flap: 'UPA JAZZ CLUB',
            title: 'Brass on U Street',
            style: 'Mid-Century UPA Gouache',
            wardrobe: 'Chic black knit turtleneck + angular U Street brass stage',
            passKey: 'jazz'
        },
        'rooftop': {
            flap: 'TWILIGHT ROOFTOP',
            title: 'Golden Hour Horizon',
            style: 'Modern Cel-Shaded Cartoon',
            wardrobe: 'Cream linen blazer + Capitol twilight string-light terrace',
            passKey: 'rooftop'
        },
        'dive': {
            flap: 'RISO DIVE BAR',
            title: 'Last Call Jukebox',
            style: 'Risograph Gig Poster',
            wardrobe: 'Vintage moto jacket beside glowing Adams Morgan jukebox',
            passKey: 'dive'
        }
    };

    var NIGHT_PASSES = {
        lounge: {
            title: '14TH & U COCKTAIL PASS',
            serial: 'BDC-LNG904-3S',
            slugs: 'jane-jane,service-bar,left-door',
            stops: [
                { time: '7:00 PM · Opener', name: 'Jane Jane', hood: '14th St / Logan Circle · Cocktail Bar', walk: '6 min walk to next stop' },
                { time: '9:00 PM · Main Vibe', name: 'Service Bar', hood: 'U Street Corridor · Craft Cocktails', walk: '3 min walk to next stop' },
                { time: '11:00 PM · Nightcap', name: 'Left Door', hood: 'U Street · Hidden Upstairs Lounge', walk: null }
            ]
        },
        speakeasy: {
            title: 'VELVET SPEAKEASY PASS',
            serial: 'BDC-SPK412-3S',
            slugs: 'allegory,silver-lyan,death-and-co-d-c',
            stops: [
                { time: '7:00 PM · Opener', name: 'Allegory', hood: 'Downtown · Hidden Library Speakeasy', walk: '6 min walk to next stop' },
                { time: '9:00 PM · Main Vibe', name: 'Silver Lyan', hood: 'Penn Quarter · Subterranean Bank Vault', walk: '9 min walk to next stop' },
                { time: '11:00 PM · Nightcap', name: 'Death & Co. D.C.', hood: 'Downtown / Logan · Late Cocktail Den', walk: null }
            ]
        },
        jazz: {
            title: 'U STREET BRASS PASS',
            serial: 'BDC-JAZ771-3S',
            slugs: 'jojo-restaurant-and-bar,black-cat,600t',
            stops: [
                { time: '7:00 PM · Opener', name: 'Jojo Restaurant & Bar', hood: 'U Street · Live Jazz & Soul Supper', walk: '5 min walk to next stop' },
                { time: '9:00 PM · Main Vibe', name: 'Black Cat', hood: '14th & U · Iconic Live Stage', walk: '9 min walk to next stop' },
                { time: '11:00 PM · Nightcap', name: '600t', hood: 'Shaw · Basement Candlelit Jazz & Spirits', walk: null }
            ]
        },
        rooftop: {
            title: 'TWILIGHT ROOFTOP PASS',
            serial: 'BDC-RFT208-3S',
            slugs: 'takoda-navy-yard,silver-social,croix-rooftop',
            stops: [
                { time: '6:30 PM · Golden Hour', name: 'TAKODA Navy Yard', hood: 'Navy Yard · Open-Air Rooftop Beer Garden', walk: '2 min walk to next stop' },
                { time: '8:30 PM · Sunset', name: 'Silver Social', hood: 'Navy Yard · Elevated Terrace Lounge', walk: '6 min walk to next stop' },
                { time: '10:30 PM · Nightcap', name: 'Croix Rooftop', hood: 'Navy Yard · Riverfront Skyline Views', walk: null }
            ]
        },
        dive: {
            title: 'ADMO LAST CALL PASS',
            serial: 'BDC-DIV619-3S',
            slugs: 'the-blaguard,grand-duchess,dans-cafe',
            stops: [
                { time: '8:00 PM · Opener', name: 'The Blaguard', hood: 'Adams Morgan · Neighborhood Dive', walk: '4 min walk to next stop' },
                { time: '10:00 PM · Main Vibe', name: 'Grand Duchess', hood: '18th Street · Eclectic Late Bar', walk: '1 min walk to next stop' },
                { time: '12:00 AM · Last Call', name: "Dan's Cafe", hood: 'Adams Morgan · Legendary Jukebox Dive', walk: null }
            ]
        }
    };

    var dualStage = document.getElementById('canonDualStage');
    var monitorFlap = document.getElementById('canonMonitorFlap');
    var monitorTitle = document.getElementById('canonMonitorTitle');
    var monitorStyle = document.getElementById('canonMonitorStyle');
    var passTitleEl = document.getElementById('nightPassTitle');
    var passSerialEl = document.getElementById('nightPassSerial');
    var passStopsEl = document.getElementById('nightPassStops');
    var passBarcodeBox = document.getElementById('nightPassBarcodeSvg');
    var passBarcodeCode = document.getElementById('nightPassBarcodeCode');
    var passMapLink = document.getElementById('nightPassMapLink');

    var dualSlots = dualStage ? Array.prototype.slice.call(dualStage.querySelectorAll('.dual-cinema-video')) : [];
    var activeSlotIdx = 0;
    var activePlateId = 'lounge-idle';

    function renderPassCard(passKey) {
        var pass = NIGHT_PASSES[passKey] || NIGHT_PASSES.lounge;
        if (passTitleEl) passTitleEl.textContent = pass.title;
        if (passSerialEl) passSerialEl.textContent = pass.serial;
        if (passStopsEl) {
            passStopsEl.innerHTML = pass.stops.map(function (s, i) {
                return (
                    '<div class="pass-stop-row">' +
                        '<div class="pass-stop-num">' + (i + 1) + '</div>' +
                        '<div class="pass-stop-info">' +
                            '<span class="pass-stop-time">' + s.time + '</span>' +
                            '<span class="pass-stop-venue">' + s.name + '</span>' +
                            '<span class="pass-stop-hood">' + s.hood + '</span>' +
                            (s.walk ? '<span class="pass-walk-tag">↓ ' + s.walk + '</span>' : '') +
                        '</div>' +
                    '</div>'
                );
            }).join('');
        }
        if (passBarcodeBox) passBarcodeBox.innerHTML = renderCode128Svg(pass.serial);
        if (passBarcodeCode) passBarcodeCode.textContent = pass.serial;
        if (passMapLink) passMapLink.setAttribute('href', 'https://bardc.com/map/#pass=' + encodeURIComponent(pass.slugs));
    }

    function selectCanonPlate(plateId, scrollMonitor) {
        var meta = CANON_PLATES[plateId];
        if (!meta) return;

        document.querySelectorAll('[data-canon-plate]').forEach(function (el) {
            var match = el.getAttribute('data-canon-plate') === plateId;
            el.classList.toggle('is-active', match);
            el.classList.toggle('is-selected', match);
            if (el.tagName === 'BUTTON') {
                el.setAttribute('aria-pressed', String(match));
            }
        });

        if (monitorFlap) flipSplitFlap(monitorFlap, meta.flap);
        if (monitorTitle) monitorTitle.textContent = meta.title + ' — ' + meta.wardrobe;
        if (monitorStyle) monitorStyle.textContent = meta.style;

        renderPassCard(meta.passKey);

        if (dualSlots.length === 2 && plateId !== activePlateId) {
            activePlateId = plateId;
            var nextIdx = 1 - activeSlotIdx;
            var incoming = dualSlots[nextIdx];
            var outgoing = dualSlots[activeSlotIdx];

            incoming.poster = 'media/simone/' + plateId + '.webp';
            incoming.src = 'media/simone/' + plateId + '.webm';

            var performSwap = function () {
                incoming.removeEventListener('canplay', performSwap);
                if (!REDUCED_MOTION) incoming.play().catch(function () {});
                incoming.classList.add('is-active');
                outgoing.classList.remove('is-active');
                activeSlotIdx = nextIdx;
                setTimeout(function () {
                    if (!outgoing.classList.contains('is-active')) outgoing.pause();
                }, 380);
            };

            if (REDUCED_MOTION) {
                performSwap();
            } else {
                incoming.addEventListener('canplay', performSwap, { once: true });
                incoming.load();
            }
        }

        if (scrollMonitor && dualStage) {
            dualStage.scrollIntoView({ behavior: REDUCED_MOTION ? 'auto' : 'smooth', block: 'center' });
        }
    }

    renderPassCard('lounge');

    document.querySelectorAll('.canon-trigger-btn[data-canon-plate]').forEach(function (btn) {
        btn.addEventListener('click', function () {
            selectCanonPlate(btn.getAttribute('data-canon-plate'), false);
        });
    });

    document.querySelectorAll('.canon-plate-card[data-canon-plate]').forEach(function (card) {
        card.addEventListener('click', function () {
            selectCanonPlate(card.getAttribute('data-canon-plate'), true);
        });
    });

    // Lazy play/pause gallery plate videos only while visible
    var galleryVideos = document.querySelectorAll('.canon-plate-viewport video');
    if ('IntersectionObserver' in window && galleryVideos.length > 0 && !REDUCED_MOTION) {
        var vidObserver = new IntersectionObserver(function (entries) {
            entries.forEach(function (entry) {
                var v = entry.target;
                if (entry.isIntersecting) {
                    v.play().catch(function () {});
                } else {
                    v.pause();
                }
            });
        }, { threshold: 0.15 });

        galleryVideos.forEach(function (v) {
            vidObserver.observe(v);
        });
    }

    // ---- 6. One-Click Copy Buttons ----
    document.querySelectorAll('[data-copy-target]').forEach(function (btn) {
        btn.addEventListener('click', function () {
            var targetId = btn.getAttribute('data-copy-target');
            var codeEl = document.getElementById(targetId);
            if (!codeEl || !navigator.clipboard) return;

            var originalText = btn.textContent;
            navigator.clipboard.writeText(codeEl.textContent.trim()).then(function () {
                btn.textContent = 'Copied ✓';
                setTimeout(function () {
                    btn.textContent = originalText;
                }, 1800);
            });
        });
    });

    // ---- 7. Scroll Reveal & Active Navigation Highlight ----
    var animatedElements = document.querySelectorAll('.animate-on-scroll');
    if ('IntersectionObserver' in window && animatedElements.length > 0) {
        var revealObserver = new IntersectionObserver(function (entries) {
            entries.forEach(function (entry) {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    revealObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.08, rootMargin: '0px 0px -30px 0px' });

        animatedElements.forEach(function (el) {
            revealObserver.observe(el);
        });
    } else {
        animatedElements.forEach(function (el) {
            el.classList.add('visible');
        });
    }

    var sections = document.querySelectorAll('section[id]');
    var navLinks = document.querySelectorAll('.main-nav a[href^="#"]');
    if ('IntersectionObserver' in window && sections.length > 0) {
        var navObserver = new IntersectionObserver(function (entries) {
            entries.forEach(function (entry) {
                if (entry.isIntersecting) {
                    var id = entry.target.getAttribute('id');
                    navLinks.forEach(function (link) {
                        link.classList.toggle('active', link.getAttribute('href') === '#' + id);
                    });
                }
            });
        }, { threshold: 0.2, rootMargin: '-90px 0px -50% 0px' });

        sections.forEach(function (section) {
            navObserver.observe(section);
        });
    }

    // ---- 8. Dynamic Copyright Year ----
    var yearSpan = document.querySelector('.year');
    if (yearSpan) {
        yearSpan.textContent = String(new Date().getFullYear());
    }
})();
