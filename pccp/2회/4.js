function solution(n, m, hole) {
  let baseBoard = Array.from({ length: n }, () =>
    Array.from({ length: m }, () => m * n)
  );
  let jumpBoard = Array.from({ length: n }, () =>
    Array.from({ length: m }, () => m * n)
  );

  let holeBoard = Array.from({ length: n }, () =>
    Array.from({ length: m }, () => false)
  );

  hole.forEach(([row, col]) => (holeBoard[row - 1][col - 1] = true));

  const isValid = (x, y) => {
    if (x >= 0 && x < n && y >= 0 && y < m && !holeBoard[x][y]) return true;
    else false;
  };
  const dirs = [
    [1, 0],
    [0, 1],
    [-1, 0],
    [0, -1],
  ];

  const queue = [[0, 0, 0, false]]; // x,y,횟수,마법 사용 여부
  let nx, ny;
  while (queue.length) {
    const [x, y, cnt, isUsed] = queue.shift();

    if (x === n - 1 && y === m - 1) return cnt;

    if (!isUsed) {
      for (const dir of dirs) {
        nx = x + 2 * dir[0];
        ny = y + 2 * dir[1];
        if (isValid(nx, ny)) {
          if (jumpBoard[nx][ny] > cnt + 1) {
            jumpBoard[nx][ny] = cnt + 1;
            queue.push([nx, ny, cnt + 1, true]);
          }
        }
      }
    }

    for (const dir of dirs) {
      nx = x + dir[0];
      ny = y + dir[1];
      if (isValid(nx, ny)) {
        if (!isUsed && baseBoard[nx][ny] > cnt + 1) {
          baseBoard[nx][ny] = cnt + 1;
          queue.push([nx, ny, cnt + 1, isUsed]);
        }
        if (isUsed && jumpBoard[nx][ny] > cnt + 1) {
          jumpBoard[nx][ny] = cnt + 1;
          queue.push([nx, ny, cnt + 1, isUsed]);
        }
      }
    }
  }
  return -1;
}

console.log(
  solution(5, 4, [
    [1, 4],
    [2, 1],
    [2, 2],
    [2, 3],
    [2, 4],
    [3, 3],
    [4, 1],
    [4, 3],
    [5, 3],
  ])
);
