import { User, Question, scoreLine } from "./BaseGame/QuestionStructure";


/**
 * 
 * @param user - User whose answer will be checked
 * @param question - question whose answer to be compared
 * 
 */
export function userCorrect(user: User, question: Question) {
    if (user.lastAns === question.answer) {
        user.points += user.points + 1;
    } else {}
}

let round: number = 10
/**
 * 
 * @returns - Either returns true, to end the program / move on from game loop or subtracts a round from the game loop
 * 
 */
export function gameEnd(): boolean | number {
    return  round === 0
            ? true
            : round -= 1;
}

/**
 * 
 * @param user1 - user whose points will be evaluated
 * @param user2 - user whose points will be evaluated
 * @returns - winning user OR adds golden round to game
 */

export function isWinner(userA: User, userB: User): scoreLine {
    function winner(a: User, b: User): User {
        return  a.points >= b.points  
                ? a
                : b
    }
    let finalScore: scoreLine = {
                                user1: userA.points,
                                user2: userB.points,
                                winner: winner(userA, userB)
                                }
    return finalScore;
}