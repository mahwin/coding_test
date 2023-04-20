const readline = require("readline");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

//공통 변수 선언
let input = [];
let canBuilt = []; // 방화벽을 세울 수 있는 모든 곳
let selected = []; // 병화벽을 세우기로 임시로 지정한 곳.
let rowLen, colLen;
let totalSafeArea; // 불이 번지기 전 공간의 수
let max = -Infinity;
const dirs = [
  [0, 1],
  [1, 0],
  [-1, 0],
  [0, -1],
]; // 불이 번지는 방향.

rl.on("line", (line) => {
  input.push(line.split(" ").map(Number));
});

rl.on("close", () => {
  simulation();
  process.exit();
});

//불이 퍼져나갈 수 있냐
const isCanExpand = (r, c) => {
  if (r < 0 || c < 0 || r >= rowLen || c >= colLen) return false;
  if (input[r][c] === 1) return false;
  return true;
};

const cntSafeArea = () => {
  const v = Array.from({ length: rowLen }, () =>
    Array.from({ length: colLen }, () => false)
  );

  let expandArea = 0;

  for (let r = 0; r < rowLen; r++) {
    for (let c = 0; c < colLen; c++) {
      if (input[r][c] === 2) {
        v[r][c] = true;
        const queue = [[r, c]];
        while (queue.length) {
          const [row, col] = queue.shift();
          for (const d of dirs) {
            const nr = d[0] + row;
            const nc = d[1] + col;
            if (isCanExpand(nr, nc) && !v[nr][nc]) {
              if (input[nr][nc] === 0) expandArea++;
              v[nr][nc] = true;
              queue.push([nr, nc]);
            }
          }
        }
      }
    }
  }

  max = Math.max(max, totalSafeArea - expandArea);
};

// dfs 돌면서 벽을 설치할 수 있는 곳 3곳 찾기.
// 찾았다면 그 결과를 바탕으로 불이 어떻게 번지는 지 확인 후
// 백트래킹으로 원상 복귀.
const selectWall = (node, cnt) => {
  if (cnt === 3) {
    selected.forEach(([r, c]) => (input[r][c] = 1));
    cntSafeArea();
    selected.forEach(([r, c]) => (input[r][c] = 0));
    return;
  }

  if (canBuilt.length === node) return;

  selectWall(node + 1, cnt);
  selected.push(canBuilt[node]);
  selectWall(node + 1, cnt + 1);
  selected.pop();
};

const findCanBuilt = () => {
  let cnt = 0;
  for (let r = 0; r < rowLen; r++) {
    for (let c = 0; c < colLen; c++) {
      if (input[r][c] === 0) {
        canBuilt.push([r, c]);
        cnt++;
      }
    }
  }
  totalSafeArea = cnt - 3; // -3은 방화벽 설치할 곳
};

const simulation = () => {
  [rowLen, colLen] = input.shift();
  findCanBuilt();
  selectWall(0, 0);
  console.log(max);
};
