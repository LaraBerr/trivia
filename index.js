document.addEventListener('DOMContentLoaded', function() {
    const categorySelect = document.getElementById('category-select');
    const difficultySelect = document.getElementById('difficulty-select');
    const playButton = document.querySelector('.play-button');

    // Seçim değiştiğinde bilgi göster
    categorySelect.addEventListener('change', function() {
        alert('Category selected: ' + categorySelect.value);
    });

    difficultySelect.addEventListener('change', function() {
        alert('Difficulty selected: ' + difficultySelect.value);
    });

    // Boş seçenekleri kontrol et
    playButton.addEventListener('click', function(event) {
        if (categorySelect.value === '' || difficultySelect.value === '') {
            alert('Please select both a category and a difficulty level!');
            event.preventDefault(); // Sayfanın ilerlemesini engelle
        }
    });

    // Seçim yapıldığında arka plan rengini değiştir
    categorySelect.addEventListener('change', function() {
        document.body.style.backgroundColor = getRandomColor();
    });

    difficultySelect.addEventListener('change', function() {
        document.body.style.backgroundColor = getRandomColor();
    });

    function getRandomColor() {
        const letters = '0123456789ABCDEF';
        let color = '#';
        for (let i = 0; i < 6; i++) {
            color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
    }
});