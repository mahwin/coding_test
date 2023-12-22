let input = `1
5 50`.split("\n");

const solution = () => {
  const TEST_NUM = Number(input.shift());
  input = input.map((el) => el.split(" ").map(Number));
  const MAX_N = Math.max(...input.map((el) => el[0]));
  const MAX_M = Math.max(...input.map((el) => el[1]));

  const dp = [];

  for (let i = 0; i <= MAX_N; i++) {
    dp.push(Array.from({ length: MAX_M + 1 }, () => 0));
  }

  dp[1] = Array.from({ length: MAX_M + 1 }, (_, i) => i);

  for (let i = 2; i <= MAX_N; i++) {
    for (let j = 2; j <= MAX_M; j++) {
      dp[i][j] = dp[i - 1][Math.floor(j / 2)] + dp[i][j - 1];
    }
  }
  let result = ``;
  for (let test = 0; test < TEST_NUM; test++) {
    const [N, M] = input[test];
    result += dp[N][M] + "\n";
  }
  console.log(result.trim());
};

solution();
