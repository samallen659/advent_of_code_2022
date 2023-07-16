const fs = require("fs");

class Elf {
  constructor(foodList) {
    this.foodList = foodList;
    this.calorieTotal = 0;
  }
  calculateCalorieTotal() {
    let tempTotal = 0;
    for (let i = 0; i < this.foodList.length; i++) {
      const foodCalories = Number(this.foodList[i]);
      if (typeof foodCalories === "number") tempTotal += foodCalories;
    }
    this.calorieTotal = tempTotal;
  }
}

class ElfContainer {
  constructor() {
    this.elfList = [];
    this.topThreeTotal = 0;
    this.topThreeElfCalories = { 1: 0, 2: 0, 3: 0 };
  }

  addElf(elf) {
    this.elfList.push(elf);
  }
  calculateElvesTotalCalories() {
    for (let i = 0; i < this.elfList.length; i++) {
      this.elfList[i].calculateCalorieTotal();
    }
  }
  calculateHighestCalorieTotal() {
    for (let i = 0; i < this.elfList.length; i++) {
      const currentCalorieTotal = this.elfList[i].calorieTotal;
      if (this.topThreeElfCalories["1"] < currentCalorieTotal) {
        this.topThreeElfCalories["3"] = this.topThreeElfCalories["2"];
        this.topThreeElfCalories["2"] = this.topThreeElfCalories["1"];
        this.topThreeElfCalories["1"] = currentCalorieTotal;
      } else if (this.topThreeElfCalories["2"] < currentCalorieTotal) {
        this.topThreeElfCalories["3"] = this.topThreeElfCalories["2"];
        this.topThreeElfCalories["2"] = currentCalorieTotal;
      } else if (this.topThreeElfCalories["3"] < currentCalorieTotal) {
        this.topThreeElfCalories["3"] = currentCalorieTotal;
      }
    }
    this.topThreeTotal =
      this.topThreeElfCalories["1"] +
      this.topThreeElfCalories["2"] +
      this.topThreeElfCalories["3"];
  }
}

const elfContainer = new ElfContainer();

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
    elfContainer.addElf(elf);
  });
  elfContainer.calculateElvesTotalCalories();
  elfContainer.calculateHighestCalorieTotal();
  console.log(elfContainer.topThreeElfCalories);
  console.log(elfContainer.topThreeTotal);
}
function splitFoodList(data) {
  return data.split("\n");
}

getFoodData("./input.txt");
