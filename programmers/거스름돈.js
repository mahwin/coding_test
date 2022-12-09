function solution(n, money) {
  const dp = Array.from({ length: n + 1 }).fill(0);

  dp[0] = 1;

  for (let el of money) {
    for (let i = el; i < n + 1; i++) {
      dp[i] += dp[i - el];
    }
  }
  console.log(dp);
  return dp[n] % 1000000007;
}

solution(5, [1, 2, 5]);
