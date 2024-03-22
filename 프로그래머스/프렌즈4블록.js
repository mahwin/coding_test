function solution(m, n, board) {
  const isValid = (r, c) => r >= 0 && c >= 0 && r < m && c < n;

  board = board.map((el) => el.split(""));

  const dirs = [
    [0, 1],
    [1, 0],
    [1, 1],
  ];

  while (true) {
    const brokeBlocks = [];
    let canBroke = false;

    for (let r = 0; r < m - 1; r++) {
      for (let c = 0; c < n - 1; c++) {
        if (board[r][c] === " ") continue;
        const block = board[r][c];
        const sameBlock = [[r, c]];

        for (const d of dirs) {
          const nr = r + d[0];
          const nc = c + d[1];

          if (board[nr][nc] === block) {
            sameBlock.push([nr, nc]);
          }
        }

        if (sameBlock.length === 4) {
          canBroke = true;

          while (sameBlock.length) {
            brokeBlocks.push(sameBlock.pop());
          }
        }
      }
    }

    if (!canBroke) break;

    while (brokeBlocks.length) {
      const [row, col] = brokeBlocks.pop();

      board[row][col] = " ";
    }

    for (let col = 0; col < n; col++) {
      let copyCol = [];
      for (let row = 0; row < m; row++) {
        if (board[row][col] === " ") continue;
        copyCol.push(board[row][col]);
      }

      for (let row = m - 1; row >= 0; row--) {
        board[row][col] = copyCol.pop() || " ";
      }
    }
  }
  return countBlank(board);
}

function countBlank(board) {
  let cnt = 0;
  board.forEach((rowInfo) =>
    rowInfo.forEach((el) => {
      if (el === " ") cnt++;
    })
  );
  return cnt;
}

console.log(
  solution(6, 6, ["TTTANT", "RRFACC", "RRRFCC", "TRRRAA", "TTMMMF", "TMMTTJ"])
);

"TTTANT", "xxFAxx", "TxxFxx", "TxxxAA", "TTxxxF", "TxxTTJ";
