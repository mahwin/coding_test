const readline = require("readline");
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});
let input = [];
let n, m;
let hosipital = [];
let patient = [];
let brokenHospital = [];
let result = Infinity;

const dirs = [
  [0, 1],
  [1, 0],
  [-1, 0],
  [0, -1],
];

rl.on("line", function (line) {
  input.push(line.trim().split(" ").map(Number));
}).on("close", function () {
  [n, m] = input.shift();

  solution();

  process.exit();
});

// 없앨 병원 고르기
const dfs = (nextNode, cnt, target) => {
  if (cnt === target) {
    search(brokenHospital);
  }

  for (let i = nextNode; i < hosipital.length; i++) {
    brokenHospital.push(hosipital[i]);
    dfs(i + 1, cnt + 1, target);
    brokenHospital.pop();
  }
};

const isValid = (r, c) => {
  if (r < 0 || c < 0 || r >= n || c >= n) return false;
  return true;
};

// 환자들 좌표를 기준으로 몇 번만에 병원을 찾을 수 있는 총합을 구함.
const search = (brokenHospital) => {
  let possible = hosipital.filter((h) => !brokenHospital.includes(h));
  let total = 0;

  for (let pIdx = 0; pIdx < patient.length; pIdx++) {
    const [pr, pc] = patient[pIdx];
    let tmp = Infinity;
    for (const [hr, hc] of possible) {
      tmp = Math.min(Math.abs(pr - hr) + Math.abs(pc - hc), tmp);
    }
    total += tmp;
  }

  result = Math.min(result, total);
};

const solution = () => {
  for (let i = 0; i < n; i++) {
    for (let j = 0; j < n; j++) {
      if (input[i][j] === 2) hosipital.push([i, j]);
      else if (input[i][j] === 1) patient.push([i, j]);
    }
  }

  dfs(0, 0, hosipital.length - m);
  console.log(result);
};
