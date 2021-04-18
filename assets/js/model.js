export {Model};

const Model = {

    quiz1_file: './assets/files/quiz1.json',
    quiz: [],

    get_data: function() {
        fetch(this.quiz1_file)
        .then(response => response.json())
        .then(
            data => {
                this.set_quiz(data);
                window.dispatchEvent(new CustomEvent("modelUpdated", {detail: this}));
            }
        );
    },

    set_quiz: function(data) {
        this.quiz = data.quiz;
    },

    get_quiz: function() {
        return this.quiz;
    }
}