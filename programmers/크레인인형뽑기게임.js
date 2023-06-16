function solution(board, moves) {
  const rowLen = board.length;
  const colLen = board.length;
  const flipBoard = Array.from({ length: colLen }, () =>
    Array.from({ length: rowLen })
  );
  for (let r = 0; r < rowLen; r++) {
    for (let c = 0; c < colLen; c++) {
      flipBoard[c][rowLen - r - 1] = board[r][c];
    }
  }
  let dolls = [];
  moves.forEach((move) => {
    for (let i = rowLen - 1; i >= 0; i--) {
      if (flipBoard[move - 1][i] !== 0) {
        dolls.push(flipBoard[move - 1][i]);
        flipBoard[move - 1][i] = 0;
        break;
      }
    }
  });
  let result = 0;
  let stack = [];

  for (let i = 0; i < dolls.length; i++) {
    stack.push(dolls[i]);
    while (stack.length >= 2 && stack.at(-2) === stack.at(-1)) {
      result += 2;
      stack.pop();
      stack.pop();
    }
  }
  return result;
}
