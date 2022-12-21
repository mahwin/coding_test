const getParent = (parent, x) => {
  if (parent[x] === x) return x;
  return (parent[x] = getParent(parent, parent[x]));
};

const unionParent = (parent, a, b) => {
  a = getParent(parent, a);
  b = getParent(parent, b);

  if (a < b) parent[b] = a;
  else parent[a] = b;
};

const findParent = (parent, a, b) => {
  a = getParent(parent, a);
  b = getParent(parent, b);

  if (a === b) return true;
  return false;
};

let input = `6
9
1 2 5
1 3 4
2 3 2
2 4 7
3 4 6
3 5 11
4 5 3
4 6 8
5 6 8`.split("\n");

const nodes = +input[0];
const vertex = +input[1];
let answer = 0;
const parent = [];
for (let i = 1; i < nodes + 1; i++) {
  parent[i] = i;
}
console.log(parent);
let costs = input.slice(2).map((el) => el.split(" ").map(Number));
costs.sort((a, b) => a[2] - b[2]);
console.log(costs);

costs.forEach(([from, to, cost], i) => {
  if (!findParent(parent, from, to)) {
    console.log(parent);
    answer += cost;
    unionParent(parent, from, to);
  }
});
console.log(answer);
