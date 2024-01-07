let input = `abcdefghijklmn
bdefg
efg`.split("\n");

const solution = () => {
  let [A, B, C] = input;

  const dp = Array.from({ length: A.length + 1 }, () =>
    Array.from({ length: B.length + 1 }, () =>
      Array.from({ length: C.length + 1 }, () => 0)
    )
  );

  for (let i = 1; i <= A.length; i++) {
    for (let j = 1; j <= B.length; j++) {
      for (let k = 1; k <= C.length; k++) {
        if (A[i - 1] === B[j - 1] && A[i - 1] === C[k - 1]) {
          dp[i][j][k] = dp[i - 1][j - 1][k - 1] + 1;
        } else {
          dp[i][j][k] = Math.max(
            dp[i - 1][j][k],
            dp[i][j - 1][k],
            dp[i][j][k - 1]
          );
        }
      }
    }
  }
  return dp[A.length][B.length][C.length];
};

console.log(solution());
