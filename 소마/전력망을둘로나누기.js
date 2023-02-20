function solution(n, wires) {
  const graph = {};
  wires.forEach(([a, b]) => {
    graph[a] = graph[a] ? [...graph[a], b] : [b];
    graph[b] = graph[b] ? [...graph[b], a] : [a];
  });

  const bfs = (start, ban) => {
    let cnt = 1;
    const queue = [start];
    const visited = Array.from({ length: n }, () => false);
    visited[start] = true;
    while (queue.length) {
      const node = queue.shift();

      for (const next of graph[node]) {
        if (visited[next] || ban === next) continue;
        visited[next] = true;
        queue.push(next);
        cnt++;
      }
    }
    return cnt;
  };
  let min = Infinity;
  for (let wire of wires) {
    const [start, ban] = wire;
    let a = bfs(start, ban);
    let b = wires.length + 1 - a;

    min = Math.min(Math.abs(a - b), min);
  }
  return min;
}

console.log(
  solution(9, [
    [1, 3],
    [2, 3],
    [3, 4],
    [4, 5],
    [4, 6],
    [4, 7],
    [7, 8],
    [7, 9],
  ])
);
