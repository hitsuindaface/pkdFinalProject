
export function randomizeArr(length) {
    const arr = build_array(length, i => i);
    let temp = 0

    for (let i = length - 1; i > 0; i -= 1) {
        let num = Math.floor(Math.random() * i);
        temp = arr[i];
        arr[i] = arr[num];
        arr[num] = temp;
    } return arr;
}

export function isLastQuestion(length) {
    return length === 0 // checks if input length is 0
}

