"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getFileContents = void 0;
const node_fs_1 = require("node:fs");
function getFileContents(filePath) {
    return (0, node_fs_1.readFileSync)(filePath, { encoding: "ascii" });
}
exports.getFileContents = getFileContents;
