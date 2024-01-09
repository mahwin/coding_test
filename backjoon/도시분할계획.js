let input = `2 1
1 2 3`.split("\n");

const solution = () => {
  const [N, M] = input.shift().split(" ").map(Number);
  input = input.map((el) => {
    const [a, b, c] = el.split(" ").map(Number);
    if (a > b) return [b, a, c];
    return [a, b, c];
  });
  input.sort((a, b) => {
    if (a[2] === b[2]) {
      return a[0] - b[0];
    }
    return a[2] - b[2];
  });
  let result = 0;
  let max = 0;
  const p = Array.from({ length: N + 1 }, (_, i) => i);
  for (let [a, b, cost] of input) {
    if (isCycle(a, b, p)) continue;

    union(a, b, p);
    result += cost;
    max = cost;
  }
  console.log(result - max);
};

const getP = (x, p) => {
  if (p[x] === x) return x;
  p[x] = getP(p[x], p);
  return p[x];
};

const isCycle = (x1, x2, p) => {
  const p1 = getP(x1, p);
  const p2 = getP(x2, p);
  return p1 == p2 ? true : false;
};

const union = (x1, x2, p) => {
  const p1 = getP(x1, p);
  const p2 = getP(x2, p);
  if (p1 === p2) return;

  if (p1 < p2) {
    p[p2] = p1;
  } else {
    p[p1] = p2;
  }
};

solution();
