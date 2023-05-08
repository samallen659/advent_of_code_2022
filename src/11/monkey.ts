interface IMonkey {
    id: number;
    items: number[];
    operation: (oldItem: number) => number;
    testDivisor: number;
    testTrueMonkey: number;
    testFalseMonkey: number;
}

class Monkey implements IMonkey {
    public itemsInspected = 0;
    constructor(
        public id: number,
        public items: number[],
        public operation: (oldItem: number) => number,
        public testDivisor: number,
        public testTrueMonkey: number,
        public testFalseMonkey: number
    ) {
        this.id = id;
        this.items = items;
        this.operation = operation;
        this.testDivisor = testDivisor;
        this.testTrueMonkey = testTrueMonkey;
        this.testFalseMonkey = testFalseMonkey;
    }
    private runOperation(oldItem: number): number {
        this.itemsInspected += 1;
        return this.operation(oldItem);
    }

    evaluateItem(): number {
        let item = this.items.shift();
        if (item) {
            item = this.runOperation(item);
            return item;
        }
        return -1;
    }
    addItem(item: number): void {
        this.items.push(item);
    }
}

export { Monkey };
