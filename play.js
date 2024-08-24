document.addEventListener('DOMContentLoaded', () => {
         
    const questionElement = document.getElementById('question');
    const answerElements = [
        document.getElementById('answer1'),
        document.getElementById('answer2'),
        document.getElementById('answer3'),
        document.getElementById('answer4')
    ];
    
     

    const nextButton = document.getElementById('next-button');
            
    let currentQuestionIndex = 0;
    //let currentCategory = '';
    //let currentDifficulty = '';
    let currentQuestions = [];
    let score = 0;
    let timer;

    const categoryIds = {
        'category1': '10',
        'category2': '11',
        'category3': '15'

    };

    const startQuiz = () => {
        const currentCategory = localStorage.getItem('selectedCategory');
        const currentDifficulty = localStorage.getItem('selectedDifficulty');

        if (!currentCategory || !currentDifficulty) {
            questionElement.textContent = 'Please select a category and difficulty level on the main page.';
            return;
        }

        fetchQuestions(currentCategory, currentDifficulty, questions => {
            currentQuestions = questions;
            currentQuestionIndex = 0;
            score = 0;
            showQuestion();
        });
    };

    const fetchQuestions = (category, difficulty, callback) => {
        const categoryId = categoryIds[category];
        if (!categoryId) {
            alert('not valid.');
            return;
        }

        const url = `https://opentdb.com/api.php?amount=10&category=${categoryId}&difficulty=${difficulty}&type=multiple`;

        const xhr = new XMLHttpRequest();
        xhr.open('GET', url, true);
        xhr.onreadystatechange = function() {
            if (xhr.readyState === 4 && xhr.status === 200) {
                const data = JSON.parse(xhr.responseText);
                const questions = data.results.map(result => ({
                    question: result.question,
                    answers: [...result.incorrect_answers, result.correct_answer].sort(() => Math.random() - 0.5),
                    correct: result.correct_answer
                }));
                callback(questions);
            }
        };
        xhr.send();
    };


    const showQuestion = () => {
        
        
        clearTimeout(timer);
        startTimer();
        resetProgressBar();
      

        if (currentQuestionIndex < currentQuestions.length) {
            const question = currentQuestions[currentQuestionIndex];
            questionElement.innerHTML = question.question;

            answerElements.forEach((answerElement, index) => {
                answerElement.innerHTML = question.answers[index];
                answerElement.style.display = 'block';
                answerElement.classList.remove('correct', 'wrong');
                answerElement.onclick = () => {
                    checkAnswer(index, question.answers[index], question.correct);
                    stopProgressBar();
                };
            });

            nextButton.style.display = 'none';
            
        } else {
            localStorage.setItem('score', score);
            window.location.href = 'congrats.html';
        }
    };

    const checkAnswer = (selectedIndex, selectedAnswer, correctAnswer) => {
        clearTimeout(timer);

        if (selectedAnswer === correctAnswer) {
            score += 100;
            answerElements[selectedIndex].classList.add('correct');
        } else {
            score -= 80;
            answerElements[selectedIndex].classList.add('wrong');
            answerElements[currentQuestions[currentQuestionIndex].answers.indexOf(correctAnswer)].classList.add('correct');
        }

        answerElements.forEach(answerElement => {
            answerElement.onclick = null;
        });

        nextButton.style.display = 'block';
        stopProgressBar();
    };

    const progressBarContainer = document.querySelector('.progress-bar-container');
    const progressBar = document.querySelector('.progress-bar');

    const startTimer = () => {
        progressBar.style.width = '100%';
        progressBar.style.transition = 'width 20s linear';
        timer = setTimeout(() => {
            showCorrectAnswer();
        }, 20000);
    };

    const showCorrectAnswer = () => {
        const correctAnswer = currentQuestions[currentQuestionIndex].correct;
        answerElements[currentQuestions[currentQuestionIndex].answers.indexOf(correctAnswer)].classList.add('correct');
        answerElements.forEach(answerElement => {
            answerElement.onclick = null;
        });
        nextButton.style.display = 'block';
    };

    const resetProgressBar = () => {
        progressBar.style.transition = 'none';
        progressBar.style.width = '100%';
        setTimeout(() => {
            progressBar.style.transition = 'width 20s linear';
            progressBar.style.width = '0%';
        }, 50);
    };

    const stopProgressBar = () => {
        progressBar.style.transition = 'none';
        progressBar.style.width = progressBar.style.width;
    };

    nextButton.addEventListener('click', () => {
        currentQuestionIndex++;
        showQuestion();
        resetProgressBar();
    });

    startQuiz();
});