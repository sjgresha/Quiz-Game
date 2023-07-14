//These are just sample questions for now. Will write real ones soon
var quizData = [
  {
    question: "Who am I?",
    answers: ["I am you", "You are me", "You are you"],
    correctAnswer: 2
  },
  {
    question: "Where are we",
    answers: ["We are here", "We are there", "We are everywhere", "We are no where"],
    correctAnswer: 3
  },
  {
    question: "What am I doing?",
    answers: ["You are doing everything", "You are doing nothing", "You are coding"],
    correctAnswer: 2
  },
  {
    question: "When am I",
    answers: ["You are now", "You were then", "you will be then", "you never were"],
    correctAnswer: 0
  },
];

var currentQuestion = 0;
var score = 0;
var timeRemaining = 60;
var timerInterval;

var startButton = document.getElementById('startButton');
var quizGame = document.getElementById('quiz-game');
var questionEl = document.getElementById('question');
var answersEl = document.getElementById('answers');
var timerEl = document.getElementById('timer');
var resultContainer = document.getElementById('result-container');
var scoreEl = document.getElementById('score');
var initialsInput = document.getElementById('initials');
var submitScoreButton = document.getElementById('submitScore');
var highscoreLink = document.getElementById('highscore');
var highscoreContainer = document.getElementById('highscore-container');
var highscoreList = document.getElementById('highscore-list');

//This is the fuction that starts the timer and begins to show the questions
function startQuiz() {
  startButton.style.display = 'none';
  quizGame.style.display = 'block';

  showQuestion();
  startTimer();
}

//This function shows the questions
function showQuestion() {
  //this var quiz now contains the quiz index that includes questions, answers, & correct answer. it is looking at the questions within the index. 
  var quiz = quizData[currentQuestion];
  questionEl.textContent = quiz.question;

  answersEl.textContent = '';
  quiz.answers.forEach((choice, index) => {
    var button = document.createElement('button');
    button.textContent = choice;
    button.addEventListener('click', handleAnswerClick);
    answersEl.appendChild(button);
  });
}

function handleAnswerClick(event) {
  var selectedChoice = event.target;
  var selectedAnswer = selectedChoice.textContent;
  var quiz = quizData[currentQuestion];

  if (quiz.answers[quiz.correctAnswer] === selectedAnswer) {
    score++;
  } else {
    timeRemaining -= 5;
    if (timeRemaining < 0) {
      timeRemaining = 0;
    }
  }

  currentQuestion++;

  if (currentQuestion < quizData.length) {
    showQuestion();
  } else {
    endQuiz();
  }
}

function endQuiz() {
  clearInterval(timerInterval);
  timerEl.textContent = timeRemaining;

  quizGame.style.display = 'none';
  resultContainer.style.display = 'block';
  scoreEl.textContent = timeRemaining;

  submitScoreButton.addEventListener('click', submitScore);
  highscoreLink.addEventListener('click', showHighscores);
}

function submitScore() {
  var initials = initialsInput.value.trim();
  if (initials !== '') {
    var highscoreItem = document.createElement('li');
    highscoreItem.textContent = initials + ': ' + timeRemaining;
    highscoreList.appendChild(highscoreItem);
  }
  //console.log(highscoreList);
  
  var scoreArr = JSON.parse(localStorage.getItem('HSandintials')) || [];
  var newScoreEntry = {
    initials: initials,
    score: timeRemaining
  }

  scoreArr.push(newScoreEntry);
  //scoreArr = scoreArr.concat(newScoreEntry); thought maybe this would work
  
  console.log(initials);
  console.log(timeRemaining);
  localStorage.setItem('HSandinitials', JSON.stringify(scoreArr));
  //localStorage.setItem('highScoreTIme', JSON.stringify(timeRemaining));

  initialsInput.value = '';
  resultContainer.style.display = 'none';
  highscoreContainer.style.display = 'block';


  //showHighscores();
}


/*function showHighscores() {
  quizGame.style.display = 'none';
  resultContainer.style.display = 'none';
  highscoreContainer.style.display = 'block';

  displayHighscores();
}

function displayHighscores() {
    highscoreList.textContent = "";
    
    var highScores = JSON.parse(localStorage.getItem('highScores')) || [];
    var highScoreContent = {
      initials: initials,
      score: timeRemaining
    }

    highScores.push(highScoreContent);
    
    highScores.forEach((entry) => {
        var highscoreItem = document.createElement('li');
        highscoreItem.textContent = entry.initials + ': ' + entry.score;
        highscoreList.appendChild(highscoreItem);
      });
}*/

function startTimer() {
  timerInterval = setInterval(() => {
    timeRemaining--;
    timerEl.textContent = timeRemaining;

    if (timeRemaining <= 0) {
      clearInterval(timerInterval);
      endQuiz();
    }
  }, 1000);
}

startButton.addEventListener('click', startQuiz);