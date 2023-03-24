let input = `5
RRRBB
GGBBB
BBBRR
BBRRR
RRRRR`.split("\n");

const n = Number(input[0]);

const board = [];
const sacyak = [];
for (let i = 1; i <= n; i++) {
  let data = input[i].split("");
  board.push(data);
  sacyak.push(data.map((color) => (color === "R" ? "G" : color)));
}

const sol = (board) => {
  let cnt = 0;
  const v = Array.from({ length: n }, () =>
    Array.from({ length: n }, () => false)
  );

  const dirs = [
    [0, 1],
    [1, 0],
    [-1, 0],
    [0, -1],
  ];

  const isValid = (r, c) => {
    if (r < 0 || c < 0 || r >= n || c >= n) return false;
    return true;
  };

  const bfs = (initR, initC, color) => {
    const queue = [[initR, initC]];

    while (queue.length) {
      const [r, c] = queue.shift();

      for (let d of dirs) {
        const nr = d[0] + r;
        const nc = d[1] + c;
        if (isValid(nr, nc) && board[nr][nc] === color && !v[nr][nc]) {
          v[nr][nc] = true;
          queue.push([nr, nc]);
        }
      }
    }
  };

  for (let row = 0; row < n; row++) {
    for (let col = 0; col < n; col++) {
      if (v[row][col]) continue;
      v[row][col] = true;
      cnt++;
      bfs(row, col, board[row][col]);
    }
  }

  return cnt;
};

console.log(sol(board), sol(sacyak));
