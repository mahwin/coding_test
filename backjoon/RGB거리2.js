const fs = require("fs");
let input = fs.readFileSync("/dev/stdin").toString().trim().split("\n");
// 원형을 시작 점을 고정해서 선형으로 접근하자

const solution = (input) => {
  const n = +input.shift();
  input = input.map((el) => el.split(" ").map(Number));

  let result = Infinity;
  for (let i = 0; i < 3; i++) {
    const dp = Array.from({ length: n }, () =>
      Array.from({ length: 3 }, () => Infinity)
    );
    dp[0][i] = input[0][i];
    for (let j = 1; j < n; j++) {
      dp[j][0] = Math.min(dp[j - 1][1], dp[j - 1][2]) + input[j][0];
      dp[j][1] = Math.min(dp[j - 1][0], dp[j - 1][2]) + input[j][1];
      dp[j][2] = Math.min(dp[j - 1][0], dp[j - 1][1]) + input[j][2];
    }
    if (i === 0) {
      result = Math.min(result, dp[n - 1][1], dp[n - 1][2]);
    } else if (i === 1) {
      result = Math.min(result, dp[n - 1][0], dp[n - 1][2]);
    } else if (i === 2) {
      result = Math.min(result, dp[n - 1][1], dp[n - 1][0]);
    }
  }

  return result;
};

// let input = `2
// 1 100 100
// 1 100 100`.split("\n");

console.log(solution(input));
