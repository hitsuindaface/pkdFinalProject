<script lang="ts">

	import Quiz from './quiz.svelte';
	let showModal = false;
	let is_right = false;
	let showLeaderB = false;
	

/* function handleClick(question, response){
	is_right = !is_right;
} */
function toggleModal(){
	showModal = !showModal;
}
function toggleLeaderB(){
	showLeaderB = !showLeaderB;
}

</script>

<Quiz {showModal} on:click = {toggleModal}/>
<main>
	<p>Welcome to quizzi!</p>
	<div><button class = "button:hover" on:click={toggleModal}>Start</button></div>
	<button on:click={toggleLeaderB}>Leader board</button>
	
	
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
    font-weight: 100;
    border-radius: 10px;
    color: white;
	background-color: #fa5050;
	outline: none;
    width: auto;
    height: auto;
    margin: 3%;
}

	@media (min-width: 640px) {
		main {
			max-width: none;
		}
	}
/* .button:hover {
  background-color: #4eb5f1;
  color: #fff;
} */
   
/* CSS */
/* .button-43 {
    position:auto;
  background-image: linear-gradient(-180deg, #37AEE2 0%, #1E96C8 100%);
  border-radius: .5rem;
  box-sizing: border-box;
  color: #FFFFFF;
  display: flex;
  font-size: 16px;
  justify-content: center;
  padding: 1rem 1.75rem;
  text-decoration: none;
  width: 50%;
  
  border: 0;
  cursor: pointer;
  user-select: none;
  -webkit-user-select: none;
  touch-action: manipulation;
}

.button-43:hover {
  background-image: linear-gradient(-180deg, #1D95C9 0%, #17759C 100%);
}

@media (min-width: 768px) {
  .button-43 {
    padding: 1rem 2rem;
  }
} */
    
</style>


