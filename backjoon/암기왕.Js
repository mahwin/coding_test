const fs = require("fs");
const input = fs.readFileSync("./dev/stdin").toString().trim().split("\n");

const parser = (arr) => {
  arr
    .split(" ")
    .map(Number)
    .sort((a, b) => a - b);
};

const solution = () => {
  const N = Number(input.shift());
  for (let i = 0; i < T; i++) {
    input.shift();
    const first = parser(input.shift());
    input.shift();
    const second = input.shift().split(" ").map(Number);
    let answer = [];
    second.forEach((target) => {
      let min = 0;
      let max = first.length - 1;
      let mid;
      let success = false;
      while (min <= max) {
        mid = Math.floor((min + max) / 2);
        if (first[mid] == target) {
          success = true;
          break;
        } else if (first[mid] < target) {
          min++;
        } else {
          max--;
        }
      }
      success ? answer.push(1) : answer.push(0);
    });

    console.log(answer.join("\n"));
  }
};

solution();
