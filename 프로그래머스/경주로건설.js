// 동 0 서 1 남 2 북 3
const dirs = [
  [0, 1],
  [0, -1],
  [1, 0],
  [-1, 0],
];

function isDirect(d1, d2) {
  // 둘다 동 서거나 둘다 남북이면 true
  if (dirs[d1][0] === dirs[d2][0]) return true;
  if (dirs[d1][1] === dirs[d2][1]) return true;

  return false;
}

function isValid(r, c, board) {
  if (
    r < 0 ||
    c < 0 ||
    r >= board.length ||
    c >= board[0].length ||
    board[r][c] === 1
  )
    return false;
  return true;
}

function solution(board) {
  const length = board.length;

  const cost = Array.from({ length: 4 }, () =>
    Array.from({ length }, () => Array.from({ length }, () => Infinity))
  );

  const q = [
    [0, 0, 0],
    [0, 0, 2],
  ]; // 시작 지점

  cost[0][0][0] = 0;
  cost[2][0][0] = 0;
  let cnt = 0;
  while (q.length) {
    const [r, c, prevD] = q.shift();

    for (let d = 0; d < 4; d++) {
      const nr = r + dirs[d][0];
      const nc = c + dirs[d][1];
      if (!isValid(nr, nc, board)) continue;
      const addCost = isDirect(prevD, d) ? 100 : 600;
      if (cost[d][nr][nc] > cost[prevD][r][c] + addCost) {
        cost[d][nr][nc] = cost[prevD][r][c] + addCost;
        q.push([nr, nc, d]);
      }
    }
  }

  return Math.min(
    cost[0][length - 1][length - 1],
    cost[1][length - 1][length - 1],
    cost[2][length - 1][length - 1],
    cost[3][length - 1][length - 1]
  );
}
