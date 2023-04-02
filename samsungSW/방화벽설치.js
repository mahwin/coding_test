const readline = require("readline");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});
let input = [];
let possiblePos = [];
let fires = [];
let board = [];
let n, m, v;
let max = -Infinity;

const dirs = [
  [1, 0],
  [0, 1],
  [-1, 0],
  [0, -1],
];

rl.on("line", (line) => {
  input.push(line);
});

rl.on("close", () => {
  [n, m] = input[0].split(" ").map(Number);

  for (let i = 1; i <= n; i++) {
    const rowInfo = input[i].split(" ").map(Number);
    board.push(rowInfo);
    for (let j = 0; j < m; j++) {
      if (rowInfo[j] === 0) possiblePos.push([i - 1, j]);
      else if (rowInfo[j] === 2) fires.push([i - 1, j]);
    }
  }
  v = Array.from({ length: possiblePos.length }, () => false);
  dfs([]);

  console.log(max);
  process.exit();
});

const isValid = (r, c) => {
  if (r < 0 || c < 0 || r >= n || c >= m) return false;
  return true;
};

const bfs = () => {
  let expandFire = 0;
  const visited = Array.from({ length: n }, () =>
    Array.from({ length: m }, () => false)
  );
  const queue = [...fires];
  while (queue.length) {
    const [r, c] = queue.shift();
    for (const d of dirs) {
      const nr = r + d[0];
      const nc = c + d[1];
      if (isValid(nr, nc) && board[nr][nc] === 0 && !visited[nr][nc]) {
        visited[nr][nc] = true;
        expandFire++;
        queue.push([nr, nc]);
      }
    }
  }
  if (max < possiblePos.length - expandFire - 3) {
    max = possiblePos.length - expandFire - 3;
  }
};

const dfs = (picks) => {
  if (picks.length === 3) {
    picks.forEach(([r, c]) => (board[r][c] = 1));
    bfs();
    picks.forEach(([r, c]) => (board[r][c] = 0));
    return;
  }
  for (let i = 0; i < possiblePos.length; i++) {
    if (v[i]) continue;
    v[i] = true;
    dfs([...picks, possiblePos[i]]);
    v[i] = false;
  }
};
