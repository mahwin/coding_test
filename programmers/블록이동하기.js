const isValid = (r, c, n) => {
  if (r < 0 || c < 0 || r >= n || c >= n) return false;
  return true;
};

const pushInfo = (r1, c1, r2, c2, cnt, v, queue) => {
  v[r1][c1][r2][c2] = cnt + 1;
  v[r2][c2][r1][c1] = cnt + 1;
  queue.push([r1, c1, r2, c2, cnt + 1]);
};

function solution(board) {
  const n = board.length;
  // 로봇이 2X1의 크기라서 row,col row,col을 기준으로 계산.
  const v = Array.from({ length: n }, () =>
    Array.from({ length: n }, () =>
      Array.from({ length: n }, () => Array.from({ length: n }, () => Infinity))
    )
  );
  v[0][0][0][1] = 0;
  v[0][1][0][0] = 0;
  const queue = [[0, 0, 0, 1, 0]]; // [0,0],[0,1] 좌표에서 시작하고 이동 횟수는 0
  while (queue.length) {
    const [r1, c1, r2, c2, cnt] = queue.shift();
    console.log(r1, c1, r2, c2, cnt);
    if ((r1 == n - 1 && c1 == n - 1) || (r2 == n - 1 && c2 == n - 1))
      return cnt;
    if (r1 == r2) {
      // 가로 배치
      const minC = Math.min(c1, c2);
      const maxC = Math.max(c1, c2);
      // 왼쪽으로 이동할 때 경계 안이고, 같은 형태로 방문한 적이 없으면
      if (
        isValid(r1, minC - 1, n) &&
        board[r1][minC - 1] == 0 &&
        v[r1][minC - 1][r1][maxC - 1] > cnt + 1
      ) {
        pushInfo(r1, minC - 1, r1, maxC - 1, cnt, v, queue);
      }
      // 오른쪽으로 이동할 때 경계 안이고, 같은 형태로 온적이 없으면
      if (
        isValid(r1, maxC + 1, n) &&
        board[r1][maxC + 1] == 0 &&
        v[r1][minC + 1][r1][maxC + 1] > cnt + 1
      ) {
        pushInfo(r1, minC + 1, r1, maxC + 1, cnt, v, queue);
      }

      // 밑에 두칸이 비어있으면 회전해서 이동 가능, 평행하게 이동도 가능
      if (
        isValid(r1 + 1, c1, n) &&
        board[r1 + 1][c1] == 0 &&
        board[r1 + 1][c2] == 0
      ) {
        if (v[r1 + 1][c1][r1 + 1][c2] > cnt + 1) {
          pushInfo(r1 + 1, c1, r1 + 1, c2, cnt, v, queue);
        }
        if (v[r1 + 1][minC][r1 + 1][minC] > cnt + 1) {
          pushInfo(r1, minC, r1 + 1, minC, cnt, v, queue);
        }
        if (v[r1 + 1][maxC][r1 + 1][maxC] > cnt + 1) {
          pushInfo(r1, maxC, r1 + 1, maxC, cnt, v, queue);
        }
      }
      //위에 두칸이 비었다면
      if (
        isValid(r1 - 1, c1, n) &&
        board[r1 - 1][c1] == 0 &&
        board[r1 - 1][c2] == 0
      ) {
        if (v[r1 - 1][c1][r1 - 1][c2] > cnt + 1) {
          pushInfo(r1 - 1, c1, r1 - 1, c2, cnt, v, queue);
        }
        if (v[r1][minC][r1 - 1][minC] > cnt + 1) {
          pushInfo(r1, minC, r1 - 1, minC, cnt, v, queue);
        }
        if (v[r1][maxC][r1 - 1][maxC] > cnt + 1) {
          pushInfo(r1, maxC, r1 - 1, maxC, cnt, v, queue);
        }
      }
    } else {
      //세로 배치
      const minR = Math.min(r1, r2);
      const maxR = Math.max(r1, r2);
      // 위로 이동할 수 있는지 확인
      if (
        isValid(minR - 1, c1, n) &&
        board[minR - 1][c1] == 0 &&
        v[minR - 1][c1][maxR - 1][c1] > cnt + 1
      ) {
        pushInfo(minR - 1, c1, maxR - 1, c2, cnt, v, queue);
      }
      // 아래로 이동할 수 있는지 확인
      if (
        isValid(maxR + 1, c1, n) &&
        board[maxR + 1][c1] == 0 &&
        v[maxR + 1][c1][minR + 1][c1] > cnt + 1
      ) {
        pushInfo(minR + 1, c1, maxR + 1, c2, cnt, v, queue);
      }
      // 왼쪽으로 회전해서 이동가능한지 확인
      if (
        isValid(r1, c1 - 1, n) &&
        board[r1][c1 - 1] == 0 &&
        board[r2][c2 - 1] == 0
      ) {
        if (v[r1][c1 - 1][r2][c1 - 1] > cnt + 1) {
          pushInfo(r1, c1 - 1, r2, c1 - 1, cnt, v, queue);
        }
        if (v[minR][c1][minR][c1 - 1] > cnt + 1) {
          pushInfo(minR, c1, minR, c1 - 1, cnt, v, queue);
        }
        if (v[maxR][c1][maxR][c1 - 1] > cnt + 1) {
          pushInfo(maxR, c1, maxR, c1 - 1, cnt, v, queue);
        }
      }
      if (
        isValid(r1, c1 + 1, n) &&
        board[r1][c1 + 1] == 0 &&
        board[r2][c2 + 1] == 0
      ) {
        if (v[r1][c1 + 1][r2][c1 + 1] > cnt + 1) {
          pushInfo(r1, c1 + 1, r2, c1 + 1, cnt, v, queue);
        }
        if (v[minR][c1][minR][c1 + 1] > cnt + 1) {
          pushInfo(minR, c1, minR, c1 + 1, cnt, v, queue);
        }
        if (v[maxR][c1][maxR][c1 + 1] > cnt + 1) {
          pushInfo(maxR, c1, maxR, c1 + 1, cnt, v, queue);
        }
      }
    }
  }
}

console.log(
  solution([
    [0, 0, 0, 0, 0, 0, 1],
    [1, 1, 1, 1, 0, 0, 1],
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 1, 1, 1, 1, 0],
    [0, 1, 1, 1, 1, 1, 0],
    [0, 0, 0, 0, 0, 1, 1],
    [0, 0, 1, 0, 0, 0, 0],
  ])
);
