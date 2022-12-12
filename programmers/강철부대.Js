function solution(n, roads, sources, destination) {
  let roadGraph = {};
  roads.forEach(([from, to]) => {
    roadGraph[from] = roadGraph[from] ? [...roadGraph[from], to] : [to];
    roadGraph[to] = roadGraph[to] ? [...roadGraph[to], from] : [from];
  });

  const bfs = (destination, n) => {
    let visited = Array.from({ length: n + 1 }, () => false);
    let des = Array.from({ length: n + 1 }, () => -1);
    des[destination] = 0;
    visited[destination] = true;
    let queue = [destination];
    while (queue.length !== 0) {
      const node = queue.shift();

      for (let next of roadGraph[node]) {
        if (visited[next]) continue;

        visited[next] = true;
        des[next] = des[node] + 1;
        queue.push(next);
      }
    }
    return des;
  };
  let des = bfs(destination, n);

  return sources.map((source) => (des[source] !== -1 ? des[source] : -1));
}

solution(
  5,
  [
    [1, 2],
    [1, 4],
    [2, 4],
    [2, 5],
    [4, 5],
  ],
  [1, 3, 5],
  5
);
