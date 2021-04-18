

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
        "answer": quiz.answer
    }
    apply_template("main", "main-template", data);
}