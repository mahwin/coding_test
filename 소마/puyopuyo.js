let input = `R.....
R.....
G.....
Y.....
B.....
BR..Y.
BY..Y.
YGR.Y.
GYR.RR
GYRYRR
GBGGYY
GBGGYY`.split("\n");
const board = [];
for (let i = 0; i < 12; i++) {
  board.push(input[i].split(""));
}

const [rowLen, colLen] = [12, 6];
const dirs = [
  [1, 0],
  [0, 1],
  [-1, 0],
  [0, -1],
];

const isValid = (r, c) => {
  if (r < 0 || c < 0 || r >= 12 || c >= 6) return false;
  return true;
};

const bfs = (node, val) => {
  const visited = Array.from({ length: 12 }, () =>
    Array.from({ length: 6 }, () => false)
  );

  const route = [[...node]];
  const queue = [node];
  while (queue.length) {
    const [r, c] = queue.shift();
    visited[r][c] = true;
    for (const d of dirs) {
      const nr = r + d[0];
      const nc = c + d[1];
      if (isValid(nr, nc) && val == board[nr][nc]) {
        if (visited[nr][nc]) continue;
        queue.push([nr, nc]);
        route.push([nr, nc]);
      }
    }
  }

  return [...route];
};
let result = 0;
let flag = true;
while (flag) {
  flag = false;
  const visited = Array.from({ length: 12 }, () =>
    Array.from({ length: 6 }, () => false)
  );
  for (let row = 0; row < 12; row++) {
    for (let col = 0; col < 6; col++) {
      if (visited[row][col]) continue;
      if (board[row][col] !== ".") {
        const idxs = bfs([row, col], board[row][col]);
        if (idxs.length >= 4) {
          flag = true;
          idxs.forEach(([r, c]) => {
            visited[r][c] = true;
            board[r][c] = ".";
          });
        }
      }
    }
  }

  sortBoard(board);

  if (flag) result++;
}

console.log(result);

function sortBoard(board) {
  for (let col = 0; col < 6; col++) {
    let copy = Array.from({ length: 13 }, () => ".");
    let colInfo = [];
    for (let row = 0; row < 12; row++) {
      if (board[row][col] != ".") colInfo.push(board[row][col]);
    }
    colInfo.reverse();
    colInfo.forEach((el, i) => {
      copy[11 - i] = el;
    });
    for (let row = 11; row >= 0; row--) {
      board[row][col] = copy[row];
    }
  }
}
