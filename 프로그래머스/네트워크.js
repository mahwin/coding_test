function solution(n, computers) {
  const graph = {};
  const v = Array.from({ length: n }, () => false);
  for (let i = 0; i < computers.length; i++) {
    const el = computers[i];
    for (let j = 0; j < computers.length; j++) {
      if (i === j) continue;
      if (el[j]) {
        graph[i] = graph[i] ? [...graph[i], j] : [j];
      }
    }
  }

  const dfs = (start) => {
    if (!graph[start]) return;
    for (let next of graph[start]) {
      if (v[next]) continue;
      v[next] = true;
      dfs(next);
    }
  };

  let result = 0;

  for (let i = 0; i < n; i++) {
    if (v[i]) continue;
    v[i] = true;
    dfs(i);
    result++;
  }
  return result;
}
