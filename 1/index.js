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
    this.highestCalorieTotal = 0;
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
      if (this.highestCalorieTotal < this.elfList[i].calorieTotal) {
        this.highestCalorieTotal = this.elfList[i].calorieTotal;
      }
    }
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
  console.log(elfContainer.highestCalorieTotal);
}
function splitFoodList(data) {
  return data.split("\n");
}

getFoodData("./input.txt");
