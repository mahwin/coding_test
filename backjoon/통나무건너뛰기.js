// const fs = require("fs");
// let input = fs.readFileSync("/dev/stdin").toString().split("\n");

let input = `3
7
13 10 12 11 10 11 12
5
2 4 5 7 9
8
6 6 6 6 6 6 6 6`.split("\n");

const cal = (n, heights) => {
  heights = heights
    .split(" ")
    .map(Number)
    .sort((a, b) => a - b);
  const answer = Array.from({ length: n }, () => 0);
  let [left, right] = [0, n - 1];

  for (let i = 0; i < n / 2; i++) {
    if (left === right) {
      answer[left] = heights[2 * i];
    } else {
      answer[left] = heights[2 * i];
      left++;
      answer[right] = heights[2 * i + 1];
      right--;
    }
  }
  let max = -Infinity;

  for (let i = 0; i < n - 1; i++) {
    max = Math.max(max, Math.abs(answer[i] - answer[i + 1]));
  }
  console.log(max);
};

const solution = () => {
  const n = Number(input.shift());

  for (let i = 0; i < n; i++) {
    cal(input[i * 2], input[i * 2 + 1]);
  }
};

solution();
