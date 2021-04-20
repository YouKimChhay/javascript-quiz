/**
 * View in MVC to support JavaScript Quiz application.
 */

/**
 * Private helper function that apply the template to the element.
 * Refer to https://handlebarsjs.com/guide/#installation for details.
 * 
 * elementId - where the HTML content should be displayed
 * templateId - which template to use
 * data - the content that need to fill in
 */
function applyTemplate(elementId, templateId, data) {
    const template = Handlebars.compile(document.getElementById(templateId).textContent);
    document.getElementById(elementId).innerHTML = template(data);
}

/**
 * homepage view
 */
export function homeView() {
    applyTemplate("content", "home-template");
}

/**
 * quiz view
 * 
 * timer - the time remained
 * quiz - the current question
 */
export function quizView(timer, quiz) {
    var data = {
        "timer": timer,
        "question": quiz.question,
        "answer": quiz.answer,
    }
    applyTemplate("content", "quiz-template", data);
}

/**
 * finish and record score view
 * 
 * score - the current score (for correct answer)
 * nQuestions - number of questions for the current quiz
 * timer - time remained
 * error - any error message
 */
export function finishView(score, nQuestions, timer, error) {
    var data = {
        "score": score,
        "nQuestions": nQuestions,
        "timer": timer,
        "error": error
    }
    applyTemplate("content", "finish-template", data);
}

/**
 * list of high score view
 * 
 * scores - list of score
 */
export function highScoreView(scores) {
    applyTemplate("content", "high-score-template", {"scores": scores});
}