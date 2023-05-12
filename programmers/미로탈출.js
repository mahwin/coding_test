function solution(maps) {
  let answer = 0;
  const rowLen = maps.length;
  const colLen = maps[0].length;

  const dirs = [
    [0, 1],
    [1, 0],
    [-1, 0],
    [0, -1],
  ]; // 이동 방향

  const isValid = (r, c) => {
    //경계 값 확인
    if (r < 0 || c < 0 || r >= rowLen || c >= colLen) return false;
    return true;
  };

  //방문체크 row,col,레버 작동
  const v = Array.from({ length: rowLen }, () =>
    Array.from({ length: colLen }, () => Array.from({ length: 2 }, () => false))
  );

  let q = []; // bfs를 위한 큐
  for (let i = 0; i < rowLen; i++) {
    for (let j = 0; j < colLen; j++) {
      if (maps[i][j] === "S") {
        q = [[i, j, 0, 0]]; // row,col,이동 거리, 레버 당김 유무.
        v[i][j][0] = true; // 방문도 체크
      }
    }
  }

  while (q.length) {
    const [r, c, cnt, isPulled] = q.shift();
    for (const d of dirs) {
      const nr = d[0] + r;
      const nc = d[1] + c;
      if (isValid(nr, nc) && maps[nr][nc] !== "X" && !v[nr][nc][isPulled]) {
        v[nr][nc][isPulled] = true;
        if (isPulled && maps[nr][nc] === "E") {
          return cnt + 1;
        } else if (maps[nr][nc] === "L") {
          q.push([nr, nc, cnt + 1, 1]);
        } else {
          q.push([nr, nc, cnt + 1, isPulled]);
        }
      }
    }
  }
  return -1;
}
