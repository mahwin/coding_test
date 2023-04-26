const readline = require("readline");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

let input = [];

rl.on("line", (line) => {
  input.push(line.split(" ").map(Number));
});

rl.on("close", () => {
  solution();
  process.exit();
});
let min = Infinity; // 최소 값 저장
let rowLen, colLen;
let route = []; // 내 체스말들을 어떤 방향으로 움직일지 선택
let chessHoles = []; // 내 체스 말들의 [번호,row,col]

const dirs = [
  [-1, 0],
  [0, 1],
  [1, 0],
  [0, -1],
]; // 북 동 서 남
const chessHoledirs = {
  1: [[0], [1], [2], [3]],
  2: [
    [0, 2],
    [1, 3],
  ],
  3: [
    [0, 1],
    [1, 2],
    [2, 3],
    [3, 0],
  ],
  4: [
    [0, 1, 2],
    [1, 2, 3],
    [2, 3, 0],
    [0, 1, 3],
  ],
  5: [[0, 1, 2, 3]],
};

const isValid = (r, c) => {
  //경계 확인
  if (r < 0 || c < 0 || r >= rowLen || c >= colLen) return false;
  //상대편 말
  if (input[r][c] > 5) return false;

  return true;
};

const findHolse = () => {
  let result = [];
  for (let r = 0; r < rowLen; r++) {
    for (let c = 0; c < colLen; c++) {
      if (!input[r][c]) continue;
      else if (input[r][c] <= 5) {
        result.push([input[r][c], r, c]);
      }
    }
  }
  return result;
};

const cntBlank = (board) => {
  let result = 0;
  for (let r = 0; r < rowLen; r++) {
    for (let c = 0; c < colLen; c++) {
      if (!board[r][c]) result++;
    }
  }
  return result;
};

const moveAndCntBlank = () => {
  const board = input.map((rowInfo) => [...rowInfo]);
  for (let i = 0; i < chessHoles.length; i++) {
    const [holseN, r, c] = chessHoles[i];
    const dirIdx = route[i];
    const ds = chessHoledirs[holseN][dirIdx];
    for (const d of ds) {
      let [copyR, copyC] = [r, c];
      while (true) {
        const nr = dirs[d][0] + copyR;
        const nc = dirs[d][1] + copyC;
        if (isValid(nr, nc)) {
          board[nr][nc] = holseN;
          copyR = nr;
          copyC = nc;
        } else break;
      }
    }
  }
  min = Math.min(min, cntBlank(board));
};

const dfs = (node) => {
  if (node === chessHoles.length) {
    moveAndCntBlank();
    return;
  }
  const holseNum = chessHoles[node][0];
  for (let i = 0; i < chessHoledirs[holseNum].length; i++) {
    route.push(i);
    dfs(node + 1);
    route.pop();
  }
};

const solution = () => {
  [rowLen, colLen] = input.shift();
  chessHoles = findHolse(); //말의 위치 찾기
  dfs(0); //dfs로 내 말이 움직일 방향 route에 저장
  console.log(min);
};

// 수행 시간 851ms
// 메모리 14MB
