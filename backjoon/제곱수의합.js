let input = `4`;

const solution = () => {
  const MAX_LEN = 100_000;
  const dp = Array.from({ length: MAX_LEN + 1 }, (_, i) => i);

  for (let i = 1; i <= MAX_LEN; i++) {
    for (let j = 1; j <= Math.sqrt(i); j++) {
      const square = j * j;

      dp[i] = Math.min(dp[i - square] + 1, dp[i]);
    }
  }
  console.log(dp[Number(input)]);
};

solution();
