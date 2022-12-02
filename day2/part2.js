const fs = require("fs");
const input = fs.readFileSync("./input.txt").toString();

const oponentMap = {
  A: "rock",
  B: "paper",
  C: "scissors",
};

const outcomeMap = {
  X: 0,
  Y: 3,
  Z: 6,
};

const pointsMap = {
  rock: 1,
  paper: 2,
  scissors: 3,
};

const loseMap = {
  rock: "scissors",
  scissors: "paper",
  paper: "rock",
};

const winMap = {
  rock: "paper",
  scissors: "rock",
  paper: "scissors",
};

let total = 0;

input.split("\n").forEach((game) => {
  const oponentChoice = game.split(" ")[0];
  const outcome = game.split(" ")[1];

  total += outcomeMap[outcome];

  let myChoice;

  if (outcome === "X") {
    myChoice = loseMap[oponentMap[oponentChoice]];
  } else if (outcome === "Z") {
    myChoice = winMap[oponentMap[oponentChoice]];
  } else {
    myChoice = oponentMap[oponentChoice];
  }

  total += pointsMap[myChoice];
});

console.log(total);
