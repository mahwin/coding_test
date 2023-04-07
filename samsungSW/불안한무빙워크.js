const readline = require("readline");
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});
let input = [];
let zeroCnt = 0;
rl.on("line", function (line) {
  input.push(line.trim().split(" ").map(Number));
}).on("close", function () {
  console.log(simulation());
  process.exit();
});

//무빙워크 한 칸 회전   [0,1,2,n-1] => [2n-1,0,1,...,n-2]
const rotate = () => {
  let pre = movingwalk[0] - 1 < 0 ? 2 * n - 1 : movingwalk[0] - 1;

  //한 칸 회전 후 무빙워크
  movingwalk.pop();
  movingwalk.unshift(pre);
  //한 칸 회전 후 무빙워크 위의 사람
  people.pop();
  people.unshift(null);
  if (people[n - 1] !== null) people[n - 1] = null;
};

//무빙워크 위의 사람 한 칸 전진

const walk = () => {
  for (let i = n - 1; i > -1; i--) {
    if (people[i] === null) continue;
    const movingwalkIdx = people[i];
    const nextMovingwalkIdx =
      movingwalkIdx + 1 > 2 * n - 1 ? 0 : movingwalkIdx + 1;
    if (input[nextMovingwalkIdx] > 0 && people[i + 1] === null) {
      input[nextMovingwalkIdx]--;
      people[i + 1] = nextMovingwalkIdx;
      people[i] = null;
      if (input[nextMovingwalkIdx] === 0) zeroCnt++;
    }
  }
};

// 사람 추가
const poepleIn = () => {
  const idx = movingwalk[0];

  if (input[idx] > 0) {
    input[idx]--;
    people[0] = idx;
    if (input[idx] === 0) zeroCnt++;
  }
};

//안정성 평가
const isSaved = () => {
  return zeroCnt >= k ? false : true;
};

let movingwalk;
let n, k; // 무빙 워크의 길이, 안정성 판별 갯수

const simulation = () => {
  [n, k] = input.shift();
  input = input[0];
  people = Array.from({ length: n }, () => null);
  movingwalk = Array.from({ length: n }, (_, i) => i);
  let test = 1;

  while (true) {
    rotate();
    walk();
    poepleIn();
    if (!isSaved()) break;

    // console.log(zeroCnt);
    test++;
  }
  return test;
};
