document.addEventListener('DOMContentLoaded', () => {
    loadAchievements();
    document.getElementById('filter-options').value = 'all';
    filterAchievements('all');
});
