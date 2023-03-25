const readline = require("readline");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const dirs = [
  null,
  [1, 0],
  [1, -1],
  [0, -1],
  [-1, -1],
  [-1, 0],
  [-1, 1],
  [0, 1],
  [1, 1],
];

let input = [];
rl.on("line", (line) => {
  input.push(line.trim());
});

let blockObj = {};
rl.on("close", () => {
  const n = Number(input[0]);
  let board = Array.from({ length: 104 }, () =>
    Array.from({ length: 4 }, () => null)
  );

  for (let i = 1; i <= n; i++) {
    blockObj[i] = input[i].split(" ").map(Number);
  }
  let cnt = 0;

  for (let i = 9; i < 9 + n; i++) {
    const [col, blockNum] = input[i].split(" ").map(Number);
    if (col === 0) {
      //  떨어질 곳이 랜덤이다.
    } else {
      // 떨어질 곳이 정해져 있다.
      console.log(board.slice(0, 10), "초기");
      cnt += blockDrop(board, blockNum, col);
      console.log(board.slice(0, 10), "드랍");
      board = move(board);
      console.log(board.slice(0, 10), "무브");
      cnt += gravity(board);
      console.log(board.slice(0, 10), "중력");
    }
  }
  console.log(cnt);

  process.exit();
});

const blockDrop = (board, blockNum, fixedCol) => {
  for (let row = 0; row < 104; row++) {
    if (board[row][fixedCol] === null) {
      board[row][fixedCol] = [blockNum, 0];
      break;
    }
  }
  //제일 밑바닥만 확인하면 됨.

  if (board[0].every((el) => el !== null)) {
    board[0] = new Array(4).fill(null);
    return 1;
  }
  return 0;
}; // 블럭 떨어뜨린 후 점수 체크

const isValid = (r, c) => {
  if (r < 0 || c < 0 || r >= 101 || c >= 4) return false;
  return true;
};

const move = (board) => {
  let cnt = 0;
  const copy = Array.from({ length: 101 }, () =>
    Array.from({ length: 4 }, () => null)
  );

  for (let row = 0; row < 101; row++) {
    for (let col = 0; col < 4; col++) {
      if (board[row][col]) {
        const [blockNum, moveCnt] = board[row][col];
        const nextMoveCnt = moveCnt + 1 > 8 ? 1 : moveCnt + 1;
        const nr = row + dirs[blockObj[blockNum][nextMoveCnt]][0];
        const nc = col + dirs[blockObj[blockNum][nextMoveCnt]][1];

        if (isValid(nr, nc)) {
          if (copy[nr][nc] && copy[nr][nc][0] < blockNum) {
            continue;
          } else {
            copy[nr][nc] = [blockNum, nextMoveCnt];
          }
        } else {
          if (copy[row][col] && copy[row][col][0] < blockNum) {
            continue;
          } else {
            copy[row][col] = [blockNum, nextMoveCnt];
          }
        }
      }
    }
  }

  return copy.map((el) => [...el]);
}; // 블럭 움직인 후 점수 체크

const gravity = (board) => {
  const colsInfo = [[], [], [], []]; // 1열 값, 2열 값, 3열 값 , 4열 값
  for (let row = 0; row < 104; row++) {
    for (let col = 0; col < 4; col++) {
      if (board[row][col]) {
        colsInfo[col].push(board[row][col]);
        board[row][col] = null;
      }
    }
  }

  for (let col = 0; col < 4; col++) {
    const items = colsInfo[col];
    for (let row = 0; row < items.length; row++) {
      board[row][col] = items[row];
    }
  }
  let cnt = 0;
  for (let row = 0; row < 104; row++) {
    if (board[row].every((el) => el !== null)) {
      cnt++;
      board[row] = new Array(4).fill(null);
    } else return cnt;
  }
}; // 중력에 의해 바닥으로 붙인 후 점수 체크
