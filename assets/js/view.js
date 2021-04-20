

function applyTemplate(elementId, templateId, data) {
    const template = Handlebars.compile(document.getElementById(templateId).textContent);
    document.getElementById(elementId).innerHTML = template(data);
}

export function homeView() {
    applyTemplate("content", "home-template");
}

export function quizView(timer, quiz) {
    var data = {
        "timer": timer,
        "question": quiz.question,
        "answer": quiz.answer,
    }
    applyTemplate("content", "quiz-template", data);
}

export function finishView(score, nQuestions, timer, error) {
    var data = {
        "score": score,
        "nQuestions": nQuestions,
        "timer": timer,
        "error": error
    }
    applyTemplate("content", "finish-template", data);
}

export function highScoreView(scores) {
    applyTemplate("content", "high-score-template", {"scores": scores});
}