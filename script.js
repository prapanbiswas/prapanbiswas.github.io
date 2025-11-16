document.addEventListener('DOMContentLoaded', function() {
    // Age Calculation
    const birthDate = new Date('2006-02-15');
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
        age--;
    }
    document.getElementById('age').textContent = age;

    // Simulate content loading
    setTimeout(() => {
        const skeletonLoader = document.getElementById('skeleton-loader');
        const content = document.getElementById('content');

        skeletonLoader.style.display = 'none';
        content.style.display = 'block';
        // Add the 'loaded' class to trigger the animation
        setTimeout(() => content.classList.add('loaded'), 20);
    }, 1500); // Simulate a 1.5 second loading time
});
