import { Model } from "./model.js";
import * as view from "./view.js";


var timer = 0;
var countDown;
var quizzes = []; //array of quiz
var currentQuiz = 0; //assume current quiz is quiz1
var currentQuestion = 0;
var currentScore = 0;
var scores = [];

// var countDown = setInterval(function() {
//     timer--;
//     view.quizView(timer)
// });

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
window.addEventListener("click", actionHandler)

// load the page
function loadPage(quiz, index) {
    view.homeView();
    shuffleQuestions(quiz);
    quizzes.splice(index, 0, quiz);
}

function actionHandler(event) {
    var target = event.target;

    if (target.closest("#start-quiz1-btn")) {
        startQuiz1Handler(event);
    }

    if (target.closest("#start-quiz2-btn")) {
        startQuiz2Handler(event);
    }

    if (target.closest("#start-quiz3-btn")) {
        startQuiz3Handler(event);
    }

    if (target.closest("#view-high-score-link")) {
        viewHighScoreHandler(event);
    }

    if (target.closest("#main")) {
        clickAnswerHandler(event);
    }
    
    if (target.closest("#initial-submit-btn")) {
        submitScoreHandler(event);
    }

    if (target.closest("#go-back-btn")) {
        goBackHandler(event);
    }

    if (target.closest("#clear-high-score-btn")) {
        clearScoreHandler(event);
    }
}

function startQuizHandler(quiz) {
    countDown = setInterval(function() {
        timer--;
        view.quizView(timer, quiz[currentQuestion]);
        if (timer <= 0) {
            console.log("finish");
            timer = 0;
            clearInterval(countDown)
            view.finishView(currentScore, quiz.length, timer, "");
            console.log("??");
        }
    }, 1000);
    
}

function startQuiz1Handler(event) {
    timer = 201;
    currentQuiz = 0;
    startQuizHandler(quizzes[0]);
}

function startQuiz2Handler(event) {
    timer = 201;
    currentQuiz = 1;
    startQuizHandler(quizzes[1]);
}

function startQuiz3Handler(event) {
    timer = 301;
    currentQuiz = 2;
    startQuizHandler(quizzes[2]);
}

function viewHighScoreHandler(event) {
    clearInterval(countDown);
    orderScore();
    view.highScoreView(scores);
}

function clickAnswerHandler(event) {
    var quiz = quizzes[0];

    if (currentQuiz === 1) {
        quiz = quizzes[1];
    } else if (currentQuiz === 2) {
        quiz = quizzes[2];
    }

    var target = event.target;
    
    if (target.closest(".ans")) {
        // correct answer was selected => increment score
        if (quiz[currentQuestion].correct === target.id) {
            currentScore++;
        } else {
            timer -= 10;
            if (timer <= 0) {
                timer = 0;
            }
        }

        // next question
        currentQuestion++;

        // not a last question
        if (currentQuestion < quiz.length) {
            view.quizView(timer, quiz[currentQuestion]);
        } else {
            clearInterval(countDown);
            view.finishView(currentScore, quiz.length, timer, "");
        }
    }
}

function submitScoreHandler(event) {
    var initialInput = document.getElementById("initial").value;
    
    // no input
    if (!initialInput) {
        var quizLength = quizzes[currentQuiz].length;
        view.finishView(currentScore, quizLength, timer, "Enter your initial above!");
        return false;
    }

    var score = {
        "initial": initialInput,
        "score": currentScore,
        "quiz": currentQuiz + 1
    }
    // scores[currentQuiz].unshift(scores);
    scores.unshift(score);
    orderScore()
    saveScore();
    reset();

    view.highScoreView(scores);
}

function goBackHandler(event) {
    reset();
    view.homeView();
}

function clearScoreHandler(event) {
    reset();
    clearScore();
    view.homeView();
}

function reset() {
    currentQuestion = 0;
    currentScore = 0;

    // re-shuffle the questions of each quiz
    for (var i = 0; i < quizzes.length; i++) {
        shuffleQuestions(quizzes[i]);
    }
}

/**
 * 1. sort scores decreasingly
 * 2. group scores based on quiz set
 */
function orderScore() {
    scores.sort((x, y) => y.score - x.score);
    scores.sort((x, y) => x.quiz - y.quiz);
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