// let input = `3 7
// #######
// #R.O.B#
// #######`.split("\n");

let fs = require("fs");
let input = fs.readFileSync("/dev/stdin").toString().split("\n");

// . 빈칸 # 장애물 O 목표
[rowLength, colLength] = input.shift().split(" ");
let board = Array.from({ length: rowLength }, () =>
  Array.from({ length: colLength }, () => undefined)
);

let bPos = [];
let rPos = [];
let targetPos = [];
let dirs = [
  [0, 1],
  [1, 0],
  [-1, 0],
  [0, -1],
];
for (let row = 0; row < rowLength; row++) {
  for (let col = 0; col < colLength; col++) {
    let cur = input[row][col];
    board[row][col] = cur;
    if (cur === "B") {
      bPos = [row, col];
      board[row][col] = ".";
    } else if (cur === "O") targetPos = [row, col];
    else if (cur === "R") {
      board[row][col] = ".";
      rPos = [row, col];
    }
  }
}

const isExit = (row, col) => {
  if (row === targetPos[0] && col === targetPos[1]) return true;
  else return false;
};

const isValid = (row, col) => {
  if (row < 0 || row >= rowLength || col < 0 || col >= colLength) return false;
  else return true;
};

const move = (row, col, dir, anotheBallR, anotheBallC) => {
  let newR = row + dir[0];
  let newC = col + dir[1];
  while (isValid(newR, newC) && board[newR][newC] === ".") {
    if (newR === anotheBallR && newC === anotheBallC) break;
    row = newR;
    col = newC;
    newR += dir[0];
    newC += dir[1];
  }
  if (isExit(newR, newC)) {
    row = newR;
    col = newC;
  }
  return [row, col];
};
function solution() {
  const queue = [[...rPos, ...bPos, 0]];

  while (queue.length) {
    let [redR, redC, blueR, blueC, cnt] = queue.shift();

    if (cnt > 10) return -1;
    if (isExit(redR, redC)) return cnt;

    for (const dir of dirs) {
      let isRedFirst;
      if (dir[0] > 0) {
        isRedFirst = redR > blueR ? true : false;
      } else if (dir[0] < 0) {
        isRedFirst = redR > blueR ? false : true;
      } else if (dir[1] > 0) {
        isRedFirst = redC > blueC ? true : false;
      } else if (dir[1] < 0) {
        isRedFirst = redC > blueC ? false : true;
      }

      if (isRedFirst) {
        [moveRedR, moveRedC] = move(redR, redC, dir, blueR, blueC);
        [moveBlueR, moveBlueC] = move(blueR, blueC, dir, moveRedR, moveRedC);
      } else {
        [moveBlueR, moveBlueC] = move(blueR, blueC, dir, redR, redC);
        [moveRedR, moveRedC] = move(redR, redC, dir, moveBlueR, moveBlueC);
      }

      let blueExit = isExit(moveBlueR, moveBlueC);

      if (
        !blueExit &&
        [redR, redC, blueR, blueC].join("") !==
          [moveRedR, moveRedC, moveBlueR, moveBlueC].join("")
      ) {
        queue.push([moveRedR, moveRedC, moveBlueR, moveBlueC, cnt + 1]);
      }
    }
  }
  return -1;
}

console.log(solution());
