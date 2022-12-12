const fs = require("fs");
const input = fs.readFileSync(__dirname + "/input.txt").toString();

const lines = input.split("\n");

let startX = 0;
let startY = 0;

let headX = startX;
let headY = startY;

const visitedPositions = [{ x: startX, y: startY }];

const knotPositions = [
  { x: 0, y: 0 },
  { x: 0, y: 0 },
  { x: 0, y: 0 },
  { x: 0, y: 0 },
  { x: 0, y: 0 },
  { x: 0, y: 0 },
  { x: 0, y: 0 },
  { x: 0, y: 0 },
  { x: 0, y: 0 },
];

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

const moveKnot = (hX, hY, knot) => {
  if (!isCloseEnough(hX, hY, knot.x, knot.y)) {
    if (hX === knot.x) {
      if (hY > knot.y) {
        knot.y++;
      } else {
        knot.y--;
      }
    } else if (hY === knot.y) {
      if (hX > knot.x) {
        knot.x++;
      } else {
        knot.x--;
      }
    } else {
      hX > knot.x ? knot.x++ : knot.x--;
      hY > knot.y ? knot.y++ : knot.y--;
    }

    return true;
  }
  return false;
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

    moveKnot(headX, headY, knotPositions[0]);

    for (let i = 1; i < knotPositions.length - 1; i++) {
      moveKnot(
        knotPositions[i - 1].x,
        knotPositions[i - 1].y,
        knotPositions[i]
      );
    }

    if (moveKnot(knotPositions[7].x, knotPositions[7].y, knotPositions[8])) {
      addMove(knotPositions[8].x, knotPositions[8].y);
    }

    distance--;
  }
});

console.log(visitedPositions.length);
