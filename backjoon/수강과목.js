let input = `80 3
650 40
700 60
60 40`.split("\n");

const parser = (info) => info.split(" ").map(Number);

//단순한 냅색 문제
const solution = () => {
  const [n, k] = parser(input[0]);
  const dp = Array.from({ length: k + 1 }, () =>
    Array.from({ length: n + 1 }, () => 0)
  );

  for (let i = 1; i <= k; i++) {
    const [value, time] = parser(input[i]);
    for (let j = 0; j <= n; j++) {
      if (j < time) {
        dp[i][j] = dp[i - 1][j];
      } else {
        dp[i][j] = Math.max(dp[i - 1][j], dp[i - 1][j - time] + value);
      }
    }
  }
  console.log(dp[k][n]);
};

solution();
