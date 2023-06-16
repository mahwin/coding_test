function solution(alp, cop, problems) {
  let maxAlp = alp;
  let maxCop = cop;
  for (let i = 0; i < problems.length; i++) {
    maxAlp = Math.max(maxAlp, problems[i][0]);
    maxCop = Math.max(maxCop, problems[i][1]);
  }

  const dp = Array.from({ length: maxAlp + 1 }, () =>
    Array.from({ length: maxCop + 1 }, () => Infinity)
  );

  dp[alp][cop] = 0;

  for (let i = alp; i <= maxAlp; i++) {
    for (let j = cop; j <= maxCop; j++) {
      if (i + 1 <= maxAlp)
        dp[i + 1][j] =
          dp[i + 1][j] < dp[i][j] + 1 ? dp[i + 1][j] : dp[i][j] + 1;
      if (j + 1 <= maxCop)
        dp[i][j + 1] =
          dp[i][j + 1] < dp[i][j] + 1 ? dp[i][j + 1] : dp[i][j] + 1;
      for (let [alp_req, cop_req, alp_rwd, cop_rwd, cost] of problems) {
        if (i >= alp_req && j >= cop_req) {
          const nAlpIdx = i + alp_rwd <= maxAlp ? i + alp_rwd : maxAlp;
          const nCopIdx = j + cop_rwd <= maxCop ? j + cop_rwd : maxCop;
          dp[nAlpIdx][nCopIdx] =
            dp[nAlpIdx][nCopIdx] < dp[i][j] + cost
              ? dp[nAlpIdx][nCopIdx]
              : dp[i][j] + cost;
        }
      }
    }
  }

  return dp[maxAlp][maxCop];
}
