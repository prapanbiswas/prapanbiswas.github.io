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

const birthDate = new Date('2006-02-15T00:00:00');

function calculateAge() {
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
        age--;
    }
    return age;
}

function updateAge() {
    const ageElement = document.getElementById('age');
    if (ageElement) ageElement.textContent = calculateAge();
}

/* =========================================
   Typing Cursor Effect
   ========================================= */
class TypeWriter {
    constructor() {
        this.element = document.getElementById('typed-title');
        if (!this.element) return;
        this.text = this.element.getAttribute('data-text') || this.element.textContent;
        this.element.textContent = '';
        this.element.style.borderRight = '3px solid rgba(99,102,241,0.8)';
        this.element.style.paddingRight = '4px';
        this.charIndex = 0;
        this.type();
    }

    type() {
        if (this.charIndex < this.text.length) {
            this.element.textContent += this.text.charAt(this.charIndex);
            this.charIndex++;
            const delay = 40 + Math.random() * 60;
            setTimeout(() => this.type(), delay);
        } else {
            // Done typing — start blinking cursor
            this.blink();
        }
    }

    blink() {
        let visible = true;
        setInterval(() => {
            visible = !visible;
            this.element.style.borderRightColor = visible ? 'rgba(99,102,241,0.8)' : 'transparent';
        }, 530);
    }
}

/* =========================================
   Device Detection
   ========================================= */
const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)
    || window.innerWidth < 768;



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
class ScrollReveal {
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
   Firebase REST API — provided by firebase-appcheck.js
   fbGet(path) and FIREBASE_DB are defined there.
   ========================================= */

/* =========================================
   Load Dynamic Content from Firebase
   ========================================= */
async function loadDynamicContent() {
    try {
        const [profile, socialLinks, skills, interests] = await Promise.all([
            fbGet('profile').catch(() => null),
            fbGet('socialLinks').catch(() => null),
            fbGet('skills').catch(() => null),
            fbGet('interests').catch(() => null)
        ]);

        if (profile) renderProfile(profile);
        if (socialLinks) renderSocialLinks(Array.isArray(socialLinks) ? socialLinks : Object.values(socialLinks));
        if (skills) renderSkillCards(Array.isArray(skills) ? skills : Object.values(skills));
        if (interests) renderInterestCards(Array.isArray(interests) ? interests : Object.values(interests));

        if (typeof lucide !== 'undefined') {
            lucide.createIcons();
        }
    } catch (err) {
        console.warn('Firebase content load skipped:', err.message);
    }
}

function renderProfile(p) {
    const nameEl = document.getElementById('typed-title');
    if (nameEl && p.name) nameEl.setAttribute('data-text', escapeHTML(p.name));

    const statusEl = document.querySelector('[data-bind="status"]');
    if (statusEl && p.availableStatus) statusEl.textContent = p.availableStatus;

    const locationEl = document.querySelector('[data-bind="location"]');
    if (locationEl && p.location) locationEl.textContent = p.location;

    const aboutEl = document.querySelector('[data-bind="about"]');
    if (aboutEl && p.aboutText) {
        const paragraphs = p.aboutText.split('\n\n');
        aboutEl.innerHTML = paragraphs.map(para => {
            const escaped = escapeHTML(para);
            const boldName = escaped.replace(/(Prapan Biswas)/g, '<strong class="text-white">$1</strong>');
            return `<p class="mb-4">${boldName}</p>`;
        }).join('');
    }

    const taglineEl = document.querySelector('[data-bind="tagline"]');
    if (taglineEl && p.tagline) {
        const escaped = escapeHTML(p.tagline);
        taglineEl.innerHTML = escaped.replace(/code/gi, '<strong>code</strong>')
            .replace(/design/gi, '<strong>design</strong>')
            .replace(/engineering/gi, '<strong>engineering</strong>');
    }

    if (p.birthday) {
        const bd = new Date(p.birthday);
        const today = new Date();
        let age = today.getFullYear() - bd.getFullYear();
        const m = today.getMonth() - bd.getMonth();
        if (m < 0 || (m === 0 && today.getDate() < bd.getDate())) age--;
        const ageEl = document.getElementById('age');
        if (ageEl) ageEl.textContent = age;
    }

    if (p.profileImageUrl) {
        const img = document.querySelector('[data-bind="profile-img"]');
        if (img) img.src = sanitizeURL(p.profileImageUrl);
    }
}

function renderSocialLinks(links) {
    const container = document.querySelector('[data-bind="social-links"]');
    if (!container || !links.length) return;
    container.innerHTML = links.map(link => `
        <a href="${sanitizeURL(link.url)}" target="_blank" rel="noopener noreferrer"
            class="w-12 h-12 rounded-full border border-white/10 bg-white/5 flex items-center justify-center text-slate-400 hover:text-white hover:border-indigo-500/50 hover:bg-indigo-500/10 transition-all text-xl"
            title="${escapeHTML(link.platform)}">
            ${getLucideIcon(link.icon)}
        </a>
    `).join('');
}

function renderSkillCards(skills) {
    const container = document.querySelector('[data-bind="skills"]');
    if (!container || !skills.length) return;
    container.innerHTML = skills.map(skill => {
        const safeColor = sanitizeColor(skill.color);
        return `
        <div class="tilt-3d glass-card rounded-2xl p-8 group hover:scale-[1.02] transition-all duration-300 reveal-item">
            <div class="tilt-shine absolute inset-0 z-10 pointer-events-none rounded-2xl opacity-0"></div>
            <div class="w-12 h-12 rounded-xl flex items-center justify-center text-2xl mb-6"
                style="background:linear-gradient(135deg, ${safeColor}20, ${safeColor}40)">
                ${getLucideIcon(skill.icon)}
            </div>
            <h4 class="text-xl font-bold mb-2 text-slate-100">${escapeHTML(skill.title)}</h4>
            <p class="text-sm text-slate-400 leading-relaxed">${escapeHTML(skill.description || '')}</p>
        </div>
    `;
    }).join('');
}

function renderInterestCards(interests) {
    const container = document.querySelector('[data-bind="interests"]');
    if (!container || !interests.length) return;
    container.innerHTML = interests.map(interest => `
        <div class="glass-card rounded-2xl p-6 text-center hover:scale-[1.02] transition-all reveal-item">
            <div class="text-3xl mb-3">${getLucideIcon(interest.icon)}</div>
            <h4 class="text-lg font-bold text-slate-100 mb-1">${escapeHTML(interest.title)}</h4>
            <p class="text-sm text-slate-400">${escapeHTML(interest.description || '')}</p>
        </div>
    `).join('');
}

function getLucideIcon(iconId) {
    if (!iconId) return '';
    const map = {
        mobile: 'smartphone', design: 'palette', photo: 'camera', gear: 'settings',
        lightning: 'zap', chart: 'bar-chart', paintbrush: 'brush', chip: 'cpu',
        robot: 'bot', game: 'gamepad-2', graduation: 'graduation-cap', fire: 'flame',
        sparkle: 'sparkles', bulb: 'lightbulb', chat: 'message-square', pin: 'map-pin',
        plant: 'leaf', tree: 'tree-deciduous', math: 'calculator', diamond: 'gem',
        money: 'coins', gym: 'dumbbell', run: 'activity', thumbsup: 'thumbs-up',
        confetti: 'party-popper', speech: 'mic', earth: 'globe'
    };
    const validId = map[iconId] || iconId;
    return `<i data-lucide="${validId}"></i>`;
}

/* =========================================
   Projects — Fetch from Firebase
   ========================================= */
async function fetchProjects() {
    const projectsContainer = document.getElementById('projects-container');
    if (!projectsContainer) return;

    try {
        const data = await fbGet('projects');
        const projects = data ? (Array.isArray(data) ? data : Object.values(data)) : [];
        projectsContainer.innerHTML = '';
        if (projects.length === 0) {
            projectsContainer.innerHTML = '<div class="col-span-full text-center p-8 text-slate-500"><p>No projects yet.</p></div>';
            return;
        }
        projects.forEach((project, index) => {
            projectsContainer.appendChild(createProjectCard(project, index));
        });
    } catch (error) {
        console.error('Error fetching projects:', error);
        projectsContainer.innerHTML = '<div class="col-span-full text-center p-8 text-slate-500"><p>Unable to load projects.</p></div>';
    }
}

async function fetchFeaturedProjects() {
    const featuredContainer = document.getElementById('featured-projects-container');
    if (!featuredContainer) return;

    try {
        const data = await fbGet('projects');
        const projects = data ? (Array.isArray(data) ? data : Object.values(data)) : [];
        const featured = projects.filter(p => p.featured);
        featuredContainer.innerHTML = '';
        if (featured.length === 0) {
            featuredContainer.innerHTML = '<div class="col-span-full text-center p-8 text-slate-500"><p>No featured projects yet.</p></div>';
            return;
        }
        featured.forEach((project, index) => {
            featuredContainer.appendChild(createProjectCard(project, index));
        });
    } catch (error) {
        console.error('Error fetching featured projects:', error);
    }
}

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

/* =========================================
   Initialize
   ========================================= */
function initializeWebsite() {
    // Initialize Firebase App Check before any data fetching
    if (typeof initPublicFirebase === 'function') {
        initPublicFirebase();
    }

    updateAge();
    initActiveLinkHighlight();
    loadDynamicContent();
    fetchProjects();
    fetchFeaturedProjects();

    if (typeof ScrollReveal !== 'undefined') new ScrollReveal();
    new TiltCards();
    new ParallaxScroll();
    new NavbarScroll();
    new TypeWriter();

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

document.addEventListener('DOMContentLoaded', initializeWebsite);
