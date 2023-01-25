let input = `10
5
1 5
1 3
1 2
1 6
1 7
4
8 D
10 D
11 D
13 L`.split("\n");

const N = Number(input.shift());
const K = Number(input.shift());
const appleBoard = Array.from({ length: N + 1 }, () =>
  Array.from({ length: N + 1 }, () => false)
);

const snakeBoard = Array.from({ length: N + 1 }, () =>
  Array.from({ length: N + 1 }, () => 0)
);
//첫 시작
snakeBoard[1][1] = 1;

for (let i = 0; i < K; i++) {
  [row, col] = input[i].split(" ");
  appleBoard[row][col] = true;
}

let changeDics = {};

for (let i = K + 1; i < input.length; i++) {
  let [key, direction] = input[i].split(" ");
  key = Number(key);
  changeDics[key] = direction;
}

let time = 0;
let snakeHeadPos = [1, 1];

let snakePos = [[1, 1]];
let directions = [
  [0, 1],
  [1, 0],
  [0, -1],
  [-1, 0],
];
let direction = 0;
while (true) {
  let [addRow, addCol] = directions[direction];
  let [curRow, curCol] = snakeHeadPos;
  let newRow = curRow + addRow;
  let newCol = curCol + addCol;
  if (newRow < 1 || newRow > N || newCol < 1 || newCol > N) {
    time++;
    break;
  }
  if (snakeBoard[newRow][newCol]) {
    time++;
    break;
  }
  snakeHeadPos = [newRow, newCol];
  snakePos.push(snakeHeadPos);
  snakeBoard[newRow][newCol] = 1;
  if (!appleBoard[newRow][newCol]) {
    let [r, c] = snakePos.shift();
    snakeBoard[r][c] = 0;
  } else {
    appleBoard[newRow][newCol] = false;
  }
  time++;
  if (changeDics[time]) {
    let d = changeDics[time];
    if (d === "D") {
      direction = direction + 1 > 3 ? 0 : direction + 1;
    } else {
      direction = direction - 1 < 0 ? 3 : direction - 1;
    }
  }
}

console.log(time);
