let input = `2
1
1`.split("\n");

const n = Number(input[0]);
const minus = [];
const plus = [];
let result = 0;
for (let i = 1; i <= n; i++) {
  num = Number(input[i]);
  if (num === 1) result++;
  else if (num > 0) plus.push(num);
  else minus.push(num);
}
plus.sort((a, b) => b - a);
minus.sort((a, b) => a - b);

for (let i = 0; i < plus.length; i++) {
  if (i + 1 < plus.length) {
    result += plus[i] * plus[i + 1];
    i += 1;
  } else result += plus[i];
}

for (let i = 0; i < minus.length; i++) {
  if (i + 1 < minus.length) {
    result += minus[i] * minus[i + 1];
    i += 1;
  } else result += minus[i];
}

console.log(result);
