// 그래프의 수의 합은 2이상이라고 했으니 한 노드에서 나가는 방향이 2개 이상인데
// 그 노드로 들어오는 방향이 없으면 추가된 노드라고 생각할 수 있다.

const findOuterNode = (graph, nodeSet, MAX_NODE_NUMBER) => {
  // 나가는 방향은 있는데 들어오는 방향은 없는 노드가 외부 노드이다.

  for (let node = 1; node <= MAX_NODE_NUMBER; node++) {
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

const getTypeOfGraph = (node, graph, visited) => {
  // 한 노드에서 나가는 방향이 두 개다 ? => 8자
  // 사이클 없다? 막대
  // 사이클 있다? 도넛

  while (true) {
    if (!graph[node] || !graph[node].length) {
      return "type_bar";
    }

    if (graph[node].length === 2) {
      return "type_eight";
    }

    if (visited[node]) {
      return "type_donut";
    }

    visited[node] = true;
    node = graph[node][0];
  }
};

function solution(edges) {
  let maxNodeNumber = 0;
  const nodeSet = new Set();
  const graph = {};

  edges.forEach(([from, to]) => {
    if (graph[from]) {
      graph[from].push(to);
    } else graph[from] = [to];

    if (!graph[to]) graph[to] = [];
    nodeSet.add(from);
    nodeSet.add(to);
    maxNodeNumber = Math.max(from, to, maxNodeNumber);
  });

  const outerNode = findOuterNode(graph, nodeSet, maxNodeNumber);
  const result = [outerNode, 0, 0, 0];

  const visited = Array.from({ length: maxNodeNumber }, () => false);

  for (const startNode of graph[outerNode]) {
    const graph_type = getTypeOfGraph(startNode, graph, visited);

    switch (graph_type) {
      case "type_eight":
        result[3]++;
        break;
      case "type_bar":
        result[2]++;
        break;
      case "type_donut":
        result[1]++;
        break;
    }
  }
  return result;
}
