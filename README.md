# Prapan Biswas - Personal Portfolio

## Overview

This is a personal portfolio website for Prapan Biswas, a 19-year-old Civil Engineering student from Khulna, Bangladesh. The project is a static, single-page web application featuring professional design with RGB gradients, social media integration, skills showcase, personal bio, auto-updating age calculator, and birthday countdown timer. The website is built using vanilla HTML, CSS, and JavaScript without any frameworks or build tools, making it a straightforward static site suitable for direct deployment.

## Recent Changes (November 17, 2025)

- Updated email to prapanbiswas@gmail.com
- Added social media links (Instagram, GitHub, Facebook) with custom SVG icons
- Replaced all emojis with custom CSS/SVG icons for professional appearance
- Enhanced About Me section with detailed biographical information
- Created Skills & Expertise section with 6 skill cards (Web Development, App Development, UI/UX Design, Graphic Design, Programming, Civil Engineering)
- Updated color scheme to professional RGB gradients (purple, blue, pink/orange)
- Enhanced animations and transitions throughout the site
- Improved responsive design for all screen sizes

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture

**Static Single-Page Application**
- The website uses a traditional HTML/CSS/JavaScript stack without any frameworks
- All functionality is client-side rendered with vanilla JavaScript
- No build process or transpilation required - files are served directly to the browser
- **Rationale**: For a simple personal portfolio, avoiding framework overhead keeps the site lightweight and fast. Direct browser execution means easier maintenance and deployment.

**Component Structure**
- **index.html**: Main structure containing semantic HTML sections (header, main, sections)
- **style.css**: Styling with CSS custom properties (variables) for theming
- **script.js**: Client-side interactivity including age calculation and countdown logic
- **Pros**: Simple, no dependencies, fast loading
- **Cons**: Limited scalability for complex features, manual DOM manipulation

### Styling Approach

**CSS Custom Properties (CSS Variables)**
- Centralized theme configuration using `:root` variables for colors, gradients, and shadows
- Enables consistent styling across components and easy theme modifications
- Variables include: primary/secondary colors, gradients, shadows, typography colors
- **Rationale**: CSS variables provide a simple theming system without requiring preprocessors or CSS-in-JS solutions

**Gradient-Based Design**
- Heavy use of CSS gradients for visual appeal (background, potential button styles)
- Animation system using CSS keyframes for smooth page load transitions
- **Chosen approach**: Pure CSS animations over JavaScript-based animations for better performance

### JavaScript Features

**Dynamic Age Calculation**
- Real-time age computation based on birthdate (February 15, 2006)
- Accounts for month and day differences to ensure accuracy
- Updates the displayed age dynamically on page load

**Birthday Countdown Timer**
- Calculates time remaining until next birthday
- Appears to update in real-time (days, hours, minutes, seconds)
- Special birthday message display when the date arrives
- **Implementation**: Uses JavaScript Date API for all date calculations
- **Pros**: No external dependencies, works offline
- **Cons**: Client-side time can be manipulated by users (acceptable for this use case)

### Asset Management

**Static Image Assets**
- Profile image stored in `attached_assets/` directory
- Direct file path references in HTML
- **Alternative considered**: CDN hosting for images
- **Chosen approach**: Local assets for simplicity and avoiding external dependencies

## External Dependencies

### None

This project has zero external dependencies:
- No CSS frameworks (Bootstrap, Tailwind, etc.)
- No JavaScript frameworks or libraries (React, Vue, jQuery, etc.)
- No build tools (Webpack, Vite, Parcel, etc.)
- No package managers (npm, yarn, pnpm)
- No backend services or APIs
- No database systems
- No authentication services

**Deployment**: The site can be deployed to any static hosting service (GitHub Pages, Netlify, Vercel, or simple web servers) by serving the HTML, CSS, and JavaScript files directly.
