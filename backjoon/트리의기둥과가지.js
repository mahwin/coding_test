let input = `3 3
1 3 2
2 3 3`.split("\n");

function solution() {
  const [N, rootNode] = input.shift().split(" ").map(Number);
  const graph = {};

  for (let i = 1; i <= N; i++) {
    graph[i] = [];
  }

  input.forEach((el) => {
    const [a, b, c] = el.split(" ").map(Number);
    graph[a].push([b, c]);
    graph[b].push([a, c]);
  });

  let gigaNode = rootNode;
  const v = Array.from({ length: N + 1 }, () => false);

  const findGiGa = (node) => {
    let flag = false;
    let cnt = 0;
    for (const [next, _] of graph[node]) {
      if (!v[next]) cnt++;
    }
    if (cnt > 1 || cnt == 0) {
      gigaNode = node;
      flag = true;
      return;
    }

    for (const [next, _] of graph[node]) {
      if (v[next]) continue;
      v[next] = true;
      findGiGa(next);
    }
  };
  v[rootNode] = true;
  findGiGa(rootNode);

  const distance = (fromNode, targetNode) => {
    let result = 0;
    let v = Array.from({ length: N + 1 }, () => false);
    v[fromNode] = true;
    const dfs = (node) => {
      if (node === targetNode) return;
      for (const [next, cost] of graph[node]) {
        if (v[next]) continue;
        v[next] = true;
        result += cost;
        dfs(next);
      }
    };
    dfs(fromNode);

    return result;
  };
  let max = 0;

  const distanceLeaf = (node, acc) => {
    max = Math.max(max, acc);

    for (let [next, cost] of graph[node]) {
      if (v[next]) continue;
      v[next] = true;
      distanceLeaf(next, acc + cost);
      v[next] = false;
    }
  };
  v[gigaNode] = true;
  distanceLeaf(gigaNode, 0);
  console.log(distance(rootNode, gigaNode), max);
}

solution();
