const fs = require("fs");
let input = fs.readFileSync("/dev/stdin").toString().split("\n");

let rowLen, colLen;
let result = 0;
let route = Array.from({ length: 26 }, () => false);
const dirs = [
  [0, 1],
  [1, 0],
  [-1, 0],
  [0, -1],
];

const isValid = (r, c) => {
  if (r < 0 || c < 0 || r >= rowLen || c >= colLen) return false;
  return true;
};

const dfs = (r, c, cnt) => {
  result = Math.max(result, cnt);
  for (const d of dirs) {
    const nr = r + d[0];
    const nc = c + d[1];
    if (isValid(nr, nc)) {
      const alphaIdx = input[nr][nc].charCodeAt() - 65;
      if (!route[alphaIdx]) {
        route[alphaIdx] = true;
        dfs(nr, nc, cnt + 1);
        route[alphaIdx] = false;
      }
    }
  }
};

const solution = () => {
  [rowLen, colLen] = input.shift().split(" ").map(Number);
  route[input[0][0].charCodeAt() - 65] = true;
  dfs(0, 0, 1); // r,c
  return result;
};

console.log(solution());
