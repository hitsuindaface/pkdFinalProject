<script lang="ts">
    import {Questions, currentCat} from "./questionLib";
    import { usersTable, type person, userHash} from './gameFunction';
    import { type ProbingHashtable, ph_insert, ph_lookup, ph_keys} from "./hashtables";

    export let signedIn = false;
    let curr_id = 0;
    let curr_username = "";
    let curr_password = "";
    let user_exists = false;
    let unknown = true;
    let current_person: person = {id: 0, name:"b", password:"", score:0}
    ph_insert(usersTable, userHash(10), {id:10, name:"Emma", password:"2", score: 1000});
    ph_insert(usersTable, userHash(4), {id:4, name:"Liam", password:"77", score: 100});
    ph_insert(usersTable, userHash(7), {id:4, name:"Alex", password:"47", score: 150});

    function id_input(e:any): void{
        curr_id = parseInt(e.target.value);
    }
    function name_input(e:any): void{
        curr_username = e.target.value;
    }
    function password_input(e:any): void{
        curr_password = e.target.value;
    }
    function logIn(){
        user_exists = true;
        unknown = false;
    }
    function create_user(){
        user_exists = false;
        unknown = !unknown;
    }
    function add_user( usersTable: ProbingHashtable<number, person>, id: number, name: string, password: string){
        ph_insert(usersTable, userHash(id), {id: id, name: name, password: password, score: 0});
        user_exists = !user_exists;
    }

function check(usersTable: ProbingHashtable<number, person>, id: number, name: string, password: string){
    const person:person|undefined = ph_lookup(usersTable, id);
    if (person) {
        if(name === person.name && password === person.password){
            current_person = person;
            signedIn = !signedIn;
        }else{}
    }else{}
}
   /*  function check(usersTable: ProbingHashtable<number, person>, id: number, name: string, password: string){
        const person:person|undefined = ph_lookup(usersTable, id);
        if(person !== undefined){
            if(name === JSON.stringify(person.name)){
                current_person = person;
                signedIn = true;
            }else{}
        }else{}
    } */
    


</script>

<main>
    {#if !signedIn}
        {#if unknown}
            <div class = "backdrop"> 
                <button on:click = {()=> logIn()}>Log in</button>
                <button on:click = {()=> create_user()}>Create new user</button>
            </div>
        {:else}
            {#if !user_exists}
            <div class = "backdrop"> 
                <p>Enter ID (numbers)</p><input type="text" on:input={id_input}>
                <p>Enter user name</p><input type="text" on:input={name_input}>
                <p>Enter password</p><input type="text" on:input={password_input}>
                <button on:click ={()=>add_user(usersTable, curr_id, curr_username, curr_password)}>create user</button>
            </div>
            {:else}
            <div class = "backdrop">
                <p>Enter ID (numbers)</p><input type="text" on:input={id_input}>
                <p>Enter user name</p><input type="text" on:input={name_input}>
                <p>Enter password</p><input type="text" on:input={password_input}>
                <button on:click ={()=>check(usersTable, curr_id, curr_username, curr_password)}>log in</button>
                <p>{curr_username} {ph_lookup(usersTable, 10)?.name}</p>
            </div>
            {/if}
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






</style>

