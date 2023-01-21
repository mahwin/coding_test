function solution(m) {
  const { length } = m;
  const dp = Array.from({ length: length + 1 }, () =>
    Array.from({ length: length + 1 }, () => 0)
  );

  for (let n = 1; n <= length; n++) {
    for (let i = 0; i < length - n; i++) {
      let init = i;
      let last = n + i;
      for (let k = init; k < last; k++) {
        if (dp[init][last] === 0) {
          dp[init][last] =
            dp[init][k] + dp[k + 1][last] + m[init][0] * m[k][1] * m[last][1];
        }
        dp[init][last] = Math.min(
          dp[init][last],
          dp[init][k] + dp[k + 1][last] + m[init][0] * m[k][1] * m[last][1]
        );
      }
    }
  }

  return dp[0][length - 1];
}
solution([
  [5, 3],
  [3, 10],
  [10, 6],
]);
