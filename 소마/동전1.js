let input = `3 10
1
2
5`.split("\n");
let coins = [];
for (let i = 0; i < N; i++) {
  coins.push(Number(input[i]));
}
coins = coins.sort((a, b) => a - b);
let cnt = 0;
const sol = (coins, sum) => {
  const maxCoin = coins[coins.length - 1];
  const nextCoins = coins.slice(0, coins.length - 1);

  if (sum % maxCoin === 0) cnt++;
  if (!nextCoins.length) return;
  sol(nextCoins, sum);
  while (sum > maxCoin) {
    sum -= maxCoin;
    sol(nextCoins, sum);
  }
};

sol(coins, target);

console.log(cnt);
