"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Stack = void 0;
class Stack {
    constructor() {
        this.storage = [];
    }
    push(item) {
        this.storage.push(item);
    }
    pop() {
        return this.storage.pop();
    }
    peek() {
        return this.storage[this.size() - 1];
    }
    size() {
        return this.storage.length;
    }
}
exports.Stack = Stack;
