let input = `3
2 2
1 5
13 29`.split("\n");

const factorial = (n) => {
  let result = Array.from({ length: n + 1 }, () => 1n);
  for (let i = 1; i <= n; i++) {
    result[i] = result[i - 1] * BigInt(i);
  }
  return result;
};

const solution = () => {
  const cases = +input.shift();
  let max = 0;
  for (let i = 0; i < cases; i++) {
    input[i] = input[i].split(" ").map(Number);
    max = Math.max(input[i][1], max);
  }
  const dp = factorial(max);
  let result = [];
  for (let i = 0; i < cases; i++) {
    const [a, b] = input[i];
    result.push(dp[b] / (dp[a] * dp[b - a]));
  }
  console.log(result.join("\n"));
};
solution();
