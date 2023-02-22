import { User, Question } from "./BaseGame/QuestionStructure";


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

export function isWinner(user1: User, user2: User): User | number {
    return  user1.points > user2.points
            ? user1
            : user1.points === user2.points
                ? round += 1 // if the score is even, add a golden goal round
                : user2
}