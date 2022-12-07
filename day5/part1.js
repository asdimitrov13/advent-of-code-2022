const fs = require("fs");
const input = fs.readFileSync("./input.txt").toString();

const [stacks, moves] = input.split("\n\n");

const stackLines = stacks.split("\n");

let nOfStacks = (stackLines[0].length + 1) / 4;

const stacksArr = [];
while (nOfStacks--) {
  stacksArr[nOfStacks] = [];
}
for (let i = 0; i < stackLines.length - 1; i++) {
  for (let j = 1; j < stackLines[i].length; j += 4) {
    if (stackLines[i][j] !== " ") {
      stacksArr[(j - 1) / 4].push(stackLines[i][j]);
    }
  }
}

for (let i = 0; i < stacksArr.length; i++) {
  stacksArr[i] = stacksArr[i].reverse();
}

console.log(stacksArr);

const moveLines = moves.split("\n");
for (let i = 0; i < moveLines.length; i++) {
  const instructions = moveLines[i].split(" ");

  const crates = Number(instructions[1]);
  const from = Number(instructions[3] - 1);
  const to = Number(instructions[5] - 1);

  for (let j = 0; j < crates; j++) {
    stacksArr[to].push(stacksArr[from].pop());
  }
}
let answer = "";
for (let i = 0; i < stacksArr.length; i++) {
  answer += stacksArr[i].pop();
}

console.log(answer);
