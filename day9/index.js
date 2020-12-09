const fs = require("fs");

const initialInput = fs
  .readFileSync("./input.txt", "utf-8")
  .split("\n")
  .map((num) => parseInt(num));

function part1() {
  const input = [...initialInput];
  const pool = input.splice(0, 25);

  while (true) {
    const num = input.shift();

    if (!hasPair(pool, num)) {
      console.log(num);

      return num;
    }

    pool.push(num);
    pool.shift();
  }
}

function part2() {
  const invalidNumber = part1();
  let start = 0;

  while (true) {
    const numbers = [];
    let sum;

    for (let i = start; i < initialInput.length; i++) {
      numbers.push(initialInput[i]);
      sum = numbers.reduce((acc, n) => acc + n, 0);

      if (sum >= invalidNumber) {
        break;
      }
    }

    if (sum === invalidNumber) {
      const max = Math.max(...numbers);
      const min = Math.min(...numbers);

      console.log(`max: ${max}`);
      console.log(`min: ${min}`);
      console.log(`sum: ${max + min}`);

      return;
    }

    start += 1;
  }
}

function hasPair(pool, num) {
  for (const a of pool) {
    for (const b of pool) {
      if (a + b === num) {
        return true;
      }
    }
  }

  return false;
}

// part1();
part2();
