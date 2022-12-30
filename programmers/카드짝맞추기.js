const searchCard_bfs = (sy, sx, ey, ex, board) => {
  if (sy === ey && sx === ex) return [sy, ex, 1];

  const queue = [];

  const table = Array.from({ length: 4 }, () =>
    Array.from({ length: 4 }, () => 0)
  );

  const visit = Array.from({ length: 4 }, () =>
    Array.from({ length: 4 }, () => false)
  );

  // 상하좌우 이동방향 좌표값
  const dx = [-1, 1, 0, 0];
  const dy = [0, 0, -1, 1];

  queue.push([sy, sx]);
  visit[sy][sx] = true;

  while (queue.length) {
    const [y, x] = queue.shift();

    for (let i = 0; i < 4; i++) {
      let ny = y + dy[i];
      let nx = x + dx[i];

      // 경계 값 안에 존재하고 방문한 적이 없다면
      if (!visit[ny][nx] && -1 < ny && ny < 4 && -1 < nx && nx < 4) {
        visit[ny][nx] = true;

        table[ny][nx] = table[y][x] + 1;

        if (ny === ey && nx === ex) return [ny, nx, table[ny][nx] + 1];

        queue.push([ny, nx]);
      }

      [ny, nx] = ctrl_move(y, x, dy[i], dx[i], board);

      if (!visit[ny][nx]) {
        visit[ny][nx] = true;
        table[ny][nx] = table[y][x] + 1;

        if (ny === ey && nx === ex) return [ny, nx, table[ny][nx] + 1];

        queue.push([ny, nx]);
      }
    }
  }
  return [sy, sx, Infinity];
};
