const rotate = (clock, rotation) => {
  return clock + rotation >= 4 ? clock + rotation - 4 : clock + rotation;
};
const isValid = (x, y, len) => {
  if (x < 0 || x >= len || y < 0 || y >= len) return false;
  else return true;
};

function solution(clockHands) {
  const len = clockHands.length;
  let min = Infinity;
  const dirs = [
    [1, 0],
    [-1, 0],
    [0, 1],
    [0, -1],
  ];
  const cases = [];
  let dfs = (cnt, tmp) => {
    if (cnt === len) {
      cases.push(tmp);
      return;
    }
    for (let rotation = 0; rotation < 4; rotation++) {
      dfs(cnt + 1, [...tmp, rotation]);
    }
  };

  dfs(0, []);

  for (const c of cases) {
    let cnt = c.reduce((pre, cur) => (pre += cur), 0);
    let copyBoard = clockHands.map((el) => [...el]);
    for (let col = 0; col < len; col++) {
      copyBoard[0][col] = rotate(copyBoard[0][col], c[col]);
      for (const dir of dirs) {
        let nRow = 0 + dir[0];
        let nCol = col + dir[1];
        if (isValid(nRow, nCol, len)) {
          copyBoard[nRow][nCol] = rotate(copyBoard[nRow][nCol], c[col]);
        }
      }
    }
    flag = true;
    for (let row = 1; row < len; row++) {
      for (let col = 0; col < len; col++) {
        let clock = copyBoard[row - 1][col];
        if (clock === 0) continue;
        let needRotation = 4 - clock;
        cnt += needRotation;
        copyBoard[row][col] = rotate(copyBoard[row][col], needRotation);

        for (const dir of dirs) {
          let nRow = row + dir[0];
          let nCol = col + dir[1];
          if (isValid(nRow, nCol, len)) {
            copyBoard[nRow][nCol] = rotate(copyBoard[nRow][nCol], needRotation);
          }
        }
      }
      if (Number(copyBoard[len - 1].join("")) === 0) {
        min = Math.min(min, cnt);
      }
    }
  }
  return min;
}

console.log(
  solution([
    [0, 3, 3, 0],
    [3, 2, 2, 3],
    [0, 3, 2, 0],
    [0, 3, 3, 3],
  ])
);
