function solution(n, s, a, b, fares) {
  const fareBoard = Array.from({ length: n + 1 }, () =>
    Array.from({ length: n + 1 }, () => Infinity)
  );

  //자기 자신
  for (let i = 1; i <= n; i++) {
    fareBoard[i][i] = 0;
  }

  //초기 값
  fares.forEach(([from, to, cost]) => {
    fareBoard[from][to] = cost;
    fareBoard[to][from] = cost;
  });

  for (let i = 1; i <= n; i++) {
    for (let j = 1; j <= n; j++) {
      for (let k = 1; k <= n; k++) {
        if (fareBoard[j][k] > fareBoard[j][i] + fareBoard[i][k])
          fareBoard[j][k] = fareBoard[j][i] + fareBoard[i][k];
      }
    }
  }

  let answer = fareBoard[s][b] + fareBoard[s][a];
  for (let node = 1; node <= n; node++) {
    const fare = fareBoard[s][node] + fareBoard[node][b] + fareBoard[node][a];

    answer = Math.min(answer, fare);
  }

  return answer;
}

solution(6, 4, 6, 2, [
  [4, 1, 10],
  [3, 5, 24],
  [5, 6, 2],
  [3, 1, 41],
  [5, 1, 24],
  [4, 6, 50],
  [2, 4, 66],
  [2, 3, 22],
  [1, 6, 25],
]);
