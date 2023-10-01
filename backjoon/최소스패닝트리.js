// const fs = require("fs");
// let input = fs.readFileSync("/dev/stdin").toString().trim().split("\n");

let input = `5 5
1 4 3
2 3 3
4 3 5
2 1 6
4 5 9`.split("\n");

const convert = (str) => str.split(" ").map(Number);

const getParent = (p, x) => {
  if (p[x] === x) return x;
  return (p[x] = getParent(p, p[x]));
};

const unionParent = (p, x1, x2) => {
  const p1 = getParent(p, x1);
  const p2 = getParent(p, x2);
  if (p1 > p2) p[p1] = p2;
  else p[p2] = p1;
};

const isCircle = (p, x1, x2) => {
  if (getParent(p, x1) === getParent(p, x2)) return true;
  return false;
};

const solution = () => {
  const [V, E] = convert(input.shift());
  input = input.map((el) => convert(el));
  input.sort((a, b) => a[2] - b[2]);
  let total = 0;
  const p = Array.from({ length: V + 1 }, (_, i) => i);
  input.forEach(([a, b, cost]) => {
    if (!isCircle(p, a, b)) {
      total += cost;
      unionParent(p, a, b);
    }
  });
  return total;
};

console.log(solution());
