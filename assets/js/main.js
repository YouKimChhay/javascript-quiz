import { Model } from "./model.js";
import * as view from "./view.js";


var quizzes = []; //array of quiz
var currentQuiz = 1; //assume current quiz is quiz1
var currentQuestion = 0;
var currentScore = 0;
var scores = [];

// when window starts to load
window.onload = function() {
    Model.getData();
    loadScore();
}

// after json files read successfully
window.addEventListener("modelUpdated1", function() {
    loadPage(Model.getQuiz1(), 0);
})

window.addEventListener("modelUpdated2", function() {
    loadPage(Model.getQuiz2(), 1);
})

window.addEventListener("modelUpdated3", function() {
    loadPage(Model.getQuiz3(), 2);
})

// when user click on anything
window.addEventListener("click", function() {
    actionHandler();
})

// load the page
function loadPage(quiz, index) {
    view.homeView();
    shuffleQuestions(quiz);
    quizzes.splice(index, 0, quiz);
}

function actionHandler() {
    var startQuiz1Btn = document.getElementById("start-quiz1-btn");
    if (startQuiz1Btn) {
        startQuiz1Btn.addEventListener("click", startQuiz1Handler);
    }

    var startQuiz2Btn = document.getElementById("start-quiz2-btn");
    if (startQuiz2Btn) {
        startQuiz2Btn.addEventListener("click", startQuiz2Handler);
    }

    var startQuiz3Btn = document.getElementById("start-quiz3-btn");
    if (startQuiz3Btn) {
        startQuiz3Btn.addEventListener("click", startQuiz3Handler);
    }

    var viewHighScoreLink = document.getElementById("view-high-score-link");
    if (viewHighScoreLink) {
        viewHighScoreLink.addEventListener("click", viewHighScoreHandler);
    }

    var mainE = document.getElementById("main");
    if (mainE) {
        mainE.addEventListener("click", clickAnswerHandler);
    }

    var initialSubmitBtn = document.getElementById("initial-submit-btn");
    if (initialSubmitBtn) {
        initialSubmitBtn.addEventListener("click", submitScoreHandler);
    }

    var goBackBtn = document.getElementById("go-back-btn");
    if (goBackBtn) {
        goBackBtn.addEventListener("click", goBackHandler);
    }

    var clearScoreBtn = document.getElementById("clear-high-score-btn");
    if (clearScoreBtn) {
        clearScoreBtn.addEventListener("click", clearScoreHandler);
    }
}

function startQuizHandler(quiz) {
    view.quizView(300, quiz[currentQuestion]);
}

function startQuiz1Handler(event) {
    currentQuiz = 1;
    startQuizHandler(quizzes[0]);
}

function startQuiz2Handler(event) {
    currentQuiz = 2;
    startQuizHandler(quizzes[1]);
}

function startQuiz3Handler(event) {
    currentQuiz = 3;
    startQuizHandler(quizzes[2]);
}

function viewHighScoreHandler(event) {
    decreaseOrderScore();
    view.highScoreView(scores);
}

// need to be fixed
function clickAnswerHandler(event) {
    var quiz = quizzes[0];

    if (currentQuiz === 2) {
        quiz = quizzes[1];
    } else if (currentQuiz === 3) {
        quiz = quizzes[2];
    }

    var target = event.target;
    
    if (target.closest(".ans")) {
        // correct answer was selected => increment score
        if (quiz[currentQuestion].correct === target.id) {
            currentScore++;
        }

        // next question
        currentQuestion++;

        // not a last question
        if (currentQuestion < quiz.length) {
            view.quizView(300, quiz[currentQuestion]);
        } else {
            view.finishView(currentScore, "");
        }
    }
}

function submitScoreHandler(event) {
    var initialInput = document.getElementById("initial").value;
    
    // no input
    if (!initialInput) {
        view.finishView(currentScore, "Enter your initial above!");
        return false;
    }

    var score = {
        "initial": initialInput,
        "score": currentScore
    }
    scores.unshift(score);
    decreaseOrderScore()
    saveScore();
    reset();

    view.highScoreView(scores);
}

function goBackHandler(event) {
    reset();
    view.homeView(30);
}

function clearScoreHandler(event) {
    reset();
    clearScore();
    view.homeView(30);
}

function reset() {
    currentQuestion = 0;
    currentScore = 0;

    // re-shuffle the questions of each quiz
    for (var i = 0; i < quizzes.length; i++) {
        shuffleQuestions(quizzes[i]);
    }
}

function decreaseOrderScore() {
    scores.sort((x, y) => y.score - x.score);
}

function shuffleQuestions(quiz) {
    quiz.sort(() => Math.random() - 0.5);
}

function saveScore() {
    localStorage.setItem("scores", JSON.stringify(scores));
}

function loadScore() {
    // get scores from local storage
    scores = localStorage.getItem("scores");
    if (!scores) {
        scores = [];
        return false;
    }

    // covert to an array
    scores = JSON.parse(scores);
}

function clearScore() {
    localStorage.clear();
    scores = [];
}