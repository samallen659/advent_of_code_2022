"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const helpers_1 = require("../helpers");
const queue_1 = require("./queue");
const input = (0, helpers_1.getFileContents)("./input.txt");
function calculateSignalStrength(cpuCycle, xRegister) {
    return cpuCycle * xRegister;
}
function buildQueue(commands) {
    const cpuTaskQueue = new queue_1.Queue();
    commands.forEach((command) => {
        let task;
        if (command.charAt(0) === "a") {
            task = {
                name: command,
                executionDuration: 2,
            };
        }
        else {
            task = {
                name: command,
                executionDuration: 1,
            };
        }
        cpuTaskQueue.enqueue(task);
    });
    return cpuTaskQueue;
}
function partOne(input) {
    const commands = input.split("\n").filter(Boolean);
    let cpuCycle = 1;
    let xRegister = 1;
    let signalStrengthSum = 0;
    const cpuTaskQueue = buildQueue(commands);
    while (cpuTaskQueue.size() > 0) {
        const currentTask = cpuTaskQueue.dequeue();
        if (currentTask) {
            while (currentTask.executionDuration > 0) {
                if (cpuCycle < 60) {
                    if (cpuCycle === 20) {
                        signalStrengthSum += calculateSignalStrength(cpuCycle, xRegister);
                    }
                }
                else {
                    if ((cpuCycle - 20) % 40 === 0) {
                        signalStrengthSum += calculateSignalStrength(cpuCycle, xRegister);
                    }
                }
                if (currentTask.name.charAt(0) === "a") {
                    if (currentTask.executionDuration <= 1) {
                        const [_, amount] = currentTask.name.split(" ");
                        xRegister += Number(amount);
                    }
                }
                currentTask.executionDuration -= 1;
                cpuCycle += 1;
            }
        }
    }
    console.log(signalStrengthSum);
}
function drawPixel(screen, xRegister, cpuCycle) {
    let returnstring = screen;
    const pixel = {
        lit: "#",
        dark: ".",
    };
    if ((cpuCycle % 40) - 1 === xRegister - 1 ||
        (cpuCycle % 40) - 1 === xRegister ||
        (cpuCycle % 40) - 1 === xRegister + 1) {
        returnstring += pixel.lit;
    }
    else {
        returnstring += pixel.dark;
    }
    if (cpuCycle % 40 === 0)
        returnstring += "\n";
    return returnstring;
}
function partTwo(input) {
    const commands = input.split("\n").filter(Boolean);
    let cpuCycle = 1;
    let xRegister = 1;
    let signalStrengthSum = 0;
    const cpuTaskQueue = buildQueue(commands);
    let screenOutput = "";
    while (cpuTaskQueue.size() > 0) {
        const currentTask = cpuTaskQueue.dequeue();
        if (currentTask) {
            while (currentTask.executionDuration > 0) {
                screenOutput = drawPixel(screenOutput, xRegister, cpuCycle);
                if (currentTask.name.charAt(0) === "a") {
                    if (currentTask.executionDuration <= 1) {
                        const [_, amount] = currentTask.name.split(" ");
                        xRegister += Number(amount);
                    }
                }
                currentTask.executionDuration -= 1;
                cpuCycle += 1;
            }
        }
    }
    console.log(screenOutput);
}
partOne(input);
partTwo(input);
