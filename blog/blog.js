/* =========================================
   Blog Page — Page-Specific JavaScript
   =========================================
   Persistent real-time listener for blog posts.
   Uses onValue() — no polling, instant updates.
   ========================================= */

/**
 * Generate skeleton article placeholders for the blog list.
 */
function generateBlogSkeletons(count, container) {
    if (!container) return;
    container.innerHTML = '';
    for (let i = 0; i < count; i++) {
        const article = document.createElement('div');
        article.className = 'skel glass-card rounded-2xl overflow-hidden';
        article.innerHTML = `
            <div class="flex flex-col md:flex-row">
                <div class="md:w-64 h-48 md:h-auto flex-shrink-0 bg-white/[0.02]"></div>
                <div class="p-6 flex-1 space-y-3">
                    <div class="flex gap-2">
                        <div class="skel skel-tag"></div>
                        <div class="skel skel-tag w-16"></div>
                    </div>
                    <div class="skel skel-text w-3/4"></div>
                    <div class="skel skel-text-sm w-full"></div>
                    <div class="skel skel-text-sm w-5/6"></div>
                    <div class="skel skel-text-sm w-20 mt-2"></div>
                </div>
            </div>
        `;
        container.appendChild(article);
    }
}

function initializeBlogPage() {
    const container = document.getElementById('blog-container');
    if (!container) return;

    // Show skeleton articles on initial load
    generateBlogSkeletons(3, container);

    // Attach persistent listener
    fbListen('blogs', (data) => {
        const blogs = data ? (Array.isArray(data) ? data : Object.values(data)) : [];

        if (blogs.length === 0) {
            container.innerHTML = `
                <div class="text-center p-16">
                    <div class="text-5xl mb-4"><i data-lucide="file-text" class="w-12 h-12 mx-auto text-slate-600"></i></div>
                    <h3 class="text-xl font-bold text-slate-300 mb-2">No posts yet</h3>
                    <p class="text-slate-500">Check back soon for new content!</p>
                </div>`;
            ensureLucide().then(() => lucide.createIcons());
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
    }, container);
}

document.addEventListener('DOMContentLoaded', initializeBlogPage);
