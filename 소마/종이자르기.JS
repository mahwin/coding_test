let input = `10 8
3
0 3
1 4
0 2`.split("\n");
[rowLength, colLength] = input.shift().split(" ").map(Number);
const trials = input.shift();
boardArr = [[0, 0, colLength, rowLength]];

for (let i = 0; i < trials; i++) {
  [isCol, idx] = input[i].split(" ").map(Number);
  if (isCol) {
    let copyBoard = [];
    boardArr.forEach(([r1, c1, r2, c2]) => {
      if (c1 < idx && c2 > idx) {
        copyBoard.push([r1, c1, r2, idx]);
        copyBoard.push([r1, idx, r2, c2]);
      } else copyBoard.push([r1, c1, r2, c2]);
    });
    boardArr = copyBoard.map((el) => [...el]);
  } else {
    let copyBoard = [];
    boardArr = boardArr.map(([r1, c1, r2, c2]) => {
      if (r1 < idx && r2 > idx) {
        copyBoard.push([r1, c1, idx, c2]);
        copyBoard.push([idx, c1, r2, c2]);
      } else copyBoard.push([r1, c1, r2, c2]);
    });
    boardArr = copyBoard.map((el) => [...el]);
  }
}

const calWidth = (boardArr) => {
  let max = -Infinity;
  boardArr.forEach(([r1, c1, r2, c2]) => {
    let cal = (r2 - r1) * (c2 - c1);
    max = Math.max(cal, max);
  });
  return max;
};

console.log(calWidth(boardArr));
