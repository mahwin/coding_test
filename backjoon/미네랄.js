let input = `9 8
........
.xxxx...
.x......
.x.xxxx.
.x....x.
.x....x.
.xxxx.x.
....xxx.
......x.
1
2`.split("\n");

const fs = require("fs");
// let input = fs.readFileSync("/dev/stdin").toString().split("\n");

// 초기값 설정.
const dirs = [
  [0, 1],
  [1, 0],
  [-1, 0],
  [0, -1],
];
const [rowLen, colLen] = input[0].split(" ").map(Number);
const board = []; // 동굴 상태 저장
for (let i = 1; i <= rowLen; i++) {
  board.push(input[i].split(""));
}
const k = Number(input[rowLen + 1]);
const heights = input[rowLen + 2].split(" ").map(Number); //던진 곡갱이의 높이 저장

const getNearMineral = (r, c) => {
  const nears = [];
  for (const d of dirs) {
    const nr = r + d[0];
    const nc = c + d[1];
    if (isValid(nr, nc) && board[nr][nc] == "x") {
      nears.push([nr, nc]);
    }
  }
  return nears;
};

const findMineral = (r) => {
  // 특정 높이에서 존재하는 미네라를 col 값을 리턴함.
  const tmp = [];
  for (let c = 0; c < colLen; c++) {
    if (board[r][c] == "x") {
      // 부서질 미네랄이 있다면
      tmp.push(c);
    }
  }
  return tmp;
};

const isValid = (r, c) => {
  // 경계 체크
  if (r < 0 || c < 0 || r >= rowLen || c >= colLen) return false;
  return true;
};

const getFalling = (r, c) => {
  // 특정 좌표가 부서진다면 클러스터가 떠있을지 땅으로 떨어질지 판단.
  const v = Array.from({ length: rowLen }, () =>
    // 사이클 방지.
    Array.from({ length: colLen }, () => false)
  );

  const fallings = [[r, c]];

  v[r][c] = true; // 첫 미네랄 위치 방문체크
  const queue = [[r, c]];
  while (queue.length) {
    const [row, col] = queue.shift();
    if (row === rowLen - 1) return []; //  땅과 연결되어 있으면 떨어질 미네랄이 없어서 빈 배열 리턴.
    for (const d of dirs) {
      const nr = d[0] + row;
      const nc = d[1] + col;
      if (isValid(nr, nc) && !v[nr][nc] && board[nr][nc] == "x") {
        v[nr][nc] = true;
        queue.push([nr, nc]);
        fallings.push([nr, nc]);
      }
    }
  }
  return fallings;
};

const gravity = (posArr) => {
  posArr = posArr.sort((a, b) => b[1] - a[1]);
  if (!posArr.length) return;
  const check = Array.from({ length: rowLen }, () =>
    Array.from({ length: colLen }, () => false)
  );
  posArr.forEach(([r, c]) => (check[r][c] = true));
  let canGo = 1;
  // 중력 작용한 것처럼 미네랄 없을 떄까지 내리기.
  let falg = true;
  while (falg) {
    canGo++;
    for (const [r, c] of posArr) {
      if (
        r + canGo >= rowLen ||
        (!check[r + canGo][c] && board[r + canGo][c] == "x")
      ) {
        falg = false;
        canGo--; //canGo만큼 내려갔을때 장애물이 있었으니 canGo + 1 !!
        break;
      }
    }
  }
  // swap해줘야함.
  posArr.forEach(([r, c]) => {
    board[r][c] = ".";
  });
  posArr.forEach(([r, c]) => {
    board[r + canGo][c] = "x";
  });
};

const printBoard = () => {
  board.forEach((rowInfo) => console.log(rowInfo.join("")));
};

const solution = (rowLen, colLen, board) => {
  for (let i = 0; i < k; i++) {
    const r = rowLen - heights[i]; // 0 인덱스 부터 시작하려고 -1
    const mineralCol = findMineral(r);
    if (!mineralCol.length) continue; // 부서지는 미네랄이 없다면 패스
    const c = i % 2 == 0 ? mineralCol[0] : mineralCol.at(-1);
    board[r][c] = "."; // 해당 미네랄 파괴
    const nears = getNearMineral(r, c); // 해당 미네랄 4방향으로 미네랄이 존재하는지 확인
    nears.forEach((el) => {
      const fallings = getFalling(...el); // 해방 방향으로 미네랄이 존재한다면 그 미네랄을 bfs를 돌면서 바닥과 연결 안 됐다면 거쳐온 루트 리턴
      gravity(fallings); // 리턴 받은 루트를 바닥으로 내리기
    });
  }
  printBoard();
};
solution(rowLen, colLen, board);
