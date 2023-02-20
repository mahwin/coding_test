function solution(rectangle, characterX, characterY, itemX, itemY) {
  [characterX, characterY, itemX, itemY] = [
    characterX,
    characterY,
    itemX,
    itemY,
  ].map((el) => el * 2);
  const board = Array.from({ length: 102 }, () =>
    Array.from({ length: 102 }, () => 0)
  );

  rectangle.forEach((el) => {
    const [r1, c1, r2, c2] = el.map((e) => e * 2);
    for (let r = r1; r <= r2; r++) {
      for (let c = c1; c <= c2; c++) {
        board[r][c] = 1;
      }
    }
  });
  const isEnd = (r, c) => {
    for (let i = r - 1; i < r + 2; i++) {
      for (let j = c - 1; j < c + 2; j++) {
        if (i < 0 || j < 0) continue;
        if (!board[i][j]) return true;
      }
    }
    return false;
  };

  board.forEach((rowInfo, row) => {
    rowInfo.forEach((colInfo, col) => {
      if (colInfo && isEnd(row, col)) board[row][col] = 2;
    });
  });

  visited = Array.from({ length: 102 }, () =>
    Array.from({ length: 102 }, () => Infinity)
  );

  const queue = [[characterX, characterY, 0]];
  const dirs = [
    [0, 1],
    [1, 0],
    [-1, 0],
    [0, -1],
  ];
  while (queue.length) {
    const [x, y, cnt] = queue.shift();
    for (const dir of dirs) {
      const nx = x + dir[0];
      const ny = y + dir[1];
      if (board[nx][ny] === 2 && visited[nx][ny] > cnt + 1) {
        visited[nx][ny] = cnt + 1;
        queue.push([nx, ny, cnt + 1]);
      }
    }
  }

  return visited[itemX][itemY] / 2;
}
