function solution(info, edges) {
  let answer = 0;

  const graph = Array.from({ length: info.length }, () => []);

  for (let i = 0; i < edges.length; i++) {
    const [from, to] = edges[i];
    graph[from].push(to);
  }

  const dfs = (sheep, wolf, node, possible) => {
    info[node] === 1 ? wolf++ : sheep++;
    if (wolf === sheep) return;

    answer = answer < sheep ? sheep : answer;

    let currentIdx = possible.indexOf(node);
    let copyPossible = [...possible];
    copyPossible.splice(currentIdx, 1);
    copyPossible.push(...graph[node]);

    for (const next of copyPossible) {
      dfs(sheep, wolf, next, copyPossible);
    }
  };

  dfs(0, 0, 0, [0]);

  return answer;
}

solution(
  [0, 0, 1, 1, 1, 0, 1, 0, 1, 0, 1, 1],
  [
    [0, 1],
    [1, 2],
    [1, 4],
    [0, 8],
    [8, 7],
    [9, 10],
    [9, 11],
    [4, 3],
    [6, 5],
    [4, 6],
    [8, 9],
  ]
);
