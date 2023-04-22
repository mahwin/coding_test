const readline = require("readline");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

//전역 변수 설정
let input = [];
let n, L, H; // n X n 배열의 크기 L 최소 R 최대
let result = 0; // 몇번의 이동이 있었는지 저장;
let v; // 방문 체크
const dirs = [
  [0, 1],
  [1, 0],
  [-1, 0],
  [0, -1],
];
rl.on("line", (line) => {
  input.push(line.trim().split(" ").map(Number));
});

rl.on("close", () => {
  solution();
  process.exit();
});

const isValid = (r, c) => {
  if (r < 0 || c < 0 || r >= n || c >= n) return false;
  return true;
};

//한 지점을 기점으로 bfs를 돌면서 이동할 수 있는지 확인
const move = (row, col) => {
  const queue = [[row, col]];

  let egg = input[row][col]; //조건 만족하는 달걀의 양
  const root = [[row, col]]; // 조건 만족하는 계란틀의 위치 저장
  while (queue.length) {
    const [r, c] = queue.shift();
    for (const d of dirs) {
      const nr = d[0] + r;
      const nc = d[1] + c;
      if (isValid(nr, nc) && !v[nr][nc]) {
        const diff = Math.abs(input[r][c] - input[nr][nc]);
        if (L <= diff && diff <= H) {
          v[nr][nc] = true;
          egg += input[nr][nc];
          console.log(nr, nc);
          root.push([nr, nc]);
          queue.push([nr, nc]);
        }
      }
    }
  }

  if (root.length === 1) return false;
  let divideEgg = Math.floor(egg / root.length);
  root.forEach(([r, c]) => {
    input[r][c] = divideEgg;
  });
  return true;
};

//모든 지점을 체크하면서 이동이 한 번이라도 있었다면 return true else false;
const isCanMove = () => {
  v = Array.from({ length: n }, () => Array.from({ length: n }, () => false));
  let flag = false;
  for (let r = 0; r < n; r++) {
    for (let c = 0; c < n; c++) {
      if (v[r][c]) continue;
      v[r][c] = true;
      if (move(r, c)) flag = true;
    }
  }
  return flag;
};

const solution = () => {
  [n, L, H] = input.shift();
  while (true) {
    if (!isCanMove()) break;
    result++;
  }
  console.log(result);
};

// 수행 시간 : 653ms
// 메모리 : 18MB
