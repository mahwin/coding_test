let input = `6 6
1 0 0 0 0 0
0 1 0 0 0 0
0 0 1 5 0 0
0 0 5 1 0 0
0 0 0 0 1 0
0 0 0 0 0 1`.split("\n");

const dirs = [
  [0, 1],
  [0, -1],
  [1, 0],
  [-1, 0],
]; //동 서 남 북

const cctvDir = [
  [[0], [1], [2], [3]],
  [
    [0, 1],
    [2, 3],
  ],
  [
    [0, 2],
    [0, 3],
    [1, 2],
    [1, 3],
  ],
  [
    [0, 1, 2],
    [0, 1, 3],
    [0, 2, 3],
    [1, 2, 3],
  ],
];

const [rowLength, colLength] = input.shift().split(" ").map(Number);
let total = 0;
let cctvPos = [];
let cctv5 = [];

let board = Array.from({ length: rowLength }, () =>
  Array.from({ length: colLength }, () => 0)
);

for (let i = 0; i < rowLength; i++) {
  let curInput = input[i].split(" ").map(Number);
  for (let j = 0; j < colLength; j++) {
    let cur = curInput[j];
    if (cur === 0) continue;
    if (cur <= 4) {
      total++;
      cctvPos.push([i, j, cur]);
    } else if (cur === 5) {
      cctv5.push([i, j]);
    }
    board[i][j] = cur;
  }
}

const isValid = (r, c) => {
  if (r < 0 || r >= rowLength || c < 0 || c >= colLength) return false;
  if (board[r][c] === 6) return false;
  return true;
};

const checkDir = (r, c, dirArr, board) => {
  for (let dirIdx of dirArr) {
    let nr = r + dirs[dirIdx][0];
    let nc = c + dirs[dirIdx][1];

    while (isValid(nr, nc)) {
      board[nr][nc] = "#";
      nr += dirs[dirIdx][0];
      nc += dirs[dirIdx][1];
    }
  }

  return board;
};
// cctv 5는 사방확인
for (let [row, col] of cctv5) {
  board = checkDir(row, col, [0, 1, 2, 3], board);
}

const cntNotCCTV = (board) => {
  let cnt = 0;
  for (let i = 0; i < rowLength; i++) {
    for (let j = 0; j < colLength; j++) {
      if (!board[i][j]) cnt++;
    }
  }
  return cnt;
};

// dfs 돌릴껀데 5번은 먼저 처리하자.
let min = Infinity;

const dfs = (node, cnt, board) => {
  if (cnt === total) {
    min = Math.min(min, cntNotCCTV(board));
    return;
  }
  for (let cctv = node; cctv < total; cctv++) {
    for (let d = 0; d < 4; d++) {
      let copy = board.map((el) => [...el]);
      let [r, c, kind] = cctvPos[cctv];

      if (kind === 2 && d >= 2) continue;

      copy = checkDir(r, c, cctvDir[kind - 1][d], copy);
      dfs(cctv + 1, cnt + 1, copy);
    }
  }
};

dfs(0, 0, board);
console.log(min);
