function solution(alp, cop, problems) {
  let [maxAlp, maxCop] = [alp, cop];

  problems.forEach((problem) => {
    maxAlp = Math.max(problem[0], maxAlp);
    maxCop = Math.max(problem[1], maxCop);
  });

  const dp = Array.from({ length: maxAlp + 1 }, () =>
    Array.from({ length: maxCop + 1 }, () => Infinity)
  );

  dp[alp][cop] = 0;

  for (let i = alp; i <= maxAlp; i++) {
    //알고력

    for (let j = cop; j <= maxCop; j++) {
      //공부
      if (i < maxAlp) {
        dp[i + 1][j] =
          dp[i][j] + 1 > dp[i + 1][j] ? dp[i + 1][j] : dp[i][j] + 1;
      }
      if (j < maxCop) {
        dp[i][j + 1] =
          dp[i][j + 1] > dp[i][j] + 1 ? dp[i][j] + 1 : dp[i][j + 1];
      }

      //문제이용

      for (const [needA, needC, plusA, plusC, cost] of problems) {
        if (needA <= i && needC <= j) {
          const a = i + plusA > maxAlp ? maxAlp : i + plusA;

          const c = j + plusC > maxAlp ? maxAlp : j + plusC;

          dp[a][c] = dp[i][j] + cost > dp[a][c] ? dp[a][c] : dp[i][j] + cost;
        }
      }
    }
  }

  return dp[maxAlp][maxCop];
}

console.log(
  solution(0, 0, [
    [0, 0, 2, 1, 2],
    [4, 5, 3, 1, 2],
    [4, 11, 4, 0, 2],
    [10, 4, 0, 4, 2],
  ])
);
