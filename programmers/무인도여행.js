function solution(maps) {
  const rowLen = maps.length;
  const colLen = maps[0].length;

  //경계 체크
  const isValid = (r, c) => {
    if (r < 0 || c < 0 || r >= rowLen || c >= colLen) return false;
    return true;
  };

  const result = [];
  const v = Array.from({ length: rowLen }, () =>
    Array.from({ length: colLen }, () => false)
  );
  const dirs = [
    [0, 1],
    [1, 0],
    [-1, 0],
    [0, -1],
  ];

  //전체 지역 하나 씩 돌면서 체크
  for (let r = 0; r < rowLen; r++) {
    for (let c = 0; c < colLen; c++) {
      if (maps[r][c] == "X" || v[r][c]) continue;
      let stack = [[r, c]];
      let acc = Number(maps[r][c]);
      v[r][c] = true;
      while (stack.length) {
        const [row, col] = stack.shift();
        for (const d of dirs) {
          const nr = row + d[0];
          const nc = col + d[1];
          // 새로운 방향에 대해서도 경계선을 벗어나면 안 된다.
          // 방문 했어도 안 된다,.
          // X여도 안 된다.
          if (isValid(nr, nc) && !v[nr][nc] && maps[nr][nc] !== "X") {
            v[nr][nc] = true;
            stack.push([nr, nc]);
            acc += Number(maps[nr][nc]);
          }
        }
      }
      result.push(acc);
    }
  }
  return result.length === 0 ? [-1] : result.sort((a, b) => a - b);
}
