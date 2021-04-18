import { Model } from "./model.js";
import * as view from "./view.js";


var currentQuestion = 0;
var currentScore = 0;
var scores = [];

// when window starts to load
window.onload = function() {
    Model.get_data();
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

    var quiz = Model.get_quiz();
    // console.log(quiz);
    // for (var i = 0; i < quiz.length; i++) {
    //     console.log(quiz[i]);
    // }

    view.header_view(300);
    // view.main_view(quiz[currentQuestion]);
    view.main_finish_view(currentScore, "");

    // var score = {
    //     "initial": "CYK",
    //     "score": currentScore
    // }
    // scores.push(score);
    // var score = {
    //     "initial": "CYK",
    //     "score": 60
    // }
    // scores.push(score);
    // view.high_score_view(scores);

    actionHandler();
}

function actionHandler() {
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

function clickAnswerHandler(event) {
    var quiz = Model.get_quiz();
    var target = event.target;
    
    if (target.closest("li")) {
        // correct answer was selected => increment score
        if (quiz[currentQuestion].correct === target.id) {
            currentScore++;
        }

        // next question
        currentQuestion++;

        // not a last question
        if (currentQuestion < quiz.length) {
            view.main_view(quiz[currentQuestion]);
        } else {
            view.main_finish_view(currentScore);
            console.log("score = " + currentScore);
            console.log("finish!");
        }
    }
}

function submitScoreHandler(event) {
    // console.log("submit score");
    // console.log(event);

    var initialInput = document.getElementById("initial").value;
    if (!initialInput) {
        view.main_finish_view(currentScore, "Enter your initial above!");
        // console.log("error");
        return false;
    }
    // console.log(initialInput);

    var score = {
        "initial": initialInput,
        "score": currentScore
    }
    scores.push(score);
    saveScore();

    view.high_score_view(scores);
}

function goBackHandler(event) {
    console.log("go back to the main page")
}

function clearScoreHandler(event) {
    console.log("clear score");
    clearScore();

    console.log("go back to the main page");
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