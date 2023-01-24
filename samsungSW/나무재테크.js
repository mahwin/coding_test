let input = `5 2 6
2 3 2 3 2
2 3 2 3 2
2 3 2 3 2
2 3 2 3 2
2 3 2 3 2
2 1 3
3 2 3`.split("\n");

// let fs = require("fs");
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

const treeBaby = (row, col) => {
  let dx = [-1, -1, -1, 0, 0, 1, 1, 1];
  let dy = [-1, 0, 1, -1, 1, -1, 0, 1];
  for (let i = 0; i < 8; i++) {
    let nr = row + dx[i];
    let nc = col + dy[i];
    if (isValid(nr, nc)) {
      treeBoard[nr][nc] =
        treeBoard[nr][nc] === null ? [1] : [1, ...treeBoard[nr][nc]];
    }
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

while (K--) {
  let deadTrees = [];
  for (let row = 0; row < N; row++) {
    for (let col = 0; col < colLength; col++) {
      let trees = treeBoard[row][col];
      let newTrees = [];
      let eat = 0;
      let index = -1;
      //봄
      if (trees) {
        for (let i = 0; i < trees.length; i++) {
          if (energyBoard[row][col] >= eat + trees[i]) {
            eat += trees[i];
            index = i;
          } else break;
        }
        energyBoard[row][col] -= eat;
        if (index === trees.length - 1) {
          treeBoard[row][col] = treeBoard[row][col].map((el) => el + 1);
        } else deadTrees.push([row, col, index + 1]);
      }
    }
  }

  //여름
  deadTrees.forEach(([row, col, index]) => {
    let trees = treeBoard[row][col];
    let aliveTree = trees.splice(0, index);
    treeBoard[row][col] = aliveTree.map((el) => el + 1);

    energyBoard[row][col] += +trees.map((el) => (el / 2) >> 0);
  });
  //가을
  for (let row = 0; row < N; row++) {
    for (let col = 0; col < colLength; col++) {
      let trees = treeBoard[row][col];

      if (trees) {
        for (let i = 0; i < trees.length; i++) {
          if (trees[i] % 5 === 0) {
            treeBaby(row, col);
          }
        }
      }
    }
  }

  //겨울 영양분 주입
  if (K !== 0) addEnergy();
}

console.log(cntTree());
