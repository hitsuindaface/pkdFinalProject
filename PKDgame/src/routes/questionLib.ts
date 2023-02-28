export type Alternatives = [String, String, String, String];

export type Question = {
    question: String,
    answer: string, 
    alternatives: Alternatives
}

export const Questions: Question[] = [
                                {question: "What country has the highest life expectancy?", 
                                 answer: "Hong Kong", 
                                 alternatives: ["Hong Kong", "Japan", "Italy", "Iceland"]},
                                 {question: "Aureolin is a shade of what color?", 
                                 answer: "Yellow", 
                                 alternatives: ["Yellow", "Blue", "Red", "Purple"]},
                                 {question: "Who was the last Tsar of Russia?", 
                                 answer: "Nicholas II", 
                                 alternatives: ["Nicholas II", "Peter I", "Peter II", "Alexander I"]},
                                 {question: "How many bones do we have in an ear?", 
                                 answer: "3", 
                                 alternatives: ["3", "2", "7", "5"]},
                                 {question: "What is the only continent with land in all four hemispheres?", 
                                 answer: "Africa", 
                                 alternatives: ["Africa", "Asia", "North America", "South America"]},
                                 {question: "What country drinks the most coffee?", 
                                 answer: "Finland", 
                                 alternatives: ["Finland", "Sweden", "Norway", "Denmark"]},
                                 {question: "When was Uppsala University founded?", 
                                 answer: "1477", 
                                 alternatives: ["1477", "1776", "1673", "1786"]},
                                 {question: "Judo is a japanese martial art, but what does 'judo' mean?", 
                                 answer: "The gentle way", 
                                 alternatives: ["The gentle way", "The japanese way", "The honorable way", "The warrior way"]},];




