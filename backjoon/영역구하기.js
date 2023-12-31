let input = `5 7 3
0 2 4 4
1 1 2 5
4 0 6 2`.split("\n");

const solution = () => {
  const [rowLen, colLen, n] = input.shift().split(" ").map(Number);

  const dirs = [
    [0, 1],
    [1, 0],
    [-1, 0],
    [0, -1],
  ];

  const isValid = (r, c) => {
    if (r < 0 || c < 0 || r >= rowLen || c >= colLen) return false;
    return true;
  };

  const board = Array.from({ length: rowLen }, () =>
    Array.from({ length: colLen }, () => false)
  );

  for (let i = 0; i < n; i++) {
    fillBoard(board, ...input[i].split(" ").map(Number));
  }

  let result = [];

  for (let r = 0; r < rowLen; r++) {
    for (let c = 0; c < colLen; c++) {
      if (!board[r][c]) {
        const q = [[r, c]];
        let tmp = 1;
        board[r][c] = true;
        while (q.length) {
          const [nr, nc] = q.shift();
          for (let d of dirs) {
            const nnr = nr + d[0];
            const nnc = nc + d[1];
            if (isValid(nnr, nnc) && !board[nnr][nnc]) {
              board[nnr][nnc] = true;
              tmp++;
              q.push([nnr, nnc]);
            }
          }
        }
        result.push(tmp);
      }
    }
  }
  result.sort((a, b) => a - b);
  console.log(result.length);
  console.log(result.join(" "));
};

const fillBoard = (board, ...pos) => {
  const [c1, r1, c2, r2] = pos;
  for (let r = r1; r < r2; r++) {
    for (let c = c1; c < c2; c++) {
      board[r][c] = true;
    }
  }
};

solution();
