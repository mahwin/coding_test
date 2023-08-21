let input = `4 10 50
10 100 20 90
80 100 60 70
70 20 30 40
50 20 100 10`.split("\n");

let n, L, R, canGo; // canGo : 국경이 열릴 때 인구이동이 있었는지를 저장
const dirs = [
  [0, 1],
  [1, 0],
  [-1, 0],
  [0, -1],
];

const parser = (info) => info.split(" ").map(Number);
//경계 체크
const isValid = (r, c) => {
  if (r < 0 || c < 0 || r >= n || c >= n) return false;
  return true;
};

const check = (v, r, c) => {
  let people = input[r][c];
  let route = [[r, c]];
  v[r][c] = true;

  const q = [[r, c]];

  while (q.length) {
    const [row, col] = q.shift();
    for (const d of dirs) {
      const nr = row + d[0];
      const nc = col + d[1];
      if (isValid(nr, nc) && !v[nr][nc]) {
        const diff = Math.abs(input[nr][nc] - input[row][col]);
        if (L <= diff && diff <= R) {
          v[nr][nc] = true;
          q.push([nr, nc]);
          route.push([nr, nc]);
          people += input[nr][nc];
        }
      }
    }
  }
  if (route.length > 1) canGo = true;
  const divideP = Math.floor(people / route.length);
  route.forEach(([r, c]) => (input[r][c] = divideP));
};

const simulation = () => {
  const v = Array.from({ length: n }, () =>
    Array.from({ length: n }, () => false)
  );

  for (let r = 0; r < n; r++) {
    for (let c = 0; c < n; c++) {
      if (v[r][c]) continue;
      check(v, r, c);
    }
  }
};

const solution = () => {
  [n, L, R] = parser(input.shift());
  input = input.map((el) => parser(el));

  let result = 0;
  while (true) {
    canGo = false;
    simulation();
    if (!canGo) return result;
    result++;
  }
};

console.log(solution());
