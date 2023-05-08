"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const helpers_1 = require("../helpers");
const monkey_1 = require("./monkey");
const input = (0, helpers_1.getFileContents)("./input.txt");
function getMonkeyId(idString) {
    const matched = idString.match(/\d/g);
    if (matched)
        return Number(matched[0]);
    return 0;
}
function getMonkeyItems(itemString) {
    const matched = itemString.match(/\d+/g);
    if (matched) {
        return matched.map((m) => Number(m));
    }
    return [0];
}
function getMonkeyOperation(operationString) {
    const operand = operationString.match(/\d+/g);
    const operation = operationString.match(/[+|*]/g);
    if (operation) {
        if (operand) {
            const amount = Number(operand[0]);
            if (operation[0] === "+")
                return (oldItem) => oldItem + amount;
            return (oldItem) => oldItem * amount;
        }
        if (operation[0] === "+")
            return (oldItem) => oldItem + oldItem;
        return (oldItem) => oldItem * oldItem;
    }
    return (oldItem) => oldItem;
}
function getMonkeyTestDivisor(testString) {
    const matched = testString.match(/\d+/g);
    if (matched)
        return Number(matched[0]);
    return 0;
}
function monkeyFactory(monkeyNotes) {
    const monkeys = [];
    monkeyNotes.forEach((notes) => {
        const noteLine = notes.split("\n").filter(Boolean);
        const id = getMonkeyId(noteLine[0]);
        const items = getMonkeyItems(noteLine[1]);
        const operationFunction = getMonkeyOperation(noteLine[2]);
        const testDivisor = getMonkeyTestDivisor(noteLine[3]);
        const testTrueMonkey = getMonkeyId(noteLine[4]);
        const testFalseMonkey = getMonkeyId(noteLine[5]);
        const monkey = new monkey_1.Monkey(id, items, operationFunction, testDivisor, testTrueMonkey, testFalseMonkey);
        monkeys.push(monkey);
    });
    return monkeys;
}
function testItem(item, divisor, trueMonkeyId, falseMonkeyId) {
    if (item % divisor === 0)
        return trueMonkeyId;
    return falseMonkeyId;
}
function playRounds(monkeys) {
    for (let i = 0; i < monkeys.length; i++) {
        let monkeyItemCount = monkeys[i].items.length;
        for (let j = 0; j < monkeyItemCount; j++) {
            const item = monkeys[i].evaluateItem();
            const throwToMonkeyId = testItem(item, monkeys[i].testDivisor, monkeys[i].testTrueMonkey, monkeys[i].testFalseMonkey);
            monkeys[throwToMonkeyId].addItem(item);
        }
    }
}
function calculateMonkeyBusiness(monkeys) {
    const monkeysItemsInspected = [];
    monkeys.forEach((monkey) => {
        monkeysItemsInspected.push(monkey.itemsInspected);
    });
    monkeysItemsInspected.sort((a, b) => b - a);
    return monkeysItemsInspected[0] * monkeysItemsInspected[1];
}
function partOne(input) {
    const monkeyNotes = input.split("\n\n");
    const monkeys = monkeyFactory(monkeyNotes);
    for (let i = 0; i < 20; i++) {
        playRounds(monkeys);
    }
    const monkeyBusiness = calculateMonkeyBusiness(monkeys);
    console.log(monkeyBusiness);
}
partOne(input);
