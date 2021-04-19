export {Model};

const Model = {

    quiz1File: './assets/files/quiz1.json',
    quiz2File: './assets/files/quiz2.json',
    quiz1: [],
    quiz2: [],

    getData: function() {
        this.getData1();
    },

    getData1: function() {
        fetch(this.quiz1File)
        .then(response => response.json())
        .then(
            data => {
                this.setQuiz1(data);
                window.dispatchEvent(new CustomEvent("modelUpdated", {detail: this}));
            }
        );
    },

    getData2: function() {
        fetch(this.quiz2File)
        .then(response => response.json())
        .then(
            data => {
                this.setQuiz2(data);
                window.dispatchEvent(new CustomEvent("modelUpdated", {detail: this}));
            }
        );
    },

    setQuiz1: function(data) {
        this.quiz1 = data.quiz;
    },

    setQuiz2: function(data) {
        this.quiz2 = data.quiz;
    },

    getQuiz1: function() {
        return this.quiz1;
    },

    getQuiz2: function() {
        return this.quiz2;
    }
}