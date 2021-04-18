import { Model } from "./model.js";
import * as view from "./view.js";


var currentQuestion = 0;
var currentScore = 0;

window.onload = function() {
    Model.get_data();
}

window.addEventListener("modelUpdated", function() {
    redraw();
})

function redraw() {

    var quiz = Model.get_quiz();
    // console.log(quiz);
    // for (var i = 0; i < quiz.length; i++) {
    //     console.log(quiz[i]);
    // }

    view.header_view(300);
    view.main_view(quiz[currentQuestion]);

    actionHandler();
}

function actionHandler() {
    var mainE = document.getElementById("main");
    mainE.addEventListener("click", clickAnswerHandler);
}

function clickAnswerHandler(event) {
    var quiz = Model.get_quiz();
    var target = event.target;
    
    if (target.closest("li")) {
        // correct answer was selected => increment score
        if (quiz[currentQuestion].correct === target.id) {
            currentScore++;
        }

        currentQuestion++;

        // not a last question
        if (currentQuestion < quiz.length) {
            view.main_view(quiz[currentQuestion]);
        } else {
            console.log("score = " + currentScore);
            console.log("finish!");
        }
    }
}