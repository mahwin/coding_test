let input = `4 10 50
10 100 20 90
80 100 60 70
70 20 30 40
50 20 100 10`.split("\n");

const [N, L, R] = input.shift().split(" ").map(Number);
const board = input.map((el) => el.split(" ").map(Number));

let visited;
let trials = 0;
const dirs = [
  [0, 1],
  [1, 0],
  [-1, 0],
  [0, -1],
];

const isValid = (row, col) => {
  if (row < 0 || col < 0 || row >= N || col >= N) return false;
  return true;
};

const bfs = (visited, row, col) => {
  let queue = [[row, col]];
  let setArr = new Set();
  while (queue.length) {
    const [r, c] = queue.shift();
    for (let dir of dirs) {
      const nr = r + dir[0];
      const nc = c + dir[1];

      if (isValid(nr, nc) && !visited[nr][nc]) {
        const diff = Math.abs(board[nr][nc] - board[r][c]);

        if (diff <= R && diff >= L) {
          queue.push([nr, nc]);
          visited[r][c] = true;
          visited[nr][nc] = true;
          setArr.add([r, c].join(","));
          setArr.add([nr, nc].join(","));
        }
      }
    }
  }

  if (setArr.size === 0) return false;
  let arr = [...setArr].map((el) => el.split(",").map(Number));
  const sum = arr.reduce((pre, cur) => (pre += board[cur[0]][cur[1]]), 0);

  let divider = Math.floor(sum / arr.length);
  arr.forEach((el) => {
    board[el[0]][el[1]] = divider;
  });

  return true;
};

while (true) {
  visited = Array.from({ length: N }, () =>
    Array.from({ length: N }, () => false)
  );
  let flag = false;
  for (let i = 0; i < N; i++) {
    for (let j = 0; j < N; j++) {
      if (visited[i][j]) continue;
      visited[i][j] = true;
      if (bfs(visited, i, j)) flag = true;
    }
  }
  if (!flag) {
    console.log(trials);
    break;
  }
  trials++;
}
