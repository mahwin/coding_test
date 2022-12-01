function solution(n, edge) {
  const graph = Array.from({ length: n + 1 }, () => []);

  edge.forEach((e) => {
    const [from, to] = e;
    graph[from].push(to);
    graph[to].push(from);
  });

  const distance = Array(n + 1).fill(0);
  distance[1] = 1;
  //탐색
  const needVisit = [1];
  while (needVisit.length) {
    const cur = needVisit.shift();
    for (const node of graph[cur]) {
      if (!distance[node]) {
        //간적이 없으면 이떄까지 왔던 거리에 + 1
        distance[node] = distance[cur] + 1;
        needVisit.push(node);
      }
    }
  }

  const max = Math.max(...distance);
  return distance.filter((e) => e == max).length;
}

console.log(
  solution(6, [
    [3, 6],
    [4, 3],
    [3, 2],
    [1, 3],
    [1, 2],
    [2, 4],
    [5, 2],
  ])
);
