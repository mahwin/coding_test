const readline = require("readline");
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});
let input = [];
let treeBoard = [];
let deadTotal = 0;
let n, m, k, year;

rl.on("line", function (line) {
  input.push(line.trim());
}).on("close", function () {
  [n, m, k, year] = input[0].split(" ").map(Number);
  for (let i = 1; i <= n; i++) {
    let el = input[i].split(" ").map(Number);
    el.forEach((info, j) => {
      if (info === -1) el[j] = "B";
    });
    treeBoard.push(el);
  }

  for (let i = 0; i < m; i++) {
    medicineOld();
    grow();
    breeding();
    findMedicinePos();
  }
  console.log(deadTotal);

  process.exit();
});

const dirs = [
  [0, 1],
  [1, 0],
  [-1, 0],
  [0, -1],
];

const isValid = (r, c) => {
  if (r < 0 || c < 0 || r >= n || c >= n) return false; // 경계 확인
  if (treeBoard[r][c] === "B") return false; // 건물 확인
  return true;
};

const grow = () => {
  for (let r = 0; r < n; r++) {
    for (let c = 0; c < n; c++) {
      if (treeBoard[r][c] > 0) {
        for (const d of dirs) {
          const nr = d[0] + r;
          const nc = d[1] + c;
          if (isValid(nr, nc) && treeBoard[nr][nc] > 0) treeBoard[r][c]++;
        }
      }
    }
  }
};

const breeding = () => {
  const breedingTree = Array.from({ length: n }, () =>
    Array.from({ length: n }, () => 0)
  );
  for (let r = 0; r < n; r++) {
    for (let c = 0; c < n; c++) {
      if (treeBoard[r][c] > 0) {
        let aroundN = 0;
        let tmp = [];
        for (const d of dirs) {
          const nr = d[0] + r;
          const nc = d[1] + c;
          if (isValid(nr, nc) && treeBoard[nr][nc] === 0) {
            aroundN++;
            tmp.push([nr, nc]);
          }
        }
        const breedingAmount = Math.floor(treeBoard[r][c] / aroundN);
        tmp.forEach(([r, c]) => (breedingTree[r][c] += breedingAmount));
      }
    }
  }
  for (let r = 0; r < n; r++) {
    for (let c = 0; c < n; c++) {
      if (breedingTree[r][c] > 0) {
        treeBoard[r][c] = breedingTree[r][c];
      }
    }
  }
};

const diaDirs = [
  [1, 1],
  [-1, -1],
  [1, -1],
  [-1, 1],
];

const findMedicinePos = () => {
  let [resultR, resultC] = [0, 0];
  let maxDead = 0;

  for (let r = 0; r < n; r++) {
    for (let c = 0; c < n; c++) {
      if (treeBoard[r][c] > 0) {
        let dead = treeBoard[r][c];
        for (const d of diaDirs) {
          let nr = d[0] + r;
          let nc = d[1] + c;
          while (isValid(nr, nc) && k >= Math.abs(nr - r)) {
            if (treeBoard[nr][nc] <= 0) break;
            else if (treeBoard[nr][nc] > 0) dead += treeBoard[nr][nc];
            nr += d[0];
            nc += d[1];
          }
        }
        if (maxDead < dead) {
          maxDead = dead;
          [resultR, resultC] = [r, c];
        }
      }
    }
  }

  //찾은 위치에 제초제 뿌리기
  treeBoard[resultR][resultC] = -year - 1;
  for (const d of diaDirs) {
    let nr = d[0] + resultR;
    let nc = d[1] + resultC;
    while (isValid(nr, nc) && k >= Math.abs(nr - resultR)) {
      if (treeBoard[nr][nc] <= 0) {
        treeBoard[nr][nc] = -year - 1;
        break;
      }

      treeBoard[nr][nc] = -year - 1;
      nr += d[0];
      nc += d[1];
    }
  }
  deadTotal += maxDead;
};

const medicineOld = () => {
  for (let r = 0; r < n; r++) {
    for (let c = 0; c < n; c++) {
      if (treeBoard[r][c] < 0) treeBoard[r][c]++;
    }
  }
};
