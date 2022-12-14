const zeroPadding = (board) => {
  let tmp = Array.from({ length: board[0].length + 2 }, () => 0);
  board = board.map((b) => [0, ...b, 0]);
  return [tmp, ...board, tmp];
};

function solution(rows, columns, queries) {
  let answer = [];
  let board = Array.from({ length: rows }, (_, i) =>
    Array.from({ length: columns }, (_, j) => i * columns + j + 1)
  );
  board = zeroPadding(board);

  const boardRotator = (r1, c1, r2, c2) => {
    const values = [];
    const indexArr = [];

    for (let col = c1; col <= c2; col++) {
      indexArr.push([r1, col]);
      values.push(board[r1][col]);
    }

    for (let row = r1 + 1; row <= r2; row++) {
      indexArr.push([row, c2]);
      values.push(board[row][c2]);
    }

    for (let col = c2 - 1; col >= c1; col--) {
      indexArr.push([r2, col]);
      values.push(board[r2][col]);
    }

    for (let row = r2 - 1; row > r1; row--) {
      indexArr.push([row, c1]);
      values.push(board[row][c1]);
    }
    let i = indexArr.shift();
    indexArr.push(i);
    indexArr.forEach(([row, col], i) => {
      board[row][col] = values[i];
    });

    return Math.min(...values);
  };

  queries.forEach(([r1, c1, r2, c2]) => {
    answer.push(boardRotator(r1, c1, r2, c2));
  });

  return answer;
}

solution(6, 6, [[2, 2, 5, 4]]);
