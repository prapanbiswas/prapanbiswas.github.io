/* =========================================
   Projects Page — Page-Specific JavaScript
   =========================================
   Fetches all projects from Firebase and renders
   them into the projects-container grid.
   ========================================= */

async function fetchProjects() {
    const projectsContainer = document.getElementById('projects-container');
    if (!projectsContainer) return;

    try {
        const data = await fbGet('projects');
        const projects = data ? (Array.isArray(data) ? data : Object.values(data)) : [];
        projectsContainer.innerHTML = '';
        if (projects.length === 0) {
            projectsContainer.innerHTML = '<div class="col-span-full text-center p-8 text-slate-500"><p>No projects yet.</p></div>';
            return;
        }
        projects.forEach((project, index) => {
            projectsContainer.appendChild(createProjectCard(project, index));
        });
    } catch (error) {
        console.error('Error fetching projects:', error);
        projectsContainer.innerHTML = '<div class="col-span-full text-center p-8 text-slate-500"><p>Unable to load projects.</p></div>';
    }
}

function initializeProjectsPage() {
    // Initialize Firebase App Check before data fetching
    if (typeof initPublicFirebase === 'function') {
        initPublicFirebase();
    }

    fetchProjects();
}

document.addEventListener('DOMContentLoaded', initializeProjectsPage);
