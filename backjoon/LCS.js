let input = `ACAYKP
CAPCAK`.split("\n");

const solution = () => {
  const [A, B] = input;

  const aLen = A.length;
  const bLen = B.length;

  const dp = Array.from({ length: aLen + 1 }, () =>
    Array.from({ length: bLen + 1 }, () => 0)
  );
  for (let i = 1; i <= aLen; i++) {
    for (let j = 1; j <= bLen; j++) {
      if (A[i - 1] === B[j - 1]) {
        dp[i][j] = dp[i - 1][j - 1] + 1;
      } else {
        dp[i][j] = Math.max(dp[i - 1][j], dp[i][j - 1]);
      }
    }
  }
  return dp[aLen][bLen];
};

console.log(solution());
