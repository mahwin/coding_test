let input = `5 5 1
1 4 10 3 1`.split("\n");

// let fs = require("fs");
// let input = fs.readFileSync("/dev/stdin").toString().trim().split("\n");

function sol(input) {
  const [rowLen, colLen, nums] = input[0].split(" ").map(Number);
  let board = Array.from({ length: rowLen }, () =>
    Array.from({ length: colLen }, () => null)
  );

  //d 1 위 2 아래 3 오른쪽 4 왼쪽
  for (let i = 1; i <= nums; i++) {
    const [r, c, s, d, z] = input[i].split(" ").map(Number);
    board[r - 1][c - 1] = [s, d, z];
  }

  const move = (distance, d, pos) => {
    const dirs = [0, -1, 1, 1, -1];

    let len = [1, 2].includes(d) ? rowLen : colLen;

    while (distance--) {
      if (pos + dirs[d] > -1 && pos + dirs[d] < len) {
        pos += dirs[d];
      } else {
        if (d === 1) d = 2;
        else if (d === 2) d = 1;
        else if (d === 3) d = 4;
        else if (d === 4) d = 3;
        pos += dirs[d];
      }
    }
    return [pos, d];
  };

  let result = 0;
  for (let c = 0; c < colLen; c++) {
    for (let r = 0; r < rowLen; r++) {
      if (board[r][c]) {
        result += board[r][c][2];
        board[r][c] = null;
        break;
      }
    }
    let copy = Array.from({ length: rowLen }, () =>
      Array.from({ length: colLen }, () => null)
    );

    for (let r = 0; r < rowLen; r++) {
      for (let c = 0; c < colLen; c++) {
        if (board[r][c]) {
          let [s, d, z] = board[r][c];
          if (d === 1 || d === 2) {
            let [nr, nd] = move(s, d, r);
            if (!copy[nr][c]) copy[nr][c] = [s, nd, z];
            else {
              if (copy[nr][c][2] < z) {
                copy[nr][c] = [s, nd, z];
              }
            }
          } else {
            let [nc, nd] = move(s, d, c);
            if (!copy[r][nc]) copy[r][nc] = [s, nd, z];
            else {
              if (copy[r][nc][2] < z) {
                copy[r][nc] = [s, nd, z];
              }
            }
          }
        }
      }
    }
    board = copy.map((el) => [...el]);
  }

  return result;
}

console.log(sol(input));
