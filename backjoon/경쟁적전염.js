const fs = require("fs");
// let input = fs.readFileSync("/dev/stdin").toString().trim().split("\n");

let input = `3 3
1 0 2
0 0 0
3 0 0
2 3 2`.split("\n");

const convert = (arr) => arr.split(" ").map(Number);

const solution = () => {
  const [n, k] = convert(input.shift());
  const [s, x, y] = input
    .pop()
    .split(" ")
    .map((el) => Number(el) - 1);
  const board = input.map((el) => el.split(" "));

  const virusPosObj = {};
  board.forEach((rowInfo, r) => {
    rowInfo.forEach((el, c) => {
      if (el !== 0) {
        if (virusPosObj[el]) {
          virusPosObj[el].push([r, c]);
        } else {
          virusPosObj[el] = [[r, c]];
        }
      }
    });
  });

  const dirs = [
    [0, 1],
    [1, 0],
    [-1, 0],
    [0, -1],
  ];

  for (let i = 0; i <= s; i++) {
    const keys = Object.keys(virusPosObj).sort((a, b) => Number(a) - Number(b));
    for (const key of keys) {
      const newPos = [];
      for (const pos of virusPosObj[key]) {
        const [r, c] = pos;
        for (const d of dirs) {
          const nr = d[0] + r;
          const nc = d[1] + c;
          if (nr < 0 || nc < 0 || nr >= n || nc >= n || board[nr][nc] != "0")
            continue;

          board[nr][nc] = key;
          newPos.push([nr, nc]);
        }
      }
      virusPosObj[key] = newPos;
    }

    if (board[x][y] != "0") return board[x][y];
  }

  return board[x][y];
};

console.log(solution());
