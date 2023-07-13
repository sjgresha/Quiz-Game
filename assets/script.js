var startButton = document.getElementById('start');
var quiz = document.getElementById('quiz');
var questions = document.getElementById('questions');
var answerBtns = document.querySelector('btn');
var timerEl = document.getElementById('timer');
var countdown = 60;
var score;
var wrongAnswers;

startButton.addEventListener('click', function() {
    quiz.style.display = 'block';
    startButton.style.display = 'none';
    var countdownScore = setInterval(function() {
        countdown--;
        timerEl.textContent = countdown;

        if (countdown === 0) {
            clearInterval(countdownScore);
            alert('Times up');
        }
    }, 1000);

    answerBtns.addEventListener('click', function() {
        questions.textContent = 'Question 2 goes here';
    })
});