const log = console.log;

function solution(rows, columns, queries) {
  const board = Array.from({ length: rows }, () => []);

  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < columns; c++) {
      board[r][c] = r * columns + c + 1;
    }
  }
  return queries.map((el) => {
    return rotate(board, ...el.map((e) => e - 1));
  });
}

function rotate(board, r1, c1, r2, c2) {
  let min = Infinity;
  let prev = board[r1][c1];
  let tmp;

  for (let c = c1 + 1; c <= c2; c++) {
    min = Math.min(min, board[r1][c]);
    [tmp, board[r1][c]] = [board[r1][c], prev];
    prev = tmp;
  }

  for (let r = r1 + 1; r <= r2; r++) {
    min = Math.min(min, board[r][c2]);
    [tmp, board[r][c2]] = [board[r][c2], prev];
    prev = tmp;
  }

  for (let c = c2 - 1; c >= c1; c--) {
    min = Math.min(min, board[r2][c]);
    [tmp, board[r2][c]] = [board[r2][c], prev];
    prev = tmp;
  }

  for (let r = r2 - 1; r >= r1; r--) {
    min = Math.min(min, board[r][c1]);
    [tmp, board[r][c1]] = [board[r][c1], prev];
    prev = tmp;
  }

  return min;
}
