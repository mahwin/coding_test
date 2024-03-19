// const fs = require("fs");
// let input = fs.readFileSync("/dev/stdin").toString().trim();

let input = `12`;

const solution = () => {
  const n = +input;
  // [n] [1x2, 2x1, 2x2]
  const dp = Array.from({ length: n + 1 }, () => [0, 1, 0]);

  for (let i = 2; i <= n; i++) {
    dp[i][1] = (dp[i - 1][0] + dp[i - 1][1] + dp[i - 1][2]) % 10007;
    dp[i][0] = (dp[i - 2][0] + dp[i - 2][1] + dp[i - 2][2]) % 10007;
    dp[i][2] = (dp[i - 2][0] + dp[i - 2][1] + dp[i - 2][2]) % 10007;
  }
  return dp[n].reduce((acc, cur) => acc + cur, 0) % 10007;
};

console.log(solution());
