function solution(m, n, puddles) {
  const dp = Array.from({ length: n + 1 }, () =>
    Array.from({ length: m + 1 }, () => 0)
  );
  dp[1][1] = 1;
  puddles.forEach(([a, b]) => (dp[a][b] = -1));

  for (let row = 1; row <= n; row++) {
    for (let col = 1; col <= m; col++) {
      if (row === 1 && col === 1) continue;
      if (dp[row][col] === -1) continue;
      else
        dp[row][col] +=
          (dp[row - 1][col] === -1 ? 0 : dp[row - 1][col]) +
          (dp[row][col - 1] === -1 ? 0 : dp[row][col - 1]);
    }
  }
  console.log(dp);
  return dp[n][m];
}

console.log(solution(4, 3, [[2, 2]]));

// for i in range(1, n + 1):
//         for j in range(1, m + 1):
//             if i == 1 and j == 1: continue
//             if [i, j] in puddles:    # 웅덩이 위치의 경우 값을 0으로
//                 dp[i][j] = 0
//             else:                    # 현재 칸은 왼쪽 칸, 위 칸의 합산!
//                 dp[i][j] = (dp[i - 1][j] + dp[i][j - 1]) % 1000000007
//     return dp[n][m]
