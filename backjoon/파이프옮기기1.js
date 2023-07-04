// let input = `6
// 0 0 0 0 0 0
// 0 1 0 0 0 0
// 0 0 0 0 0 0
// 0 0 0 0 0 0
// 0 0 0 0 0 0
// 0 0 0 0 0 0`.split("\n");

let fs = require("fs");
let input = fs.readFileSync("/dev/stdin").toString().trim().split("\n");

const isValid = (r, c, n) => {
  if (r < 0 || c < 0 || r >= n || c >= n) return false;
  if (input[r][c] === "0") return true;
  return false;
};

const solution = () => {
  const n = Number(input.shift());
  // r 값, c 값, 방향  dp[r][c][d] = 이 방향으로 도착한 가짓수 d : [0:가로,1:세로,2:대각선]
  const dp = Array.from({ length: n }, () =>
    Array.from({ length: n }, () => Array.from({ length: 3 }, () => 0))
  );

  input = input.map((el) => el.split(" "));

  dp[0][1][0] = 1;

  for (let r = 0; r < n; r++) {
    for (let c = 0; c < n; c++) {
      if (input[r][c] == "1") continue;
      // 가로
      if (isValid(r, c - 1) && isValid(r, c - 2)) {
        dp[r][c][0] += dp[r][c - 1][0];
        if (isValid(r - 1, c - 2) && isValid(r - 1, c - 1)) {
          dp[r][c][0] += dp[r][c - 1][2];
        }
      }

      //세로
      if (isValid(r - 1, c) && isValid(r - 2, c)) {
        dp[r][c][1] += dp[r - 1][c][1];
        if (isValid(r - 1, c - 1) && isValid(r - 2, c - 1)) {
          dp[r][c][1] += dp[r - 1][c][2];
        }
      }
      //대각선
      if (isValid(r - 1, c) && isValid(r, c - 1) && isValid(r - 1, c - 1)) {
        if (isValid(r - 1, c - 2)) {
          dp[r][c][2] += dp[r - 1][c - 1][0];
        }
        if (isValid(r - 2, c - 1)) {
          dp[r][c][2] += dp[r - 1][c - 1][1];
        }
        if (
          isValid(r - 1, c - 2) &&
          isValid(r - 2, c - 1) &&
          isValid(r - 2, c - 2)
        ) {
          dp[r][c][2] += dp[r - 1][c - 1][2];
        }
      }
    }
  }

  return dp[n - 1][n - 1].reduce((p, c) => (p += c), 0);
};

console.log(solution());
