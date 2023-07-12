var questionEl = document.getElementById("questions");
var answersEl = document.getElementById("answers");
var startBtn = document.getElementById("Start");

var currentQuestionIndex = 0;
var score = 0;

var quizEl = [
    {
        question: "What is my name?",
        answers: ["Steven", "Miguel", "Jovan", "chris"],
        correctAnswer : "Steven"
    }
];

function Questions() {
    var currentQuestion = quizEl[currentQuestionIndex];
    questionEl.innerText = currentQuestion.question;
    answersEl.innerText = "";
    
    /*urrentQuestion.answers.forEach(element => {
        var li = document.createElement("li");
        li.innerText = answers;
        answersEl.appendChild(li);
    });*/
}

//Questions();
startBtn.addEventListener("click", Questions);