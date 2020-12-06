const fs = require("fs");

const inputGroups = fs.readFileSync("./input.txt", "utf-8").split("\n\n");

function part1() {
  const result = inputGroups
    .map(
      (group) =>
        group
          .replace(/\n/g, "")
          .split("")
          .filter((val, idx, self) => self.indexOf(val) === idx).length
    )
    .reduce((acc, len) => acc + len, 0);

  console.log(result);
}

function part2() {
  const result = inputGroups
    .map((group) => {
      const byGroup = group.split("\n");
      const first = byGroup.pop();

      return first
        .split("")
        .filter((anwser) => byGroup.every((a) => a.includes(anwser))).length;
    })
    .reduce((acc, len) => acc + len, 0);

  console.log(result);
}

part1();
part2();
