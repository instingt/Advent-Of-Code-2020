const fs = require("fs");

const input = fs.readFileSync("./input.txt", "utf-8").split("\n");
const parsedIds = input.map((seatCode) => parseSeatId(seatCode));

function part1() {
  console.log(Math.max(...parsedIds));
}

function part2() {
  parsedIds.sort((a, b) => a - b);

  for (let i = parsedIds[0]; i < parsedIds[parsedIds.length - 1]; i++) {
    if (
      parsedIds.indexOf(i) === -1 &&
      ~parsedIds.indexOf(i + 1) &&
      ~parsedIds.indexOf(i - 1)
    ) {
      console.log(i);
    }
  }
}

function parseSeatId(code) {
  const row = parseInt(
    code.slice(0, 7).replace(/F/g, "0").replace(/B/g, "1"),
    2
  );
  const col = parseInt(code.slice(-3).replace(/L/g, "0").replace(/R/g, "1"), 2);

  return row * 8 + col;
}

part1();
part2();
