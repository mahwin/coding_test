const readline = require("readline");
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});
let chairs = [];
let rotateArr = [];
let TOTAL_CHAIR = 4; // 총 팔각의자의 수

rl.on("line", function (line) {
  chairs.push(line.trim());
}).on("close", function () {
  solution();
  process.exit();
});

// 특정 의자를 시계 or 반시계 방향으로 돌려줌
//    시계  [0,1,2,3] => [3,0,1,2]
// 반 시계  [0,1,2,3] => [1,2,3,0]
const rotate = () => {
  for (const [chairIdx, d] of rotateArr) {
    if (d === 1) {
      //시계 방향
      const last = chairs[chairIdx].pop();
      chairs[chairIdx].unshift(last);
    } else {
      //반 시계 방향
      const first = chairs[chairIdx].shift();
      chairs[chairIdx].push(first);
    }
  }
};

const simmulation = (chairIdx, d) => {
  // 앞의 의자의 경우 2번 인덱스와 현재 의자의 6번 의자의 값이 다르면 2번 의자 돌아감.
  // 뒤의 의자의 경우 현재 의자 2번 인덱스와 뒤 의자 6번 인덱스의 값이 다르면 의자 돌아감.

  rotateArr = [[chairIdx, d]]; //돌아가는 의자의 인덱스와 방향을 저장해놓고 모두 확인 후 돌림.

  let preIdx = chairIdx - 1;
  let nextIdx = chairIdx + 1;

  while (preIdx > -1) {
    if (chairs[preIdx][2] === chairs[preIdx + 1][6]) break;

    let diff = Math.abs(chairIdx - preIdx);
    rotateArr.push([preIdx, diff % 2 !== 0 ? -1 * d : d]);
    preIdx -= 1;
  }

  while (nextIdx < 4) {
    if (chairs[nextIdx][6] === chairs[nextIdx - 1][2]) break;
    let diff = Math.abs(chairIdx - nextIdx);

    rotateArr.push([nextIdx, diff % 2 !== 0 ? -1 * d : d]);
    nextIdx += 1;
  }
};

// 각 팔각의자 12시 방향에 몇명의 남쪽 사람이 앉아있는지 카운팅.
const cntNorthPeopleintwelveClock = () => {
  let cnt = 0;
  for (let i = 0; i < 4; i++) {
    if (chairs[i][0] === 1) cnt += 2 ** i;
  }
  console.log(cnt);
};

const solution = () => {
  //의자를 배열 형태로 접근하기 위함.
  for (let i = 0; i < 4; i++) {
    chairs[i] = chairs[i].split("").map(Number);
  }

  const n = Number(chairs[TOTAL_CHAIR]);
  for (let i = TOTAL_CHAIR + 1; i < TOTAL_CHAIR + 1 + n; i++) {
    const [chairIdx, d] = chairs[i].split(" ").map(Number);
    simmulation(chairIdx - 1, d); // 0번 부터 의자 시작
    rotate();
  }

  cntNorthPeopleintwelveClock();
};

// 수행 시간 : 413ms
// 메모리 : 10MB
