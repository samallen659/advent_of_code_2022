import { readFile } from "node:fs/promises";

async function getFileContents(filePath: string): Promise<string | undefined> {
  let contents;
  try {
    contents = await readFile(filePath, { encoding: "ascii" });
  } catch (err) {
    console.error(err);
  }
  return contents;
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

function characterToShape(character: string): string {
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

function shapeToPoints(shape: string): number {
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

function isWin(elfMove: string, playerMove: string): boolean {
  if (elfMove === "Rock" && playerMove === "Paper") return true;
  if (elfMove === "Paper" && playerMove === "Scissors") return true;
  if (elfMove === "Scissors" && playerMove === "Rock") return true;

  return false;
}

function isDraw(elfMove: string, playerMove: string): boolean {
  return elfMove === playerMove;
}

function calculateScore(elfMove: string, playerMove: string): number {
  let score = shapeToPoints(playerMove);
  if (isWin(elfMove, playerMove)) {
    return (score += 6);
  }
  if (isDraw(elfMove, playerMove)) {
    return (score += 3);
  }
  return score;
}
