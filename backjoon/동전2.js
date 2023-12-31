let input = `3 15
2
5
12`.split("\n");

const solution = () => {
  const [n, total] = input.shift().split(" ").map(Number);
  let coins = [];
  let coinSet = new Set();
  input.forEach((coin) => {
    if (!coinSet.has(coin)) {
      coinSet.add(coin);
      coins.push(+coin);
    }
  });
  coins.sort((a, b) => a - b);

  const dp = Array.from({ length: total + 1 }, () => Infinity);
  dp[0] = 0;
  coins.forEach((coin) => {
    for (let i = coin; i <= total; i++) {
      let divider = Math.floor(i / coin);
      for (let j = 1; j <= divider; j++) {
        dp[i] = Math.min(dp[i - coin * j] + j, dp[i]);
      }
    }
  });
  console.log(dp[total] === Infinity ? -1 : dp[total]);
};
solution();
