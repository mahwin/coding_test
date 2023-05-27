// 방문 우선순위 E,P,일반 같은 점이 많다면 r,c 순으로 작은 것.

let input = `4 4
P000
PPPP
000S
0EP0`.split("\n");

let rowLen, colLen, v; //row 길이, col 길이, 방문체크
let pqObj = { E: [], P: [], 0: [] };
const dirs = [
  [0, 1],
  [1, 0],
  [-1, 0],
  [0, -1],
];

//경계 체크
const isValid = (r, c) => {
  if (r < 0 || c < 0 || r >= rowLen || c >= colLen) return false;
  return true;
};

const getSPos = () => {
  for (let r = 0; r < rowLen; r++) {
    for (let c = 0; c < colLen; c++) {
      if (input[r][c] === "S") return [r, c];
    }
  }
};

const checkP = (r, c) => {
  let result = 0;
  for (let i = -1; i < 2; i++) {
    for (let j = -1; j < 2; j++) {
      if (i == 0 && j === 0) continue;
      else if (isValid(r + i, c + j) && input[r + i][c + j] === "P") result++;
    }
  }
  return result;
};

const dfs = (r, c, cnt) => {
  for (const d of dirs) {
    const nr = r + d[0];
    const nc = c + d[1];

    if (isValid(nr, nc) && !v[nr][nc]) {
      switch (input[nr][nc]) {
        case "E":
          pqObj["E"].push([nr, nc]);
          break;
        case "P":
          pqObj["P"].push([nr, nc]);
          break;
        case "0":
          pqObj["0"].push([nr, nc]);
          break;
      }
    }
  }

  for (let key of ["E", "P", "0"]) {
    if (!pqObj[key].length) continue;
    const [nr, nc] = pqObj[key]
      .sort((a, b) => (a[0] === b[0] ? b[1] - a[1] : b[0] - a[0]))
      .pop();
    v[nr][nc] = true;
    pqObj[key] = pqObj[key].filter((el) => el[0] != nr && el[1] != nc);
    if (key === "E") return cnt;
    else if (key === "P") return dfs(nr, nc, cnt + checkP(nr, nc) - 3);
    return dfs(nr, nc, cnt + checkP(nr, nc));
  }
};

const solution = () => {
  [rowLen, colLen] = input.shift().split(" ").map(Number);
  const [r, c] = getSPos();
  v = Array.from({ length: rowLen }, () =>
    Array.from({ length: colLen }, () => false)
  );
  v[r][c] = true;
  const result = dfs(r, c, 0);
  return result > 0 ? result : 0;
};

console.log(solution());
