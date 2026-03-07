/* =========================================
   Device Detection
   ========================================= */
const isBgMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)
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
        const baseRadius = isBgMobile ? 100 : 220;
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
        if (mouseX && mouseY && !isBgMobile) {
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

        const orbCounts = isBgMobile ? [2, 2, 1] : [3, 3, 2];
        for (let layer = 0; layer < 3; layer++) {
            for (let i = 0; i < orbCounts[layer]; i++) {
                this.orbs.push(new Orb3D(this.canvas, layer));
            }
        }

        const particleCount = isBgMobile ? 20 : 50;
        for (let i = 0; i < particleCount; i++) {
            this.particles.push(new Particle(this.canvas));
        }
    }

    resize() {
        const dpr = Math.min(window.devicePixelRatio || 1, isBgMobile ? 1 : 2);
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

        if (!isBgMobile) {
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

        if (isBgMobile && this.frameCount % 2 !== 0) {
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


document.addEventListener('DOMContentLoaded', () => {
    if (document.getElementById('orb-canvas')) {
        new OrbSystem();
    }
});
