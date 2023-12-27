let input = `6 6
...#..
.##v#.
#v.#.#
#.k#.#
.###.#
...###`.split("\n");

const solution = () => {
  const [rowLen, colLen] = input.shift().split(" ").map(Number);
  const v = Array.from({ length: rowLen }, () =>
    Array.from({ length: colLen }, () => false)
  );

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

  const check = (r, c) => {
    let cntObj = { sheep: 0, wolf: 0 };
    const q = [[r, c]];

    while (q.length) {
      const [r, c] = q.shift();
      for (const d of dirs) {
        const nr = r + d[0];
        const nc = c + d[1];
        if (isValid(nr, nc) && !v[nr][nc] && input[nr][nc] !== "#") {
          v[nr][nc] = true;
          if (input[nr][nc] === "v") cntObj.wolf++;
          if (input[nr][nc] === "k") cntObj.sheep++;
          q.push([nr, nc]);
        }
      }
    }
    return cntObj;
  };
  let wolf = 0;
  let sheep = 0;
  for (let r = 0; r < rowLen; r++) {
    for (let c = 0; c < colLen; c++) {
      if (v[r][c]) continue;
      const cntOjb = check(r, c);
      if (cntOjb.sheep > cntOjb.wolf) sheep += cntOjb.sheep;
      else wolf += cntOjb.wolf;
    }
  }
  console.log(sheep, wolf);
};

solution();
