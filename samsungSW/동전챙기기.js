const readline = require("readline");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const input = [];
let sr, sc;
let board = [];
rl.on("line", (line) => {
  input.push(line.trim());
});

let pickArr = [];

rl.on("close", () => {
  const n = Number(input[0]);
  let distance = Infinity;
  const coins = [];

  for (let i = 1; i <= n; i++) {
    const rowInfo = input[i].split("");
    for (let j = 0; j < n; j++) {
      const cur = rowInfo[j];
      if (cur === "S") {
        sr = i - 1;
        sc = j;
      } else if (Number.isInteger(Number(cur))) coins.push(Number(cur));
    }
    board.push(rowInfo);
  }
  coins.sort((a, b) => a - b);

  const len = coins.length;

  const dfs = (len, root, next) => {
    if (root.length === 3) {
      pickArr.push(root);
      return;
    }
    for (let i = next; i < len; i++) {
      dfs(len, [...root, i], i + 1);
    }
  };

  dfs(len, [], 0);

  for (let pick of pickArr) {
    let [copySr, copySc] = [sr, sc];
    let flag = true;
    let tmpDistance = 0;

    const targetArr = pick.map((i) => coins[i]);

    targetArr.push("E"); //[동전1 동전2 동전3 E]

    for (let target of targetArr) {
      const val = bfs(copySr, copySc, n, target, board);

      if (val[0] === -1) {
        flag = false;
        break;
      }

      [cnt, copySr, copySc] = val;
      tmpDistance += cnt;
    }
    if (flag) distance = Math.min(distance, tmpDistance);
  }

  console.log(distance === Infinity ? -1 : distance);

  process.exit();
});

const bfs = (sr, sc, n, target, board) => {
  const isValid = (r, c) => {
    // 이동할 수 있는 위치인지 확인하는 함수
    if (r < 0 || c < 0 || r >= n || c >= n) return false;
    return true;
  };

  const queue = [[sr, sc, 0]]; //위치 cnt
  const v = Array.from({ length: n }, () =>
    Array.from({ length: n }, () => false)
  ); // 방문여부

  const dirs = [
    [0, 1],
    [1, 0],
    [-1, 0],
    [0, -1],
  ];

  while (queue.length) {
    const [r, c, cnt] = queue.shift();
    if (board[r][c] == target) return [cnt, r, c];
    for (let d of dirs) {
      const nr = r + d[0];
      const nc = c + d[1];
      if (isValid(nr, nc) && !v[nr][nc] && board[nr][nc] !== "#") {
        v[nr][nc] = true;
        queue.push([nr, nc, cnt + 1]);
      }
    }
  }
  return [-1];
};
