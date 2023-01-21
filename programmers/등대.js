function solution(n, lighthouse) {
  const visited = new Array(n + 1).fill(false);
  let result = 0;

  while (lighthouse.length) {
    const graph = Array.from({ length: n + 1 }, () => []);

    lighthouse.forEach(([from, to]) => {
      graph[from].push(to);
      graph[to].push(from);
    });

    graph
      .filter((el) => el.length === 1)
      .forEach((el) => {
        const [node] = el;
        if (!visited[node]) {
          visited[node] = true;
          if (graph[node].length !== 1) {
            result += 1;
          } else {
            result += 0.5;
            // 0 - 0 의 경우 두번 카운팅 되기 떄문에 0.5
          }
        }
      });
    lighthouse = lighthouse.filter(([from, to]) => {
      return !visited[from] && !visited[to];
    });
  }

  return result;
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
