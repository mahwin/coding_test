let input = `0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0
0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0
0 1 2 0 0 2 2 2 1 0 0 0 0 0 0 0 0 0 0
0 0 1 2 0 0 0 0 1 0 0 0 0 0 0 0 0 0 0
0 0 0 1 2 0 0 0 0 0 0 0 0 0 0 0 0 0 0
0 0 0 0 1 2 2 0 0 0 0 0 0 0 0 0 0 0 0
0 0 1 1 0 1 0 0 0 0 0 0 0 0 0 0 0 0 0
0 0 0 0 0 0 2 1 0 0 0 0 0 0 0 0 0 0 0
0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0
0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0
0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0
0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0
0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0
0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0
0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0
0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0
0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0
0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0
0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0`.split("\n");
const n = 19;
const dirs = {
  row: [
    [0, 1],
    [0, -1],
  ],
  col: [
    [1, 0],
    [-1, 0],
  ],
  dia: [
    [-1, -1],
    [1, 1],
  ],
  dia2: [
    [-1, 1],
    [1, -1],
  ],
};

const isValid = (r, c) => {
  if (r < 0 || c < 0 || r >= n || c >= n) return false;
  return true;
};
const check = (r, c) => {
  let color = input[r][c];
  for (const key of Object.keys(dirs)) {
    let tmp = 1;
    for (const d of dirs[key]) {
      let nr = r;
      let nc = c;
      for (let j = 0; j < 5; j++) {
        nr += d[0];
        nc += d[1];
        if (isValid(nr, nc) && input[nr][nc] === color) {
          tmp++;
        } else break;
      }
    }
    if (tmp === 5) return [color, r, c];
  }
};

const solution = () => {
  input = input.map((el) => el.split(" "));

  for (let c = 0; c < n; c++) {
    for (let r = 0; r < n; r++) {
      if (input[r][c] === "0") continue;
      let winner = check(r, c);
      if (winner) {
        console.log(winner[0]);
        console.log([winner[1] + 1, winner[2] + 1].join(" "));
        return;
      }
    }
  }
  console.log("0");
};

solution();
