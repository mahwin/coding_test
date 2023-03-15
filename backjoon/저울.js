let input = `7
3 1 6 2 7 30 1`.split("\n");

let w = input[1]
  .split(" ")
  .map(Number)
  .sort((a, b) => a - b);

const n = Number(input[0]);

let max = 1;

for (let i = 0; i < n; i++) {
  if (max < w[i]) break;
  max += w[i];
}

console.log(max);
