export type ElfDirectoryNode = ElfFile | ElfDirectory;

interface IElfFile {
    name: string;
    size: number;
}
export class ElfFile implements IElfFile {
    public name;
    public size;

    constructor(name: string, size: number) {
        this.name = name;
        this.size = size;
    }
}

interface IElfDirectory {
    name: string;
    children: ElfDirectoryNode[];
}

export class ElfDirectory implements IElfDirectory {
    public name;
    public children;

    constructor(name: string, children: Array<ElfDirectoryNode>) {
        this.name = name;
        this.children = children;
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
}
