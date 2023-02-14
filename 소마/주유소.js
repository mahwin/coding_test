let input = `4
2 2 2
2 4 1 2`.split("\n");

const N = Number(input[0]);
const distance = input[1].split(" ").map((v) => BigInt(v));
const price = input[2].split(" ").map((v) => BigInt(v));

let curPrice = price[0];
let cost = 0n;

for (let i = 0; i < N - 1; i++) {
  cost += curPrice * distance[i];
  if (curPrice > price[i + 1]) curPrice = price[i + 1];
}

console.log(String(cost));
