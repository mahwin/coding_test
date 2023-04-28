const readline = require("readline");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

let input = [];
let tree = []; // 트리 n x n 격자
let n, k; // 격자 length, 이동 수
let nutrients = []; // [r,c] 특수 영양제 위치
let v; // 특수 영양제를 뿌린 곳 체크
let dirs = [
  null,
  [0, 1],
  [-1, 1],
  [-1, 0],
  [-1, -1],
  [0, -1],
  [1, -1],
  [1, 0],
  [1, 1],
];

rl.on("line", (line) => {
  input.push(line.trim());
});

rl.on("close", () => {
  solution();
  process.exit();
});

const moveAndInsertNutrients = (d, degree) => {
  nutrients = nutrients.map(([r, c]) => {
    let nr = (r + dirs[d][0] * degree + n * degree) % n;
    let nc = (c + dirs[d][1] * degree + n * degree) % n;
    tree[nr][nc]++;
    return [nr, nc];
  });
};

const isValid = (r, c) => {
  if (r < 0 || c < 0 || r >= n || c >= n) return false;
  return true;
};

const diagonalDirs = [
  [1, 1],
  [-1, -1],
  [1, -1],
  [-1, 1],
];

const growUp = () => {
  //영양제 투입한 곳의 대각선 방향에 리브로수 확인 후 성장

  v = Array.from({ length: n }, () => Array.from({ length: n }, () => false));

  nutrients.forEach(([r, c]) => {
    let result = 0;
    for (const d of diagonalDirs) {
      const dr = d[0] + r;
      const dc = d[1] + c;
      if (isValid(dr, dc) && tree[dr][dc] > 0) result++;
    }
    tree[r][c] += result;
    v[r][c] = true;
  });
};

const buyNutrients = () => {
  nutrients = [];
  for (let r = 0; r < n; r++) {
    for (let c = 0; c < n; c++) {
      if (v[r][c]) continue;
      if (tree[r][c] >= 2) {
        tree[r][c] -= 2;
        nutrients.push([r, c]);
      }
    }
  }
};

const totalCnt = () => {
  let result = 0;
  tree.forEach((rowInfo) => rowInfo.forEach((el) => (result += el)));
  return result;
};

const solution = () => {
  [n, k] = input[0].split(" ").map(Number);

  //tree 보드 채우기
  for (let i = 1; i <= n; i++) {
    tree.push(input[i].split(" ").map(Number));
  }

  //초기 영양제 위치
  nutrients.push([n - 2, 0]);
  nutrients.push([n - 1, 0]);
  nutrients.push([n - 2, 1]);
  nutrients.push([n - 1, 1]);

  for (let i = n + 1; i <= n + k; i++) {
    const [d, degree] = input[i].split(" ").map(Number);

    moveAndInsertNutrients(d, degree);
    growUp();
    buyNutrients();
    console.log(tree);
  }
  console.log(totalCnt());
};

// 수행 시간 441 ms
// 메모리 13MB
