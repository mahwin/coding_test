const readline = require("readline");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

let input = [];
let n;
const BOARD_LEN = 104;
const board = Array.from({ length: BOARD_LEN }, () =>
  Array.from({ length: BOARD_LEN }, () => 0)
); //단위 정사각형 만들 때 사용.
const dirs = [
  // 오른쪽,위쪽, 왼쪽, 아래쪽
  [0, 1],
  [-1, 0],
  [0, -1],
  [1, 0],
];

rl.on("line", (line) => {
  input.push(line.trim());
});

rl.on("close", () => {
  solution();
  process.exit();
});

const flip = (x, y, baseX, baseY) => {
  const zeroX = x - baseX;
  const zeroY = y - baseY;
  return [zeroY + baseX, baseY - zeroX];
};

const draw = (x, y, d, g) => {
  const route = [
    [x, y],
    [x + dirs[d][0], y + dirs[d][1]],
  ];

  for (let i = 0; i < g; i++) {
    const len = route.length;
    const [baseX, baseY] = route[len - 1];
    for (let j = len - 2; j > -1; j--) {
      route.push(flip(...route[j], baseX, baseY));
    }
  }

  route.forEach(([r, c]) => (board[r][c] = 1));
};

const isValid = (x, y) => {
  if (x < 0 || y < 0 || x >= BOARD_LEN || y >= BOARD_LEN) return false;
  return true;
};

const cntBox = () => {
  let result = 0;
  for (let x = 0; x < BOARD_LEN; x++) {
    for (let y = 0; y < BOARD_LEN; y++) {
      if (!board[x][y]) continue;

      if (
        isValid(x + 1, y + 1) &&
        board[x + 1][y] &&
        board[x][y + 1] &&
        board[x + 1][y + 1]
      ) {
        result++;
      }
    }
  }

  return result;
};

const solution = () => {
  n = Number(input[0]);
  for (let i = 1; i <= n; i++) {
    const [x, y, d, g] = input[i].split(" ").map(Number);
    draw(x, y, d, g);
  }

  console.log(cntBox());
};

//수행 시간 457ms
//메모리 14MB
