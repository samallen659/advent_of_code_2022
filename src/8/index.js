"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const helpers_1 = require("../helpers");
const input = (0, helpers_1.getFileContents)("./input.txt");
function generateGrid(input) {
    return input
        .split("\n")
        .filter(Boolean)
        .map((a) => a.split(""));
}
function isVisibleBelow(tree, y, x, treeGrid) {
    for (let i = y + 1; i < treeGrid.length; i++) {
        if (Number(treeGrid[i][x]) >= tree)
            return false;
    }
    return true;
}
function isVisibleAbove(tree, y, x, treeGrid) {
    for (let i = y - 1; i > -1; i--) {
        if (Number(treeGrid[i][x]) >= tree)
            return false;
    }
    return true;
}
function isVisibleLeft(tree, y, x, treeGrid) {
    for (let i = x - 1; i > -1; i--) {
        if (Number(treeGrid[y][i]) >= tree)
            return false;
    }
    return true;
}
function isVisibleRight(tree, y, x, treeGrid) {
    for (let i = x + 1; i < treeGrid[y].length; i++) {
        if (Number(treeGrid[y][i]) >= tree)
            return false;
    }
    return true;
}
function sumEdgeTrees(treeGrid) {
    return 2 * treeGrid.length + 2 * treeGrid[0].length - 4;
}
function partOne(input) {
    const treeGrid = generateGrid(input);
    let visibleTreeCount = sumEdgeTrees(treeGrid);
    for (let y = 1; y < treeGrid.length - 1; y++) {
        for (let x = 1; x < treeGrid[y].length - 1; x++) {
            const tree = treeGrid[y][x];
            if (isVisibleBelow(Number(tree), y, x, treeGrid) ||
                isVisibleAbove(Number(tree), y, x, treeGrid) ||
                isVisibleLeft(Number(tree), y, x, treeGrid) ||
                isVisibleRight(Number(tree), y, x, treeGrid)) {
                visibleTreeCount += 1;
            }
        }
    }
    console.log(visibleTreeCount);
}
function scenicScoreAbove(tree, y, x, treeGrid) {
    let scenicScore = 0;
    for (let i = y - 1; i > -1; i--) {
        if (Number(treeGrid[i][x]) >= tree) {
            scenicScore += 1;
            break;
        }
        scenicScore += 1;
    }
    return scenicScore;
}
function scenicScoreBelow(tree, y, x, treeGrid) {
    let scenicScore = 0;
    for (let i = y + 1; i < treeGrid.length; i++) {
        if (Number(treeGrid[i][x]) >= tree) {
            scenicScore += 1;
            break;
        }
        scenicScore += 1;
    }
    return scenicScore;
}
function scenicScoreLeft(tree, y, x, treeGrid) {
    let scenicScore = 0;
    for (let i = x - 1; i > -1; i--) {
        if (Number(treeGrid[y][i]) >= tree) {
            scenicScore += 1;
            break;
        }
        scenicScore += 1;
    }
    return scenicScore;
}
function scenicScoreRight(tree, y, x, treeGrid) {
    let scenicScore = 0;
    for (let i = x + 1; i < treeGrid[y].length; i++) {
        if (Number(treeGrid[y][i]) >= tree) {
            scenicScore += 1;
            break;
        }
        scenicScore += 1;
    }
    return scenicScore;
}
function partTwo(input) {
    const treeGrid = generateGrid(input);
    let scenicScores = [];
    for (let y = 1; y < treeGrid.length - 1; y++) {
        for (let x = 1; x < treeGrid[y].length - 1; x++) {
            const tree = treeGrid[y][x];
            const sScoreAbove = scenicScoreAbove(Number(tree), y, x, treeGrid);
            const sScoreBelow = scenicScoreBelow(Number(tree), y, x, treeGrid);
            const sScoreLeft = scenicScoreLeft(Number(tree), y, x, treeGrid);
            const sScoreRight = scenicScoreRight(Number(tree), y, x, treeGrid);
            scenicScores.push(sScoreAbove * sScoreBelow * sScoreLeft * sScoreRight);
        }
    }
    scenicScores.sort((a, b) => b - a);
    console.log(scenicScores[0]);
}
partOne(input);
partTwo(input);
