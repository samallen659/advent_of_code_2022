import { getFileContents } from "../helpers";
import { Stack } from "./stack";

const input = getFileContents("./input.txt");

function stackStringToArray(stackData: string): Array<Array<string>> {
    return stackData
        .split("\n")
        .map((line) => line.split("").filter((a, index) => index % 4 === 1));
}

function populateStacks(
    stackDataArray: Array<Array<string>>,
    stackArray: Array<any>
): void {
    for (let y = stackDataArray.length - 2; y > -1; y--) {
        for (let x = 0; x < stackDataArray[y].length; x++) {
            const data = stackDataArray[y][x];
            if (data !== " ") {
                stackArray[x].push(data);
            }
        }
    }
}

function stackFactory(stackData: string) {
    const stackDataArray = stackStringToArray(stackData);
    const stackArray = [];
    for (let i = 0; i < stackDataArray[0].length; i++) {
        stackArray.push(new Stack());
    }
    populateStacks(stackDataArray, stackArray);
    return stackArray;
}

function getMoveData(move: string): Array<string> {
    const moveDataArray = move.match(/\d+/g);
    if (!moveDataArray) throw new Error("Could not get move data from provided string");
    return moveDataArray;
}

function processMove(
    stackArray: Array<any>,
    moveAmount: number,
    moveFrom: number,
    moveTo: number
): void {
    for (let i = 0; i < moveAmount; i++) {
        const movedItem = stackArray[moveFrom - 1].pop();
        stackArray[moveTo - 1].push(movedItem);
    }
}

function getStringFromTopItemInStacks(stackArray: Array<any>): string {
    let returnString = "";
    for (let i = 0; i < stackArray.length; i++) {
        returnString += stackArray[i].peek();
    }
    return returnString;
}

function partOne(input: string): void {
    const [stackData, moveData] = input.split("\n\n");
    const stackArray = stackFactory(stackData);
    moveData
        .split("\n")
        .filter(Boolean)
        .map((move) => {
            const [moveAmount, moveFrom, moveTo] = getMoveData(move);
            processMove(stackArray, Number(moveAmount), Number(moveFrom), Number(moveTo));
        });
    console.log(stackArray);
    console.log(getStringFromTopItemInStacks(stackArray));
}

partOne(input);
