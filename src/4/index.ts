import { getFileContents } from "../helpers";

const input = getFileContents("./input.txt");
const elfTasks = input.split("\n").filter(Boolean);

function arrayFromFirstAndLastDigits(first: number, last: number): Array<number> {
    const size = last - first + 1;
    return [...Array(size).keys()].map((i) => i + first);
}

function arrayIncludesFirstAndLastDigits(arr: Array<number>, first: number, last: number): boolean {
    if (arr.includes(first)) {
        if (arr.includes(last)) return true;
    }
    return false;
}

function sortArraysByLength(arr: Array<Array<number>>): Array<Array<number>> {
    return arr.sort((a, b) => b.length - a.length);
}

let pairCount = 0;
elfTasks.map((tasks) => {
    const tasksFirstAnfLastDigit = tasks.split(",").map((a) => a.split("-"));
    const firstElfTasks = arrayFromFirstAndLastDigits(
        Number(tasksFirstAnfLastDigit[0][0]),
        Number(tasksFirstAnfLastDigit[0][1])
    );
    const secondElfTasks = arrayFromFirstAndLastDigits(
        Number(tasksFirstAnfLastDigit[1][0]),
        Number(tasksFirstAnfLastDigit[1][1])
    );
    const elfSortedTasks = sortArraysByLength([firstElfTasks, secondElfTasks]);
    if (
        arrayIncludesFirstAndLastDigits(
            elfSortedTasks[0],
            elfSortedTasks[1][0],
            elfSortedTasks[1][elfSortedTasks[1].length - 1]
        )
    ) {
        pairCount += 1;
    }
});
console.log(pairCount);

console.log(
    sortArraysByLength([
        [1, 2, 3, 4],
        [1, 2, 3, 4, 5, 6],
    ])
);
