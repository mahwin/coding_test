function solution(sales, links) {
  const INF = Infinity;

  const dp = Array.from({ length: sales.length + 1 }, () => [0, 0]);
  const check = Array.from({ length: sales.length + 1 }, () => false);
  const tree = Array.from({ length: sales.length + 1 }, () => []);

  for (const [from, to] of links) {
    tree[from].push(to);
  }

  const dfs = (node) => {
    check[node] = true;
    dp[node] = [0, sales[node - 1]]; // [off,on] => 현 노드를 선택 안 했을 경우와 했을 경우

    for (next of tree[node]) {
      if (!check[next]) dfs(next);
    }

    if (tree[node].length) {
      for (const next of tree[node]) {
        dp[node][1] += Math.min(...dp[next]); // 선택
      }

      let min = INF;

      for (const next of tree[node]) {
        let cnt = dp[next][1];
        for (const anotherNext of tree[node]) {
          if (next !== anotherNext) cnt += Math.min(...dp[anotherNext]); //비 선택
        }
        min = cnt < min ? cnt : min;
      }

      dp[node][0] += min;
    }
  };

  dfs(1);

  return Math.min(dp[1][1], dp[1][0]);
}

console.log(
  solution(
    [14, 17, 15, 18, 19, 14, 13, 16, 28, 17],
    [
      [10, 8],
      [1, 9],
      [9, 7],
      [5, 4],
      [1, 5],
      [5, 10],
      [10, 6],
      [1, 3],
      [10, 2],
    ]
  )
);
