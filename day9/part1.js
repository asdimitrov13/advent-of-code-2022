const fs = require("fs");
const input = fs.readFileSync(__dirname + "/input.txt").toString();

const lines = input.split("\n");

let startX = 0;
let startY = 0;

let headX = startX;
let headY = startY;

let tailX = startX;
let tailY = startY;

const visitedPositions = [{ x: startX, y: startY }];

const isCloseEnough = (hX, hY, tX, tY) => {
  return Math.abs(hX - tX) < 2 && Math.abs(hY - tY) < 2;
};

const addMove = (newX, newY) => {
  if (
    !visitedPositions.filter((pos) => pos.x === newX && pos.y === newY).length
  ) {
    visitedPositions.push({ x: newX, y: newY });
  }
};

lines.forEach((move) => {
  let [direction, distance] = move.split(" ");

  while (distance) {
    if (direction === "U") {
      headY--;
    }
    if (direction === "D") {
      headY++;
    }
    if (direction === "L") {
      headX--;
    }
    if (direction === "R") {
      headX++;
    }

    if (!isCloseEnough(headX, headY, tailX, tailY)) {
      if (headX === tailX) {
        if (headY > tailY) {
          tailY++;
        } else {
          tailY--;
        }
      } else if (headY === tailY) {
        if (headX > tailX) {
          tailX++;
        } else {
          tailX--;
        }
      } else {
        headX > tailX ? tailX++ : tailX--;
        headY > tailY ? tailY++ : tailY--;
      }

      addMove(tailX, tailY);
    }

    distance--;
  }
});

console.log(visitedPositions.length);
