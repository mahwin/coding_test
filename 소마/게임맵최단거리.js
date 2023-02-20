function solution(maps) {
  const n = maps.length;
  const m = maps[0].length;
  const visited = Array.from({ length: n }, () =>
    Array.from({ length: m }, () => Infinity)
  );

  const isValid = (r, c) => {
    if (r < 0 || c < 0 || r >= n || c >= m) return false;
    return true;
  };
  visited[0][0] = 1;
  let queue = [[0, 0, 1]];
  const dirs = [
    [0, 1],
    [1, 0],
    [-1, 0],
    [0, -1],
  ];
  while (queue.length) {
    const [r, c, cnt] = queue.shift();
    for (const dir of dirs) {
      const nr = r + dir[0];
      const nc = c + dir[1];
      if (isValid(nr, nc) && maps[nr][nc]) {
        if (visited[nr][nc] > cnt + 1) {
          visited[nr][nc] = cnt + 1;
          queue.push([nr, nc, cnt + 1]);
        }
      }
    }
  }

  return visited[n - 1][m - 1] === Infinity ? -1 : visited[n - 1][m - 1];
}
