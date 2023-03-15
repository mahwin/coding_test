let input = `5 5
.xx..
..x..
.....
...x.
...x.`.split("\n");

const [rowLen, colLen] = input[0].split(" ").map(Number);
const board = Array.from({ length: rowLen }, () =>
  Array.from({ length: colLen }, () => false)
);

for (let r = 0; r < rowLen; r++) {
  for (let c = 0; c < colLen; c++) {
    if (input[r + 1][c] === "x") board[r][c] = "x";
  }
}

const dirs = [
  [-1, 1],
  [0, 1],
  [1, 1],
];

const dfs = (r, c) => {
  if (c == colLen - 1) {
    return true;
  }

  for (const d of dirs) {
    const nr = r + d[0];
    const nc = c + d[1];
    if (nr > -1 && nr < rowLen && !board[nr][nc]) {
      board[nr][nc] = true;
      if (dfs(nr, nc)) return true;
    }
  }
  return false;
};
let result = 0;

for (let r = 0; r < rowLen; r++) {
  if (dfs(r, 0)) {
    result++;
  }
}

console.log(result);
