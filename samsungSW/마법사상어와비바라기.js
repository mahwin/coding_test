// ←, ↖, ↑, ↗, →, ↘, ↓, ↙

const dirs = [
  null,
  [0, -1],
  [-1, -1],
  [-1, 0],
  [-1, 1],
  [0, 1],
  [1, 1],
  [1, 0],
  [1, -1],
];

let input = `5 8
100 100 100 100 100
100 100 100 100 100
100 100 100 100 100
100 100 100 100 100
100 100 100 100 100
8 1
7 1
6 1
5 1
4 1
3 1
2 1
1 1`.split("\n");

const [n, m] = input[0].split(" ").map(Number);
const board = [];

for (let i = 1; i <= n; i++) {
  board.push(input[i].split(" ").map(Number));
}

const cntAmount = () => {
  let amount = 0;
  board.forEach((rowInfo) => {
    rowInfo.forEach((el) => {
      amount += el;
    });
  });

  return amount;
};

const isValid = (r, c) => {
  if (r < 0 || c < 0 || r >= n || c >= n) return false;
  return true;
};

const findCloud = (clouds) => {
  const newClouds = [];
  const cloudBoard = Array.from({ length: n }, () =>
    Array.from({ length: n }, () => false)
  );
  clouds.forEach(([row, col]) => (cloudBoard[row][col] = true));

  board.forEach((rowInfo, row) => {
    rowInfo.forEach((colElement, col) => {
      if (!cloudBoard[row][col] && colElement >= 2) {
        board[row][col] -= 2;
        newClouds.push([row, col]);
      }
    });
  });
  return newClouds;
};

const moveAndDrop = (clouds, moveInfo) => {
  const [d, degree] = moveInfo;
  const tmp = [];
  clouds.forEach(([row, col]) => {
    let nr = degree * dirs[d][0] + row;
    let nc = degree * dirs[d][1] + col;
    if (nr >= 0) nr = nr % n;
    else if (nr % n === 0) nr = 0;
    else nr = n - (-nr % n);
    if (nc >= 0) nc = nc % n;
    else if (nc % n === 0) nc = 0;
    else nc = n - (-nc % n);

    board[nr][nc]++;
    tmp.push([nr, nc]);
  });
  return tmp;
};

const diagonalDirs = [
  [1, 1],
  [-1, -1],
  [1, -1],
  [-1, 1],
];

const diagonalCheck = (clouds) => {
  clouds.forEach(([row, col]) => {
    for (const d of diagonalDirs) {
      const nr = d[0] + row;
      const nc = d[1] + col;
      if (isValid(nr, nc) && board[nr][nc] > 0) {
        board[row][col]++;
      }
    }
  });
};

//초기 구름 값
let clouds = [
  [n - 1, 0],
  [n - 1, 1],
  [n - 2, 0],
  [n - 2, 1],
];

for (let j = n + 1; j < n + m + 1; j++) {
  const moveInfo = input[j].split(" ").map(Number);
  clouds = moveAndDrop(clouds, moveInfo);
  diagonalCheck(clouds);
  clouds = findCloud(clouds);
}
console.log(cntAmount());
