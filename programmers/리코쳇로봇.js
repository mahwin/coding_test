let rowLen, colLen;
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

const find = (board, target) => {
  for (let r = 0; r < rowLen; r++) {
    for (let c = 0; c < colLen; c++) {
      if (board[r][c] == target) return [r, c];
    }
  }
};

function solution(board) {
  rowLen = board.length;
  colLen = board[0].length;
  const v = Array.from({ length: rowLen }, () =>
    Array.from({ length: colLen }, () => false)
  );
  let pos = find(board, "R");
  const target = find(board, "G");
  const queue = [[...pos, 0]]; //r위치 c위치 이동횟수
  while (queue.length) {
    const [r, c, cnt] = queue.shift();

    if (r === target[0] && c === target[1]) return cnt;

    for (const d of dirs) {
      let nr = d[0] + r;
      let nc = d[1] + c;
      while (isValid(nr, nc) && board[nr][nc] !== "D") {
        nr += d[0];
        nc += d[1];
      }
      nr -= d[0];
      nc -= d[1];

      if (r === nr && c === nc) continue;
      else if (!v[nr][nc]) {
        v[nr][nc] = true;
        queue.push([nr, nc, cnt + 1]);
      }
    }
  }
  return -1;
}
