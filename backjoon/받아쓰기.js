// const fs = require("fs");
// let input = fs.readFileSync("/dev/stdin").toString().split("\n");

let input = `5 8
taken
fishcake`.split("\n");

const solution = () => {
  const [rowLen, colLen] = input[0].split(" ").map(Number);
  const dp = Array.from({ length: rowLen + 1 }, () =>
    Array.from({ length: colLen + 1 }, () => 0)
  );
  for (let r = 1; r <= rowLen; r++) {
    dp[r][0] = r;
  }
  for (let c = 1; c <= colLen; c++) {
    dp[0][c] = c;
  }

  for (let i = 1; i <= rowLen; i++) {
    for (let j = 1; j <= colLen; j++) {
      if (input[1][i - 1] === input[2][j - 1]) dp[i][j] = dp[i - 1][j - 1];
      else if (input[1][i - 1] == "i" && ["j", "l"].includes(input[2][j - 1]))
        dp[i][j] = dp[i - 1][j - 1];
      else if (input[1][i - 1] == "v" && input[2][j - 1] == "w")
        dp[i][j] = dp[i - 1][j - 1];
      else {
        dp[i][j] = Math.min(dp[i - 1][j], dp[i][j - 1], dp[i - 1][j - 1]) + 1;
      }
    }
  }

  return dp[rowLen][colLen];
};

console.log(solution());
