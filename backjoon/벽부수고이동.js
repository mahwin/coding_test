const [M, N] = input.shift().split(" ").map(Number);
const board = Array.from({ length: M }, () =>
  Array.from({ length: N }, () => 0)
);
for (let i = 0; i < M; i++) {
  for (let j = 0; j < N; j++) {
    if (input[i][j] !== "0") {
      board[i][j] = 1;
    }
  }
}

function sol(board) {
  let idx = 0;
  const queue = [[0, 0, 1, 0]]; // r, c, cnt, 벽 뚫기 사용여부
  const v = Array.from({ length: 2 }, () =>
    Array.from({ length: M }, () => Array.from({ length: N }, () => false))
  );
  // [2][M][N] 배열로 방문 체크
  v[0][0][0] = true;
  const isValid = (r, c) => {
    if (r < 0 || c < 0 || r >= M || c >= N) return false;
    return true;
  };

  const dirs = [
    [1, 0],
    [0, 1],
    [-1, 0],
    [0, -1],
  ];
  while (idx !== queue.length) {
    const [r, c, cnt, isUsed] = queue[idx];
    if (r === M - 1 && c === N - 1) return cnt;
    for (const d of dirs) {
      const nr = d[0] + r;
      const nc = d[1] + c;
      if (isValid(nr, nc)) {
        if (board[nr][nc] && !isUsed && !v[1][nr][nc]) {
          v[1][nr][nc] = true;
          queue.push([nr, nc, cnt + 1, 1]);
        } else if (!board[nr][nc] && !v[isUsed][nr][nc]) {
          v[isUsed][nr][nc] = true;
          queue.push([nr, nc, cnt + 1, isUsed]);
        }
      }
    }
    idx++;
  }
  return -1;
}

console.log(sol(board));
