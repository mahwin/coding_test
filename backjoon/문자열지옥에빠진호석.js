let input = `3 4 3
abcb
bcaa
abac
aba
abc
cab`.split("\n");
// const fs = require("fs");
// let input = fs.readFileSync("/dev/stdin").toString().split("\n");

let rowLen, colLen, k;
const dictionaryObj = new Map();
const board = [];
const dirs = [
  //상하좌우
  [0, 1],
  [1, 0],
  [-1, 0],
  [0, -1],
  //대각선
  [-1, -1],
  [1, 1],
  [-1, 1],
  [1, -1],
];

const dfs = (r, c, string) => {
  dictionaryObj.set(string, (dictionaryObj.get(string) || 0) + 1);

  if (string.length == 5) return;

  for (const d of dirs) {
    const nr = (d[0] + r + rowLen) % rowLen;
    const nc = (d[1] + c + colLen) % colLen;
    dfs(nr, nc, string + board[nr][nc]);
  }
};

const fillObj = () => {
  for (let r = 0; r < rowLen; r++) {
    for (let c = 0; c < colLen; c++) {
      dfs(r, c, board[r][c]);
    }
  }
};

const solution = () => {
  [rowLen, colLen, k] = input.shift().split(" ").map(Number);

  for (let i = 0; i < rowLen; i++) {
    board.push(input[i]);
  }
  fillObj();

  let result = [];
  for (let i = rowLen; i < rowLen + k; i++) {
    result.push(dictionaryObj.get(input[i]) || 0);
  }
  console.log(result.join("\n"));
};

solution();
