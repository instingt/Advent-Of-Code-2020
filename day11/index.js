const { count } = require("console");
const fs = require("fs");

const input = fs
  .readFileSync("./input.txt", "utf-8")
  .split("\n")
  .map((row) => row.split(""));

function part1() {
  function countOccupiedSeats(arr, i, j) {
    let count = 0;

    function checkPlace(i, j) {
      if (i < 0 || j < 0) {
        return false;
      }

      if (i >= arr.length) {
        return false;
      }

      if (j >= arr[i].length) {
        return false;
      }

      if (arr[i][j] === "." || arr[i][j] === "L") {
        return false;
      }

      return true;
    }

    // top-left
    if (checkPlace(i - 1, j - 1)) {
      count += 1;
    }
    // top
    if (checkPlace(i - 1, j)) {
      count += 1;
    }
    // top-right
    if (checkPlace(i - 1, j + 1)) {
      count += 1;
    }
    // left
    if (checkPlace(i, j - 1)) {
      count += 1;
    }
    // right
    if (checkPlace(i, j + 1)) {
      count += 1;
    }
    // bottom-left
    if (checkPlace(i + 1, j - 1)) {
      count += 1;
    }
    // bottom
    if (checkPlace(i + 1, j)) {
      count += 1;
    }
    // bottom-right
    if (checkPlace(i + 1, j + 1)) {
      count += 1;
    }

    return count;
  }

  let prev = makeRound(input, countOccupiedSeats, 4);

  while (true) {
    const next = makeRound(prev, countOccupiedSeats, 4);

    if (complare2dArraies(prev, next)) {
      break;
    }

    prev = next;
  }

  console.log(countOccupiedPlaces(prev));
}

function part2() {
  function countOccupiedSeats(arr, i, j) {
    let count = 0;

    function checkPlace(i, j, di, dj) {
      i += di;
      j += dj;

      while (i >= 0 && j >= 0 && i < arr.length && j < arr[i].length) {
        if (arr[i][j] === "#") {
          return true;
        }

        if (arr[i][j] === "L") {
          return false;
        }

        i += di;
        j += dj;
      }

      return false;
    }

    // top-left
    if (checkPlace(i, j, -1, -1)) {
      count += 1;
    }
    // top
    if (checkPlace(i, j, -1, 0)) {
      count += 1;
    }
    // top-right
    if (checkPlace(i, j, -1, 1)) {
      count += 1;
    }
    // left
    if (checkPlace(i, j, 0, -1)) {
      count += 1;
    }
    // right
    if (checkPlace(i, j, 0, 1)) {
      count += 1;
    }
    // bottom-left
    if (checkPlace(i, j, 1, -1)) {
      count += 1;
    }
    // bottom
    if (checkPlace(i, j, 1, 0)) {
      count += 1;
    }
    // bottom-right
    if (checkPlace(i, j, 1, 1)) {
      count += 1;
    }

    return count;
  }

  let prev = makeRound(input, countOccupiedSeats, 5);

  while (true) {
    const next = makeRound(prev, countOccupiedSeats, 5);

    if (complare2dArraies(prev, next)) {
      break;
    }

    prev = next;
  }

  // print2dArray(prev);
  console.log(countOccupiedPlaces(prev));
}

function print2dArray(arr) {
  console.log(arr.map((row) => row.join("")).join("\n"));
}

function clone2dArray(arr) {
  return [...arr.map((row) => [...row])];
}

function complare2dArraies(arr1, arr2) {
  for (let i = 0; i < input.length; i++) {
    for (let j = 0; j < input[i].length; j++) {
      if (arr1[i][j] !== arr2[i][j]) {
        return false;
      }
    }
  }

  return true;
}

function countOccupiedPlaces(arr) {
  let count = 0;

  for (let i = 0; i < arr.length; i++) {
    for (let j = 0; j < arr[i].length; j++) {
      if (arr[i][j] === "#") {
        count += 1;
      }
    }
  }

  return count;
}

function makeRound(arr, countFn, minOccupiedCount) {
  const result = clone2dArray(arr);

  for (let i = 0; i < arr.length; i++) {
    for (let j = 0; j < arr[i].length; j++) {
      const occupiedCount = countFn(arr, i, j);

      if (arr[i][j] === ".") {
        continue;
      }

      if (arr[i][j] === "L" && occupiedCount === 0) {
        result[i][j] = "#";
        continue;
      }

      if (arr[i][j] === "#" && occupiedCount >= minOccupiedCount) {
        result[i][j] = "L";
      }
    }
  }

  return result;
}

part1();
part2();
