/* =========================================
   Firebase Config
   ========================================= */
const firebaseConfig = {
    apiKey: "AIzaSyAbL-DvzapDfWnYOY6abNhPvBW614GdEJE",
    authDomain: "prapan-biswas.firebaseapp.com",
    databaseURL: "https://prapan-biswas-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "prapan-biswas",
    storageBucket: "prapan-biswas.firebasestorage.app",
    messagingSenderId: "453264451702",
    appId: "1:453264451702:web:fda490119ff32667701757"
};

let app, auth, db;

const RECAPTCHA_SITE_KEY = "6Lfoq64sAAAAAGgMOjvbyyNkZ5Jd5eYbc4enw6qT";

function initFirebase() {
    app = firebase.initializeApp(firebaseConfig);

    // Initialize App Check with standard reCAPTCHA v3 BEFORE database
    try {
        const appCheck = firebase.appCheck();
        appCheck.activate(
            new firebase.appCheck.ReCaptchaV3Provider(RECAPTCHA_SITE_KEY),
            true
        );
        console.log('[Admin] App Check (reCAPTCHA v3) initialized');
    } catch (err) {
        console.warn('[Admin] App Check init failed:', err.message);
    }

    auth = firebase.auth();
    db = firebase.database();
}

/* =========================================
   Icon Library (~100 icons as emoji + text)
   ========================================= */
const ICON_LIBRARY = [
    { id: 'code', label: 'Code', svg: '&lt;/&gt;' },
    { id: 'mobile', label: 'Mobile', svg: '📱' },
    { id: 'design', label: 'Design', svg: '🎨' },
    { id: 'photo', label: 'Photo', svg: '📷' },
    { id: 'server', label: 'Server', svg: '🖥️' },
    { id: 'database', label: 'Database', svg: '🗄️' },
    { id: 'cloud', label: 'Cloud', svg: '☁️' },
    { id: 'lock', label: 'Security', svg: '🔒' },
    { id: 'gear', label: 'Settings', svg: '⚙️' },
    { id: 'globe', label: 'Web', svg: '🌐' },
    { id: 'rocket', label: 'Rocket', svg: '🚀' },
    { id: 'lightning', label: 'Fast', svg: '⚡' },
    { id: 'chart', label: 'Analytics', svg: '📊' },
    { id: 'paintbrush', label: 'Art', svg: '🖌️' },
    { id: 'palette', label: 'Palette', svg: '🎭' },
    { id: 'layers', label: 'Layers', svg: '📚' },
    { id: 'pen', label: 'Write', svg: '✏️' },
    { id: 'terminal', label: 'Terminal', svg: '💻' },
    { id: 'chip', label: 'Hardware', svg: '🔧' },
    { id: 'atom', label: 'Science', svg: '⚛️' },
    { id: 'brain', label: 'AI/ML', svg: '🧠' },
    { id: 'robot', label: 'Robot', svg: '🤖' },
    { id: 'game', label: 'Gaming', svg: '🎮' },
    { id: 'music', label: 'Music', svg: '🎵' },
    { id: 'video', label: 'Video', svg: '🎬' },
    { id: 'mic', label: 'Audio', svg: '🎙️' },
    { id: 'book', label: 'Learning', svg: '📖' },
    { id: 'graduation', label: 'Education', svg: '🎓' },
    { id: 'trophy', label: 'Award', svg: '🏆' },
    { id: 'star', label: 'Star', svg: '⭐' },
    { id: 'heart', label: 'Love', svg: '❤️' },
    { id: 'fire', label: 'Hot', svg: '🔥' },
    { id: 'sparkle', label: 'Sparkle', svg: '✨' },
    { id: 'target', label: 'Target', svg: '🎯' },
    { id: 'puzzle', label: 'Puzzle', svg: '🧩' },
    { id: 'bulb', label: 'Idea', svg: '💡' },
    { id: 'wrench', label: 'Tools', svg: '🔧' },
    { id: 'hammer', label: 'Build', svg: '🔨' },
    { id: 'package', label: 'Package', svg: '📦' },
    { id: 'link', label: 'Link', svg: '🔗' },
    { id: 'mail', label: 'Email', svg: '📧' },
    { id: 'chat', label: 'Chat', svg: '💬' },
    { id: 'users', label: 'Team', svg: '👥' },
    { id: 'user', label: 'User', svg: '👤' },
    { id: 'shield', label: 'Shield', svg: '🛡️' },
    { id: 'key', label: 'Key', svg: '🔑' },
    { id: 'search', label: 'Search', svg: '🔍' },
    { id: 'map', label: 'Map', svg: '🗺️' },
    { id: 'pin', label: 'Location', svg: '📍' },
    { id: 'clock', label: 'Time', svg: '🕐' },
    { id: 'calendar', label: 'Calendar', svg: '📅' },
    { id: 'plant', label: 'Growth', svg: '🌱' },
    { id: 'tree', label: 'Nature', svg: '🌳' },
    { id: 'sun', label: 'Light', svg: '☀️' },
    { id: 'moon', label: 'Dark', svg: '🌙' },
    { id: 'battery', label: 'Energy', svg: '🔋' },
    { id: 'wifi', label: 'Wireless', svg: '📶' },
    { id: 'bluetooth', label: 'Bluetooth', svg: '🔵' },
    { id: 'printer', label: 'Print', svg: '🖨️' },
    { id: 'camera', label: 'Camera', svg: '📸' },
    { id: 'telescope', label: 'Explore', svg: '🔭' },
    { id: 'microscope', label: 'Research', svg: '🔬' },
    { id: 'dna', label: 'Biology', svg: '🧬' },
    { id: 'math', label: 'Math', svg: '➗' },
    { id: 'infinity', label: 'Infinity', svg: '♾️' },
    { id: 'recycle', label: 'Sustain', svg: '♻️' },
    { id: 'building', label: 'Civil Eng', svg: '🏗️' },
    { id: 'house', label: 'Home', svg: '🏠' },
    { id: 'bridge', label: 'Bridge', svg: '🌉' },
    { id: 'factory', label: 'Industry', svg: '🏭' },
    { id: 'truck', label: 'Delivery', svg: '🚚' },
    { id: 'plane', label: 'Travel', svg: '✈️' },
    { id: 'satellite', label: 'Space', svg: '🛰️' },
    { id: 'earth', label: 'Earth', svg: '🌍' },
    { id: 'flag', label: 'Flag', svg: '🚩' },
    { id: 'medal', label: 'Medal', svg: '🏅' },
    { id: 'crown', label: 'Premium', svg: '👑' },
    { id: 'diamond', label: 'Diamond', svg: '💎' },
    { id: 'money', label: 'Finance', svg: '💰' },
    { id: 'coffee', label: 'Coffee', svg: '☕' },
    { id: 'pizza', label: 'Food', svg: '🍕' },
    { id: 'gym', label: 'Fitness', svg: '💪' },
    { id: 'run', label: 'Sports', svg: '🏃' },
    { id: 'football', label: 'Football', svg: '⚽' },
    { id: 'cricket', label: 'Cricket', svg: '🏏' },
    { id: 'wave', label: 'Wave', svg: '👋' },
    { id: 'thumbsup', label: 'Like', svg: '👍' },
    { id: 'clap', label: 'Clap', svg: '👏' },
    { id: 'handshake', label: 'Partner', svg: '🤝' },
    { id: 'megaphone', label: 'Announce', svg: '📢' },
    { id: 'bell', label: 'Notify', svg: '🔔' },
    { id: 'gift', label: 'Gift', svg: '🎁' },
    { id: 'confetti', label: 'Party', svg: '🎊' },
    { id: 'eye', label: 'Vision', svg: '👁️' },
    { id: 'ear', label: 'Listen', svg: '👂' },
    { id: 'speech', label: 'Speak', svg: '🗣️' },
    { id: 'notebook', label: 'Notes', svg: '📓' },
    { id: 'folder', label: 'Files', svg: '📁' },
    { id: 'archive', label: 'Archive', svg: '🗃️' },
    { id: 'clipboard', label: 'Clipboard', svg: '📋' },
    { id: 'scissors', label: 'Cut', svg: '✂️' },
    { id: 'tape', label: 'Fix', svg: '🩹' },
];

/* =========================================
   State
   ========================================= */
let currentSection = 'dashboard';

/* =========================================
   Security: Sanitization
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
    if (/^\s*(javascript|data|vbscript)\s*:/i.test(trimmed)) return '#';
    if (/^(https?:|mailto:|tel:|\/|#|\.\.)/i.test(trimmed) || !trimmed.includes(':')) {
        return encodeURI(decodeURI(trimmed));
    }
    return '#';
}

/* =========================================
   Lucide Helper — refresh icons after DOM
   ========================================= */
function refreshIcons(root) {
    if (typeof lucide !== 'undefined') {
        lucide.createIcons(root ? { root } : undefined);
    }
}

/* =========================================
   Auth
   ========================================= */
function handleLogin(e) {
    e.preventDefault();
    const email = document.getElementById('login-email').value;
    const password = document.getElementById('login-password').value;
    const btn = document.getElementById('login-btn');
    btn.disabled = true;
    btn.textContent = 'Signing in...';

    auth.signInWithEmailAndPassword(email, password)
        .then(() => {
            document.getElementById('auth-screen').style.display = 'none';
            document.getElementById('app-screen').style.display = 'block';
            refreshIcons();
            loadAllData();
            toast('Signed in successfully', 'success');
        })
        .catch(err => {
            toast(err.message, 'error');
            btn.disabled = false;
            btn.textContent = 'Sign In';
        });
}

function handleLogout() {
    auth.signOut().then(() => {
        document.getElementById('auth-screen').style.display = 'flex';
        document.getElementById('app-screen').style.display = 'none';
    });
}

/* =========================================
   Navigation
   ========================================= */
function navigateTo(section) {
    currentSection = section;
    document.querySelectorAll('.section-panel').forEach(p => p.classList.remove('active'));
    document.querySelectorAll('.sidebar a[data-section]').forEach(a => a.classList.remove('active'));

    const panel = document.getElementById('section-' + section);
    const link = document.querySelector(`.sidebar a[data-section="${section}"]`);
    if (panel) panel.classList.add('active');
    if (link) link.classList.add('active');

    // Close mobile sidebar & overlay
    document.querySelector('.sidebar')?.classList.remove('open');
    document.getElementById('mobile-overlay')?.classList.remove('open');
}

/* =========================================
   Firebase CRUD Helpers
   ========================================= */
function dbSet(path, data) {
    return db.ref(path).set(data);
}

function dbGet(path) {
    return db.ref(path).once('value').then(snap => snap.val());
}

/* =========================================
   Loading Skeletons
   ========================================= */
function showListLoading(containerId, count = 3) {
    const c = document.getElementById(containerId);
    if (!c) return;
    c.innerHTML = Array.from({ length: count }, () =>
        '<div class="skeleton" style="margin-bottom:0.5rem;min-height:60px"></div>'
    ).join('');
}

/* =========================================
   Dashboard Stats
   ========================================= */
function updateDashboard() {
    const el = (id) => document.getElementById(id);
    el('dash-social').textContent = socialLinks.length;
    el('dash-skills').textContent = skills.length;
    el('dash-projects').textContent = projects.length;
    el('dash-blogs').textContent = blogs.length;
}

/* =========================================
   Load All Data
   ========================================= */
async function loadAllData() {
    // Show loading skeletons
    ['social-list', 'skills-list', 'interests-list', 'projects-list', 'blogs-list'].forEach(id => showListLoading(id, 2));

    try {
        const [profile, sl, sk, int, proj, bl] = await Promise.all([
            dbGet('profile'),
            dbGet('socialLinks'),
            dbGet('skills'),
            dbGet('interests'),
            dbGet('projects'),
            dbGet('blogs')
        ]);
        renderProfile(profile || {});
        renderSocialLinks(sl || []);
        renderSkills(sk || []);
        renderInterests(int || []);
        renderProjects(proj || []);
        renderBlogs(bl || []);
        updateDashboard();
    } catch (err) {
        toast('Failed to load data: ' + err.message, 'error');
        console.error('[Admin] Load error:', err);
    }
}

/* =========================================
   PROFILE
   ========================================= */
function renderProfile(data) {
    document.getElementById('pf-name').value = data.name || '';
    document.getElementById('pf-tagline').value = data.tagline || '';
    document.getElementById('pf-location').value = data.location || '';
    document.getElementById('pf-education').value = data.education || '';
    document.getElementById('pf-about').value = data.aboutText || '';
    document.getElementById('pf-image').value = data.profileImageUrl || '';
    document.getElementById('pf-status').value = data.availableStatus || 'Available for projects';
    document.getElementById('pf-birthday').value = data.birthday || '';
}

async function saveProfile() {
    const data = {
        name: document.getElementById('pf-name').value.trim(),
        tagline: document.getElementById('pf-tagline').value.trim(),
        location: document.getElementById('pf-location').value.trim(),
        education: document.getElementById('pf-education').value.trim(),
        aboutText: document.getElementById('pf-about').value.trim(),
        profileImageUrl: document.getElementById('pf-image').value.trim(),
        availableStatus: document.getElementById('pf-status').value.trim(),
        birthday: document.getElementById('pf-birthday').value.trim(),
    };
    try {
        await dbSet('profile', data);
        toast('Profile saved', 'success');
    } catch (err) { toast(err.message, 'error'); }
}

/* =========================================
   SOCIAL LINKS
   ========================================= */
let socialLinks = [];

function renderSocialLinks(data) {
    socialLinks = Array.isArray(data) ? data : Object.values(data || {});
    const list = document.getElementById('social-list');
    document.getElementById('social-count').textContent = socialLinks.length;
    if (socialLinks.length === 0) {
        list.innerHTML = '<div class="empty-state"><div class="empty-icon">🔗</div><h3>No social links</h3><p>Add your first social profile</p></div>';
        return;
    }
    list.innerHTML = socialLinks.map((s, i) => `
        <div class="item-card" style="animation-delay:${i * 50}ms">
            <div class="item-icon">${getIconSvg(s.icon)}</div>
            <div class="item-info">
                <div class="item-title">${escapeHTML(s.platform)}</div>
                <div class="item-desc">${escapeHTML(s.url)}</div>
            </div>
            <div class="item-actions">
                <button class="btn btn-ghost btn-sm" onclick="editSocial(${i})">Edit</button>
                <button class="btn btn-danger btn-sm" onclick="deleteSocial(${i})">✕</button>
            </div>
        </div>
    `).join('');
    refreshIcons(list);
}

function showSocialForm(index = -1) {
    const s = index >= 0 ? socialLinks[index] : { platform: '', url: '', icon: 'globe' };
    document.getElementById('social-edit-idx').value = index;
    document.getElementById('social-platform').value = s.platform;
    document.getElementById('social-url').value = s.url;
    document.getElementById('social-icon-preview').innerHTML = getIconSvg(s.icon);
    document.getElementById('social-icon-val').value = s.icon || 'globe';
    document.getElementById('social-form-panel').style.display = 'block';
    refreshIcons(document.getElementById('social-form-panel'));
}
function editSocial(i) { showSocialForm(i); }
function hideSocialForm() { document.getElementById('social-form-panel').style.display = 'none'; }

async function saveSocial() {
    const idx = parseInt(document.getElementById('social-edit-idx').value);
    const item = {
        platform: document.getElementById('social-platform').value.trim(),
        url: document.getElementById('social-url').value.trim(),
        icon: document.getElementById('social-icon-val').value
    };
    if (!item.platform || !item.url) return toast('Fill all fields', 'error');
    if (idx >= 0) socialLinks[idx] = item; else socialLinks.push(item);
    try {
        await dbSet('socialLinks', socialLinks);
        renderSocialLinks(socialLinks);
        hideSocialForm();
        updateDashboard();
        toast('Social link saved', 'success');
    } catch (err) { toast(err.message, 'error'); }
}

async function deleteSocial(i) {
    if (!confirm('Delete this link?')) return;
    socialLinks.splice(i, 1);
    await dbSet('socialLinks', socialLinks);
    renderSocialLinks(socialLinks);
    updateDashboard();
    toast('Deleted', 'success');
}

/* =========================================
   SKILLS
   ========================================= */
let skills = [];

function renderSkills(data) {
    skills = Array.isArray(data) ? data : Object.values(data || {});
    const list = document.getElementById('skills-list');
    document.getElementById('skills-count').textContent = skills.length;
    if (skills.length === 0) {
        list.innerHTML = '<div class="empty-state"><div class="empty-icon">⚡</div><h3>No skills</h3><p>Add your first expertise</p></div>';
        return;
    }
    list.innerHTML = skills.map((s, i) => `
        <div class="item-card" style="animation-delay:${i * 50}ms">
            <div class="item-icon" style="border-color:${s.color || '#6366f1'}30;background:${s.color || '#6366f1'}15">${getIconSvg(s.icon)}</div>
            <div class="item-info">
                <div class="item-title">${escapeHTML(s.title)}</div>
                <div class="item-desc">${escapeHTML(s.description || '')}</div>
            </div>
            <div class="item-actions">
                <button class="btn btn-ghost btn-sm" onclick="editSkill(${i})">Edit</button>
                <button class="btn btn-danger btn-sm" onclick="deleteSkill(${i})">✕</button>
            </div>
        </div>
    `).join('');
    refreshIcons(list);
}

function showSkillForm(index = -1) {
    const s = index >= 0 ? skills[index] : { title: '', description: '', icon: 'code', color: '#6366f1' };
    document.getElementById('skill-edit-idx').value = index;
    document.getElementById('skill-title').value = s.title;
    document.getElementById('skill-desc').value = s.description || '';
    document.getElementById('skill-color').value = s.color || '#6366f1';
    document.getElementById('skill-icon-preview').innerHTML = getIconSvg(s.icon);
    document.getElementById('skill-icon-val').value = s.icon || 'code';
    document.getElementById('skill-form-panel').style.display = 'block';
    refreshIcons(document.getElementById('skill-form-panel'));
}
function editSkill(i) { showSkillForm(i); }
function hideSkillForm() { document.getElementById('skill-form-panel').style.display = 'none'; }

async function saveSkill() {
    const idx = parseInt(document.getElementById('skill-edit-idx').value);
    const item = {
        title: document.getElementById('skill-title').value.trim(),
        description: document.getElementById('skill-desc').value.trim(),
        icon: document.getElementById('skill-icon-val').value,
        color: document.getElementById('skill-color').value
    };
    if (!item.title) return toast('Title required', 'error');
    if (idx >= 0) skills[idx] = item; else skills.push(item);
    try {
        await dbSet('skills', skills);
        renderSkills(skills);
        hideSkillForm();
        updateDashboard();
        toast('Skill saved', 'success');
    } catch (err) { toast(err.message, 'error'); }
}

async function deleteSkill(i) {
    if (!confirm('Delete this skill?')) return;
    skills.splice(i, 1);
    await dbSet('skills', skills);
    renderSkills(skills);
    updateDashboard();
    toast('Deleted', 'success');
}

/* =========================================
   INTERESTS
   ========================================= */
let interests = [];

function renderInterests(data) {
    interests = Array.isArray(data) ? data : Object.values(data || {});
    const list = document.getElementById('interests-list');
    document.getElementById('interests-count').textContent = interests.length;
    if (interests.length === 0) {
        list.innerHTML = '<div class="empty-state"><div class="empty-icon">💡</div><h3>No interests</h3><p>Add what drives you</p></div>';
        return;
    }
    list.innerHTML = interests.map((s, i) => `
        <div class="item-card" style="animation-delay:${i * 50}ms">
            <div class="item-icon">${getIconSvg(s.icon)}</div>
            <div class="item-info">
                <div class="item-title">${escapeHTML(s.title)}</div>
                <div class="item-desc">${escapeHTML(s.description || '')}</div>
            </div>
            <div class="item-actions">
                <button class="btn btn-ghost btn-sm" onclick="editInterest(${i})">Edit</button>
                <button class="btn btn-danger btn-sm" onclick="deleteInterest(${i})">✕</button>
            </div>
        </div>
    `).join('');
    refreshIcons(list);
}

function showInterestForm(index = -1) {
    const s = index >= 0 ? interests[index] : { title: '', description: '', icon: 'bulb' };
    document.getElementById('interest-edit-idx').value = index;
    document.getElementById('interest-title').value = s.title;
    document.getElementById('interest-desc').value = s.description || '';
    document.getElementById('interest-icon-preview').innerHTML = getIconSvg(s.icon);
    document.getElementById('interest-icon-val').value = s.icon || 'bulb';
    document.getElementById('interest-form-panel').style.display = 'block';
    refreshIcons(document.getElementById('interest-form-panel'));
}
function editInterest(i) { showInterestForm(i); }
function hideInterestForm() { document.getElementById('interest-form-panel').style.display = 'none'; }

async function saveInterest() {
    const idx = parseInt(document.getElementById('interest-edit-idx').value);
    const item = {
        title: document.getElementById('interest-title').value.trim(),
        description: document.getElementById('interest-desc').value.trim(),
        icon: document.getElementById('interest-icon-val').value
    };
    if (!item.title) return toast('Title required', 'error');
    if (idx >= 0) interests[idx] = item; else interests.push(item);
    try {
        await dbSet('interests', interests);
        renderInterests(interests);
        hideInterestForm();
        updateDashboard();
        toast('Interest saved', 'success');
    } catch (err) { toast(err.message, 'error'); }
}

async function deleteInterest(i) {
    if (!confirm('Delete?')) return;
    interests.splice(i, 1);
    await dbSet('interests', interests);
    renderInterests(interests);
    updateDashboard();
    toast('Deleted', 'success');
}

/* =========================================
   PROJECTS
   ========================================= */
let projects = [];

function renderProjects(data) {
    projects = Array.isArray(data) ? data : Object.values(data || {});
    const list = document.getElementById('projects-list');
    document.getElementById('projects-count').textContent = projects.length;
    if (projects.length === 0) {
        list.innerHTML = '<div class="empty-state"><div class="empty-icon">📦</div><h3>No projects</h3><p>Add your first portfolio project</p></div>';
        return;
    }
    list.innerHTML = projects.map((p, i) => `
        <div class="item-card" style="animation-delay:${i * 50}ms">
            <div style="width:48px;height:48px;border-radius:0.6rem;overflow:hidden;flex-shrink:0;background:rgba(255,255,255,0.04)">
                ${p.thumbnail_url ? `<img src="${sanitizeURL(p.thumbnail_url)}" style="width:100%;height:100%;object-fit:cover" alt="">` : '<div style="width:100%;height:100%;display:flex;align-items:center;justify-content:center;font-size:1.2rem">📦</div>'}
            </div>
            <div class="item-info">
                <div class="item-title">${escapeHTML(p.title)} ${p.featured ? '<span class="tag" style="margin-left:0.5rem">Featured</span>' : ''}</div>
                <div class="item-desc">${escapeHTML(p.category || '')} · ${(p.tech_stack || []).map(t => escapeHTML(t)).join(', ')}</div>
            </div>
            <div class="item-actions">
                <button class="btn btn-ghost btn-sm" onclick="editProject(${i})">Edit</button>
                <button class="btn btn-danger btn-sm" onclick="deleteProject(${i})">✕</button>
            </div>
        </div>
    `).join('');
}

function showProjectForm(index = -1) {
    const p = index >= 0 ? projects[index] : { title: '', description: '', category: '', url: '', thumbnail_url: '', tech_stack: [], featured: false };
    document.getElementById('proj-edit-idx').value = index;
    document.getElementById('proj-title').value = p.title;
    document.getElementById('proj-desc').value = p.description || '';
    document.getElementById('proj-category').value = p.category || '';
    document.getElementById('proj-url').value = p.url || '';
    document.getElementById('proj-thumb').value = p.thumbnail_url || '';
    document.getElementById('proj-tech').value = (p.tech_stack || []).join(', ');
    document.getElementById('proj-featured').checked = p.featured || false;
    document.getElementById('project-form-panel').style.display = 'block';
}
function editProject(i) { showProjectForm(i); }
function hideProjectForm() { document.getElementById('project-form-panel').style.display = 'none'; }

async function saveProject() {
    const idx = parseInt(document.getElementById('proj-edit-idx').value);
    const item = {
        id: idx >= 0 ? (projects[idx].id || Date.now()) : Date.now(),
        title: document.getElementById('proj-title').value.trim(),
        description: document.getElementById('proj-desc').value.trim(),
        category: document.getElementById('proj-category').value.trim(),
        url: document.getElementById('proj-url').value.trim(),
        thumbnail_url: document.getElementById('proj-thumb').value.trim(),
        tech_stack: document.getElementById('proj-tech').value.split(',').map(t => t.trim()).filter(Boolean),
        featured: document.getElementById('proj-featured').checked
    };
    if (!item.title) return toast('Title required', 'error');
    if (idx >= 0) projects[idx] = item; else projects.push(item);
    try {
        await dbSet('projects', projects);
        renderProjects(projects);
        hideProjectForm();
        updateDashboard();
        toast('Project saved', 'success');
    } catch (err) { toast(err.message, 'error'); }
}

async function deleteProject(i) {
    if (!confirm(`Delete "${projects[i].title}"?`)) return;
    projects.splice(i, 1);
    await dbSet('projects', projects);
    renderProjects(projects);
    updateDashboard();
    toast('Deleted', 'success');
}

/* =========================================
   BLOGS
   ========================================= */
let blogs = [];

function renderBlogs(data) {
    blogs = Array.isArray(data) ? data : Object.values(data || {});
    const list = document.getElementById('blogs-list');
    document.getElementById('blogs-count').textContent = blogs.length;
    if (blogs.length === 0) {
        list.innerHTML = '<div class="empty-state"><div class="empty-icon">📝</div><h3>No blog posts</h3><p>Write your first article</p></div>';
        return;
    }
    list.innerHTML = blogs.map((b, i) => `
        <div class="item-card" style="animation-delay:${i * 50}ms">
            <div class="item-icon">📝</div>
            <div class="item-info">
                <div class="item-title">${escapeHTML(b.title)}</div>
                <div class="item-desc">${escapeHTML(b.date || '')} · ${(b.tags || []).map(t => escapeHTML(t)).join(', ')}</div>
            </div>
            <div class="item-actions">
                <button class="btn btn-ghost btn-sm" onclick="editBlog(${i})">Edit</button>
                <button class="btn btn-danger btn-sm" onclick="deleteBlog(${i})">✕</button>
            </div>
        </div>
    `).join('');
}

function showBlogForm(index = -1) {
    const b = index >= 0 ? blogs[index] : { title: '', excerpt: '', content: '', date: '', thumbnail_url: '', tags: [] };
    document.getElementById('blog-edit-idx').value = index;
    document.getElementById('blog-title').value = b.title;
    document.getElementById('blog-excerpt').value = b.excerpt || '';
    document.getElementById('blog-content').value = b.content || '';
    document.getElementById('blog-date').value = b.date || new Date().toISOString().split('T')[0];
    document.getElementById('blog-thumb').value = b.thumbnail_url || '';
    document.getElementById('blog-tags').value = (b.tags || []).join(', ');
    document.getElementById('blog-form-panel').style.display = 'block';
}
function editBlog(i) { showBlogForm(i); }
function hideBlogForm() { document.getElementById('blog-form-panel').style.display = 'none'; }

async function saveBlog() {
    const idx = parseInt(document.getElementById('blog-edit-idx').value);
    const item = {
        id: idx >= 0 ? (blogs[idx].id || Date.now()) : Date.now(),
        title: document.getElementById('blog-title').value.trim(),
        excerpt: document.getElementById('blog-excerpt').value.trim(),
        content: document.getElementById('blog-content').value.trim(),
        date: document.getElementById('blog-date').value,
        thumbnail_url: document.getElementById('blog-thumb').value.trim(),
        tags: document.getElementById('blog-tags').value.split(',').map(t => t.trim()).filter(Boolean)
    };
    if (!item.title) return toast('Title required', 'error');
    if (idx >= 0) blogs[idx] = item; else blogs.push(item);
    try {
        await dbSet('blogs', blogs);
        renderBlogs(blogs);
        hideBlogForm();
        updateDashboard();
        toast('Blog post saved', 'success');
    } catch (err) { toast(err.message, 'error'); }
}

async function deleteBlog(i) {
    if (!confirm(`Delete "${blogs[i].title}"?`)) return;
    blogs.splice(i, 1);
    await dbSet('blogs', blogs);
    renderBlogs(blogs);
    updateDashboard();
    toast('Deleted', 'success');
}

/* =========================================
   Icon Picker
   ========================================= */
function getIconSvg(iconId) {
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

function openIconPicker(previewId, valueId) {
    const modal = document.getElementById('icon-picker-modal');
    const currentVal = document.getElementById(valueId).value;
    const grid = document.getElementById('icon-picker-grid');
    const search = document.getElementById('icon-search');
    search.value = '';

    function renderIcons(filter = '') {
        const filtered = filter ? ICON_LIBRARY.filter(i => i.label.toLowerCase().includes(filter.toLowerCase()) || i.id.includes(filter.toLowerCase())) : ICON_LIBRARY;
        grid.innerHTML = filtered.map(icon => `
            <div class="icon-option ${icon.id === currentVal ? 'selected' : ''}" onclick="pickIcon('${icon.id}','${previewId}','${valueId}')" title="${icon.label}">
                ${getIconSvg(icon.id)}
            </div>
        `).join('');
        refreshIcons(grid);
    }

    renderIcons();
    search.oninput = () => renderIcons(search.value);
    modal.classList.add('open');
}

function pickIcon(iconId, previewId, valueId) {
    document.getElementById(previewId).innerHTML = getIconSvg(iconId);
    document.getElementById(valueId).value = iconId;
    document.getElementById('icon-picker-modal').classList.remove('open');
    refreshIcons();
}

function closeIconPicker() {
    document.getElementById('icon-picker-modal').classList.remove('open');
}

/* =========================================
   Seed Initial Data
   ========================================= */
async function seedInitialData() {
    if (!confirm('This will populate the database with default website data. Continue?')) return;
    try {
        await Promise.all([
            dbSet('profile', {
                name: 'Prapan Biswas',
                tagline: 'I craft digital experiences that blend code, design & engineering — turning ideas into reality.',
                location: 'Khulna, Bangladesh',
                education: 'Civil Engineering Student',
                aboutText: "I'm Prapan Biswas — a multi-disciplinary creator from Khulna, Bangladesh. I build websites, design interfaces, develop apps, and study civil engineering — all driven by a deep curiosity to understand how things work.\n\nMy approach combines technical precision with creative thinking. Whether I'm writing code, designing a user experience, or working on structural plans, I focus on craft, clarity, and impact.",
                profileImageUrl: 'attached_assets/prapan-biswas-profile.jpg',
                availableStatus: 'Available for projects',
                birthday: '2006-02-15'
            }),
            dbSet('socialLinks', [
                { platform: 'GitHub', url: 'https://github.com/prapanbiswas', icon: 'code' },
                { platform: 'Instagram', url: 'https://instagram.com/prapanbiswas', icon: 'camera' },
                { platform: 'Facebook', url: 'https://facebook.com/prapanbiswas', icon: 'users' }
            ]),
            dbSet('skills', [
                { title: 'Web Development', description: 'Clean, responsive websites with modern frameworks.', icon: 'code', color: '#6366f1' },
                { title: 'App Development', description: 'Mobile and web apps built with Flutter.', icon: 'mobile', color: '#a855f7' },
                { title: 'UI/UX Design', description: 'User-centered interfaces with intuitive navigation.', icon: 'design', color: '#ec4899' },
                { title: 'Graphic Design', description: 'Logos, branding, social media visuals.', icon: 'paintbrush', color: '#f59e0b' },
                { title: 'Civil Engineering', description: 'Structural analysis and construction planning.', icon: 'building', color: '#10b981' },
                { title: 'Backend & APIs', description: 'Server-side logic, REST APIs, databases.', icon: 'server', color: '#06b6d4' }
            ]),
            dbSet('interests', [
                { title: 'Continuous Learning', description: 'Always exploring new frameworks and technologies.', icon: 'book' },
                { title: 'Technology & Innovation', description: 'Fascinated by how technology shapes our world.', icon: 'rocket' },
                { title: 'Creative Exploration', description: 'Finding beauty in the intersection of art and code.', icon: 'sparkle' }
            ]),
            dbSet('projects', [
                { id: 1, title: 'Cloud Infrastructure Platform', description: 'A modern cloud-native infrastructure management platform.', category: 'Web Application', url: 'https://example.com/project1', thumbnail_url: 'attached_assets/file_0000000087f072078bb72ddd1c8138a2_1763603473698.png', tech_stack: ['React', 'Node.js', 'Docker', 'Kubernetes'], featured: true }
            ]),
            dbSet('blogs', [])
        ]);
        toast('Database seeded with default data!', 'success');
        loadAllData();
    } catch (err) { toast(err.message, 'error'); }
}

/* =========================================
   Toast
   ========================================= */
function toast(msg, type = 'success') {
    const c = document.getElementById('toast-container');
    const t = document.createElement('div');
    t.className = `toast toast-${type}`;
    t.textContent = msg;
    c.appendChild(t);
    setTimeout(() => {
        t.style.opacity = '0';
        t.style.transform = 'translateX(20px)';
        t.style.transition = 'all 0.3s ease';
        setTimeout(() => t.remove(), 300);
    }, 3000);
}

/* =========================================
   Init
   ========================================= */
document.addEventListener('DOMContentLoaded', () => {
    initFirebase();

    // Render Lucide icons in sidebar
    refreshIcons();

    // Auth listener
    auth.onAuthStateChanged(user => {
        if (user) {
            document.getElementById('auth-screen').style.display = 'none';
            document.getElementById('app-screen').style.display = 'block';
            document.getElementById('user-email').textContent = user.email;
            refreshIcons();
            loadAllData();
        }
    });

    // Sidebar nav — event delegation
    document.querySelectorAll('.sidebar a[data-section]').forEach(a => {
        a.addEventListener('click', (e) => {
            e.preventDefault();
            navigateTo(a.dataset.section);
        });
    });

    // Mobile toggle
    const mobileToggle = document.getElementById('mobile-toggle');
    const mobileOverlay = document.getElementById('mobile-overlay');
    if (mobileToggle) {
        mobileToggle.addEventListener('click', () => {
            document.querySelector('.sidebar').classList.toggle('open');
            mobileOverlay?.classList.toggle('open');
        });
    }
    if (mobileOverlay) {
        mobileOverlay.addEventListener('click', () => {
            document.querySelector('.sidebar').classList.remove('open');
            mobileOverlay.classList.remove('open');
        });
    }

    // Navigate to dashboard by default
    navigateTo('dashboard');
});
