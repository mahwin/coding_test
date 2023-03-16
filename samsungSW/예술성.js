let n;
let board;
let copy;
let result = 0;

const dirs = [
  [0, 1],
  [1, 0],
  [-1, 0],
  [0, -1],
];

const getCombis = (arr, pick) => {
  if (pick === 1) return arr.map((el) => [el]);
  const result = [];
  arr.forEach((fixed, index) => {
    const tmp = getCombis(arr.slice(index + 1), pick - 1);
    tmp.map((el) => result.push([fixed, ...el]));
  });
  return result;
};

function isValid(r, c) {
  if (r < 0 || c < 0 || r >= n || c >= n) return false;
  return true;
}

function bfs(row, col, v) {
  const root = [[row, col]];

  v[row][col] = true;
  const target = board[row][col];
  const queue = [[row, col]];

  while (queue.length) {
    const [r, c] = queue.shift();

    for (let d of dirs) {
      const nr = r + d[0];
      const nc = c + d[1];
      if (isValid(nr, nc) && !v[nr][nc] && board[nr][nc] === target) {
        v[nr][nc] = true;
        root.push([nr, nc]);
        queue.push([nr, nc]);
      }
    }
  }
  return root;
}

function isMeet(arr1, arr2) {
  let result = 0;
  let setOne = new Set();
  arr1.forEach((el) => setOne.add(el.join(",")));

  arr2.forEach((el) => {
    const [r, c] = el;
    for (let d of dirs) {
      const nr = r + d[0];
      const nc = c + d[1];
      const key = [nr, nc].join(",");
      if (setOne.has(key)) result++;
    }
  });
  return result;
}

function solution() {
  const obj = {};
  const v = Array.from({ length: n }, () =>
    Array.from({ length: n }, () => false)
  );
  let group = 0;
  for (let r = 0; r < n; r++) {
    for (let c = 0; c < n; c++) {
      if (v[r][c]) continue;
      let key = group;
      const arr = bfs(r, c, v);
      obj[key] = arr;
      group++;
    }
  }

  const totalKeys = Object.keys(obj);
  const keyLen = totalKeys.length;
  const combis = getCombis(
    Array.from({ length: keyLen }, (_, i) => i),
    2
  );

  for (const com of combis) {
    const [one, two] = com;
    const keyOne = totalKeys[one];
    const keyTwo = totalKeys[two];
    const arr = obj[keyOne];
    const arr2 = obj[keyTwo];
    const num = isMeet(arr, arr2);
    if (!num) continue;

    const val =
      (arr.length + arr2.length) *
      board[arr[0][0]][arr[0][1]] *
      board[arr2[0][0]][arr2[0][1]] *
      num;
    result += val;
  }
}
function sqare_rotate(sr, sc, sq_length) {
  for (let r = sr; r < sr + sq_length; r++) {
    for (let c = sc; c < sc + sq_length; c++) {
      const [or, oc] = [r - sr, c - sc];
      const [rr, rc] = [oc, sq_length - or - 1];

      copy[sr + rr][sc + rc] = board[r][c];
    }
  }
}
function rotate(board) {
  const n = board.length;
  copy = Array.from({ length: n }, () => Array.from({ length: n }, () => 0));

  const sq_length = Math.floor(n / 2);

  for (let r = 0; r < n; r++) {
    copy[sq_length][r] = board[r][sq_length];
  }

  for (let c = 0; c < n; c++) {
    copy[n - c - 1][sq_length] = board[sq_length][c];
  }

  sqare_rotate(0, 0, sq_length);
  sqare_rotate(sq_length + 1, 0, sq_length);
  sqare_rotate(0, sq_length + 1, sq_length);
  sqare_rotate(sq_length + 1, sq_length + 1, sq_length);

  for (let r = 0; r < n; r++) {
    for (let c = 0; c < n; c++) {
      board[r][c] = copy[r][c];
    }
  }
}

// console.log(board);
// const readline = require("readline");

// const rl = readline.createInterface({
//   input: process.stdin,
//   output: process.stdout,
// });

// let input = [];

// rl.on("line", (line) => {
//   input.push(line);
// });

// rl.on("close", () => {
//   n = Number(input[0]);
//   board = [];

//   for (let i = 1; i <= n; i++) {
//     board.push(input[i].split(" ").map(Number));
//   }

//   for (let trial = 0; trial < 4; trial++) {
//     board = trial === 0 ? board : rotate(board);
//     solution(board);
//   }

//   console.log(result);
//   process.exit();
// });

board = [
  [1, 2, 3, 4, 5],
  [6, 7, 8, 9, 10],
  [11, 12, 13, 14, 15],
  [16, 17, 18, 19, 20],
  [21, 22, 23, 24, 25],
];

rotate(board);

console.log(board);
