import { getFileContents } from "../helpers";

interface OccuranceTracker {
  [key: string]: number;
}

function halfString(str: string): Array<string> {
  return [str.slice(0, str.length / 2), str.slice(str.length / 2)];
}

function findCompartmentCommonItem(
  setOne: Set<string>,
  setTwo: Set<string>
): string {
  const setOneInterator = setOne[Symbol.iterator]();
  let commonItem = "";
  for (let i = 0; i < setOne.size; i++) {
    const setOneValue = setOneInterator.next().value;
    if (setTwo.has(setOneValue)) {
      commonItem = setOneValue;
      break;
    }
  }
  return commonItem;
}
function isUpperCase(s: string): boolean {
  return s === s.toUpperCase();
}
function valueOfItem(ch: string): number {
  if (isUpperCase(ch)) return ch.charCodeAt(0) - 38;
  return ch.charCodeAt(0) - 96;
}

const input = getFileContents("./input.txt").split("\n").filter(Boolean);
let prioritySum = 0;
input.map((data) => {
  const [compartmentOneStr, compartmentTwoStr] = halfString(data);
  const compartmentOneSet = new Set(compartmentOneStr.split(""));
  const compartmentTwoSet = new Set(compartmentTwoStr.split(""));
  const commonItem = findCompartmentCommonItem(
    compartmentOneSet,
    compartmentTwoSet
  );
  prioritySum += valueOfItem(commonItem);
});

console.log(prioritySum);
