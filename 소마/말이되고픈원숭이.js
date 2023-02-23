let input = `1
4 4
0 0 0 0
1 0 0 0
0 0 1 0
0 1 0 0`.split("\n");
const jump = Number(input.shift());
const [colLen, rowLen] = input.shift().split(" ").map(Number);
const board = [];

for (let i = 0; i < rowLen; i++) {
  board.push(input[i].split(" ").map(Number));
}

const isValid = (r, c) => {
  if (r < 0 || c < 0 || r >= rowLen || c >= colLen) return false;
  return true;
};
const jumpDir = [
  [1, 2],
  [2, 1],
  [-1, 2],
  [-2, 1],
  [1, -2],
  [2, -1],
  [-1, -2],
  [-2, -1],
];
const dirs = [
  [1, 0],
  [0, 1],
  [-1, 0],
  [0, -1],
];
const visited = Array.from({ length: 31 }, () =>
  Array.from({ length: rowLen }, () =>
    Array.from({ length: colLen }, () => Infinity)
  )
);
const bfs = (queue) => {
  while (queue.length) {
    const [r, c, cnt, Jcnt] = queue.shift();
    if (r === rowLen - 1 && c === colLen - 1) return cnt;

    for (const d of dirs) {
      const nr = r + d[0];
      const nc = c + d[1];

      if (
        isValid(nr, nc) &&
        !board[nr][nc] &&
        visited[Jcnt][nr][nc] > cnt + 1
      ) {
        visited[Jcnt][nr][nc] = cnt + 1;
        queue.push([nr, nc, cnt + 1, Jcnt]);
      }
    }
    if (Jcnt < jump) {
      for (const d of jumpDir) {
        const nr = r + d[0];
        const nc = c + d[1];
        if (
          isValid(nr, nc) &&
          !board[nr][nc] &&
          visited[Jcnt + 1][nr][nc] > cnt + 1
        ) {
          visited[Jcnt + 1][nr][nc] = cnt + 1;
          queue.push([nr, nc, cnt + 1, Jcnt + 1]);
        }
      }
    }
  }
  return -1;
};
visited[0][0][0] = 0;
const queue = [[0, 0, 0, 0]]; // r,c,cnt,점프 cnt
console.log(bfs(queue));
