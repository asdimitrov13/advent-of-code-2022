const fs = require("fs");
const input = fs.readFileSync(__dirname + "/input.txt").toString();

let maxY = 0;
let maxX = 0;
let minX = Number.MAX_SAFE_INTEGER;

input.split("\n").forEach((line) => {
  const coordinates = line.split(" -> ");

  coordinates.forEach((coord) => {
    const [x, y] = coord.split(",").map((pos) => Number(pos));
    maxY = maxY < y ? y : maxY;
    maxX = maxX < x ? x : maxX;
    minX = minX > x ? x : minX;
  });
});

const caveMap = [];
for (let i = 0; i < maxY + 2; i++) {
  caveMap.push([]);
  for (let j = 0; j < maxX - minX + 3; j++) {
    caveMap[i][j] = ".";
  }
}

const printCaveToFile = (filename) => {
  for (let i = 0; i < caveMap.length; i++) {
    let line = "";
    for (let j = 0; j < caveMap[i].length; j++) {
      line += caveMap[i][j];
    }
    line += "\n";
    fs.writeFileSync(`./${filename}`, line, { flag: "a" });
  }
};

const printCave = () => {
  for (let i = 0; i < caveMap.length; i++) {
    let line = "";
    for (let j = 0; j < caveMap[i].length; j++) {
      line += caveMap[i][j];
    }
    console.log(line);
  }
  console.log("\n\n");
};

input.split("\n").forEach((line) => {
  const coordinates = line.split(" -> ");

  for (let i = 0; i < coordinates.length - 1; i++) {
    const [x1, y1] = coordinates[i].split(",").map((pos) => Number(pos));
    const [x2, y2] = coordinates[i + 1].split(",").map((pos) => Number(pos));

    for (let j = Math.min(x1, x2); j < Math.max(x1, x2) + 1; j++) {
      caveMap[y1][j - minX + 1] = "#";
    }

    for (let l = Math.min(y1, y2); l < Math.max(y1, y2) + 1; l++) {
      caveMap[l][x1 - minX + 1] = "#";
    }
  }
});

const sandDropX = 500 - minX + 1;
caveMap[0][sandDropX] = "+";

let sandX = sandDropX;
let sandY = 1;

let sandInfinity = false;

const moveSand = (x, y) => {
  if (y + 1 == caveMap.length) {
    return false;
  }
  if (caveMap[y + 1][x] === ".") {
    sandY++;
    return true;
  }

  if (caveMap[y + 1][x - 1] === ".") {
    sandY++;
    sandX--;
    return true;
  }

  if (caveMap[y + 1][x + 1] === ".") {
    sandY++;
    sandX++;
    return true;
  }

  return false;
};

let units = 0;
while (!sandInfinity) {
  while (moveSand(sandX, sandY)) {}
  caveMap[sandY][sandX] = "o";
  units++;
  if (sandY === maxY + 1) {
    sandInfinity = true;
  } else {
    sandX = sandDropX;
    sandY = 1;
  }
}

console.log(units - 1);
