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

function hideLoader() {
    const loader = document.getElementById('loader');
    if (loader) {
        setTimeout(() => {
            loader.classList.add('hidden');
            setTimeout(() => {
                loader.style.display = 'none';
            }, 500);
        }, 1000);
    }
}

function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.classList.add('animate-in');
                }, index * 100);
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    const skillCards = document.querySelectorAll('.skill-card');
    skillCards.forEach(card => observer.observe(card));

    const interestItems = document.querySelectorAll('.interest-item');
    interestItems.forEach(item => observer.observe(item));
}

function add3DTiltEffect() {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const isTouchDevice = window.matchMedia('(pointer: coarse)').matches;
    
    if (prefersReducedMotion || isTouchDevice) {
        return;
    }
    
    const cards = document.querySelectorAll('.skill-card');
    
    cards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const rotateX = (y - centerY) / 10;
            const rotateY = (centerX - x) / 10;
            
            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-12px) scale(1.05)`;
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = '';
        });
    });
}

function addSocialLinkAnimations() {
    const socialLinks = document.querySelectorAll('.social-link, .contact-link');
    
    socialLinks.forEach(link => {
        link.addEventListener('mouseenter', function(e) {
            this.style.transform = 'translateY(-5px) scale(1.1)';
        });
        
        link.addEventListener('mouseleave', function() {
            this.style.transform = '';
        });
    });
}

function smoothScrollBehavior() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

function applyInitialDarkMode() {
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const savedTheme = localStorage.getItem('theme');
    
    if (savedTheme === 'dark' || (!savedTheme && prefersDark)) {
        document.documentElement.classList.add('dark-mode');
    }
}

function initDarkMode() {
    const themeToggle = document.getElementById('theme-toggle');
    const root = document.documentElement;
    
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const savedTheme = localStorage.getItem('theme');
    
    if (savedTheme === 'dark' || (!savedTheme && prefersDark)) {
        root.classList.add('dark-mode');
    }
    
    themeToggle.addEventListener('click', () => {
        root.classList.toggle('dark-mode');
        const isDark = root.classList.contains('dark-mode');
        localStorage.setItem('theme', isDark ? 'dark' : 'light');
        
        themeToggle.style.transform = 'scale(1.3) rotate(360deg)';
        setTimeout(() => {
            themeToggle.style.transform = '';
        }, 400);
    });
    
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
        if (!localStorage.getItem('theme')) {
            if (e.matches) {
                root.classList.add('dark-mode');
            } else {
                root.classList.remove('dark-mode');
            }
        }
    });
}

async function fetchBlogPosts() {
    const blogContainer = document.getElementById('blog-container');
    
    try {
        const response = await fetch('blog-data.json');
        
        if (!response.ok) {
            throw new Error('Failed to fetch blog posts');
        }
        
        const posts = await response.json();
        
        blogContainer.innerHTML = '';
        
        posts.forEach((post, index) => {
            const blogCard = createBlogCard(post, index);
            blogContainer.appendChild(blogCard);
        });
    } catch (error) {
        console.error('Error fetching blog posts:', error);
        blogContainer.innerHTML = `
            <div class="blog-loading">
                <p>Unable to load blog posts. Please try again later.</p>
            </div>
        `;
    }
}

function createBlogCard(post, index) {
    const card = document.createElement('a');
    card.href = `blog-posts/${post.filename}`;
    card.className = 'blog-card';
    card.style.animationDelay = `${index * 0.1}s`;
    
    const formattedDate = formatDate(post.date);
    
    card.innerHTML = `
        <img src="${post.thumbnail_url}" alt="${post.title}" class="blog-card-image" loading="lazy">
        <div class="blog-card-content">
            <span class="blog-card-category">${post.category}</span>
            <h4 class="blog-card-title">${post.title}</h4>
            <div class="blog-card-date">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
                    <line x1="16" y1="2" x2="16" y2="6"/>
                    <line x1="8" y1="2" x2="8" y2="6"/>
                    <line x1="3" y1="10" x2="21" y2="10"/>
                </svg>
                ${formattedDate}
            </div>
            <p class="blog-card-summary">${post.summary}</p>
            <span class="blog-card-read-more">
                Read More
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <line x1="5" y1="12" x2="19" y2="12"/>
                    <polyline points="12 5 19 12 12 19"/>
                </svg>
            </span>
        </div>
    `;
    
    return card;
}

function formatDate(dateString) {
    const date = new Date(dateString);
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return date.toLocaleDateString('en-US', options);
}

function initializeWebsite() {
    updateAge();
    hideLoader();
    initDarkMode();
    fetchBlogPosts();
    
    setTimeout(() => {
        initScrollAnimations();
        add3DTiltEffect();
        addSocialLinkAnimations();
        smoothScrollBehavior();
    }, 1200);
}

applyInitialDarkMode();

window.addEventListener('load', hideLoader);
document.addEventListener('DOMContentLoaded', initializeWebsite);
