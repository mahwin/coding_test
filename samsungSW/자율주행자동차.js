const readline = require("readline");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});
let input = [];
rl.on("line", (line) => {
  input.push(line);
});

rl.on("close", () => {
  const [rowLen, colLen] = input[0].split(" ").map(Number);

  const dirs = [
    [-1, 0],
    [0, 1],
    [1, 0],
    [0, -1],
  ];
  //d : 0 북 1 동 2 남 3 서
  const [row, col, d] = input[1].split(" ").map(Number);

  const board = [];

  for (let i = 2; i < 2 + rowLen; i++) {
    board.push(input[i].split(" ").map(Number));
  }

  const v = Array.from({ length: rowLen }, () =>
    Array.from({ length: colLen }, () => false)
  );
  let result = 1;
  v[row][col] = true;

  const isValid = (r, c) => {
    if (r < 0 || c < 0 || r >= rowLen || c >= colLen) return false;
    return true;
  };
  const queue = [[row, col, d]];
  while (queue.length) {
    let [r, c, d] = queue.shift();
    for (let i = 0; i < 4; i++) {
      d = d - 1 === -1 ? 3 : d - 1;
      const nr = dirs[d][0] + r;
      const nc = dirs[d][1] + c;

      if (isValid(nr, nc) && !v[nr][nc] && !board[nr][nc]) {
        v[nr][nc] = true;
        result++;
        queue.push([nr, nc, d]);
        break;
      }
      if (i === 3) {
        //4방향 다 가도 갈 곳이 없었을 경우
        const br = r - dirs[d][0];
        const bc = c - dirs[d][1];
        if (!board[br][bc]) {
          queue.push([br, bc, d]);
        }
      }
    }
  }
  console.log(result);
  process.exit();
});
