const fs = require("fs");
const input = fs.readFileSync("./input.txt").toString();

const pairs = input.split("\n");

let partialOverlaps = 0;
let completeOverlaps = 0;

pairs.forEach((pair) => {
  const ranges = pair.split(",");

  const start1 = Number(ranges[0].split("-")[0]);
  const end1 = Number(ranges[0].split("-")[1]);

  const start2 = Number(ranges[1].split("-")[0]);
  const end2 = Number(ranges[1].split("-")[1]);

  const completeOverlap =
    (start1 >= start2 && end1 <= end2) || (start2 >= start1 && end2 <= end1);

  const partialOverlap =
    completeOverlap ||
    (start1 >= start2 && start1 <= end2) ||
    (start2 <= end1 && end2 >= end1);

  completeOverlap ? completeOverlaps++ : null;
  partialOverlap ? partialOverlaps++ : null;
});
// part 1
console.log(completeOverlaps);

// part 2
console.log(partialOverlaps);
