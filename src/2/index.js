"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const promises_1 = require("node:fs/promises");
function getFileContents(filePath) {
    return __awaiter(this, void 0, void 0, function* () {
        let contents;
        try {
            contents = yield (0, promises_1.readFile)(filePath, { encoding: "ascii" });
        }
        catch (err) {
            console.error(err);
        }
        return contents;
    });
}
getFileContents("./input.txt").then((data) => {
    let finalScore = 0;
    if (typeof data !== "undefined") {
        data
            .split("\n")
            .filter(Boolean)
            .map((moves) => {
            const [elfMoveChar, playerMoveChar] = moves.split(" ");
            const elfMove = characterToShape(elfMoveChar);
            const playerMove = characterToShape(playerMoveChar);
            finalScore += calculateScore(elfMove, playerMove);
        });
        console.log(finalScore);
    }
});
function characterToShape(character) {
    let shape;
    switch (character) {
        case "A":
            shape = "Rock";
            break;
        case "X":
            shape = "Rock";
            break;
        case "B":
            shape = "Paper";
            break;
        case "Y":
            shape = "Paper";
            break;
        case "C":
            shape = "Scissors";
            break;
        case "Z":
            shape = "Scissors";
            break;
        default:
            throw Error(`${character} not an accepted option`);
    }
    return shape;
}
function shapeToPoints(shape) {
    let points;
    switch (shape) {
        case "Rock":
            points = 1;
            break;
        case "Paper":
            points = 2;
            break;
        case "Scissors":
            points = 3;
            break;
        default:
            throw Error(`${shape} not an accepted shape`);
    }
    return points;
}
function isWin(elfMove, playerMove) {
    if (elfMove === "Rock" && playerMove === "Paper")
        return true;
    if (elfMove === "Paper" && playerMove === "Scissors")
        return true;
    if (elfMove === "Scissors" && playerMove === "Rock")
        return true;
    return false;
}
function isDraw(elfMove, playerMove) {
    return elfMove === playerMove;
}
function calculateScore(elfMove, playerMove) {
    let score = shapeToPoints(playerMove);
    if (isWin(elfMove, playerMove)) {
        return (score += 6);
    }
    if (isDraw(elfMove, playerMove)) {
        return (score += 3);
    }
    return score;
}
