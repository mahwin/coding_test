const D = 1_000_000_007;

function solution(n, money) {
  //dp[n]은 n원을 만들 수 있는 동전의 조합 수를 의미함.
  const dp = Array.from({ length: n + 1 }, () => 0);

  dp[0] = 1; // 코인과 거스름돈의 가격이 같을때, total-money ===0  1을 더 해주기 위해

  for (const coin of money) {
    for (let total = 1; total <= n; total++) {
      if (total - coin >= 0) {
        dp[total] += dp[total - coin] % D;
      }
    }
  }
  return dp[n];
}
