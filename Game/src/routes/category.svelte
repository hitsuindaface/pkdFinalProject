<script lang="ts">
    import Quiz from './quiz.svelte';
    import { currentCat , selectCategory } from './questionLib';
    export let show_category = false;
    //export let current_category = "mixed";
    export let showModal = false;
    const category1 = "space"
    const category2 = "history"

    enum categories {
        geography, 
        entertainment,
        history,
        mixed,
    }

    function toggleModal(): void{
	    showModal = !showModal;
    }
    function select_category(cat: number): void{
        selectCategory(cat);
        show_category = !show_category;
        showModal = !showModal;
        
    }
    function toggleCategory(){
	    show_category = !show_category;
    }
</script>

<Quiz {showModal} on:click = {toggleModal}/>
<main>
{#if show_category}
    <div class = "backdrop">
        <div>Select a category</div>
        <button class="button-43" on:click = {()=>select_category(categories.geography)}>Geography</button>
        <button class="button-43" on:click = {()=>select_category(categories.entertainment)}>Entertainment</button>
        <button class="button-43" on:click = {()=>select_category(categories.history)}>History</button>
        <button class="button-43" on:click = {()=>select_category(categories.mixed)}>Mixed</button>
        <div>
            <button class = "exit" on:click= {()=>toggleCategory()}>Exit to menu</button>
        </div>
    
    </div>
    
{/if}



</main>

<style>

    .backdrop{
        width: 100%;
        height: 100%;
        position: fixed;
        background: rgb(255, 255, 255);
        
        
    }
    main{
        font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen-Sans, Ubuntu, Cantarell, "Helvetica Neue", sans-serif;
        padding:1px;
        border-radius: 10px;
        text-align: center;
        color: #4fc1e4;
        font-size: 3em;
        font-weight: 100;
        margin: 5% auto;
        text-align: center;
        background-color: white;
        
    }
    /* .button:hover {
    background-color: #4eb5f1;
    color: #fff;
    }  */


    .button-43 {
        margin: auto;
        margin-top: 5%;
        position:auto;
        background-image: linear-gradient(-180deg, #88cfed 0%, #23a2d8 100%);
        border-radius: .5rem;
        box-sizing: border-box;
        color: #FFFFFF;
        display: flex;
        font-size: 20px;
        justify-content: center;
        padding: 1rem 1.75rem;
        text-decoration: none;
        width: 30%;
        position:relative;
        border: 0;
        cursor: pointer;
        user-select: none;
        -webkit-user-select: none;
        touch-action: manipulation;
    }

    .button-43:hover {
    background-image: linear-gradient(-180deg, #36a5d5 0%, #2694c3 100%);
    }

    @media (min-width: 768px) {
    .button-43 {
        padding: 1rem 2rem;
    }
    } 
    .exit {
        margin: auto;
        margin-top: 20%;
        position:auto;
        background-image: linear-gradient(-180deg, #24d6ee 0%, #0e5e81 100%);
        border-radius: .5rem;
        box-sizing: border-box;
        color: #FFFFFF;
        display: flex;
        font-size: 20px;
        justify-content: center;
        padding: 1rem 1.75rem;
        text-decoration: none;
        width: 30%;
        position:relative;
        border: 0;
        cursor: pointer;
        user-select: none;
        -webkit-user-select: none;
        touch-action: manipulation;
    }

    .exit:hover {
    background-image: linear-gradient(-180deg, #18739a 0%, #146c91 100%);
    }

    @media (min-width: 768px) {
    .exit {
        padding: 1rem 2rem;
    }
    } 

</style>



