document.addEventListener('DOMContentLoaded', () => {
    loadAchievements(); // achievements.js에 정의된 loadAchievements 함수를 호출하여 업적 데이터를 로드함
    document.getElementById('filter-options').addEventListener('change', (event) => {
        displayAchievements(event.target.value); // filter 옵션에 따라 업적을 필터링하여 화면에 표시
    });
});
