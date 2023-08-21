// const fs = require("fs");
// let input = fs.readFileSync("/dev/stdin").toString();

let input = "3";
const DIVIDE_NUM = 1_000_000_007;

const solution = () => {
  const n = Number(input);
  const dp = [1, 1, 3, 5];
  for (let i = 4; i <= n; i++) {
    dp.push(1 + ((dp[i - 2] + dp[i - 1]) % DIVIDE_NUM));
  }
  console.log(dp[n]);
};

solution();

// 수행 시간 : 148ms
// 메모리 : 9300KB
