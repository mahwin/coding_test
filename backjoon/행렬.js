const fs = require("fs");
// let input = fs.readFileSync("/dev/stdin").toString().trim().split("\n");

let input = `1 1
1
0`.split("\n");

const filp = (r, c, board) => {
  for (let i = r; i < r + 3; i++) {
    for (let j = c; j < c + 3; j++) {
      board[i][j] = board[i][j] === "0" ? "1" : "0";
    }
  }
};

const isEqual = (aBoard, bBoard) => {
  for (let r = 0; r < aBoard.length; r++) {
    if (aBoard[r].join("") !== bBoard[r].join("")) return false;
  }
  return true;
};

const solution = () => {
  const [N, M] = input
    .shift()
    .split(" ")
    .map((e) => +e);
  const aBoard = input.slice(0, N).map((e) => e.split(""));
  const bBoard = input.slice(N).map((e) => e.split(""));
  let filpCount = 0;
  for (let r = 0; r < N - 2; r++) {
    for (let c = 0; c < M - 2; c++) {
      if (aBoard[r][c] === bBoard[r][c]) continue;
      filp(r, c, aBoard);
      filpCount++;
    }
  }
  return isEqual(aBoard, bBoard) ? filpCount : -1;
};

console.log(solution());
