const fs = require("fs");
// let input = fs.readFileSync("/dev/stdin").toString().split("\n");

let input = `1 0 3
4 2 5
7 8 6`.split("\n");

const dirs = [
  [0, 1],
  [1, 0],
  [-1, 0],
  [0, -1],
];

const swap = (string, i, j) => {
  const arr = string.split("");
  [arr[i], arr[j]] = [arr[j], arr[i]];
  return arr.join("");
};

const isValid = (r, c) => {
  if (r < 0 || c < 0 || r >= 3 || c >= 3) return false;
  return true;
};
const arrToString = (board) => {
  let string = "";
  board.forEach((rowInfo) => (string += rowInfo.join("")));
  return string;
};

function solution() {
  let correct = "123456780";
  const board = [];

  let pos = [];

  input.forEach((rowInfo, r) => {
    const rowArr = rowInfo.split(" ");
    board.push(rowArr);
    rowArr.forEach((info, c) => {
      if (info === "0") pos = [r, c];
    });
  });
  let str = arrToString(board);
  if (str == correct) return 0;

  // let v = new Set(); //방문체크
  // v.add(str);
  let v = {};
  v[str] = 0;

  const q = [[...pos, 0, str]]; // [r,c,cnt,board 상태]
  while (q.length) {
    const [r, c, cnt, string] = q.shift();
    if (string === correct) return cnt;

    for (const d of dirs) {
      const nr = r + d[0];
      const nc = c + d[1];
      if (isValid(nr, nc)) {
        const preIdx = r * 3 + c;
        const nextIdx = nr * 3 + nc;
        const newString = swap(string, preIdx, nextIdx);

        if (v[newString] == undefined) {
          v[newString] = 0;
          q.push([nr, nc, cnt + 1, newString]);
        }
      }
    }
  }
  return -1;
}

console.log(solution());
