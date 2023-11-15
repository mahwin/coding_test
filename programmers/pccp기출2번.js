let land = [
  [0, 0, 0, 1, 1, 1, 0, 0],
  [0, 0, 0, 0, 1, 1, 0, 0],
  [1, 1, 0, 0, 0, 1, 1, 0],
  [1, 1, 1, 0, 0, 0, 0, 0],
  [1, 1, 1, 0, 0, 0, 1, 1],
];

function solution(land) {
  const rowLen = land.length;
  const colLen = land[0].length;
  const dirs = [
    [0, 1],
    [1, 0],
    [-1, 0],
    [0, -1],
  ];
  const v = Array.from({ length: rowLen }, () =>
    Array.from({ length: colLen }, () => false)
  );

  // bfs를 한 번만 수행하고 계산된 값을 사용하자
  // [0,0] [0,0] [0,0]
  // [0,0] [0,0] [0,0]
  // [1,8] [1,8] [0,0]    => [몇번째 석유 덩어리냐:1,석유의 양은 얼마냐:8]
  // [1,8] [1,8] [1,8]
  // [1,8] [1,8] [1,8]
  // 다음과 같은 구조로 만들자

  const computedLand = Array.from({ length: rowLen }, () =>
    Array.from({ length: colLen }, () => [0, 0])
  );

  const isValid = (r, c) => {
    if (r < 0 || c < 0 || r >= rowLen || c >= colLen) return false;
    return true;
  };
  const makeKey = (r, c) => `${r}|${c}`;

  // 먼저 computedLand를 채우자
  let landIdx = 1;
  for (let r = 0; r < rowLen; r++) {
    for (let c = 0; c < colLen; c++) {
      if (v[r][c] || land[r][c] === 0) continue;
      let posSet = new Set();
      posSet.add(makeKey(r, c));
      const q = [[r, c]];
      v[r][c] = true;

      while (q.length) {
        const [r, c] = q.shift();
        for (const d of dirs) {
          const nr = d[0] + r;
          const nc = d[1] + c;
          if (!isValid(nr, nc) || land[nr][nc] === 0 || v[nr][nc]) continue;
          posSet.add(makeKey(nr, nc));
          v[nr][nc] = true;
          q.push([nr, nc]);
        }
      }

      [...posSet].forEach((posString) => {
        const [r, c] = posString.split("|");
        computedLand[r][c] = [landIdx, posSet.size];
      });
      landIdx++;
    }
  }

  let result = 0;
  for (let c = 0; c < colLen; c++) {
    let tmp = 0;
    let set = new Set();
    for (let r = 0; r < rowLen; r++) {
      const [landIdx, amount] = computedLand[r][c];
      if (landIdx === 0 || set.has(landIdx)) continue;
      tmp += amount;
      set.add(landIdx);
    }
    result = Math.max(result, tmp);
  }
  return result;
}

console.log(solution(land));
