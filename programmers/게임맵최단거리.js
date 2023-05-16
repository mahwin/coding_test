function solution(maps) {
  const dirs = [
    [0, 1],
    [1, 0],
    [-1, 0],
    [0, -1],
  ]; // 이동 방향
  let rowLen = maps.length;
  let colLen = maps[0].length;

  const isValid = (r, c) => {
    //경계 체크
    if (r < 0 || c < 0 || r >= rowLen || c >= colLen) return false;
    else return true;
  };
  const v = Array.from({ length: rowLen }, () =>
    Array.from({ length: colLen }, () => false)
  );
  v[0][0] = true;
  const q = [[0, 0, 1]]; //[r,c,cnt];
  while (q.length) {
    const [r, c, cnt] = q.shift();
    if (r === rowLen - 1 && c === colLen - 1) return cnt;

    for (const d of dirs) {
      const nr = d[0] + r;
      const nc = d[1] + c;
      if (isValid(nr, nc) && maps[nr][nc] && !v[nr][nc]) {
        v[nr][nc] = true;
        q.push([nr, nc, cnt + 1]);
      }
    }
  }
  return -1;
}
