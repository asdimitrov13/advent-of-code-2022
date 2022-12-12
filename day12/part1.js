const fs = require("fs");
const input = fs.readFileSync(__dirname + "/input.txt").toString();

const grid = [];
let startX;
let startY;
let endX;
let endY;
input.split("\n").forEach((line, i) => {
  grid.push([]);

  [...line].forEach((node, j) => {
    if (node === "S") {
      grid[i].push("a");
      startX = j;
      startY = i;
      return;
    }
    if (node === "E") {
      grid[i].push("z");
      endX = j;
      endY = i;
      return;
    }
    grid[i].push(node);
  });
});

const visited = [];
grid.forEach((line) => {
  visited.push(new Array(line.length).fill(false));
});

const isValid = (x, y, newX, newY) => {
  // check if in bounds
  if (newX < 0 || newX >= grid[0].length || newY < 0 || newY >= grid.length) {
    return false;
  }

  // check if visited already
  if (visited[newY][newX]) {
    return false;
  }

  //check if move is possible
  return grid[y][x].charCodeAt(0) - grid[newY][newX].charCodeAt(0) >= -1;
};

const queue = [];
queue.push({ x: startX, y: startY, distance: 0 });
visited[startY][startX] = true;

let minimumDistance = Number.MAX_SAFE_INTEGER;

while (queue.length) {
  const currentNode = queue.shift();

  // check if end reached
  if (currentNode.x === endX && currentNode.y === endY) {
    minimumDistance = currentNode.distance;
    break;
  }

  // add all possible moves to the queue

  // up
  if (isValid(currentNode.x, currentNode.y, currentNode.x, currentNode.y - 1)) {
    const newNode = {
      x: currentNode.x,
      y: currentNode.y - 1,
      distance: currentNode.distance + 1,
    };
    queue.push(newNode);
    visited[newNode.y][newNode.x] = true;
  }
  // down
  if (isValid(currentNode.x, currentNode.y, currentNode.x, currentNode.y + 1)) {
    const newNode = {
      x: currentNode.x,
      y: currentNode.y + 1,
      distance: currentNode.distance + 1,
    };
    queue.push(newNode);
    visited[newNode.y][newNode.x] = true;
  }
  // left
  if (isValid(currentNode.x, currentNode.y, currentNode.x - 1, currentNode.y)) {
    const newNode = {
      x: currentNode.x - 1,
      y: currentNode.y,
      distance: currentNode.distance + 1,
    };
    queue.push(newNode);
    visited[newNode.y][newNode.x] = true;
  }
  // right
  if (isValid(currentNode.x, currentNode.y, currentNode.x + 1, currentNode.y)) {
    const newNode = {
      x: currentNode.x + 1,
      y: currentNode.y,
      distance: currentNode.distance + 1,
    };
    queue.push(newNode);
    visited[newNode.y][newNode.x] = true;
  }
}

console.log(minimumDistance);
