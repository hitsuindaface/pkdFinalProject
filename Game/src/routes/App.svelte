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
	<div><button on:click={toggleModal}>Start</button></div>
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




	@media (min-width: 640px) {
		main {
			max-width: none;
		}
	}
</style>