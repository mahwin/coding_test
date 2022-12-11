function solution(info, edges) {
  let answer = 1;
  const length = info.length;
  const graph = Array.from({ length }, () => []);

  for (let i = 0; i < edges.length; i++) {
    const [from, to] = edges[i];
    graph[from].push(to);
  }

  const dfs = (sheep, wolf, currentNode, possible) => {
    if (info[currentNode]) wolf++;
    else sheep++;
    if (wolf === sheep) return;

    answer = Math.max(answer, sheep);

    let currentIndex = possible.indexOf(currentNode);
    let newPossible = [...possible];
    newPossible.push(...graph[currentNode]);
    newPossible.splice(currentIndex, 1);
    for (const next of newPossible) {
      dfs(sheep, wolf, next, newPossible);
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
