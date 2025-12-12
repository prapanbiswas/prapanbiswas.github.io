# Prapan Biswas Portfolio Website

## Overview
A personal portfolio website for Prapan Biswas (Arko), a civil engineering student and web developer from Khulna, Bangladesh. The site showcases skills, interests, and blog posts.

## Project Architecture
- **Type**: Static HTML/CSS/JS website
- **Framework**: No framework - vanilla HTML5, CSS3, and JavaScript
- **Styling**: Tailwind CSS (via CDN), custom CSS in `style.css`
- **Animations**: Three.js (background orbs), GSAP (UI animations)
- **Fonts**: Google Fonts (Inter, Outfit)

## Project Structure
```
├── index.html          # Main homepage
├── blog.html           # Blog listing page
├── style.css           # Custom styles
├── script.js           # Interactive functionality
├── blog-data.json      # Blog posts metadata
├── blog-posts/         # Individual blog post HTML files
├── attached_assets/    # Images and assets
├── sitemap.xml         # SEO sitemap
└── robots.txt          # Search engine directives
```

## Running the Project
The site is served using Python's built-in HTTP server on port 5000:
```bash
python -m http.server 5000 --bind 0.0.0.0
```

## Key Features
- Responsive design with mobile navigation
- Interactive animated background orbs
- Blog system with JSON-based post management
- Social media links and contact section
- SEO optimized with structured data

## Recent Changes
- December 2025: Initial import to Replit environment
