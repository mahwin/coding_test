const fs = require("fs");
// let input = fs.readFileSync("/dev/stdin").toString().trim();
let input = `1 25 25 25 25`;
const solution = () => {
  let [N, ...둥서남북] = input.split(" ").map(Number);
  둥서남북 = 둥서남북.map((el) => el / 100); // 퍼센트로 변경

  const dirs = [
    [0, 1],
    [0, -1],
    [-1, 0],
    [1, 0],
  ];
  let total = 0;
  const board = Array.from({ length: 2 * N + 1 }, () =>
    Array.from({ length: 2 * N + 1 }, () => {
      false;
    })
  );
  board[N][N] = true;
  const dfs = (r, c, curPercent, depth) => {
    if (depth === N) {
      total += curPercent;
      return;
    }
    for (let i = 0; i < 4; i++) {
      const d = dirs[i];
      const nr = d[0] + r;
      const nc = d[1] + c;
      if (board[nr][nc]) continue;
      board[nr][nc] = true;
      dfs(nr, nc, curPercent * 둥서남북[i], depth + 1);
      board[nr][nc] = false;
    }
  };

  dfs(N, N, 1.0, 0);

  console.log(total === 1 ? "1.0" : total);
};

solution();
