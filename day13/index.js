const fs = require("fs");
const input = fs.readFileSync(__dirname + "/input.txt").toString();

const compareNumbers = (left, right) => {
  if (left === right) {
    return 0;
  }

  return left < right ? -1 : 1;
};

const compareArrays = (left, right) => {
  if (left.length === 0 && right.length !== 0) return -1;
  if (right.length === 0 && left.length !== 0) return 1;
  if (left === undefined && right !== undefined) {
    return -1;
  }

  if (left !== undefined && right === undefined) {
    return 1;
  }
  for (let i = 0; i < right.length; i++) {
    if (left[i] === undefined && right[i] === undefined) return 0;
    if (left[i] === undefined && right[i] !== undefined) {
      return -1;
    }

    if (left[i] !== undefined && right[i] === undefined) {
      return 1;
    }
    // both are same type
    if (typeof left[i] === typeof right[i]) {
      // both are numbers
      if (typeof left[i] === "number") {
        const result = compareNumbers(left[i], right[i]);
        if (result === 0) continue;

        return result;
      }
      // both are arrays
      if (typeof left[i] === "object") {
        const result = compareArrays(left[i], right[i]);
        if (result === 0 && left[i].length > right[i].length) return 1;
        if (result === 0) continue;

        return result;
      }
    }

    // left is number, right is array
    if (typeof left[i] === "number") {
      const result = compareArrays([left[i]], right[i]);
      if (result === 0) continue;
      return result;
    }

    // left is array, right is number
    if (typeof right[i] === "number") {
      const result = compareArrays(left[i], [right[i]]);
      if (result === 0) continue;
      return result;
    }
  }

  return 0;
};
const packets = [[[2]], [[6]]];
let answer = 0;
input.split("\n\n").forEach((pair, i) => {
  const [left, right] = pair.split("\n").map((packet) => JSON.parse(packet));
  packets.push(left);
  packets.push(right);
  let ordered = 1;
  let comparison = compareArrays(left, right);
  if (comparison !== 0) {
    ordered = comparison;
  }
  ordered === -1 ? (answer += i + 1) : null;
});

// part 1
console.log(answer);

packets.sort((a, b) => compareArrays(a, b));

let firstIndex;
let secondIndex;
packets.forEach((packet, i) => {
  if (packet.length === 1 && packet[0].length === 1 && packet[0][0] === 2) {
    firstIndex = i + 1;
  }
  if (packet.length === 1 && packet[0].length === 1 && packet[0][0] === 6) {
    secondIndex = i + 1;
  }
});

console.log(firstIndex);
console.log(secondIndex);
//part 2
console.log(firstIndex * secondIndex);
