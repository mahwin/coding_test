function solution(n, s, a, b, fares) {
  // cost[a][b] => a에서 b로 가는 최소 비용 (경유 포함)
  const cost = Array.from({ length: n + 1 }, () =>
    Array.from({ length: n + 1 }, () => Infinity)
  );
  //2차원 배열에 초기 값
  fares.forEach(([a, b, price]) => {
    cost[a][b] = price;
    cost[b][a] = price;
  });

  // 자기 자신으로 가는 값 0으로 초기화
  for (let i = 1; i <= n; i++) {
    board[i][i] = 0;
  }

  for (let i = 1; i <= n; i++) {
    for (let j = 1; j <= n; j++) {
      for (let k = 1; k <= n; k++) {
        const linkCost = board[j][i] + board[i][k];
        // j에서 k로 갈때 i를 거쳐 가는 비용이 더 싸다면 j => i => k로 수정.
        if (linkCost < board[j][k]) {
          board[j][k] = linkCost;
        }
      }
    }
  }
  let accCost = Infinity;

  for (let node = 1; node <= n; node++) {
    accCost = Math.min(
      accCost,
      board[s][node] + board[node][a] + board[node][b]
    );
  }
  return accCost;
}
