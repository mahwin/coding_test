const readline = require("readline");
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

// 0 북 1 동 2 남 3 서
const dirs = [
  [-1, 0],
  [0, 1],
  [1, 0],
  [0, -1],
];

let n, m; // rowLen, colLen
let carPos; // [r,c,d]
let result = 1; //결과 값
let v; // 방문 체크
let input = [];

rl.on("line", function (line) {
  input.push(line.trim().split(" ").map(Number));
}).on("close", function () {
  solution();
  process.exit();
});

const isValid = (r, c) => {
  //경계 안에 대한 검증
  if (r < 0 || c < 0 || r >= n || c >= m) return false;
  //갈 수 있는 곳인가에 대한 검증
  if (input[r][c] === 1) return false;
  return true;
};

const solution = () => {
  [n, m] = input[0];
  carPos = input[1];
  input = input.slice(2);
  // 이동할 때 마다

  //방문처리
  v = Array.from({ length: n }, () => Array.from({ length: m }, () => false));

  v[carPos[0]][carPos[1]] = true;

  drive(...carPos);

  console.log(result);
};

const drive = (r, c, d) => {
  //전진
  for (let i = 0; i < 4; i++) {
    const nd = d - 1 > -1 ? d - 1 : 3;
    const nR = r + dirs[nd][0];
    const nC = c + dirs[nd][1];

    if (isValid(nR, nC)) {
      if (!v[nR][nC]) {
        //갈수도 있고, 방문한적 있으면

        v[nR][nC] = true;
        result++;
        drive(nR, nC, nd);
        return;
      }
    }
    // 조건에 부합하는 갈 수 있는 곳이 없다면 방향만 바꾸고 반복문 다시 진행
    d = nd;
  }

  //후진
  const rR = r - dirs[d][0];
  const rC = c - dirs[d][1];
  if (isValid(rR, rC)) drive(rR, rC, d);
};

// 수행 시간 417ms
// 메모리 10MB

// 경계 값 검증 함수(isValid)에서 계속 row 경계 값이랑 col 경계 값을 반대로 넣거나 같은 값을 넣는 실수를 함...;
