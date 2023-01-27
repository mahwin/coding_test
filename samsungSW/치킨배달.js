let input = `5 3
0 0 1 0 0
0 0 2 0 1
0 1 2 0 0
0 0 1 0 0
0 0 0 0 2`.split("\n");

const [N, M] = input.shift().split(" ").map(Number);
const colLength = input[0].split(" ").length;
const chickenPos = [];
const housePos = [];

const chickenBoard = Array.from({ length: N }, () =>
  Array.from({ length: colLength }, () => 0)
);

for (let i = 0; i < N; i++) {
  let curRow = input[i].split(" ").map(Number);
  for (let j = 0; j < colLength; j++) {
    let cur = curRow[j];

    if (!cur) continue;
    if (cur === 1) housePos.push([i, j]);
    else chickenPos.push([i, j]);
  }
}

const dirs = [
  [0, 1],
  [1, 0],
  [-1, 0],
  [0, -1],
];

const isValid = (r, c) => {
  if (r < 0 || r >= N || c < 0 || c >= colLength) return false;
  return true;
};

const findChicken = (row, col, chickenBoard, isAlive) => {
  let queue = [[row, col, 0]];
  while (queue.length) {
    const [r, c, cnt] = queue.shift();

    if (chickenBoard[r][c]) return cnt;

    for (const dir of dirs) {
      const nr = r + dir[0];
      const nc = c + dir[1];
      if (isValid(nr, nc)) {
        queue.push([nr, nc, cnt + 1]);
      }
    }
  }
};

const getCombination = (arr, pick) => {
  if (pick === 1) return arr.map((el) => [el]);
  const result = [];
  arr.forEach((fixed, index) => {
    const tmp = getCombination(arr.slice(index), pick - 1);
    tmp.forEach((el) => result.push([fixed, ...el]));
  });
  return result;
};

let arr = Array.from({ length: chickenPos.length }, (_, i) => i);

const combis = getCombination(arr, M);
