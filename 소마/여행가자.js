let fs = require("fs");
// let input = fs.readFileSync("/dev/stdin").toString().split("\n");
let input = `3
2
0 1 0
1 0 1
0 1 0
1 1`.split("\n");

const getP = (node) => {
  if (node === p[node]) return node;
  p[node] = getP(p[node]);
  return p[node];
};

const union = (a, b) => {
  a > b ? (p[a] = b) : (p[b] = a);
};

const N = Number(input[0]);
const graph = [];
const p = Array.from({ length: N }, (_, i) => i);

for (let i = 2; i < 2 + N; i++) {
  let el = input[i].split(" ").map(Number);
  for (let j = 0; j < N; j++) {
    if (el[j]) {
      let ap = getP(i - 2);
      let bp = getP(j);

      union(ap, bp);
    }
  }
}
const targets = input[input.length - 1].split(" ").map((el) => Number(el) - 1);

let parentSet = new Set();
for (let node of targets) {
  parentSet.add(getP(node));
}

console.log(p);
if (parentSet.size === 1) console.log("YES");
else console.log("NO");
