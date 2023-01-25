// let input = `9 7
// 3 4 2
// 1 1 1 1 1 1 1
// 1 0 1 0 1 0 1
// 1 0 0 0 0 0 1
// 1 0 0 0 0 0 1
// 1 0 0 1 1 0 1
// 1 0 0 0 1 0 1
// 1 1 0 1 1 1 1
// 1 0 0 0 0 0 1
// 1 1 1 1 1 1 1`.split("\n");

let fs = require("fs");
let input = fs.readFileSync("/dev/stdin").toString().trim().split("\n");
const [R, C] = input[0].split(" ").map(Number);
const robot = input[1].split(" ").map(Number);

const board = Array.from({ length: R }, () =>
  Array.from({ length: C }, () => 0)
);

const isValid = (r, c) => {
  if (r < 0 || r >= R || c < 0 || c >= C) return false;
  return true;
};

for (let i = 2; i < input.length; i++) {
  let items = input[i].split(" ").map(Number);
  for (let j = 0; j < C; j++) {
    board[i - 2][j] = items[j];
  }
}
const visited = Array.from({ length: R }, () =>
  Array.from({ length: C }, () => 0)
);

const changeDirc = (num) => {
  return num > -1 ? num : 4 + num;
};

// d 0 북 1 동 2 남 3 서
let dirs = [
  [-1, 0],
  [0, 1],
  [1, 0],
  [0, -1],
];

let cnt = 0;
let queue = [robot];

while (queue.length) {
  let [r, c, d] = queue.shift();

  if (!visited[r][c]) {
    cnt++;
    visited[r][c] = 1;
  }

  for (let i = 0; i < 4; i++) {
    d = changeDirc(--d);
    const nr = r + dirs[d][0];
    const nc = c + dirs[d][1];
    if (isValid(nr, nc) && !visited[nr][nc] && board[nr][nc] !== 1) {
      queue.push([nr, nc, d]);
      break;
    }
    if (i === 3) {
      //i가 3인데 브레이크가 안 걸렸다? 전부다 청소가 되어 있거나 벽인 경우다.
      let back = changeDirc(d - 2);

      const br = r + dirs[back][0];
      const bc = c + dirs[back][1];

      if (isValid(nr, nc) && !board[br][bc]) {
        queue.push([br, bc, d]);
      }
    }
  }
}
console.log(cnt);
