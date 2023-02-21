function solution(n, costs) {
  let answer = 0;
  const p = Array.from({ length: n }, (_, i) => i);

  const getP = (a) => {
    if (p[a] === a) return a;
    p[a] = getP(p[a]);
    return p[a];
  };
  const union = (a, b) => {
    let ap = getP(a);
    let bp = getP(b);
    if (ap < bp) p[bp] = ap;
    else p[ap] = bp;
  };
  const sameP = (a, b) => {
    let ap = getP(a);
    let bp = getP(b);
    if (ap === bp) return true;
    return false;
  };
  costs.sort((a, b) => a[2] - b[2]);

  for (const cost of costs) {
    if (!sameP(cost[0], cost[1])) {
      answer += cost[2];
      union(cost[0], cost[1]);
    }
  }

  return answer;
}
