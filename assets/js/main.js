import { Model } from "./model.js";
import * as view from "./view.js";


window.onload = function() {
    Model.get_data();
}

window.addEventListener("modelUpdated", function() {
    redraw();
})

function redraw() {

    var quiz = Model.get_quiz();
    console.log(quiz);
    for (var i = 0; i < quiz.length; i++) {
        console.log(quiz[i]);
    }

    view.header_view(300);
    view.main_view(quiz[0]);
}