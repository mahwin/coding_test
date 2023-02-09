let input = `12
1 2 3
1 3 2
2 4 5
3 5 11
3 6 9
4 7 1
4 8 7
5 9 15
5 10 4
6 11 6
6 12 10`.split("\n");
const N = Number(input.shift());
const graph = {};

for (let i = 0; i < N - 1; i++) {
  [a, b, w] = input[i].split(" ").map(Number);
  graph[a] = graph[a] ? [...graph[a], [b, w]] : [[b, w]];
  graph[b] = graph[b] ? [...graph[b], [a, w]] : [[a, w]];
}

let max;
let leaf;
let visited;

const dfs = (node, cnt) => {
  if (cnt > max) {
    leaf = node;
    max = cnt;
  }

  for (let next of graph[node]) {
    const [nNode, nWeight] = next;
    if (visited[nNode]) continue;
    visited[nNode] = true;
    dfs(nNode, cnt + nWeight);
  }
};
max = -Infinity;
visited = Array.from({ length: N }, () => false);
dfs(1, 0);
max = -Infinity;
visited = Array.from({ length: N }, () => false);
dfs(leaf, 0);
console.log(max);
