let input = `2
10 8 17
0 0
1 0
1 1
4 2
4 3
4 5
2 4
3 4
7 4
8 4
9 4
7 5
8 5
9 5
7 6
8 6
9 6
10 10 1
5 5`.split("\n");

let trials = Number(input.shift());

const isValid = (rowL, colL, r, c) => {
  if (r < 0 || c < 0 || r >= rowL || c >= colL) return false;
  return true;
};
const dirs = [
  [0, 1],
  [1, 0],
  [-1, 0],
  [0, -1],
];

const bfs = (board, rowL, colL, row, col) => {
  const queue = [[row, col]];
  while (queue.length) {
    [row, col] = queue.shift();
    for (let dir of dirs) {
      const nr = row + dir[0];
      const nc = col + dir[1];
      if (isValid(rowL, colL, nr, nc) && board[nr][nc]) {
        board[nr][nc] = 0;
        queue.push([nr, nc]);
      }
    }
  }
};

let inputIdx = 0;
while (trials--) {
  const [rowL, colL, baechu] = input[inputIdx].split(" ").map(Number);

  inputIdx++;
  const board = Array.from({ length: rowL }, () =>
    Array.from({ length: colL }, () => 0)
  );

  for (let i = inputIdx; i < inputIdx + baechu; i++) {
    const [row, col] = input[i].split(" ");
    board[row][col] = 1;
  }
  let cnt = 0;
  for (let row = 0; row < rowL; row++) {
    for (let col = 0; col < colL; col++) {
      if (!board[row][col]) continue;
      board[row][col] = 0;
      bfs(board, rowL, colL, row, col);
      cnt++;
    }
  }
  console.log(cnt);
  inputIdx += baechu;
}
