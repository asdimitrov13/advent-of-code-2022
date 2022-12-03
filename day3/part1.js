const fs = require("fs");
const input = fs.readFileSync("./input.txt").toString();

const repetitions = {};

input.split("\n").forEach((line, i) => {
  const firstComp = new Set([...line.substring(0, line.length / 2)]);
  const secondComp = new Set([...line.substring(line.length / 2)]);

  repetitions[i] = [...firstComp].filter((a) => secondComp.has(a));
});

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
