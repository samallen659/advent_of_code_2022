import { getFileContents } from "../helpers";

const input = getFileContents("./input.txt");

type Position = {
    x: number;
    y: number;
};

function moveHead(direction: string, headPosition: Position): void {
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
function isTailWithinOneOfHead(headPosition: Position, tailPosition: Position): boolean {
    if (Math.abs(tailPosition.x - headPosition.x) > 1) return false;
    if (Math.abs(tailPosition.y - headPosition.y) > 1) return false;
    return true;
}

function moveTailHorizontal(headPosition: Position, tailPosition: Position): void {
    if (headPosition.x < tailPosition.x) {
        tailPosition.x -= 1;
    } else {
        tailPosition.x += 1;
    }
}

function moveTailVertical(headPosition: Position, tailPosition: Position): void {
    if (headPosition.y < tailPosition.y) {
        tailPosition.y -= 1;
    } else {
        tailPosition.y += 1;
    }
}

function moveTailDiagonal(headPosition: Position, tailPosition: Position): void {
    if (headPosition.x < tailPosition.x) {
        tailPosition.x -= 1;
    } else {
        tailPosition.x += 1;
    }
    if (headPosition.y < tailPosition.y) {
        tailPosition.y -= 1;
    } else {
        tailPosition.y += 1;
    }
}

function moveTail(headPosition: Position, tailPosition: Position): void {
    if (tailPosition.x === headPosition.x) {
        moveTailVertical(headPosition, tailPosition);
    } else if (tailPosition.y === headPosition.y) {
        moveTailHorizontal(headPosition, tailPosition);
    } else {
        moveTailDiagonal(headPosition, tailPosition);
    }
}

function partOne(input: string): void {
    const moves = input.split("\n").filter(Boolean);
    const headPosition: Position = { x: 0, y: 0 };
    const tailPosition: Position = { x: 0, y: 0 };
    const tailVisitedPositions = new Set<string>();
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
