import { readFileSync } from "node:fs";

export function getFileContents(filePath: string): string {
  return readFileSync(filePath, { encoding: "ascii" });
}
