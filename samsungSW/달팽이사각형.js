const n = 10;
const board = Array.from({ length: n }, () =>
  Array.from({ length: n }, () => 0)
);

let [x, y, num, limit] = [0, 0, 1, n];

for (let i = 0; i < 2 * n - 1; i++) {
  switch (i % 4) {
    case 0: //밑
      for (let j = 0; j < limit; j++) {
        board[y][x] = num;
        num++;
        x++;
      }
      x--;
      y++;
      limit--;
      break;
    case 1: // 오른
      for (let j = 0; j < limit; j++) {
        board[y][x] = num;
        num++;
        y++;
      }
      x--;
      y--;
      break;
    case 2: //위
      for (let j = 0; j < limit; j++) {
        board[y][x] = num;
        num++;
        x--;
      }
      x++;
      y--;
      limit--;
      break;
    case 3: //왼
      for (let j = 0; j < limit; j++) {
        console.log(y, x);
        board[y][x] = num;
        num++;
        y--;
      }
      x++;
      y++;
      break;
  }
}

console.log(board);
