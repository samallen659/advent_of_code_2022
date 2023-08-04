"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Monkey = void 0;
class Monkey {
    constructor(id, items, operation, testDivisor, testTrueMonkey, testFalseMonkey) {
        this.id = id;
        this.items = items;
        this.operation = operation;
        this.testDivisor = testDivisor;
        this.testTrueMonkey = testTrueMonkey;
        this.testFalseMonkey = testFalseMonkey;
        this.itemsInspected = 0;
        this.id = id;
        this.items = items;
        this.operation = operation;
        this.testDivisor = testDivisor;
        this.testTrueMonkey = testTrueMonkey;
        this.testFalseMonkey = testFalseMonkey;
    }
    runOperation(oldItem) {
        this.itemsInspected += 1;
        return this.operation(oldItem);
    }
    evaluateItem() {
        let item = this.items.shift();
        if (item) {
            item = this.runOperation(item);
            return item;
        }
        return -1;
    }
    addItem(item) {
        this.items.push(item);
    }
}
exports.Monkey = Monkey;
