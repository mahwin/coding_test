const fs = require("fs");
// let input = fs.readFileSync("/dev/stdin").toString().trim().split("\n");

let input = `5 3
2 4
3 2
3 5
4 5`.split("\n");

const dirs = [
  [-2, -1],
  [-2, 1],
  [-1, -2],
  [-1, 2],
  [1, -2],
  [1, 2],
  [2, -1],
  [2, 1],
];

const parser = (arr) => arr.split(" ").map(Number);

const [N, k] = parser(input.shift());

const isValid = (r, c) => {
  if (r >= N || c >= N || c < 0 || r < 0) return false;
  return true;
};

const solution = () => {
  const result = [];
  const initPos = parser(input.shift()).map((el) => el - 1);
  const board = getBoard(initPos);

  while (input.length) {
    const [r, c] = parser(input.shift()).map((el) => el - 1);
    result.push(board[r][c]);
  }
  console.log(result.join(" "));
};

const getBoard = (initPos) => {
  const q = [[...initPos, 0]];
  const v = Array.from({ length: N }, () =>
    Array.from({ length: N }, () => Infinity)
  );
  v[initPos[0]][initPos[1]] = 0;
  while (q.length) {
    const [r, c, cnt] = q.shift();
    for (const d of dirs) {
      const nr = r + d[0];
      const nc = c + d[1];
      if (isValid(nr, nc) && v[nr][nc] > cnt + 1) {
        v[nr][nc] = cnt + 1;
        q.push([nr, nc, cnt + 1]);
      }
    }
  }
  return v;
};

solution();
