// const fs = requre("fs");
// const input = fs.readline('')

let input = `14
65 1 33 1 1 1 14 1 1 1 1 1 100 1
1 32 1 43 1 71 1 1 1 1 41 1 1 1
1 1 75 1 81 17 1 1 15 1 1 31 1 12
1 1 100 1 1 1 13 1 1 1 13 1 1 1
20 1 1 1 1 1 1 1 99 1 1 1 1 1
1 1 1 1 1 1 1 79 1 14 1 1 1 1
1 30 1 1 1 1 1 1 1 1 10 1 1 1
1 34 1 1 1 77 1 1 1 1 10 1 1 1
1 1 1 100 1 1 1 51 21 100 1 10 1 1
8 1 1 1 88 1 1 1 13 1 1 1 1 1
1 1 100 1 1 1 31 1 1 1 1 100 1 1
1 9 1 1 100 1 1 1 1 1 100 1 1 1
1 2 1 1 1 1 100 1 1 1 1 1 1 1
3 100 55 1 1 1 100 100 1 1 1 1 1 1`.split("\n");

// let fs = require("fs");
// let input = fs.readFileSync("/dev/stdin").toString().trim().split("\n");

let result = Infinity;

const n = Number(input[0]);
const board = [];
const dirs = [
  [1, -1],
  [1, 1],
  [-1, 1],
  [-1, -1],
];

for (let i = 1; i <= n; i++) {
  board.push(input[i].split(" ").map(Number));
}

let totalPeople = 0;
//전체 인구 한번 계산해서 1,2,3,4 구역만 인구 구하고 나머지 total - (1+2+3+4) 해서 5번 구역 구하기 위함.
board.forEach((rowInfo) => rowInfo.forEach((info) => (totalPeople += info)));

const isValid = (r, c) => {
  if (r < 0 || c < 0 || r >= n || c >= n) return false;
  return true;
};

const isCanDivide = (r, c, d1, d2) => {
  const [leftR, leftC] = [r + dirs[0][0] * d1, c + dirs[0][1] * d1];
  if (!isValid(leftR, leftC)) return false;
  const [downR, downC] = [leftR + dirs[1][0] * d2, leftC + dirs[1][1] * d2];
  if (!isValid(downR, downC)) return false;
  const [rightR, rightC] = [downR + dirs[2][0] * d1, downC + dirs[2][1] * d1];
  if (!isValid(rightR, rightC)) return false;
  return true;
};

const cal = (r, c, d1, d2) => {
  console.log(r, c, d1, d2);
  const copyBoard = Array.from({ length: n }, () =>
    Array.from({ length: n }, () => "E")
  );
  const fiveSection = Array.from({ length: n }, () =>
    Array.from({ length: n }, () => false)
  );

  // 경계 표시
  for (let i = 0; i <= d1; i++) {
    fiveSection[r + i][c - i] = true; // 경계 1
    fiveSection[r + d2 + i][c + d2 - i] = true; // 경계 4
  }

  for (let i = 0; i <= d2; i++) {
    fiveSection[r + i][c + i] = true; // 경계 2
    fiveSection[r + d1 + i][c - d1 + i] = true; // 경계 3
  }
  fiveSection.forEach((el) => console.log(el.join(",")));

  const score = [0, 0, 0, 0];

  // 1번
  for (let row = 0; row < r + d1; row++) {
    for (let col = 0; col <= c; col++) {
      if (fiveSection[row][col]) break;
      copyBoard[row][col] = "A";
      score[0] += board[row][col];
    }
  }

  //2번
  for (let row = 0; row < r + d2 + 1; row++) {
    for (let col = n - 1; col > c; col--) {
      if (fiveSection[row][col]) break;
      copyBoard[row][col] = "B";
      score[1] += board[row][col];
    }
  }
  //3번

  for (let row = r + d1; row < n; row++) {
    for (let col = 0; col < c - d1 + d2; col++) {
      if (fiveSection[row][col]) break;
      copyBoard[row][col] = "C";
      score[2] += board[row][col];
    }
  }
  //4번

  for (let row = r + d2 + 1; row < n; row++) {
    for (let col = n - 1; col >= c - d1 + d2; col--) {
      if (fiveSection[row][col]) break;
      copyBoard[row][col] = "D";
      score[3] += board[row][col];
    }
  }

  const tmp = score.reduce((p, c) => (p += c), 0);
  score.push(totalPeople - tmp);

  score.sort((a, b) => b - a);

  result = Math.min(result, score[0] - score[4]);
};

const solution = () => {
  for (let r = 0; r < n; r++) {
    for (let c = 0; c < n; c++) {
      for (let d1 = 1; d1 < n; d1++) {
        for (let d2 = 1; d2 < n; d2++) {
          if (isCanDivide(r, c, d1, d2)) cal(r, c, d1, d2);
        }
      }
    }
  }
};

solution();
console.log(result);
