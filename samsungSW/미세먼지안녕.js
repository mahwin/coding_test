let input = `7 8 50
0 0 0 0 0 0 0 9
0 0 0 0 3 0 0 8
-1 0 5 0 0 0 22 0
-1 8 0 0 0 0 0 0
0 0 0 0 0 10 43 0
0 0 5 0 15 0 0 0
0 0 40 0 0 0 20 0`.split("\n");

let fs = require("fs");
// let input = fs.readFileSync("/dev/stdin").toString().split("\n");

const cntDirty = (board) => {
  let cnt = 0;

  for (let row = 1; row <= R; row++) {
    for (let col = 1; col <= C; col++) {
      if (board[row][col]) {
        cnt += board[row][col];
      }
    }
  }

  return cnt + 2; // 공기청정기
};

let [R, C, T] = input[0].split(" ").map(Number);
let board = Array.from({ length: R + 1 }, () =>
  Array.from({ length: C + 1 }, () => 0)
);
let cleanerRow = [];

for (let i = 1; i < input.length; i++) {
  let rowInfo = input[i].split(" ").map(Number);
  for (let j = 0; j < C; j++) {
    board[i][j + 1] = rowInfo[j];
    if (rowInfo[j] === -1) cleanerRow.push(i);
  }
}

const isValid = (r, c) => {
  //벽일 때, 공기청정기 일때 제외
  if (r < 1 || c < 1 || r > R || c > C) return false;
  if (c === 1 && cleanerRow.includes(r)) return false;
  return true;
};

const dirs = [
  [1, 0],
  [0, 1],
  [-1, 0],
  [0, -1],
];

while (T--) {
  let spreadArr = Array.from({ length: R + 1 }, () =>
    Array.from({ length: C + 1 }, () => 0)
  );
  for (let row = 1; row <= R; row++) {
    for (let col = 1; col <= C; col++) {
      let cur = board[row][col];
      if (cur !== 0 && cur !== -1) {
        let validArr = [];
        for (let dir of dirs) {
          const nr = row + dir[0];
          const nc = col + dir[1];
          if (isValid(nr, nc)) validArr.push([nr, nc]);
        }
        //먼지가 퍼질 곳이 있으면
        if (validArr.length) {
          let spread = Math.floor(cur / 5);
          board[row][col] -= spread * validArr.length;
          validArr.forEach(([row, col]) => spreadArr.push([row, col, spread]));
        }
      }
    }
  }
  spreadArr.forEach(([row, col, amount]) => {
    board[row][col] += amount;
  });
  spreadArr = [];

  //공기 청정기에 의한 회전
  let [r1, r2] = cleanerRow;

  //시계 반방향
  let pre = 0;

  for (let col = 2; col < C; col++) {
    [board[r1][col], pre] = [pre, board[r1][col]];
  }
  for (let row = r1; row > 1; row--) {
    [board[row][C], pre] = [pre, board[row][C]];
  }
  for (let col = C; col > 1; col--) {
    [board[1][col], pre] = [pre, board[1][col]];
  }
  for (let row = 1; row <= r1; row++) {
    [board[row][1], pre] = [pre, board[row][1]];
  }
  board[r1][1] = -1;
  // 시계 방향
  pre = 0;
  for (let col = 2; col < C; col++) {
    [board[r2][col], pre] = [pre, board[r2][col]];
  }
  for (let row = r2; row < R; row++) {
    [board[row][C], pre] = [pre, board[row][C]];
  }

  for (let col = C; col >= 1; col--) {
    [board[R][col], pre] = [pre, board[R][col]];
  }

  for (let row = R - 1; row > r2; row--) {
    [board[row][1], pre] = [pre, board[row][1]];
  }
  board[r2][1] = -1;
}

console.log(cntDirty(board));
