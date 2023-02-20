import { type Question, Questions} from './QuestionStructure'
import * as PromptSync from "prompt-sync";

const prompt: PromptSync.Prompt = PromptSync({ sigint: true });

function ask_question (current: Question) {
    console.log(current.question);
    for(let i = 0; i<4; i++){
        console.log((i+1) + ") " + current.alternatives[i]);
    }
    const answer = prompt("Answer: ");

    if(current.alternatives[parseInt(answer)] === current.answer){
        console.log("That's right!");
    } else { 
        console.log("Not quite... Actually it's " + current.answer !);
    }

}

function game_loop () {
    const NumofQuestions = Questions.length;
    const run = true;
    while(run) {
        const current: number = Math.round(Math.random() * (NumofQuestions-1));
        ask_question(Questions[current]);
    }
}

game_loop();