const fs = require("fs");

class Elf {
  constructor(foodList) {
    this.foodList = foodList;
  }
}

function getFoodData(path) {
  fs.readFile(path, "ascii", (err, data) => {
    if (err) {
      console.error(err);
      return;
    }
    splitElfList(data);
  });
}
function splitElfList(data) {
  const elfList = data.split("\n\n").map((food) => {
    const foodList = splitFoodList(food);
    const elf = new Elf(foodList);
    return elf;
  });
  printElfList(elfList);
}
function printElfList(elfList) {
  console.log(elfList);
}
function splitFoodList(data) {
  return data.split("\n");
}

getFoodData("./input.txt");
