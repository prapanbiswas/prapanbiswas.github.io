/* =========================================
   Projects Page — Page-Specific JavaScript
   =========================================
   Persistent real-time listener for all projects.
   Uses onValue() — no polling, instant updates.
   ========================================= */

function initializeProjectsPage() {
    const container = document.getElementById('projects-container');
    if (!container) return;

    // Show skeleton cards on initial load
    generateSkeletonCards(6, container);

    // Attach persistent listener
    fbListen('projects', (data) => {
        const projects = data ? (Array.isArray(data) ? data : Object.values(data)) : [];
        container.innerHTML = '';

        if (projects.length === 0) {
            container.innerHTML = '<div class="col-span-full text-center p-8 text-slate-500"><p>No projects yet.</p></div>';
            return;
        }

        projects.forEach((project, index) => {
            container.appendChild(createProjectCard(project, index));
        });

        // Re-init tilt on dynamically injected cards
        new TiltCards();
    }, container);
}

document.addEventListener('DOMContentLoaded', initializeProjectsPage);
