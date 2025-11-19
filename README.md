# Prapan Biswas - Personal Portfolio

## Overview
This is a personal portfolio website for Prapan Biswas, a 19-year-old Civil Engineering student from Khulna, Bangladesh. The project is a static, single-page web application featuring professional design with RGB gradients, social media integration, skills showcase, personal bio, and auto-updating age calculator.

## Project Type
Static HTML/CSS/JavaScript website with no build process or frameworks.

## Recent Changes

### November 19, 2025 - Dark Mode Improvements & Project Cleanup
- Fixed loading screen to respect dark mode preference (prevents bright light flash on dark mode)
- Added dark gradient background for loader in dark mode
- Implemented early dark mode detection before page loads
- Enhanced dark mode with gradient effects for all sections:
  - Info cards with blue/purple gradients
  - Bio text with custom dark gradients
  - Interest items with improved contrast
  - Contact section with deeper purple gradient
- Added animated background with color-shifting radial gradients
- Improved text contrast in dark mode hover states
- Cleaned up project directory structure:
  - Removed duplicate zip files
  - Deleted unnecessary README.md
  - Removed screenshot files
  - Consolidated to single replit.md in root directory
- Added Google Site Verification meta tag

### November 19, 2025 - Content Optimization with New Sections
- Rewrote About Me section starting with "My name is Prapan Biswas" for better SEO
- Updated content to emphasize civil engineering student and multi-skill learner identity
- Revised Skills section with new focus areas:
  - Web Design (instead of Web Development)
  - App Development
  - Graphics Design (instead of UI/UX Design)
  - Basic Backend (new)
  - Database Basics (new)
- Added new Interests & Passions section covering:
  - Learning
  - Technology
  - Creative Projects
- Added new Get in Touch (Contact) section with:
  - GitHub link
  - Email (prapanbiswas@gmail.com)
  - Instagram link
  - Facebook link
  - No forms, just simple contact links
- Updated skills section heading to "What Prapan Brings to the Table" for natural keyword usage
- Enhanced all skill descriptions with "Prapan" mentions for SEO
- Added footer tagline: "Civil Engineering Student | Multi-Skill Learner | Tech Enthusiast"
- Changed section subheadings from H2 to H3/H4 for proper heading hierarchy
- Added descriptive aria-labels to all SVG icons for better accessibility

### November 19, 2025 - SEO Optimization
- Optimized website to rank #1 for "Prapan Biswas" and related keywords
- Added comprehensive meta tags (description, keywords, author, canonical URL)
- Implemented Open Graph tags for better social media sharing
- Added Twitter Card tags for enhanced Twitter previews
- Implemented structured data (JSON-LD) using Schema.org Person markup
- Updated page title to "Prapan Biswas – Personal Website & Portfolio"
- Changed tagline from `<p>` to `<h2>` with SEO-optimized text: "Personal Website, Portfolio & Skills Overview"
- Converted section headings from `<h2>` to `<h3>` to maintain proper heading hierarchy (H1 → H2 → H3)
- Created robots.txt file to guide search engine crawlers
- Created sitemap.xml file for better indexing
- Enhanced image alt text with descriptive keywords
- "Prapan Biswas" appears in first paragraph for optimal keyword placement

### November 19, 2025 - Birthday Countdown Removal
- Removed the birthday countdown section from the website
- Kept the dynamic age calculation feature that automatically updates based on birthdate
- Age is now calculated using birth year (2006) and birth date (February 15)
- Age updates dynamically in the About Me section
- Simplified JavaScript code to only include age calculation logic
- Removed countdown-related CSS styles for cleaner codebase

### November 19, 2025 - Replit Environment Setup
- Installed Python 3.11 for serving static files
- Created .gitignore for Python files
- Configured workflow to serve site on port 5000 using Python's HTTP server
- Set up deployment configuration for static site hosting

### November 17, 2025
- Updated email to prapanbiswas@gmail.com
- Added social media links (Instagram, GitHub, Facebook) with custom SVG icons
- Replaced all emojis with custom CSS/SVG icons for professional appearance
- Enhanced About Me section with detailed biographical information
- Created Skills & Expertise section with 6 skill cards
- Updated color scheme to professional RGB gradients
- Enhanced animations and transitions throughout the site
- Improved responsive design for all screen sizes

## User Preferences
Preferred communication style: Simple, everyday language.

## Project Architecture

### Frontend Architecture
**Static Single-Page Application**
- Traditional HTML/CSS/JavaScript stack without any frameworks
- All functionality is client-side rendered with vanilla JavaScript
- No build process or transpilation required
- Files are served directly to the browser

**Component Structure**
- `index.html`: Main structure with semantic HTML sections
- `style.css`: Styling with CSS custom properties for theming
- `script.js`: Client-side interactivity (dynamic age calculation)
- `attached_assets/`: Profile images and media

### Styling Approach
- CSS Custom Properties (CSS Variables) for consistent theming
- Gradient-based design with CSS animations
- Pure CSS animations for better performance

### JavaScript Features
- Dynamic age calculation based on birthdate (February 15, 2006)
- Age automatically updates and displays in the About Me section
- Uses vanilla JavaScript Date API for accurate age calculation
- Calculation accounts for month and day differences to ensure precision

### Deployment
The site is configured as a static deployment that serves HTML, CSS, and JavaScript files directly. No backend or build process required.

## External Dependencies
None - This is a completely self-contained static website with no external libraries or frameworks.
