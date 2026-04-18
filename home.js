/* =========================================
   Home Page — Page-Specific JavaScript
   =========================================
   Contains:
   - Age calculator
   - TypeWriter effect
   - Firebase dynamic content loading (profile, skills, interests, projects)
   ========================================= */

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

/* =========================================
   Projects — Fetch Featured from Firebase
   ========================================= */
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

/* =========================================
   Home Page Initialize
   ========================================= */
function initializeHomePage() {
    // Initialize Firebase App Check before any data fetching
    if (typeof initPublicFirebase === 'function') {
        initPublicFirebase();
    }

    updateAge();
    initActiveLinkHighlight();
    loadDynamicContent();
    fetchFeaturedProjects();
    new TypeWriter();
}

document.addEventListener('DOMContentLoaded', initializeHomePage);
