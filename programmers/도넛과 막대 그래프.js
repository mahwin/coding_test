function solution(edges) {
  let graph = {};
  const nodeSet = new Set();
  let N = 0;

  for (const [from, to] of edges) {
    if (graph[from]) {
      graph[from].push(to);
    } else {
      graph[from] = [to];
    }
    N = Math.max(N, from, to);
    nodeSet.add(from);
    nodeSet.add(to);
  }

  const getRootNode = () => {
    for (let node = 1; node <= N; node++) {
      if (!graph[node]) {
        nodeSet.delete(node);
        continue;
      }
      if (graph[node].length < 2) {
        nodeSet.delete(node);
      }
      graph[node].forEach((toNode) => {
        nodeSet.delete(toNode);
      });
    }

    return [...nodeSet][0];
  };

  const rootNode = getRootNode();

  const result = [rootNode, 0, 0, 0]; // 시작 노드, 도넛, 막대 ,8자

  const visited = Array.from({ length: N + 1 }, () => false);

  // 사이클이 없다 => 막대
  // 사이클이 있는데, 사이클을 돌 동안 특정한 중심점이 있다. 8자
  // 사이클이 있는데, 나가는 간선이 하나.
  for (let node of graph[rootNode]) {
    visited[node] = true;

    while (true) {
      if (!graph[node]) {
        result[2]++;
        break;
      }
      if (graph[node].length === 2) {
        result[3]++;
        break;
      }

      const nextNode = graph[node];
      if (visited[nextNode]) {
        result[1]++;
        break;
      }
      visited[nextNode] = true;
      node = nextNode;
    }
  }
  return result;
}
