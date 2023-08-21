const fs = require("fs");
let input = fs.readFileSync("/dev/stdin").toString().split("\n");

const parser = (info) => info.split(" ").map(Number);

const dfs = (n, graph, degreeArr, dp, times) => {
  const result = [];
  const stack = [];

  for (let i = 1; i <= n; i++) {
    if (!degreeArr[i]) stack.push(i);
  }
  while (stack.length) {
    const node = stack.pop();
    result.push(node);
    graph[node].forEach((next) => {
      dp[next] = Math.max(dp[next], dp[node] + times[next]);

      degreeArr[next]--;
      if (!degreeArr[next]) stack.push(next);
    });
  }
  return dp;
};

const solution = (data) => {
  const [n, m] = parser(data[0]);
  const target = Number(data.pop());
  const graph = {};

  //진입 차수 저장
  const degreeArr = Array.from({ length: n + 1 }, () => 0);
  for (let i = 1; i <= n; i++) {
    graph[i] = [];
  }

  for (let i = 2; i <= m + 1; i++) {
    const [from, to] = parser(data[i]);
    graph[from].push(to); // 간선 저장
    degreeArr[to] += 1; // 진입 차수 증가
  }

  const times = [0, ...parser(data[1])];
  const dp = [...times];
  dfs(n, graph, degreeArr, dp, times);
  console.log(dp[target]);
};

const t = Number(input.shift());
let result = [];
for (let i = 0; i < t; i++) {
  const [n, k] = parser(input[0]);
  solution(input.splice(0, k + 3));
}
