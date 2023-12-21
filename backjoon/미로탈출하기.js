const fs = require("fs");
let input = fs.readFileSync("/dev/stdin").toString().trim().split("\n");

const solution = () => {
  const dirs = { R: [0, 1], D: [1, 0], U: [-1, 0], L: [0, -1] };

  const [rowLen, colLen] = input.shift().split(" ").map(Number);

  const isOut = (row, col) => {
    if (row >= rowLen || col >= colLen || row < 0 || col < 0) return true;
    return false;
  };

  const createKey = (r, c) => {
    return [r, c].join(",");
  };

  const v = Array.from({ length: rowLen }, () =>
    Array.from({ length: colLen }, () => ({ visited: false, canOut: false }))
  );

  let answer = 0;
  for (let r = 0; r < rowLen; r++) {
    for (let c = 0; c < colLen; c++) {
      const { visited, canOut } = v[r][c];
      if (visited) {
        if (canOut) {
          answer++;
        }
        continue;
      }
      let routes = new Set();
      routes.add(createKey(r, c));
      let nr = r;
      let nc = c;
      while (true) {
        const d = input[nr][nc];
        nr += dirs[d][0];
        nc += dirs[d][1];
        if (isOut(nr, nc)) {
          answer++;
          [...routes].forEach((route) => {
            const [r, c] = route.split(",").map(Number);
            v[r][c] = { visited: true, canOut: true };
          });
          break;
        }

        const key = createKey(nr, nc);
        if (v[nr][nc].visited || routes.has(key)) {
          const canOut = v[nr][nc].visited ? v[nr][nc].canOut : false;
          if (canOut) answer++;
          v[nr][nc] = { visited: true, canOut };
          [...routes].forEach((route) => {
            const [r, c] = route.split(",").map(Number);
            v[r][c] = { visited: true, canOut };
          });
          break;
        }
        routes.add(key);
      }
    }
  }

  return answer;
};

console.log(solution());
