type alternatives = [String, String, String, String];

// subject to change
// Dont know what is the best way to save and answer 
// and still easily show the alternatives
export type Question = {
    question: String,
    answer: string, 
    alternatives
}

export const Questions: Question[] = [
                                {question: "What is 1+1?", answer: "2", alternatives: ["4", ".5", "2", "1"]},
                                {question: "What is 1+2?", answer: "3", alternatives: ["3", "4", "1", "2"]}];




