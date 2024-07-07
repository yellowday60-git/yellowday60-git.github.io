document.addEventListener('DOMContentLoaded', () => {
    loadAchievements(); // 업적 데이터 로드

    // 업적 데이터를 가져와서 리스트로 출력하는 함수
    function loadAchievements() {
        fetch('data/achievements.json')
            .then(response => response.json())
            .then(data => {
                displayAchievementsList(data); // 업적 리스트 표시
            });
    }

    // 업적 리스트를 HTML에 추가하는 함수
    function displayAchievementsList(achievements) {
        const achievementList = document.getElementById('achievement-list');
        achievementList.innerHTML = ''; // 초기화

        achievements.forEach(ach => {
            const li = document.createElement('li');
            li.textContent = `${ach.name} - ${ach.description}`;

            // 달성 여부 확인 후 버튼 추가
            const button = document.createElement('button');
            button.textContent = ach.completed ? '달성 해제' : '달성';
            button.onclick = () => toggleAchievementCompletion(ach.id, !ach.completed); // 달성 여부 전환
            li.appendChild(button);

            achievementList.appendChild(li);
        });
    }

    // 업적 달성 여부 전환 함수
    function toggleAchievementCompletion(id, completed) {
        // 실제로는 서버와 연결하여 업적 데이터를 업데이트하는 로직을 추가해야 함
        console.log(`업적 ID ${id}의 달성 여부를 ${completed ? '달성' : '해제'}하였습니다.`);
        
        // 여기서는 예시로 콘솔에 로그만 출력하도록 작성되었습니다.
        // 실제 프로젝트에서는 서버와의 데이터 통신 및 업데이트 로직을 구현해야 합니다.
    }
});
