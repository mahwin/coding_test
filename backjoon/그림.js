// let input = `6 5
// 1 1 0 1 1
// 0 1 1 0 0
// 0 0 0 0 0
// 1 0 1 1 1
// 0 0 1 1 1
// 0 0 1 1 1`.split("\n");

const fs = require("fs");
let input = fs.readFileSync("/dev/stdin").toString().split("\n");

const solution = () => {
  const [rowLen, colLen] = input.shift().split(" ");

  input = input.map((el) => el.split(" ").map(Number));

  const isValid = (r, c) => {
    if (r < 0 || c < 0 || r >= rowLen || c >= colLen) return false;
    return true;
  };

  const v = Array.from({ length: rowLen }, () =>
    Array.from({ length: colLen }, () => false)
  );

  const bfs = (row, col) => {
    v[row][col] = true;
    let length = 1;
    const dirs = [
      [0, 1],
      [1, 0],
      [-1, 0],
      [0, -1],
    ];
    const q = [[row, col]];

    while (q.length) {
      const [r, c, cnt] = q.shift();
      for (const d of dirs) {
        const nr = r + d[0];
        const nc = c + d[1];
        if (isValid(nr, nc) && input[nr][nc] != "0" && !v[nr][nc]) {
          v[nr][nc] = true;
          length++;
          q.push([nr, nc]);
        }
      }
    }
    return length;
  };
  let width = 0;
  let amount = 0;
  for (let r = 0; r < rowLen; r++) {
    for (let c = 0; c < colLen; c++) {
      if (input[r][c] == "1" && !v[r][c]) {
        amount++;
        width = Math.max(width, bfs(r, c));
      }
    }
  }
  return [amount, width].join("\n");
};

console.log(solution());
