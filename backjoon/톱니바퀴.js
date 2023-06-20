const readline = require("readline");
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});
const gears = []; //  톱니 바퀴의 정보가 들어감 [12시 방향 정보, 1시 30분 방향 정보, .... , 10시 30분 방향 정보][4]
const TOTAL_LEN = 4; // 총 톱니의 수;

rl.on("line", function (line) {
  gears.push(line.trim());
}).on("close", function () {
  solution();
  process.exit();
});

const rotate = (rotateArr) => {
  for (const [gIdx, d] of rotateArr) {
    if (d === 1) {
      //시계 방향
      const last = gears[gIdx].pop();
      gears[gIdx].unshift(last);
    } else {
      //반 시계 방향
      const first = gears[gIdx].shift();
      gears[gIdx].push(first);
    }
  }
};

const simmulation = (gIdx, d) => {
  // 특정 톱니를 특정 방향으로 돌릴때 연쇄적으로 돌아가기 때문에 한 톱니를 돌리고 그 영향이 어디까지 가는지 확인 후 돌려야함 !!!
  // i 번째 톱니 바퀴가 돌아간다고 생각하면 i번째와 i+1번째는 각 각 2번 idx와 6번 idx가 달라야 돌아감
  // gears[i][2] != greas[i+1][6]   => i+1 번 돌아감 돌아가는 방향은  반대!
  //i 번째 톱니 바퀴가 돌아간다고 생각하면 i번째와 i-1번째는 각 각 6번 idx와 2번 idx가 달라야 돌아감
  // gears[i][6] != greas[i-1][2]   => i-1 번 돌아감 돌아가는 방향은  반대!

  const rotateArr = [[gIdx, d]];

  let preIdx = gIdx - 1; // 왼쪽 전파
  while (preIdx > -1) {
    if (gears[preIdx][2] === gears[preIdx + 1][6]) break;
    let diff = Math.abs(gIdx - preIdx);
    rotateArr.push([preIdx, diff % 2 !== 0 ? -1 * d : d]);
    preIdx -= 1;
  }

  let nextIdx = gIdx + 1; // 오른쪽 전파
  while (nextIdx < 4) {
    if (gears[nextIdx][6] === gears[nextIdx - 1][2]) break;
    let diff = Math.abs(gIdx - nextIdx);
    rotateArr.push([nextIdx, diff % 2 !== 0 ? -1 * d : d]);
    nextIdx += 1;
  }
  rotate(rotateArr);
};

// 각 톱니의 12시 방향값에 따른 계산.
const cal = () => {
  let cnt = 0;
  for (let i = 0; i < 4; i++) {
    if (gears[i][0] === 1) cnt += 2 ** i;
  }
};

const solution = () => {
  // 톱니 초기값 설정
  for (let i = 0; i < 4; i++) {
    gears[i] = gears[i].split("").map(Number);
  }

  const n = Number(gears[TOTAL_LEN]);
  for (let i = TOTAL_LEN + 1; i < TOTAL_LEN + 1 + n; i++) {
    const [gIdx, d] = gears[i].split(" ").map(Number);
    simmulation(gIdx - 1, d); // 0번 부터 톱니 시작
  }
  cal(); //각 톱니의 12시 방향 값 계산.
};
