function solution(game_board, table) {
  let blanks = [];
  const len = table.length;

  // 게임보드 빈 곳 찾기
  let v = Array.from({ length: len }, () =>
    Array.from({ length: len }, () => false)
  );
  for (let i = 0; i < len; i++) {
    for (let j = 0; j < len; j++) {
      if (v[i][j] || game_board[i][j]) continue;
      v[i][j] = true;
      let pos = searching(game_board, i, j, v, 0);
      blanks.push(pos);
      pos.forEach(([r, c]) => (v[r][c] = true));
    }
  }

  let cnt = 0;
  for (let rotate = 0; rotate < 4; rotate++) {
    if (rotate !== 0) {
      table = rotator(table);
    }
    v = Array.from({ length: len }, () =>
      Array.from({ length: len }, () => false)
    );

    for (let i = 0; i < len; i++) {
      for (let j = 0; j < len; j++) {
        if (table[i][j] === 0 || v[i][j]) continue;
        v[i][j] = true;
        const puzzle = searching(table, i, j, v, 1);
        puzzle.forEach(([r, c]) => (v[r][c] = true));

        const fittedIndex = isFitted(puzzle, blanks);
        if (fittedIndex !== false) {
          cnt += puzzle.length;

          blanks.splice(fittedIndex, 1);
          puzzle.forEach(([r, c]) => (table[r][c] = 0));
        }
      }
    }
  }
  return cnt;
}

function isValid(r, c, len) {
  if (r < 0 || c < 0 || r >= len || c >= len) return false;
  return true;
}

function searching(table, i, j, v, val) {
  const result = [[i, j]];

  const dirs = [
    [0, 1],
    [1, 0],
    [-1, 0],
    [0, -1],
  ];
  const queue = [[i, j]];

  const len = table.length;

  while (queue.length) {
    const [r, c] = queue.shift();
    for (const d of dirs) {
      const nr = r + d[0];
      const nc = c + d[1];

      if (isValid(nr, nc, len) && !v[nr][nc] && table[nr][nc] === val) {
        v[nr][nc] = true;
        result.push([nr, nc]);
        queue.push([nr, nc]);
      }
    }
  }
  return result;
}

function rotator(pos) {
  const copy = [...pos.map((el) => [...el])];

  const len = pos.length;
  for (let i = 0; i < len; i++) {
    for (let j = 0; j < len; j++) {
      copy[j][len - 1 - i] = pos[i][j];
    }
  }
  return copy;
}

function isFitted(puzzle, blanks) {
  let flag = false;
  for (let i = 0; i < blanks.length; i++) {
    const blank = blanks[i];

    if (blank.length !== puzzle.length) continue;
    let pre = calDistance(blank, puzzle[0]);
    let cnt = 1;
    for (let j = 1; j < blank.length; j++) {
      if (pre !== calDistance(blank[j], puzzle[j])) break;
    }
    if (cnt === blank.length) return i;
  }

  return false;
}

function calDistance(A, B) {
  const [x1, y1] = A;
  const [x2, y2] = B;

  return Math.abs(x1 - x2) ** 2 + Math.abs(y1 - y2) ** 2;
}

console.log(
  solution(
    [
      [1, 1, 0, 0, 1, 0],
      [0, 0, 1, 0, 1, 0],
      [0, 1, 1, 0, 0, 1],
      [1, 1, 0, 1, 1, 1],
      [1, 0, 0, 0, 1, 0],
      [0, 1, 1, 1, 0, 0],
    ],
    [
      [1, 0, 0, 1, 1, 0],
      [1, 0, 1, 0, 1, 0],
      [0, 1, 1, 0, 1, 1],
      [0, 0, 1, 0, 0, 0],
      [1, 1, 0, 1, 1, 0],
      [0, 1, 0, 0, 0, 0],
    ]
  )
);
