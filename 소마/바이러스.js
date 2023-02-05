let input = `7
6
2 2
2 3
4 5
5 2
5 6
4 7`.split("\n");

let fs = require("fs");
// let input = fs.readFileSync("/dev/stdin").toString().trim().split("\n");
const [com, n, ...info] = input;

const graph = Array.from({ length: Number(com) + 1 }, () => []);
const visited = Array.from({ length: Number(com) + 1 }, () => false);

info.forEach((el) => {
  let [from, to] = el.split(" ").map(Number);
  graph[from].push(to);
  graph[to].push(from);
});

const dfs = (node) => {
  if (!graph[node].length) return;
  for (const next of graph[node]) {
    if (visited[next]) continue;
    visited[next] = true;
    dfs(next);
  }
};

const counter = () => {
  let cnt = 0;
  for (let i = 2; i <= Number(com); i++) {
    if (visited[i]) cnt++;
  }
  return cnt;
};
visited[1] = true;
dfs(1);
console.log(counter());

// graph.forEach((el) => console.log(el));
