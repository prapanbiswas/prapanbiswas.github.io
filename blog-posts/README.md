# Blog Post Creation Guide

This folder contains the templates for creating new blog posts that align with the **Deep Dark** design system of the Prapan Biswas portfolio.

## Available Templates

1.  **`template-text-only.html`**: Best for articles, tutorials, and text-heavy stories.
2.  **`template-multi-image.html`**: Best for design showcases, photography, or project galleries.

## How to Create a New Post

1.  **Duplicate**: Copy one of the templates above and rename it (e.g., `my-new-post.html`).
2.  **Edit**: Open the new file in a code editor.
    *   **Title**: Update `<title>` tag and the `<h1>` heading.
    *   **Meta**: Update `<meta name="description">`.
    *   **Content**: Replace the placeholder text inside `<article>`.
3.  **Register**: You MUST register the post in `../blog-data.json` for it to appear on the main Blog page.
    *   Open `d:\prapanbiswas.github.io\blog-data.json`.
    *   Add a new object to the array:
        ```json
        {
            "id": 99,
            "title": "My New Post",
            "date": "2025-12-07",
            "summary": "Short summary...",
            "filename": "my-new-post.html",
            "thumbnail_url": "../attached_assets/your-image.jpg",
            "category": "Technology"
        }
        ```

## AI Generation Prompt
To generate a blog post using AI, give it this prompt:

> "Create a new HTML blog post using the 'Deep Dark' design system. Use the `template-text-only.html` structure. Link to `../style.css` and include the `orb-canvas-container` div at the top of the body. Wrap the content in a `.glass-card` article. The topic is [TOPIC HERE]..."
