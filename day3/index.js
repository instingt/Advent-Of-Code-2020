const fs = require("fs");

const input = fs
  .readFileSync("./input.txt", "utf-8")
  .split("\n")
  .map((line) => line.split(""));

function part1() {
  const slope = {
    right: 3,
    down: 1,
  };

  console.log(encountTrees(slope));
}

function part2() {
  const slopes = [
    {
      right: 1,
      down: 1,
    },
    {
      right: 3,
      down: 1,
    },
    {
      right: 5,
      down: 1,
    },
    {
      right: 7,
      down: 1,
    },
    {
      right: 1,
      down: 2,
    },
  ];

  const result = slopes
    .map((slope) => encountTrees(slope))
    .reduce((acc, TreesCount) => acc * TreesCount, 1);

  console.log(result);
}

function encountTrees(slope) {
  let x = 0;
  let y = 0;
  let treeCount = 0;

  while (y < input.length) {
    const line = input[y];
    if (line[x % line.length] === "#") {
      treeCount += 1;
    }

    x += slope.right;
    y += slope.down;
  }

  return treeCount;
}

part2();
