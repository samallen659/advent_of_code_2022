import { getFileContents } from "../helpers";
import { ElfFile, ElfDirectory } from "./elfFileSystem";

const input = getFileContents("./input.txt");

function isCommand(command: string): boolean {
    return command[0] === "$";
}

function isCommandCd(command: string): boolean {
    return `${command[2]}${command[3]}` === "cd";
}

function isCommandLs(command: string): boolean {
    return `${command[2]}${command[3]}` === "ls";
}

function getDirectoryName(command: string): string {
    if (isCommand(command)) return command.slice(5, command.length);
    return command.slice(4, command.length);
}

function isDirectory(command: string): boolean {
    return `${command[0]}${command[1]}${command[2]}` === "dir";
}

function getFileDetails(command: string): Array<string> {
    const [size, name] = command.split(" ");
    return [size, name];
}

function handleCd(currentDirectory: ElfDirectory, command: string): ElfDirectory {
    let returnDirectory = currentDirectory;
    const directoryName = getDirectoryName(command);
    if (directoryName === ".." && returnDirectory.parent !== undefined) {
        returnDirectory = returnDirectory.parent;
    } else {
        const childDirectory = returnDirectory.getChildDirectory(
            getDirectoryName(command)
        );
        if (childDirectory !== undefined) {
            returnDirectory = childDirectory;
        }
    }
    return returnDirectory;
}

function handleNewFileOrDirectory(command: string, currentDirectory: ElfDirectory): void {
    if (isDirectory(command)) {
        const name = getDirectoryName(command);
        const newDirectory = new ElfDirectory(name, []);
        newDirectory.parent = currentDirectory;
        currentDirectory.children.push(newDirectory);
    } else {
        const [size, name] = getFileDetails(command);
        currentDirectory.children.push(new ElfFile(name, Number(size)));
    }
}

function parseCommands(commands: Array<string>, rootDirectory: ElfDirectory): void {
    let currentDirectory = rootDirectory;
    for (let i = 0; i < commands.length; i++) {
        if (isCommand(commands[i])) {
            if (isCommandLs(commands[i])) continue;
            if (isCommandCd(commands[i])) {
                currentDirectory = handleCd(currentDirectory, commands[i]);
            }
        } else {
            handleNewFileOrDirectory(commands[i], currentDirectory);
        }
    }
}

function partOne(input: string): void {
    const commands = input.split("\n").filter(Boolean);
    const rootDirectory = new ElfDirectory("/", []);
    parseCommands(commands, rootDirectory);
    console.log(ElfDirectory.returnSizesUnder100000(rootDirectory));
}

function calculateSpaceToDelete(
    diskCapacity: number,
    updateSize: number,
    rootDirectorySize: number
): number {
    return updateSize - (diskCapacity - rootDirectorySize);
}

function partTwo(input: string): void {
    const commands = input.split("\n").filter(Boolean);
    const rootDirectory = new ElfDirectory("/", []);
    parseCommands(commands, rootDirectory);
    const spaceToDelete = calculateSpaceToDelete(
        70000000,
        30000000,
        ElfDirectory.getSize(rootDirectory)
    );
    const directorySizes = ElfDirectory.directorySizesOverThreshold(
        rootDirectory,
        spaceToDelete
    );
    console.log(directorySizes.sort((a, b) => a - b)[0]);
}

partOne(input);
partTwo(input);
