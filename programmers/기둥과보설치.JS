function solution(n, build_frame) {
  let answer = [];
  const pillar = Array.from({ length: n + 2 }, () =>
    Array.from({ length: n + 2 }, () => 0)
  );

  const bar = Array.from({ length: n + 2 }, () =>
    Array.from({ length: n + 2 }, () => 0)
  );

  const barValid = (x, y) => {
    //보는 기둥 위거나 양쪽이 보거나
    if (pillar[x][y - 1] === 1 || pillar[x + 1][y - 1] === 1) return true;
    else if (x > 0 && bar[x - 1][y] === 1 && bar[x + 1][y] === 1) return true;
    return false;
  };
  const pillarValid = (x, y) => {
    //기둥은 바닥이거나 다른 기둥 위나 보 위에
    if (y === 0 || pillar[x][y - 1] === 1) return true;
    else if ((x > 0 && bar[x - 1][y] === 1) || bar[x][y] === 1) return true;
    return false;
  };

  build_frame.forEach(([x, y, isBar, isBuild]) => {
    if (isBuild) {
      if (!isBar) {
        if (pillarValid(x, y)) pillar[x][y] = 1;
      } else {
        if (barValid(x, y)) bar[x][y] = 1;
      }
    }

    if (!isBuild) {
      if (!isBar) {
        pillar[x][y] = 0;
        let isCanDelete = true;

        for (let i = 0; i < n + 1; i++) {
          for (let j = 0; j < n + 1; j++) {
            if (bar[i][j] && !barValid(i, j)) {
              isCanDelete = false;
            }
            if (pillar[i][j] && !pillarValid(i, j)) {
              isCanDelete = false;
            }
          }
        }

        if (!isCanDelete) pillar[x][y] = 1;
      } else {
        bar[x][y] = 0;

        let isCanDelete = true;
        for (let i = 0; i < n + 1; i++) {
          for (let j = 0; j < n + 1; j++) {
            if (bar[i][j] && !barValid(i, j)) {
              isCanDelete = false;
            }
            if (pillar[i][j] && !pillarValid(i, j)) {
              isCanDelete = false;
            }
          }
        }

        if (!isCanDelete) bar[x][y] = 1;
      }
    }
  });
  for (let x = 0; x <= n; x++) {
    for (let y = 0; y <= n; y++) {
      if (pillar[x][y] === 1) answer.push([x, y, 0]);
      if (bar[x][y] === 1) answer.push([x, y, 1]);
    }
  }

  return answer;
}

console.log(
  solution(5, [
    [0, 0, 0, 1],
    [2, 0, 0, 1],
    [4, 0, 0, 1],
    [0, 1, 1, 1],
    [1, 1, 1, 1],
    [2, 1, 1, 1],
    [3, 1, 1, 1],
    [2, 0, 0, 0],
    [1, 1, 1, 0],
    [2, 2, 0, 1],
  ])
);
