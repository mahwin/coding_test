function solution(land) {
  const COL_LEN = 4;
  const ROW_LEN = land.length;
  const dp = Array.from({ length: ROW_LEN }, () =>
    Array.from({ length: COL_LEN }, () => 0)
  );
  dp[0] = [...land[0]];

  for (let i = 1; i < ROW_LEN; i++) {
    for (let j = 0; j < COL_LEN; j++) {
      let max = 0;
      for (let k = 0; k < COL_LEN; k++) {
        if (j === k) continue;
        max = Math.max(max, dp[i - 1][k]);
      }

      dp[i][j] = land[i][j] + max;
    }
  }

  return Math.max(...dp.at(-1));
}
