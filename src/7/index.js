"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const helpers_1 = require("../helpers");
const elfFileSystem_1 = require("./elfFileSystem");
const input = (0, helpers_1.getFileContents)("./input2.txt");
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
function parseCommands(commands, rootDirectory) {
    let currentDirectory = rootDirectory;
    for (let i = 0; i < commands.length; i++) {
        if (isCommand(commands[i])) {
            if (isCommandLs(commands[i]))
                continue;
            if (isCommandCd(commands[i])) {
                const directoryName = getDirectoryName(commands[i]);
                if (directoryName === ".." && currentDirectory.parent !== undefined) {
                    currentDirectory = currentDirectory.parent;
                }
                else {
                    const childDirectory = currentDirectory.getChildDirectory(getDirectoryName(commands[i]));
                    if (childDirectory !== undefined) {
                        currentDirectory = childDirectory;
                    }
                }
            }
        }
        else {
            if (isDirectory(commands[i])) {
                const name = getDirectoryName(commands[i]);
                const newDirectory = new elfFileSystem_1.ElfDirectory(name, []);
                newDirectory.parent = currentDirectory;
                currentDirectory.children.push(newDirectory);
            }
            else {
                const [size, name] = getFileDetails(commands[i]);
                currentDirectory.children.push(new elfFileSystem_1.ElfFile(name, Number(size)));
            }
        }
    }
}
function partOne(input) {
    const commands = input.split("\n").filter(Boolean);
    const rootDirectory = new elfFileSystem_1.ElfDirectory("/", []);
    parseCommands(commands, rootDirectory);
    console.log(rootDirectory);
}
partOne(input);
