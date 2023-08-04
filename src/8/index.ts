import { getFileContents } from "../helpers";

const input = getFileContents("./input.txt");

function generateGrid(input: string): Array<string[]> {
    return input
        .split("\n")
        .filter(Boolean)
        .map((a) => a.split(""));
}

function isVisibleBelow(
    tree: number,
    y: number,
    x: number,
    treeGrid: Array<string[]>
): boolean {
    for (let i = y + 1; i < treeGrid.length; i++) {
        if (Number(treeGrid[i][x]) >= tree) return false;
    }
    return true;
}

function isVisibleAbove(
    tree: number,
    y: number,
    x: number,
    treeGrid: Array<string[]>
): boolean {
    for (let i = y - 1; i > -1; i--) {
        if (Number(treeGrid[i][x]) >= tree) return false;
    }
    return true;
}
function isVisibleLeft(
    tree: number,
    y: number,
    x: number,
    treeGrid: Array<string[]>
): boolean {
    for (let i = x - 1; i > -1; i--) {
        if (Number(treeGrid[y][i]) >= tree) return false;
    }
    return true;
}

function isVisibleRight(
    tree: number,
    y: number,
    x: number,
    treeGrid: Array<string[]>
): boolean {
    for (let i = x + 1; i < treeGrid[y].length; i++) {
        if (Number(treeGrid[y][i]) >= tree) return false;
    }
    return true;
}

function sumEdgeTrees(treeGrid: Array<string[]>): number {
    return 2 * treeGrid.length + 2 * treeGrid[0].length - 4;
}

function partOne(input: string): void {
    const treeGrid = generateGrid(input);
    let visibleTreeCount = sumEdgeTrees(treeGrid);
    for (let y = 1; y < treeGrid.length - 1; y++) {
        for (let x = 1; x < treeGrid[y].length - 1; x++) {
            const tree = treeGrid[y][x];
            if (
                isVisibleBelow(Number(tree), y, x, treeGrid) ||
                isVisibleAbove(Number(tree), y, x, treeGrid) ||
                isVisibleLeft(Number(tree), y, x, treeGrid) ||
                isVisibleRight(Number(tree), y, x, treeGrid)
            ) {
                visibleTreeCount += 1;
            }
        }
    }
    console.log(visibleTreeCount);
}

function scenicScoreAbove(
    tree: number,
    y: number,
    x: number,
    treeGrid: Array<string[]>
): number {
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
function scenicScoreBelow(
    tree: number,
    y: number,
    x: number,
    treeGrid: Array<string[]>
): number {
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
function scenicScoreLeft(
    tree: number,
    y: number,
    x: number,
    treeGrid: Array<string[]>
): number {
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
function scenicScoreRight(
    tree: number,
    y: number,
    x: number,
    treeGrid: Array<string[]>
): number {
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

function partTwo(input: string): void {
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
