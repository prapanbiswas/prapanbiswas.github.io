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
    if (ageElement) {
        ageElement.textContent = calculateAge();
    }
}

/* =========================================
   Orb Animation System (Infinite Motion)
   ========================================= */
class Orb {
    constructor(canvas, colors) {
        this.canvas = canvas;
        this.ctx = canvas.getContext('2d');
        this.colors = colors;
        this.reset();
    }

    reset() {
        this.radius = Math.random() * 300 + 200; // Much larger, spreading orbs
        this.x = Math.random() * this.canvas.width;
        this.y = Math.random() * this.canvas.height;
        // Randomize initial direction completely (360 degrees)
        const angle = Math.random() * Math.PI * 2;
        const speed = Math.random() * 0.3 + 0.1;
        this.vx = Math.cos(angle) * speed;
        this.vy = Math.sin(angle) * speed;

        // Initial Color (HSLA for easier manipulation)
        this.hue = Math.random() * 360;
        this.shimmerSpeed = Math.random() * 0.2 + 0.1;
    }

    update(mouseX, mouseY, tiltX, tiltY) {
        // 1. Organic Wandering (Change direction slowly)
        // Add a small random vector to velocity each frame
        const wanderStrength = 0.02;
        this.vx += (Math.random() - 0.5) * wanderStrength;
        this.vy += (Math.random() - 0.5) * wanderStrength;

        // Cap max speed to prevent them from zooming off
        const maxSpeed = 0.8;
        const speed = Math.sqrt(this.vx * this.vx + this.vy * this.vy);
        if (speed > maxSpeed) {
            this.vx = (this.vx / speed) * maxSpeed;
            this.vy = (this.vy / speed) * maxSpeed;
        }

        // Apply Velocity
        this.x += this.vx;
        this.y += this.vy;

        // 2. Continuous Color Motion (Global Shift)
        this.hue += this.shimmerSpeed;
        if (this.hue > 360) this.hue = 0;

        // Interaction Forces (Mouse Magnetism) - subtle pull
        if (mouseX && mouseY) {
            const dx = mouseX - this.canvas.width / 2;
            const dy = mouseY - this.canvas.height / 2;
            // Distort position slightly towards mouse but keep organic flow
            this.x += dx * 0.005;
            this.y += dy * 0.005;
        }

        // Gyroscope
        if (tiltX && tiltY) {
            this.x += tiltX * 0.1;
            this.y += tiltY * 0.1;
        }

        // Wall Collision (Wrap)
        // Add extra buffer so they don't 'pop' in
        const buffer = this.radius;
        if (this.x < -buffer) this.x = this.canvas.width + buffer;
        if (this.x > this.canvas.width + buffer) this.x = -buffer;
        if (this.y < -buffer) this.y = this.canvas.height + buffer;
        if (this.y > this.canvas.height + buffer) this.y = -buffer;
    }

    draw() {
        this.ctx.beginPath();
        // Dynamic Color from Hue
        const color = `hsla(${this.hue}, 80%, 60%`;

        // "Round line not visible... faded or blurred out"
        // Use a gradient that fades to 0 opacity well before the edge radius
        const gradient = this.ctx.createRadialGradient(this.x, this.y, 0, this.x, this.y, this.radius);
        gradient.addColorStop(0, color + ', 0.3)'); // Soft center
        gradient.addColorStop(0.4, color + ', 0.1)'); // Fade out begins
        gradient.addColorStop(0.8, color + ', 0)'); // Fully transparent BEFORE edge
        gradient.addColorStop(1, color + ', 0)'); // Safety clear

        this.ctx.fillStyle = gradient;
        // 'screen' mode helps them blend beautifully like light
        this.ctx.globalCompositeOperation = 'screen';
        this.ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        this.ctx.fill();
        this.ctx.globalCompositeOperation = 'source-over';
    }
}

class OrbSystem {
    constructor() {
        this.canvas = document.getElementById('orb-canvas');
        if (!this.canvas) return;

        // Ensure clean canvas context
        this.ctx = this.canvas.getContext('2d');
        this.orbs = [];
        this.colors = ['#6366f1', '#a855f7', '#ec4899', '#3b82f6'];

        this.mouseX = 0;
        this.mouseY = 0;
        this.tiltX = 0;
        this.tiltY = 0;

        this.init();
        this.animate();
        this.addEventListeners();
    }

    init() {
        this.resize();
        this.orbs = [];
        // Create 8 orbs
        for (let i = 0; i < 8; i++) {
            this.orbs.push(new Orb(this.canvas, this.colors));
        }
    }

    resize() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
    }

    addEventListeners() {
        window.addEventListener('resize', () => this.resize());
        window.addEventListener('mousemove', (e) => {
            this.mouseX = e.clientX;
            this.mouseY = e.clientY;
        });
        if (window.DeviceOrientationEvent) {
            window.addEventListener('deviceorientation', (e) => {
                this.tiltX = e.gamma;
                this.tiltY = e.beta;
            });
        }
    }

    animate() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.orbs.forEach(orb => {
            orb.update(this.mouseX, this.mouseY, this.tiltX, this.tiltY);
            orb.draw();
        });
        requestAnimationFrame(() => this.animate());
    }
}

/* =========================================
   Magnetic Navigation System (Mobile Only)
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
        this.trigger.addEventListener('click', () => {
            this.isOpen = !this.isOpen;
            this.toggleMenu();
        });

        this.links.forEach(link => {
            link.addEventListener('click', () => {
                this.isOpen = false;
                this.toggleMenu();
            });
        });
    }

    toggleMenu() {
        const line1 = document.querySelector('.burger-line-1');
        const line2 = document.querySelector('.burger-line-2');
        const line3 = document.querySelector('.burger-line-3');

        if (this.isOpen) {
            // Animate 3 lines to X
            // Top and Bottom become X, Middle fades out
            gsap.to(line1, { rotation: 45, y: 8, duration: 0.3 }); // Move down and rotate
            gsap.to(line2, { opacity: 0, scale: 0, duration: 0.2 }); // Center disappears
            gsap.to(line3, { rotation: -45, y: -8, duration: 0.3 }); // Move up and rotate

            // Reveal Menu
            this.menu.classList.remove('invisible');
            gsap.to(this.menu, { clipPath: 'circle(150% at top right)', duration: 0.6, ease: 'power3.inOut' });
            gsap.to(this.links, { y: 0, opacity: 1, duration: 0.4, stagger: 0.1, delay: 0.2 });
        } else {
            // Restore Burger
            gsap.to(line1, { rotation: 0, y: 0, duration: 0.3 });
            gsap.to(line2, { opacity: 1, scale: 1, duration: 0.3 });
            gsap.to(line3, { rotation: 0, y: 0, duration: 0.3 });

            // Hide Menu
            gsap.to(this.menu, { clipPath: 'circle(0% at top right)', duration: 0.5, ease: 'power3.inOut', onComplete: () => this.menu.classList.add('invisible') });
            gsap.to(this.links, { y: 10, opacity: 0, duration: 0.3 });
        }
    }
}

function initActiveLinkHighlight() {
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-link');

    if (sections.length === 0) return;

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const id = entry.target.getAttribute('id');
                // Highlight Desktop Links
                const desktopLinks = document.querySelectorAll('nav .hidden a');
                desktopLinks.forEach(link => {
                    if (link.getAttribute('href') === `#${id}`) {
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

async function fetchBlogPosts() {
    const blogContainer = document.getElementById('blog-container');
    if (!blogContainer) return;

    try {
        const response = await fetch('blog-data.json');
        if (!response.ok) throw new Error('Failed to fetch blog posts');

        const posts = await response.json();
        blogContainer.innerHTML = '';

        posts.forEach((post, index) => {
            const blogCard = createBlogCard(post, index);
            blogContainer.appendChild(blogCard);
        });
    } catch (error) {
        console.error('Error fetching blog posts:', error);
        blogContainer.innerHTML = `
            <div class="text-center p-8 text-red-500">
                <p>Unable to load blog posts. Please try again later.</p>
            </div>
        `;
    }
}

function createBlogCard(post, index) {
    const card = document.createElement('a');
    card.href = `blog-posts/${post.filename}`;
    card.className = 'glass-card rounded-2xl overflow-hidden hover:scale-[1.02] transition-transform duration-300 block group';

    // Using new glass styles
    card.innerHTML = `
        <div class="relative h-48 overflow-hidden">
            <img src="${post.thumbnail_url}" alt="${post.title}" class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110">
            <div class="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
            <span class="absolute bottom-4 left-4 bg-primary-glow/90 text-white text-xs px-3 py-1 rounded-full backdrop-blur-sm bg-indigo-600">
                ${post.category}
            </span>
        </div>
        <div class="p-6">
            <h4 class="text-xl font-bold mb-2 text-slate-100 group-hover:text-indigo-400 transition-colors line-clamp-2">${post.title}</h4>
            <div class="flex items-center gap-2 text-sm text-slate-400 mb-4">
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg>
                ${formatDate(post.date)}
            </div>
            <p class="text-sm text-slate-300 line-clamp-3 mb-4">${post.summary}</p>
            <span class="text-indigo-400 font-medium text-sm flex items-center gap-1 group-hover:gap-2 transition-all">
                Read More
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3"></path></svg>
            </span>
        </div>
    `;

    return card;
}

function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
}

function initScrollAnimations() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('.reveal-on-scroll').forEach((el) => {
        observer.observe(el);
    });
}

function initializeWebsite() {
    updateAge();
    initActiveLinkHighlight();
    fetchBlogPosts();
    initScrollAnimations();

    // Initialize Systems
    new OrbSystem(); // Classic Infinite Orbs
    new MagneticNav(); // Mobile-Only Magnetic Menu
}

document.addEventListener('DOMContentLoaded', initializeWebsite);
