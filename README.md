# Prapan Biswas - Premium Portfolio Website

A high-end, "Deep Dark" themed personal portfolio featuring ambient orb animations, Glassmorphism 2.0, and physics-based interactivity.

## 🌟 Features
-   **Deep Dark Aesthetic**: Permanent, pitch-black background for a premium feel.
-   **Ambient Orb System**: Custom JavaScript physics engine for floating, glowing orbs.
    -   **Mouse Magnetism**: Orbs react to cursor movement on desktop.
    -   **Gyroscope Parallax**: Background tilts with the device on mobile.
-   **Glassmorphism 2.0**: High-quality frosted glass cards with optimized blur.
-   **Performance**: 60fps animations using HTML5 Canvas.

## 🛠️ Setup (Local)
No build process required. This site uses Vanilla JS and CSS variables.
1.  **Clone the repository**:
    ```bash
    git clone https://github.com/prapanbiswas/prapanbiswas.github.io.git
    ```
2.  **Open index.html**: Directly open the file in your browser, or use a live server extension (VS Code) for best results.

## 📖 User Manual

### How to Add a New Blog Post
1.  **Create File**: Go to `blog-posts/` and duplicate an existing HTML file. Rename it (e.g., `my-story.html`).
2.  **Edit Content**: Update the title, date, and body text in the HTML file.
3.  **Register Post**: Open `blog-data.json` and add an entry:
    ```json
    {
        "id": 8,
        "title": "My New Story",
        "date": "2025-12-07",
        "summary": "Short description for the card...",
        "filename": "my-story.html",
        "thumbnail_url": "attached_assets/image.jpg",
        "category": "Design"
    }
    ```
4.  **Done**: The blog page will automatically load the new post.

---

## 🤖 AI Maintenance Guide
*Copy the following prompt when asking an AI to modify this site in the future:*

> **Context**: This is a vanilla HTML/CSS/JS website with a specific "Deep Dark" design system.
> **Design Rules**:
> 1. **Background**: MUST remain `#000000` pitch black. No gradients on the body background.
> 2. **Orbs**: The background animation is handled by `OrbSystem` in `script.js` (Canvas). Do NOT add CSS keyframe blobs.
> 3. **Glassmorphism**: Use the `.glass-card` class which uses `--glass-bg` and `--glass-blur` variables. Do not use solid opaque backgrounds for cards.
> 4. **Colors**: Use CSS variables: `--primary-color`, `--secondary-color`, `--accent-color`.
> 5. **No Light Mode**: The site is permanently dark. Do not re-introduce theme toggles.
> **Code Structure**:
> - `style.css`: Contains all visual styles and variables.
> - `script.js`: Contains the `Orb` class, animation loop, and blog fetching logic.
> - `index.html`: Main SPA structure.
>
> **Task**: [INSERT YOUR REQUEST HERE]

---

## Tech Stack
-   **Core**: HTML5, CSS3, JavaScript (ES6+)
-   **Styling**: Custom CSS Variables + Tailwind CSS (CDN)
-   **Animation**: HTML5 Canvas API
