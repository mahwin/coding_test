let length = 51;

let board = Array.from({ length }, () => Array.from({ length }, () => null));

let parent = Array.from({ length }, (_, row) =>
  Array.from({ length }, (_, col) => [row, col])
);

const getParent = (row, col) => {
  let [nr, nc] = parent[row][col];
  if (nr === row && nc === col) return [nr, nc];
  else return getParent(nr, nc);
};

const update = (row, col, value) => {
  [nr, nc] = getParent(row, col);
  updateAllValue(nr, nc, value);
};
const change = (oldWord, newWord) => {
  for (let row = 1; row < length; row++) {
    for (let col = 1; col < length; col++) {
      if (board[row][col] === oldWord) board[row][col] = newWord;
    }
  }
};

const updateAllParent = (nr1, nc1, nr2, nc2) => {
  for (let i = 1; i < length; i++) {
    for (let j = 1; j < length; j++) {
      const [curR, curC] = parent[i][j];
      if (curR === nr1 && curC === nc1) {
        parent[i][j] = [nr2, nc2];
      }
    }
  }
};

const updateAllValue = (nr1, nc1, value) => {
  for (let i = 1; i < length; i++) {
    for (let j = 1; j < length; j++) {
      const [curR, curC] = parent[i][j];
      if (curR === nr1 && curC === nc1) {
        board[i][j] = value;
      }
    }
  }
};

const merge = ([r1, c1, r2, c2]) => {
  const [nr1, nc1] = getParent(r1, c1);
  const [nr2, nc2] = getParent(r2, c2);

  if (nr1 === nr2 && nc1 === nc2) return;

  const value = board[r1][c1] !== null ? board[r1][c1] : board[r2][c2];

  parent[r2][c2] = [nr1, nc1];

  updateAllParent(nr2, nc2, nr1, nc1);
  updateAllValue(nr1, nc1, value);
};

const unMerge = ([row, col]) => {
  let [pr, pc] = getParent(row, col);
  let value = board[pr][pc];

  for (let i = 1; i < length; i++) {
    for (let j = 1; j < length; j++) {
      let [curR, curC] = getParent(i, j);
      if (curR == pr && curC == pc) {
        parent[i][j] = [i, j];
        board[i][j] = null;
      }
    }
  }
  board[row][col] = value;
};

function solution(commands) {
  let answer = [];

  for (let command of commands) {
    command = command.split(" ");
    if (command[0] === "UPDATE") {
      if (command.length === 4) update(+command[1], +command[2], command[3]);
      if (command.length !== 4) change(command[1], command[2]);
    }
    if (command[0] === "MERGE") merge(command.slice(1).map(Number));
    if (command[0] === "UNMERGE") unMerge(command.slice(1).map(Number));
    if (command[0] === "PRINT") {
      [row, col] = command.slice(1).map(Number);
      const [pr, pc] = getParent(row, col);
      const value = board[pr][pc];
      value === null ? answer.push("EMPTY") : answer.push(value);
    }
  }

  return answer;
}

console.log(
  solution([
    "UPDATE 1 1 menu",
    "UPDATE 1 2 category",
    "UPDATE 2 1 bibimbap",
    "UPDATE 2 2 korean",
    "UPDATE 2 3 rice",
    "UPDATE 3 1 ramyeon",
    "UPDATE 3 2 korean",
    "UPDATE 3 3 noodle",
    "UPDATE 3 4 instant",
    "UPDATE 4 1 pasta",
    "UPDATE 4 2 italian",
    "UPDATE 4 3 noodle",
    "MERGE 1 2 1 3",
    "MERGE 1 3 1 4",
    "UPDATE korean hansik",
    "UPDATE 1 3 group",
    "UNMERGE 1 4",
    "PRINT 1 3",
    "PRINT 1 4",
  ])
);
