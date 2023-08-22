const fs = require("fs");
// let input = fs.readFileSync("/dev/stdin").toString().split("\n");

const solution = () => {
  const n = Number(input.shift());

  input = input.map((el) => el.split(" ").map(Number));

  const isValid = (r, c) => {
    if (r < 0 || c < 0 || r >= n || c >= n) return false;
    return true;
  };

  const bfs = () => {
    const v = Array.from({ length: n }, () =>
      Array.from({ length: n }, () => false)
    );
    let q = [[0, 0, input[0][0], input[0][0]]];
    const dirs = [
      [1, 0],
      [0, 1],
    ];

    while (q.length) {
      const [r, c] = q.shift();
      if (input[r][c] === -1) return "HaruHaru";

      for (const d of dirs) {
        const nr = input[r][c] * d[0] + r;
        const nc = input[r][c] * d[1] + c;
        if (isValid(nr, nc) && !v[nr][nc]) {
          v[nr][nc] = true;
          q.push([nr, nc]);
        }
      }
    }
    return "Hing";
  };
  return bfs();
};
let input = `3
2 2 1
2 2 2
1 2 -1`.split("\n");

console.log(solution());
