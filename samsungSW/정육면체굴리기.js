const readline = require("readline");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

let input = [];
let rowLen, colLen, r, c, k; // 행 길이, 열 길이, 주사위의 row, 주사위의 col, 주사위 굴린 횟수.
const dices = Array.from({ length: 6 }, () => 0);
const dirs = [[], [0, 1], [0, -1], [-1, 0], [1, 0]]; // 1 동 2 서 3 북 4 남
let [front, right, bottom] = [0, 1, 2];

rl.on("line", (line) => {
  input.push(line.trim().split(" ").map(Number));
});

rl.on("close", () => {
  simulation();
  process.exit();
});

// 경계 확인
const isValid = (r, c) => {
  if (r < 0 || c < 0 || r >= rowLen || c >= colLen) return false;
  return true;
};

const simulation = () => {
  [rowLen, colLen, r, c, k] = input.shift();
  const ds = input[rowLen];

  for (const d of ds) {
    const nr = dirs[d][0] + r;
    const nc = dirs[d][1] + c;
    if (isValid(nr, nc)) {
      rotate(d);
      paintAndPrint(nr, nc);
      r = nr;
      c = nc;
    }
  }
};

//회전
const rotate = (d) => {
  if (d === 1) {
    // 동쪽으로 돌리면 right => bottom, bottom과 짝을 이루는 제일 위의 상자가 right가 됨
    let tmp = bottom;
    bottom = right;
    right = 5 - tmp;
  }
  if (d === 2) {
    // 서쪽으로 돌리면 bottom => right, right와 짝인 left가 bottom
    let tmp = bottom;
    bottom = 5 - right;
    right = tmp;
  }
  if (d === 3) {
    // 북으로 돌리면 bottom이 front front와 짝인 부분이 bottom
    let tmp = front;
    front = bottom;
    bottom = 5 - tmp;
  }
  if (d === 4) {
    // 남으로 돌리면 front => bottom bottom과 짝인 부분이 front
    let tmp = bottom;
    bottom = front;
    front = 5 - tmp;
  }
};

//주사위나 판에 숫자를 페인팅하고 주사위 제일 상단의 숫자를 프린팅.
const paintAndPrint = (r, c) => {
  if (input[r][c] === 0) {
    input[r][c] = dices[bottom];
  } else {
    dices[bottom] = input[r][c];
    input[r][c] = 0;
  }
  console.log(dices[5 - bottom]);
};
