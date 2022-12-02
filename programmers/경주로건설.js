function solution(board) {
  const maxIdx = board.length - 1;
  // 우, 하, 좌, 상
  const direction = [
    [1, 0],
    [0, 1],
    [-1, 0],
    [0, -1],
  ];
  // x, y, 직전 방향(상하:1, 좌우:2), cost
  const q = [[0, 0, null, 0]];
  while (q.length) {
    const [x, y, dir, preCost] = q.shift();

    // 바로 직전의 비용인 cost가 지금 지점의 값보다 크다면 다른 루트로 이 지점을 오는게 더 효율적이라 pass
    if (board[x][y] < preCost && board[x][y] > 0) continue;
    board[x][y] = preCost;

    direction.forEach(([i, j], ndir) => {
      // |ndir - dir| === 2면 왔던 방향으로 다시 돌아가는 경우
      if (dir !== null && Math.abs(ndir - dir) === 2) return;

      const [nx, ny] = [x + i, y + j];
      if (0 > nx || nx > maxIdx) return; // 좌우로 이동이 경계 밖
      if (0 > ny || ny > maxIdx) return; // 상하 이동이 경계 밖
      if (board[nx][ny] === 1) return; // 벽

      q.push([
        nx,
        ny,
        ndir,
        dir !== null && dir !== ndir ? preCost + 600 : preCost + 100,
      ]);
    });
  }
  return board[maxIdx][maxIdx];
}
