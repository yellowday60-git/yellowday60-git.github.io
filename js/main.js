document.addEventListener('DOMContentLoaded', () => {
    if (document.getElementById('achievement-form')) {
        document.getElementById('achievement-form').addEventListener('submit', event => {
            event.preventDefault();
            const name = document.getElementById('name').value;
            const description = document.getElementById('description').value;
            const prerequisite = document.getElementById('prerequisite').value;
            addAchievement(name, description, prerequisite);
        });
        displayRegisteredAchievements();
    } else {
        loadAchievements();
    }
});
