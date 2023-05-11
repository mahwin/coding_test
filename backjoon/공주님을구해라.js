let input = `3 4 100
0 0 0 0
1 1 1 1
0 0 2 0`
  .split("\n")
  .map((el) => el.split(" ").map(Number));

let rowLen, colLen, timeLimit, result; // row길이, col길이, 한계 시간, 결과
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

const bfs = () => {
  //방문 체크 [칼을 쥐고 있는 상태][row][col]
  const v = Array.from({ length: 2 }, () =>
    Array.from({ length: rowLen }, () =>
      Array.from({ length: colLen }, () => 0)
    )
  );
  //초기 위
  v[0][0][0] = true;
  const q = [[0, 0, 0, 0]]; // [r,c,time,sword]

  while (q.length) {
    const [r, c, time, sword] = q.shift();
    if (r === rowLen - 1 && c === colLen - 1) return time;
    for (const d of dirs) {
      const nr = r + d[0];
      const nc = c + d[1];

      if (isValid(nr, nc) && !v[sword][nr][nc]) {
        if (sword === 1) {
          q.push([nr, nc, time + 1, 1]);
          v[1][nr][nc] = time + 1;
        } else if (input[nr][nc] === 0) {
          q.push([nr, nc, time + 1, 0]);
          v[0][nr][nc] = time + 1;
        } else if (input[nr][nc] === 2) {
          q.push([nr, nc, time + 1, 1]);
          v[0][nr][nc] = time + 1;
          v[1][nr][nc] = time + 1;
        }
      }
    }
  }
  return Infinity;
};

const solution = () => {
  [rowLen, colLen, timeLimit] = input.shift();

  const time = bfs();

  console.log(time <= timeLimit ? time : "Fail");
};

solution();
