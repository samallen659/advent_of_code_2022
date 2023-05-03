import { getFileContents } from "../helpers";
import { ElfFile, ElfDirectory, ElfDirectoryNode } from "./elfFileSystem";

const input = getFileContents("./input2.txt");

const elfFile = new ElfFile("a.txt", 1000);
const elfDirectory1 = new ElfDirectory("dir1", [elfFile]);
const elfDirectory2 = new ElfDirectory("dir2", [elfDirectory1]);

// console.log(elfDirectory2);
console.log(ElfDirectory.getSize(elfDirectory2));
