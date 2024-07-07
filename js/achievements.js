let achievements = []; // 업적 데이터를 저장할 전역 배열

// 업적 데이터를 로드하는 함수
function loadAchievements() {
    // 실제로는 서버에서 데이터를 가져오는 코드가 여기에 들어갈 것입니다.
    fetch('data/achievements.json')
        .then(response => response.json())
        .then(data => {
            achievements = data;
            displayAchievements('all'); // 데이터를 로드한 후 모든 업적을 표시
        });
}

// 업적을 특정 방식으로 필터링하여 표시하는 함수
function displayAchievements(filter) {
    const filteredAchievements = filterAchievements(filter); // filterAchievements 함수를 통해 필터링된 업적 데이터를 가져옴
    displayAchievementsList(filteredAchievements); // 화면에 업적을 표시하는 함수 호출
}

// 필터 옵션에 따라 업적을 필터링하는 함수 (예시용으로 구현된 것임)
function filterAchievements(filter) {
    if (filter === 'all') {
        return achievements; // 모든 업적을 반환
    } else {
        // 필터링 로직을 추가할 수 있음 (미완료 업적, 완료된 업적 등)
        return achievements.filter(ach => !ach.completed);
    }
}

// 화면에 업적을 표시하는 함수 (예시용으로 구현된 것임)
function displayAchievementsList(list) {
    const achievementList = document.getElementById('achievement-list');
    achievementList.innerHTML = '';
    list.forEach(ach => {
        const li = document.createElement('li');
        li.textContent = `${ach.name} - ${ach.description}`;
        achievementList.appendChild(li);
    });
}
