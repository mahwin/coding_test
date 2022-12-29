function solution(matrix_sizes) {
  const maxLength = matrix_sizes.length;
  const dp = Array.from({ length: maxLength + 1 }, () =>
    Array(maxLength + 1).fill(0)
  );

  matrix_sizes = [[0, 0], ...matrix_sizes];

  for (let i = 1; i < maxLength; i++) {
    for (let x = 1; x + i <= maxLength; x++) {
      dp[x][x + i] = Infinity;
    }
  }

  for (let i = 0; i < maxLength; i++) {
    for (let j = 0; j + i <= maxLength; j++) {
      let a = j;
      let b = j + i;
      if (a == b) dp[a][b] = 0;
      else {
        for (let k = a; k < b; k++) {
          dp[a][b] = Math.min(
            dp[a][b],
            dp[a][k] +
              dp[k + 1][b] +
              matrix_sizes[a][0] * matrix_sizes[k][1] * matrix_sizes[b][1]
          );
        }
      }
    }
  }

  return dp[1][maxLength];
}
solution([
  [5, 3],
  [3, 10],
  [10, 6],
]);
