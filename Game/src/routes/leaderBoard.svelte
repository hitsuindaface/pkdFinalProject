<script lang="ts">
    import{ph_insert, ph_lookup} from './hashtables'
    import {type users, leader_board, usersTable, userHash, merge_sort, bubbleSort} from './gameFunction'
   /*  export let usersArray: users = [{id:0, name:"Emma", password:"2ee", score: 10},
                                    {id:4, name:"Liam", password:"77", score: 100}]; */

    export let showLeaderB = false;
     ph_insert(usersTable, userHash(10), {id:10, name:"Emma", password:"2ee", score: 1000});
    ph_insert(usersTable, userHash(4), {id:4, name:"Liam", password:"77", score: 100});
    ph_insert(usersTable, userHash(7), {id:4, name:"Alex", password:"47", score: 150}); 
    let array: users = [{id:0, name:"Emma", password:"2ee", score: 1000},
    {id:4, name:"Liam", password:"77", score: 100},
    {id:4, name:"Alex", password:"47", score: 150}];
    
    bubbleSort(array);
    function toggleLeaderB(){
	    showLeaderB = !showLeaderB;
    }
    let arr = leader_board(usersTable);
    
</script>

<main>
    {#if showLeaderB}
        <div class = "backdrop">
            <h1>Leader Board</h1>
            {#each arr as user}
                <div>
                    <p class="person"> {user.name}, Highest score: {user.score}</p>
                </div>
            {/each}
            <div>
                <button class = "exit" on:click={()=>toggleLeaderB()}>Exit to menu</button>
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

    main {
        font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen-Sans, Ubuntu, Cantarell, "Helvetica Neue", sans-serif;
        border-radius: 10px;
        text-align: center;
        color: #1ba8d3;
        font-size: 2em;
        font-weight: 400;
        margin: 5% auto;
        text-align: center;
        background-color: white;
  
}
.person{
    margin:3% 20%;
    border-radius: 30px;
    padding: 3%;
    border: 4px rgb(30, 139, 197) solid;
    
}
.person:hover{
    background-image: linear-gradient(-180deg, #9bcde379 0%, #59a9cba7 100%);
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
