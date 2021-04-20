# JavaScript Quiz Application

Last Modified: 20 April 2021
Author: You Kim Chhay

## General Information about the application
Refer to `REAME.md`

## Main Page - index.html
- `content` is the only main `div`.
- There are 4 templates.

### home template
- view the homepage and give the general information about the application
- a link to view the list of high score
- 3 buttons to start quiz 1, 2 and 3 respectively

### quiz template
- a link to view the list of high score
- a timer that show the time remained
- current question and multiple choice answers

### finish template
- a link to view the list of high score
- show information about the score and time remained
- input name/initial for record
- empty input and click submit show error message

### high score template
- show a list of high score
- a button to go back to homepage
- a button to clear the list and go back to homepage

## stylesheet
- `style.css` in `assets/css` folder is the only stylesheet used.

## json files
- There are 3 json files for 3 quiz sets.

## JavaScript
- Use Model View Controller (MVC) pattern.

### main.js as controller
- When window onload:
    * get/fetch data
    * load scores from localStorage if any

- When data is retrieved successfully, view homepage.

- When user clicks on the page:
    * handle start quiz 1
    * handle start quiz 2
    * handle start quiz 3
    * handle view high score
    * handle answer question (click on a choice from the list of answer)
    * handle submit score
    * handle go back button
    * handle clear high score

- Questions within the quiz set is shuffle at the beginning and whenever `reset()` is called.

- High Score is ordered by:
    * the quiz set
    * decreasing (high to low) score within the quiz set

- `reset()` reset global variables and shuffle questions. It is called when:
    * user submit/record score
    * the user view high score
    * click go back button
    * click clear high score button

### view.js as view
- apply data to each template view

### model.js as model
- a local store of data that the app can refer to.
