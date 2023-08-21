// const readline = require("readline");

// const rl = readline.createInterface({
//   input: process.stdin,
//   output: process.stdout,
// });
// let input = [];

// rl.on("line", (line) => {
//   input.push(line);
// });

// rl.on("close", () => {
//   solution();
//   console.log(result.trim());
//   process.exit();
// });

const fs = require("fs");
let input = fs.readFileSync("./data//data.txt").toString().split("\n");

let friend = []; // [nameIdx, 연결된 수]
let nameIdxMap = new Map();
let result = "";

const solution = () => {
  const n = input[0];

  let inputIdx = 0;
  for (let i = 0; i < n; i++) {
    inputIdx += 1;
    const k = input[inputIdx];
    init(k);

    for (let j = 0; j < k; j++) {
      inputIdx++;

      const [nameA, nameB] = input[inputIdx].split(" ");
      const aIdx = getNameIndex(nameA);
      const bIdx = getNameIndex(nameB);
      union(aIdx, bIdx);
    }
  }
};

const getNameIndex = (name) => {
  if (!nameIdxMap.has(name)) nameIdxMap.set(name, nameIdxMap.size);
  return nameIdxMap.get(name);
};

const getP = (idx) => {
  if (idx === friend[idx][0]) return idx;
  else {
    friend[idx][0] = getP(friend[idx][0]);
    return friend[idx][0];
  }
};

const union = (aIdx, bIdx) => {
  const aP = getP(aIdx);
  const bP = getP(bIdx);
  if (aP !== bP) {
    if (aP < bP) {
      friend[bP][0] = [aP];
      friend[aP][1] += friend[bP][1];
      result += friend[aP][1] + "\n";
    } else {
      friend[aP][0] = [pP];
      friend[bP][1] += friend[aP][1];
      result += friend[bP][1] + "\n";
    }
  } else result += friend[aP][1] + "\n";
};

const init = (k) => {
  //초기화
  friend = Array.from({ length: k * 2 }, (_, i) => [i, 1]); //연결된 최상위 노드, 연결된 수 !
  nameIdxMap = new Map();
};

solution();
console.log(result.trim());
