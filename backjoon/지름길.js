const fs = require("fs");
let input = fs.readFileSync("/dev/stdin").toString().trim().split("\n");

const solution = () => {
  const [n, len] = input[0].split(" ").map((e) => parseInt(e));

  const obj = {};
  for (let i = 0; i < n; i++) {
    const [start, end, cost] = input[i + 1].split(" ").map(Number);
    if (obj[start]) obj[start].push({ end, cost });
    else obj[start] = [{ end, cost }];
  }
  const dp = Array.from({ length: len + 1 }, (_, i) => i);

  for (let i = 0; i <= len; i++) {
    dp[i] = Math.min(dp[i], dp[i - 1] + 1 || 0);
    if (obj[i]) {
      obj[i].forEach(({ end, cost }) => {
        dp[end] = Math.min(dp[end], dp[i] + cost);
      });
    }
  }

  return dp[len];
};

console.log(solution());
