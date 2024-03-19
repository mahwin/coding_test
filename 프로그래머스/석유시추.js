function solution(land) {
  const rowLen = land.length;
  const colLen = land[0].length;

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

  let mark = 1;

  const markArr = Array.from({ length: rowLen }, () =>
    Array.from({ length: colLen }, () => 0)
  );

  let markObj = {};

  const q = [];
  for (let r = 0; r < rowLen; r++) {
    for (let c = 0; c < colLen; c++) {
      if (v[r][c]) continue;
      if (land[r][c] === 0) continue;
      const route = [[r, c]];

      q.push([r, c]);

      v[r][c] = true;
      while (q.length) {
        const [row, col] = q.shift();
        for (const d of dirs) {
          const nr = d[0] + row;
          const nc = d[1] + col;
          if (isValid(nr, nc) && !v[nr][nc] && land[nr][nc] === 1) {
            v[nr][nc] = true;
            route.push([nr, nc]);
            q.push([nr, nc]);
          }
        }
      }

      route.forEach(([row, col]) => {
        markArr[row][col] = mark;
      });

      markObj[mark] = route.length;
      mark++;
    }
  }

  let result = 0;

  for (let c = 0; c < colLen; c++) {
    let markSet = new Set();
    for (let r = 0; r < rowLen; r++) {
      markSet.add(markArr[r][c]);
    }

    let accOil = 0;

    [...markSet].forEach((markNum) => {
      if (markNum !== 0) accOil += markObj[markNum];
    });

    result = Math.max(accOil, result);
  }

  return result;
}
