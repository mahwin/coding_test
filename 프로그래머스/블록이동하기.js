function solution(board) {
  const n = board.length;

  const dirs = [
    [0, 1],
    [1, 0],
    [-1, 0],
    [0, -1],
  ];
  // r1,c1,r2,c2 의 방문 여부
  const v = Array.from({ length: n }, () =>
    Array.from({ length: n }, () =>
      Array.from({ length: n }, () => Array.from({ length: n }))
    )
  );

  // 초기 로봇
  v[0][0][0][1] = 0;

  const q = [[0, 0, 0, 1, 0]];
  while (q.length) {
    const [r1, c1, r2, c2, cnt] = q.shift();

    if (r1 === n - 1 && c1 === n - 1) return cnt;
    if (r2 === n - 1 && c2 === n - 1) return cnt;

    // 직선이동
    for (const d of dirs) {
      const nr1 = d[0] + r1;
      const nc1 = d[1] + c1;
      const nr2 = d[0] + r2;
      const nc2 = d[1] + c2;
      if (
        isValid(nr1, nc1) &&
        isValid(nr2, nc2) &&
        v[nr1][nc1][nr2][nc2] > cnt + 1
      ) {
        v[nr1][nc1][nr2][nc2] = cnt + 1;
        q.push([nr1, nc1, nr2, nc2, cnt + 1]);
      }
    }

    // 회전이동
    if (isRow(r1, c1, r2, c2)) {
      for (let d of [1, -1]) {
        const nr = r1 + d;
        if (isVlid(nr, c1) && isValid(nr, c2)) {
          if (v[r1][c1][nr][c1] > cnt + 1) {
            v[r1][c1][nr][c1] = cnt + 1;
            q.push([r1, c1, nr, c1, cnt + 1]);
          }

          if (v[nr][c2][r2][c2] > cnt + 1) {
            v[nr][c2][r2][c2] = cnt + 1;
            q.push([nr, c2, r2, c2, cnt + 1]);
          }
        }

        continue;
      }
      for (let d of [1, -1]) {
        const nc = c1 + d;
        if (isVlid(r1, nc) && isValid(r2, nc)) {
          if (v[r1][c1][r1][nc] > cnt + 1) {
            v[r1][c1][r1][nc] = cnt + 1;
            q.push([r1, c1, r1, nc, cnt + 1]);
          }

          if (v[r2][nc][r2][c2] > cnt + 1) {
            v[r2][nc][r2][c2] = cnt + 1;
            q.push([r2, nc, r2, c2, cnt + 1]);
          }
        }
      }
    }
  }

  function isValid(r, c) {
    if (r < 0 || c < 0 || r >= n || c >= n || board[r][c] === 1) return false;
    return true;
  }
}

function isRow(r1, c1, r2, c2) {
  if (r1 === r2) return true;
  return false;
}
