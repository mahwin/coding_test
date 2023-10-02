const fs = require("fs");
let input = fs.readFileSync("/dev/stdin").toString().trim().split("\n");

const solution = () => {
  const N = Number(input.shift());
  const board = input.map((el) => el.split(" ").map(Number));
  const linkedBoard = Array.from({ length: N }, () =>
    Array.from({ length: N }, () => false)
  );

  for (let i = 0; i < N; i++) {
    for (let j = 0; j < N; j++) {
      if (i == j) continue;
      for (k = 0; k < N; k++) {
        if (j === k || i === k) continue;

        if (board[i][j] == board[i][k] + board[k][j]) {
          linkedBoard[i][j] = true;
        } else if (board[i][j] > board[i][k] + board[k][j]) return -1;
      }
    }
  }
  let result = 0;
  for (let i = 0; i < N; i++) {
    for (let j = i + 1; j < N; j++) {
      if (!linkedBoard[i][j]) {
        result += board[i][j];
      }
    }
  }
  return result;
};

console.log(solution());
