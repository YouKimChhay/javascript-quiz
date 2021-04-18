

function apply_template(elementId, templateId, data) {
    const template = Handlebars.compile(document.getElementById(templateId).textContent);
    document.getElementById(elementId).innerHTML = template(data);
}

export function header_view(timer) {
    apply_template("header", "header-template", {"timer": timer});
}

export function main_view(quiz) {
    var data = {
        "question": quiz.question,
        "answer": quiz.answer,
    }
    apply_template("main", "main-template", data);
}

export function main_finish_view(score, error) {
    var data = {
        "score": score,
        "error": error
    }
    apply_template("main", "main-finish-template", data);
}

export function high_score_view(scores) {
    apply_template("main", "high-score-template", {"scores": scores});
}