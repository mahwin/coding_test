let input = `3 6
HFDFFB
AJHGDH
DGAGEH`.split("\n");

const [rowLen, colLen] = input.shift().split(" ").map(Number);
const board = [];
for (let i = 0; i < rowLen; i++) {
  board.push(input[i].split(""));
}

let max = -Infinity;
const visitied = Array.from({ length: 26 }, () => false);
const isValid = (r, c) => {
  if (r < 0 || c < 0 || r >= rowLen || c >= colLen) return false;
  return true;
};
const getAlphaIdx = (alpha) => {
  return alpha.charCodeAt() - 65;
};
const dirs = [
  [1, 0],
  [-1, 0],
  [0, 1],
  [0, -1],
];
const set = new Set();
const dfs = (node, cnt) => {
  max = Math.max(cnt, max);
  const [r, c] = node;
  for (const d of dirs) {
    const nr = r + d[0];
    const nc = c + d[1];

    if (isValid(nr, nc)) {
      const idx = getAlphaIdx(board[nr][nc]);
      if (visitied[idx]) continue;
      visitied[idx] = true;
      dfs([nr, nc], cnt + 1);
      visitied[idx] = false;
    }
  }
};
visitied[getAlphaIdx(board[0][0])] = true;
dfs([0, 0], 1);
console.log(max);
