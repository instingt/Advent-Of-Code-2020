const fs = require("fs");

const input = fs.readFileSync("./input.txt", "utf-8").split("\n");

function part1() {
  const validPasswds = input.filter((entry) => {
    const [rule, password] = entry.split(": ");
    const parsedRule = parseRule(rule);
    const lettersCount = password
      .split("")
      .filter((letter) => letter === parsedRule.letter).length;
    const isValid =
      lettersCount >= parsedRule.min && lettersCount <= parsedRule.max;

    console.log(
      `Rule: ${JSON.stringify(
        parsedRule
      )}\n\tPassword: ${password}\n\tLetters Count: ${lettersCount}\n\tValid: ${isValid}`
    );

    return isValid;
  });

  console.log(validPasswds.length);
}

function part2() {
  const validPasswds = input.filter((entry) => {
    const [rule, password] = entry.split(": ");
    const parsedRule = parseRule2(rule);
    const one = password[parsedRule.first] === parsedRule.letter;
    const two = password[parsedRule.second] === parsedRule.letter;

    return one ^ two;
  });

  console.log(validPasswds.length);
}

function parseRule(rule) {
  const [counts, letter] = rule.split(" ");
  const [min, max] = counts.split("-");

  return {
    letter,
    max: parseInt(max),
    min: parseInt(min),
  };
}

function parseRule2(rule) {
  const [counts, letter] = rule.split(" ");
  const [min, max] = counts.split("-");

  return {
    letter,
    first: parseInt(max) - 1,
    second: parseInt(min) - 1,
  };
}

part2();
