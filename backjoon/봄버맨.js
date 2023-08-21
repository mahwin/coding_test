// const fs = require("fs");
// let input = fs.readFileSync("/dev/stdin").toString().split("\n");

let input = `6 7 5
.......
...O...
....O..
.......
OO.....
OO.....`.split("\n");

let rowLen, colLen, time;
const dirs = [
  [0, 1],
  [1, 0],
  [-1, 0],
  [0, -1],
];

const isValid = (r, c) => {
  if (r < 0 || c < 0 || r >= rowLen || c >= colLen) return false;
  return true;
};

const boom = (arr) => {
  arr.forEach(([r, c]) => {
    input[r][c] = ".";
    for (const d of dirs) {
      const nr = r + d[0];
      const nc = c + d[1];
      if (isValid(nr, nc)) {
        input[nr][nc] = ".";
      }
    }
  });
};

const putBoom = () => {
  input.forEach((rowInfo, r) =>
    rowInfo.forEach((el, c) => {
      if (el === ".") input[r][c] = 0;
    })
  );
};

const passOneSec = () => {
  let result = [];
  for (let r = 0; r < rowLen; r++) {
    for (let c = 0; c < colLen; c++) {
      if (input[r][c] == 0 || input[r][c] == "O") input[r][c] = 1;
      else if (input[r][c] === 1) {
        input[r][c]++;
      } else if (input[r][c] === 2) {
        result.push([r, c]);
      }
    }
  }
  return result;
};

const printf = (input) => {
  input.forEach((rowInfo, r) => {
    rowInfo.forEach((cell, c) => {
      if (input[r][c] !== ".") input[r][c] = "O";
    });
  });
  input.forEach((rowInfo) => console.log(rowInfo.join("")));
};

const solution = () => {
  [rowLen, colLen, time] = input.shift().split(" ").map(Number);
  input = input.map((el) => el.split(""));

  //시작 1초
  passOneSec(input);

  for (let t = 1; t < time; t++) {
    const canBoom = passOneSec();
    putBoom();
    boom(canBoom);
  }
  printf(input);
};

solution();
