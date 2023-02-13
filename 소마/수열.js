let input = `10 5
3 -2 -4 -9 0 3 7 13 8 -3`.split("\n");
const [dates, N] = input[0].split(" ").map(Number);
const temperatures = input[1].split(" ").map(Number);

let sum = temperatures.slice(0, N).reduce((pre, cur) => (pre += cur));
let max = sum;

for (let i = 0; i < dates - N; i++) {
  sum += -temperatures[i] + temperatures[i + N];
  max = Math.max(max, sum);
}

console.log(max);
