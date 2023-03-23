const readline = require("readline");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});
let input = [];
rl.on("line", (line) => {
  input.push(line.trim());
});

rl.on("close", () => {
  const n = Number(input[0]);

  const board = Array.from({ length: 100 }, () =>
    Array.from({ length: 100 }, () => 0)
  );

  for (let i = 1; i <= n; i++) {
    let [x, y, d, g] = input[i].split(" ").map(Number);
    moveDragon(x, y, d, g, board);
  }
  console.log(cntBox(board));
  process.exit();
});

function moveDragon(x, y, d, g, board) {
  // d는 방향 0 오른쪽 1위 2 왼 3 아래
  const dirs = [
    [0, 1],
    [-1, 0],
    [0, -1],
    [1, 0],
  ];

  let root = [
    [x, y],
    [x + dirs[d][0], y + dirs[d][1]],
  ];

  while (g--) {
    let newRoot = [];
    const [fixed_x, fixed_y] = root[root.length - 1];
    for (let i = 0; i < root.length - 1; i++) {
      const [x, y] = root[i];
      newRoot.push(rotate(x, y, fixed_x, fixed_y));
    }
    root = root.concat(newRoot.reverse());
  }
  root.forEach(([x, y]) => {
    board[x][y] = 1;
  });

  return root;
}

function rotate(x, y, fixed_x, fixed_y) {
  // 원점으로 이동
  x -= fixed_x;
  y -= fixed_y;

  // 회전
  return [y + fixed_x, fixed_y - x];
}

function cntBox(board) {
  const checkRoot = [
    [0, 1],
    [1, 1],
    [1, 0],
  ];
  let result = 0;
  for (let r = 0; r < 99; r++) {
    for (let c = 0; c < 99; c++) {
      if (board[r][c]) {
        flag = true;
        for (let checkDir of checkRoot) {
          const nr = checkDir[0] + r;
          const nc = checkDir[1] + c;
          if (board[nr][nc] === 0) {
            flag = false;
            break;
          }
        }
        console.log(r, c, flag);
        if (flag) result++;
      }
    }
  }
  return result;
}
