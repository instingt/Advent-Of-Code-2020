const { count } = require("console");
const fs = require("fs");

const input = fs.readFileSync("./input.txt", "utf-8").split("\n");

function part1() {
  const bagMap = {};

  input.forEach((rule) => {
    const [container, content] = rule.replace(".", "").split(" bags contain ");

    if (!content) {
      return;
    }

    if (content === "no other bags") {
      bagMap[container] = [];
    }

    bagMap[container] = content
      .split(", ")
      .map((bag) => bag.replace(/\d+ /g, "").replace(/ bags?/g, ""));
  });

  const bugs = [];
  count("shiny gold");

  console.log(
    bugs.filter((bug, idx, self) => self.indexOf(bug) === idx).length
  );

  function count(bag) {
    for (const container in bagMap) {
      if (bagMap.hasOwnProperty(container)) {
        const element = bagMap[container];

        if (element.includes(bag)) {
          bugs.push(container);
          count(container);
        }
      }
    }
  }
}

function part2() {
  const bagMap = {};

  input.forEach((rule) => {
    const [container, content] = rule.replace(".", "").split(" bags contain ");

    if (!content) {
      return;
    }

    if (/no other bags?/.test(content)) {
      bagMap[container] = [];
      return;
    }

    bagMap[container] = content
      .split(", ")
      .map((bag) => bag.replace(/ bags?/g, "").split(" "))
      .map((bag) => [bag[0], bag.slice(1).join(" ")]);
  });

  function count(bag) {
    let sum = 0;

    for (let i = 0; i < bag.length; i++) {
      const [multiplier, content] = bag[i];

      sum += multiplier * (1 + count(bagMap[content]));
    }

    return sum;
  }

  console.log(count(bagMap["shiny gold"]));
}

// part1();
part2();
