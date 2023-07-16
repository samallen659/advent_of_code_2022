"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const helpers_1 = require("../helpers");
const elfFileSystem_1 = require("./elfFileSystem");
const input = (0, helpers_1.getFileContents)("./input.txt");
function isCommand(command) {
    return command[0] === "$";
}
function isCommandCd(command) {
    return `${command[2]}${command[3]}` === "cd";
}
function isCommandLs(command) {
    return `${command[2]}${command[3]}` === "ls";
}
function getDirectoryName(command) {
    if (isCommand(command))
        return command.slice(5, command.length);
    return command.slice(4, command.length);
}
function isDirectory(command) {
    return `${command[0]}${command[1]}${command[2]}` === "dir";
}
function getFileDetails(command) {
    const [size, name] = command.split(" ");
    return [size, name];
}
function handleCd(currentDirectory, command) {
    let returnDirectory = currentDirectory;
    const directoryName = getDirectoryName(command);
    if (directoryName === ".." && returnDirectory.parent !== undefined) {
        returnDirectory = returnDirectory.parent;
    }
    else {
        const childDirectory = returnDirectory.getChildDirectory(getDirectoryName(command));
        if (childDirectory !== undefined) {
            returnDirectory = childDirectory;
        }
    }
    return returnDirectory;
}
function handleNewFileOrDirectory(command, currentDirectory) {
    if (isDirectory(command)) {
        const name = getDirectoryName(command);
        const newDirectory = new elfFileSystem_1.ElfDirectory(name, []);
        newDirectory.parent = currentDirectory;
        currentDirectory.children.push(newDirectory);
    }
    else {
        const [size, name] = getFileDetails(command);
        currentDirectory.children.push(new elfFileSystem_1.ElfFile(name, Number(size)));
    }
}
function parseCommands(commands, rootDirectory) {
    let currentDirectory = rootDirectory;
    for (let i = 0; i < commands.length; i++) {
        if (isCommand(commands[i])) {
            if (isCommandLs(commands[i]))
                continue;
            if (isCommandCd(commands[i])) {
                currentDirectory = handleCd(currentDirectory, commands[i]);
            }
        }
        else {
            handleNewFileOrDirectory(commands[i], currentDirectory);
        }
    }
}
function partOne(input) {
    const commands = input.split("\n").filter(Boolean);
    const rootDirectory = new elfFileSystem_1.ElfDirectory("/", []);
    parseCommands(commands, rootDirectory);
    console.log(elfFileSystem_1.ElfDirectory.returnSizesUnder100000(rootDirectory));
}
function calculateSpaceToDelete(diskCapacity, updateSize, rootDirectorySize) {
    return updateSize - (diskCapacity - rootDirectorySize);
}
function partTwo(input) {
    const commands = input.split("\n").filter(Boolean);
    const rootDirectory = new elfFileSystem_1.ElfDirectory("/", []);
    parseCommands(commands, rootDirectory);
    const spaceToDelete = calculateSpaceToDelete(70000000, 30000000, elfFileSystem_1.ElfDirectory.getSize(rootDirectory));
    const directorySizes = elfFileSystem_1.ElfDirectory.directorySizesOverThreshold(rootDirectory, spaceToDelete);
    console.log(directorySizes.sort((a, b) => a - b)[0]);
}
partOne(input);
partTwo(input);
