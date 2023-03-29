const dirs = [
  [0, 1],
  [1, 0],
  [-1, 0],
  [0, -1],
];

const readline = require("readline");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

let input = [];
let dustBoard = [];
let cleanerPos = [];
let n, m, t;
rl.on("line", (line) => {
  input.push(line);
});

rl.on("close", () => {
  [n, m, t] = input[0].split(" ").map(Number);
  for (let i = 1; i <= n; i++) {
    const dust = input[i].split(" ").map(Number);
    dustBoard.push(dust);
    if (dust.includes(-1)) {
      cleanerPos.push(i - 1);
    }
  }

  for (let i = 0; i < 6; i++) {
    dustMove();
    cleaner();
  }

  console.log(totalDust());

  process.exit();
});

function isCanMove(r, c, n, m, cleanerPos) {
  if (r < 0 || c < 0 || r >= n || c >= m) return false;
  if (c === 0 && cleanerPos.includes(r)) return false;
  return true;
}

function dustMove() {
  const addDustBoard = Array.from({ length: n }, () =>
    Array.from({ length: n }, () => 0)
  );
  for (let r = 0; r < n; r++) {
    for (let c = 0; c < n; c++) {
      const dust = dustBoard[r][c];
      if (dust >= 5) {
        let expandDust = Math.floor(dust / 5);
        for (let d of dirs) {
          const nr = r + d[0];
          const nc = c + d[1];
          if (isCanMove(nr, nc, n, m, cleanerPos)) {
            addDustBoard[nr][nc] += expandDust;
            dustBoard[r][c] -= expandDust;
          }
        }
      }
    }
  }
}

function totalDust() {
  let total = 0;
  dustBoard.forEach((rowInfo) => {
    rowInfo.forEach((info) => (total += info));
  });
  return total;
}
