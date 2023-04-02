const readline = require("readline");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

let input = [];
let board = [];
let dices = Array.from({ length: 7 }, () => 0); //[밑,앞,오른,왼,뒤,위]
let n, m, x, y, k;
let [up, front, right] = [1, 2, 3];
rl.on("line", (line) => {
  input.push(line.trim());
});

rl.on("close", () => {
  [n, m, x, y, k] = input[0].split(" ").map(Number);

  for (let i = 1; i <= n; i++) {
    board.push(input[i].split(" ").map(Number));
  }
  //1 동 2 서 3 북 4 남
  const dirs = [null, [0, 1], [0, -1], [-1, 0], [1, 0]];
  const roots = input[1 + n].split(" ").map(Number);

  roots.forEach((root) => {
    const d = dirs[root];
    const nx = d[0] + x;
    const ny = d[1] + y;
    if (isValid(nx, ny)) {
      //굴리는게 가능하다면
      [x, y] = [nx, ny];
      moveDice(root, nx, ny);
      getDiceUp();
    }
  });

  process.exit();
});

const isValid = (x, y) => {
  if (x < 0 || y < 0 || x >= n || y >= m) return false;
  return true;
};

const moveDice = (direction, nx, ny) => {
  if (direction === 1) {
    //동
    [up, front, right] = [7 - right, front, up];
  } else if (direction === 2) {
    //서
    [up, front, right] = [right, front, 7 - up];
  } else if (direction === 3) {
    //북
    [up, front, right] = [front, 7 - up, right];
  } else if (direction === 4) {
    //남
    [up, front, right] = [7 - front, up, right];
  }

  if (board[nx][ny] === 0) {
    board[nx][ny] = dices[7 - up];
  } else {
    dices[7 - up] = board[nx][ny];
    board[nx][ny] = 0;
  }
};
const getDiceUp = () => {
  console.log(dices[up]);
};
