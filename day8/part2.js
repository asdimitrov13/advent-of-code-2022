const fs = require("fs");
const input = fs.readFileSync(__dirname + "/input.txt").toString();

const lines = input.split("\n");

const grid = [];

for (let i = 0; i < lines.length; i++) {
  grid.push([]);

  for (let j = 0; j < lines[i].length; j++) {
    grid[i].push(Number(lines[i][j]));
  }
}

let maxScenic = 0;

for (let i = 1; i < grid.length - 1; i++) {
  for (let j = 1; j < grid[i].length - 1; j++) {
    let visibleTop = 0,
      visibleBottom = 0,
      visibleLeft = 0,
      visibleRight = 0;

    for (let t = i - 1; t >= 0; t--) {
      visibleTop++;
      if (grid[t][j] >= grid[i][j]) {
        break;
      }
    }

    for (let t = i + 1; t < grid.length; t++) {
      visibleBottom++;
      if (grid[t][j] >= grid[i][j]) {
        break;
      }
    }

    for (let t = j - 1; t >= 0; t--) {
      visibleLeft++;
      if (grid[i][t] >= grid[i][j]) {
        break;
      }
    }

    for (let t = j + 1; t < grid[i].length; t++) {
      visibleRight++;
      if (grid[i][t] >= grid[i][j]) {
        break;
      }
    }

    const scenicScore = visibleBottom * visibleTop * visibleLeft * visibleRight;

    if (scenicScore > maxScenic) {
      maxScenic = scenicScore;
    }
  }
}

console.log(grid);
console.log(maxScenic);
