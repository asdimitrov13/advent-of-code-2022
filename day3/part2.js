const fs = require("fs");
const input = fs.readFileSync("./input.txt").toString();

const repetitions = {};

const dwarves = input.split("\n");

for (let i = 0; i < dwarves.length; i += 3) {
  const first = new Set([...dwarves[i]]);
  const second = new Set([...dwarves[i + 1]]);
  const third = new Set([...dwarves[i + 2]]);

  repetitions[i] = [first, second, third].reduce(([...a], b) =>
    a.filter((c) => b.has(c))
  );
}

const convertItem = (item) => {
  return item === item.toLowerCase()
    ? parseInt(item.charCodeAt(0) - 96)
    : parseInt(item.charCodeAt(0) - 38);
};

console.log(
  Object.keys(repetitions)
    .map((key) => repetitions[key][0])
    .reduce((prev, curr) => {
      return prev + convertItem(curr);
    }, 0)
);
