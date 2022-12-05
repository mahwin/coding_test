function solution(n, wires) {
  let answer = Infinity;
  let visted = Array.from({ length: n + 1 }, () => false);
  let graph = {};
  Array(n)
    .fill(0)
    .forEach((_, i) => (graph[i + 1] = []));

  wires.forEach((wire) => {
    const [from, to] = wire;
    graph[from].push(to);
    graph[to].push(from);
  });

  const dfs = (node) => {
    visted[node] = true;
    for (let nextNode of graph[node]) {
      if (visted[nextNode]) continue;
      dfs(nextNode);
    }
  };

  for (let i = 0; i < wires.length; i++) {
    let [from, to] = wires[i].map((n) => "" + n);

    graph[from] = graph[from].filter((n) => n !== +to);
    graph[to] = graph[to].filter((n) => n !== +from);
    visted = visted.map((n) => false);
    dfs(from, graph);
    let connect = 0;
    visted.forEach((n) => (n === true ? connect++ : null));
    let abs = Math.abs(2 * connect - n);
    answer = Math.min(answer, abs);
    graph[from].push(to);
    graph[to].push(from);
  }

  return answer;
}

console.log(
  solution(7, [
    [1, 2],
    [2, 7],
    [3, 7],
    [3, 4],
    [4, 5],
    [6, 7],
  ])
);
