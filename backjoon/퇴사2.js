// const fs = require("fs");
// let input = fs.readFileSync("/dev/stdin").toString().split("\n");

const readline = require("readline");
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

let input = [];

rl.on("line", function (line) {
  input.push(line);
}).on("close", function () {
  console.log(solution());
  process.exit();
});

const solution = () => {
  const n = Number(input[0]);
  const dp = Array.from({ length: n + 1 }, () => 0);
  let max = 0;
  for (let i = 1; i <= n; i++) {
    max = Math.max(max, dp[i - 1]);
    const [duration, benefit] = input[i].split(" ").map(Number);
    if (i + duration - 1 > n) continue;
    else {
      dp[i - 1 + duration] = Math.max(max + benefit, dp[i - 1 + duration]);
    }
  }

  return Math.max(...dp);
};
