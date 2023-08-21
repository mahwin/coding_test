let input = `1
1
1`.split("\n");

// let fs = require("fs");
// let input = fs.readFileSync("/dev/stdin").toString().trim().split("\n");

const getP = (p, x) => {
  if (p[x] === x) return x;
  p[x] = getP(p, p[x]);
  return p[x];
};
const gateN = Number(input[0]);
const plainN = Number(input[1]);
const air = Array.from({ length: plainN + 1 }, (_, i) => i);
let result = 0;

for (let i = 2; i < plainN + 2; i++) {
  let x = Number(input[i]);

  const px = getP(air, x);
  if (px === 0) break;
  air[px] = px - 1;
  result++;
}

console.log(result);
