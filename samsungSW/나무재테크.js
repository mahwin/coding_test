let input = `5 2 200000
2 3 2 3 2
2 3 2 3 2
2 3 2 3 2
2 3 2 3 2
2 3 2 3 2
2 1 3
3 2 3`.split("\n");

let fs = require("fs");
// let input = fs.readFileSync("/dev/stdin").toString().split("\n");
let [N, M, K] = input.shift().split(" ").map(Number);

let colLength = input[0].split(" ").length;
const addEnergyBoard = Array.from({ length: N }, () =>
  Array.from({ length: colLength }, () => 0)
);

const treeBoard = Array.from({ length: N }, () =>
  Array.from({ length: colLength }, () => null)
);

for (let i = 0; i < N; i++) {
  let energyArr = input[i].split(" ").map(Number);
  for (let j = 0; j < colLength; j++) {
    addEnergyBoard[i][j] = energyArr[j];
  }
}

for (let i = N; i < N + M; i++) {
  let [row, col, old] = input[i].split(" ").map(Number);
  treeBoard[row - 1][col - 1] = [old];
}

let energyBoard = addEnergyBoard.map((el) =>
  Array.from({ length: el.length }, () => 5)
);

const isValid = (row, col) => {
  if (row < 0 || row >= N || col < 0 || col >= colLength) return false;
  return true;
};

const treeBaby = (babyCnt) => {
  let dx = [-1, -1, -1, 0, 0, 1, 1, 1];
  let dy = [-1, 0, 1, -1, 1, -1, 0, 1];
  let babyObj = {};
  let keys = Object.keys(babyCnt);
  for (let key of keys) {
    let len = babyCnt[key];
    let [row, col] = key.split(",").map(Number);
    for (let i = 0; i < 8; i++) {
      let nr = row + dx[i];
      let nc = col + dy[i];
      if (isValid(nr, nc)) {
        let key = [nr, nc].join(",");

        if (babyObj[key]) {
          babyObj[key].push(...Array.from({ length: len }, () => 1));
        } else {
          babyObj[key] = Array.from({ length: len }, () => 1);
        }
      }
    }
  }

  keys = Object.keys(babyObj);
  for (let key of keys) {
    let [row, col] = key.split(",");

    treeBoard[row][col] = treeBoard[row][col]
      ? [...babyObj[key], ...treeBoard[row][col]]
      : [...babyObj[key]];
  }
};
const addEnergy = () => {
  for (let row = 0; row < N; row++) {
    for (let col = 0; col < colLength; col++) {
      energyBoard[row][col] += addEnergyBoard[row][col];
    }
  }
};

const cntTree = () => {
  let cnt = 0;
  for (let row = 0; row < N; row++) {
    for (let col = 0; col < colLength; col++) {
      if (treeBoard[row][col]) {
        cnt += treeBoard[row][col].length;
      }
    }
  }
  return cnt;
};
let babyCnt = {};

while (K--) {
  for (let row = 0; row < N; row++) {
    for (let col = 0; col < colLength; col++) {
      let trees = treeBoard[row][col];
      let eat = 0;
      let deadEnergy = 0;
      let index = -1;
      //봄
      if (trees) {
        for (let i = 0; i < trees.length; i++) {
          if (energyBoard[row][col] >= eat + trees[i]) {
            eat += trees[i];
            treeBoard[row][col][i]++;
            index = i;
            if (treeBoard[row][col][i] % 5 === 0) {
              let key = [row, col].join(",");
              babyCnt[key] = babyCnt[key] ? babyCnt[key] + 1 : 1;
            }
          } else {
            deadEnergy += Math.floor(trees[i] / 2);
          }
        }
        if (index < trees.length - 1) {
          treeBoard[row][col] = [...treeBoard[row][col].slice(0, index + 1)];
        }

        //여름
        energyBoard[row][col] += deadEnergy - eat;
      }
    }
  }

  //가을
  treeBaby(babyCnt);
  babyCnt = {};

  //겨울 영양분 주입
  if (K === 0) break;
  addEnergy();
}

console.log(cntTree());
