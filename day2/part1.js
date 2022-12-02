const fs = require("fs");
const input = fs.readFileSync("./input.txt").toString();

const oponentMap = {
  A: "rock",
  B: "paper",
  C: "scissors",
};

const myMap = {
  X: "rock",
  Y: "paper",
  Z: "scissors",
};

const pointsMap = {
  rock: 1,
  paper: 2,
  scissors: 3,
};

let total = 0;

input.split("\n").forEach((game) => {
  let choices = game.split(" ");

  choices[0] = oponentMap[choices[0]];
  choices[1] = myMap[choices[1]];

  total += pointsMap[choices[1]];

  if (choices[0] === choices[1]) {
    total += 3;
  } else {
    if (
      (choices[1] === "paper" && choices[0] === "rock") ||
      (choices[1] === "scissors" && choices[0] === "paper") ||
      (choices[1] === "rock" && choices[0] === "scissors")
    ) {
      total += 6;
    }
  }
});

console.log(total);
