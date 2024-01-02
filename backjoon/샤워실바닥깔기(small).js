let input = `2
3 2`.split("\n");

const solution = () => {
  const k = Number(input[0]);
  let [tc, tr] = input[1].split(" ").map((el) => Number(el) - 1);
  const len = 2 ** k;
  tr = len - tr - 1;

  const board = Array.from({ length: len }, () =>
    Array.from({ length: len }, () => 0)
  );

  board[tr][tc] = -1;
  let tileNum = (len * len - 1) / 3;

  let dc = [
    [0, 0, 1],
    [0, 1, 1],
    [0, 0, -1],
    [0, -1, -1],
  ];
  let dr = [
    [0, -1, -1],
    [0, 0, 1],
    [0, 1, 1],
    [0, 0, -1],
  ];

  const isValid = (r, c) => {
    if (r < 0 || c < 0 || r >= len || c >= len) return false;
    return true;
  };

  let flag = false;
  const dfs = (tile) => {
    if (flag) return;
    if (tile === 0) {
      board.forEach((row) => console.log(row.join(" ")));
      flag = true;
      return;
    }
    for (let r = 0; r < len; r++) {
      for (let c = 0; c < len; c++) {
        if (board[r][c] !== 0) continue;
        for (let i = 0; i < 4; i++) {
          let cnt = 0;
          for (let j = 1; j < 3; j++) {
            const nr = r + dr[i][j];
            const nc = c + dc[i][j];
            if (isValid(nr, nc) && board[nr][nc] === 0) {
              cnt++;
            } else continue;
          }
          if (cnt === 2) {
            for (let j = 0; j < 3; j++) {
              const nr = r + dr[i][j];
              const nc = c + dc[i][j];
              board[nr][nc] = tile;
            }
            dfs(tile - 1);
            for (let j = 0; j < 3; j++) {
              const nr = r + dr[i][j];
              const nc = c + dc[i][j];
              board[nr][nc] = 0;
            }
          }
        }
      }
    }
  };

  dfs(tileNum);
  return -1;
};

solution();
