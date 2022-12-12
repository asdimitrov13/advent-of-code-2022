const fs = require("fs");
const input = fs.readFileSync(__dirname + "/input.txt").toString();

const monkeyData = input.split("\n\n");

const monkeys = [];

const inspect = (item, operation) => {
  const tokens = operation.split(" ");

  if (tokens[2] !== "old") {
    return tokens[1] === "+"
      ? item + Number(tokens[2])
      : item * Number(tokens[2]);
  }

  return item * item;
};

monkeyData.forEach((monkey, i) => {
  monkeyLines = monkey.split("\n");

  const newMonkey = {};
  newMonkey.items = monkeyLines[1]
    .substring(18)
    .split(", ")
    .map((item) => Number(item));

  newMonkey.operation = monkeyLines[2].substring(19);
  newMonkey.test = Number(monkeyLines[3].substring(21));

  newMonkey.pass = Number(monkeyLines[4].substring(29));
  newMonkey.fail = Number(monkeyLines[5].substring(30));

  monkeys.push(newMonkey);
});

const inspections = new Array(monkeys.length).fill(0);

for (let j = 0; j < 1000; j++) {
  monkeys.forEach((monkey, i) => {
    while (monkey.items.length) {
      let currentItem = monkey.items.shift();
      currentItem = inspect(currentItem, monkey.operation);
      inspections[i]++;

      // currentItem = Math.floor(currentItem / 3);

      if (currentItem % monkey.test === 0) {
        monkeys[monkey.pass].items.push(currentItem);
      } else {
        monkeys[monkey.fail].items.push(currentItem);
      }
    }
  });
}

inspections.sort((a, b) => b - a);
console.log(inspections);
console.log(inspections[0] * inspections[1]);
