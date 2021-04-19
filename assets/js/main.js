import { Model } from "./model.js";
import * as view from "./view.js";


var currentQuestion = 0;
var currentScore = 0;
var scores = [];

// when window starts to load
window.onload = function() {
    Model.getData();
    loadScore();
}

// after json files read successfully
window.addEventListener("modelUpdated", function() {
    loadPage();
})

// when user click on anything
window.addEventListener("click", function() {
    actionHandler();
})

// load the page
function loadPage() {
    view.homeView(20);
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
    var quiz = Model.getQuiz1();
    startQuizHandler(quiz);
}

function startQuiz2Handler(event) {
    var quiz = Model.getQuiz2();
    startQuizHandler(quiz);
}

function startQuiz3Handler(event) {
    var quiz = Model.getQuiz3();
    startQuizHandler(quiz);
}

function viewHighScoreHandler(event) {
    decreaseOrderScore();
    view.highScoreView(scores);
}

// need to be fixed
function clickAnswerHandler(event) {
    var quiz = Model.getQuiz1();
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
}

function decreaseOrderScore() {
    scores.sort((x, y) => y.score - x.score);
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