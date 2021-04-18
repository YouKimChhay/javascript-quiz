

function apply_template(elementId, templateId, data) {
    const template = Handlebars.compile(document.getElementById(templateId).textContent);
    document.getElementById(elementId).innerHTML = template(data);
}

export function home_view(numberOfQuestions) {
    apply_template("content", "home-template", {"numberOfQuestions": numberOfQuestions});
}

export function quiz_view(timer, quiz) {
    var data = {
        "timer": timer,
        "question": quiz.question,
        "answer": quiz.answer,
    }
    apply_template("content", "quiz-template", data);
}

export function finish_view(score, error) {
    var data = {
        "score": score,
        "error": error
    }
    apply_template("content", "finish-template", data);
}

export function high_score_view(scores) {
    apply_template("content", "high-score-template", {"scores": scores});
}