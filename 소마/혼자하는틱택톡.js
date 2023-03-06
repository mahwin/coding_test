const cnt = (board) => {
  let score = [0, 0];
  board.forEach((el) => {
    for (let i = 0; i < 3; i++) {
      if (el[i] == "X") score[1]++;
      else if (el[i] == "O") score[0]++;
    }
  });
  return score;
};

const findWinner = (board) => {
  const winner = new Set();
  for (let i = 0; i < 3; i++) {
    let rowstack = [board[i][0]];
    let colStack = [board[i][0]];
    for (let j = 1; j < 3; j++) {
      if (rowstack[j - 1] === board[i][j]) {
        rowstack.push(board[i][j]);
      }
      if (colStack[j - 1] === board[j][i]) {
        colStack.push(board[i][j]);
      }
    }
    if (rowstack.length === 3) winner.add(rowstack[0]);
    if (colStack.length === 3) winner.add(colStack[0]);
  }
  let stack = [board[0][0]];
  let bStack = [board[0][2]];
  for (let i = 1; i < 3; i++) {
    if (stack[i - 1] === board[i][i]) {
      stack.push(board[i][i]);
    }
    if (bStack[i - 1] === board[i][2 - i]) bStack.push(board[i][i]);
  }
  if (stack.length === 3) winner.add(stack[0]);
  if (bStack.length === 3) winner.add(bStack[0]);

  return winner.size > 1 ? 0 : 1;
};

function solution(board) {
  // o가 하나 x랑 하나 더 많거나 같아야함
  // 승자가 있으면 승자가 두명이면 안 됨
  // o가 승자면 o >= x;
  // x가 승자면 o =  x;
  const score = cnt(board);
  if (score[1] > score[0]) return 0;
  return findWinner(board);
}

["O.X", ".O.", "..X"];
// ["OOO", "...", "XXX"]	0
// ["...", ".X.", "..."]	0
// ["...", "...", "..."]	1

console.log(solution(["OOO", ".O.", "XXX"]));
