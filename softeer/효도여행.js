const readline = require("readline");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const input = [];

rl.on("line", (line) => {
  input.push(line);
}).on("close", () => {
  solution();
  process.exit();
});

function solution() {
  const [N, M] = input.shift().split(" ").map(Number);
  const target = input.shift();

  const graph = {};

  for (let i = 0; i < N - 1; i++) {
    const [a, b, happy] = input[i].split(" ");
    if (!graph[a]) {
      graph[a] = [[b, happy]];
    } else {
      graph[a].push([b, happy]);
    }
    if (!graph[b]) {
      graph[b] = [[a, happy]];
    } else {
      graph[b].push([a, happy]);
    }
  }

  // 리프노드 찾기

  const leafNode = new Set();

  for (let i = 1; i <= N; i++) {
    if (i === 1) continue;
    if (graph[i].length === 1) {
      leafNode.add(i.toString());
    }
  }

  console.log(leafNode);
  let result = 0;

  const visited = Array(N + 1).fill(false);

  const dfs = (node, route) => {
    visited[node] = true;

    for (let [next, happy] of graph[node]) {
      if (visited[next]) continue;

      if (leafNode.has(next)) {
        result = Math.max(result, LCS(target, route + happy));

        return;
      }

      dfs(next, route + happy);
    }
  };
  dfs(1, "");

  console.log(result);
}

function LCS(target, route) {
  const dp = Array.from({ length: target.length + 1 }, () =>
    Array(route.length + 1).fill(0)
  );

  for (let i = 1; i <= target.length; i++) {
    for (let j = 1; j <= route.length; j++) {
      if (target[i - 1] === route[j - 1]) {
        dp[i][j] = dp[i - 1][j - 1] + 1;
      } else {
        dp[i][j] = Math.max(dp[i - 1][j], dp[i][j - 1]);
      }
    }
  }
  return dp[target.length][route.length];
}
