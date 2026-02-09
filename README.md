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

### How to Add a New Project
1.  **Open Data File**: Open `projects-data.json` in a text editor.
2.  **Add Project Entry**: Add a new object to the array:
    ```json
    {
        "id": 7,
        "title": "My New Project",
        "description": "Brief description of your project and its key features.",
        "category": "Web Application",
        "url": "https://yourproject.com",
        "thumbnail_url": "attached_assets/project-image.jpg",
        "tech_stack": ["React", "Node.js", "MongoDB"],
        "featured": false
    }
    ```
3.  **Add Project Image**: Place your project thumbnail in the `attached_assets/` folder.
4.  **Featured Projects**: Set `"featured": true` to display the project on the homepage (limit to 3).
5.  **Done**: The projects page will automatically load and display the new project.

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
> - `script.js`: Contains the `Orb` class, animation loop, and projects fetching logic.
> - `index.html`: Main homepage with featured projects section.
> - `projects.html`: Full projects showcase page.
> - `projects-data.json`: Project metadata with external URLs.
>
> **Task**: [INSERT YOUR REQUEST HERE]

---

## Tech Stack
-   **Core**: HTML5, CSS3, JavaScript (ES6+)
-   **Styling**: Custom CSS Variables + Tailwind CSS (CDN)
-   **Animation**: HTML5 Canvas API
