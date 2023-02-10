function solution(n, results) {
  const winGraph = {};
  const loseGraph = {};
  for (const r of results) {
    const [a, b] = r;
    winGraph[a] = winGraph[a] ? [...winGraph[a], b] : [b];
    loseGraph[b] = loseGraph[b] ? [...loseGraph[b], a] : [a];
  }
  let cnt;

  const dfs = (visited, graph, node) => {
    if (!graph[node]) return;

    for (const next of graph[node]) {
      if (visited[next]) continue;
      visited[next] = true;
      cnt++;
      dfs(visited, graph, next);
    }
  };

  let answer = 0;
  for (let node = 1; node <= n; node++) {
    cnt = 0;
    visited = Array.from({ length: n + 1 }, () => false);
    visited[node] = true;
    dfs(visited, winGraph, node);
    dfs(visited, loseGraph, node);
    if (cnt === n - 1) answer++;
  }
  return answer;
}

console.log(
  solution(5, [
    [4, 3],
    [4, 2],
    [3, 2],
    [1, 2],
    [2, 5],
  ])
);
