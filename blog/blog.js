/* =========================================
   Blog Page — Page-Specific JavaScript
   =========================================
   Fetches blog posts from Firebase and renders
   them into the blog-container.
   ========================================= */

async function loadBlogs() {
    // Initialize App Check before fetching
    if (typeof initPublicFirebase === 'function') {
        initPublicFirebase();
    }

    const container = document.getElementById('blog-container');
    try {
        const data = await fbGet('blogs');
        const blogs = data ? (Array.isArray(data) ? data : Object.values(data)) : [];

        if (blogs.length === 0) {
            container.innerHTML = `
                <div class="text-center p-16">
                    <div class="text-5xl mb-4">📝</div>
                    <h3 class="text-xl font-bold text-slate-300 mb-2">No posts yet</h3>
                    <p class="text-slate-500">Check back soon for new content!</p>
                </div>`;
            return;
        }

        const sorted = blogs.sort((a, b) => new Date(b.date) - new Date(a.date));
        container.innerHTML = sorted.map((post, i) => {
            const safeTitle = escapeHTML(post.title);
            const safeExcerpt = escapeHTML(post.excerpt || '');
            const safeDate = escapeHTML(post.date || '');
            const safeThumbnail = post.thumbnail_url ? sanitizeURL(post.thumbnail_url) : '';
            const safeTags = (post.tags || []).map(t => escapeHTML(t));
            return `
                <article class="glass-card rounded-2xl overflow-hidden hover:scale-[1.01] transition-all duration-300 group"
                    style="opacity:0;transform:translateY(20px);transition:opacity 0.6s ease,transform 0.6s ease;transition-delay:${i * 100}ms">
                    <div class="flex flex-col md:flex-row">
                        ${safeThumbnail ? `
                            <div class="md:w-64 h-48 md:h-auto flex-shrink-0 overflow-hidden">
                                <img src="${safeThumbnail}" alt="${safeTitle}" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500">
                            </div>` : ''}
                        <div class="p-6 flex-1">
                            <div class="flex flex-wrap gap-2 mb-3">
                                ${safeTags.map(t => `<span class="text-xs px-2 py-0.5 rounded-full bg-indigo-500/15 text-indigo-300">${t}</span>`).join('')}
                            </div>
                            <h2 class="text-xl font-bold text-white mb-2 group-hover:text-indigo-400 transition-colors">${safeTitle}</h2>
                            <p class="text-sm text-slate-400 mb-3 line-clamp-2">${safeExcerpt}</p>
                            <time class="text-xs text-slate-500">${safeDate}</time>
                        </div>
                    </div>
                </article>
            `;
        }).join('');

        // Animate in
        requestAnimationFrame(() => {
            requestAnimationFrame(() => {
                container.querySelectorAll('article').forEach(el => {
                    el.style.opacity = '1';
                    el.style.transform = 'translateY(0)';
                });
            });
        });
    } catch (err) {
        container.innerHTML = '<div class="text-center p-12 text-slate-500"><p>Unable to load posts.</p></div>';
    }
}

document.addEventListener('DOMContentLoaded', loadBlogs);
