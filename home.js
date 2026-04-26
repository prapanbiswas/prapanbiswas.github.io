/* =========================================
   Home Page — Page-Specific JavaScript
   =========================================
   Real-time Firebase listeners for:
   - Profile (name, tagline, about, image, status, location)
   - Social Links
   - Skills
   - Interests
   - Featured Projects
   ========================================= */

/* =========================================
   Typing Cursor Effect
   ========================================= */
class TypeWriter {
    constructor(element, text) {
        this.element = element;
        if (!this.element) return;
        this.text = text || this.element.getAttribute('data-text') || '';
        this.element.textContent = '';
        this.element.style.borderRight = '3px solid rgba(99,102,241,0.8)';
        this.element.style.paddingRight = '4px';
        this.charIndex = 0;
        if (this.text) this.type();
    }

    type() {
        if (this.charIndex < this.text.length) {
            this.element.textContent += this.text.charAt(this.charIndex);
            this.charIndex++;
            const delay = 40 + Math.random() * 60;
            setTimeout(() => this.type(), delay);
        } else {
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
   Profile Listener — onValue()
   ========================================= */
let _typewriterInstance = null;

function listenProfile() {
    fbListen('profile', (profile) => {
        if (!profile) return;

        // Name → TypeWriter
        const nameEl = document.getElementById('typed-title');
        if (nameEl && profile.name) {
            removeSkeleton(nameEl);
            if (!_typewriterInstance) {
                _typewriterInstance = new TypeWriter(nameEl, escapeHTML(profile.name));
            }
        }

        // Status badge
        const statusEl = document.querySelector('[data-bind="status"]');
        if (statusEl) {
            removeSkeleton(statusEl);
            if (profile.availableStatus) statusEl.textContent = profile.availableStatus;
        }

        // Location
        const locationEl = document.querySelector('[data-bind="location"]');
        if (locationEl) {
            removeSkeleton(locationEl);
            if (profile.location) locationEl.textContent = profile.location;
        }

        // Role tags
        const roleTagsEl = document.querySelector('[data-bind="role-tags"]');
        if (roleTagsEl) {
            const roles = profile.roles || ['Developer', 'Designer', 'Engineer'];
            const colors = [
                { bg: 'bg-indigo-500/10', border: 'border-indigo-500/20', text: 'text-indigo-300' },
                { bg: 'bg-purple-500/10', border: 'border-purple-500/20', text: 'text-purple-300' },
                { bg: 'bg-pink-500/10', border: 'border-pink-500/20', text: 'text-pink-300' }
            ];
            roleTagsEl.innerHTML = roles.map((role, i) => {
                const c = colors[i % colors.length];
                return `<span class="px-4 py-1.5 rounded-full ${c.bg} border ${c.border} ${c.text} text-sm font-medium">${escapeHTML(role)}</span>`;
            }).join('');
            removeSkeleton(roleTagsEl);
        }

        // Tagline
        const taglineEl = document.querySelector('[data-bind="tagline"]');
        if (taglineEl && profile.tagline) {
            removeSkeleton(taglineEl);
            const escaped = escapeHTML(profile.tagline);
            taglineEl.innerHTML = escaped
                .replace(/code/gi, '<span class="text-white font-medium">code</span>')
                .replace(/design/gi, '<span class="text-white font-medium">design</span>')
                .replace(/engineering/gi, '<span class="text-white font-medium">engineering</span>');
        }

        // Profile image
        const imgEl = document.querySelector('[data-bind="profile-img"]');
        const skelAvatar = document.querySelector('[data-bind="profile-img-skel"]');
        if (imgEl) {
            if (profile.profileImageUrl) {
                imgEl.src = sanitizeURL(profile.profileImageUrl);
                imgEl.alt = escapeHTML(profile.name || 'Profile');
                imgEl.classList.remove('hidden');
                if (skelAvatar) skelAvatar.classList.add('hidden');
            }
            removeSkeleton(imgEl.closest('.profile-ring') || imgEl);
        }

        // About text
        const aboutEl = document.querySelector('[data-bind="about"]');
        if (aboutEl && profile.aboutText) {
            removeSkeleton(aboutEl);
            const paragraphs = profile.aboutText.split('\n\n');
            aboutEl.innerHTML = paragraphs.map(para => {
                const escaped = escapeHTML(para);
                const boldName = escaped.replace(/(Prapan Biswas)/g, '<strong class="text-white">$1</strong>');
                return `<p class="mb-4">${boldName}</p>`;
            }).join('');
        }

        // Age from birthday
        if (profile.birthday) {
            const bd = new Date(profile.birthday);
            const today = new Date();
            let age = today.getFullYear() - bd.getFullYear();
            const m = today.getMonth() - bd.getMonth();
            if (m < 0 || (m === 0 && today.getDate() < bd.getDate())) age--;
            const ageEl = document.getElementById('age');
            if (ageEl) {
                removeSkeleton(ageEl);
                ageEl.textContent = age;
            }
        }

        // Contact section — email
        const emailLink = document.querySelector('[data-bind="email-link"]');
        if (emailLink && profile.email) {
            emailLink.href = `mailto:${encodeURIComponent(profile.email)}`;
        }
        const infoEmail = document.querySelector('[data-bind="info-email"]');
        if (infoEmail && profile.email) {
            removeSkeleton(infoEmail);
            infoEmail.textContent = profile.email;
            infoEmail.href = `mailto:${encodeURIComponent(profile.email)}`;
        }

        // Info card fields
        const infoLocation = document.querySelector('[data-bind="info-location"]');
        if (infoLocation) {
            removeSkeleton(infoLocation);
            if (profile.location) infoLocation.textContent = profile.location;
        }
        const infoEducation = document.querySelector('[data-bind="info-education"]');
        if (infoEducation) {
            removeSkeleton(infoEducation);
            if (profile.education) infoEducation.textContent = profile.education;
        }

    }, null); // No single container — we handle each element individually
}

/* =========================================
   Social Links Listener
   ========================================= */
function listenSocialLinks() {
    const container = document.querySelector('[data-bind="social-links"]');
    fbListen('socialLinks', (data) => {
        if (!data) return;
        const links = Array.isArray(data) ? data : Object.values(data);
        if (!container || links.length === 0) return;
        container.innerHTML = links.map(link => `
            <a href="${sanitizeURL(link.url)}" target="_blank" rel="noopener noreferrer"
                class="group p-3.5 bg-white/5 rounded-2xl hover:bg-white/10 transition-all border border-white/5 hover:border-white/15 hover:scale-110 hover:-translate-y-1"
                title="${escapeHTML(link.platform)}">
                ${getLucideIcon(link.icon)}
            </a>
        `).join('');
        ensureLucide().then(() => lucide.createIcons());
    }, container);
}

/* =========================================
   Skills Listener
   ========================================= */
function listenSkills() {
    const container = document.querySelector('[data-bind="skills"]');
    fbListen('skills', (data) => {
        if (!data) return;
        const skills = Array.isArray(data) ? data : Object.values(data);
        if (!container || skills.length === 0) return;
        container.innerHTML = skills.map(skill => {
            const safeColor = sanitizeColor(skill.color);
            return `
            <div class="tilt-3d glass-card rounded-2xl p-8 group hover:-translate-y-2 transition-all duration-300">
                <div class="tilt-shine absolute inset-0 z-10 pointer-events-none rounded-2xl opacity-0"></div>
                <div class="w-12 h-12 rounded-xl flex items-center justify-center text-2xl mb-6 group-hover:scale-110 transition-transform"
                    style="background:linear-gradient(135deg, ${safeColor}20, ${safeColor}40)">
                    ${getLucideIcon(skill.icon)}
                </div>
                <h4 class="text-lg font-bold mb-2 text-slate-100">${escapeHTML(skill.title)}</h4>
                <p class="text-sm text-slate-400 leading-relaxed">${escapeHTML(skill.description || '')}</p>
            </div>
        `;
        }).join('');
        // Re-init tilt on new cards
        new TiltCards();
        ensureLucide().then(() => lucide.createIcons());
    }, container);
}

/* =========================================
   Interests Listener
   ========================================= */
function listenInterests() {
    const container = document.querySelector('[data-bind="interests"]');
    fbListen('interests', (data) => {
        if (!data) return;
        const interests = Array.isArray(data) ? data : Object.values(data);
        if (!container || interests.length === 0) return;
        container.innerHTML = interests.map(interest => `
            <div class="tilt-3d glass-card p-8 rounded-2xl text-center group hover:-translate-y-2 transition-all duration-300">
                <div class="tilt-shine absolute inset-0 z-10 pointer-events-none rounded-2xl opacity-0"></div>
                <div class="inline-flex p-4 rounded-2xl bg-indigo-500/10 text-indigo-400 mb-5 group-hover:scale-110 transition-transform">
                    ${getLucideIcon(interest.icon)}
                </div>
                <h4 class="text-lg font-bold mb-2 text-slate-100">${escapeHTML(interest.title)}</h4>
                <p class="text-sm text-slate-400">${escapeHTML(interest.description || '')}</p>
            </div>
        `).join('');
        new TiltCards();
        ensureLucide().then(() => lucide.createIcons());
    }, container);
}

/* =========================================
   Featured Projects Listener
   ========================================= */
function listenFeaturedProjects() {
    const container = document.getElementById('featured-projects-container');
    if (!container) return;

    // Show skeleton cards while loading
    generateSkeletonCards(3, container);

    fbListen('projects', (data) => {
        const projects = data ? (Array.isArray(data) ? data : Object.values(data)) : [];
        const featured = projects.filter(p => p.featured);
        container.innerHTML = '';

        if (featured.length === 0) {
            container.innerHTML = '<div class="col-span-full text-center p-8 text-slate-500"><p>No featured projects yet.</p></div>';
            return;
        }

        featured.forEach((project, index) => {
            container.appendChild(createProjectCard(project, index));
        });
        new TiltCards();
    }, container);
}

/* =========================================
   Home Page Initialize
   ========================================= */
function initializeHomePage() {
    initActiveLinkHighlight();

    // Attach persistent real-time listeners
    listenProfile();
    listenSocialLinks();
    listenSkills();
    listenInterests();
    listenFeaturedProjects();
}

document.addEventListener('DOMContentLoaded', initializeHomePage);
