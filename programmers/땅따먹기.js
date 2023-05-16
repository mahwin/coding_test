function solution(land) {
  let len = land.length;
  let canChoice = [
    [1, 2, 3],
    [0, 2, 3],
    [0, 1, 3],
    [0, 1, 2],
  ];
  const dp = Array.from({ length: len }, () =>
    Array.from({ length: 4 }, () => 0)
  );
  dp[0] = land[0];

  for (let i = 1; i < len; i++) {
    for (let j = 0; j < 4; j++) {
      const [a, b, c] = canChoice[j];
      dp[i][j] =
        Math.max(dp[i - 1][a], dp[i - 1][b], dp[i - 1][c]) + land[i][j];
    }
  }
  return Math.max(...dp[len - 1]);
}
