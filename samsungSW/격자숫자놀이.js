const expand = (board) => {
  let result = [];
  let maxLength = 0;
  const rowLen = board.length;
  const colLen = board[0].length;
  for (let r = 0; r < rowLen; r++) {
    let cntObj = {};
    for (let c = 0; c < colLen; c++) {
      const val = board[r][c];
      if (!val) continue;
      cntObj[val] = cntObj[val] ? cntObj[val] + 1 : 1;
    }

    const sort = Object.entries(cntObj).sort((a, b) => {
      if (a[1] === b[1]) {
        return a[0] - b[0];
      } else return a[1] - b[1];
    });
    let sortArr = [];
    sort.forEach((el) => {
      sortArr.push(Number(el[0]));
      sortArr.push(el[1]);
    });
    result.push(sortArr);
  }
  result.forEach((el) => (maxLength = Math.max(maxLength, el.length)));

  maxLength = maxLength > 100 ? 100 : maxLength;

  const copy = Array.from({ length: rowLen }, () =>
    Array.from({ length: maxLength }, () => 0)
  );

  result.forEach((rowInfo, i) => {
    rowInfo.forEach((val, j) => {
      if (j < 100) {
        copy[i][j] = Number(val);
      }
    });
  });
  return copy;
};

const rotate = (board) => {
  const rowLen = board[0].length;
  const colLen = board.length;

  const copy = Array.from({ length: rowLen }, () =>
    Array.from({ length: colLen }, () => 0)
  );

  for (let r = 0; r < colLen; r++) {
    for (let c = 0; c < rowLen; c++) {
      copy[c][r] = board[r][c];
    }
  }
  return copy;
};

const solution = (input) => {
  let [r, c, target] = input[0].split(" ").map(Number);
  [r, c] = [r - 1, c - 1];
  let time = 0;

  let board = [];
  for (i = 1; i < 4; i++) {
    board.push(input[i].split(" ").map(Number));
  }

  while (time < 100) {
    if (r < board.length && c < board[0].length && board[r][c] === target)
      return time;
    const rowLen = board.length;
    const colLen = board[0].length;
    if (rowLen >= colLen) {
      board = expand(board);
    } else {
      board = rotate(board);
      board = expand(board);
      board = rotate(board);
    }
    time++;
  }
  return -1;
};

const readline = require("readline");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});
let input = [];
rl.on("line", (line) => {
  input.push(line.trim());
});

rl.on("close", () => {
  console.log(solution(input));
});
