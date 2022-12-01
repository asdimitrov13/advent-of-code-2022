const fs = require("fs");
const input = fs.readFileSync("./input.txt").toString();

const elves = input.split("\n\n");

const calories = [];

elves.forEach((elf) => {
  const values = elf.split("\n").map((value) => Number(value));
  calories.push(values.reduce((a, b) => a + b));
});
calories.sort((a, b) => b - a);
// part 1
console.log(calories[0]);
// part 2
console.log(calories[0] + calories[1] + calories[2]);
