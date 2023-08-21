let input = `3 10
..........
..XXX.XXX.
XXX.......`.split("\n");

let rowLen, colLen; // 글로벌 변수
const dirs = [
  [0, 1],
  [1, 0],
  [-1, 0],
  [0, -1],
];

const isValid = (r, c) => {
  if (r < 0 || c < 0 || r >= rowLen || c >= colLen) return false;
  return true;
};

const isSinked = (r, c) => {
  let island = 0;

  for (const d of dirs) {
    const nr = r + d[0];
    const nc = c + d[1];
    const canGo = isValid(nr, nc);
    if (canGo && input[nr][nc] === ".") island++;
    else if (!canGo) island++;
  }

  return island >= 3 ? true : false;
};

const solution = () => {
  //글로벌 변수
  [rowLen, colLen] = input.shift().split(" ").map(Number);
  input = input.map((el) => el.split(""));

  let [mr, mc, Mr, Mc] = [Infinity, Infinity, -Infinity, -Infinity];
  const sinkArr = [];
  for (let r = 0; r < rowLen; r++) {
    for (let c = 0; c < colLen; c++) {
      if (input[r][c] === "X") {
        if (!isSinked(r, c)) {
          mr = Math.min(r, mr);
          mc = Math.min(c, mc);
          Mr = Math.max(r, Mr);
          Mc = Math.max(c, Mc);
        } else sinkArr.push([r, c]);
      }
    }
  }

  sinkArr.forEach(([r, c]) => (input[r][c] = "."));
  const rowInfo = input.slice(mr, Mr + 1);
  rowInfo.forEach((info) => console.log(info.slice(mc, Mc + 1).join("")));
};

solution();

// ..........
// ..XXX.XXX.
// XXX.......

// ..........
// ..XX...X..
// XXX.......
