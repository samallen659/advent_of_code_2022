import { getFileContents } from "../helpers";
import { Queue } from "./queue";

const input = getFileContents("./input.txt");

type CpuTask = {
    name: string;
    executionDuration: number;
};

function calculateSignalStrength(cpuCycle: number, xRegister: number): number {
    return cpuCycle * xRegister;
}

function buildQueue(commands: Array<string>): Queue<CpuTask> {
    const cpuTaskQueue = new Queue<CpuTask>();
    commands.forEach((command) => {
        let task: CpuTask;
        if (command.charAt(0) === "a") {
            task = {
                name: command,
                executionDuration: 2,
            };
        } else {
            task = {
                name: command,
                executionDuration: 1,
            };
        }
        cpuTaskQueue.enqueue(task);
    });
    return cpuTaskQueue;
}

function partOne(input: string): void {
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
                } else {
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

function drawPixel(screen: string, xRegister: number, cpuCycle: number): string {
    let returnstring = screen;
    const pixel = {
        lit: "#",
        dark: ".",
    };
    if (
        (cpuCycle % 40) - 1 === xRegister - 1 ||
        (cpuCycle % 40) - 1 === xRegister ||
        (cpuCycle % 40) - 1 === xRegister + 1
    ) {
        returnstring += pixel.lit;
    } else {
        returnstring += pixel.dark;
    }
    if (cpuCycle % 40 === 0) returnstring += "\n";
    return returnstring;
}

function partTwo(input: string): void {
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
