let input = `2
4 4
#.#.
.#.#
#.##
.#.#
3 5
###.#
..#..
#.###`.split("\n");

const solution = () => {
  const TEST_CASES = input.shift();
  let result = [];
  for (let i = 0; i < TEST_CASES; i++) {
    const [rowLen, colLen] = input.shift().split(" ").map(Number);
    result.push(countGrid(input.splice(0, rowLen), rowLen, colLen));
  }
  console.log(result.join("\n"));
};

const countGrid = (board, rowLen, colLen) => {
  const isValid = (r, c) => {
    if (r < 0 || c < 0 || r >= rowLen || c >= colLen) return false;
    return true;
  };

  const dirs = [
    [0, 1],
    [1, 0],
    [-1, 0],
    [0, -1],
  ];

  const v = Array.from({ length: rowLen }, () =>
    Array.from({ length: colLen }, () => false)
  );

  let result = 0;
  for (let r = 0; r < rowLen; r++) {
    for (let c = 0; c < colLen; c++) {
      if (v[r][c] || board[r][c] === ".") continue;
      result++;
      v[r][c] = true;
      const q = [[r, c]];
      while (q.length) {
        const [x, y] = q.shift();
        for (let d of dirs) {
          const nx = d[0] + x;
          const ny = d[1] + y;
          if (isValid(nx, ny) && !v[nx][ny] && board[nx][ny] === "#") {
            q.push([nx, ny]);
            v[nx][ny] = true;
          }
        }
      }
    }
  }
  return result;
};

solution();
