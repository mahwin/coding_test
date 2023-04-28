const readline = require("readline");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

let input = [];
let n, k; // 무빙워크 길이, 안정성
let movingwalker = []; // 무빙워크의 안전성
let people = []; // 특정 무빙워크 인덱스를 사람이 밟고 있는지 여부를 boolean;

rl.on("line", (line) => {
  input.push(line.trim());
});

rl.on("close", () => {
  solution();
  process.exit();
});

const rotateMoving = () => {
  // step1 무빙워크 회전
  movingwalker.unshift(movingwalker.pop());
  people.unshift(people.pop());
};

const walkMovingwalker = () => {
  // step2 무빙워크에서 사람이 이동
  for (let i = people.length - 2; i > -1; i--) {
    if (people[i] && !people[i + 1] && movingwalker[i + 1] > 0) {
      people[i + 1] = true;
      people[i] = false;
      movingwalker[i + 1]--;
    }
  }
};

const enterMovingwalker = () => {
  // step3 1번 칸이 비었으면 사람이 올라감.
  if (!people[0] && movingwalker[0] > 0) {
    people[0] = true;
    movingwalker[0]--;
  }
};

const isSafe = () => {
  // step4 안정성 체크
  return movingwalker.filter((safty) => safty === 0).length < k;
};

const exit = () => {
  // n번칸 위치를 밟고 있으면 바로 나감.
  people[n - 1] = false;
};

const solution = () => {
  [n, k] = input[0].split(" ").map(Number);
  movingwalker = input[1].split(" ").map(Number);
  people = Array.from({ length: n }, () => false);
  let trial = 1;
  while (true) {
    rotateMoving();
    exit();
    walkMovingwalker();
    exit();
    enterMovingwalker();

    if (!isSafe()) break;
    trial++;
  }

  console.log(trial);
};

// 수행 시간 715ms
// 메모리 13MB
