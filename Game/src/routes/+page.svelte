<script lang="ts">
	import Category from './category.svelte';
	import LeaderBoard from './leaderBoard.svelte';
	import Quiz from './quiz.svelte';
	import SignIn from './signIn.svelte'
	let showModal = false;
	let is_right = false;
	let showLeaderB = false;
	let show_category = false;
	let game_over = false;																															 
	let signedIn = false;

	/** 
 * Returns a new function which when applied to an argument, has the same effect 
 * as applying the specified function to the same argument n times. 
 * @example 
 * const plusTen = repeat(x => x + 2, 5); 
 * plusTen(0); // Returns 10 
 * @param {function} func - the function to be repeated 
 * @param {number} n - the number of times to repeat the function 
 * @return {function} the new function that has the same effect as func repeated n times 
 */

function toggleModal(){
	showModal = !showModal;
}
function toggleLeaderB(){
	showLeaderB = !showLeaderB;
}
function toggleCategory(){
	show_category = !show_category;
}
function toggle_signIn(){
	signedIn = !signedIn;
}

</script>

<LeaderBoard {showLeaderB} on:click = {toggleCategory}></LeaderBoard>
<Quiz {showModal} on:click = {toggleModal}/>
<Category {show_category} on:click = {toggleCategory}/>
<SignIn {signedIn} on:click = {toggle_signIn}></SignIn>
<main>
	<p>Welcome to quizzi!</p>
	<div><button class = "button-1" on:click={toggleModal}>Start</button></div>
	<div><button class = "button-1" on:click={toggleCategory}>Categories</button></div>
	<div><button class = "button-1" on:click={toggleLeaderB}>Leader board</button></div>
	
</main>

<style>
	main {
		text-align: center;
		padding: 1em;
		max-width: 240px;
		margin: 0 auto;
	}

	p {
		color: black;
		text-transform: uppercase;
		font-size: 4em;
		font-weight: 100;
	}

p{
    color: #333;
	margin: 0;
	padding: 8px;
	box-sizing: border-box;
	font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen-Sans, Ubuntu, Cantarell, "Helvetica Neue", sans-serif;

}
button{
    font-size: 3em;
	background-image: linear-gradient(-180deg, #88cfed 0%, #23a2d8 100%);
    font-weight: 100;
    border-radius: 10px;
    color: white;
	background-color: #fa5050;
	outline: none;
    width: auto;
    height: auto;
    margin: 3%;
}
.button-1:hover {
  background-image: linear-gradient(-180deg, #27c4ef 0%, rgb(23, 121, 157) 100%);
}

@media (min-width: 768px) {
  .button-1 {
    padding: 1rem 2rem;
  }
} 

	@media (min-width: 640px) {
		main {
			max-width: none;
		}
	}

    
</style>


