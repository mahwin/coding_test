function solution1(board, moves) {
  let answer = 0;
  let backet = [];
  let colValues = Array.from({ length: board.length }, () => []);

  for (let row = 0; row < board.length; row++) {
    for (let col = 0; col < board.length; col++) {
      if (0 !== board[row][col]) {
        colValues[col].push(board[row][col]);
      }
    }
  }
  moves.forEach((move) => {
    let colValue = colValues[move - 1];
    if (colValue.length !== 0) {
      backet.push(colValue[0]);
      colValues[move - 1] = colValue.slice(1);
    }
  });

  for (let i = 0; i < backet.length - 1; i++) {
    if (backet[i] === backet[i + 1]) {
      answer += 2;
      backet = backet.slice(0, i).concat(backet.slice(i + 2));
      i = -1;
    }
  }

  return answer;
}
