/**
 * Controller in MVC to support JavaScript Quiz application.
 */


import { Model } from "./model.js";
import * as view from "./view.js";


// global variables
var timer = 0;
var countDown;
var quizzes = []; //array of quiz
var currentQuiz = 0; //assume current quiz is quiz1
var currentQuestion = 0;
var currentScore = 0;
var scores = [];


/**
 * When window starts to load:
 * - get/fetch the data
 * - load list of score from localStorage if any
 */
window.onload = function() {
    Model.getData();
    loadScore();
}

/**
 * After json files read successfully:
 * - get each quiz and store in global variable quizzes
 */
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

/**
 * load the page by:
 * - view the homepage
 * - get the quiz set, shuffle the questions and store in quizzes
 */
function loadPage(quiz, index) {
    view.homeView();
    shuffleQuestions(quiz);
    quizzes.splice(index, 0, quiz);
}

/**
 * handle 'click' event when user clicks on something
 */
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

/**
 * helper function for handling start quiz buttons click.
 * quiz - which quiz set to start
 * start count down the time
 * the quiz finish when no time remained
 */
function startQuizHandler(quiz) {
    countDown = setInterval(function() {
        timer--;
        view.quizView(timer, quiz[currentQuestion]);
        if (timer <= 0) {
            timer = 0;
            clearInterval(countDown)
            view.finishView(currentScore, quiz.length, timer, "");
        }
    }, 1000);
    
}

// when start quiz 1 button is clicked
function startQuiz1Handler(event) {
    timer = 201;
    currentQuiz = 0;
    startQuizHandler(quizzes[0]);
}

// when start quiz 2 button is clicked
function startQuiz2Handler(event) {
    timer = 201;
    currentQuiz = 1;
    startQuizHandler(quizzes[1]);
}

// when start quiz 3 button is clicked
function startQuiz3Handler(event) {
    timer = 301;
    currentQuiz = 2;
    startQuizHandler(quizzes[2]);
}

// view the list of high score
function viewHighScoreHandler(event) {
    clearInterval(countDown);
    orderScore();
    view.highScoreView(scores);
}

// when the user answer the question
function clickAnswerHandler(event) {
    var quiz = quizzes[currentQuiz];
    var target = event.target;
    
    if (target.closest(".ans")) {
        // correct answer was selected => increment score
        if (quiz[currentQuestion].correct === target.id) {
            currentScore++;
        } else { // otherwise lost 10 seconds
            timer -= 10;
            if (timer <= 0) {
                timer = 0;
            }
        }

        // next question
        currentQuestion++;

        // not a last question -> view next question
        if (currentQuestion < quiz.length) {
            view.quizView(timer, quiz[currentQuestion]);
        } else { // otherwise finish
            clearInterval(countDown);
            view.finishView(currentScore, quiz.length, timer, "");
        }
    }
}

// finish and record score
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
    scores.unshift(score); // at to the beginning of the array
    orderScore()
    saveScore();
    reset();

    // record score successfully -> view the list of high score
    view.highScoreView(scores);
}

/**
 * go back button is clicked:
 * - reset global variables
 * - go back to homepage
 */
function goBackHandler(event) {
    reset();
    view.homeView();
}

/**
 * clear high score is clicked:
 * - reset the globale variables
 * - clear local storage
 * - go back to homepage
 */
function clearScoreHandler(event) {
    reset();
    clearScore();
    view.homeView();
}

// reset the global variables
function reset() {
    currentQuestion = 0;
    currentScore = 0;

    // re-shuffle the questions of each quiz
    for (var i = 0; i < quizzes.length; i++) {
        shuffleQuestions(quizzes[i]);
    }
}

/**
 * Order of the list of high score:
 * 1. sort scores decreasingly
 * 2. group scores based on quiz set
 */
function orderScore() {
    scores.sort((x, y) => y.score - x.score);
    scores.sort((x, y) => x.quiz - y.quiz);
}

// shuffle the questions within the quiz set
function shuffleQuestions(quiz) {
    quiz.sort(() => Math.random() - 0.5);
}

// save the score to localStorage
function saveScore() {
    localStorage.setItem("scores", JSON.stringify(scores));
}

// load the score from localStorage
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

// clear localStorage
function clearScore() {
    localStorage.clear();
    scores = [];
}