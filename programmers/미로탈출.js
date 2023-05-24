let rowLen, colLen;

// 시작 위치 찾기
const findStart = (maps) => {
  for (let r = 0; r < rowLen; r++) {
    for (let c = 0; c < colLen; c++) {
      if (maps[r][c] === "S") return [r, c];
    }
  }
};

// 경계 체크
const isValid = (r, c) => {
  if (r < 0 || c < 0 || r >= rowLen || c >= colLen) return false;
  return true;
};

function solution(maps) {
  rowLen = maps.length;
  colLen = maps[0].length;

  // 방문테크 v[2][행 길이][열 길이]  //v[2]는 레버를 당긴 상태 반영;
  const v = Array.from({ length: 2 }, () =>
    Array.from({ length: rowLen }, () =>
      Array.from({ length: colLen }, () => false)
    )
  );

  const [initR, initC] = findStart(maps);
  // 시작 위치 방문체크
  v[0][initR][initC] = true;
  const queue = [[initR, initC, 0, 0]]; //[r,c,cnt,레버 당긴 유무];
  const dirs = [
    [0, 1],
    [1, 0],
    [-1, 0],
    [0, -1],
  ];

  while (queue.length) {
    const [r, c, cnt, isPulled] = queue.shift();
    for (const d of dirs) {
      const nr = r + d[0];
      const nc = c + d[1];
      //경계 안이고, 전에 방문한적도 없고, 갈 수 있는 곳이라면
      if (isValid(nr, nc) && !v[isPulled][nr][nc] && maps[nr][nc] !== "X") {
        // 현재 위치가 출구이고, 레버도 당긴적 있다면
        if (maps[nr][nc] === "E" && isPulled) return cnt + 1;
        // 현재 위치가 레버라면
        else if (maps[nr][nc] === "L") queue.push([nr, nc, cnt + 1, 1]);
        else queue.push([nr, nc, cnt + 1, isPulled]);
        v[isPulled][nr][nc] = true;
      }
    }
  }
  return -1;
}
