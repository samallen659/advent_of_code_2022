import { getFileContents } from "../helpers";

const input = getFileContents("./input.txt");
function partOne(input: string) {
    for (let i = 3; i < input.length; i++) {
        if (
            checkUniqueCharacterCount([
                input[i],
                input[i - 1],
                input[i - 2],
                input[i - 3],
            ])
        ) {
            console.log(i + 1);
            break;
        }
    }
}

function partTwo(input: string) {
    for (let i = 14; i < input.length; i++) {
        const messageTestString = input.slice(i - 14, i).split("");
        if (checkUniqueCharacterCount(messageTestString)) {
            console.log(i);
            break;
        }
    }
}

function checkUniqueCharacterCount(chars: string[]): boolean {
    const characters = new Set(chars);
    if (characters.size === chars.length) return true;
    return false;
}

partOne(input);
partTwo(input);
