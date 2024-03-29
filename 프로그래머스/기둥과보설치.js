function solution(n, build_frame) {
  const wallMatrix = Array.from({ length: n + 1 }, () =>
    Array.from({ length: n + 1 }, () => false)
  );
  const pillarMatrix = Array.from({ length: n + 1 }, () =>
    Array.from({ length: n + 1 }, () => false)
  );
  function pillarCheck(x, y) {
    if (y === 0) return true;
    if (y - 1 >= 0 && pillarMatrix[x][y - 1]) return true;

    if (x - 1 >= 0 && wallMatrix[x - 1][y]) return true;
    if (wallMatrix[x][y]) return true;

    return false;
  }

  function wallCheck(x, y) {
    if (y - 1 >= 0 && pillarMatrix[x][y - 1]) return true;
    if (y - 1 >= 0 && x < n && pillarMatrix[x + 1][y - 1]) return true;
    if (x - 1 < 0 || x > n) return false;
    if (wallMatrix[x - 1][y] && wallMatrix[x + 1][y]) return true;
    return false;
  }

  // a 0 기둥, 1 보
  // b 0 삭제, 1 설치
  build_frame.forEach(([x, y, a, b]) => {
    let matrix = a === 0 ? pillarMatrix : wallMatrix;

    if (b === 1) {
      let checkFuc = a === 0 ? pillarCheck : wallCheck;
      if (checkFuc(x, y)) {
        matrix[x][y] = true;
      }
    }

    if (b === 0) {
      matrix[x][y] = false;
      let flag = true;

      console.log(x, y, a, b);

      for (let r = 0; r <= n; r++) {
        if (!flag) break;
        for (let c = 0; c <= n; c++) {
          if (
            (wallMatrix[r][c] && !wallCheck(r, c)) ||
            (pillarMatrix[r][c] && !pillarCheck(r, c))
          ) {
            flag = false;
            break;
          }
        }
      }

      if (!flag) matrix[x][y] = true;
    }
  });
  const result = [];

  for (let x = 0; x <= n; x++) {
    for (let y = 0; y <= n; y++) {
      if (wallMatrix[x][y]) result.push([x, y, 1]);
      if (pillarMatrix[x][y]) result.push([x, y, 0]);
    }
  }
  return result.sort((a, b) => {
    if (a[0] !== b[0]) return a[0] - b[0];
    if (a[1] !== b[1]) return a[1] - b[1];
    return a[2] - b[2];
  });
}
