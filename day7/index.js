const fs = require("fs");
const input = fs.readFileSync("./input1.txt").toString();

const lines = input.split("\n");

const dirs = {};
const dirStack = [];

let first = true;

lines.forEach((line) => {
  const tokens = line.split(" ");

  if (tokens[0] === "$") {
    if (tokens[1] === "ls") {
      return;
    }

    if (tokens[1] === "cd" && tokens[2] !== "..") {
      const currentPath = first
        ? "/"
        : dirStack.reduce((a, b) => a + "/" + b) + "/" + tokens[2];

      first = false;

      dirs[currentPath] = { type: "dir", children: [] };
      dirStack.push(tokens[2]);

      return;
    } else {
      dirStack.pop();
    }
  } else {
    const currentPath = dirStack.reduce((a, b) => a + "/" + b);
    dirs[currentPath].children.push(currentPath + "/" + tokens[1]);

    if (tokens[0] !== "dir") {
      dirs[currentPath + "/" + tokens[1]] = {
        size: Number(tokens[0]),
        type: "file",
      };
    }
  }
});

const calculateSize = (name) => {
  if (dirs[name].type === "file") {
    return dirs[name].size;
  } else {
    let sum = 0;

    dirs[name].children.forEach((child) => {
      sum += calculateSize(child);
    });

    return sum;
  }
};

let result = 0;

Object.keys(dirs).forEach((name) => {
  if (dirs[name].type === "dir") {
    dirs[name].size = calculateSize(name);
    if (dirs[name].size <= 100000) {
      result += dirs[name].size;
    }
  }
});
console.log(dirs);
// part1
console.log(result);

// part2
const memoryRemaining = 70000000 - dirs["/"].size;

const potentialFoldersForDelete = [];

Object.keys(dirs).forEach((name) => {
  if (dirs[name].type === "dir") {
    if (dirs[name].size > 30000000 - memoryRemaining) {
      potentialFoldersForDelete.push(dirs[name].size);
    }
  }
});
potentialFoldersForDelete.sort((a, b) => a - b);

console.log(potentialFoldersForDelete[0]);
