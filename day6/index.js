const fs = require("fs");
const input = fs.readFileSync("./input.txt").toString();

const findStartOfPacket = (signal, length) => {
  for (let i = 0; i < signal.length - length; i++) {
    const currentSegment = signal.slice(i, i + length);

    if (new Set(currentSegment).size === length) {
      return i + length;
    }
  }
};

//part 1
console.log(findStartOfPacket([...input], 4));
// part 2
console.log(findStartOfPacket([...input], 14));
