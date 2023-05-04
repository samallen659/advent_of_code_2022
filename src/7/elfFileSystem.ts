interface IElfFile {
    name: string;
    size: number;
}
export class ElfFile implements IElfFile {
    constructor(public name: string, public size: number) {
        this.name = name;
        this.size = size;
    }
}

interface IElfDirectory {
    name: string;
    children: Array<ElfFile | ElfDirectory>;
    parent?: ElfDirectory;
    getChildDirectory(name: string): ElfDirectory | undefined;
}

export class ElfDirectory implements IElfDirectory {
    constructor(
        public name: string,
        public children: Array<ElfFile | ElfDirectory>,
        public parent?: ElfDirectory
    ) {
        this.name = name;
        this.children = children;
        this.parent = parent;
    }

    public getChildDirectory(name: string): ElfDirectory | undefined {
        const child = this.children.filter((child) => child.name === name);
        if (child.length !== 0) return child[0] as ElfDirectory;
        return undefined;
    }
    public static getSize(elfDirectory: ElfDirectory): number {
        let total = 0;
        for (let i = 0; i < elfDirectory.children.length; i++) {
            if (elfDirectory.children[i] instanceof ElfFile) {
                const f = elfDirectory.children[i] as ElfFile;
                total += f.size;
            } else {
                const f = elfDirectory.children[i] as ElfDirectory;
                total += ElfDirectory.getSize(f);
            }
        }
        return total;
    }
    public static returnSizesUnder100000(elfDirectory: ElfDirectory): number {
        let total = 0;
        for (let i = 0; i < elfDirectory.children.length; i++) {
            if (elfDirectory.children[i] instanceof ElfFile) continue;
            const directory = elfDirectory.children[i] as ElfDirectory;
            const directorySize = ElfDirectory.getSize(directory);
            if (directorySize < 100000) total += directorySize;
            total += ElfDirectory.returnSizesUnder100000(directory);
        }
        return total;
    }
}
