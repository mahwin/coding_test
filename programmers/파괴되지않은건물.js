//2차원 누적합
function solution(board, skill) {
  const [rowLen, colLen] = [board.length, board[0].length];
  const accBoard = Array.from({ length: rowLen + 1 }, () =>
    Array.from({ length: colLen + 1 }, () => 0)
  );
  skill.forEach(([type, r1, c1, r2, c2, degree]) => {
    const d = type === 1 ? -degree : degree;
    accBoard[r1][c1] += d;
    accBoard[r1][c2 + 1] -= d;
    accBoard[r2 + 1][c1] -= d;
    accBoard[r2 + 1][c2 + 1] += d;
  });

  // acc 행 방향 합
  for (let r = 0; r < rowLen; r++) {
    for (let c = 1; c < colLen; c++) {
      accBoard[r][c] += accBoard[r][c - 1];
    }
  }
  // acc 열 방향 합
  for (let c = 0; c < colLen; c++) {
    for (let r = 1; r < rowLen; r++) {
      accBoard[r][c] += accBoard[r - 1][c];
    }
  }
  // 스킬의 합과 건물 초기 내구도 비교
  let result = 0;
  for (let r = 0; r < rowLen; r++) {
    for (let c = 0; c < colLen; c++) {
      if (accBoard[r][c] + board[r][c] > 0) result++;
    }
  }

  return result;
}
