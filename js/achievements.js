let achievements = [];
let completedAchievements = [];

async function fetchAchievements() {
  try {
    const response = await fetch('http://64.110.110.12:5000/achievements');
    if (!response.ok) {
      throw new Error('Failed to fetch achievements');
    }
    achievements = await response.json();
    console.log('Achievements loaded:', achievements);
    renderAchievements();
  } catch (error) {
    console.error('Error fetching achievements:', error.message);
  }
}

async function fetchCompletedAchievements() {
  try {
    const response = await fetch('http://64.110.110.12:5000/completed');
    if (!response.ok) {
      throw new Error('Failed to fetch completed achievements');
    }
    completedAchievements = await response.json();
    console.log('Completed Achievements loaded:', completedAchievements);
    renderAchievements();
  } catch (error) {
    console.error('Error fetching completed achievements:', error.message);
  }
}

async function completeAchievement(id) {
  try {
    const response = await fetch('http://64.110.110.12:5000/complete', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ id })
    });
    if (!response.ok) {
      throw new Error('Failed to complete achievement');
    }
    const data = await response.json();
    completedAchievements = data.completed;
    const achievementElement = document.querySelector(`.achievement:has(button[onclick="completeAchievement(${id})"])`);
    if (achievementElement) {
      achievementElement.classList.add('just-completed');
      setTimeout(() => {
        achievementElement.classList.remove('just-completed');
      }, 500);
    }
    renderAchievements(getCurrentFilter());
  } catch (error) {
    console.error('Error completing achievement:', error.message);
  }
}

function renderAchievements(filter = 'all') {
  const achievementsList = document.getElementById('achievements-list');
  achievementsList.innerHTML = '';

  achievements.forEach(achievement => {
    if (
      (filter === 'all') ||
      (filter === 'incomplete' && !completedAchievements.includes(achievement.id)) ||
      (filter === 'available' && isAchievementAvailable(achievement)) ||
      (filter === 'completed' && completedAchievements.includes(achievement.id))
    ) {
      const achievementElement = document.createElement('div');
      achievementElement.className = 'achievement';
      achievementElement.innerHTML = `
        <div class="achievement-info">
          <h3>${achievement.name}</h3>
          <p>${achievement.description}</p>
        </div>
        <div class="achievement-status">
          ${completedAchievements.includes(achievement.id) 
            ? `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#27ae60">
                <path d="M20.285 2l-11.285 11.567-5.286-5.011-3.714 3.716 9 8.728 15-15.285z"/>
               </svg>`
            : `<button onclick="completeAchievement(${achievement.id})">완료</button>`
          }
        </div>
      `;
      achievementsList.appendChild(achievementElement);
    }
  });
}

function isAchievementAvailable(achievement) {
  if (achievement.prerequisite === null) {
    return !completedAchievements.includes(achievement.id);
  }
  return completedAchievements.includes(achievement.prerequisite) && !completedAchievements.includes(achievement.id);
}

function getCurrentFilter() {
  return document.querySelector('.filter-btn.active').dataset.filter;
}

document.querySelectorAll('.filter-btn').forEach(btn => {
  btn.addEventListener('click', function() {
    document.querySelector('.filter-btn.active').classList.remove('active');
    this.classList.add('active');
    renderAchievements(this.dataset.filter);
  });
});

fetchAchievements();
fetchCompletedAchievements();
