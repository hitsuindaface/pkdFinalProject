<script lang="ts">
    import { endGame } from "./endGame";
    import {type Question, Questions} from "./questionLib";
    import {next_question, ranomize_alternatives} from "./gameFunction";
	import { element } from "svelte/internal";
    export let showModal = false;
    

    let totalScore = 0;
    let currentScore = 100;
    let questionsAnswered = 0;
    let game_over = false;
    let used_questions: Question[] = [];
    let current: Question = next_question(Questions, used_questions);
    $: alts = ranomize_alternatives(current.alternatives);

    function check(question: Question, choice: String): boolean{
        return question.answer === choice;
    }

    function score_add(is_right: boolean){
        if (is_right){
            totalScore = totalScore + currentScore;
            currentScore = 100;
            questionsAnswered++;

            if( questionsAnswered === 7) {
                endGame.game_over = true;
            } else {}
            /* if(used_questions.length !== Questions.length){
                
                if(used_questions.length === Questions.length) {
                    used_questions = [];
                }  
                used_questions.push(current);
                current = next_question(Questions, used_questions);

            }else{
                used_questions = [];
                game_over = true;
                
            }*/
        } else {
            currentScore = currentScore - 25;
        }   
    } 

    function toggleModal(){
        showModal = !showModal;
    }



</script>

<main>
{#if showModal}
    {#if !game_over}
        <div class = "backdrop">  
            
            <div class = "Quiz">
                
                <div>
                    <h1>{current.question}</h1> 
                </div>
                <button on:click={() => score_add(check(current, alts[0]))}>{alts[0]}</button> 
                <button on:click={() => score_add(check(current, alts[1]))}>{alts[1]}</button> 
                <button on:click={() => score_add(check(current, alts[2]))}>{alts[2]}</button> 
                <button on:click={() => score_add(check(current, alts[3]))}>{alts[3]}</button> 
            </div>
            
            <div>
                <h2>Your score is: {totalScore}</h2>
                
            </div>
            <div class = "exit">
                <button on:click|self>Exit to menu</button>
            </div>
            
        </div>
    {:else}
        <div class = "backdrop">
            <div>
                <p>Game over!</p>
                <!-- <p>Your score was {totalScore}</p> -->
            </div>
            <div class = "exit">
                <button on:click|self>Exit to menu</button>
            </div>
            
        </div>
        
    {/if}
{/if}




</main>

<style>

.backdrop{
        width: 100%;
        height: 100%;
        position: fixed;
        background: rgb(255, 255, 255);
    }
.Quiz{
        font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen-Sans, Ubuntu, Cantarell, "Helvetica Neue", sans-serif;

        padding:1px;
        border-radius: 10px;
        
        margin: 5% auto;
        text-align: center;
        background-color: white;
    }
    h1{
        font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen-Sans, Ubuntu, Cantarell, "Helvetica Neue", sans-serif;
        color: rgb(71, 70, 70);
        font-size: 3em;
        font-weight: 300;
    }
    
 h2 {
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen-Sans, Ubuntu, Cantarell, "Helvetica Neue", sans-serif;

    text-align: center;
    color: #4fc1e4;
    font-size: 3em;
    font-weight: 100;
    }
 
button{
    border-radius: 10px;
    max-width: 40%;
    margin: 5% auto;
    text-align: center;
    max-height: 50px;
/*    color: #07c0f8;*/
    font-size: 2em;
    font-weight: 100;
    color: rgb(56, 54, 54);
	background-color: #d9f2fb;
	outline: none;

}
.exit{
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen-Sans, Ubuntu, Cantarell, "Helvetica Neue", sans-serif;

padding:1px;
border-radius: 10px;

margin: 5% auto;
text-align: center;
background-color: white;
}

p{
    text-align: center;
    color: #3cc6ec;
    font-size: 3em;
    font-weight: 100;
}


</style>



