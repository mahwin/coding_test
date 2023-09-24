// const fs = require("fs");
// let input = fs.readFileSync("/dev/stdin").toString().trim().split("\n");

let input = `3
0 0 0`.split("\n");

const solution = () => {
  const N = Number(input.shift());
  const maxNum = 20;

  const nums = input[0].split(" ").map(Number);
  const target = nums.pop();
  let dp = Array.from({ length: maxNum + 1 }, () => 0n);
  dp[nums[0]] = 1n;
  for (let i = 1; i < N - 1; i++) {
    const num = nums[i];
    const copyDp = Array.from({ length: maxNum + 1 }, () => 0n);
    for (let j = 0; j < 21; j++) {
      if (j + num < 21) {
        copyDp[j + num] += dp[j];
      }
      if (j - num >= 0) {
        copyDp[j - num] += dp[j];
      }
    }

    dp = copyDp;
  }

  return dp[target].toString();
};
console.log(solution());
