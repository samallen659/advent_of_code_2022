"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ElfDirectory = exports.ElfFile = void 0;
class ElfFile {
    constructor(name, size) {
        this.name = name;
        this.size = size;
        this.name = name;
        this.size = size;
    }
}
exports.ElfFile = ElfFile;
class ElfDirectory {
    constructor(name, children, parent) {
        this.name = name;
        this.children = children;
        this.parent = parent;
        this.name = name;
        this.children = children;
        this.parent = parent;
    }
    getChildDirectory(name) {
        const child = this.children.filter((child) => child.name === name);
        if (child.length !== 0)
            return child[0];
        return undefined;
    }
    static getSize(elfDirectory) {
        let total = 0;
        for (let i = 0; i < elfDirectory.children.length; i++) {
            if (elfDirectory.children[i] instanceof ElfFile) {
                const f = elfDirectory.children[i];
                total += f.size;
            }
            else {
                const f = elfDirectory.children[i];
                total += ElfDirectory.getSize(f);
            }
        }
        return total;
    }
    static returnSizesUnder100000(elfDirectory) {
        let total = 0;
        for (let i = 0; i < elfDirectory.children.length; i++) {
            if (elfDirectory.children[i] instanceof ElfFile)
                continue;
            const directory = elfDirectory.children[i];
            const directorySize = ElfDirectory.getSize(directory);
            if (directorySize < 100000)
                total += directorySize;
            total += ElfDirectory.returnSizesUnder100000(directory);
        }
        return total;
    }
}
exports.ElfDirectory = ElfDirectory;
