"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const helpers_1 = require("../helpers");
const input = (0, helpers_1.getFileContents)("./input.txt");
function moveHead(direction, headPosition) {
    switch (direction) {
        case "R":
            headPosition.x += 1;
            break;
        case "L":
            headPosition.x -= 1;
            break;
        case "U":
            headPosition.y -= 1;
            break;
        case "D":
            headPosition.y += 1;
            break;
        default:
            throw Error("Invalid direction");
    }
}
function isTailWithinOneOfHead(headPosition, tailPosition) {
    if (Math.abs(tailPosition.x - headPosition.x) > 1)
        return false;
    if (Math.abs(tailPosition.y - headPosition.y) > 1)
        return false;
    return true;
}
function moveTailHorizontal(headPosition, tailPosition) {
    if (headPosition.x < tailPosition.x) {
        tailPosition.x -= 1;
    }
    else {
        tailPosition.x += 1;
    }
}
function moveTailVertical(headPosition, tailPosition) {
    if (headPosition.y < tailPosition.y) {
        tailPosition.y -= 1;
    }
    else {
        tailPosition.y += 1;
    }
}
function moveTailDiagonal(headPosition, tailPosition) {
    if (headPosition.x < tailPosition.x) {
        tailPosition.x -= 1;
    }
    else {
        tailPosition.x += 1;
    }
    if (headPosition.y < tailPosition.y) {
        tailPosition.y -= 1;
    }
    else {
        tailPosition.y += 1;
    }
}
function moveTail(headPosition, tailPosition) {
    if (tailPosition.x === headPosition.x) {
        moveTailVertical(headPosition, tailPosition);
    }
    else if (tailPosition.y === headPosition.y) {
        moveTailHorizontal(headPosition, tailPosition);
    }
    else {
        moveTailDiagonal(headPosition, tailPosition);
    }
}
function partOne(input) {
    const moves = input.split("\n").filter(Boolean);
    const headPosition = { x: 0, y: 0 };
    const tailPosition = { x: 0, y: 0 };
    const tailVisitedPositions = new Set();
    for (let i = 0; i < moves.length; i++) {
        const [direction, amount] = moves[i].split(" ");
        for (let i = 0; i < Number(amount); i++) {
            moveHead(direction, headPosition);
            if (!isTailWithinOneOfHead(headPosition, tailPosition)) {
                moveTail(headPosition, tailPosition);
                tailVisitedPositions.add(`${tailPosition.x},${tailPosition.y}`);
            }
        }
    }
    console.log(tailVisitedPositions.size);
}
partOne(input);
