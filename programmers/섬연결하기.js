function solution(n, costs) {
  let answer = 0;
  let parent = Array.from({ length: n }, (_, i) => i);

  const getParent = (parent, node) => {
    if (parent[node] === node) return node;
    return (parent[node] = getParent(parent, parent[node]));
  };

  const unionParent = (parent, node1, node2) => {
    const node1Parent = getParent(parent, node1);
    const node2Parent = getParent(parent, node2);
    if (node1Parent < node2Parent) return (parent[node2] = node1);
    else return (parent[node1] = node2);
  };

  const sameParent = (parent, node1, node2) => {
    const node1Parent = getParent(parent, node1);
    const node2Parent = getParent(parent, node2);
    return node1Parent === node2Parent ? true : false;
  };

  costs.sort((a, b) => a[2] - b[2]);

  costs.forEach((el) => {
    let [node1, node2, cost] = el;
    if (!sameParent(parent, node1, node2)) {
      answer += cost;
      unionParent(parent, node1, node2);
    }
  });

  return answer;
}

console.log(
  solution(4, [
    [0, 1, 1],
    [0, 2, 2],
    [0, 3, 5],
    [1, 3, 1],
    [0, 4, 8],
  ])
);
