let fs = require("fs");
let input = fs.readFileSync("/dev/stdin").toString();
const num = Number(input);
let dp = [];
dp.push(...[0, 1, 2]);

for (let i = 3; i <= num; i++) {
  const next = (dp[i - 1] + dp[i - 2]) % 15746;
  dp.push(next);
}
console.log(dp[num] % 15746);
