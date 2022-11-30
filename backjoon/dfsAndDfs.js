let input = `1000 1 1000
999 1000`;
input = input.split("\n");

// const fs = require("fs");
// let input = fs.readFileSync("/dev/stdin").toString().split("\n");

let [n, m, start] = input.shift().split(" ");
//양방향 그래프 만들기
let graph = {};
for (let i = 0; i < m; i++) {
  const [to, from] = input[i].split(" ").map((n) => +n);
  if (graph[to]) {
    graph[to].push(from);
  } else {
    graph[to] = [from];
  }
  if (graph[from]) {
    graph[from].push(to);
  } else {
    graph[from] = [to];
  }
}

//value sort
for (let [key, values] of Object.entries(graph)) {
  graph[key] = values.sort((a, b) => a - b);
}

let visited = new Array(n + 1).fill(false);
let answer = [];
const dfs = (v) => {
  visited[v] = true;
  answer.push(v);
  for (let i = 0; i < graph[v].length; i++) {
    const nextNode = graph[v][i];
    if (nextNode && !visited[nextNode]) {
      dfs(nextNode);
    }
  }
};
dfs(+start);
console.log(answer);
visited = new Array(n + 1).fill(false);
answer = [];
const bfs = (v) => {
  let needVisited = [v];
  while (needVisited.length !== 0) {
    const next = needVisited.shift();
    if (!visited[next]) {
      visited[next] = true;
      answer.push(next);
      needVisited = [...needVisited, ...graph[next]];
    }
  }
};
bfs(+start);
console.log(answer);
