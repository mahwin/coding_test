function solution(n, computers) {
  let answer = 0;

  const visited = Array.from({ length: computers.length }, () => false);

  const DFS = (v) => {
    visited[v] = true;
    for (let i = 0; i < computers.length; i++) {
      // 연결 되어있고, 방문 안 했으면
      if (computers[v][i] === 1 && !visited[i]) DFS(i);
    }
  };

  for (let node = 0; node < computers.length; node++) {
    if (!visited[node]) {
      console.log(visited);
      DFS(node);
      answer++;
    }
  }
  return answer;
}

console.log(
  solution(3, [
    [1, 1, 0],
    [1, 1, 0],
    [0, 0, 1],
  ])
);
