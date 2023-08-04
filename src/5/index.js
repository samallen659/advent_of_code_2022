"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const helpers_1 = require("../helpers");
const stack_1 = require("./stack");
const input = (0, helpers_1.getFileContents)("./input.txt");
function stackStringToArray(stackData) {
    return stackData
        .split("\n")
        .map((line) => line.split("").filter((a, index) => index % 4 === 1));
}
function populateStacks(stackDataArray, stackArray) {
    for (let y = stackDataArray.length - 2; y > -1; y--) {
        for (let x = 0; x < stackDataArray[y].length; x++) {
            const data = stackDataArray[y][x];
            if (data !== " ") {
                stackArray[x].push(data);
            }
        }
    }
}
function stackFactory(stackData) {
    const stackDataArray = stackStringToArray(stackData);
    const stackArray = [];
    for (let i = 0; i < stackDataArray[0].length; i++) {
        stackArray.push(new stack_1.Stack());
    }
    populateStacks(stackDataArray, stackArray);
    return stackArray;
}
function getMoveData(move) {
    const moveDataArray = move.match(/\d+/g);
    if (!moveDataArray)
        throw new Error("Could not get move data from provided string");
    return moveDataArray;
}
function processMove(stackArray, moveAmount, moveFrom, moveTo) {
    for (let i = 0; i < moveAmount; i++) {
        const movedItem = stackArray[moveFrom - 1].pop();
        stackArray[moveTo - 1].push(movedItem);
    }
}
function getStringFromTopItemInStacks(stackArray) {
    let returnString = "";
    for (let i = 0; i < stackArray.length; i++) {
        returnString += stackArray[i].peek();
    }
    return returnString;
}
function partOne(input) {
    const [stackData, moveData] = input.split("\n\n");
    const stackArray = stackFactory(stackData);
    moveData
        .split("\n")
        .filter(Boolean)
        .map((move) => {
        const [moveAmount, moveFrom, moveTo] = getMoveData(move);
        processMove(stackArray, Number(moveAmount), Number(moveFrom), Number(moveTo));
    });
    console.log(getStringFromTopItemInStacks(stackArray));
}
function processMoveTwo(stackArray, moveAmount, moveFrom, moveTo) {
    const movedItems = [];
    for (let i = 0; i < moveAmount; i++) {
        movedItems.push(stackArray[moveFrom - 1].pop());
    }
    for (let j = movedItems.length - 1; j > -1; j--) {
        stackArray[moveTo - 1].push(movedItems.pop());
    }
}
function partTwo(input) {
    const [stackData, moveData] = input.split("\n\n");
    const stackArray = stackFactory(stackData);
    moveData
        .split("\n")
        .filter(Boolean)
        .map((move) => {
        const [moveAmount, moveFrom, moveTo] = getMoveData(move);
        processMoveTwo(stackArray, Number(moveAmount), Number(moveFrom), Number(moveTo));
    });
    console.log(getStringFromTopItemInStacks(stackArray));
}
partOne(input);
partTwo(input);
