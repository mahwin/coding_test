const [N, weight] = input.shift().split(" ").map(Number);
const weights = [0];
const vals = [0];
for (let i = 0; i < N; i++) {
  const [w, v] = input[i].split(" ").map(Number);
  weights.push(w);
  vals.push(v);
}

const dp = Array.from({ length: N + 1 }, () =>
  Array.from({ length: weight + 1 }, () => 0)
);

for (let n = 1; n <= N; n++) {
  for (let j = 1; j <= weight; j++) {
    dp[n][j] = Math.max(dp[n - 1][j - weights[n]] + vals[n] || 0, dp[n - 1][j]);
  }
}

console.log(dp[N][weight]);
