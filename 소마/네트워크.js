function solution(n, computers) {
  const visited = Array.from({ length: n }, () => false);

  let answer = 0;
  for (let i = 0; i < n; i++) {
    if (visited[i]) continue;
    visited[i] = true;
    answer++;
    dfs(i);
  }

  function dfs(node) {
    for (let i = 0; i < n; i++) {
      if (visited[i]) continue;
      if (computers[node][i] === 1) {
        visited[i] = true;
        dfs(i);
      }
    }
  }

  return answer;
}
