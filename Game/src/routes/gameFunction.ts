import { type Question, Questions, type Alternatives} from './questionLib';
import { type ProbingHashtable, ph_empty, probe_linear, ph_keys, ph_lookup, ph_insert} from './hashtables';
import { tail, is_null, head} from './list'
import {length, list_ref, build_array} from './list_prelude'
import { set_custom_element_data_map } from 'svelte/internal';

type List<T> = null | [T, List<T>];

export type person = {id: number, name:string, password:string, score:number};
export type users = person[];
export type Userhash = ProbingHashtable<number|null, person>;
const table_size = 30;

export function userHash(id: number) {
    return id % table_size;
}

export const usersTable: ProbingHashtable<any, person> = ph_empty(10, probe_linear(userHash));


export function next_question (qs: Array<Array<Question>>, 
                               category: number, used_questions: Question[]): Question {
    // Checks if the current category is "mixed"
    if(category >= 3) {
        while(true) {
            const nextCategory = Math.round(Math.random() * (2));
            const current = Math.round(Math.random() * (9));
            const test = used_questions.filter((x) => x === Questions[nextCategory][current])
            if(test.length === 0){
                return Questions[nextCategory][current];
            } else { }
        }
    } else {
        while(true) {
            console.log(category);
            const current = Math.round(Math.random() * (Questions[category].length-1));
            const test = used_questions.filter((x) => x === Questions[category][current])
            if(test.length === 0){
                return Questions[category][current];
            } else { }
        }
    }
}

export function ranomize_alternatives(alts: Alternatives): Alternatives {
    for (let i = alts.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        const temp = alts[i];
        alts[i] = alts[j];
        alts[j] = temp;
    }
    return alts; 
}

function add_user( usersTable: ProbingHashtable<number, person>, id: number, name: string, password: string){
    ph_insert(usersTable, userHash(id), {id: id, name: name, password: password, score: 0});

}


function change_score(current_user: person, total_score:number):void{
    
    if(current_user.score < total_score){
        current_user.score = total_score;
    }else{}

}
export function merge_sort(A: users){ 
    merge_sort_helper(A, 0, A.length - 1); 
} 
function merge_sort_helper(A:users, low:number, high:number){ 
    if (low < high) { 
        const mid = Math.floor((low + high) / 2); 
        merge_sort_helper(A, low, mid); 
        merge_sort_helper(A, mid + 1, high); 
        merge(A, low, mid, high); 
    } else {} 
} 
function merge(A:users, low: number, mid: number, high: number){ 
    const B = []; // temporary array 
    let left = low; 
    let right = mid + 1; 
    let Bidx = 0; 
    while (left <= mid && right <= high) { 
        if (A[left].score <= A[right].score) { 
            B[Bidx] = A[left]; 
            left = left + 1; 
        } else { 
            B[Bidx] = A[right]; 
            right = right + 1; 
        } 
        Bidx = Bidx + 1; 
    }
}
export function bubbleSort(arr: users): users {
    const len = arr.length-1;
    for (let i = 0; i < len; i++) {
        for (let j = 0; j < len; j++) {
            if (arr[j].score < arr[j + 1].score) {
                let swap = arr[j];
                arr[j] = arr[j + 1];
                arr[j + 1] = swap;
            }
        }
    }
    return arr;
}
function filter_nulls_arr(arr:Array<number | null>): Array<number | null>{
    const len = arr.length;
    let filtered_array: Array<number | null> = [];
    for(let i = 0; i<len; i++){
        const x: number | null = arr[i];
        if (x !== undefined || x !== null){
            filtered_array.push(x);
        } else {}
    }
    return filtered_array;
}
export function leader_board(usersTable: Userhash): users{

    const temp = filter_nulls_arr(build_array(usersTable.length, i => usersTable.keys[i]))
    const len = temp.length
    let usersArray: users = [];
    for(let i = 0; i > len; i++){
        let value = ph_lookup(usersTable, temp[i]);
        if(value !== undefined){
            usersArray.push(value);    
        } else {}
    }
    
    bubbleSort(usersArray);

    return usersArray;

}
