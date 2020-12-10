const fs = require("fs");

const input = fs
  .readFileSync("./input.txt", "utf-8")
  .split("\n")
  .map((n) => parseInt(n));

const initial = 0;
const deviceAdapter = Math.max(...input) + 3;

input.push(initial, deviceAdapter);
input.sort((a, b) => a - b);

function part1() {
  let one = 0;
  let three = 0;

  for (let i = 0; i < input.length - 1; i++) {
    const diff = input[i + 1] - input[i];

    if (diff === 3) {
      three += 1;
    }

    if (diff === 1) {
      one += 1;
    }
  }

  console.log(
    `One diff = ${one}; Three diff = ${three}; Result is ${one * three}`
  );
}

function part2() {
  const visited = {};

  function make(i) {
    if (i === input.length - 1) {
      return 1;
    }

    if (i in visited) {
      return visited[i];
    }

    let result = 0;

    for (let j = i + 1; j < input.length; j++) {
      if (input[j] - input[i] <= 3) {
        result += make(j);
      }
    }

    visited[i] = result;
    return result;
  }

  console.log(make(0));
}

part1();
part2();
