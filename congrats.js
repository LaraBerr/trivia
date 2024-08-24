document.addEventListener('DOMContentLoaded', () => {
    const scoreElement = document.getElementById('score');
    const score = localStorage.getItem('score') || 0;
    scoreElement.textContent = `You Earned ${score} Points`;
});
