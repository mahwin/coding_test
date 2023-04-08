const readline = require("readline");
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

let input = [];
let robot = {}; // r값, c값, level, 파괴한 몬스터 수
let targetEnemy;
let result = 0;
const dirs = [
  [0, 1],
  [1, 0],
  [-1, 0],
  [0, -1],
];

rl.on("line", function (line) {
  input.push(line.trim().split(" ").map(Number));
}).on("close", function () {
  simulation();
  process.exit();
});

const isValid = (r, c) => {
  if (r < 0 || c < 0 || r >= n || c >= n) return false;
  return true;
};

const findEnemy = () => {
  const queue = [[robot.r, robot.c, 0]];
  const possibleEnemy = [];
  let minLength = undefined;
  const v = Array.from({ length: n }, () =>
    Array.from({ length: n }, () => false)
  );
  v[robot.r][robot.c] = true;
  while (queue.length) {
    const [r, c, cnt] = queue.shift();

    if (minLength && minLength < cnt + 1) continue;

    for (const d of dirs) {
      const nr = r + d[0];
      const nc = c + d[1];

      if (isValid(nr, nc) && !v[nr][nc] && input[nr][nc] <= robot.level) {
        v[nr][nc] = true;
        if (input[nr][nc] < robot.level && input[nr][nc] !== 0) {
          if (!minLength) minLength = cnt + 1;
          possibleEnemy.push([nr, nc, cnt + 1]);
        } else {
          queue.push([nr, nc, cnt + 1]);
        }
      }
    }
  }

  targetEnemy = possibleEnemy.sort((a, b) => {
    if (a[0] === b[0]) return a[1] - b[1];
    return a[0] - b[0];
  })[0];

  return targetEnemy ? true : false;
};

const killEnemy = () => {
  const [er, ec, distance] = targetEnemy;
  input[er][ec] = 0;
  result += distance;
  robot.r = er;
  robot.c = ec;

  if (robot.destroy + 1 === robot.level) {
    robot.level++;
    robot.destroy = 0;
  } else robot.destroy++;
};

const simulation = () => {
  //기본값 세팅
  n = Number(input.shift());

  input.forEach((rowInfo, r) =>
    rowInfo.forEach((info, c) => {
      if (info === 9) {
        // 기본 레벨 2로 시작
        input[r][c] = 0;
        robot = { r, c, level: 2, destroy: 0 };
      }
    })
  );
  while (findEnemy()) {
    killEnemy();
    // input.forEach((el) => console.log(el.join("")));
    // console.log("----------------", result, robot.r, robot.c);
  }
  console.log(result);
};
