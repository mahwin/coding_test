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
let atoms = [];
let n, m, k;
let atomMap, dupleMap;

rl.on("line", (line) => {
  input.push(line.trim());
});

rl.on("close", () => {
  solution();
  process.exit();
});

//원자들의 이동
const move = () => {
  atomMap = new Map();
  dupleMap = new Map();

  atoms.forEach(([r, c, m, s, d]) => {
    const nr = (r + dirs[d][0] * s + n * s) % n;
    const nc = (c + dirs[d][1] * s + n * s) % n;
    const key = [nr, nc].join(",");
    if (!dupleMap.has(key) && !atomMap.has(key)) {
      //최초의 원소
      atomMap.set(key, [m, s, d]);
    } else if (atomMap.has(key)) {
      //아톰에 값이 있으니까 얘는 atom 값은 지우고 중첩으로 올려줌
      const info = atomMap.get(key);
      atomMap.delete(key);
      dupleMap.set(key, [m + info[0], s + info[1], 2, [d, info[2]]]);
    } else {
      const info = dupleMap.get(key);
      dupleMap.set(key, [
        m + info[0],
        s + info[1],
        info[2] + 1,
        info[3].concat(d),
      ]);
    }
  });
  atoms = [];
  for (const [key, value] of atomMap.entries()) {
    const [r, c] = key.split(",").map(Number);
    atoms.push([r, c, ...value]);
  }
};

const isENWS = (ds) => {
  const newDs = ds.filter((el) => ewsnDirs.includes(el));
  if (newDs.length === ds.length || !newDs.length) return true;
  return false;
};

const dupleAtom = () => {
  for (const [key, value] of dupleMap.entries()) {
    // value  [무게 합, 속도 합, 몇 개의 원소, 각 원소들의 방향들]
    const [r, c] = key.split(",").map(Number);
    const [totalM, totalS, cnt, ds] = value;
    let eachM = Math.floor(totalM / 5);
    if (eachM > 0) {
      let eachS = Math.floor(totalS / cnt);
      let newD = isENWS(ds) ? ewsnDirs : diagonalDirs;
      newD.forEach((d) => atoms.push([r, c, eachM, eachS, d]));
    }
  }
};

const cntWeight = () => {
  let result = 0;
  atoms.forEach((info) => {
    result += info[2];
  });
  console.log(result);
};

const solution = () => {
  [n, m, k] = input[0].split(" ").map(Number);
  //초기 원소 넣기
  for (let i = 1; i <= m; i++) {
    const [r, c, ...remain] = input[i].split(" ").map(Number);
    atoms.push([r - 1, c - 1, ...remain]);
  }

  while (k--) {
    move();
    dupleAtom();
  }

  cntWeight();
};
