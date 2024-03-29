function solution(info, edges) {
  const graph = {};
  let result = 0;
  edges.forEach(([p, s]) => {
    graph[p] = graph[p] ? graph[p].concat(s) : [s];
  });

  const dfs = (sheep, wolf, node, cango) => {
    sheep += info[node] === 0 ? 1 : 0;
    wolf += info[node] !== 0 ? 1 : 0;

    if (wolf >= sheep) return;

    result = Math.max(result, sheep);

    const nextCango = [...cango];
    const nodeIdx = nextCango.indexOf(node);
    nextCango.splice(nodeIdx, 1);

    if (graph[node]) nextCango.push(...graph[node]);

    for (const next of nextCango) {
      dfs(sheep, wolf, next, nextCango);
    }
  };

  dfs(0, 0, 0, [0]);
  return result;
}
