function solution(n, s, a, b, fares) {
  const board = Array.from({ length: n + 1 }, () =>
    Array.from({ length: n + 1 }, () => Infinity)
  );

  for (let i = 1; i <= n; i++) {
    board[i][i] = 0;
  }

  //2차원 배열에 초기값
  fares.forEach(([x, y, cost]) => {
    board[x][y] = cost;
    board[y][x] = cost;
  });

  for (let node = 1; node <= n; node++) {
    for (let x = 1; x <= n; x++) {
      for (let y = 1; y <= n; y++) {
        let linkedCost = board[x][node] + board[node][y];
        board[x][y] = Math.min(board[x][y], linkedCost);
      }
    }
  }
  let maxCost = board[s][a] + board[s][b];

  for (let node = 1; node <= n; node++) {
    const linkedCost = board[s][node] + board[node][a] + board[node][b];
    // 기존값과 새로 계산된 값 중 더 작은 값으로 갱신
    maxCost = Math.min(maxCost, linkedCost);
  }

  return maxCost;
}
