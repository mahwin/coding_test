function solution(n, s, a, b, fares) {
  const cost = Array.from({ length: n + 1 }, () =>
    Array.from({ length: n + 1 }, () => Infinity)
  );

  for (let i = 0; i <= n; i++) cost[i][i] = 0;

  fares.forEach(([a, b, c]) => {
    cost[a][b] = c;
    cost[b][a] = c;
  });

  for (let k = 1; k <= n; k++) {
    for (let i = 1; i <= n; i++) {
      for (let j = 1; j <= n; j++) {
        if (cost[i][k] + cost[k][j] < cost[i][j])
          cost[i][j] = cost[i][k] + cost[k][j];
      }
    }
  }

  //출발 s, A 도착 a, B 도착 b
  let fare = Infinity;
  for (let i = 1; i <= n; i++) {
    fare = Math.min(fare, cost[s][i] + cost[i][a] + cost[i][b]);
  }
  return fare;
}
