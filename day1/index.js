const fs = require("fs");

const input = fs
  .readFileSync("./input1.txt", "utf-8")
  .split("\n")
  .map((n) => parseInt(n));

/**
 * Part 1
 */
function part1() {
  while (input.length) {
    const num = input.pop();

    input.forEach((n) => {
      // console.log(`${num} + ${n} = ${num + n}`);
      if (n + num === 2020) {
        console.log("found", num, n, num * n);
      }
    });
  }
}

/**
 * Part 2
 */
function part2() {
  while (input.length) {
    const num1 = input.pop();
    const inputCopy = [...input];

    while (inputCopy.length) {
      const num2 = inputCopy.pop();

      inputCopy.forEach((n) => {
        if (num1 + num2 + n === 2020) {
          console.log("found", num1, num2, n, num1 * num2 * n);
        }
      });
    }
  }
}

part2();
