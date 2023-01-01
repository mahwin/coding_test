let allRemoved = 1;
let allCard = {};
let minCnt = Infinity;
let dirs = [
  [0, 1],
  [0, -1],
  [1, 0],
  [-1, 0],
];

function solution(board, r, c) {
  for (let i = 0; i < 4; i++) {
    for (let j = 0; j < 4; j++) {
      const num = board[i][j];
      if (num) {
        allRemoved |= 1 << num;
        allCard[num] = allCard[num]
          ? [...allCard[num], [i, j, 0]] // row, col ,이동 횟수
          : [[i, j, 0]];
      }
    }
  }
  const bfs = (removed, src, dst) => {
    const visited = Array.from({ length: 4 }, () =>
      Array.from({ length: 4 }, () => false)
    );
    const queue = [src];
    while (queue.length) {
      curr = queue.shift();
      if (curr[0] === dst[0] && curr[1] === dst[1]) return curr[2];

      for (const dir of dirs) {
        let nr = curr[0] + dir[0];
        let nc = curr[1] + dir[1];

        if (nr < 0 || nr > 3 || nc < 0 || nc > 3) continue;
        if (!visited[nr][nc]) {
          visited[nr][nc] = true;
          queue.push([nr, nc, curr[2] + 1]);
        }
        for (j = 0; j < 2; j++) {
          if (removed & (1 << board[nr][nc] === 0)) break;
          if (
            nr + dir[0] < 0 ||
            nr + dir[0] > 3 ||
            nc + dir[1] < 0 ||
            nc + dir[1] > 3
          )
            break;
          nr += dir[0];
          nc += dir[1];
        }
        if (!visited[nr][nc]) {
          visited[nr][nc] = true;
          queue.push([nr, nc, curr[2] + 1]);
        }
      }
    }
  };

  const permutate = (cnt, removed, src) => {
    if (removed === allRemoved) {
      minCnt = Math.min(minCnt, cnt);
      return;
    }

    for (const [num, card] of Object.entries(allCard)) {
      if (removed & (1 << num)) continue;

      one = bfs(removed, src, card[0]) + bfs(removed, card[0], card[1]) + 2;
      two = bfs(removed, src, card[1]) + bfs(removed, card[1], card[0]) + 2;
      permutate(cnt + one, removed | (1 << num), card[1]);
      permutate(cnt + two, removed | (1 << num), card[0]);
    }
  };

  permutate(0, 1, [r, c, 0]);

  console.log(minCnt);
  return minCnt;
}

solution(
  [
    [1, 0, 0, 3],
    [2, 0, 0, 0],
    [0, 0, 0, 2],
    [3, 0, 1, 0],
  ],
  1,
  0
);
