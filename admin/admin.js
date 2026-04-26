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
    // ── Social Media & Platforms ──
    { id: 'facebook', label: 'Facebook', svg: '📘', category: 'social' },
    { id: 'instagram', label: 'Instagram', svg: '📷', category: 'social' },
    { id: 'github', label: 'GitHub', svg: '🐙', category: 'social' },
    { id: 'youtube', label: 'YouTube', svg: '▶️', category: 'social' },
    { id: 'tiktok', label: 'TikTok', svg: '🎵', category: 'social' },
    { id: 'twitter', label: 'Twitter', svg: '🐦', category: 'social' },
    { id: 'x', label: 'X (Twitter)', svg: '✖️', category: 'social' },
    { id: 'linkedin', label: 'LinkedIn', svg: '💼', category: 'social' },
    { id: 'whatsapp', label: 'WhatsApp', svg: '📞', category: 'social' },
    { id: 'telegram', label: 'Telegram', svg: '✈️', category: 'social' },
    { id: 'discord', label: 'Discord', svg: '🎮', category: 'social' },
    { id: 'reddit', label: 'Reddit', svg: '🤖', category: 'social' },
    { id: 'snapchat', label: 'Snapchat', svg: '👻', category: 'social' },
    { id: 'pinterest', label: 'Pinterest', svg: '📌', category: 'social' },
    { id: 'spotify', label: 'Spotify', svg: '🎧', category: 'social' },
    { id: 'dribbble', label: 'Dribbble', svg: '🏀', category: 'social' },
    { id: 'behance', label: 'Behance', svg: '🅱️', category: 'social' },
    { id: 'medium', label: 'Medium', svg: '📝', category: 'social' },
    { id: 'threads', label: 'Threads', svg: '🧵', category: 'social' },
    { id: 'stackoverflow', label: 'Stack Overflow', svg: '📚', category: 'social' },
    { id: 'twitch', label: 'Twitch', svg: '🎬', category: 'social' },
    { id: 'email', label: 'Email', svg: '📧', category: 'social' },
    { id: 'phone', label: 'Phone', svg: '📱', category: 'social' },
    { id: 'website', label: 'Website', svg: '🌐', category: 'social' },
    { id: 'figma', label: 'Figma', svg: '🎨', category: 'social' },
    { id: 'codepen', label: 'CodePen', svg: '🖊️', category: 'social' },
    { id: 'devto', label: 'Dev.to', svg: '👩‍💻', category: 'social' },
    { id: 'hashnode', label: 'Hashnode', svg: '#️⃣', category: 'social' },
    { id: 'patreon', label: 'Patreon', svg: '🎭', category: 'social' },
    { id: 'buymeacoffee', label: 'Buy Me a Coffee', svg: '☕', category: 'social' },
    { id: 'mastodon', label: 'Mastodon', svg: '🐘', category: 'social' },
    { id: 'bluesky', label: 'Bluesky', svg: '🦋', category: 'social' },

    // ── General / Tech ──
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
    { id: 'mail', label: 'Mail', svg: '📧' },
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
    ['social-list', 'skills-list', 'interests-list', 'projects-list', 'blogs-list', 'subscribers-list'].forEach(id => showListLoading(id, 2));

    try {
        const [profile, sl, sk, int, proj, bl, tokens] = await Promise.all([
            dbGet('profile'),
            dbGet('socialLinks'),
            dbGet('skills'),
            dbGet('interests'),
            dbGet('projects'),
            dbGet('blogs'),
            dbGet('fcm_tokens')
        ]);
        renderProfile(profile || {});
        renderSocialLinks(sl || []);
        renderSkills(sk || []);
        renderInterests(int || []);
        renderProjects(proj || []);
        renderBlogs(bl || []);
        renderSubscribers(tokens || {});
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
    document.getElementById('pf-email').value = data.email || '';
    // Also populate the dashboard quick-email input
    const dashEmail = document.getElementById('dash-email');
    if (dashEmail) dashEmail.value = data.email || '';
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
        email: document.getElementById('pf-email').value.trim(),
    };
    try {
        await dbSet('profile', data);
        // Sync dashboard email input
        const dashEmail = document.getElementById('dash-email');
        if (dashEmail) dashEmail.value = data.email;
        toast('Profile saved', 'success');
    } catch (err) { toast(err.message, 'error'); }
}

async function quickSaveEmail() {
    const emailInput = document.getElementById('dash-email');
    const email = emailInput ? emailInput.value.trim() : '';
    if (!email) return toast('Please enter an email address', 'error');
    // Basic email validation
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return toast('Please enter a valid email', 'error');
    try {
        // Use update() to only modify the email field without overwriting other profile data
        await db.ref('profile').update({ email: email });
        // Sync the profile section email input too
        const pfEmail = document.getElementById('pf-email');
        if (pfEmail) pfEmail.value = email;
        toast('Email updated successfully', 'success');
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

const PLATFORM_ICON_MAP = {
    facebook: 'facebook', fb: 'facebook',
    instagram: 'instagram', ig: 'instagram', insta: 'instagram',
    github: 'github', gh: 'github',
    youtube: 'youtube', yt: 'youtube',
    tiktok: 'tiktok', 'tik tok': 'tiktok',
    twitter: 'twitter', tweet: 'twitter',
    'x': 'x', 'x.com': 'x',
    linkedin: 'linkedin',
    whatsapp: 'whatsapp',
    telegram: 'telegram', tg: 'telegram',
    discord: 'discord',
    reddit: 'reddit',
    snapchat: 'snapchat', snap: 'snapchat',
    pinterest: 'pinterest',
    spotify: 'spotify',
    dribbble: 'dribbble', dribble: 'dribbble',
    behance: 'behance',
    medium: 'medium',
    threads: 'threads',
    stackoverflow: 'stackoverflow', 'stack overflow': 'stackoverflow',
    twitch: 'twitch',
    email: 'email', 'e-mail': 'email', mail: 'email',
    phone: 'phone', tel: 'phone',
    website: 'website', web: 'website', site: 'website',
    figma: 'figma',
    codepen: 'codepen',
    'dev.to': 'devto', devto: 'devto',
    hashnode: 'hashnode',
    patreon: 'patreon',
    'buy me a coffee': 'buymeacoffee', buymeacoffee: 'buymeacoffee', kofi: 'buymeacoffee',
    mastodon: 'mastodon',
    bluesky: 'bluesky',
};

function showSocialForm(index = -1) {
    const s = index >= 0 ? socialLinks[index] : { platform: '', url: '', icon: 'globe' };
    document.getElementById('social-edit-idx').value = index;
    document.getElementById('social-platform').value = s.platform;
    document.getElementById('social-url').value = s.url;
    document.getElementById('social-icon-preview').innerHTML = getIconSvg(s.icon);
    document.getElementById('social-icon-val').value = s.icon || 'globe';
    document.getElementById('social-form-panel').style.display = 'block';
    refreshIcons(document.getElementById('social-form-panel'));

    // Auto-detect icon from platform name
    const platformInput = document.getElementById('social-platform');
    platformInput.oninput = () => {
        const key = platformInput.value.trim().toLowerCase();
        const match = PLATFORM_ICON_MAP[key];
        if (match) {
            document.getElementById('social-icon-val').value = match;
            document.getElementById('social-icon-preview').innerHTML = getIconSvg(match);
            refreshIcons(document.getElementById('social-form-panel'));
        }
    };
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
   SUBSCRIBERS (FCM Tokens)
   ========================================= */
let subscribers = {};

function renderSubscribers(data) {
    subscribers = data || {};
    const entries = Object.entries(subscribers);
    const list = document.getElementById('subscribers-list');
    const countEl = document.getElementById('subscribers-count');
    if (countEl) countEl.textContent = entries.length;

    if (entries.length === 0) {
        list.innerHTML = '<div class="empty-state"><div class="empty-icon">🔔</div><h3>No subscribers yet</h3><p>Once visitors allow notifications, they\'ll appear here</p></div>';
        return;
    }

    list.innerHTML = entries.map(([key, sub], i) => {
        const ua = sub.userAgent || '';
        let browser = 'Unknown';
        if (ua.includes('Chrome')) browser = 'Chrome';
        else if (ua.includes('Firefox')) browser = 'Firefox';
        else if (ua.includes('Safari')) browser = 'Safari';
        else if (ua.includes('Edge')) browser = 'Edge';

        const platform = sub.platform || 'Unknown';
        const date = sub.createdAt ? new Date(sub.createdAt).toLocaleDateString() : 'Unknown';
        const tokenShort = sub.token ? sub.token.substring(0, 24) + '...' : 'N/A';

        return `
            <div class="item-card" style="animation-delay:${i * 50}ms">
                <div class="item-icon">🔔</div>
                <div class="item-info">
                    <div class="item-title">${escapeHTML(browser)} on ${escapeHTML(platform)}</div>
                    <div class="item-desc">Subscribed: ${escapeHTML(date)} · Token: ${escapeHTML(tokenShort)}</div>
                </div>
                <div class="item-actions">
                    <button class="btn btn-danger btn-sm" onclick="deleteSubscriber('${escapeHTML(key)}')">✕</button>
                </div>
            </div>
        `;
    }).join('');
}

async function deleteSubscriber(key) {
    if (!confirm('Remove this subscriber?')) return;
    try {
        await db.ref('fcm_tokens/' + key).remove();
        delete subscribers[key];
        renderSubscribers(subscribers);
        updateDashboard();
        toast('Subscriber removed', 'success');
    } catch (err) { toast(err.message, 'error'); }
}

/* =========================================
   Icon Picker
   ========================================= */

const ADMIN_CUSTOM_SVGS = {
    github: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"></path><path d="M9 18c-4.51 2-5-2-7-2"></path></svg>',
    youtube: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M2.5 17a24.12 24.12 0 0 1 0-10 2 2 0 0 1 1.4-1.4 49.56 49.56 0 0 1 16.2 0A2 2 0 0 1 21.5 7a24.12 24.12 0 0 1 0 10 2 2 0 0 1-1.4 1.4 49.55 49.55 0 0 1-16.2 0A2 2 0 0 1 2.5 17"></path><path d="m10 15 5-3-5-3z"></path></svg>',
    facebook: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path></svg>',
    email: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="20" height="16" x="2" y="4" rx="2"></rect><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"></path></svg>',
    whatsapp: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></svg>',
    instagram: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>',
    twitch: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 2H3v16h5v4l4-4h5l4-4V2zm-10 9V7m5 4V7"></path></svg>',
    tiktok: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5"></path></svg>',
    twitter: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path></svg>',
    x: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 4l11.733 16h4.267l-11.733 -16z"></path><path d="M4 20l6.768 -6.768m2.46 -2.46l6.772 -6.772"></path></svg>',
    linkedin: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect width="4" height="12" x="2" y="9"></rect><circle cx="4" cy="4" r="2"></circle></svg>',
    snapchat: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2c-2.5 0-4.5 1.5-5 4l-.5 3c-.3 0-1-.2-1.5 0s-.5.8 0 1c.5.2 1 .3 1 .3-.3 1-1.5 2.5-3 3 0 0-.5.5 0 1s2 .5 2.5.7c.2.6-.2 1.5.5 2s2-.5 3.5-.5 2.5 1 4 .5 1-1.5 1-1.5c.5-.2 2-.2 2.5-.7s0-1 0-1c-1.5-.5-2.7-2-3-3 0 0 .5-.1 1-.3s.5-.5 0-1-1.2 0-1.5 0l-.5-3c-.5-2.5-2.5-4-5-4z"></path></svg>',
    pinterest: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="12" y1="17" x2="10" y2="22"></line><path d="M18.5 8.5a6.5 6.5 0 1 0-3 12.2"></path><circle cx="12" cy="11" r="6.5"></circle></svg>',
    telegram: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21.198 2.433a2.242 2.242 0 0 0-1.022.215l-16.5 7.5a1.5 1.5 0 0 0 .108 2.775l4.216 1.406 1.5 4.875a1.5 1.5 0 0 0 2.55.6l1.95-2.1 3.75 2.85a1.5 1.5 0 0 0 2.35-.9l3-13.5a2.25 2.25 0 0 0-1.902-3.72z"></path><path d="m9.5 14.1 7-8.1"></path></svg>',
    discord: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M8.5 14.5A1.5 1.5 0 1 0 10 13a1.5 1.5 0 0 0-1.5 1.5z"></path><path d="M14 14.5a1.5 1.5 0 1 0 1.5-1.5 1.5 1.5 0 0 0-1.5 1.5z"></path><path d="M8.56 7.68C10.08 7.19 11.2 7 12 7s1.92.19 3.44.68"></path><path d="M15.44 20.32C13.92 20.81 12.8 21 12 21s-1.92-.19-3.44-.68"></path><path d="M18.8 10.2c.7 1.4 1.2 3.2 1.2 5.3 0 0-1.6 2.7-5.5 3a10.5 10.5 0 0 1-.8-1.3 7 7 0 0 0 2.3-1.2s-.8.6-3 1c-2.2.4-3-.1-5-1a7 7 0 0 0 2.3 1.2A10.5 10.5 0 0 1 9.5 18.5C5.6 18.2 4 15.5 4 15.5c0-2.1.5-3.9 1.2-5.3C6.8 8.7 8.7 7.8 8.7 7.8l.3.4"></path><path d="M15 8.2l.3-.4s1.9.9 3.5 2.4"></path></svg>',
    reddit: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="14" r="7"></circle><circle cx="9" cy="13" r="1"></circle><circle cx="15" cy="13" r="1"></circle><path d="M9 17c1 1 2 1.5 3 1.5s2-.5 3-1.5"></path><path d="M19.5 9.5a2 2 0 1 0-1.8 1"></path><path d="M14 3l1 2.5 3 .5"></path><circle cx="12" cy="7" r="0.5"></circle></svg>',
    threads: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22c-4.97 0-7.5-3.13-7.5-8s2.53-8 7.5-8c3.37 0 5.7 1.67 6.7 4.5"></path><path d="M15.5 12a3.5 3.5 0 1 1-7 0c0-1.93 1.57-3.5 3.5-3.5 2.47 0 4 1.4 4 4.5 0 4-2.03 7-4 7"></path></svg>',
    spotify: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><path d="M8 15s1.5-.5 4-.5 4 .5 4 .5"></path><path d="M7 12s2-1 5-1 5 1 5 1"></path><path d="M6.5 9s2.5-1.5 5.5-1.5S18 9 18 9"></path></svg>',
    dribbble: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><path d="M19.13 5.09C15.22 9.14 10 10.44 2.25 10.94"></path><path d="M21.75 12.84c-6.62-1.41-12.14 1-16.38 6.32"></path><path d="M8.56 2.75c4.37 6 6 12 6.5 18.5"></path></svg>',
    behance: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M1 6h6.8a3.2 3.2 0 0 1 0 6.4H1V6z"></path><path d="M1 12.4h7.3a3.3 3.3 0 0 1 0 6.6H1v-6.6z"></path><path d="M14 17.6a3.8 3.8 0 0 0 7.2-1.6h-7.2"></path><path d="M14 12.6h7.2a3.8 3.8 0 0 0-7.2-2.6v2.6z"></path><line x1="15" y1="5" x2="21" y2="5"></line></svg>',
    medium: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 4l4.5 12L13 4"></path><path d="M13 4l4.5 12L22 4"></path><line x1="2" y1="20" x2="22" y2="20"></line></svg>',
    stackoverflow: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 20h14"></path><path d="M18 20V10"></path><path d="M4 20V14"></path><path d="M6 17h10"></path><path d="M6.5 14l10-.5"></path><path d="M7.5 11l9.5-2"></path><path d="M9.5 8.5L18 4"></path></svg>',
    figma: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 5.5A3.5 3.5 0 0 1 8.5 2H12v7H8.5A3.5 3.5 0 0 1 5 5.5z"></path><path d="M12 2h3.5a3.5 3.5 0 1 1 0 7H12V2z"></path><path d="M12 12.5a3.5 3.5 0 1 1 7 0 3.5 3.5 0 1 1-7 0z"></path><path d="M5 19.5A3.5 3.5 0 0 1 8.5 16H12v3.5a3.5 3.5 0 1 1-7 0z"></path><path d="M5 12.5A3.5 3.5 0 0 1 8.5 9H12v7H8.5A3.5 3.5 0 0 1 5 12.5z"></path></svg>',
    codepen: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="12 2 22 8.5 22 15.5 12 22 2 15.5 2 8.5 12 2"></polygon><line x1="12" y1="22" x2="12" y2="15.5"></line><polyline points="22 8.5 12 15.5 2 8.5"></polyline><polyline points="2 15.5 12 8.5 22 15.5"></polyline><line x1="12" y1="2" x2="12" y2="8.5"></line></svg>',
    devto: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="4" width="20" height="16" rx="2"></rect><path d="M6 8h.01M6 12h.01M6 16h.01M10 8v8M14 8v8l4-4-4-4"></path></svg>',
    hashnode: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><path d="M12 6v12"></path><path d="M6 12h12"></path></svg>',
    patreon: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="2" width="4" height="20"></rect><circle cx="15" cy="9" r="7"></circle></svg>',
    buymeacoffee: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 8h1a4 4 0 0 1 0 8h-1"></path><path d="M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8z"></path><line x1="6" y1="1" x2="6" y2="4"></line><line x1="10" y1="1" x2="10" y2="4"></line><line x1="14" y1="1" x2="14" y2="4"></line></svg>',
    mastodon: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21.58 13.913c-.29 1.469-2.592 3.069-5.24 3.38-1.38.163-2.74.322-4.19.254-2.37-.11-4.24-.577-4.24-.577 0 .236.015.46.043.677.312 2.373 2.349 2.515 4.281 2.582 1.949.067 3.685-.482 3.685-.482l.08 1.768s-1.363.732-3.793.866c-1.34.074-3.003-.034-4.94-.536C3.34 20.83 2.654 17.17 2.53 13.458c-.038-1.102-.015-2.14-.015-3.009 0-3.79 2.483-4.899 2.483-4.899 1.252-.575 3.399-.815 5.626-.834h.055c2.226.019 4.375.26 5.626.834 0 0 2.483 1.109 2.483 4.899 0 0 .031 2.796-.808 4.464z"></path><path d="M17.86 8.35v4.968h-1.97V8.505c0-1.017-.428-1.534-1.283-1.534-.946 0-1.42.613-1.42 1.826V11.5h-1.96V8.797c0-1.213-.474-1.826-1.42-1.826-.855 0-1.283.517-1.283 1.534v4.813H6.554V8.35c0-1.015.258-1.822.777-2.42.534-.598 1.233-.905 2.1-.905 1.002 0 1.762.385 2.268 1.155l.488.82.49-.82c.505-.77 1.265-1.155 2.268-1.155.866 0 1.565.307 2.1.905.518.598.777 1.405.777 2.42z"></path></svg>',
    bluesky: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 4c-2.5 2.5-5 5.5-5 8.5a5 5 0 0 0 5 5 5 5 0 0 0 5-5c0-3-2.5-6-5-8.5z"></path><path d="M7 20.5c0-1.5 2-2.5 5-2.5s5 1 5 2.5"></path></svg>',
    website: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20"></path><path d="M2 12h20"></path></svg>',
    phone: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></svg>',
};

function getIconSvg(iconId) {
    if (!iconId) return '';
    // Check if it's a custom SVG first (like social media icons)
    const customKey = iconId.toLowerCase();
    if (ADMIN_CUSTOM_SVGS[customKey]) {
        return ADMIN_CUSTOM_SVGS[customKey];
    }
    
    // Otherwise fallback to Lucide map
    const map = {
        mobile: 'smartphone', design: 'palette', photo: 'camera', gear: 'settings',
        lightning: 'zap', chart: 'bar-chart', paintbrush: 'brush', chip: 'cpu',
        robot: 'bot', game: 'gamepad-2', graduation: 'graduation-cap', fire: 'flame',
        sparkle: 'sparkles', bulb: 'lightbulb', chat: 'message-square', pin: 'map-pin',
        plant: 'leaf', tree: 'tree-deciduous', math: 'calculator', diamond: 'gem',
        money: 'coins', gym: 'dumbbell', run: 'activity', thumbsup: 'thumbs-up',
        confetti: 'party-popper', speech: 'mic', earth: 'globe',
        // Fallbacks for any social media that might use native lucide
        email: 'mail', phone: 'phone', website: 'globe',
        buymeacoffee: 'coffee', devto: 'code-2', hashnode: 'hash'
    };
    const validId = map[iconId] || iconId;
    return `<i data-lucide="${validId}"></i>`;
}

let _iconPickerState = { previewId: '', valueId: '', category: 'all' };

function openIconPicker(previewId, valueId) {
    const modal = document.getElementById('icon-picker-modal');
    const currentVal = document.getElementById(valueId).value;
    const grid = document.getElementById('icon-picker-grid');
    const search = document.getElementById('icon-search');
    search.value = '';
    _iconPickerState = { previewId, valueId, category: 'all' };

    // Reset category tabs
    document.querySelectorAll('.icon-cat-btn').forEach(b => b.classList.remove('active'));
    document.querySelector('.icon-cat-btn[data-cat="all"]')?.classList.add('active');

    function renderIcons(filter = '', category = 'all') {
        let filtered = ICON_LIBRARY;
        if (category === 'social') filtered = filtered.filter(i => i.category === 'social');
        else if (category === 'general') filtered = filtered.filter(i => !i.category || i.category !== 'social');
        if (filter) filtered = filtered.filter(i => i.label.toLowerCase().includes(filter.toLowerCase()) || i.id.includes(filter.toLowerCase()));
        grid.innerHTML = filtered.map(icon => `
            <div class="icon-option ${icon.id === currentVal ? 'selected' : ''}" onclick="pickIcon('${icon.id}','${previewId}','${valueId}')" title="${icon.label}">
                ${getIconSvg(icon.id)}
            </div>
        `).join('');
        refreshIcons(grid);
    }

    renderIcons();
    search.oninput = () => renderIcons(search.value, _iconPickerState.category);
    modal.classList.add('open');
}

function filterIconCategory(category) {
    _iconPickerState.category = category;
    document.querySelectorAll('.icon-cat-btn').forEach(b => b.classList.remove('active'));
    document.querySelector(`.icon-cat-btn[data-cat="${category}"]`)?.classList.add('active');
    // Re-render with current search + new category
    const search = document.getElementById('icon-search').value;
    const grid = document.getElementById('icon-picker-grid');
    const currentVal = document.getElementById(_iconPickerState.valueId).value;
    let filtered = ICON_LIBRARY;
    if (category === 'social') filtered = filtered.filter(i => i.category === 'social');
    else if (category === 'general') filtered = filtered.filter(i => !i.category || i.category !== 'social');
    if (search) filtered = filtered.filter(i => i.label.toLowerCase().includes(search.toLowerCase()) || i.id.includes(search.toLowerCase()));
    grid.innerHTML = filtered.map(icon => `
        <div class="icon-option ${icon.id === currentVal ? 'selected' : ''}" onclick="pickIcon('${icon.id}','${_iconPickerState.previewId}','${_iconPickerState.valueId}')" title="${icon.label}">
            ${getIconSvg(icon.id)}
        </div>
    `).join('');
    refreshIcons(grid);
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
                birthday: '2006-02-15',
                email: 'prapanbiswas@gmail.com'
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
