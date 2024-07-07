const achievements = [];

function loadAchievements() {
    fetch('data/achievements.json')
        .then(response => response.json())
        .then(data => {
            achievements.push(...data);
            displayAchievements('all');
        });
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
        if (!ach.completed) {
            const button = document.createElement('button');
            button.textContent = '달성';
            button.onclick = () => markAchievementAsCompleted(ach.id);
            li.appendChild(button);
        } else {
            li.textContent += ' (완료)';
        }
        achievementList.appendChild(li);
    });
}

function displayRegisteredAchievements() {
    const registeredList = document.getElementById('registered-achievements');
    registeredList.innerHTML = '';
    achievements.forEach(ach => {
        const li = document.createElement('li');
        li.textContent = `${ach.name} - ${ach.description} (ID: ${ach.id})`;
        registeredList.appendChild(li);
    });
}
