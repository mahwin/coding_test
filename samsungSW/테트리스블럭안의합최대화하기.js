const readline = require("readline");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

let input = [];
let n, m;
let root = [];
let result = 0;
const dirs = [
  [0, 1],
  [1, 0],
  [-1, 0],
  [0, -1],
];

rl.on("line", (line) => {
  input.push(line.split(" ").map(Number));
});

rl.on("close", () => {
  solution();
  process.exit();
});

const isValid = (r, c) => {
  //경계 안이고
  if (r < 0 || c < 0 || r >= n || c >= m) return false;
  //방문한적 없으면
  if (v[r][c]) return false;
  return true;
};

const findSquare = (root, acc, cnt) => {
  if (cnt === 4) {
    result = Math.max(result, acc);
    return;
  }
  for (const [r, c] of root) {
    for (const d of dirs) {
      const nr = d[0] + r;
      const nc = d[1] + c;
      if (isValid(nr, nc)) {
        v[nr][nc] = true;
        findSquare([...root, [nr, nc]], acc + input[nr][nc], cnt + 1);
        v[nr][nc] = false;
      }
    }
  }
};

const solution = () => {
  [n, m] = input.shift();
  v = Array.from({ length: n }, () => Array.from({ length: m }, () => false));
  for (let r = 0; r < n; r++) {
    for (let c = 0; c < m; c++) {
      v[r][c] = true;
      findSquare([[r, c]], input[r][c], 1);
      // v[r][c] =false;
    }
  }

  console.log(result);
};
