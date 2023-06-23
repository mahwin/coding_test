const len = 10;

const board = Array.from({ length: len }, () =>
  Array.from({ length: len }, () => "*")
);

[r, c] = [len, len - 2];

const isValid = (r, c) => {
  if (r < 0 || c < 0 || r >= len || c >= len) return false;
  return true;
};

const a = [0, 1, 2, 3, 4, 5, 6, 7];
const v = Array.from({ length: len }, () =>
  Array.from({ length: len }, () => false)
);
for (let i = 0; i < 10; i++) {
  v[5][i] = true;
}
let isUp = true;

const fillBoard = () => {
  let nr, nc;
  let i = 0;
  let fillcnt = 0;

  while (fillcnt !== 8) {
    if (isUp) {
      if (i % 2 == 0) {
        [nr, nc] = [r - 1, c + 1];
      } else {
        [nr, nc] = [r, c - 1];
      }
      if (isValid(nr, nc)) {
        [r, c] = [nr, nc];
        if (v[nr][nc]) {
          i++;
          continue;
        }
        board[r][c] = a[fillcnt];
        fillcnt++;
        i++;
      } else {
        isUp = false;
        [r, c] = [r - 1, c - 2];
      }
    } else {
      if (i % 2 == 0) {
        [nr, nc] = [r + 1, c + 1];
      } else {
        [nr, nc] = [r, c - 1];
      }

      if (isValid(nr, nc)) {
        [r, c] = [nr, nc];
        if (v[nr][nc]) {
          i++;
          continue;
        }
        board[r][c] = a[fillcnt];
        fillcnt++;
        i++;
      } else {
        isUp = true;
        [r, c] = [r + 1, c - 2];
      }
    }
  }
};

fillBoard();
fillBoard();
fillBoard();
fillBoard();
fillBoard();
fillBoard();
fillBoard();
fillBoard();

board.forEach((rowInfo) => console.log(rowInfo.join("")));
