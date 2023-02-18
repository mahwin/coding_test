let input = `3
30
20
10`.split("\n");

const N = Number(input.shift());
const step = [0];
for (let i = 0; i < N; i++) {
  step.push(Number(input[i]));
}

const dp = Array.from({ length: N + 1 }, () => 0);
dp[1] = step[1];
dp[2] = step[1] + step[2];

for (let i = 3; i <= N; i++) {
  dp[i] = Math.max(dp[i - 3] + step[i - 1] + step[i], dp[i - 2] + step[i]);
}

console.log(dp[N]);
