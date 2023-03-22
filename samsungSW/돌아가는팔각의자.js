const readline = require("readline");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});
let input = [];
rl.on("line", (line) => {
  input.push(line);
});

rl.on("close", () => {
  let chairs = [];
  for (let i = 0; i < 4; i++) {
    chairs.push(input[i].split("").map(Number));
  }

  let trials = Number(input[4]);

  for (let i = 5; i < trials + 5; i++) {
    let [chairIdx, direction] = input[i].split(" ").map(Number);

    chairIdx--; // 의자 번호 0번 부터 시작하도록
    let rotateDirections = {}; // key는 chairIdx, value는 도는 방향. 정방향 1 역방향 -1
    rotateDirections[chairIdx] = direction;

    //오른 방향
    let next = chairIdx + 1;
    let cur = chairIdx;
    let d = direction;
    while (next < 4) {
      if (chairs[cur][2] !== chairs[next][6]) {
        d = d === 1 ? -1 : 1;
        rotateDirections[next] = d;
        next += 1;
        cur += 1;
      } else break;
    }

    //왼 방향
    pre = chairIdx - 1;
    cur = chairIdx;
    d = direction;
    while (pre > -1) {
      if (chairs[pre][2] !== chairs[cur][6]) {
        d = d === 1 ? -1 : 1;
        rotateDirections[pre] = d;
        pre -= 1;
        cur -= 1;
      } else break;
    }
    cycle(chairs, rotateDirections);
  }
  console.log(calScore(chairs));
  process.exit();
});

const cycle = (arr, rotateObj) => {
  for (let [idx, d] of Object.entries(rotateObj)) {
    if (d === 1) {
      let last = arr[idx].pop();
      arr[idx].unshift(last);
    } else {
      let first = arr[idx].shift();
      arr[idx].push(first);
    }
  }
};

const calScore = (arr) => {
  let result = 0;
  arr.forEach((el, i) => {
    result += 2 ** i * el[0];
  });
  return result;
};
