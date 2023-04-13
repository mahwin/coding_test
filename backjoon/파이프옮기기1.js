let input = `6
0 0 0 0 0 0
0 1 0 0 0 0
0 0 0 0 0 0
0 0 0 0 0 0
0 0 0 0 0 0
0 0 0 0 0 0`.split("\n");

// let fs = require("fs");
// let input = fs.readFileSync("/dev/stdin").toString().trim().split("\n");

const n = Number(input.shift());
//[3][n][n]   [3] => 가로 세로 대각선 [n][n] => r,c 좌표

input = input.map((el) => el.split(" ").map(Number));

const isValid = (r, c) => {
  if (r < 0 || c < 0 || r >= n || c >= n) return false;
  if (input[r][c]) return false;
  return true;
};

const solution = () => {
  const dp = Array.from({ length: 3 }, () =>
    Array.from({ length: n }, () => Array.from({ length: n }, () => 0))
  );
  dp[0][0][1] = 1;

  for (let r = 0; r < n; r++) {
    for (let c = 0; c < n; c++) {
      if (!isValid(r, c)) continue;
      if (isValid(r, c - 1)) {
        dp[0][r][c] += dp[0][r][c - 1] + dp[2][r][c - 1];
      }
      if (isValid(r - 1, c)) {
        dp[1][r][c] += dp[1][r - 1][c] + dp[2][r - 1][c];
      }
      if (isValid(r - 1, c - 1) && isValid(r - 1, c) && isValid(r, c - 1)) {
        dp[2][r][c] +=
          dp[0][r - 1][c - 1] + dp[2][r - 1][c - 1] + dp[1][r - 1][c - 1];
      }
    }
  }

  console.log(dp[0][n - 1][n - 1] + dp[1][n - 1][n - 1] + dp[2][n - 1][n - 1]);
};

solution();
