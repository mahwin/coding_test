const fs = require("fs");
// let input = fs.readFileSync("/dev/stdin").toString().trim().split("\n");

let input = `7
15 11 4 8 5 2 4`.split("\n");

const solution = () => {
  const n = input.shift();
  const powers = input[0].split(" ").map(Number);
  let result = 0;
  let dp = Array.from({ length: n }, () => 1); // 본인 한 명은 꼭 포함
  for (let i = 0; i < n; i++) {
    for (let j = 0; j < i; j++) {
      if (powers[i] < powers[j]) dp[i] = Math.max(dp[i], dp[j] + 1);
    }
  }
  return n - Math.max(...dp);
};

console.log(solution());
