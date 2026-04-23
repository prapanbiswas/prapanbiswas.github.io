/* =========================================
   Global JS — Shared Utilities & UI Systems
   =========================================
   Loaded on every page. Contains:
   - HTML/URL sanitization
   - Device detection
   - Scroll reveal
   - 3D Tilt Cards
   - Navbar scroll effect
   - Mobile menu (MagneticNav)
   - Parallax scroll
   ========================================= */

/* =========================================
   Security: HTML Sanitization Utilities
   ========================================= */
function escapeHTML(str) {
    if (typeof str !== 'string') return '';
    const div = document.createElement('div');
    div.textContent = str;
    return div.innerHTML;
}

function sanitizeURL(url) {
    if (typeof url !== 'string') return '#';
    const trimmed = url.trim();
    // Block javascript:, data:, vbscript: protocols
    if (/^\s*(javascript|data|vbscript)\s*:/i.test(trimmed)) return '#';
    // Allow http, https, mailto, tel, and relative URLs
    if (/^(https?:|mailto:|tel:|\/|#|\.\.)/i.test(trimmed) || !trimmed.includes(':')) {
        return encodeURI(decodeURI(trimmed));
    }
    return '#';
}

function sanitizeColor(color) {
    if (typeof color !== 'string') return '#6366f1';
    // Only allow valid hex colors
    if (/^#[0-9a-fA-F]{3,8}$/.test(color.trim())) return color.trim();
    return '#6366f1';
}

/* =========================================
   Device Detection
   ========================================= */
const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)
    || window.innerWidth < 768;

/* =========================================
   Lucide Icon Helper + Custom SVG Library
   ========================================= */
const CUSTOM_SVGS = {
    github: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.02c3.14-.35 6.5-1.4 6.5-7a4.6 4.6 0 0 0-1.39-3.2 4.2 4.2 0 0 0-.1-3.2s-1.1-.35-3.5 1.25a11.3 11.3 0 0 0-6.2 0C6.1 2.75 5 3.1 5 3.1a4.2 4.2 0 0 0-.1 3.2A4.6 4.6 0 0 0 3.5 9.5c0 5.6 3.35 6.65 6.5 7a4.8 4.8 0 0 0-1 3.03V22"></path><path d="M9 20c-5 1.5-5-2.5-7-3"></path></svg>',
    youtube: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M2.5 17a24.12 24.12 0 0 1 0-10 2 2 0 0 1 1.4-1.4 49.56 49.56 0 0 1 16.2 0A2 2 0 0 1 21.5 7a24.12 24.12 0 0 1 0 10 2 2 0 0 1-1.4 1.4 49.55 49.55 0 0 1-16.2 0A2 2 0 0 1 2.5 17"></path><path d="m10 15 5-3-5-3z"></path></svg>',
    facebook: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path></svg>',
    email: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="20" height="16" x="2" y="4" rx="2"></rect><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"></path></svg>',
    whatsapp: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></svg>',
    instagram: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>',
    twitch: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 2H3v16h5v4l4-4h5l4-4V2zm-10 9V7m5 4V7"></path></svg>',
};

function getLucideIcon(iconId) {
    if (!iconId) return '';
    // Check custom SVG library first
    const customKey = iconId.toLowerCase();
    if (CUSTOM_SVGS[customKey]) return CUSTOM_SVGS[customKey];
    // Alias map for Lucide icon IDs
    const map = {
        mobile: 'smartphone', design: 'palette', photo: 'camera', gear: 'settings',
        lightning: 'zap', chart: 'bar-chart', paintbrush: 'brush', chip: 'cpu',
        robot: 'bot', game: 'gamepad-2', graduation: 'graduation-cap', fire: 'flame',
        sparkle: 'sparkles', bulb: 'lightbulb', chat: 'message-square', pin: 'map-pin',
        plant: 'leaf', tree: 'tree-deciduous', math: 'calculator', diamond: 'gem',
        money: 'coins', gym: 'dumbbell', run: 'activity', thumbsup: 'thumbs-up',
        confetti: 'party-popper', speech: 'mic', earth: 'globe',
        mail: 'mail', phone: 'phone'
    };
    // If it maps to a custom SVG alias, use that
    const aliased = map[iconId] || iconId;
    if (CUSTOM_SVGS[aliased]) return CUSTOM_SVGS[aliased];
    return `<i data-lucide="${aliased}"></i>`;
}

/* =========================================
   3D Tilt Cards (Desktop only)
   ========================================= */
class TiltCards {
    constructor() {
        this.cards = document.querySelectorAll('.tilt-3d');
        if (this.cards.length === 0 || isMobile) return;
        this.init();
    }

    init() {
        this.cards.forEach(card => {
            card.style.transformStyle = 'preserve-3d';
            card.style.transition = 'transform 0.15s ease-out';

            card.addEventListener('mousemove', (e) => this.onMove(e, card));
            card.addEventListener('mouseleave', () => this.onLeave(card));
        });
    }

    onMove(e, card) {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;

        const rotateX = ((y - centerY) / centerY) * -8;
        const rotateY = ((x - centerX) / centerX) * 8;

        card.style.transform = `perspective(800px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.03, 1.03, 1.03)`;

        const shine = card.querySelector('.tilt-shine');
        if (shine) {
            shine.style.opacity = '1';
            shine.style.background = `radial-gradient(circle at ${x}px ${y}px, rgba(255,255,255,0.12) 0%, transparent 60%)`;
        }
    }

    onLeave(card) {
        card.style.transform = 'perspective(800px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';
        const shine = card.querySelector('.tilt-shine');
        if (shine) shine.style.opacity = '0';
    }
}

/* =========================================
   Scroll Reveal
   ========================================= */
class ScrollRevealSystem {
    constructor() {
        this.init();
    }

    init() {
        const staggerContainers = document.querySelectorAll('[data-stagger]');
        staggerContainers.forEach(container => {
            Array.from(container.children).forEach((child, i) => {
                child.classList.add('reveal-item');
                child.style.transitionDelay = `${i * 100}ms`;
            });
        });

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    entry.target.querySelectorAll('.reveal-item').forEach(child => {
                        child.classList.add('visible');
                    });
                }
            });
        }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

        document.querySelectorAll('.reveal-on-scroll, section').forEach(el => {
            observer.observe(el);
        });
    }
}

/* =========================================
   Parallax Scroll (Desktop)
   ========================================= */
class ParallaxScroll {
    constructor() {
        if (isMobile) return;
        this.sections = document.querySelectorAll('section');
        this.init();
    }

    init() {
        let ticking = false;
        window.addEventListener('scroll', () => {
            if (!ticking) {
                requestAnimationFrame(() => {
                    this.update();
                    ticking = false;
                });
                ticking = true;
            }
        });
    }

    update() {
        this.sections.forEach(section => {
            const rect = section.getBoundingClientRect();
            const yOffset = rect.top * 0.04;
            section.style.transform = `translateY(${yOffset}px)`;
        });
    }
}

/* =========================================
   Navbar Scroll Animation
   ========================================= */
class NavbarScroll {
    constructor() {
        this.nav = document.querySelector('nav');
        if (!this.nav) return;
        this.init();
    }

    init() {
        let lastScroll = 0;
        window.addEventListener('scroll', () => {
            const scrollY = window.scrollY;
            if (scrollY > 50) {
                this.nav.classList.add('nav-scrolled');
            } else {
                this.nav.classList.remove('nav-scrolled');
            }
            lastScroll = scrollY;
        });
    }
}

/* =========================================
   Magnetic Navigation + Hamburger Close Fix
   ========================================= */
class MagneticNav {
    constructor() {
        this.trigger = document.getElementById('nav-trigger');
        this.magneticArea = document.getElementById('magnetic-area');
        this.menu = document.getElementById('fullscreen-menu');
        this.links = document.querySelectorAll('.menu-link');
        this.isOpen = false;

        if (!this.trigger) return;

        this.initMagneticButton();
        this.initMenuToggle();
    }

    initMagneticButton() {
        this.trigger.addEventListener('mousemove', (e) => {
            const rect = this.trigger.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;
            gsap.to(this.trigger, { x: x * 0.4, y: y * 0.4, duration: 0.3 });
            gsap.to(this.magneticArea, { x: x * 0.2, y: y * 0.2, duration: 0.3 });
        });

        this.trigger.addEventListener('mouseleave', () => {
            gsap.to([this.trigger, this.magneticArea], { x: 0, y: 0, duration: 0.5, ease: 'elastic.out(1, 0.3)' });
        });
    }

    initMenuToggle() {
        // Hamburger button toggles
        this.trigger.addEventListener('click', () => {
            this.isOpen = !this.isOpen;
            this.toggleMenu();
        });

        // Clicking a menu link closes the menu
        this.links.forEach(link => {
            link.addEventListener('click', () => {
                this.isOpen = false;
                this.toggleMenu();
            });
        });

        // Close button inside menu
        const closeBtn = document.getElementById('menu-close-btn');
        if (closeBtn) {
            closeBtn.addEventListener('click', () => {
                this.isOpen = false;
                this.toggleMenu();
            });
        }
    }

    toggleMenu() {
        const line1 = document.querySelector('.burger-line-1');
        const line2 = document.querySelector('.burger-line-2');
        const line3 = document.querySelector('.burger-line-3');

        if (this.isOpen) {
            // Animate hamburger → X
            gsap.to(line1, { rotation: 45, y: 8, duration: 0.3 });
            gsap.to(line2, { opacity: 0, scale: 0, duration: 0.2 });
            gsap.to(line3, { rotation: -45, y: -8, duration: 0.3 });

            this.menu.classList.remove('invisible');
            gsap.to(this.menu, { clipPath: 'circle(150% at top right)', duration: 0.6, ease: 'power3.inOut' });
            gsap.to(this.links, { y: 0, opacity: 1, duration: 0.4, stagger: 0.1, delay: 0.2 });

            // Show close button
            const closeBtn = document.getElementById('menu-close-btn');
            if (closeBtn) gsap.to(closeBtn, { opacity: 1, scale: 1, duration: 0.3, delay: 0.4 });
        } else {
            // Animate X → hamburger
            gsap.to(line1, { rotation: 0, y: 0, duration: 0.3 });
            gsap.to(line2, { opacity: 1, scale: 1, duration: 0.3 });
            gsap.to(line3, { rotation: 0, y: 0, duration: 0.3 });

            const closeBtn = document.getElementById('menu-close-btn');
            if (closeBtn) gsap.to(closeBtn, { opacity: 0, scale: 0.8, duration: 0.2 });

            gsap.to(this.menu, { clipPath: 'circle(0% at top right)', duration: 0.5, ease: 'power3.inOut', onComplete: () => this.menu.classList.add('invisible') });
            gsap.to(this.links, { y: 10, opacity: 0, duration: 0.3 });
        }
    }
}

/* =========================================
   Active Link Highlight
   ========================================= */
function initActiveLinkHighlight() {
    const sections = document.querySelectorAll('section[id]');
    if (sections.length === 0) return;

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const id = entry.target.getAttribute('id');
                document.querySelectorAll('.nav-link').forEach(link => {
                    const href = link.getAttribute('href');
                    if (href === `#${id}` || href === `index.html#${id}`) {
                        link.classList.add('text-white');
                        link.classList.remove('text-slate-300');
                    } else {
                        link.classList.remove('text-white');
                        link.classList.add('text-slate-300');
                    }
                });
            }
        });
    }, { threshold: 0.3 });

    sections.forEach(section => observer.observe(section));
}

/* =========================================
   Firebase Realtime Listener Utilities
   =========================================
   Provides persistent onValue() listeners with
   graceful App Check error handling. Never polls.
   ========================================= */

/**
 * Get a reference to the Firebase Realtime Database.
 * Safely initializes Firebase first if needed.
 */
function getFirebaseDB() {
    if (typeof initPublicFirebase === 'function') {
        initPublicFirebase();
    }
    if (typeof firebase === 'undefined' || !firebase.database) {
        return null;
    }
    return firebase.database();
}

/**
 * Attach a persistent onValue() listener to a Firebase RTDB path.
 * Automatically handles:
 *   - Permission Denied (App Check) → error fallback UI
 *   - Skeleton removal + fade-in on success
 *
 * @param {string} path        - RTDB path (e.g. 'profile', 'skills')
 * @param {Function} onData    - Callback with (data) when snapshot arrives
 * @param {HTMLElement|string} container - Element or selector to clear skeleton from
 */
function fbListen(path, onData, container) {
    const db = getFirebaseDB();
    const el = typeof container === 'string' ? document.querySelector(container) : container;

    if (!db) {
        console.warn(`[fbListen] Firebase not available for path: ${path}`);
        if (el) showErrorFallback(el, 'Firebase unavailable');
        return;
    }

    const ref = db.ref(path);

    ref.on('value',
        // Success callback
        (snapshot) => {
            const data = snapshot.val();
            if (el) removeSkeleton(el);
            onData(data);
        },
        // Error callback (Permission Denied, App Check block, etc.)
        (error) => {
            console.warn(`[fbListen] Error on "${path}":`, error.message);
            if (el) {
                removeSkeleton(el);
                showErrorFallback(el, error.message);
            }
        }
    );
}

/**
 * Remove all skeleton classes from an element and its children.
 * Applies fade-in animation for smooth data reveal.
 */
function removeSkeleton(el) {
    if (!el) return;
    // Remove skeleton from the container itself
    el.classList.remove('skel', 'skel-text', 'skel-text-sm', 'skel-text-lg', 'skel-text-xl',
        'skel-circle', 'skel-card', 'skel-tag', 'skel-avatar', 'skel-icon');
    // Remove from all children
    el.querySelectorAll('.skel, .skel-text, .skel-text-sm, .skel-text-lg, .skel-text-xl, .skel-circle, .skel-card, .skel-tag, .skel-avatar, .skel-icon').forEach(child => {
        child.classList.remove('skel', 'skel-text', 'skel-text-sm', 'skel-text-lg', 'skel-text-xl',
            'skel-circle', 'skel-card', 'skel-tag', 'skel-avatar', 'skel-icon');
    });
    // Trigger fade-in
    el.classList.add('data-loaded');
}

/**
 * Show a professional error fallback message inside a container.
 * Replaces any existing content/skeletons.
 */
function showErrorFallback(el, errorMsg) {
    if (!el) return;
    const isPermDenied = errorMsg && errorMsg.toLowerCase().includes('permission');
    el.innerHTML = `
        <div class="fb-error-state">
            <div class="error-icon">${isPermDenied ? '🔒' : '⚠️'}</div>
            <div class="error-title">${isPermDenied ? 'Content Restricted' : 'Unable to Load'}</div>
            <div class="error-desc">${isPermDenied
                ? 'Content is restricted to the production environment.'
                : 'Something went wrong loading this content. Please try again later.'
            }</div>
        </div>
    `;
    el.classList.add('data-loaded');
}

/* =========================================
   Project Card Builder (shared by home + projects page)
   ========================================= */
function createProjectCard(project, index) {
    const card = document.createElement('a');
    card.href = sanitizeURL(project.url);
    card.target = '_blank';
    card.rel = 'noopener noreferrer';
    card.className = 'tilt-3d glass-card rounded-2xl overflow-hidden hover:scale-[1.02] transition-all duration-300 block group';
    card.style.opacity = '0';
    card.style.transform = 'translateY(20px)';
    card.style.transition = 'opacity 0.6s cubic-bezier(0.16,1,0.3,1), transform 0.6s cubic-bezier(0.16,1,0.3,1)';
    card.style.transitionDelay = `${index * 120}ms`;

    requestAnimationFrame(() => {
        requestAnimationFrame(() => {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
        });
    });

    const techStack = project.tech_stack || [];
    const safeTitle = escapeHTML(project.title);
    const safeDesc = escapeHTML(project.description);
    const safeCategory = escapeHTML(project.category || 'Project');
    const safeThumbnail = project.thumbnail_url ? sanitizeURL(project.thumbnail_url) : '';
    card.innerHTML = `
        <div class="tilt-shine absolute inset-0 z-10 pointer-events-none rounded-2xl opacity-0 transition-opacity duration-300"></div>
        <div class="relative h-48 overflow-hidden">
            ${safeThumbnail ? `<img src="${safeThumbnail}" alt="${safeTitle}" class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" loading="lazy">` : '<div class="w-full h-full bg-gradient-to-br from-indigo-900/40 to-purple-900/40 flex items-center justify-center text-4xl">📦</div>'}
            <div class="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
            <span class="absolute bottom-4 left-4 text-white text-xs px-3 py-1 rounded-full backdrop-blur-sm bg-indigo-600/90">${safeCategory}</span>
        </div>
        <div class="p-6">
            <h4 class="text-xl font-bold mb-2 text-slate-100 group-hover:text-indigo-400 transition-colors line-clamp-2">${safeTitle}</h4>
            <p class="text-sm text-slate-400 line-clamp-3 mb-4">${safeDesc}</p>
            <div class="flex flex-wrap gap-2 mb-4">
                ${techStack.slice(0, 3).map(tech => `<span class="text-xs px-2 py-1 bg-white/5 rounded-full text-slate-400 border border-white/10">${escapeHTML(tech)}</span>`).join('')}
            </div>
            <span class="text-indigo-400 font-medium text-sm flex items-center gap-1 group-hover:gap-2 transition-all">
                View Project
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"></path></svg>
            </span>
        </div>
    `;

    return card;
}

/**
 * Generate skeleton placeholder cards for project/blog grids.
 */
function generateSkeletonCards(count, container) {
    if (!container) return;
    container.innerHTML = '';
    for (let i = 0; i < count; i++) {
        const card = document.createElement('div');
        card.className = 'skel skel-card glass-card rounded-2xl overflow-hidden';
        card.innerHTML = `
            <div class="h-48 bg-white/[0.02]"></div>
            <div class="p-6 space-y-3">
                <div class="skel skel-text w-3/4"></div>
                <div class="skel skel-text-sm w-full"></div>
                <div class="skel skel-text-sm w-5/6"></div>
                <div class="flex gap-2 mt-3">
                    <div class="skel skel-tag"></div>
                    <div class="skel skel-tag w-16"></div>
                </div>
            </div>
        `;
        container.appendChild(card);
    }
}

/* =========================================
   Global Init — runs on every page
   ========================================= */
function initGlobalSystems() {
    new ScrollRevealSystem();
    new TiltCards();
    new ParallaxScroll();
    new NavbarScroll();

    // GSAP-dependent (deferred)
    function initGsapSystems() {
        if (typeof gsap !== 'undefined') {
            new MagneticNav();
        } else {
            setTimeout(initGsapSystems, 50);
        }
    }
    initGsapSystems();
}

document.addEventListener('DOMContentLoaded', initGlobalSystems);

