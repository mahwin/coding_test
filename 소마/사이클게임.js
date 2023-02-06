let fs = require("fs");
let input = fs.readFileSync("/dev/stdin").toString().split("\n");

const [N, trials] = input.shift().split(" ").map(Number);
const p = Array.from({ length: N }, (_, i) => i);

const getP = (node) => {
  if (node === p[node]) return node;
  else return getP(p[node]);
};

const union = (a, b) => {
  if (a < b) p[b] = a;
  else p[a] = b;
};

const isCycle = (a, b) => {
  let ap = getP(a);
  let ab = getP(b);
  return ap === ab ? true : false;
};

function solution() {
  for (let i = 0; i < trials; i++) {
    const [a, b] = input[i].split(" ").map(Number);
    const pa = getP(a);
    const pb = getP(b);
    if (pa === pb) return console.log(i + 1);
    union(pa, pb);
  }

  return console.log(0);
}
solution();
