let input = `3 10
1
2
5`.split("\n");
const [N, target] = input.shift().split(" ").map(Number);
let coins = [];
for (let i = 0; i < N; i++) {
  coins.push(Number(input[i]));
}
coins = coins.sort((a, b) => a - b);
// let cnt = 0;
// const sol = (coins, sum) => {
//   const maxCoin = coins[coins.length - 1];
//   const nextCoins = coins.slice(0, coins.length - 1);

//   if (sum % maxCoin === 0) cnt++;
//   if (!nextCoins.length) return;
//   sol(nextCoins, sum);
//   while (sum > maxCoin) {
//     sum -= maxCoin;
//     sol(nextCoins, sum);
//   }
// };

// sol(coins, target);

// console.log(cnt);

const dp = Array.from({ length: target + 1 }, () => 0);
dp[0] = 1;
for (let coin of coins) {
  for (let i = 1; i <= target; i++) {
    console.log(i, dp[i - coin]);
    dp[i] += dp[i - coin] || 0;
  }
  console.log(dp);
}
