// 0 차 x 1 차 o 2 차는 없지만 주차 x

// let input = `7 8
// 1 1 0 1 1 2 1 1
// 2 2 1 1 0 1 1 0
// 0 0 1 0 0 1 0 1
// 0 0 1 1 1 1 2 0
// 0 0 2 1 1 1 2 1
// 1 1 1 1 1 1 0 1
// 1 1 1 1 0 0 0 0`.split("\n");

let input = `5 5
1 1 1 1 1
1 1 1 1 1
1 1 1 1 1
1 1 1 1 1
1 1 1 1 1`.split("\n");

let rowLen, colLen;
let v; // 방문체크
let result = 0; // 결과 저장
const dirs = [
  [0, 1],
  [1, 0],
  [-1, 0],
  [0, -1],
];

const isValid = (r, c) => {
  // 경계 체크
  if (r >= rowLen || r < 0 || c >= colLen || c < 0) return false;
  return true;
};

const bfs = (row, col) => {
  let result = 0;
  const q = [[row, col]];

  while (q.length) {
    const [r, c] = q.shift();
    for (const d of dirs) {
      const nr = r + d[0];
      const nc = c + d[1];
      if (isValid(nr, nc) && input[nr][nc] != 1 && !v[nr][nc]) {
        v[nr][nc] = true;
        result += input[nr][nc] == 0 ? 1 : -2;
        q.push([nr, nc]);
      }
    }
  }
  return result;
};

const solution = () => {
  //인풋 정보
  [rowLen, colLen] = input.shift().split(" ").map(Number);
  input = input.map((el) => el.split(" ").map(Number));

  v = Array.from({ length: rowLen }, () =>
    Array.from({ length: colLen }, () => false)
  );

  for (let r = 0; r < rowLen; r++) {
    for (let c = 0; c < colLen; c++) {
      //방문한 적도 없고 차량이 주차하지도 않았다면
      if (!v[r][c] && input[r][c] !== 1) {
        result = Math.max(result, bfs(r, c));
      }
    }
  }
};

solution();
console.log(result);
