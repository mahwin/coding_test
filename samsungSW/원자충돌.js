const readline = require("readline");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

let dirs = [
  [-1, 0],
  [-1, 1],
  [0, 1],
  [1, 1],
  [1, 0],
  [1, -1],
  [0, -1],
  [-1, -1],
]; // ↑, ↗, →, ↘, ↓, ↙, ←, ↖

const ewsnDirs = [0, 2, 4, 6]; //동서남북
const diagonalDirs = [1, 3, 5, 7]; //대각선

let input = [];
let n, atomNum, k; // n X n 격자, atomNum 원자 수, k 실험 시간.
let atoms = [];

rl.on("line", (line) => {
  input.push(line.trim());
});

rl.on("close", () => {
  solution();
  process.exit();
});

const move = () => {
  const dupleObj = {};
  const dupleSet = new Set();
  let newAtoms = [];

  atoms.forEach(([r, c, m, s, d]) => {
    const nr = (r + dirs[d][0] * s + s * n) % n;
    const nc = (c + dirs[d][1] * s + s * n) % n;

    const key = [nr, nc].join(",");
    if (dupleObj[key]) {
      dupleSet.add(key);
      dupleObj[key][0] += m;
      dupleObj[key][1] += s;
    } else {
      dupleObj[key] = [m, s];
      newAtoms.push([nr, nc, m, s, d]);
    }
  });

  // 겹침이 없었던 위치의 원자는 필터.
  atoms = [];
  atoms = newAtoms.filter(([r, c, ...info]) => {
    const key = [r, c].join(",");
    return dupleSet.has(key) ? false : true;
  });

  [...dupleSet].forEach((key) => {
    const [r, c] = key.split(",").map(Number);
    let [m, s] = dupleObj[key];
    m = Math.floor(m / 5);
    s = Math.floor(s/ )
    if (m > 0) {
      let nextDirs = canGoESWN(r, c) ? ewsnDirs : diagonalDirs;
      nextDirs.forEach((nextD) => atoms.push([r, c, m, s, nextD]));
    }
  });
};

const sumAtom = () => {
  let result = 0;
  atoms.forEach((info) => {
    result += info[2];
  });
  console.log(result);
};

const solution = () => {
  [n, atomNum, k] = input[0].split(" ").map(Number);

  for (let i = 1; i <= atomNum; i++) {
    const [r, c, m, s, d] = input[i].split(" ").map(Number);
    atoms.push([r - 1, c - 1, m, s, d]);
  }

  while (k--) {
    move();
    console.log(atoms);
  }
  console.log(atoms);
  sumAtom();
};
