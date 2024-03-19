`문제 : 쿼터 (25센트) 다임(10센트) 니켈(5센트) 페니(1센트)가 무한히 있다. 이 때 n센트를 나타내는 방법의 수를 구하라`;

function solution(n) {
  const coins = [1, 5, 10, 25];
  const dp = Array.from({ length: n + 1 }, () => 0);
  dp[0] = 1;

  for (let coin of coins) {
    for (let i = coin; i <= n; i++) {
      dp[i] += dp[i - coin];
    }
  }

  return dp[n];
}
