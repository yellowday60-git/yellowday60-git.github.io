let achievements = JSON.parse(localStorage.getItem('achievements')) || [];

function loadAchievements() {
    if (achievements.length === 0) {
        fetch('data/achievements.json')
            .then(response => response.json())
            .then(data => {
                achievements = data;
                saveAchievements();
                displayAchievements('all');
            });
    } else {
        displayAchievements('all');
    }
}

function saveAchievements() {
    localStorage.setItem('achievements', JSON.stringify(achievements));
}

function addAchievement(name, description, prerequisite) {
    const id = achievements.length ? achievements[achievements.length - 1].id + 1 : 1;
    achievements.push({ id, name, description, prerequisite: prerequisite || null, completed: false });
    saveAchievements();
    displayRegisteredAchievements();
}

function markAchievementAsCompleted(id) {
    const achievement = achievements.find(ach => ach.id === id);
    if (achievement) {
        achievement.completed = true;
        saveAchievements();
        displayAchievements('all');
    }
}

function filterAchievements(filter) {
    let filteredAchievements;
    if (filter === 'pending') {
        filteredAchievements = achievements.filter(ach => !ach.completed);
    } else if (filter === 'available') {
        filteredAchievements = achievements.filter(ach => !ach.completed && (ach.prerequisite === null || achievements.find(pre => pre.id === ach.prerequisite).completed));
    } else if (filter === 'completed') {
        filteredAchievements = achievements.filter(ach => ach.completed);
    } else {
        filteredAchievements = achievements;
    }
    displayAchievementsList(filteredAchievements);
}

function displayAchievementsList(list) {
    const achievementList = document.getElementById('achievement-list');
    achievementList.innerHTML = '';
    list.forEach(ach => {
        const li = document.createElement('li');
        li.textContent = `${ach.name} - ${ach.description}`;
        
        if (ach.completed) {
            const trophyIcon = document.createElement('img');
            trophyIcon.src = 'images/trophy.svg';
            trophyIcon.alt = 'Trophy';
            trophyIcon.classList.add('trophy-icon');
            li.appendChild(trophyIcon);
            li.classList.add('completed');
        }

        achievementList.appendChild(li);
    });
}

function displayRegisteredAchievements() {
    const registeredList = document.getElementById('registered-achievements');
    registeredList.innerHTML = '';
    achievements.forEach(ach => {
        const li = document.createElement('li');
        li.textContent = `${ach.name} - ${ach.description} ${ach.prerequisite ? `(선행 업적: ${ach.prerequisite})` : ''}`;
        registeredList.appendChild(li);
    });
}
