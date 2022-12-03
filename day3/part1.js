const fs = require("fs");
const input = fs.readFileSync("./input.txt").toString();

const repetitions = {};

input.split("\n").forEach((line, i) => {
  const firstComp = line.substring(0, line.length / 2);
  const secondComp = line.substring(line.length / 2);

  [...firstComp].forEach((item) => {
    if (secondComp.indexOf(item) !== -1) {
      repetitions[i] = item;
    }
  });
});

const convertItem = (item) => {
  return item === item.toLowerCase()
    ? parseInt(item.charCodeAt(0) - 96)
    : parseInt(item.charCodeAt(0) - 38);
};

console.log(
  Object.keys(repetitions)
    .map((key) => repetitions[key])
    .reduce((prev, curr) => {
      return prev + convertItem(curr);
    }, 0)
);
