function solution(n, s, a, b, fares) {
  const w = Array.from({ length: n + 1 }, () =>
    Array.from({ length: n + 1 }, () => Infinity)
  );

  for (let i = 1; i <= n; i++) {
    w[i][i] = 0;
  }

  fares.forEach(([a, b, cost]) => {
    w[a][b] = cost;
    w[b][a] = cost;
  });

  for (let i = 1; i <= n; i++) {
    for (let j = 1; j <= n; j++) {
      for (let k = 1; k <= n; k++) {
        w[j][k] = Math.min(w[j][k], w[j][i] + w[i][k]);
      }
    }
  }

  let cost = Infinity;

  for (let node = 1; node <= n; node++) {
    cost = Math.min(cost, w[s][node] + w[node][a] + w[node][b]);
  }

  return cost;
}
