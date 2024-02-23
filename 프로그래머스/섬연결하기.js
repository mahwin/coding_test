function solution(n, costs) {
  costs = costs.sort((a, b) => a[2] - b[2]);
  const p = Array.from({ length: n }, (_, i) => i);
  let result = 0;
  for (const [x1, x2, c] of costs) {
    const p1 = getP(x1, p);
    const p2 = getP(x2, p);
    if (p1 === p2) continue;
    result += c;
    union(x1, x2, p);
  }

  return result;
}

const getP = (x, p) => {
  if (p[x] === x) return x;
  return (p[x] = getP(p[x], p));
};

const union = (x1, x2, p) => {
  const p1 = getP(x1, p);
  const p2 = getP(x2, p);
  if (p1 > p2) {
    p[p2] = p1;
  } else {
    p[p1] = p[p2];
  }
};
