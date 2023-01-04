function solution(board, skill) {
  let answer = 0;

  const accSumBoard = Array.from({ length: board.length + 1 }, () =>
    Array.from({ length: board[0].length + 1 }, () => 0)
  );

  skill.forEach(([type, r1, c1, r2, c2, degree]) => {
    type === 1 ? (degree *= -1) : null;

    accSumBoard[r1][c1] += degree;
    accSumBoard[r1][c2 + 1] += -degree;
    accSumBoard[r2 + 1][c1] += -degree;
    accSumBoard[r2 + 1][c2 + 1] += degree;
  });

  // 가로 방향 누적합
  for (let row = 0; row < accSumBoard.length; row++) {
    for (let col = 1; col < accSumBoard[0].length; col++) {
      accSumBoard[row][col] += accSumBoard[row][col - 1];
    }
  }

  // 세로 방향 누적합
  for (let row = 1; row < accSumBoard.length; row++) {
    for (let col = 0; col < accSumBoard[0].length; col++) {
      accSumBoard[row][col] += accSumBoard[row - 1][col];
    }
  }

  board.forEach((rowInfo, rowIdx) =>
    rowInfo.forEach((info, colIdx) => {
      if (accSumBoard[rowIdx][colIdx] + info > 0) answer++;
    })
  );

  return answer;
}

console.log(
  solution(
    [
      [5, 5, 5, 5, 5],
      [5, 5, 5, 5, 5],
      [5, 5, 5, 5, 5],
      [5, 5, 5, 5, 5],
    ],
    [
      [1, 0, 0, 3, 4, 4],
      [1, 2, 0, 2, 3, 2],
      [2, 1, 0, 3, 1, 2],
      [1, 0, 1, 3, 3, 1],
    ]
  )
);
