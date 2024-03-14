// const fs = require("fs");
// let input = fs.readFileSync("/dev/stdin").toString().trim().split("\n");

let input = `show me the money
4
1 0 3 2 1 0 0 2 0 0 0 0 4 1 2 0 0 0 1 2 0 0 1 0 1 0`.split("\n");

function convertAlpthToIndex(char) {
  return char.toUpperCase().charCodeAt(0) - "A".charCodeAt(0);
}

function solution() {
  const content = input[0];
  const title = content
    .split(" ")
    .map((el) => el[0])
    .join("")
    .toUpperCase();

  let remainSpaceCnt = Number(input[1]);
  const remainAlpha = input[2].split(" ").map(Number);

  let preChar = null;
  const chars = title + content;
  for (const char of chars) {
    if (preChar === char) continue;

    preChar = char;
    if (char === " ") {
      remainSpaceCnt--;
      if (remainSpaceCnt < 0) {
        console.log("-1");
        return;
      }
    } else {
      let keyboardIndex = convertAlpthToIndex(char);
      remainAlpha[keyboardIndex]--;
      if (remainAlpha[keyboardIndex] < 0) {
        console.log("-1");
        return;
      }
    }
  }

  console.log(title);
}

solution();
