let input = `3 4 6
....
.T..
....`.split("\n");

const solution = () => {
  const [rowLen, colLen, target] = input.shift().split(" ").map(Number);

  const isValid = (r, c) => {
    if (r < 0 || c < 0 || r >= rowLen || c >= colLen) return false;
    return true;
  };

  const v = Array.from({ length: rowLen }, () =>
    Array.from({ length: colLen }, () => false)
  );

  const dirs = [
    [0, 1],
    [1, 0],
    [-1, 0],
    [0, -1],
  ];
  let result = 0;
  const dfs = (r, c, route) => {
    if (route === target) {
      if (r === 0 && c === colLen - 1) result += 1;
      return;
    }
    for (const d of dirs) {
      const nr = d[0] + r;
      const nc = d[1] + c;
      if (isValid(nr, nc) && !v[nr][nc] && input[nr][nc] !== "T") {
        v[nr][nc] = true;
        dfs(nr, nc, route + 1);
        v[nr][nc] = false;
      }
    }
  };
  v[rowLen - 1][0] = true;
  dfs(rowLen - 1, 0, 1);
  console.log(result);
};

solution();
