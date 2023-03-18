const checkCnt = (board) => {
  let o = 0;
  let x = 0;
  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      if (board[i][j] === ".") continue;
      board[i][j] === "O" ? o++ : x++;
    }
  }

  return [o, x];
};

const checkWinner = (board) => {
  let stack = [];
  let winner = new Set();

  // row 일치 여부 검증
  for (let i = 0; i < 3; i++) {
    stack = [board[i][0]];
    for (let j = 1; j < 3; j++) {
      if (board[i][j] === ".") break;
      else if (board[i][j] === stack[j - 1]) stack.push(board[i][j]);
    }
    if (stack.length === 3) winner.add(stack[0]);
  }
  // col 일치 여부 검증
  for (let i = 0; i < 3; i++) {
    stack = [board[0][i]];
    for (let j = 1; j < 3; j++) {
      if (board[j][i] === ".") break;
      else if (board[j][i] === stack[j - 1]) stack.push(board[j][i]);
    }
    if (stack.length === 3) winner.add(stack[0]);
  }

  // 대각선 검증 남동
  stack = [];
  for (let i = 0; i < 3; i++) {
    if (board[i][i] === ".") break;
    if (!stack.length) {
      stack.push(board[i][i]);
      continue;
    }
    if (stack[i - 1] === board[i][i]) stack.push(board[i][i]);
  }
  stack.length === 3 ? winner.add(stack[0]) : null;

  // 대각선 검증 북동
  stack = [];
  for (let i = 0; i < 3; i++) {
    if (board[2 - i][i] === ".") break;
    if (!stack.length) {
      stack.push(board[2 - i][i]);
      continue;
    }
    if (stack[i - 1] === board[2 - i][i]) stack.push(board[2 - i][i]);
  }
  stack.length === 3 ? winner.add(stack[0]) : null;

  return [...winner];
};

function solution(board) {
  const [o, x] = checkCnt(board);
  const winner = checkWinner(board);
  if (x !== o && o !== x + 1) return 0;
  if (winner.length > 1) return 0;
  if (winner[0] === "O") {
    //o가 승자
    if (o === x + 1) return 1;
    else return 0;
  } else if (winner[0] === "X") {
    //x가 승자
    if (o === x) return 1;
    else return 0;
  }
  return 1;
}
