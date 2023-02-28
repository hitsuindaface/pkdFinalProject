import { type Question, Questions, type Alternatives} from './questionLib';
type person = {name:string, password:string, score:number};
type users = person[];

export function next_question (qs: Question[], used_questions: Question[]): Question {
    while(true) {
        const current = Math.round(Math.random() * (Questions.length-1));
        const test = used_questions.filter((x) => x === Questions[current])
        if(test.length === 0){
            return Questions[current];
        } else { }
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

function add_user(name: string, password: string){

    return {name: name, password: password, score: 0};

}


function change_score(current_user: person, total_score:number):void{
    
    if(current_user.score < total_score){
        current_user.score = total_score;
    }else{}

}
function merge_sort(A: users){ 
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
        if (A[left] <= A[right]) { 
            B[Bidx] = A[left]; 
            left = left + 1; 
        } else { 
            B[Bidx] = A[right]; 
            right = right + 1; 
        } 
        Bidx = Bidx + 1; 
    }
}

function leader_board(users:users):users{



    return users;

}
