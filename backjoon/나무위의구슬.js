let input = `9
1 2 3 2 3 4
2 1 0
3 0 2 5 6
4 1 3 7 8 9
5 3 0
6 0 0
7 0 0
8 2 0
9 0 0
9
1 0 3 2 3 4
2 0 0
3 0 2 5 6
4 9 3 7 8 9
5 0 0
6 0 0
7 0 0
8 0 0
9 0 0
9
1 0 3 2 3 4
2 9 0
3 0 2 5 6
4 0 3 7 8 9
5 0 0
6 0 0
7 0 0
8 0 0
9 0 0
0`.split("\n");

const solution = () => {
  let idx = 0;
  let result = 0;
  let v;
  while (input[idx] !== "0") {
    const n = +input[idx];
    result = 0;
    v = Array.from({ length: n + 1 }, () => false);
    const graph = {};
    const parent = {};
    for (let j = idx + 1; j < idx + n + 1; j++) {
      const [v, beadN, childN, ...childrens] = input[j].split(" ").map(Number);
      graph[v] = { beadN, childrens };
      if (childrens.length) {
        childrens.forEach((node) => {
          parent[node] = j - idx;
        });
      }
    }

    idx += n + 1;

    const parentExist = Array.from({ length: n + 1 }, () => false);

    for (let i = 1; i <= n; i++) {
      if (!graph[i].childrens.length) continue;
      graph[i].childrens.forEach((el) => {
        parentExist[el] = true;
      });
    }
    const rootNode = findRoot(parentExist);

    dfs(rootNode, graph, parent, v);
    console.log(result);
  }

  function findRoot(arr) {
    for (let i = 1; i <= arr.length; i++) {
      if (!arr[i]) {
        return i;
      }
    }
  }

  function dfs(node, graph, parent, v) {
    if (!graph[node].childrens.length) {
      const parentNode = parent[node];
      v[node] = true;

      const diff = graph[node].beadN - 1;
      result += Math.abs(diff);
      // console.log(parentNode, graph[parentNode].beadN, "전");

      graph[parentNode].beadN += diff;
      // console.log(node, graph[node].beadN);
      // console.log(parentNode, graph[parentNode].beadN, "gn");
      return;
    }

    for (const nextNode of graph[node].childrens) {
      dfs(nextNode, graph, parent, v);
      if (v[nextNode]) continue;
      // console.log(nextNode, node, "????");
      const diff = graph[nextNode].beadN - 1;
      result += Math.abs(diff);
      graph[node].beadN += diff;
    }
  }
};

solution();
