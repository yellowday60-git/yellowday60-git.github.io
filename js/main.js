document.addEventListener('DOMContentLoaded', () => {
    loadAchievements();
    document.getElementById('filter-options').addEventListener('change', (event) => {
        filterAchievements(event.target.value);
    });
});
