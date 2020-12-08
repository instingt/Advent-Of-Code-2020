const fs = require("fs");

const input = fs.readFileSync("./input.txt", "utf-8").split("\n");

let acc = 0;
let count = 0;
const visited = [];

for (let i = 0; i < input.length; i++) {
  if (visited.includes(i)) {
    console.log(visited.join("\n"));
    console.log("----------------------------");
    visited.length = 0;
    count += 1;
  }

  if (count > 2) {
    process.exit(1);
  }

  visited.push(i);

  const instr = parseInstruaction(input[i]);

  switch (instr.code) {
    case "acc":
      acc += instr.argument;
      break;
    case "jmp":
      i += instr.argument - 1;
      break;
    case "nop":
    default:
      break;
  }
}

console.log(acc);

function parseInstruaction(instruction) {
  const [instr, arg] = instruction.split(" ");

  return {
    code: instr,
    argument: parseInt(arg),
  };
}
