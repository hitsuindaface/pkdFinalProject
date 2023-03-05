export type Alternatives = [String, String, String, String];
export let currentCat = 3;

export function selectCategory(newCat: number) {
    currentCat = newCat;
}

export type Question = {
    question: String,
    answer: string, 
    alternatives: Alternatives
}

const geography: Question[] = [
    {question: "What is the largest country by land area in the world?",
    answer: "Russia",
    alternatives: ["Canada", "China", "Brazil", "Russia"]},

    {question: "What is the capital city of Spain?",
    answer: "Madrid",
    alternatives: ["Barcelona", "Seville", "Valencia", "Madrid"]},

    {question: "What is the smallest continent in the world?",
    answer: "Australia",
    alternatives: ["Europe", "North America", "Australia", "Africa"]},

    {question: "What is the capital city of Japan?",
    answer: "Tokyo",
    alternatives: ["Osaka", "Tokyo", "Hiroshima", "Nagasaki"]},

    {question: "What is the highest mountain peak in Africa?",
    answer: "Mount Kilimanjaro",
    alternatives: ["Mount Everest", "Mount Kilimanjaro", "Mount Elbrus", "Mount Aconcagua"]},

    {question: "What is the longest river in South America?",
    answer: "Amazon River",
    alternatives: ["Orinoco River", "Amazon River", "Magdalena River", "São Francisco River"]},

    {question: "What is the largest desert in the world?",
    answer: "Sahara Desert",
    alternatives: ["Gobi Desert", "Mojave Desert", "Arabian Desert", "Sahara Desert"]},

    {question: "What is the capital city of France?",
    answer: "Paris",
    alternatives: ["Marseille", "Lyon", "Bordeaux", "Paris"]},

    {question: "What is the largest island in the world?",
    answer: "Greenland",
    alternatives: ["Australia", "Madagascar", "Greenland", "Sumatra"]},

    {question: "What is the capital city of Brazil?",
    answer: "Brasília",
    alternatives: ["São Paulo", "Rio de Janeiro", "Salvador", "Brasília"]}
]

const enternainment: Question[] = [
    {question: "Who directed the movie 'The Dark Knight'?",
    answer: "Christopher Nolan",
    alternatives: ["Quentin Tarantino", "Christopher Nolan", "Steven Spielberg", "James Cameron"]},
    
    {question: "What is the highest-grossing movie of all time?",
    answer: "Avatar",
    alternatives: ["Avatar", "Avengers: Endgame", "Star Wars: The Force Awakens", "Jurassic World"]},
    
    {question: "Which artist has won the most Grammy Awards?",
    answer: "Georg Solti",
    alternatives: ["Beyoncé", "Taylor Swift", "Stevie Wonder", "Georg Solti"]},
    
    {question: "What is the best-selling album of all time?",
    answer: "Thriller by Michael Jackson",
    alternatives: ["Back in Black by AC/DC", "The Bodyguard Soundtrack", "Thriller by Michael Jackson", "Rumours by Fleetwood Mac"]},

    {question: "Which actor played the character of James Bond in the most films?",
    answer: "Roger Moore",
    alternatives: ["Sean Connery", "Roger Moore", "Pierce Brosnan", "Timothy Dalton"]},

    {question: "Who won the Academy Award for Best Actress in 2021?",
    answer: "Frances McDormand",
    alternatives: ["Viola Davis", "Andra Day", "Frances McDormand", "Vanessa Kirby"]},

    {question: "What is the name of the highest-grossing Broadway musical of all time?",
    answer: "The Lion King",
    alternatives: ["Wicked", "The Lion King", "Les Miserables", "Hamilton"]},

    {question: "Who created the television series 'The Office'?",
    answer: "Ricky Gervais",
    alternatives: ["Steve Carell", "Tina Fey", "Mitchell Hurwitz", "Ricky Gervais"]},

    {question: "What is the highest-rated television show on IMDb?",
    answer: "Planet Earth II",
    alternatives: ["Breaking Bad", "Game of Thrones", "The Sopranos", "Planet Earth II"]},

    {question: "Who won the Academy Award for Best Director in 2021?",
    answer: "Chloe Zhao",
    alternatives: ["David Fincher", "Chloe Zhao", "Lee Isaac Chung", "Thomas Vinterberg"]}
]

const history: Question[] = [
    {question: "Which European explorer is credited with discovering America?",
    answer: "Christopher Columbus",
    alternatives: ["Vasco da Gama", "Christopher Columbus", "Leif Eriksson", "Juan Ponce de León"]},

    {question: "What was the name of the conflict fought between 1939 and 1945 that involved many of the world's major powers?",
    answer: "World War II",
    alternatives: ["World War I", "World War II", "Vietnam War", "Korean War"]},

    {question: "Who was the first president of the United States?",
    answer: "George Washington",
    alternatives: ["Thomas Jefferson", "Abraham Lincoln", "George Washington", "Franklin D. Roosevelt"]},

    {question: "What was the name of the period of political and social upheaval in France that lasted from 1789 to 1799?",
    answer: "The French Revolution",
    alternatives: ["The Renaissance", "The Enlightenment", "The Industrial Revolution", "The French Revolution"]},

    {question: "What was the name of the political ideology that was characterized by state ownership of the means of production and a planned economy?",
    answer: "Communism",
    alternatives: ["Fascism", "Capitalism", "Socialism", "Communism"]},

    {question: "What was the name of the war fought between North Vietnam and South Vietnam from 1955 to 1975?",
    answer: "The Vietnam War",
    alternatives: ["The Korean War", "The Vietnam War", "The First Indochina War", "The Second Indochina War"]},

    {question: "What was the name of the system of racial segregation that was enforced in South Africa from 1948 to 1994?",
    answer: "Apartheid",
    alternatives: ["Apartheid", "Slavery", "Colonialism", "Segregation"]},

    {question: "Who was the leader of the Soviet Union during World War II?",
    answer: "Joseph Stalin",
    alternatives: ["Vladimir Lenin", "Joseph Stalin", "Mikhail Gorbachev", "Leonid Brezhnev"]},

    {question: "What was the name of the dynasty that ruled China from 1368 to 1644?",
    answer: "Ming Dynasty",
    alternatives: ["Qing Dynasty", "Han Dynasty", "Tang Dynasty", "Ming Dynasty"]},

    {question: "What was the name of the period of artistic and cultural development that took place in Europe from the 14th to the 17th century?",
    answer: "The Renaissance",
    alternatives: ["The Enlightenment", "The Reformation", "The Industrial Revolution", "The Renaissance"]}
]

export const Questions: Array<Array<Question>> = [geography, enternainment, history];
