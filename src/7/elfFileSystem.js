"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ElfDirectory = exports.ElfFile = void 0;
class ElfFile {
    constructor(name, size) {
        this.name = name;
        this.size = size;
    }
}
exports.ElfFile = ElfFile;
class ElfDirectory {
    constructor(name, children) {
        this.name = name;
        this.children = children;
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
}
exports.ElfDirectory = ElfDirectory;