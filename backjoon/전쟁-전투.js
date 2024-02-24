let input = `5 5
WBWWW
WWWWW
BBBBB
BBBWW
WWWWW`.split("\n");

const solution = () => {
  const [rowLen, colLen] = input.shift().split(" ").map(Number);
  const v = Array.from({ length: rowLen }, () =>
    Array.from({ length: colLen }, () => false)
  );

  const board = input;
  const score = { W: 0, B: 0 };
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
  for (let i = 0; i < rowLen; i++) {
    for (let j = 0; j < colLen; j++) {
      if (v[i][j]) continue;
      const color = board[i][j];
      const q = [[i, j]];
      let team = 1;
      v[i][j] = true;
      while (q.length) {
        const [r, c] = q.shift();
        for (const d of dirs) {
          const nr = d[0] + r;
          const nc = d[1] + c;
          if (isValid(nr, nc) && !v[nr][nc] && board[nr][nc] === color) {
            v[nr][nc] = true;
            q.push([nr, nc]);
            team++;
          }
        }
      }
      score[color] += team ** 2;
    }
  }
  return [score.W, score.B].join(" ");
};

console.log(solution());
