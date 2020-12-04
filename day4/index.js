const { RSA_NO_PADDING } = require("constants");
const fs = require("fs");

const input = fs
  .readFileSync("./input.txt", "utf-8")
  .split("\n\n")
  .map((passport) => parsePassport(passport));

function part1() {
  console.log(
    input.filter((passport) => validateRequiredFields(passport)).length
  );
}

function part2() {
  console.log(input.filter((p) => validatePassport(p)).length);
}

function parsePassport(passport) {
  const result = {};

  passport
    .replace(/\n/g, " ")
    .split(" ")
    .forEach((e) => {
      const [key, value] = e.split(":");

      result[key] = value;
    });

  return result;
}

function validateRequiredFields(passport) {
  const requiredFields = ["byr", "iyr", "eyr", "hgt", "hcl", "ecl", "pid"];

  return requiredFields.every((fields) => fields in passport);
}

function validatePassport(passport) {
  if (!validateRequiredFields(passport)) {
    return false;
  }

  function validateIntNumber(n, min, max) {
    const int = parseInt(n);

    if (isNaN(int) || int < min || int > max) {
      return false;
    }

    return true;
  }

  // byr (Birth Year) - four digits; at least 1920 and at most 2002.
  if (!validateIntNumber(passport.byr, 1920, 2002)) {
    return false;
  }

  // iyr (Issue Year) - four digits; at least 2010 and at most 2020.
  if (!validateIntNumber(passport.iyr, 2010, 2020)) {
    return false;
  }

  // eyr (Expiration Year) - four digits; at least 2020 and at most 2030.
  if (!validateIntNumber(passport.eyr, 2020, 2030)) {
    return false;
  }

  // hgt (Height) - a number followed by either cm or in:
  // If cm, the number must be at least 150 and at most 193.
  // If in, the number must be at least 59 and at most 76.
  const dem = passport.hgt.slice(-2);

  if (dem !== "cm" && dem !== "in") {
    return false;
  }

  if (dem === "cm" && !validateIntNumber(passport.hgt, 150, 193)) {
    return false;
  }

  if (dem === "in" && !validateIntNumber(passport.hgt, 59, 76)) {
    return false;
  }

  // hcl (Hair Color) - a # followed by exactly six characters 0-9 or a-f.
  if (passport.hcl[0] !== "#" || isNaN(parseInt(passport.hgt.slice(1), 16))) {
    return false;
  }
  // ecl (Eye Color) - exactly one of: amb blu brn gry grn hzl oth.
  const possibleEyesColors = ["amb", "blu", "brn", "gry", "grn", "hzl", "oth"];

  if (!possibleEyesColors.includes(passport.ecl)) {
    return false;
  }
  // pid (Passport ID) - a nine-digit number, including leading zeroes.
  if (
    passport.pid.length !== 9 ||
    passport.pid.split("").some((digit) => isNaN(parseInt(digit), 10))
  ) {
    return false;
  }
  return true;
}

part1();
part2();
