export {Model};

/**
 * Model class to support JavaScript Quiz application.
 * This class provides an interface to the web API and
 * a local store of data that the application can refer to.
 * The API generates an event for each quiz file updated.
 * eg. "modelUpdated1" event when quiz1File has been retrieved.
 */
const Model = {

    quiz1File: './assets/files/quiz1.json',
    quiz2File: './assets/files/quiz2.json',
    quiz3File: './assets/files/quiz3.json',
    quiz1: [],
    quiz2: [],
    quiz3: [],


    // get all of the 3 file
    getData: function() {
        this.getData1();
        this.getData2();
        this.getData3();
    },

    // get data from quiz1File
    getData1: function() {
        fetch(this.quiz1File)
        .then(response => response.json())
        .then(
            data => {
                this.setQuiz1(data);
                window.dispatchEvent(new CustomEvent("modelUpdated1", {detail: this}));
            }
        );
    },

    // get data from quiz2File
    getData2: function() {
        fetch(this.quiz2File)
        .then(response => response.json())
        .then(
            data => {
                this.setQuiz2(data);
                window.dispatchEvent(new CustomEvent("modelUpdated2", {detail: this}));
            }
        );
    },

    // get data from quiz3File
    getData3: function() {
        fetch(this.quiz3File)
        .then(response => response.json())
        .then(
            data => {
                this.setQuiz3(data);
                window.dispatchEvent(new CustomEvent("modelUpdated3", {detail: this}));
            }
        );
    },

    // setters
    setQuiz1: function(data) {
        this.quiz1 = data.quiz;
    },

    setQuiz2: function(data) {
        this.quiz2 = data.quiz;
    },

    setQuiz3: function(data) {
        this.quiz3 = data.quiz;
    },

    // getters
    getQuiz1: function() {
        return this.quiz1;
    },

    getQuiz2: function() {
        return this.quiz2;
    },

    getQuiz3: function() {
        return this.quiz3;
    }
}