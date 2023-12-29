let input = `15 15
2 1 1 1 1 1 1 1 1 1 1 1 1 1 1
1 1 1 1 1 1 1 1 1 1 1 1 1 1 1
1 1 1 1 1 1 1 1 1 1 1 1 1 1 1
1 1 1 1 1 1 1 1 1 1 1 1 1 1 1
1 1 1 1 1 1 1 1 1 1 1 1 1 1 1
1 1 1 1 1 1 1 1 1 1 1 1 1 1 1
1 1 1 1 1 1 1 1 1 1 1 1 1 1 1
1 1 1 1 1 1 1 1 1 1 1 1 1 1 1
1 1 1 1 1 1 1 1 1 1 1 1 1 1 1
1 1 1 1 1 1 1 1 1 1 1 1 1 1 1
1 1 1 1 1 1 1 1 1 1 1 1 1 1 1
1 1 1 1 1 1 1 1 1 1 0 0 0 0 1
1 1 1 1 1 1 1 1 1 1 0 1 1 1 1
1 1 1 1 1 1 1 1 1 1 0 1 0 0 0
1 1 1 1 1 1 1 1 1 1 0 1 1 1 1`.split("\n");

const solution = () => {
  const [rowLen, colLen] = input.shift().split(" ").map(Number);

  const isValid = (r, c) => {
    if (r < 0 || c < 0 || r >= rowLen || c >= colLen) return false;
    return true;
  };
  input = input.map((el) => el.split(" "));

  const findStart = () => {
    for (let r = 0; r < rowLen; r++) {
      for (let c = 0; c < colLen; c++) {
        if (input[r][c] === "2") return [r, c];
      }
    }
  };
  const dirs = [
    [0, 1],
    [1, 0],
    [0, -1],
    [-1, 0],
  ];

  const v = Array.from({ length: rowLen }, () =>
    Array.from({ length: colLen }, () => false)
  );
  const result = Array.from({ length: rowLen }, () =>
    Array.from({ length: colLen }, () => 0)
  );

  const [sr, sc] = findStart();
  const q = [[sr, sc, 0]];
  v[sr][sc] = true;

  while (q.length) {
    const [r, c, cnt] = q.shift();

    for (const d of dirs) {
      const nr = d[0] + r;
      const nc = d[1] + c;
      if (isValid(nr, nc) && input[nr][nc] == 1 && !v[nr][nc]) {
        v[nr][nc] = true;
        q.push([nr, nc, cnt + 1]);
        result[nr][nc] = cnt + 1;
      }
    }
  }

  for (let r = 0; r < rowLen; r++) {
    for (let c = 0; c < colLen; c++) {
      if (input[r][c] === "1" && result[r][c] === "0") {
        result[r][c] = "-1";
      }
    }
  }

  result.forEach((rowInfo) => {
    console.log(rowInfo.join(" "));
  });
};

solution();
