```
주사위를 굴리면 어떻게 되는지가 문제 풀이의 핵심
주사위 굴렸을 때 6면이 어떻게 변하는지 확인해도 되지만 항상 마주보는 면은 일정하기에 3가지 면에 대한 정보를 알고 있으면 마주보는 면을 구할 수 있다.
앞 오른쪽 밑 3가지만 확인해서 특정 방향으로 주사위가 갈 수 있다면 그 방향으로 갈때 
[앞,오른,밑]이 어떻게 변할지를 확인하고 바꿔준다
ex) 동쪽으로 굴리면 
오른쪽 => 밑
앞 => 앞
밑과 짝인 위 => 오른
```;

const readline = require("readline");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

let result = [];
let input = [];
let rowLen, colLen, row, col, k;
const dices = Array.from({ length: 6 }, () => 0);
const dirs = [
  [0, 1],
  [0, -1],
  [-1, 0],
  [1, 0],
]; // 방향
let [f, r, b] = [0, 1, 2]; // 앞,오른,밑

rl.on("line", (line) => {
  input.push(line.trim().split(" ").map(Number));
});

rl.on("close", () => {
  solution();
  console.log(result.join("\n"));
  process.exit();
});

const isValid = (r, c) => {
  if (r < 0 || c < 0 || r >= rowLen || c >= colLen) return false;
  return true;
};

const solution = () => {
  [rowLen, colLen, row, col, k] = input.shift();
  const ds = input[rowLen];

  for (const d of ds) {
    const nr = dirs[d - 1][0] + row;
    const nc = dirs[d - 1][1] + col;
    //주사위를 원하는 공간으로 굴릴 수 있는지 판별
    if (isValid(nr, nc)) {
      // 있다면 회전시키고
      rotateDice(d);
      // 회전 후 바닥면과 주사위면을 체크해서 원하는 결과값을 얻고
      printf(nr, nc);
      // 주사위의 위치를 업데이트 한다.
      row = nr;
      col = nc;
    }
  }
};

//회전
const rotateDice = (d) => {
  let tmp;
  switch (d - 1) {
    case 0:
      tmp = b;
      b = r;
      r = 5 - tmp;
      break;
    case 1:
      tmp = b;
      b = 5 - r;
      r = tmp;
      break;
    case 2:
      tmp = f;
      f = b;
      b = 5 - tmp;
      break;
    case 3:
      tmp = b;
      b = f;
      f = 5 - tmp;
      break;
  }
};

//주사위나 판에 숫자를 페인팅하고 주사위 제일 상단의 숫자를 프린팅.
const printf = (r, c) => {
  if (input[r][c] === 0) {
    input[r][c] = dices[b];
  } else {
    dices[b] = input[r][c];
    input[r][c] = 0;
  }
  result.push(dices[5 - b]);
};
