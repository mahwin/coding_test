function solution(maps) {
  // s 시작 l 레버 e 탈출 x 벽
  const rowLen = maps.length;
  const colLen = maps[0].length;
  let start = [];
  let exit = [];
  let labar = [];

  for (let row = 0; row < rowLen; row++) {
    for (let col = 0; col < colLen; col++) {
      if (maps[row][col] === "S") start = [row, col];
      if (maps[row][col] === "E") exit = [row, col];
      if (maps[row][col] === "L") labar = [row, col];
    }
  }

  const isValid = (r, c) => {
    if (r < 0 || c < 0 || r >= rowLen || c >= colLen) return false;
    return true;
  };
  const bfs = (start, end) => {
    const dirs = [
      [0, 1],
      [1, 0],
      [-1, 0],
      [0, -1],
    ];
    let visited = Array.from({ length: rowLen }, () =>
      Array.from({ length: colLen }, () => Infinity)
    );
    const queue = [[...start, 0]];
    while (queue.length) {
      const [r, c, cnt] = queue.shift();
      if (r === end[0] && c === end[1]) return cnt;
      for (const dir of dirs) {
        const nr = r + dir[0];
        const nc = c + dir[1];
        if (isValid(nr, nc) && maps[nr][nc] !== "X") {
          if (visited[nr][nc] > cnt + 1) {
            visited[nr][nc] = cnt + 1;
            queue.push([nr, nc, cnt + 1]);
          }
        }
      }
    }
    return -1;
  };
  const first = bfs(start, labar);
  const second = bfs(labar, exit);
  if (first === -1) return -1;
  if (second === -1) return -1;
  return first + second;
}

console.log(solution(["SOOOL", "XXXXO", "OOOOO", "OXXXX", "OOOOE"]));
