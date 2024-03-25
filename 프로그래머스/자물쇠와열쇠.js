// 배열을 90도로 회전
function rotate(board) {
  const rowLen = board.length;
  const colLen = board[0].length;

  const copy = Array.from({ length: colLen }, () =>
    Array.from({ length: rowLen }, () => 0)
  );
  for (let r = 0; r < colLen; r++) {
    for (let c = 0; c < rowLen; c++) {
      copy[r][c] = board[rowLen - c - 1][r];
    }
  }
  return copy;
}

function fillBoard(board, key, r, c) {
  const M = key.length;
  for (let i = 0; i < M; i++) {
    for (let j = 0; j < M; j++) {
      board[r + i][c + j] = key[i][j];
    }
  }
}

function cleanBoard(board, key, r, c) {
  const M = key.length;
  for (let i = 0; i < M; i++) {
    for (let j = 0; j < M; j++) {
      board[r + i][c + j] = 0;
    }
  }
}

function check(key, lock) {
  const M = key.length;
  const N = lock.length;
  const board = Array.from({ length: 2 * M + N }, () =>
    Array.from({ length: 2 * M + N }, () => 0)
  );

  for (let r = 0; r < N + M; r++) {
    for (let c = 0; c < N + M; c++) {
      fillBoard(board, key, r, c);

      let isMatch = true;
      for (let i = M; i < M + N; i++) {
        for (let j = M; j < M + N; j++) {
          if (board[i][j] === lock[i - M][j - M]) {
            isMatch = false;
            break;
          }
        }
      }
      if (isMatch) return true;
      cleanBoard(board, key, r, c);
    }
  }
  return false;
}

function solution(key, lock) {
  for (let i = 0; i < 4; i++) {
    if (check(key, lock)) return true;
    key = rotate(key);
  }
  return false;
}
