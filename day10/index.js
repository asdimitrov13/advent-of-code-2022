const fs = require("fs");
const input = fs.readFileSync(__dirname + "/input.txt").toString();

const commands = [];
let x = 1;
let result = 0;

input.split("\n").forEach((line) => {
  //const [command, value] = line.split(" ");

  if (line.split(" ")[0] === "noop") {
    commands.push({ command: line, cycles: 1 });
    return;
  }

  commands.push({ command: line, cycles: 2 });
});

let currentCommand = commands.shift();
let i = 0;

const cycles = [];

while (commands.length) {
  if (i === 19 || (i - 19) % 40 === 0) {
    result += (i + 1) * x;
  }
  cycles.push(x);
  i++;

  if (currentCommand.command !== "noop") {
    if (currentCommand.cycles > 1) {
      currentCommand.cycles--;
      continue;
    }
    const [_, value] = currentCommand.command.split(" ");
    x += Number(value);
  }

  currentCommand = commands.shift();
}

// part 1
console.log(result);

// part2

console.log(cycles);

let cycleCounter = 0;
for (let i = 0; i < 6; i++) {
  let row = "";
  for (let j = 0; j < 40; j++) {
    const spritePos = cycles[cycleCounter];
    if (j === spritePos - 1 || j === spritePos || j === spritePos + 1) {
      row += "#";
    } else {
      row += ".";
    }
    cycleCounter++;
  }
  console.log(row);
}
