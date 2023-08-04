import { getFileContents } from "../helpers";

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

function findRucksackCommonItem(setArr: Array<Set<string>>): string {
  const sortedSetArr = setArr.sort((a, b) => b.size - a.size);
  const largestSetIter = sortedSetArr[0][Symbol.iterator]();
  let commonItem = "";
  for (let i = 0; i < sortedSetArr[0].size; i++) {
    const largestSetValue = largestSetIter.next().value;
    if (
      sortedSetArr[1].has(largestSetValue) &&
      sortedSetArr[2].has(largestSetValue)
    ) {
      commonItem = largestSetValue;
      break;
    }
  }
  return commonItem;
}

prioritySum = 0;
for (let i = 0; i < input.length; i += 3) {
  const rucksackOneSet = new Set(input[i].split(""));
  const rucksackTwoSet = new Set(input[i + 1].split(""));
  const rucksackThreeSet = new Set(input[i + 2].split(""));
  const rucksackSetList = [rucksackOneSet, rucksackTwoSet, rucksackThreeSet];
  const commonItem = findRucksackCommonItem(rucksackSetList);
  prioritySum += valueOfItem(commonItem);
}
console.log(prioritySum);
