const dfs = (prev, curr, graph) => {
  if (!graph[curr]) return [prev, curr];

  for (let next of graph[curr]) {
    return dfs(curr, next, graph);
  }
};

function solution(n, lighthouse) {
  let answer = 0;
  let preNodes = new Set();
  while (lighthouse.length) {
    let lastNodes = new Set();
    let graph = {};
    lighthouse.forEach(([from, to]) => {
      graph[from] = graph[from] ? [...graph[from], to] : [to];
    });

    for (let node = 1; node <= n; node++) {
      if (!graph[node]) continue;
      for (let next of graph[node]) {
        let [leaf, curr] = dfs(node, next, graph);
        lastNodes.add(leaf);
        preNodes.add(curr);
      }
    }

    lighthouse = lighthouse.filter(
      ([from, to]) => !lastNodes.has(from) && !lastNodes.has(to)
    );
  }

  return preNodes.size;
}

console.log(
  solution(10, [
    [4, 1],
    [5, 1],
    [5, 6],
    [7, 6],
    [1, 2],
    [1, 3],
    [6, 8],
    [2, 9],
    [9, 10],
  ])
);
