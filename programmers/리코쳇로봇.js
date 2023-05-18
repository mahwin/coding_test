const dirs = [
  //이동할 방향.
  [0, 1],
  [1, 0],
  [-1, 0],
  [0, -1],
];
let rowLen, colLen;

const isValid = (r, c) => {
  //경계 검증
  if (r >= rowLen || c >= colLen || r < 0 || c < 0) return false;
  return true;
};

const findRobot = (board) => {
  for (let r = 0; r < rowLen; r++) {
    for (let c = 0; c < colLen; c++) {
      if (board[r][c] === "R") return [r, c];
    }
  }
};

function solution(board) {
  // board에서 .은 빈 공간 R은 로봇 D는 장애물 G는 가야할 곳.
  rowLen = board.length;
  colLen = board[0].length;
  //방문 체크
  const v = Array.from({ length: rowLen }, () =>
    Array.from({ length: colLen }, () => false)
  );

  const [initR, initC] = findRobot(board); // 시작 위치의 r,c 값

  v[initR][initC] = true;

  const q = [[initR, initC, 0]]; //[r,c,이동 횟수];
  while (q.length) {
    const [r, c, cnt] = q.shift();

    for (const d of dirs) {
      let nr = r + d[0];
      let nc = c + d[1];
      while (true) {
        if (isValid(nr, nc) && board[nr][nc] !== "D") {
          nr += d[0];
          nc += d[1];
        } else break;
      }
      // 이동할 수 없는 곳까지 가서 체크했기에 갔던 방향 반대로 이동하면 미끄러져 이동할 수 있는 마지막 위치.
      const curR = nr - d[0];
      const curC = nc - d[1];

      if (board[curR][curC] === "G") return cnt + 1; // 미끄러져 도착한 지점이

      if (!v[curR][curC]) {
        v[curR][curC] = true;
        q.push([curR, curC, cnt + 1]);
      }
    }
  }
  return -1;
}

console.log(solution(["...D..R", ".D.G...", "....D.D", "D....D.", "..D...."]));
// console.log(solution([".D.R", "....", ".G..", "...D"]));
