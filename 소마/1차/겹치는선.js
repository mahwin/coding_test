function solution(rectangle, characterX, characterY, itemX, itemY) {
  const board = Array.from({ length: 104 }, () =>
    Array.from({ length: 104 }, () => 0)
  );
  [characterX, characterY, itemX, itemY] = [
    characterX,
    characterY,
    itemX,
    itemY,
  ].map((e) => e * 2);

  rectangle = rectangle.map((el) => el.map((e) => e * 2));

  rectangle.forEach(([x, y, x2, y2]) => {
    for (let r = x; r <= x2; r++) {
      for (let c = y; c <= y2; c++) {
        board[r][c] = 1;
      }
    }
  });

  const visited = Array.from({ length: 104 }, () =>
    Array.from({ length: 104 }, () => false)
  );

  const isEnd = (x, y) => {
    for (let i = -1; i < 2; i++) {
      for (let j = -1; j < 2; j++) {
        const nx = x + i;
        const ny = y + j;
        if (nx === x && ny === y) continue;
        if (isValid(nx, ny) && board[nx][ny] === 0) return true;
      }
    }
    return false;
  };

  const queue = [[characterX, characterY, 0]];

  const dirs = [
    [1, 0],
    [0, 1],
    [-1, 0],
    [0, -1],
  ];

  const isValid = (r, c) => {
    if (r < 0 || c < 0 || r >= 104 || c >= 104) return false;
    return true;
  };
  while (queue.length) {
    const [r, c, cnt] = queue.shift();

    if (r === itemX && c === itemY) return cnt / 2;
    for (const d of dirs) {
      const nr = d[0] + r;
      const nc = d[1] + c;
      if (
        isValid(nr, nc) &&
        !visited[nr][nc] &&
        isEnd(nr, nc) &&
        board[nr][nc] === 1
      ) {
        visited[nr][nc] = true;
        queue.push([nr, nc, cnt + 1]);
      }
    }
  }
}

console.log(
  solution(
    [
      [1, 1, 7, 4],
      [3, 2, 5, 5],
      [4, 3, 6, 9],
      [2, 6, 8, 8],
    ],
    1,
    3,
    7,
    8
  )
);
