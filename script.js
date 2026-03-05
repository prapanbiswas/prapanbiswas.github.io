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
   3D Depth Orb System — Enhanced
   ========================================= */
class Orb3D {
    constructor(canvas, layer) {
        this.canvas = canvas;
        this.ctx = canvas.getContext('2d');
        this.layer = layer;
        this.reset();
    }

    reset() {
        const depthScale = [1.8, 1.2, 0.6][this.layer];
        const baseRadius = isMobile ? 100 : 220;
        this.radius = (Math.random() * baseRadius + baseRadius * 0.5) * depthScale;

        this.x = Math.random() * this.canvas.width;
        this.y = Math.random() * this.canvas.height;

        const angle = Math.random() * Math.PI * 2;
        const baseSpeed = [0.06, 0.12, 0.22][this.layer];
        const speed = Math.random() * baseSpeed + baseSpeed * 0.5;
        this.vx = Math.cos(angle) * speed;
        this.vy = Math.sin(angle) * speed;

        // Unique hue per orb — richer palette
        const hueRanges = [
            [210, 290],  // Layer 0: Deep blues & purples
            [250, 350],  // Layer 1: Purples, pinks, reds
            [170, 260],  // Layer 2: Cyans, blues, indigos
        ];
        const [minH, maxH] = hueRanges[this.layer];
        this.hue = Math.random() * (maxH - minH) + minH;
        this.hueSpeed = (Math.random() - 0.5) * 0.4;

        this.maxOpacity = [0.12, 0.2, 0.3][this.layer];
        this.parallaxFactor = [0.3, 0.6, 1.0][this.layer];

        this.pulsePhase = Math.random() * Math.PI * 2;
        this.pulseSpeed = Math.random() * 0.008 + 0.003;

        // Breathing effect
        this.breathPhase = Math.random() * Math.PI * 2;
        this.breathSpeed = Math.random() * 0.002 + 0.001;
    }

    update(mouseX, mouseY, tiltX, tiltY) {
        // Organic wandering
        this.vx += (Math.random() - 0.5) * 0.01;
        this.vy += (Math.random() - 0.5) * 0.01;

        const maxSpeed = [0.25, 0.4, 0.7][this.layer];
        const speed = Math.sqrt(this.vx * this.vx + this.vy * this.vy);
        if (speed > maxSpeed) {
            this.vx = (this.vx / speed) * maxSpeed;
            this.vy = (this.vy / speed) * maxSpeed;
        }

        this.x += this.vx;
        this.y += this.vy;

        // Color drift
        this.hue += this.hueSpeed;
        if (this.hue > 360) this.hue -= 360;
        if (this.hue < 0) this.hue += 360;

        // Pulse + Breath
        this.pulsePhase += this.pulseSpeed;
        this.breathPhase += this.breathSpeed;
        const pulse = 1 + Math.sin(this.pulsePhase) * 0.06;
        const breath = 1 + Math.sin(this.breathPhase) * 0.15;

        // Mouse parallax (desktop)
        if (mouseX && mouseY && !isMobile) {
            const dx = (mouseX - this.canvas.width / 2) * this.parallaxFactor * 0.006;
            const dy = (mouseY - this.canvas.height / 2) * this.parallaxFactor * 0.006;
            this.x += dx;
            this.y += dy;
        }

        // Gyroscope (mobile)
        if (tiltX && tiltY) {
            this.x += tiltX * this.parallaxFactor * 0.12;
            this.y += tiltY * this.parallaxFactor * 0.12;
        }

        // Wrap
        const buffer = this.radius * 1.5;
        if (this.x < -buffer) this.x = this.canvas.width + buffer;
        if (this.x > this.canvas.width + buffer) this.x = -buffer;
        if (this.y < -buffer) this.y = this.canvas.height + buffer;
        if (this.y > this.canvas.height + buffer) this.y = -buffer;

        this._pulse = pulse * breath;
    }

    draw() {
        const r = this.radius * this._pulse;
        const opacity = this.maxOpacity * (0.7 + Math.sin(this.breathPhase) * 0.3);
        const color = `hsla(${this.hue}, 80%, 55%`;

        this.ctx.beginPath();
        const gradient = this.ctx.createRadialGradient(this.x, this.y, 0, this.x, this.y, r);
        gradient.addColorStop(0, color + `, ${opacity})`);
        gradient.addColorStop(0.25, color + `, ${opacity * 0.7})`);
        gradient.addColorStop(0.6, color + `, ${opacity * 0.2})`);
        gradient.addColorStop(1, color + ', 0)');

        this.ctx.fillStyle = gradient;
        this.ctx.globalCompositeOperation = 'screen';
        this.ctx.arc(this.x, this.y, r, 0, Math.PI * 2);
        this.ctx.fill();
        this.ctx.globalCompositeOperation = 'source-over';
    }
}

/* =========================================
   Floating Particles
   ========================================= */
class Particle {
    constructor(canvas) {
        this.canvas = canvas;
        this.ctx = canvas.getContext('2d');
        this.reset();
    }

    reset() {
        this.x = Math.random() * this.canvas.width;
        this.y = Math.random() * this.canvas.height;
        this.size = Math.random() * 1.8 + 0.5;
        this.speedY = -(Math.random() * 0.2 + 0.03);
        this.speedX = (Math.random() - 0.5) * 0.15;
        this.opacity = Math.random() * 0.5 + 0.1;
        this.flickerPhase = Math.random() * Math.PI * 2;
        this.flickerSpeed = Math.random() * 0.02 + 0.01;
    }

    update() {
        this.x += this.speedX;
        this.y += this.speedY;
        this.flickerPhase += this.flickerSpeed;

        if (this.y < -10) {
            this.y = this.canvas.height + 10;
            this.x = Math.random() * this.canvas.width;
        }
        if (this.x < -10) this.x = this.canvas.width + 10;
        if (this.x > this.canvas.width + 10) this.x = -10;
    }

    draw() {
        const flicker = 0.5 + Math.sin(this.flickerPhase) * 0.5;
        const alpha = this.opacity * flicker;
        this.ctx.beginPath();
        this.ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        this.ctx.fillStyle = `rgba(200, 210, 255, ${alpha})`;
        this.ctx.fill();
    }
}

/* =========================================
   Orb System Controller
   ========================================= */
class OrbSystem {
    constructor() {
        this.canvas = document.getElementById('orb-canvas');
        if (!this.canvas) return;

        this.ctx = this.canvas.getContext('2d');
        this.orbs = [];
        this.particles = [];
        this.mouseX = 0;
        this.mouseY = 0;
        this.tiltX = 0;
        this.tiltY = 0;
        this.frameCount = 0;

        this.init();
        this.addEventListeners();
        this.animate();
    }

    init() {
        this.resize();
        this.orbs = [];
        this.particles = [];

        const orbCounts = isMobile ? [2, 2, 1] : [3, 3, 2];
        for (let layer = 0; layer < 3; layer++) {
            for (let i = 0; i < orbCounts[layer]; i++) {
                this.orbs.push(new Orb3D(this.canvas, layer));
            }
        }

        const particleCount = isMobile ? 20 : 50;
        for (let i = 0; i < particleCount; i++) {
            this.particles.push(new Particle(this.canvas));
        }
    }

    resize() {
        const dpr = Math.min(window.devicePixelRatio || 1, isMobile ? 1 : 2);
        this.canvas.width = window.innerWidth * dpr;
        this.canvas.height = window.innerHeight * dpr;
        this.canvas.style.width = window.innerWidth + 'px';
        this.canvas.style.height = window.innerHeight + 'px';
        this.ctx.scale(dpr, dpr);
    }

    addEventListeners() {
        let resizeTimeout;
        window.addEventListener('resize', () => {
            clearTimeout(resizeTimeout);
            resizeTimeout = setTimeout(() => this.resize(), 200);
        });

        if (!isMobile) {
            window.addEventListener('mousemove', (e) => {
                this.mouseX = e.clientX;
                this.mouseY = e.clientY;
            });
        }

        if (window.DeviceOrientationEvent) {
            window.addEventListener('deviceorientation', (e) => {
                this.tiltX = e.gamma || 0;
                this.tiltY = e.beta || 0;
            });
        }
    }

    animate() {
        this.frameCount++;

        if (isMobile && this.frameCount % 2 !== 0) {
            requestAnimationFrame(() => this.animate());
            return;
        }

        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        this.orbs.sort((a, b) => a.layer - b.layer);
        this.orbs.forEach(orb => {
            orb.update(this.mouseX, this.mouseY, this.tiltX, this.tiltY);
            orb.draw();
        });

        this.particles.forEach(p => {
            p.update();
            p.draw();
        });

        requestAnimationFrame(() => this.animate());
    }
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
   Projects — Fetch & Render
   ========================================= */
async function fetchProjects() {
    const projectsContainer = document.getElementById('projects-container');
    if (!projectsContainer) return;

    try {
        const response = await fetch('projects-data.json');
        if (!response.ok) throw new Error('Failed to fetch projects');
        const projects = await response.json();
        projectsContainer.innerHTML = '';
        projects.forEach((project, index) => {
            projectsContainer.appendChild(createProjectCard(project, index));
        });
    } catch (error) {
        console.error('Error fetching projects:', error);
        projectsContainer.innerHTML = `<div class="col-span-full text-center p-8 text-slate-500"><p>Unable to load projects.</p></div>`;
    }
}

async function fetchFeaturedProjects() {
    const featuredContainer = document.getElementById('featured-projects-container');
    if (!featuredContainer) return;

    try {
        const response = await fetch('projects-data.json');
        if (!response.ok) throw new Error('Failed to fetch featured projects');
        const projects = await response.json();
        const featured = projects.filter(p => p.featured);
        featuredContainer.innerHTML = '';
        featured.forEach((project, index) => {
            featuredContainer.appendChild(createProjectCard(project, index));
        });
    } catch (error) {
        console.error('Error fetching featured projects:', error);
        featuredContainer.innerHTML = `<div class="col-span-full text-center p-8 text-slate-500"><p>Unable to load featured projects.</p></div>`;
    }
}

function createProjectCard(project, index) {
    const card = document.createElement('a');
    card.href = project.url;
    card.target = '_blank';
    card.rel = 'noopener noreferrer';
    card.className = 'tilt-3d glass-card rounded-2xl overflow-hidden hover:scale-[1.02] transition-all duration-300 block group';
    card.style.opacity = '0';
    card.style.transform = 'translateY(20px)';
    card.style.transition = 'opacity 0.6s cubic-bezier(0.16,1,0.3,1), transform 0.6s cubic-bezier(0.16,1,0.3,1)';
    card.style.transitionDelay = `${index * 120}ms`;

    // Animate in after a tick
    requestAnimationFrame(() => {
        requestAnimationFrame(() => {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
        });
    });

    card.innerHTML = `
        <div class="tilt-shine absolute inset-0 z-10 pointer-events-none rounded-2xl opacity-0 transition-opacity duration-300"></div>
        <div class="relative h-48 overflow-hidden">
            <img src="${project.thumbnail_url}" alt="${project.title}" class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" loading="lazy">
            <div class="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
            <span class="absolute bottom-4 left-4 text-white text-xs px-3 py-1 rounded-full backdrop-blur-sm bg-indigo-600/90">
                ${project.category}
            </span>
        </div>
        <div class="p-6">
            <h4 class="text-xl font-bold mb-2 text-slate-100 group-hover:text-indigo-400 transition-colors line-clamp-2">${project.title}</h4>
            <p class="text-sm text-slate-400 line-clamp-3 mb-4">${project.description}</p>
            <div class="flex flex-wrap gap-2 mb-4">
                ${project.tech_stack.slice(0, 3).map(tech => `
                    <span class="text-xs px-2 py-1 bg-white/5 rounded-full text-slate-400 border border-white/10">${tech}</span>
                `).join('')}
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
    updateAge();
    initActiveLinkHighlight();
    fetchProjects();
    fetchFeaturedProjects();

    new OrbSystem();
    new ScrollReveal();
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
