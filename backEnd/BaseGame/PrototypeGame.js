"use strict";
exports.__esModule = true;
var QuestionStructure_1 = require("./QuestionStructure");
var PromptSync = require("prompt-sync");
var prompt = PromptSync({ sigint: true });
function ask_question(current) {
    console.log(current.question);
    for (var i = 0; i < 4; i++) {
        console.log((i + 1) + ") " + current.alternatives[i]);
    }
    var answer = prompt("Answer: ");
    if (current.alternatives[parseInt(answer)] === current.answer) {
        console.log("That's right!");
    }
    else {
        console.log("Not quite... Actually it's " + current.answer);
    }
}
function game_loop() {
    var NumofQuestions = QuestionStructure_1.Questions.length;
    var run = true;
    while (run) {
        var current = Math.round(Math.random() * (NumofQuestions - 1));
        ask_question(QuestionStructure_1.Questions[current]);
    }
}
game_loop();
