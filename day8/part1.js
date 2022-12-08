const fs = require("fs");
const input = fs.readFileSync("./input.txt").toString();

const lines = input.split("\n");

const grid = [];

for (let i = 0; i < lines.length; i++) {
  grid.push([]);

  for (let j = 0; j < lines[i].length; j++) {
    grid[i].push(Number(lines[i][j]));
  }
}

let nOfVisibleTrees = lines.length * 2 + (lines[0].length - 2) * 2;

for (let i = 1; i < grid.length - 1; i++) {
  for (let j = 1; j < grid[i].length - 1; j++) {
    const leftSide = grid[i].slice(0, j);
    if (Math.max(...leftSide) < grid[i][j]) {
      nOfVisibleTrees++;
      console.log(`${grid[i][j]} is visible at ${i}, ${j} from left`);
      continue;
    }

    const rightSide = grid[i].slice(j + 1, grid[i].length);
    if (Math.max(...rightSide) < grid[i][j]) {
      nOfVisibleTrees++;
      console.log(`${grid[i][j]} is visible at ${i}, ${j} from right`);
      continue;
    }

    let topClear = true;
    let bottomClear = true;

    for (let k = 0; k < grid.length; k++) {
      if (k < i && grid[k][j] >= grid[i][j]) {
        topClear = false;
        continue;
      }

      if (k > i && grid[k][j] >= grid[i][j]) {
        bottomClear = false;
        continue;
      }
    }

    if (topClear || bottomClear) {
      console.log(
        `${grid[i][j]} is visible at ${i}, ${j} from ${
          topClear ? "top" : "bottom"
        }`
      );
      nOfVisibleTrees++;
    }
  }
}

console.log(grid);
console.log(nOfVisibleTrees);
