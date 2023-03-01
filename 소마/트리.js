const N = Number(input.shift());
const graph = {};
const info = input[0].split(" ").map(Number);
let rootNode;
for (let i = 0; i < N; i++) {
  if (info[i] === -1) {
    rootNode = i;
    continue;
  }
  const p = info[i];
  graph[p] = graph[p] ? [...graph[p], i] : [i];
}
let leaf = 0;

const dfs = (node, v) => {
  if (!graph[node]) {
    leaf++;
    return;
  }

  for (const next of graph[node]) {
    if (v[next]) continue;

    v[next] = true;
    dfs(next, v);
  }
};
const v = Array.from({ length: N }, () => false);
const banNode = Number(input[1]);
if (banNode === rootNode) console.log(0);
else {
  v[banNode] = true;
  dfs(rootNode, v);
  console.log(leaf);
}
