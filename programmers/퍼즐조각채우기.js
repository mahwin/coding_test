const isValid = (x, y, length) => {
  if (x < 0 || x >= length || y < 0 || y >= length) {
    return false;
  }
  return true;
};

function solution(game_board, table) {
  const length = game_board.length;

  const bfs = (x, y, arr) => {
    arr[x][y] = 0;
    let pos = [[x, y]];
    let queue = [[x, y]];
    const dirs = [
      [1, 0],
      [0, 1],
      [-1, 0],
      [0, -1],
    ];

    while (queue.length) {
      let [x, y] = queue.shift();
      for (let dir of dirs) {
        let nx = x + dir[0];
        let ny = y + dir[1];

        if (isValid(nx, ny, length) && arr[nx][ny]) {
          pos.push([nx, ny]);
          queue.push([nx, ny]);
          arr[nx][ny] = 0;
        }
      }
    }

    return pos;
  };
  let puzzleArr = [];
  let holeArr = [];
  game_board.forEach((rowInfo, row) => {
    rowInfo.forEach((el, col) => {
      game_board[row][col] = game_board[row][col] === 1 ? 0 : 1;
    });
  });

  for (let row = 0; row < length; row++) {
    for (let col = 0; col < length; col++) {
      if (game_board[row][col]) {
        holeArr.push(bfs(row, col, game_board));
      }
      if (table[row][col] !== 0 && table[row][col]) {
        puzzleArr.push(bfs(row, col, table));
      }
    }
  }

  let index = 1;

  puzzleArr.forEach((pos, idx) => {
    pos.forEach(([row, col]) => {
      table[row][col] = idx + 1;
      max = idx + 1;
    });
  });

  const puzzleWithRotate = Array.from({ length: max + 1 }, () => ({
    0: [],
    1: [],
    2: [],
    3: [],
  }));

  const rotator = (table) => {
    let lastIdx = length - 1;
    let rotateTable = Array.from({ length }, () =>
      Array.from({ length }, () => 0)
    );
    for (let row = 0; row < length; row++) {
      for (let col = 0; col < length; col++) {
        rotateTable[col][lastIdx - row] = table[row][col];
      }
    }
    return rotateTable;
  };

  for (let rotate = 0; rotate < 4; rotate++) {
    table = rotate !== 0 ? rotator(table) : table;

    for (let row = 0; row < length; row++) {
      for (let col = 0; col < length; col++) {
        let key = table[row][col];
        if (key !== 0) {
          puzzleWithRotate[key][rotate].push([row, col]);
        }
      }
    }
  }

  let answer = 0;
  let finishedPuzzle = Array.from(
    { length: puzzleWithRotate.length },
    () => false
  );
  let finishedHole = Array.from({ length: holeArr.length }, () => false);
  const sameCheck = (hole, puzzle) => {
    hole.sort((a, b) => {
      if (a[0] === b[0]) {
        return a[1] - b[1];
      }
      return a[0] - b[0];
    });

    puzzle.sort((a, b) => {
      if (a[0] === b[0]) {
        return a[1] - b[1];
      }
      return a[0] - b[0];
    });
    let rd = hole[0][0] - puzzle[0][0];
    let cd = hole[0][1] - puzzle[0][1];

    for (let i = 1; i < hole.length; i++) {
      if (rd !== hole[i][0] - puzzle[i][0]) return false;
      if (cd !== hole[i][1] - puzzle[i][1]) return false;
    }
    return true;
  };

  for (let puzzleIdx = 0; puzzleIdx < puzzleWithRotate.length; puzzleIdx++) {
    for (let holeIdx = 0; holeIdx < holeArr.length; holeIdx++) {
      let flag = false;
      let hole = holeArr[holeIdx];
      if (finishedPuzzle[puzzleIdx]) continue;
      if (finishedHole[holeIdx]) continue;
      let puzzlePos = puzzleWithRotate[puzzleIdx];
      if (hole.length === puzzlePos[0].length) {
        for (let i = 0; i < 4; i++) {
          let puzzle = puzzlePos[i];
          if (sameCheck(hole, puzzle)) {
            flag = true;
            finishedPuzzle[puzzleIdx] = true;
            finishedHole[holeIdx] = true;
          }
        }
      }
      if (flag) {
        answer += hole.length;
      }
    }
  }
  return answer;
}

console.log(
  solution(
    [
      [0, 0, 0],
      [1, 1, 0],
      [1, 1, 1],
    ],
    [
      [1, 1, 1],
      [1, 0, 0],
      [0, 0, 0],
    ]
  )
);
