function solution(m, n, picture) {
  const v = Array.from({ length: m }, () =>
    Array.from({ length: n }, () => false)
  );
  const result = [0, 0]; // 영역의 수, 가장 큰 영역의 칸 수
  const dirs = [
    [0, 1],
    [1, 0],
    [-1, 0],
    [0, -1],
  ];

  const isValid = (r, c) => {
    if (r >= m || c >= n || r < 0 || c < 0) return false;
    return true;
  };

  const bfs = (row, col) => {
    let cnt = 1;
    const queue = [[row, col]];
    while (queue.length) {
      const [r, c] = queue.shift();
      for (const d of dirs) {
        const nr = d[0] + r;
        const nc = d[1] + c;
        if (
          isValid(nr, nc) &&
          !v[nr][nc] &&
          picture[r][c] === picture[nr][nc]
        ) {
          cnt++;
          v[nr][nc] = true;
          queue.push([nr, nc]);
        }
      }
    }
    return cnt;
  };

  for (let r = 0; r < m; r++) {
    for (let c = 0; c < n; c++) {
      if (v[r][c] || picture[r][c] === 0) continue;
      //방문한적 없고, 그림에 색깔도 채워져 있다면

      v[r][c] = true; //시작 부분 방문처리하고
      result[1] = Math.max(result[1], bfs(r, c));
      result[0]++; //영역하나 추가
    }
  }
  return result;
}

// console.log(
//   solution(6, 4, [
//     [1, 1, 1, 0],
//     [1, 2, 2, 0],
//     [1, 0, 0, 1],
//     [0, 0, 0, 1],
//     [0, 0, 0, 3],
//     [0, 0, 0, 3],
//   ])
// );

// console.log(
//   solution(2, 2, [
//     [1, 1],
//     [0, 1],
//   ])
// );
// console.log(
//   solution(6, 4, [
//     [1, 1, 1, 0],
//     [1, 2, 2, 0],
//     [1, 0, 0, 1],
//     [0, 0, 0, 1],
//     [0, 0, 0, 3],
//     [0, 0, 0, 3],
//   ])
// );
// console.log(
//   solution(6, 4, [
//     [1, 0, 0, 1],
//     [1, 0, 0, 1],
//     [1, 0, 0, 1],
//     [1, 0, 0, 1],
//     [1, 0, 0, 1],
//     [1, 1, 1, 1],
//   ])
// );
console.log(solution(1, 1, [[0]]));
// console.log(
//   solution(4, 4, [
//     [1, 1, 1, 1],
//     [1, 4, 1, 1],
//     [1, 3, 2, 1],
//     [1, 1, 1, 1],
//   ])
// );
// (2, 2, { { 1, 1 }, { 0, 1 } }) => 1, 3

// (6, 4, { { 1, 1, 1, 0 }, { 1, 2, 2, 0 }, { 1, 0, 0, 1 }, { 0, 0, 0, 1 }, { 0, 0, 0, 3 }, { 0, 0, 0, 3 } }) => 4, 5

// (6, 4, { { 1, 0, 0, 1 }, { 1, 0, 0, 1 }, { 1, 0, 0, 1 }, { 1, 0, 0, 1 }, { 1, 0, 0, 1 }, { 1, 1, 1, 1 } }) => 1, 14

// (1, 1, { { 0 } }) => 0, 0

// (4, 4, { { 1, 1, 1, 1 }, { 1, 4, 1, 1 }, { 1, 3, 2, 1 }, { 1, 1, 1, 1 } }) => 12, 120

//  1 1 1 1
//  1 4 1 1
//  1 3 2 1
//  1 1 1 1
